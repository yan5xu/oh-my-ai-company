# paid-ai/paid-node

S1 official GitHub repo, fetched 2026-07-08 via `pinixc browser read`.

What the SDK proves:
- Paid has a TypeScript/Node SDK exposed as `@paid-ai/paid-node`.
- README says Paid is an all-in-one drop-in Business Engine for AI Agents handling pricing, subscriptions, margins, billing, and renewals with about 5 lines of code.
- Core API example creates customers via `PaidClient`.
- Cost tracking uses OpenTelemetry tracing wrappers.
- Supported wrappers/integrations mentioned: OpenAI, Anthropic, Mistral, LangChain callback, Vercel AI SDK.
- It supports auto-instrumentation for OpenAI/Anthropic, manual cost tracking, manual usage tracking, and signaling inside trace contexts.

Interpretation: this source materially strengthens the product assessment. Paid is building at the instrumentation layer, not only a billing UI. The SDK design turns agent/model/tool calls into cost/value signals that can later feed pricing, value receipts, and billing.
