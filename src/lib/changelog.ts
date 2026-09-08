/**
 * The changelog, assembled at build time.
 *
 * GitHub's generated "What's Changed" is empty for almost every OpsMaxx
 * release, because the project commits to main rather than through pull
 * requests — so building the page from release bodies would produce sixty
 * entries saying nothing. The substance is in the commits between two tags,
 * and this repository writes good commit subjects, so that is what the page
 * shows.
 *
 * One list request plus one compare per release shown. That is why only the
 * most recent releases are rendered rather than all sixty-two: the rest are a
 * link away, and a build should not make seventy API calls to produce a page
 * nobody scrolls to the bottom of.
 */

const REPO = 'OpsMaxx/OpsMaxx'
const UA = 'opsmaxx.dev-build'

/** How many releases get their commits expanded. */
export const SHOWN = 15

export type Release = {
  tag: string
  version: string
  date: string
  /** Commit subjects between the previous tag and this one, newest first. */
  changes: string[]
  url: string
  compareUrl: string | null
}

export type Changelog = {
  releases: Release[]
  total: number
  /** True when the API could not be reached and the page must degrade. */
  degraded: boolean
}

const headers = () => ({
  Accept: 'application/vnd.github+json',
  'User-Agent': UA,
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
})

async function gh<T>(path: string): Promise<T> {
  const res = await fetch(`https://api.github.com/repos/${REPO}/${path}`, { headers: headers() })
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${path}`)
  return (await res.json()) as T
}

/** "Release 0.28.3" and merge commits are bookkeeping, not changes. */
const isNoise = (subject: string) =>
  /^Release \d+\.\d+\.\d+/i.test(subject) ||
  /^Merge (branch|pull request|remote-tracking)/i.test(subject) ||
  /^Bump the cask to/i.test(subject)

export async function getChangelog(): Promise<Changelog> {
  type GhRelease = { tag_name: string; published_at: string | null; draft: boolean; html_url: string }
  type GhCompare = { commits: { commit: { message: string } }[] }

  let published: GhRelease[]
  try {
    const all = await gh<GhRelease[]>('releases?per_page=100')
    published = all
      .filter((r) => !r.draft && r.published_at)
      .sort((a, b) => (a.published_at! < b.published_at! ? 1 : -1))
  } catch (err) {
    console.warn('[changelog] could not list releases:', (err as Error).message)
    return { releases: [], total: 0, degraded: true }
  }

  const releases: Release[] = []
  for (let i = 0; i < Math.min(SHOWN, published.length); i++) {
    const r = published[i]
    const previous = published[i + 1]
    let changes: string[] = []

    if (previous) {
      try {
        const cmp = await gh<GhCompare>(`compare/${previous.tag_name}...${r.tag_name}`)
        changes = cmp.commits
          .map((c) => c.commit.message.split('\n')[0].trim())
          .filter((s) => s && !isNoise(s))
          .reverse()
      } catch (err) {
        // One failed compare is not worth losing the release over.
        console.warn(`[changelog] no commits for ${r.tag_name}:`, (err as Error).message)
      }
    }

    releases.push({
      tag: r.tag_name,
      version: r.tag_name.replace(/^v/, ''),
      date: r.published_at!,
      changes,
      url: r.html_url,
      compareUrl: previous
        ? `https://github.com/${REPO}/compare/${previous.tag_name}...${r.tag_name}`
        : null
    })
  }

  console.log(`[changelog] ${releases.length} of ${published.length} releases expanded`)
  return { releases, total: published.length, degraded: false }
}
