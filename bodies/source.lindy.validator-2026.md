# How We Built an AI Agent Guardrail That Actually Works
2026-04-28 官方工程复盘。内部测试曾误向真实联系人发送约 12 个日历邀请；团队认为 prompt 不足、每次人工确认又破坏体验，于是构建独立 Validator LLM。

主 Agent 必须提供 tool call 与基于任务历史/用户记忆的授权理由；外部来信者不能替用户授权。60 个样本、3 种 prompt、3 个模型规模，每次变更共 540 runs。危险动作要求零容忍 false positive，一般类别门槛为 75% accuracy、最多 25% false positive。

这是公司对已观察故障模式的自测，不是通用 Agent 安全证明。
