Agent 公司控制面把 Claude Code、Codex、OpenClaw、Hermes 等 runtime 视为可替换的“员工”，自己负责组织状态和治理：公司使命、目标、组织架构、任务 ownership、预算、审批、例行工作、权限与审计。

[[company.paperclip]] 是当前最完整的开源治理样本；[[company.cofounder]] 则把控制面与 company creation / managed services 合并，用路线图、部门、共享上下文和审批串起工程、销售、营销、财务与运营。[[company.multica]] 更贴近 coding 交付与 worktree，[[company.raft]] 更偏 channel/identity 协作，[[company.helio]] 更偏预制 AI employee 与业务责任。

## 判断标准

- 状态是否超越单次 chat/session；
- Agent runtime 是否可替换；
- 是否存在明确 work contract 与 owner；
- 预算、审批和执行政策是否在 failure path 上真正生效；
- 是否能追踪 accepted output，而不只是 activity；
- 人类能否压缩审阅成本，而不是成为更多 Agent 的传话筒。

这一概念不同于 multi-agent framework。Framework 解决 Agent 如何调用和协作；公司控制面解决谁应该做什么、花多少钱、谁批准、如何追责以及何时停止。

Cofounder 进一步暴露了 marketing promise 与 operating contract 的差异：官网说没有批准不会上线，Terms 却允许用户授予自动 merge、deployment、infrastructure change、message 与 payment 权限。控制面研究不能只问“有没有 approval”，还要问 action class、standing authorization、限额、audit、rollback 与 merchant responsibility。[[source.cofounder.terms-2026-07-15]]
