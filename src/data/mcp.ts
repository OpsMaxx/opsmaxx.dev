/**
 * The /mcp reference page.
 *
 * Tool names and behaviour are taken from src/main/services/mcpServer.ts in the
 * OpsMaxx repository; the one-line summaries are condensed from the tool
 * descriptions the server itself sends to a client, so an agent and a reader
 * are told the same thing.
 */

const groups = [
  {
    title: 'Servers',
    tools: [
      ['list_servers', 'The servers this session may use, by friendly name, grouped by workspace. Every other tool addresses a server by one of these names — a hostname or IP will not resolve.'],
      ['get_server_details', 'The OS, access group and the effective permissions this session has on one server.'],
      ['get_host_facts', 'What a server is rather than what it is doing: distribution, version, kernel, package manager, pending security updates and whether it is waiting on a reboot.'],
      ['get_server_metrics', 'CPU, memory, disk, uptime, any failed systemd units, and every listening port with the process that owns it.'],
      ['execute_command', 'One non-interactive command over SSH, returning stdout, stderr and the exit code. Escalation shells — sudo -i, su, sudo bash — are refused unless the user has put the session in Bypass mode.'],
      ['describe_capabilities', 'What this session may and may not do on a server — designed to be called before trying.'],
      ['list_workspaces', 'The workspaces this session can see.'],
      ['add_server', 'Adds a new SSH connection to a workspace, so later calls can address it by name. Credentials go straight to the OS secure storage and cannot be read back.'],
      ['update_server', 'Changes a saved connection — where it points, its account and credential, the servers it jumps through, or its name. Only the fields passed change, and the entry keeps its identity.'],
      ['remove_server', 'Deletes a saved connection and its stored credential from OpsMaxx. The machine itself is untouched, and there is no undo.'],
      ['test_connection', 'Dials a saved server and hangs up. It runs no command, and a failure is reported as a category, with no hostname, port or username.']
    ]
  },
  {
    title: 'Files',
    tools: [
      ['list_files', 'A directory over SFTP, with sizes and types.'],
      ['read_file', 'A text file over SFTP. Preferred over running cat through a shell.'],
      ['write_file', 'Writes a text file over SFTP, replacing it entirely.'],
      ['rename_file', 'Renames or moves one file within a server. Both paths are checked against the write rules and the source against the read rules too; a directory is refused.'],
      ['delete_file', 'Deletes one file, or one empty directory. It never deletes recursively, and there is no undo.'],
      ['make_directory', 'Creates one directory. Its parent must already exist — there is no -p.']
    ]
  },
  {
    title: 'Services and schedules',
    tools: [
      ['list_services', 'The systemd --user services of the account OpsMaxx connects as, with their state and whether the account is lingering.'],
      ['service_action', 'Starts, stops, restarts, reloads, enables or disables one system unit through sudo -n systemctl, then checks it got there. Checked as that exact sudo command; stopping or disabling ssh or sshd is refused at any setting.'],
      ['list_cron', 'Everything scheduled on one server — crontabs, /etc/cron.d and systemd timers — with schedule, user, source and command. Read-only, with commands redacted.']
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
    title: 'Kubernetes',
    tools: [
      ['k8s_overview', 'The cluster reachable from one saved server’s kubeconfig: contexts, namespaces, nodes, workloads, pods and recent warning events.'],
      ['k8s_logs', 'The last lines every container in one pod wrote, redacted. It never follows.'],
      ['k8s_diagnose', 'Why one pod is unhealthy: its description, its events and the previous container’s last log lines, in one call.'],
      ['k8s_resources', 'PVCs, ingresses, RBAC bindings, and which secrets exist with the names of their keys. Never a secret’s value.'],
      ['k8s_helm_releases', 'Helm releases in the cluster, with chart, version and status.'],
      ['k8s_api_scan', 'Which deprecated or removed API versions the cluster still serves or has objects in, for upgrade planning.'],
      ['k8s_drain_preflight', 'What draining one node would evict, and which PodDisruptionBudgets and endpoints would block it. Changes nothing.'],
      ['k8s_rollout_restart', 'A rolling restart of one Deployment, StatefulSet or DaemonSet. Never runs without asking, except in a session on the Bypass profile.'],
      ['k8s_node_action', 'Cordons, uncordons or drains one node. A drain re-runs its preflight first and refuses on any blocker. Never runs without asking, except in a session on the Bypass profile.'],
      ['pod_command', 'One non-interactive command inside a container, with no TTY, stopped after 60 seconds and checked against the same command rules as execute_command. Never runs without asking, except in a session on the Bypass profile.']
    ]
  },
  {
    title: 'Databases',
    tools: [
      ['list_databases', 'The database connections this session may use, by friendly name.'],
      ['query_database', 'Runs a statement against a saved connection and returns the rows.'],
      ['add_database', 'Saves a new database connection in OpsMaxx. It creates nothing on the database server, and the credential cannot be read back.'],
      ['update_database', 'Changes a saved database connection. Only the fields passed change; the stored credential is kept unless a new one is sent.'],
      ['remove_database', 'Deletes a saved database connection and its stored credential. The database itself is untouched, and there is no undo.'],
      ['test_database', 'Connects to a saved database and disconnects, running no statement. A failure is reported as a category, with no host, port or username.']
    ]
  },
  {
    title: 'Network',
    tools: [
      ['list_tunnels', 'The SSH tunnels configured in this session.'],
      ['set_tunnel', 'Starts or stops a tunnel that is already configured.'],
      ['create_tunnel', 'Saves a new tunnel carried over a saved server. It does not start it — set_tunnel does, with its own approval.'],
      ['delete_tunnel', 'Deletes a saved tunnel, stopping it first if it is running.'],
      ['list_vpns', 'The VPN profiles this session can see.'],
      ['set_vpn', 'Starts or stops a VPN that is already configured. A reverse proxy (frp) is refused unless the user has put the session in Bypass mode.']
    ]
  },
  {
    title: 'CI/CD',
    tools: [
      ['list_ci_connections', 'The Jenkins, GitLab and GitHub Actions connections this session can see, by name. Never their base URL or API token.'],
      ['list_pipelines', 'The jobs, projects or workflows on one connection, and whether each can be started at all.'],
      ['list_runs', 'The most recent runs of one pipeline, newest first, with status, branch, who started it and the title of the change.'],
      ['get_run', 'One run’s status, timing and per-step outcomes — a fraction of the size of its logs.'],
      ['get_run_logs', 'What a build printed: the tail, capped, and marked as untrusted. Secret redaction runs over it, but it is pattern-based and not exhaustive.'],
      ['trigger_run', 'Starts one pipeline. Once the provider accepts it, OpsMaxx cannot stop it.'],
      ['cancel_run', 'Asks the provider to stop one run that is already going. A request, not a guarantee.'],
      ['rerun_run', 'Runs one existing run again as a new attempt. GitHub Actions only; on Jenkins and GitLab it refuses.']
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
]

/** Counted from the list above, so the copy cannot drift from it. */
export const mcpToolCount = groups.reduce((n, g) => n + g.tools.length, 0)

export const mcpPage = {
  title: 'MCP server for SSH, files, containers and databases — OpsMaxx',
  description: `Let Claude Code, Claude Desktop, Codex or Gemini CLI operate your servers through OpsMaxx: ${mcpToolCount} tools, ALLOW/ASK/DENY per capability, approvals, and an audit log. No SSH key ever reaches the agent.`,

  eyebrow: 'MCP reference',
  h1: 'An MCP server that sits between your agent and your infrastructure.',
  sub: `OpsMaxx exposes ${mcpToolCount} tools over MCP. An agent addresses a server by the friendly name you gave it, never a hostname; OpsMaxx resolves the real connection from your OS keychain, applies the access group, and redacts the output before the agent sees it.`,

  capabilities: {
    title: 'Every capability is ALLOW, ASK or DENY',
    body: 'An access group is not a single on/off switch. Each capability is set independently, and file paths can be overridden on top of the blanket read and write settings. Five groups ship with the app — Read Only, Commands with no writes, Read & Write, Sudo Access, Full Access — and you can create as many as you want.',
    states: [
      { name: 'ALLOW', line: 'Runs immediately, and is written to the audit log.' },
      { name: 'ASK', line: 'Waits in Approvals. The agent blocks until you answer.' },
      { name: 'DENY', line: 'Refused. The agent is told it was refused, and why.' }
    ]
  },

  groups,

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
      'Escalation shells — sudo -i, su, sudo bash — are refused for every access group. Only a session the user puts in Bypass mode can run them, and the audit log marks everything Bypass allowed. Output is scanned for secrets and secret-shaped strings before it is returned. Every action, allowed or refused, lands in the audit log.'
  }
}
