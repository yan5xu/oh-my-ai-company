# Composio 2026 年 4 月 API 与 Trigger 故障

发布时间：2026-05-04。

URL：<https://composio.dev/blog/incident-report-april-28>

Composio 报告 4 月 28-30 日出现多次 API degradation：

- Platform API 累计约 53 分钟 degraded；
- Slack、Outlook、Notion、HubSpot webhook trigger 约 36 小时不可用；
- 约 700 名有 active trigger 的客户受影响；
- Trigger ingestion 停止期间到达的事件无法恢复。

官方给出的根因是 background cleaner job 静默失败后，trigger-processing table
无限增长。公司称已把 trigger pipeline 隔离到独立数据库，增加监控、审计维护
job，并加速迁移到专用 queue。

这是一手事件证据，不能独立验证时长、客户数或整改效果。
