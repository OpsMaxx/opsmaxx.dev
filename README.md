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

`npm run build` emits a fully static `dist/`. Any static host works — Cloudflare Pages,
Vercel, Netlify, GitHub Pages. Build command `npm run build`, output directory `dist`.
