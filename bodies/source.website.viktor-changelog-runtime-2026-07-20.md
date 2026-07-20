# Viktor Changelog：任务生命周期、用量与权限更新

采集时间：2026-07-20。官方 changelog，S1。

与运行和治理相关的更新：

- 2026-04-27：scheduled task 支持 pause/resume。暂停后任务配置继续保留，但会跳过计划运行；同样能力可由 Agent、SDK 和 flow API 操作。
- 2026-04-29：Usage 页面加入 scheduled task tab 和 per-user statistics。
- 2026-02-19：可查看每个 scheduled task 的成本拆解，并为其选择模型。
- 2026-02-17：增加 per-thread usage breakdown，并区分 thread 与 scheduled run。
- 2026-04-22：broken OAuth 支持 reconnect；用户可把“always approve this tool”保存到 MCP settings。
- 2026-03-05：连接 integration 后可自动恢复此前任务。
- 2026-02-21：官方称频道上下文按 Slack membership 隔离，用户只能看到自己所属频道，private channel 和 DM 保持私密。
- 2026-02-20：加入/离开频道会确认；scheduled task 可使用自定义 sender name。
- 2026-03-18：Slack Connect 外部频道采用“先私聊确认，再发回共享频道”的流程。
- 2026-03-11：issue report 可先起草，经人确认后发送。

证据边界：这是供应商发布记录，能证明公开产品面和迭代方向，不能替代真实账号对权限、审计和失败恢复的验收。频道隔离口径与当前官网 FAQ 的 workspace-level/shared-integration 口径存在冲突，暂不合并。

关联：[[company.viktor]]。
