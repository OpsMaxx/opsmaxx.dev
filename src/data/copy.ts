export const site = {
  domain: 'opsmaxx.dev',
  url: 'https://opsmaxx.dev',
  repo: 'https://github.com/OpsMaxx/OpsMaxx',
  releases: 'https://github.com/OpsMaxx/OpsMaxx/releases/latest',
  title: 'OpsMaxx — stop tab-maxxing your servers',
  // The title carries the hook and this says what the thing is, so a link
  // preview in an ad or a group chat reads as joke, then substance.
  //
  // Deliberately 100 characters or fewer. WhatsApp cut an earlier
  // 156-character version at "and a secrets vault" — mid-phrase, with the
  // closing claims lost. Anything that fits whole cannot be truncated badly,
  // and a short meta description is no worse for search than a clipped one.
  description:
    'SSH, SFTP, databases, tunnels and a vault in one window. For you and your agents. Free, no account.'
}

export type HeroCopy = { eyebrow: string; h1: string; h1Mark: string; sub: string }

export const hero = {
  eyebrow: 'Free · MIT · zero rizz required',
  h1: 'Stop tab-maxxing. Start OpsMaxxing.',
  // The words the olive highlight bar sits behind. Must occur in h1 — the
  // build fails if it does not (see index.astro).
  h1Mark: 'OpsMaxxing',
  sub: 'Terminal, files, databases, tunnels and secrets in one window. One workspace per client, one vault for every key. No more “which laptop has the prod key” energy.',
  // The same pitch without the voice, for llms.txt: a model summarising the
  // product should not have to decode slang to get the facts.
  plain: 'OpsMaxx keeps your terminal, files, databases, tunnels and secrets in a single app — separated into workspaces per client or environment, sharing one credential store, so you stop hunting for the key you saved somewhere else.',
  ctaPrimary: 'Download OpsMaxx',
  ctaSecondary: 'Read the source',
  trust: 'No account. No telemetry. No paid tier. No cap.',
  shot: {
    src: '/shots/v2/fleet.png',
    alt: 'The OpsMaxx fleet monitor: fifteen servers grouped by role, each with live CPU, memory, disk and network',
    caption: 'Fleet monitor · 15 servers, one glance'
  }
}

// Ad landing heroes, picked by ?v=<key> (see the inline script in
// index.astro). Each ad angle lands on a headline that finishes its sentence;
// an unknown or missing key keeps the default hero above, which is also what
// crawlers and visitors without JavaScript get. Every sub restates a claim the
// rest of the page already makes — an ad is not a licence to promise more.
export const heroVariants: Record<string, HeroCopy> = {
  agents: {
    eyebrow: 'MCP · ALLOW / ASK / DENY',
    h1: 'Let your agent touch prod. Keep the keys.',
    h1Mark: 'Keep the keys.',
    sub: 'Claude Code, Codex and Gemini CLI get a server name and an access group. Passwords, keys and hostnames never reach them, and anything set to ASK waits for your yes.'
  },
  oncall: {
    eyebrow: 'For whoever holds the pager',
    h1: 'Paged at 3am? One window, not fourteen.',
    h1Mark: 'One window',
    sub: 'The fleet monitor shows which box, the runbook shows what was run the last three times, and the terminal is one click away. Back to sleep sooner.'
  },
  clients: {
    eyebrow: 'For consultants and agencies',
    h1: 'Five clients. Zero prod mix-ups.',
    h1Mark: 'Zero prod mix-ups.',
    sub: 'One workspace per client, each with its own servers, secrets and agent scope. Put a password on one and it is locked, not just hidden.'
  },
  free: {
    eyebrow: 'MIT licensed',
    h1: 'Actually free. No cap.',
    h1Mark: 'No cap.',
    sub: 'No account, no telemetry, no paid tier, no session limit. SSH, SFTP, five databases, tunnels and a vault in one window, and the source is public.'
  }
}

