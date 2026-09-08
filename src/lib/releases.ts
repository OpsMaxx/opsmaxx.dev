/**
 * The latest release, read from the GitHub API at build time.
 *
 * Doing it here rather than in the browser means visitors get real download
 * URLs with no request of their own, no API rate limit, and no spinner. The
 * cost is that the site has to be rebuilt when a release ships; if the fetch
 * fails the page falls back to the releases page rather than breaking.
 */

const REPO = 'OpsMaxx/OpsMaxx'
const RELEASES = `https://github.com/${REPO}/releases/latest`

export type Asset = { file: string; url: string; size: string }

export type PlatformRelease = {
  id: 'macos' | 'windows' | 'linux'
  primary: Asset | null
  others: Asset[]
  /** The shell command that checks this platform's primary download. */
  verify: string
}

export type Release = {
  version: string | null
  url: string
  platforms: Record<'macos' | 'windows' | 'linux', PlatformRelease>
}

type GhAsset = { name: string; size: number; browser_download_url: string }

const mb = (bytes: number) => `${Math.round(bytes / 1048576)} MB`

/** Installer assets only — blockmaps and update manifests are not downloads. */
const isNoise = (n: string) => n.endsWith('.blockmap') || n.endsWith('.yml') || n.endsWith('.tar.gz')

function pick(assets: GhAsset[], test: (n: string) => boolean): Asset | null {
  const a = assets.find((x) => !isNoise(x.name) && test(x.name))
  return a ? { file: a.name, url: a.browser_download_url, size: mb(a.size) } : null
}

function empty(): Release {
  const blank = (id: PlatformRelease['id'], verify: string): PlatformRelease => ({
    id,
    primary: null,
    others: [],
    verify
  })
  return {
    version: null,
    url: RELEASES,
    platforms: {
      macos: blank('macos', 'shasum -a 256 OpsMaxx-*.dmg'),
      windows: blank('windows', 'Get-FileHash OpsMaxx-*-setup.exe -Algorithm SHA256'),
      linux: blank('linux', 'sha256sum OpsMaxx-*.AppImage')
    }
  }
}

export async function getRelease(): Promise<Release> {
  let assets: GhAsset[] = []
  let version: string | null = null

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'opsmaxx.dev-build' }
    })
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const json = (await res.json()) as { tag_name?: string; assets?: GhAsset[] }
    assets = json.assets ?? []
    version = (json.tag_name ?? '').replace(/^v/, '') || null
  } catch (err) {
    console.warn('[releases] falling back to the releases page:', (err as Error).message)
    return empty()
  }

  const macArm = pick(assets, (n) => n.endsWith('-arm64.dmg'))
  const macX64 = pick(assets, (n) => n.endsWith('-x64.dmg'))
  const winSetup = pick(assets, (n) => n.endsWith('-setup.exe'))
  const winPortable = pick(assets, (n) => n.endsWith('-portable.exe'))
  const appImage = pick(assets, (n) => n.endsWith('.AppImage'))
  const deb = pick(assets, (n) => n.endsWith('.deb'))

  return {
    version,
    url: RELEASES,
    platforms: {
      macos: {
        id: 'macos',
        primary: macArm,
        others: macX64 ? [macX64] : [],
        verify: `shasum -a 256 ${macArm?.file ?? 'OpsMaxx-*.dmg'}`
      },
      windows: {
        id: 'windows',
        primary: winSetup,
        others: winPortable ? [winPortable] : [],
        verify: `Get-FileHash ${winSetup?.file ?? 'OpsMaxx-*-setup.exe'} -Algorithm SHA256`
      },
      linux: {
        id: 'linux',
        primary: appImage,
        others: deb ? [deb] : [],
        verify: `sha256sum ${appImage?.file ?? 'OpsMaxx-*.AppImage'}`
      }
    }
  }
}
