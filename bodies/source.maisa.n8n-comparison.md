> **来源**：Maisa 官方 “Why Maisa Is Not an n8n-like Tool or RPA + AI”，2026-07-20 抓取，S1。

文章明确区分 design-time graph 与 runtime-formed process：n8n/RPA 在设计时画节点、定义条件和异常；Maisa 只要求业务人员定义 intent、constraints、policies 和 acceptance criteria，由 worker 针对每个 case 决定步骤。传统 software/API/code 在这里是 Agent 使用的工具，而不是外层固定流程。

这是 Maisa 竞争定位的一手材料，也支持 [[concept.agent-first-workflow|Agent-first 工作流]]。由于文章由厂商撰写，对 n8n/RPA 的维护成本和脆弱性带有销售偏向；不能据此断言静态 workflow 在所有结构化场景都更差。