export const stats = [
  { n: '5', label: 'database engines, zero extra apps' },
  { n: '21', label: 'fleet operations. Every write ships switched off.' },
  { n: '0', label: 'credentials your AI agent ever sees. Literally zero.' }
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

// Screenshots come from the app repo's `npm run demo:shots`, an invented
// estate (see scripts/shots.mjs). Every claim below is one the app makes on the
// screen shown, or one the rest of this page already makes.
const shot = (name: string): string => `/shots/v2/${name}.png`

export const tour: TourItem[] = [
  {
    id: 'workspaces',
    tab: 'Workspaces',
    headline: 'One client at a time. Prod stays out of reach.',
    body: 'Every server, database, tunnel, vault entry and agent session belongs to a workspace. Switch, and the whole app switches with you — so a production box is not one keystroke away while you are working on staging.',
    bullets: [
      'A password on a workspace locks it, not just hides it',
      'Agents are scoped to a workspace and cannot see past it',
      'Each one backs up and restores as a single encrypted file'
    ],
    shot: shot('workspaces'),
    alt: 'Workspace manager listing three client workspaces, one of them locked with a password'
  },
  {
    id: 'fleet',
    tab: 'Fleet',
    headline: 'Fifteen servers, one glance. Not fifteen tabs.',
    body: 'Group servers by role and watch CPU, memory, disk and network across all of them. Background checks keep running while you are looking at something else.',
    bullets: [
      'Live metrics per server, grouped how you work',
      'Fleet health leads with the one server that needs you',
      'Webhooks to Slack, Discord or Teams — names, never hostnames'
    ],
    shot: shot('fleet'),
    alt: 'Fleet monitor: fifteen servers grouped into databases and production, with CPU, memory, disk and network for each'
  },
  {
    id: 'terminal',
    tab: 'Terminal',
    headline: 'A real terminal. Two-factor once, not once per tab.',
    body: 'A GPU-rendered xterm with split panes and search, and a live monitor strip for the server under it. Jump hosts, two-factor and keys are settled once per connection, not once per tab.',
    bullets: ['Split panes and search', 'Unlimited jump hosts, each with its own credentials', 'Live CPU, memory, disk and network under the prompt'],
    shot: shot('terminal'),
    alt: 'A terminal session on api-01 running uptime, docker ps and systemctl status, with a live monitor strip below'
  },
  {
    id: 'files',
    tab: 'Files',
    headline: 'SFTP on the session you already opened.',
    body: 'An SFTP browser riding the connection the terminal already opened — no second login, no separate app. Browse, filter, upload and edit in place.',
    bullets: ['Same connection, same credentials as the terminal', 'Edit a remote file in place', 'Size, modified time and permissions at a glance'],
    shot: shot('files'),
    alt: 'The SFTP file browser on api-01 listing a home directory with sizes, dates and permissions'
  },
  {
    id: 'databases',
    tab: 'Databases',
    headline: 'Five databases. Zero extra apps.',
    body: 'Five engines built in — Postgres, MySQL, SQL Server, MongoDB and Redis — each with a query editor, a shell and its own operations view, reachable through a bastion when that is the only route.',
    bullets: ['Tables listed as soon as you connect', 'Results in a grid, with row count and timing', 'Nothing is sent to the server until you press Run'],
    shot: shot('database'),
    alt: 'A PostgreSQL connection with its tables listed and a query result grid of recent orders'
  },
  {
    id: 'docker',
    tab: 'Docker',
    headline: 'Docker, grouped the way you deployed it.',
    body: 'Containers on one host, grouped by compose project, with state, image, uptime and ports — and their logs, disk usage and live stats a click away. It uses the docker binary already on the server.',
    bullets: ['Grouped by compose project', 'Logs, disk usage and live CPU and memory', 'Nothing is started, stopped or removed until you ask'],
    shot: shot('docker'),
    alt: 'Docker containers on a server grouped by compose project, showing running and exited containers'
  },
  {
    id: 'kubernetes',
    tab: 'Kubernetes',
    headline: 'Spot the CrashLoopBackOff before Slack does.',
    body: 'Pods, workloads, nodes and events across namespaces, read with kubectl on the server you pick. A pod in CrashLoopBackOff is marked in red, with how often it has restarted.',
    bullets: [
      'Pods, workloads, nodes, events, usage and storage',
      'Reading only, except rollout restart — which asks first',
      'Never switches your context, never deletes anything'
    ],
    shot: shot('kubernetes'),
    alt: 'Kubernetes pods across namespaces, with one pod in CrashLoopBackOff and its restart count highlighted'
  },
  {
    id: 'posture',
    tab: 'Posture',
    headline: 'How locked-down every box is. Checks, not vibes.',
    body: 'Firewall, SELinux or AppArmor, sshd settings, failed logins, security updates, OOM kills and certificate expiry, for every server at once. A check that could not run is reported as exactly that — never as a pass.',
    bullets: ['The weak sshd settings named, per server', 'Failed logins and OOM kills over a stated window', 'Unread is shown as unread, not as clean'],
    shot: shot('posture'),
    alt: 'Security posture table for fifteen servers, flagging two with weak sshd settings and one killing processes for memory'
  },
  {
    id: 'vault',
    tab: 'Vault',
    headline: 'Every key in one vault. Not on a sticky note.',
    body: 'AES-256-GCM for logins, API keys, SSH keys and free-form notes, filed per workspace. Servers point at an entry instead of copying it, and no MCP tool can read it.',
    bullets: ['Logins, keys, SSH keys, VPN profiles and notes', 'Per-workspace, or shared on purpose', 'Touch ID unlock on a Mac, or lock it by hand'],
    shot: shot('vault'),
    alt: 'The vault unlocked, showing a login entry with its URL, username and a hidden password'
  },
  {
    id: 'http',
    tab: 'HTTP',
    headline: 'Send the request from the server’s side of the firewall.',
    body: 'Send requests from this machine or through any server’s SSH connection, with environments, collections and history. WebSocket and GraphQL too, and it imports OpenAPI specs and cURL commands.',
    bullets: ['Route a request through a server you are connected to', 'Collections, environments and history', 'WebSocket, GraphQL, OpenAPI and cURL import'],
    shot: shot('http'),
    alt: 'The HTTP client showing a GET request and its pretty-printed JSON response with status and timing'
  }
]

export const agentTour: TourItem[] = [
  {
    id: 'access',
    tab: 'AI access',
    headline: 'ALLOW, ASK or DENY. Per capability, not per vibe.',
    body: 'Access groups are not a single yes/no switch. Every capability is ALLOW, ASK or DENY, and you can override individual file paths on top of that.',
    bullets: [
      'Five groups ship with the app; add as many as you want',
      'ASK holds the request in Approvals until you answer',
      'Escalation shells are refused for every group'
    ],
    shot: shot('access'),
    alt: 'Access group editor with ALLOW, ASK and DENY set per capability'
  },
  {
    id: 'approvals',
    tab: 'Approvals',
    headline: 'Your agent wants sudo. You see exactly why.',
    body: 'The request waits, blocked, until you answer. You get the command, where it would run, how risky it is and why — and the agent’s own reason, marked as its words, not OpsMaxx’s.',
    bullets: ['Auto-denies if nobody answers in time', 'Approve once, deny, or decide later', 'One button to deny and stop all AI access'],
    shot: shot('approval'),
    alt: 'An approval dialog: Claude Code asking to run sudo systemctl restart nginx on api-01, rated high risk'
  },
  {
    id: 'audit',
    tab: 'Audit log',
    headline: 'Receipts for everything your agent did.',
    body: 'Allowed, approved, denied or failed — with the agent, the workspace, the server and the exact command. Secrets are stripped before anything is written down.',
    bullets: [
      'Claude Code, Codex and Gemini CLI, side by side',
      'Denied actions logged as loudly as successful ones',
      'No passwords, keys or tokens, ever'
    ],
    shot: shot('audit'),
    alt: 'Audit log listing agent actions with approval state and result'
  }
]

/* --------------------------------------------------------------- features */

export const featuresSection = {
  eyebrow: 'The consolidation arc',
  headline: 'Your whole ops stack, minus the alt-tab.',
  deck: 'The four windows you keep open, the four you keep putting off, and one encrypted credential store under all of them. Nothing gets pasted between apps.'
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
    name: 'Workspaces: no more prod-by-accident',
    line: 'Servers, databases, tunnels, vault entries and agent sessions all belong to a workspace. Give one a password and it is locked rather than hidden — and an AI agent scoped to it cannot see a thing outside it.',
    chips: ['per client or environment', 'password-locked', 'agent scope boundary', 'one encrypted backup file'],
    span: 'wide'
  },
  {
    icon: 'terminal',
    name: 'Terminal and files, one login',
    line: 'A GPU-rendered xterm with split panes and search, and an SFTP browser riding the same session. Two-factor is a code you type once, not once per tab.',
    chips: ['split panes', 'copy-on-select', 'unlimited jump hosts', 'sftp edit in place'],
    span: 'wide'
  },
  {
    icon: 'database',
    name: 'Five database engines, built in',
    line: 'Query and shell into each one, through a bastion when that is the only route.',
    chips: ['postgres', 'mysql', 'sql server', 'mongodb', 'redis']
  },
  {
    icon: 'lock',
    name: 'A vault your agent can’t open',
    line: 'AES-256-GCM store for logins, API keys and free-form pairs. No MCP tool can read it.',
    chips: ['os keychain', 'per-workspace', 'portable backup']
  },
  {
    icon: 'network',
    name: 'Tunnels, VPN and a traffic snitch',
    line: 'Local and remote forwards, a SOCKS5 proxy, userspace WireGuard that needs no administrator rights, and a proxy that shows the HTTPS a machine is really making.',
    chips: ['wireguard', 'openvpn', 'frp', 'socks5', 'traffic inspector'],
    span: 'wide'
  },
  {
    icon: 'keyboard',
    name: 'Every shortcut rebindable. Keyboard maxxers, rejoice.',
    line: 'Per context, with conflict detection and export or import.',
    chips: ['command palette', 'ctrl k']
  }
]

