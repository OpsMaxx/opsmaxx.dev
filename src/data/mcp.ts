/**
 * The /mcp reference page.
 *
 * Tool names and behaviour are taken from src/main/services/mcpServer.ts in the
 * OpsMaxx repository; the one-line summaries are condensed from the tool
 * descriptions the server itself sends to a client, so an agent and a reader
 * are told the same thing.
 */

export const mcpPage = {
  title: 'MCP server for SSH, files, containers and databases — OpsMaxx',
  description:
    'Let Claude Code, Claude Desktop, Codex or Gemini CLI operate your servers through OpsMaxx: 28 tools, ALLOW/ASK/DENY per capability, approvals, and an audit log. No SSH key ever reaches the agent.',

  eyebrow: 'MCP reference',
  h1: 'An MCP server that sits between your agent and your infrastructure.',
  sub: 'OpsMaxx exposes 28 tools over MCP. An agent addresses a server by the friendly name you gave it, never a hostname; OpsMaxx resolves the real connection from your OS keychain, applies the access group, and redacts the output before the agent sees it.',

  capabilities: {
    title: 'Every capability is ALLOW, ASK or DENY',
    body: 'An access group is not a single on/off switch. Each capability is set independently, and file paths can be overridden on top of the blanket read and write settings. Four groups ship with the app — Read Only, Read & Write, Sudo Access, Full Access — and you can create as many as you want.',
    states: [
      { name: 'ALLOW', line: 'Runs immediately, and is written to the audit log.' },
      { name: 'ASK', line: 'Waits in Approvals. The agent blocks until you answer.' },
      { name: 'DENY', line: 'Refused. The agent is told it was refused, and why.' }
    ]
  },

  groups: [
    {
      title: 'Servers',
      tools: [
        ['list_servers', 'The servers this session may use, by friendly name, grouped by workspace. Every other tool addresses a server by one of these names — a hostname or IP will not resolve.'],
        ['get_server_details', 'The OS, access group and the effective permissions this session has on one server.'],
        ['get_host_facts', 'What a server is rather than what it is doing: distribution, version, kernel, package manager.'],
        ['get_server_metrics', 'CPU, memory, disk, uptime and any failed systemd units.'],
        ['execute_command', 'One non-interactive command over SSH, returning stdout, stderr and the exit code. Escalation shells are refused.'],
        ['add_server', 'Adds a new SSH connection to a workspace, so later calls can address it by name.'],
        ['describe_capabilities', 'What this session may and may not do on a server — designed to be called before trying.'],
        ['list_workspaces', 'The workspaces this session can see.']
      ]
    },
    {
      title: 'Files',
      tools: [
        ['list_files', 'A directory over SFTP, with sizes and types.'],
        ['read_file', 'A text file over SFTP. Preferred over running cat through a shell.'],
        ['write_file', 'Writes a text file over SFTP, replacing it entirely.']
      ]
    },
    {
      title: 'Containers',
      tools: [
        ['list_containers', 'Containers on one server: name, image, state and the status line the runtime wrote.'],
        ['container_logs', 'The last lines a container wrote to stdout and stderr.'],
        ['container_action', 'Starts, stops or restarts one container.'],
        ['list_images', 'Images on a server: repository, tag, id and the size the runtime reports.'],
        ['compose_status', 'Containers grouped by compose project and service.']
      ]
    },
    {
      title: 'Databases',
      tools: [
        ['list_databases', 'The database connections this session may use, by friendly name.'],
        ['query_database', 'Runs a statement against a saved connection and returns the rows.']
      ]
    },
    {
      title: 'Network',
      tools: [
        ['list_tunnels', 'The SSH tunnels configured in this session.'],
        ['set_tunnel', 'Starts or stops a tunnel that is already configured.'],
        ['list_vpns', 'The VPN profiles this session can see.'],
        ['set_vpn', 'Starts or stops a VPN that is already configured.']
      ]
    },
    {
      title: 'Fleet',
      tools: [
        ['fleet_inventory', 'One answer for every server in the workspace, from what has already been collected.'],
        ['fleet_drift', 'Every server whose watched configuration no longer matches its baseline.'],
        ['get_config_drift', 'Whether the watched files on one named server still match.'],
        ['get_capacity_trends', 'Where disk and memory are heading on a server.'],
        ['list_alerts', 'Alerts already raised across the workspace.'],
        ['backup_status', 'Every backup destination on this machine, and how each is doing.']
      ]
    }
  ],

  clients: {
    title: 'Connecting a client',
    body: 'The bridge listens on 127.0.0.1 and is off until you turn it on under AI & MCP. Everything below assumes OpsMaxx is running.',
    items: [
      {
        name: 'Claude Code',
        body: 'One command. A pairing code appears in the app, so there is no token to copy.',
        cmd: 'opsmaxx claude',
        lang: 'bash'
      },
      {
        name: 'Codex',
        body: 'The same pairing flow, writing a managed block into ~/.codex/config.toml.',
        cmd: 'opsmaxx codex',
        lang: 'bash'
      },
      {
        name: 'Claude Desktop',
        body: 'Desktop cannot express an HTTP MCP server with a header, so it needs the stdio bridge. Drop the env block entirely if you have run opsmaxx claude once.',
        cmd: `{
  "mcpServers": {
    "opsmaxx": {
      "command": "npx",
      "args": ["-y", "@opsmaxx/mcp"],
      "env": {
        "OPSMAXX_MCP_TOKEN": "<token>",
        "OPSMAXX_MCP_PORT": "<port>"
      }
    }
  }
}`,
        lang: 'json'
      },
      {
        name: 'Any other MCP client',
        body: 'Streamable HTTP with a bearer token, generated under AI & MCP → Security.',
        cmd: `{
  "mcpServers": {
    "opsmaxx": {
      "type": "http",
      "url": "http://127.0.0.1:<port>/mcp",
      "headers": { "Authorization": "Bearer <token>" }
    }
  }
}`,
        lang: 'json'
      }
    ]
  },

  never: {
    title: 'What an agent never receives',
    items: [
      'SSH passwords',
      'Private keys or passphrases',
      'Database credentials',
      'Hostnames, IPs and usernames',
      'Anything in the vault',
      'An interactive root shell'
    ],
    closing:
      'Escalation shells — sudo -i, su, sudo bash — are refused for every access group, with no setting that turns them back on. Output is scanned for secrets and secret-shaped strings before it is returned. Every action, allowed or refused, lands in the audit log.'
  }
}
