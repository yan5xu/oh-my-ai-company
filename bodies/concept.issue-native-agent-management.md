# Issue-native Agent 管理
# Issue-native Agent 管理

以 Issue 作为 Agent 的工作合同，而不是把聊天 session 当主要控制面。任务被分配后，执行桥梁创建隔离环境、调用 Agent runtime、持续回写状态，并允许相同 Agent 在同一 Issue 中恢复会话。

## 关键特征

- Issue 同时承载目标、owner、状态、上下文、结果和审阅；
- runtime 可替换，组织层不绑定单一模型或编码 CLI；
- 每个任务有独立 worktree/branch，降低并发冲突；
- Squad、trigger 和 Skills 可进一步形成角色、例行工作与经验复用；
- 最终价值应按 accepted output、review time 与 rework 衡量，而不是并行 Agent 数或 token 消耗。

[[company.multica]] 是当前最清晰样本。[[company.superset]] 更偏个人 parallel workspace，[[company.raft]] 更偏 chat/channel-native 协作，[[company.helio]] 更偏预制 AI employee 与业务责任。

当前状态：候选概念。还需在 Paperclip、Conductor 等样本中复验边界。
