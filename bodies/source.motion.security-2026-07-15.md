# Motion Security
Motion 官方安全页称 NexusBird, Inc (dba Motion) 已完成 SOC 2 Type II 审计，审计方为 Prescient Assurance；安全材料、渗透测试与问卷可向支持团队申请。服务托管在 Google Cloud，美国区域存储，数据库静态加密，传输使用 TLS/SSL。

AI 安全部分称功能可能使用 OpenAI、Anthropic 与 Google 等第三方模型，也有自研自动排程算法；Motion 与第三方模型供应商不会用客户数据训练模型，但为性能和调试可能短期保存与 LLM 交换的输入输出。

**边界：** 本轮只核验公开安全声明，未取得 SOC 2 报告、渗透测试或 DPA 原文，不能替代企业采购安全评审。
