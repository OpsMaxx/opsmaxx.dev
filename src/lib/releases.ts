/**
 * The latest release, resolved at build time.
 *
 * Doing this at build rather than in the browser means visitors get real
 * download URLs with no request of their own and no rate limit. The cost is
 * that the build has to succeed at resolving it, and the first real release
 * after this shipped proved that it does not always: Cloudflare's build
 * machines share IPs, the unauthenticated GitHub API allows 60 requests an
 * hour per IP, and the call came back empty. Every download button silently
 * degraded to "go to the releases page".
 *
 * So there are three layers now, in order of how much they tell us:
 *
 *   1. The API. Exact filenames and exact sizes in one request.
 *   2. No API at all: /releases/latest redirects to /tag/vX.Y.Z, which gives
 *      the version, and the asset names follow a fixed scheme from
 *      electron-builder.yml. A HEAD per asset gives the size. Six plain HTTP
 *      requests to github.com, no API quota involved.
 *   3. The releases page. Never a broken link, just a less useful one.
 */

const REPO = 'OpsMaxx/OpsMaxx'
const RELEASES = `https://github.com/${REPO}/releases/latest`
const UA = 'opsmaxx.dev-build'

export type Asset = { file: string; url: string; size: string }

export type PlatformRelease = {
  id: 'macos' | 'windows' | 'linux'
  primary: Asset | null
  others: Asset[]
  verify: string
}

export type Release = {
  version: string | null
  url: string
  /** Which layer answered. Printed in the build log so a silent downgrade is visible. */
  resolvedBy: 'api' | 'redirect' | 'fallback'
  platforms: Record<'macos' | 'windows' | 'linux', PlatformRelease>
}

type GhAsset = { name: string; size: number; browser_download_url: string }

const mb = (bytes: number) => `${Math.round(bytes / 1048576)} MB`
const isNoise = (n: string) => n.endsWith('.blockmap') || n.endsWith('.yml') || n.endsWith('.tar.gz')

/** electron-builder's artifactName patterns, which is what layer 2 relies on. */
const SCHEME = {
  macos: { primary: (v: string) => `OpsMaxx-${v}-arm64.dmg`, others: (v: string) => [`OpsMaxx-${v}-x64.dmg`] },
  windows: { primary: (v: string) => `OpsMaxx-${v}-setup.exe`, others: (v: string) => [`OpsMaxx-${v}-portable.exe`] },
  linux: { primary: (v: string) => `OpsMaxx-${v}-x86_64.AppImage`, others: (v: string) => [`OpsMaxx-${v}-amd64.deb`] }
} as const

const verifyFor = (id: keyof typeof SCHEME, file: string) =>
  id === 'windows'
    ? `Get-FileHash ${file} -Algorithm SHA256`
    : id === 'macos'
      ? `shasum -a 256 ${file}`
      : `sha256sum ${file}`

function shape(
  version: string | null,
  resolvedBy: Release['resolvedBy'],
  pick: (id: keyof typeof SCHEME) => { primary: Asset | null; others: Asset[] }
): Release {
  const ids: (keyof typeof SCHEME)[] = ['macos', 'windows', 'linux']
  const platforms = {} as Release['platforms']
  for (const id of ids) {
    const { primary, others } = pick(id)
    platforms[id] = {
      id,
      primary,
      others,
      verify: verifyFor(id, primary?.file ?? (id === 'windows' ? 'OpsMaxx-*-setup.exe' : id === 'macos' ? 'OpsMaxx-*.dmg' : 'OpsMaxx-*.AppImage'))
    }
  }
  return { version, url: RELEASES, resolvedBy, platforms }
}

