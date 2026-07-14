# Relevance AI 系统限制文档

公开限制包括：单文件上传 100MB、CSV 50,000 rows、raw text 10MB。普通 tools 多为 15 分钟上限，部分任务可运行 24 小时；Agent/user action 15 分钟，bulk tasks 24 小时。

并发额度按套餐变化，超出后排队。该页面证明平台有显式 runtime/queue 边界，但未披露队列延迟、任务恢复率和长期可靠性。
