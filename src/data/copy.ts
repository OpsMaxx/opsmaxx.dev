export const site = {
  domain: 'opsmaxx.dev',
  url: 'https://opsmaxx.dev',
  repo: 'https://github.com/OpsMaxx/OpsMaxx',
  releases: 'https://github.com/OpsMaxx/OpsMaxx/releases/latest',
  version: '0.28.2',
  title: 'OpsMaxx — SSH, SFTP, databases and a vault in one free app',
  description:
    'A free, open-source SSH client, SFTP browser, database manager, secrets vault and MCP gateway for AI agents. Windows, macOS and Linux. No account, no telemetry.'
}

export const hero = {
  eyebrow: 'Free and open source · MIT',
  h1: 'Every server you look after, in one window.',
  sub: 'OpsMaxx keeps your terminal, files, databases, tunnels and secrets in a single app — all sharing one credential store, so you stop hunting for the key you saved somewhere else.',
  ctaPrimary: 'Download OpsMaxx',
  ctaSecondary: 'View on GitHub',
  trust: 'No account. No telemetry. No paid tier.',
  shot: {
    src: '/shots/fleet.png',
    alt: 'The OpsMaxx fleet monitor: fifteen servers grouped by role, each with live CPU, memory, disk and network',
    caption: 'Fleet monitor · 15 servers, live metrics'
  }
}

export const stats = [
  { n: '5', label: 'database engines built in' },
  { n: '0', label: 'credentials an AI agent ever sees' },
  { n: '3', label: 'platforms, one codebase' }
]

/* ------------------------------------------------------------------ tour */

export type TourItem = {
  id: string
  tab: string
  headline: string
  body: string
  bullets: string[]
  shot: string
  alt: string
}

export const tour: TourItem[] = [
  {
    id: 'fleet',
    tab: 'Fleet',
    headline: 'See every server at once, not one tab at a time.',
    body: 'Group servers by role and watch CPU, memory, disk and network across all of them. Background checks keep running while you are looking at something else.',
    bullets: [
      'Live metrics per server, grouped how you work',
      'Alerts on CPU, memory and failed systemd units',
      'Webhooks to Slack, Discord or Teams — names, never hostnames'
    ],
    shot: '/shots/fleet.png',
    alt: 'Fleet monitor showing fifteen servers grouped into databases, production, jump servers and staging'
  },
  {
    id: 'access',
    tab: 'AI access',
    headline: 'Decide what an agent may do, one capability at a time.',
    body: 'Access groups are not a single yes/no switch. Every capability is ALLOW, ASK or DENY, and you can override individual file paths on top of that.',
    bullets: [
      'Four groups ship with the app; add as many as you want',
      'ASK holds the request in Approvals until you answer',
      'Sudo and unrestricted shells are refused for every group'
    ],
    shot: '/shots/access.png',
    alt: 'Access group editor with ALLOW, ASK and DENY set per capability'
  },
  {
    id: 'audit',
    tab: 'Audit log',
    headline: 'Every action an agent took, and what happened to it.',
    body: 'Allowed, approved, denied or failed — with the agent, the workspace, the server and the exact command. Secrets are stripped before anything is written down.',
    bullets: [
      'Claude Code, Codex and Gemini CLI, side by side',
      'Denied actions logged as loudly as successful ones',
      'No passwords, keys or tokens, ever'
    ],
    shot: '/shots/audit.png',
    alt: 'Audit log listing agent actions with approval state and result'
  },
  {
    id: 'connect',
    tab: 'Jump hosts',
    headline: 'Chain as many bastions as your network actually needs.',
    body: 'Each hop carries its own credentials. Connections are shared, so a two-factor code is something you type once rather than once per session.',
    bullets: [
      'Unlimited chained hops per server',
      'Imports ~/.ssh/config, ProxyJump entries included',
      'Databases and SFTP ride the same connection'
    ],
    shot: '/shots/jumphosts.png',
    alt: 'Server dialog with a chain of jump hosts, each with its own credentials'
  }
]

/* --------------------------------------------------------------- features */

