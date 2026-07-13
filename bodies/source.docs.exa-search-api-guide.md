# Exa Search API guide

S1 official docs, fetched 2026-07-08 via `pinixc browser read`.

Product details:
- Exa is a custom search engine built for AIs.
- Search types/latency profiles: instant ~250ms, fast ~450ms, auto ~1s, deep-lite 4s, deep 4-15s, deep-reasoning 12-40s.
- Content outputs: highlights, full text, summaries, structured outputs, grounded answers.
- Category indexes: 50M+ company pages, 1B+ people, 100M+ research papers, news, personal sites, financial reports.
- Token-efficiency claim: highlights / condensed contents can be 10x token-efficient.
- Docs explicitly address coding agents and instruct them to use Exa dashboard onboarding before building integration from raw docs.

Interpretation: Exa is designing docs and product affordances for agent consumers, not only human developers.
