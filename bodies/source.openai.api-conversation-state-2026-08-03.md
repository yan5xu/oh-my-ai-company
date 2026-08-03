# OpenAI API conversation state

采集时间：2026-08-03。

OpenAI 明确说明单次生成请求本身是独立、无状态的。开发者可手工回传历史、用 `previous_response_id` 串联响应，或用 Conversations API 创建带 durable identifier 的 long-running object。

Conversation 可跨 session、device 或 job 保存 message、tool call、tool output 等 item。与普通 response 默认 30 天保存不同，Conversation object 及其 item 不受 30 天 TTL 约束。

但持久 Conversation 不等于完整 persistent agent：它保存交互状态，不自动提供任务触发、长期身份、运行环境、凭据治理、主动行动或轨迹级监督；长对话仍要处理 context window、compaction 和成本。
