export const site = {
  domain: 'opsmaxx.dev',
  url: 'https://opsmaxx.dev',
  repo: 'https://github.com/OpsMaxx/OpsMaxx',
  releases: 'https://github.com/OpsMaxx/OpsMaxx/releases/latest',
  title: 'OpsMaxx — Free SSH, SFTP, database and vault in one app',
  description:
    'Free, open-source SSH client, SFTP browser, database manager, secrets vault and MCP gateway for AI agents. Windows, macOS, Linux. No account, no telemetry.'
}

export const hero = {
  eyebrow: 'Free. MIT licensed. No account.',
  h1: 'Everything you SSH into. One window, one keychain.',
  sub: 'SSH terminal, SFTP, five database engines, WireGuard, an AES-256-GCM vault, fleet patching and an MCP bridge — one credential store.',
  ctaPrimary: 'Download OpsMaxx',
  ctaSecondary: 'Read the source',
  trust: 'Free, MIT licensed. No account, no telemetry, no subscription.'
}

export const stats = [
  { n: '5', label: 'database engines, no second app' },
  { n: '0', label: 'keys or hostnames an agent sees' },
  { n: '70+', label: 'antivirus engines scan each release' }
]

export type Blade = { id: string; name: string; line: string; icon: string }

export const blades: Blade[] = [
  { id: 'ssh', name: 'SSH terminal', icon: 'terminal', line: 'GPU-rendered xterm, split panes, search, unlimited chained jump hosts.' },
  { id: 'sftp', name: 'SFTP', icon: 'folder', line: 'Browse, edit and upload over the connection the terminal is already using.' },
  { id: 'db', name: 'Databases', icon: 'database', line: 'Postgres, MySQL, SQL Server, Mongo, Redis. Through the bastion, if that is where they live.' },
  { id: 'net', name: 'Tunnels & VPN', icon: 'network', line: 'Local forwards, SOCKS5, and userspace WireGuard that never touches your routing table.' },
  { id: 'vault', name: 'Vault', icon: 'lock', line: 'AES-256-GCM store for API keys. No MCP tool can read it.' },
  { id: 'fleet', name: 'Fleet', icon: 'server', line: 'Patch in waves. The first unhealthy server stops the wave.' },
  { id: 'inspect', name: 'Traffic inspector', icon: 'radar', line: 'See the HTTPS a machine is actually making. One-click certificate install.' },
  { id: 'ai', name: 'AI gateway', icon: 'bot', line: 'An agent asks for "Nginx Prod". OpsMaxx resolves it from your keychain.' }
]

export const bladesSection = {
  headline: 'Eight tools, one window.',
  deck: 'All eight share one credential store.'
}

export const ai = {
  headline: 'Your agent gets a nickname, not a key.',
  deck: 'Claude Code, Codex and Gemini CLI ask for a server by name. OpsMaxx resolves it from your keychain, checks the access group, redacts the output.',
  neverLabel: 'An agent never receives',
  never: [
    'SSH passwords',
    'Private keys or passphrases',
    'Database connection credentials',
    'Hostnames, IPs, usernames',
    'Vault secrets',
    'Sudo or root shells'
  ],
  closing: 'Anything set to ASK waits in Approvals. An agent cannot approve its own request. The bridge listens on 127.0.0.1.'
}

export const compare = {
  headline: 'Against MobaXterm, PuTTY, Termius and SecureCRT',
  deck: 'Every one of them sends you elsewhere for a table or a key.',
  cols: ['OpsMaxx', 'MobaXterm', 'PuTTY', 'Termius', 'SecureCRT'],
  rows: [
    { label: 'Price', v: ['Free, MIT', 'Free tier, paid Pro', 'Free', 'Free tier, paid Pro', 'Paid licence'] },
    { label: 'Open source', v: [true, false, true, false, false] },
    { label: 'Windows / macOS / Linux', v: ['All three', 'Windows only', 'All three', 'All three', 'All three'] },
    { label: 'Account required', v: ['No', 'No', 'No', 'Yes for sync', 'No'] },
    { label: 'Telemetry', v: ['None', 'Some', 'None', 'Yes', 'Some'] },
    { label: 'Saved sessions', v: ['Unlimited', '12 on free tier', 'Unlimited', 'Limited on free tier', 'Unlimited'] },
    { label: 'Database client', v: ['5 engines', false, false, false, false] },
    { label: 'Encrypted secrets vault', v: ['AES-256-GCM', 'Password store', false, 'Cloud vault', false] },
    { label: 'Live server monitoring', v: [true, 'Basic', false, false, false] },
    { label: 'AI agent access (MCP)', v: ['Scoped by group', false, false, false, false] }
  ]
}

export const install = {
  headline: 'Windows, macOS, Linux',
  line: 'Installer, portable exe, dmg, AppImage or deb. No sign-up.',
  tabs: [
    {
      id: 'macos',
      label: 'macOS',
      file: 'OpsMaxx-arm64.dmg',
      cmd: '# Apple Silicon and Intel builds\nopen OpsMaxx-*.dmg',
      note: 'Ad-hoc signed, not notarized. Right-click, Open, once.'
    },
    {
      id: 'windows',
      label: 'Windows',
      file: 'OpsMaxx-setup.exe',
      cmd: '# Installer, or a portable .exe that runs from a USB stick\nOpsMaxx-setup.exe',
      note: 'SmartScreen: More info, then Run anyway. Unsigned, not unsafe.'
    },
    {
      id: 'linux',
      label: 'Linux',
      file: 'OpsMaxx-x86_64.AppImage',
      cmd: 'chmod +x OpsMaxx-*.AppImage && ./OpsMaxx-*.AppImage\n# or: sudo apt install ./OpsMaxx-*-amd64.deb',
      note: 'AppImage runs on any distribution. .deb for Debian and Ubuntu.'
    }
  ],
  agentLabel: 'Then hand it to your agent',
  agentCmd: 'opsmaxx claude',
  agentNote: 'A one-time pairing code appears in the app. No token to copy.'
}

export const faq = [
  {
    q: 'Why does Windows or macOS warn about the download?',
    a: 'Unsigned binary — a certificate costs $200–$400 a year. Every release is scanned by 70+ engines and publishes a SHA-256.'
  },
  {
    q: 'Is it really free, or free for now?',
    a: 'MIT licensed. No paid tier, no session cap, no subscription.'
  },
  {
    q: 'Does it phone home?',
    a: 'No account, no telemetry, no analytics, no update ping. Every connection it makes is one you configured.'
  },
  {
    q: 'Can an AI agent go rogue on my servers?',
    a: 'As safe as the access group you set. Sudo and unrestricted shells are refused for every group, with no setting that reverses it. Every action is logged.'
  },
  {
    q: 'Do I have to abandon my current setup?',
    a: 'No. It imports ~/.ssh/config, ProxyJump entries included, and runs beside whatever you already use.'
  }
]

export const finalCta = {
  headline: 'Close three of those windows.',
  line: 'One download. No account, no card, no trial that ends.',
  button: 'Download OpsMaxx'
}
