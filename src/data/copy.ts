export const site = {
  domain: 'opsmaxx.dev',
  url: 'https://opsmaxx.dev',
  repo: 'https://github.com/OpsMaxx/OpsMaxx',
  releases: 'https://github.com/OpsMaxx/OpsMaxx/releases/latest',
  title: 'OpsMaxx — SSH, SFTP, databases and a vault in one free app',
  description:
    'Free, open-source SSH client, SFTP browser, database manager, secrets vault and MCP gateway for AI agents. Windows, macOS, Linux. No account, no telemetry.'
}

export const hero = {
  eyebrow: 'Free and open source · MIT',
  h1: 'Every server you look after, in one window.',
  sub: 'OpsMaxx keeps your terminal, files, databases, tunnels and secrets in a single app — separated into workspaces per client or environment, sharing one credential store, so you stop hunting for the key you saved somewhere else.',
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
  { n: '20', label: 'fleet operations, all off by default' },
  { n: '0', label: 'credentials an AI agent ever sees' }
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
    id: 'workspaces',
    tab: 'Workspaces',
    headline: 'One app, one client at a time.',
    body: 'Every server, database, tunnel, vault entry and agent session belongs to a workspace. Switch, and the whole app switches with you — so a production box is not one keystroke away while you are working on staging.',
    bullets: [
      'A password on a workspace locks it, not just hides it',
      'Agents are scoped to a workspace and cannot see past it',
      'Each one backs up and restores as a single encrypted file'
    ],
    shot: '/shots/workspaces.png',
    alt: 'Workspace manager listing separate workspaces for different clients, one of them password-protected'
  },
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
      'Escalation shells are refused for every group'
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
    icon: 'layers',
    name: 'Workspaces keep clients apart',
    line: 'Servers, databases, tunnels, vault entries and agent sessions all belong to a workspace. Give one a password and it is locked rather than hidden — and an AI agent scoped to it cannot see a thing outside it.',
    chips: ['per client or environment', 'password-locked', 'agent scope boundary', 'one encrypted backup file'],
    span: 'wide'
  },
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
    line: 'Local and remote forwards, a SOCKS5 proxy, userspace WireGuard that needs no administrator rights, and a proxy that shows the HTTPS a machine is really making.',
    chips: ['wireguard', 'openvpn', 'frp', 'socks5', 'traffic inspector'],
    span: 'wide'
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
    'An interactive root shell'
  ],
  closing: 'The bridge listens on 127.0.0.1. Escalation shells — sudo -i, su, sudo bash — are refused for every group, with no setting that turns them back on.',
  cta: 'Read the threat model',
  pairing: 'opsmaxx claude'
}

export type Platform = {
  id: 'macos' | 'windows' | 'linux'
  label: string
  primaryNote: string
  otherNote: string
  warning: {
    quote: string | null
    why: string
    steps: string[]
    cmd?: string
    cmdNote?: string
  }
}

