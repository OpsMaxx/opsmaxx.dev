# opsmaxx.dev

Landing page for [OpsMaxx](https://github.com/OpsMaxx/OpsMaxx) — a free, MIT-licensed
SSH client, SFTP browser, database manager, secrets vault and MCP gateway for AI agents.

Astro, static output, React islands only where something has to move. UI is built from the
[ReUI](https://reui.io) shadcn registry (`@reui` namespace, free `c-*` items).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

## Structure

| Path | What |
|---|---|
| `src/data/copy.ts` | Every word on the page. Edit copy here, not in markup. |
| `src/pages/index.astro` | The page. Static except for three islands. |
| `src/components/islands/Knife.tsx` | The Swiss Army knife blade selector. |
| `src/components/islands/InstallTabs.tsx` | Per-OS install snippets, with copy. |
| `src/components/islands/Faq.tsx` | FAQ accordion. |
| `src/components/reui/`, `src/components/ui/` | Components installed from the ReUI registry. |
| `src/styles/global.css` | Tailwind v4 theme and OpsMaxx brand tokens. |

## Adding a component

```bash
npx shadcn@latest add @reui/c-<component>-<n>
```

The `@reui` registry is already configured in `components.json`. Free items are the `c-*`
ones and need no licence key.

## Deploy

Cloudflare Pages, connected to this repository. Every push to `main` deploys.

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(leave empty)* |
| Node version | 22, from `.nvmrc` |

`public/_headers` carries the cache and security headers; Pages applies it at the edge.
The build is fully static, so any other static host works the same way.

### Download links

`src/lib/releases.ts` reads the latest release from the GitHub API **at build time**
and matches assets by their naming scheme, so every download button points straight at
the right installer with its real filename and size. Visitors make no API call of their
own, and there is no rate limit to hit.

The trade-off is that a new release only appears once the site rebuilds.
`.github/workflows/refresh-release-links.yml` triggers a Pages build daily, and can be
run by hand after publishing a release — set the `CF_PAGES_DEPLOY_HOOK` secret first. If
the API call fails during a build, the buttons fall back to the releases page.
