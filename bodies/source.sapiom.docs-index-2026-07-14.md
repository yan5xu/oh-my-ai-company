# Sapiom docs index 与能力目录

`llms.txt` 与 docs 导航显示两类入口：Authoring MCP 用于创建、测试、部署 agents；Remote MCP 连接 `https://api.sapiom.ai/v1/mcp`，文档称暴露 130 个 tools，并通过 `tool_discover` 动态发现。

能力目录覆盖：400+ models via OpenRouter、search/scraping/browser、Blaxel compute/sandboxes、Postgres/Redis/vector/search、queues/schedules、storage、repos、email/enrichment、domains/DNS、phone verification、image/video/audio 与 GitHub export。

Gateway 以一个 Sapiom key 代理供应商认证、付款、规则和记录；部分调用使用 HTTP 402/x402 流程。

证据边界：官方能力目录。未逐项调用，也未验证供应商覆盖、价格、SLA 与可用区。
