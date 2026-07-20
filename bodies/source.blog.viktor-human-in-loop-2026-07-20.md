# How to keep a human in the loop with your AI employee

采集时间：2026-07-20。Viktor 官方博客，S1。

文章的核心表述是 HITL “is a sentence, not a system”：用户在 instruction 中写明“先展示，再发送”，用自然语言定义人工 checkpoint。

官方建议按 blast radius 分级：

- 高风险动作先 draft，人工确认后执行；
- 重复工作在 standing instruction 中保留 checkpoint；
- 随着信任提升，从 draft-only 过渡到 exception approval，再到低风险自治；
- thread 中的纠正会进入持续 memory。

证据边界：这是一套可操作的渐进自治方法，但也说明大量治理依赖 prompt 和运营纪律。它不能证明 action-level policy engine、角色权限矩阵、审批 SLA、独立 validator 或 rollback。

关联：[[company.viktor]]。
