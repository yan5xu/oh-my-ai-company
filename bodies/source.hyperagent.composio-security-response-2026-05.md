# Hyperagent response to Composio security incident

Published: 2026-05-23; updated: 2026-05-26.

URL: <https://www.hyperagent.com/blog/composio-incident-response/>

Hyperagent said it:

- learned that a small number of its customers' GitHub OAuth tokens were
  affected;
- disabled all Composio-powered integrations on 2026-05-23;
- notified affected users, verified OAuth revocations, and investigated logs;
- recommended treating connected tokens as potentially exposed;
- replaced common Composio integrations with first-party Google, GitHub, and
  Notion integrations, alongside existing native tools and custom MCP support.

Hyperagent emphasized that deleting a connection in its UI does not revoke the
provider-side authorization and that API keys must be rotated at the provider.

This is an independent downstream-customer incident response. It supports
blast-radius and migration-cost analysis but does not establish impact for all
Composio customers.

