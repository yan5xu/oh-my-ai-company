# DeepSeek-V4-Flash-0731 官方 API 定价

2026-07-31 官方 pricing 页显示：

- Flash cache hit：$0.0028 / 1M input tokens；Pro：$0.003625；
- Flash uncached input：$0.14 / 1M tokens；Pro：$0.435；
- Flash output：$0.28 / 1M tokens；Pro：$0.87；
- 1M context、384K max output；
- Flash API concurrency 2500，Pro 为 500；
- 未来将引入北京时间 09:00–12:00、14:00–18:00 的 2 倍峰值价格，生效日期另行公布。

按同口径比较，Flash 的 cache-hit input 价格比 Pro 低约 22.8%；uncached input 和 output 均低约 67.8%，即 Pro 是 Flash 的约 3.11 倍。若一次任务恰好使用 1M 未缓存输入和 1M 输出，Flash 为 $0.42，Pro 为 $1.305。缓存占比越高，两者总成本倍数会越接近 1.29，而不是固定 3.11。

官方 Codex 集成页同时说明当前只有 Flash 支持 Codex，Pro 预计 2026 年 8 月上旬支持。

这些是一手价格与接口事实；低 token 单价不能单独证明每任务成本更低，因为输出长度、重试和任务成功率仍会影响总成本。

直接来源：

- https://api-docs.deepseek.com/quick_start/pricing/
- https://api-docs.deepseek.com/quick_start/agent_integrations/codex/
