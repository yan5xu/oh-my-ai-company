# Kylon Database Apps、Workflows 与 Workspace Docs

采集时间：2026-07-30；官方开发文档。

## 已文档化能力

- Database & Custom Apps：表格可通过 `upgrade-plan` 检查计划，再用 `upgrade-to-app` 提升为带 managed database、typed contract 和 hosted surface 的 App；提供 app list/show/data-view。
- Tables/CLI：表、字段、行具备 create/update/delete/list 等命令；文件支持 version 与 revert。
- Workflows：支持手动、schedule、row change、webhook 触发；每次运行生成可检查记录；提供 create/update/trigger/pause/resume/archive 和 run inspection。
- Web Project：CLI 文档列出 create、deploy、inspect、domains、env vars 与 deployments inspection。
- Workspace：所有资源只属于一个 workspace，禁止跨 workspace 读写；API key 与 CLI session 只作用于一个 workspace。人类和 Agent 都是 workspace 成员。
- App Connection API：生成 App 只能看到 source agent 已连接的连接；访问者必须通过 App auth/visibility；provider credential 不返回；server-side App code 负责不把敏感数据返回给不应看见的 viewer。扩大 App visibility 会扩大连接路由可达受众，文档要求变更前审查 server route。

## 未公开闭环

- 没有找到 app/database/schema 的整体 revision history、rollback/downgrade、数据 migration rollback 或 environment promotion contract。
- 没有找到完整的 app/row/field 级权限矩阵、schema change approval、独立审计日志或长期 owner handoff。
- workflow 有 durable run history，文件有 version/revert，但不能外推为整个应用、数据库和自动化系统都可回滚。
- web project 有 deploy 与 deployments inspection，未找到公开 rollback 命令、hosting SLA、backup/restore、production observability 或长期维护责任说明。

## 证据边界

公开 Docs 能证明厂商已发布并承诺支持的接口和命令面；本轮未持有 workspace 凭证，也未实际执行这些命令，因此不能把文档化接口写成独立端到端生产验证。

直接来源：
- https://docs.kylon.io/concepts/database-apps
- https://docs.kylon.io/tutorials/build-a-database-app
- https://docs.kylon.io/concepts/workflows
- https://docs.kylon.io/tutorials/automate-with-workflows
- https://docs.kylon.io/cli/workspace
- https://docs.kylon.io/concepts/workspace
- https://docs.kylon.io/authentication
- https://docs.kylon.io/proxy/app-connections
