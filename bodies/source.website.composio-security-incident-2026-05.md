# Composio May 2026 security incident bulletin

Published: 2026-05-21; collected: 2026-07-29.

URL: <https://composio.dev/blog/composio-may-2026-security-incident>

## Published scope

Composio disclosed unauthorized access to internal systems. The evolving
bulletin states that:

- a small percentage of users' GitHub tokens were compromised;
- a small number of additional users were affected through specific API keys;
- an attacker gained a foothold in an internal agentic monitoring tool after
  probing systems with many exploit combinations;
- an internal GitHub token and employee Gmail OAuth tokens were among the
  affected credentials described in the bulletin;
- customers were advised to revoke connected-account tokens and rotate API
  keys, especially credentials Composio could not revoke centrally.

## Remediation stated by Composio

Composio reported rotating platform credentials, revoking tokens across about
100 toolkits where provider APIs allowed it, redacting token returns, adding IP
restrictions and allowlists, publishing indicators of compromise, and
contacting affected customers/providers.

The bulletin says deleting a connection does not necessarily invalidate the
provider credential and that fewer than 5% of connections could not be
revoked through standard provider APIs at the stated update point.

## Boundary

The page contains successive update snapshots and remained an evolving
incident bulletin at collection. This dossier does not claim the investigation
is final or that the published scope exhausts all impact.