export const install = {
  eyebrow: 'Getting started',
  headline: 'Downloaded, past the warning, connected.',
  deck: 'Three steps, and the middle one is the part nobody else tells you about honestly.',

  platforms: [
    {
      id: 'macos',
      label: 'macOS',
      primaryNote: 'Apple Silicon, M1 and later',
      otherNote: 'Intel Macs',
      warning: {
        quote: 'Apple could not verify OpsMaxx is free of malware.',
        why: 'The macOS build is ad-hoc signed, so the system can tell the bundle has not been altered since it was built — but not who built it. That needs a $99/year developer account.',
        steps: [
          'macOS 15 Sequoia and later: System Settings → Privacy & Security → Open Anyway',
          'macOS 14 and earlier: right-click the app → Open → Open'
        ],
        cmd: '/usr/bin/xattr -cr /Applications/OpsMaxx.app',
        cmdNote: 'Optional, if you would rather not click through it. The /usr/bin/ prefix is deliberate: a Homebrew or pip xattr comes earlier on your PATH and does not accept -r.'
      }
    },
    {
      id: 'windows',
      label: 'Windows',
      primaryNote: 'Installer. Pick this one if unsure.',
      otherNote: 'One file, no install, runs from a USB stick',
      warning: {
        quote: 'Windows protected your PC.',
        why: 'The Windows build carries no signature at all. A code-signing certificate runs $200–$400 a year, which a free MIT project has no income to cover.',
        steps: ['Click More info', 'Click Run anyway']
      }
    },
    {
      id: 'linux',
      label: 'Linux',
      primaryNote: 'Runs on any distribution',
      otherNote: 'Debian and Ubuntu',
      warning: {
        quote: null,
        why: 'Nothing stands in your way here. Make the AppImage executable and run it, or install the .deb.',
        steps: [],
        cmd: 'chmod +x OpsMaxx-*.AppImage && ./OpsMaxx-*.AppImage',
        cmdNote: 'Or install the .deb: sudo apt install ./OpsMaxx-*-amd64.deb'
      }
    }
  ] as Platform[],

  steps: [
    { n: '01', title: 'Download it', sub: 'No sign-up, no licence key, nothing to activate.' },
    { n: '02', title: 'Get past the first-run warning', sub: 'Unsigned is not the same as unsafe. Here is the difference.' },
    { n: '03', title: 'Add your servers', sub: 'Or hand the whole lot to an agent.' }
  ],

  trustLine: 'Every installer is scanned before release, and every file\'s SHA-256 is published in the release notes.',

  // A package manager is the install some people will not go without, so the
  // routes that exist are named on the page rather than buried in the README.
  managers: {
    label: 'Or use a package manager',
    rows: [
      { id: 'macos', cmd: 'brew install --cask opsmaxx/tap/opsmaxx', note: 'Run brew trust opsmaxx/tap first — Homebrew will not load a third-party tap until you do.' },
      { id: 'windows', cmd: 'winget install OpsMaxx.OpsMaxx', note: 'In review at microsoft/winget-pkgs. Use the installer above until it lands.' },
      // Deliberately no Linux row: there is no apt or AUR repository yet, and
      // repeating the .deb command from step 02 under a "package manager"
      // heading would imply one exists.

    ]
  },
  verifyLabel: 'Optional: check the hash against the release page',

  finish: {
    importTitle: 'Import what you already have',
    importBody: 'OpsMaxx reads ~/.ssh/config, ProxyJump entries included, so the servers you already reach by name are there on first run.',
    agentTitle: 'Connect Claude Code',
    agentBody: 'AI & MCP → Overview → Connect Claude Code copies a ready command with the token already in it. One paste in a terminal and the bridge is live.',
    agentCmd: 'opsmaxx claude',
    agentCmdNote: {
      macos: 'There is a CLI too, though the macOS installer does not put opsmaxx on your PATH — call the launcher inside the app bundle, or use the button above.',
      windows: 'Or use the CLI, which the Windows installer does put on your PATH:',
      linux: 'Or use the CLI:'
    }
  }
}

/* -------------------------------------------------------------------- faq */

export const faq = [
  {
    q: 'Why does my computer warn me about the download?',
    a: 'The Windows build carries no signature, and the macOS build is ad-hoc signed rather than notarized. Certificates cost $200–$400 a year for Windows and $99 for Apple. The warning means your OS cannot confirm who published the app, not that the file is unsafe. Every installer is scanned with ClamAV, the Windows one with Defender, and the .exe and .dmg with VirusTotal\'s 70+ engines — and every SHA-256 is in the release notes for you to check.'
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
    a: 'Only within the access group you set. Escalation shells — sudo -i, su, sudo bash — are refused for every group with no setting that reverses it, anything set to ASK waits for your approval, and every action lands in the audit log. Individual privileged reads do use sudo -n, which you can turn off.'
  },
  {
    q: 'Do I have to give up the setup I already have?',
    a: 'No. OpsMaxx imports ~/.ssh/config including ProxyJump entries, and runs perfectly happily beside whatever you use today.'
  },
  {
    q: 'Where are my passwords and keys stored?',
    a: 'Server credentials go in your operating system keychain, read only by the main process. The vault is separate: AES-256-GCM under a master password that is never stored, derived with scrypt. Neither leaves your machine, and no MCP tool can read the vault at all.'
  }
]

export const finalCta = {
  headline: 'Close a few of those windows.',
  line: 'One download, three platforms, nothing to sign up for.',
  button: 'Download OpsMaxx',
  secondary: 'Browse the source'
}
