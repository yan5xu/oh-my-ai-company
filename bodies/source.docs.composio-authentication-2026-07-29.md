# Composio authentication documentation snapshot

Collected at: 2026-07-29.

URL: <https://docs.composio.dev/docs/authentication>

## Documented model

- An Auth Config is a reusable blueprint for a toolkit's authentication
  method, scopes, and credentials.
- Composio Managed Auth supplies Composio's provider application credentials
  where available.
- A custom Auth Config is used when a developer needs its own OAuth app,
  custom scopes, a provider without managed auth, dedicated quota, branding,
  or a custom provider instance.
- Each downstream user receives a separate Connected Account after completing
  the provider authorization flow.
- One user may have multiple Connected Accounts for the same toolkit, such as
  work and personal Gmail.
- Composio documents automatic OAuth access-token refresh and an `EXPIRED`
  lifecycle state when reauthorization is required.

## Boundary

This is product documentation for the intended control model. It does not by
itself prove that every toolkit implements the lifecycle consistently or that
all provider-side revocations can be completed from Composio.