/* ------------------------------------------------------------- operations */

export const operations = {
  eyebrow: 'Fleet operations',
  headline: 'Maxx the fleet, not one box at a time.',
  deck: 'Twenty-odd operations across every server you have added. The four that write — patching, a command run everywhere, jobs and revoking a key — stay off until you flip them on, and a new one added in a later version never flips itself.',
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
        ['Cron', 'read the crontabs and timers; changing one is a job, planned then approved'],
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
  footnote: 'Drain refuses seven ways, and treats a read that did not answer as a refusal in itself. Paranoid? On purpose.'
}

/* -------------------------------------------------------------- personas */

export const personas = {
  eyebrow: 'Pick your character',
  headline: 'Four builds. Same app.',
  items: [
    {
      icon: 'siren',
      role: 'The 3am pager holder',
      line: 'An alert fires on CPU, memory or a dead systemd unit. The fleet monitor shows which server, the runbook shows what was run the last three times, and the terminal is one click away.',
      tags: ['Alerts', 'Fleet monitor', 'Runbooks']
    },
    {
      icon: 'briefcase',
      role: 'The five-client consultant',
      line: 'One workspace per client, each optionally password-protected, each with its own servers and secrets. The whole lot exports to a single passphrase-protected file that opens on your other machine.',
      tags: ['Workspaces', 'Vault', 'Encrypted backup']
    },
    {
      icon: 'server',
      role: 'The patch-day grinder',
      line: 'Patch in waves that stop on the first unhealthy server, watch drift since last week, and read the security posture as it actually is on the box rather than as documented.',
      tags: ['Patching', 'Drift', 'Security posture']
    },
    {
      icon: 'bot',
      role: 'The agent wrangler',
      line: 'Give Claude Code a read-only group on staging and an ASK group on production. It works on its own until something matters, then it waits for you.',
      tags: ['Access groups', 'Approvals', 'Audit log']
    }
  ]
}

