#!/usr/bin/env node
// Turn the app's screenshot captures into what the site serves.
//
//   node scripts/shots.mjs <dir of PNGs>
//
// The captures come from the app repo's `npm run demo:shots` (see its
// docs/05-engineering/development/screenshot-demo.md): 1800x909 PNGs of an
// invented estate. For each one this writes, under public/shots/v2/:
//   <name>.png                      the fallback <img>
//   <name>.webp                     1800w
//   <name>-1400/-1100/-700.webp     the srcset steps the tour and hero ask for
// and, from fleet.png, public/og.jpg: 1200x630, the 1.91:1 card every link
// preview expects, kept under 300 KB because WhatsApp silently drops larger.
//
// A new directory, not overwritten names: /shots/* is cached for a week and
// not content-hashed (public/_headers), so reusing a filename would keep
// serving the old picture. The next re-take goes to v3.
import { mkdirSync, readdirSync, statSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import sharp from 'sharp'

const src = resolve(process.argv[2] ?? '')
if (!process.argv[2]) {
  console.error('usage: node scripts/shots.mjs <dir of PNGs>')
  process.exit(1)
}
const out = resolve('public/shots/v2')
mkdirSync(out, { recursive: true })

const pngs = readdirSync(src).filter((f) => f.endsWith('.png') && !f.startsWith('_'))
for (const file of pngs) {
  const name = basename(file, '.png')
  const input = sharp(join(src, file))
  await input.clone().png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(join(out, `${name}.png`))
  await input.clone().webp({ quality: 82 }).toFile(join(out, `${name}.webp`))
  for (const w of [1400, 1100, 700]) {
    await input.clone().resize({ width: w }).webp({ quality: 80 }).toFile(join(out, `${name}-${w}.webp`))
  }
  console.log(`${name}: ${Math.round(statSync(join(out, `${name}.webp`)).size / 1024)} KB webp`)
}

const og = resolve('public/og.jpg')
await sharp(join(src, 'fleet.png'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'top' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(og)
const ogKb = Math.round(statSync(og).size / 1024)
console.log(`og.jpg: ${ogKb} KB`)
if (ogKb >= 300) {
  console.error('og.jpg is 300 KB or more; WhatsApp will not show it. Lower the quality.')
  process.exit(1)
}