export const featuresSection = {
  eyebrow: 'One app',
  headline: 'The four windows you keep open, and four more you have been putting off.',
  deck: 'All of it shares one encrypted credential store, so nothing has to be pasted between apps.'
}

export type Feature = {
  icon: string
  name: string
  line: string
  chips?: string[]
  span?: 'wide' | 'tall'
}

export const features: Feature[] = [
  {
    icon: 'terminal',
    name: 'Terminal and files, one connection',
    line: 'A GPU-rendered xterm with split panes and search, and an SFTP browser riding the same session. Two-factor is a code you type once, not once per tab.',
    chips: ['split panes', 'copy-on-select', 'unlimited jump hosts', 'sftp edit in place'],
    span: 'wide'
  },
  {
    icon: 'database',
    name: 'Five database engines',
    line: 'Query and shell into each one, through a bastion when that is the only route.',
    chips: ['postgres', 'mysql', 'sql server', 'mongodb', 'redis']
  },
  {
    icon: 'lock',
    name: 'Encrypted vault',
    line: 'AES-256-GCM store for logins, API keys and free-form pairs. No MCP tool can read it.',
    chips: ['os keychain', 'per-workspace', 'portable backup']
  },
  {
    icon: 'network',
    name: 'Tunnels, VPN and inspection',
    line: 'Local and remote forwards, a SOCKS5 proxy, userspace WireGuard that never touches your routing table, and a proxy that shows the HTTPS a machine is really making.',
    chips: ['wireguard', 'openvpn', 'frp', 'socks5', 'traffic inspector'],
    span: 'wide'
  },
  {
    icon: 'layers',
    name: 'Workspaces',
    line: 'Separate, optionally password-protected spaces per client or environment.',
    chips: ['per-client', 'one encrypted backup file']
  },
  {
    icon: 'keyboard',
    name: 'Every shortcut rebindable',
    line: 'Per context, with conflict detection and export or import.',
    chips: ['command palette', 'ctrl k']
  }
]

/* ------------------------------------------------------------- operations */

export const operations = {
  eyebrow: 'Fleet operations',
  headline: 'Run the fleet, not one box at a time.',
  deck: 'Twenty-odd operations across every server you have added — and every one of them stays off until you turn it on.',
  stats: [
    { n: '15', label: 'servers on one screen, live' },
    { n: '20+', label: 'fleet operations built in' },
    { n: '0', label: 'agents to install on a server' }
  ],
  groups: [
    {
      title: 'Know',
      items: [
        ['Inventory', 'OS, version, what is pending, last seen'],
        ['Configuration drift', 'what changed since you last looked'],
        ['Capacity trends', 'where disk and memory are heading'],
        ['Security posture', 'ssh config, sudo rules, ports, firewall'],
        ['Access and keys', 'which key opens which server, and whose'],
        ['Fleet search', 'search what is collected, touching nothing']
      ]
    },
    {
      title: 'Change',
      items: [
        ['Patching in waves', 'stops at the first server that comes back unhealthy'],
        ['Run one command everywhere', 'named in a confirmation, survives the app closing'],
        ['Cron', 'read and edit crontabs, planned then approved'],
        ['Rules', 'when this fires, run that — with the same approval'],
        ['Backups', 'scheduled dumps, restore verified by restoring'],
        ['Change log', 'who approved what, when, and what it did']
      ]
    },
    {
      title: 'Operate',
      items: [
        ['Docker', 'honest per-item sizes, reclaim by id, never a blind prune'],
        ['Compose', 'services, state, and drift from the file on disk'],
        ['Kubernetes', 'workloads, cordon, drain and exec'],
        ['Databases, operated', 'replication lag, slow queries, table sizes'],
        ['Log tailing', 'follow one file across many servers, in one pane'],
        ['Runbooks', 'what was run the last three times this alert fired']
      ]
    }
  ],
  footnote: 'Drain refuses seven ways, and treats a read that did not answer as a refusal in itself.'
}

/* -------------------------------------------------------------- personas */

