# Relevance AI Evals 文档

Evals 工作流分为 Test、Runs、Checks、Publish、Monitor。检查类型包括 LLM Judge、Text Includes、Text Equals 和 Tool Usage；测试场景可模拟工具返回。

平台可在 pass rate 低于阈值时阻止发布，并在生产环境抽样监控、按版本显示变化。Evals 消耗 Actions/Vendor Credits。

判断边界：这是实质性的发布控制面，但 LLM judge 和规则检查不能自动证明业务结果、权限副作用或跨系统一致性。
