# Composio April 2026 API and trigger incident

Published: 2026-05-04.

URL: <https://composio.dev/blog/incident-report-april-28>

Composio reported repeated API degradation from April 28-30:

- about 53 cumulative minutes of platform API degradation;
- roughly 36 hours of unavailable Slack, Outlook, Notion, and HubSpot
  webhook triggers;
- approximately 700 customers with active affected triggers;
- events arriving while trigger ingestion was disabled were not recoverable.

The stated root cause was an unbounded trigger-processing table after a
background cleaner job silently failed. The company isolated the trigger
pipeline in a dedicated database, added monitoring, audited maintenance jobs,
and fast-tracked migration to a purpose-built queue.

This is first-party incident evidence. It does not independently verify the
duration, customer count, or effectiveness of remediation.

