# Agent 输出的注意力压缩层
# Agent 输出的注意力压缩层

当 Agent 数量、持续运行时间和输出密度上升，系统瓶颈会从“能否执行”转为“人能否看完、理解并做出决定”。产品不应把完整 token 流倾倒进聊天频道，而应把过程压缩为结论、异常、关键证据、待审批动作和可追溯上下文。

[[company.kylon]] 在与 Claude Tag 的官方比较中明确提出这一问题：自有工作空间可以控制 attention、按用户渲染不同信息密度，并让多 Agent 的结果被压缩和组织。它是可信的产品设计主张，但当前还缺少真实客户样本验证。

相关：[[concept.agent-company-control-plane]]、[[concept.agent-native-context-workspace]]。

证据：[[source.kylon.claude-tag-comparison-2026-07-13]]。