async function viaApi(): Promise<Release | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': UA,
        // Any token in the build environment lifts the 60/hour IP limit to
        // 5000/hour. Optional: layer 2 covers its absence.
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      }
    })
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const json = (await res.json()) as { tag_name?: string; assets?: GhAsset[] }
    const assets = json.assets ?? []
    if (!assets.length) throw new Error('no assets in API response')
    const version = (json.tag_name ?? '').replace(/^v/, '') || null

    const find = (test: (n: string) => boolean): Asset | null => {
      const a = assets.find((x) => !isNoise(x.name) && test(x.name))
      return a ? { file: a.name, url: a.browser_download_url, size: mb(a.size) } : null
    }
    const byId = {
      macos: { primary: find((n) => n.endsWith('-arm64.dmg')), others: [find((n) => n.endsWith('-x64.dmg'))] },
      windows: { primary: find((n) => n.endsWith('-setup.exe')), others: [find((n) => n.endsWith('-portable.exe'))] },
      linux: { primary: find((n) => n.endsWith('.AppImage')), others: [find((n) => n.endsWith('.deb'))] }
    }
    return shape(version, 'api', (id) => ({
      primary: byId[id].primary,
      others: byId[id].others.filter(Boolean) as Asset[]
    }))
  } catch (err) {
    console.warn('[releases] API layer failed:', (err as Error).message)
    return null
  }
}

/**
 * Follows /releases/latest to read the tag, then sizes each asset with a HEAD.
 *
 * The hop count is deliberate. This reads `Location` by hand rather than
 * letting fetch follow, because the tag is only visible in the header and is
 * gone by the time a followed request settles. But "one hop lands on /tag/"
 * is an assumption github.com is free to break, and did: a repo rename adds a
 * slug redirect in front, so /releases/latest answers with the *new* repo's
 * /releases/latest and the tag only appears on the hop after that. Matching a
 * single response meant this layer threw, and since it exists precisely for
 * when the API has already failed, the site fell through to layer 3 and every
 * download button degraded to "go to the releases page".
 */
const MAX_HOPS = 5

async function tagFromRedirects(from: string): Promise<string | null> {
  let url = from
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    const res = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': UA } })
    const location = res.headers.get('location')
    if (!location) return null
    const next = new URL(location, url).toString()
    const version = (next.match(/\/tag\/v?([^/]+)$/) || [])[1]
    if (version) return version
    url = next
  }
  return null
}

async function viaRedirect(): Promise<Release | null> {
  try {
    const version = await tagFromRedirects(RELEASES)
    if (!version) throw new Error(`no tag within ${MAX_HOPS} redirects from ${RELEASES}`)

    const size = async (file: string): Promise<Asset | null> => {
      const url = `https://github.com/${REPO}/releases/download/v${version}/${file}`
      try {
        const head = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': UA } })
        if (!head.ok) return null
        const len = Number(head.headers.get('content-length') ?? 0)
        return { file, url, size: len ? mb(len) : '' }
      } catch {
        return null
      }
    }

    const ids: (keyof typeof SCHEME)[] = ['macos', 'windows', 'linux']
    const resolved = {} as Record<keyof typeof SCHEME, { primary: Asset | null; others: Asset[] }>
    for (const id of ids) {
      const primary = await size(SCHEME[id].primary(version))
      const others = (await Promise.all(SCHEME[id].others(version).map(size))).filter(Boolean) as Asset[]
      resolved[id] = { primary, others }
    }
    if (!resolved.macos.primary && !resolved.windows.primary && !resolved.linux.primary) {
      throw new Error('no asset responded to HEAD')
    }
    console.warn(`[releases] resolved v${version} without the API, from the redirect and HEAD requests`)
    return shape(version, 'redirect', (id) => resolved[id])
  } catch (err) {
    console.warn('[releases] redirect layer failed:', (err as Error).message)
    return null
  }
}

export async function getRelease(): Promise<Release> {
  const release = (await viaApi()) ?? (await viaRedirect())
  if (release) {
    console.log(`[releases] v${release.version} resolved by the ${release.resolvedBy} layer`)
    return release
  }
  console.warn('[releases] every layer failed; download buttons will point at the releases page')
  return shape(null, 'fallback', () => ({ primary: null, others: [] }))
}
