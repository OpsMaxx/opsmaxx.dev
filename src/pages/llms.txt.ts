import type { APIRoute } from 'astro'
import { getRelease } from '@/lib/releases'
import {
  site, hero, features, operations, personas, ai, install, faq
} from '@/data/copy'

export const prerender = true

/**
 * https://llmstxt.org — a plain-text brief for models that land here.
 *
 * Generated from the same copy and the same release data the page renders,
 * so the two cannot drift. Everything in it is a claim traceable to the
 * repository; nothing is written twice by hand.
 */
export const GET: APIRoute = async () => {
  const r = await getRelease()
  const v = r.version ? `v${r.version}` : 'the latest release'

  const dl = (id: 'macos' | 'windows' | 'linux', label: string) => {
    const p = r.platforms[id]
    const rows = [p.primary, ...p.others].filter(Boolean) as { file: string; url: string; size: string }[]
    return rows.map((a) => `- ${label}: [${a.file}](${a.url}) (${a.size})`).join('\n')
  }

  const body = `# OpsMaxx

> ${hero.sub} Free, MIT licensed, no account and no telemetry. Windows, macOS and Linux.

OpsMaxx is a desktop application, not a hosted service. One window holds an SSH
terminal, an SFTP browser, five database engines, tunnels and VPN, an encrypted
secrets vault, fleet operations across every server you add, and a
policy-scoped MCP bridge for AI agents — all sharing one credential store.
Everything belongs to a workspace: a separate, optionally password-locked space
per client or environment, which is also the boundary an AI agent is scoped to
and the unit a backup restores. Current release: ${v}.

## Download

${dl('macos', 'macOS')}
${dl('windows', 'Windows')}
${dl('linux', 'Linux')}
- All files and checksums: ${r.url}

The Windows build is unsigned and the macOS build is ad-hoc signed rather than
notarized, so both operating systems show a first-run warning. Every installer
is scanned before release and every SHA-256 is published in the release notes.

## What it does

${features.map((f) => `- **${f.name}** — ${f.line}${f.chips ? ` (${f.chips.join(', ')})` : ''}`).join('\n')}

## Fleet operations

${operations.deck}

${operations.groups.map((g) => `### ${g.title}\n\n${g.items.map(([n, d]) => `- **${n}** — ${d}`).join('\n')}`).join('\n\n')}

## MCP bridge for AI agents

${ai.body}

Supported clients: ${ai.clients.join(', ')}.

An agent never receives: ${ai.never.map((n) => n.toLowerCase()).join('; ')}.

${ai.closing}

### Tools an agent can call (${ai.toolCount})

${ai.toolGroups.map((g) => `- **${g.title}**: ${g.tools.join(', ')}`).join('\n')}

Each tool is governed separately as ALLOW, ASK or DENY by an access group, and
file paths can be overridden on top of that. Connect Claude Code with
\`${install.finish.agentCmd}\`, or through AI & MCP → Overview → Connect Claude Code
in the app. The macOS installer does not put \`opsmaxx\` on the PATH.

## Who uses it

${personas.items.map((p) => `- **${p.role}** — ${p.line}`).join('\n')}

## FAQ

${faq.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Links

- Website: ${site.url}
- Source code: ${site.repo}
- Releases: ${site.releases}
- Security policy: ${site.repo}/blob/main/SECURITY.md
- AI threat model: ${site.repo}/blob/main/docs/AI-SECURITY.md
- Licence: MIT
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