export const personas = {
  eyebrow: 'Who it is for',
  headline: 'Four ways people actually use it.',
  items: [
    {
      icon: 'siren',
      role: 'On call at 3am',
      line: 'An alert fires on CPU, memory or a dead systemd unit. The fleet monitor shows which server, the runbook shows what was run the last three times, and the terminal is one click away.',
      tags: ['Alerts', 'Fleet monitor', 'Runbooks']
    },
    {
      icon: 'briefcase',
      role: 'Consulting across clients',
      line: 'One workspace per client, each optionally password-protected, each with its own servers and secrets. The whole lot exports to a single passphrase-protected file that opens on your other machine.',
      tags: ['Workspaces', 'Vault', 'Encrypted backup']
    },
    {
      icon: 'server',
      role: 'Keeping a platform patched',
      line: 'Patch in waves that stop on the first unhealthy server, watch drift since last week, and read the security posture as it actually is on the box rather than as documented.',
      tags: ['Patching', 'Drift', 'Security posture']
    },
    {
      icon: 'bot',
      role: 'Working alongside agents',
      line: 'Give Claude Code a read-only group on staging and an ASK group on production. It works on its own until something matters, then it waits for you.',
      tags: ['Access groups', 'Approvals', 'Audit log']
    }
  ]
}

/* --------------------------------------------------------------------- ai */

export const ai = {
  eyebrow: 'MCP',
  headline: 'The best thing you can hand an AI agent is a name, not a key.',
  body: 'An agent asks for a server by the friendly name you gave it. OpsMaxx looks the real connection up in your OS keychain, checks the access group, runs the command over normal SSH, and strips secrets out of the output before the agent sees any of it.',

  clients: ['Claude Code', 'Claude Desktop', 'Codex', 'Gemini CLI', 'any MCP client'],

  toolCount: 28,
  toolGroups: [
    { title: 'Servers', tools: ['list_servers', 'get_server_details', 'get_host_facts', 'get_server_metrics', 'execute_command', 'add_server'] },
    { title: 'Files', tools: ['list_files', 'read_file', 'write_file'] },
    { title: 'Containers', tools: ['list_containers', 'container_logs', 'container_action', 'list_images', 'compose_status'] },
    { title: 'Databases', tools: ['list_databases', 'query_database'] },
    { title: 'Network', tools: ['list_tunnels', 'set_tunnel', 'list_vpns', 'set_vpn'] },
    { title: 'Fleet', tools: ['fleet_inventory', 'fleet_drift', 'get_config_drift', 'get_capacity_trends', 'list_alerts', 'backup_status'] }
  ],

  flow: [
    { step: 'Agent asks', detail: 'execute_command on "Nginx Prod"' },
    { step: 'Policy check', detail: 'access group says ALLOW, ASK or DENY' },
    { step: 'You approve', detail: 'ASK waits in Approvals; the agent waits too' },
    { step: 'OpsMaxx connects', detail: 'real host and key read from the OS keychain' },
    { step: 'Output redacted', detail: 'secrets and secret-shaped strings stripped' },
    { step: 'Written down', detail: 'agent, server, action and result in the audit log' }
  ],

  neverLabel: 'What an agent never receives',
  never: [
    'SSH passwords',
    'Private keys or passphrases',
    'Database credentials',
    'Hostnames, IPs and usernames',
    'Anything in the vault',
    'Sudo or root shells'
  ],
  closing: 'The bridge listens on 127.0.0.1. Sudo and unrestricted shells are refused for every group, with no setting that turns them back on.',
  cta: 'Read the threat model',
  pairing: 'opsmaxx claude'
}

/* ---------------------------------------------------------------- compare */