/* --------------------------------------------------------------------- ai */

export const ai = {
  eyebrow: 'MCP',
  headline: 'Hand your agent a name, not a key.',
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
  headline: 'Download. Open. You’re OpsMaxxing.',
  deck: 'Three steps, and only Windows still needs the middle one.',

  platforms: [
    {
      id: 'macos',
      label: 'macOS',
      primaryNote: 'Apple Silicon, M1 and later',
      otherNote: 'Intel Macs',
      warning: {
        quote: null,
        why: 'Since 0.30.1 the macOS build is signed with an Apple Developer ID, notarized by Apple and has the ticket stapled into the app, so it opens normally — offline included. Nothing to click through and nothing to run.',
        steps: []
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
    { n: '01', title: 'Download it', sub: 'No sign-up, no licence key, no “contact sales”.' },
    { n: '02', title: 'Get past the Windows warning', sub: 'Only Windows still warns, and unsigned is not the same as unsafe.' },
    { n: '03', title: 'Add your servers', sub: 'Or let your agent do the data entry.' }
  ],

  trustLine: 'Every installer is scanned before release, and every file\'s SHA-256 is published in the release notes.',

  // A package manager is the install some people will not go without, so the
  // routes that exist are named on the page rather than buried in the README.
  managers: {
    label: 'Or use a package manager',
    rows: [
      { id: 'macos', cmd: 'brew install --cask opsmaxx/tap/opsmaxx', note: 'Run brew trust opsmaxx/tap first — Homebrew will not load a third-party tap until you do.' },
      // Deliberately no Windows or Linux row. winget is not pursued (its
      // submission never got a maintainer review), and there is no apt or AUR
      // repository. A row naming either would promise an install that fails.
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
    q: 'Why is Windows side-eyeing the download?',
    a: 'macOS does not warn any more: since 0.30.1 that build is signed with an Apple Developer ID and notarized by Apple, with the ticket stapled in, so it opens normally even offline. Windows still warns, because that build carries no signature — a certificate there is $200–$400 a year. The warning means Windows cannot confirm who published the app, not that the file is unsafe. Every installer is scanned with ClamAV, the Windows one with Defender, and the .exe and .dmg with VirusTotal\'s 70+ engines — and every SHA-256 is in the release notes for you to check.'
  },
  {
    q: 'Free free, or free-until-the-Series-A free?',
    a: 'MIT licensed, with no paid tier, no session limit and no subscription. The whole source is public, so a future paywall is something you could fork your way around.'
  },
  {
    q: 'Is it quietly phoning home?',
    a: 'No account, no telemetry, no analytics. Every connection the app makes is one you configured, apart from the update check you can switch off.'
  },
  {
    q: 'Can my agent go rogue?',
    a: 'Only within the access group you set. Escalation shells — sudo -i, su, sudo bash — are refused for every group with no setting that reverses it, anything set to ASK waits for your approval, and every action lands in the audit log. Individual privileged reads do use sudo -n, which you can turn off.'
  },
  {
    q: 'Do I have to nuke my current setup?',
    a: 'No. OpsMaxx imports ~/.ssh/config including ProxyJump entries, and runs perfectly happily beside whatever you use today.'
  },
  {
    q: 'Where are my passwords and keys stored?',
    a: 'Server credentials go in your operating system keychain, read only by the main process. The vault is separate: AES-256-GCM under a master password that is never stored, derived with scrypt. Neither leaves your machine, and no MCP tool can read the vault at all.'
  }
]

export const finalCta = {
  headline: 'Close the tabs. Start OpsMaxxing.',
  line: 'One download, three platforms, zero sign-up forms.',
  button: 'Download OpsMaxx',
  secondary: 'Browse the source'
}
