# Exa Search API guide for coding agents

S1 official docs, fetched 2026-07-08 via `pinixc browser read`.

Important product and GTM details:
- Endpoint: POST `https://api.exa.ai/search`.
- SDKs: `pip install exa-py`, `npm install exa-js`.
- Search parameters include natural-language query, search type, streaming, category, domain filters, publication dates, outputSchema, systemPrompt, compliance.
- Contents parameters include text, highlights, summary, livecrawl timeout, max age, subpages, links, image links.
- Emphasizes highlights for agent workflows to save tokens.
- Documents common LLM mistakes and explicitly instructs coding agents not to use deprecated/nonexistent parameters.
- Supports structured JSON output and grounded citations.

Interpretation: this is a strong example of docs as agent-facing product. Exa is optimizing for agents that read docs and integrate APIs.