export const compare = {
  eyebrow: 'Comparison',
  headline: 'Next to MobaXterm, PuTTY, Termius and SecureCRT.',
  deck: 'Each of them sends you to a second application the moment you need a table or a key.',
  cols: ['OpsMaxx', 'MobaXterm', 'PuTTY', 'Termius', 'SecureCRT'],
  rows: [
    { label: 'Price', v: ['Free, MIT', 'Free tier, paid Pro', 'Free', 'Free tier, paid Pro', 'Paid licence'] },
    { label: 'Open source', v: [true, false, true, false, false] },
    { label: 'Windows / macOS / Linux', v: ['All three', 'Windows only', 'All three', 'All three', 'All three'] },
    { label: 'Account required', v: ['No', 'No', 'No', 'Yes, for sync', 'No'] },
    { label: 'Telemetry', v: ['None', 'Some', 'None', 'Yes', 'Some'] },
    { label: 'Saved sessions', v: ['Unlimited', '12 on free tier', 'Unlimited', 'Limited on free tier', 'Unlimited'] },
    { label: 'Database client', v: ['5 engines', false, false, false, false] },
    { label: 'Encrypted secrets vault', v: ['AES-256-GCM', 'Password store', false, 'Cloud vault', false] },
    { label: 'Live server monitoring', v: [true, 'Basic', false, false, false] },
    { label: 'AI agent access (MCP)', v: ['Scoped per capability', false, false, false, false] }
  ]
}

/* ---------------------------------------------------------------- install */

export const install = {
  eyebrow: 'Install',
  headline: 'Download it, open it, add a server.',
  deck: 'No sign-up, no licence key, nothing to activate.',
  tabs: [
    {
      id: 'macos',
      label: 'macOS',
      cmd: '# Apple Silicon and Intel builds\nopen OpsMaxx-*.dmg',
      note: 'Ad-hoc signed rather than notarized: right-click, then Open, the first time.'
    },
    {
      id: 'windows',
      label: 'Windows',
      cmd: '# Installer, or a portable .exe that runs from a USB stick\nOpsMaxx-setup.exe',
      note: 'SmartScreen shows a warning for unsigned apps: More info, then Run anyway.'
    },
    {
      id: 'linux',
      label: 'Linux',
      cmd: 'chmod +x OpsMaxx-*.AppImage && ./OpsMaxx-*.AppImage\n# or: sudo apt install ./OpsMaxx-*-amd64.deb',
      note: 'The AppImage runs on any distribution. A .deb is there for Debian and Ubuntu.'
    }
  ],
  agentLabel: 'Connecting Claude Code takes one command',
  agentCmd: 'opsmaxx claude',
  agentNote: 'A pairing code appears in the app. There is no token to copy or paste.'
}

/* -------------------------------------------------------------------- faq */

export const faq = [
  {
    q: 'Why does my computer warn me about the download?',
    a: 'OpsMaxx is not signed with a code-signing certificate, which costs $200–$400 a year. The warning means your OS cannot confirm who published the app, not that the file is unsafe. Every release is scanned by 70+ antivirus engines and publishes a SHA-256 you can check yourself.'
  },
  {
    q: 'Is it really free, or free for now?',
    a: 'MIT licensed, with no paid tier, no session limit and no subscription. The whole source is public, so a future paywall is something you could fork your way around.'
  },
  {
    q: 'Does it phone home?',
    a: 'No account, no telemetry, no analytics. Every connection the app makes is one you configured, apart from the update check you can switch off.'
  },
  {
    q: 'Can an AI agent do something I did not intend?',
    a: 'Only within the access group you set. Sudo and unrestricted shells are refused for every group with no setting that reverses it, sensitive actions wait for your approval, and everything that happened is in the audit log.'
  },
  {
    q: 'Do I have to give up the setup I already have?',
    a: 'No. OpsMaxx imports ~/.ssh/config including ProxyJump entries, and runs perfectly happily beside whatever you use today.'
  },
  {
    q: 'Where are my passwords and keys stored?',
    a: 'In your operating system keychain, with the vault encrypted using AES-256-GCM. Nothing is uploaded anywhere, and there is no MCP tool that can read the vault at all.'
  }
]

export const finalCta = {
  headline: 'Close a few of those windows.',
  line: 'One download, three platforms, nothing to sign up for.',
  button: 'Download OpsMaxx',
  secondary: 'Browse the source'
}
