# 微信/公众号 Browserbase 搜索结果快照（browser fallback）

平台：微信/公众号（搜狗微信）

证据等级：S3（搜索结果页/摘要；不是逐篇公众号正文）

2026-07-11 复测情况：

- `pinixc site weixin search --profile default --query Browserbase --count 5` 仍返回 `Sogou anti-bot or network fetch failed`。
- 但直接 `pinixc browser open 'https://weixin.sogou.com/weixin?type=2&query=Browserbase' --profile default` 可以打开搜索页，标题为 `Browserbase的相关微信公众号文章 – 搜狗微信搜索`，页面显示约 419 条结果。
- `browser read` 能抓到搜索结果摘要，但不是公众号文章全文。

可见搜索结果包括：

- 《想用 AI 帮你点网页,又怕它乱点?Stagehand 让每一步都留结构化日志,崩了 AI 自己修》：哥酒菜，2026-07-05。
- 《如何实现Hermes Agent浏览器自动化》：AI海洋拾荒者，2026-07-03，摘要提到 Browserbase API key / environment variables。
- 《智能体需要全新的互联网基础设施》：AI语者，2026-03-29，摘要提到 Browserbase 做托管浏览器基础设施。
- 《AI浏览器大战爆发: Perplexity、Dia 抢滩“会思考的浏览器”...》：智搜云航，摘要提到 Browserbase 服务公司/开发者与 SDK 下载数据。
- 《让AI长出手脚: 一文读懂Computer Use与Browser Use》：金材AI，2026-06-29，摘要提到 Browserbase B 轮融资和估值。
- 《10个浏览器自动化控制方案横评...》：Bingal，2026-03-24，摘要列出 browser-use、browserbase/stagehand、HyperAgent。

判断：微信/公众号不是没有 Browserbase 内容；之前的问题主要是 weixin adapter 抓取失败。当前只能把搜狗搜索结果作为内容分布弱信号，不能当作逐篇正文证据。后续要深挖公众号，需要 browser 打开具体文章或修复 weixin adapter。
