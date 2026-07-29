# Hyperagent 对 Composio 安全事件的响应

发布时间：2026-05-23；更新时间：2026-05-26。

URL：<https://www.hyperagent.com/blog/composio-incident-response/>

Hyperagent 表示：

- 得知少量客户的 GitHub OAuth token 受到影响；
- 于 2026-05-23 停用全部 Composio-powered integration；
- 通知受影响用户、核验 OAuth 撤销并调查日志；
- 建议把 connected token 视为可能已暴露；
- 用 first-party Google、GitHub、Notion integration 替换常见 Composio
  integration，并保留原生工具和 custom MCP。

Hyperagent 特别指出，在其 UI 删除 connection 不等于撤销 provider 授权，API
Key 需要在 provider 侧轮换。

这是独立下游客户的事件响应，可以支持 blast radius 和迁移成本分析，但不能代表
所有 Composio 客户的影响范围。
