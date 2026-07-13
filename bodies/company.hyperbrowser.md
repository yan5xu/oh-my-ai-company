# Hyperbrowser 调研

![Hyperbrowser 官网主页面](../assets/hyperbrowser/home-main.png)

## TL;DR

Hyperbrowser 是 Browserbase 这条线上的直接相邻竞品，但它的自我定位更像“给 AI agent 的 Web 执行与数据基础设施”：第一层是 cloud browser sessions，第二层是 Fetch/Crawl/Search/Scrape/Extract 这类 Web API，第三层是 HyperAgent/MCP/Browser Use/CUA/Claude/Gemini 这样的 agent 执行入口，第四层已经延伸到 cloud sandboxes。

我对它的判断是：Hyperbrowser 不是只卖“云浏览器”的公司，而是在把“浏览器 + 网页数据 + agent runner + sandbox”合成一个 agent web runtime。这个方向对我们重要，因为它把 browser infra 从“远程 Playwright”推进到“agent 可以稳定访问、理解、操作网页”的完整平台。

和 Browserbase 相比，Hyperbrowser 更突出 stealth/proxy/captcha/低延迟/按 credit 计费，以及 HyperAgent/MCP/app examples 这类开发者入口；Browserbase 则在 Stagehand 的开源心智、Director/enterprise identity、案例与品牌上更强。两者不只是功能竞品，也是两种 GTM：Browserbase 更像开发者平台 + enterprise workflow，Hyperbrowser 更像低层 web infra + AI agent 工具链。

## 产品栈

### 1. Cloud browser sessions

官网一句话是 “Cloud browsers on-demand via API”。它兼容 Playwright、Puppeteer、Selenium/CDP，提供 WebSocket endpoint、liveUrl、sessionUrl、computerActionEndpoint、session recording、regions、proxy、captcha、stealth、profiles 等。

关键点：
- session 是隔离的云浏览器实例；
- profile 用来持久化 cookies/localStorage/sessionStorage/cache；
- stealth/proxy/captcha 是正式产品能力，不是边缘功能；
- ultra stealth、HIPAA/SOC 2、1000+ concurrent browsers 等在 enterprise 层出现。

### 2. Web API / 数据层

它不只让用户自己连浏览器，也直接提供 Fetch/Crawl/Search/Scrape/Extract API。Fetch 可以返回 markdown、HTML、links、screenshot、structured JSON、branding profile。JSON extraction 支持 prompt/schema，两者结合可以把网页直接转成结构化对象。

这说明 Hyperbrowser 想吃掉一部分“网页读取/抓取/结构化”的上层需求，而不是只卖底层 browser session。

### 3. Agent layer：HyperAgent + MCP + CUA/Claude/Gemini/Browser Use

HyperAgent 是它的开源 AI browser automation framework，文档里的核心说法是 “Playwright supercharged with AI”。它提供：
- `page.ai()`：多步自然语言任务；
- `page.perform()`：单步动作；
- `page.extract()`：结构化抽取；
- 原生 Playwright fallback；
- action caching：记录一次后复用，降低每次都走 LLM 的成本与不稳定性。

MCP server 则把 scrape/extract/crawl/search/browser agents 暴露给 Cursor、Windsurf、Claude Desktop 这类客户端。这个入口很重要：它把 Hyperbrowser 从“你写代码调用 API”变成“agent 工具箱里直接有浏览器能力”。

### 4. Sandboxes

Docs 里已经有 sandboxes：isolated cloud environments for agentic workflows，支持 Node/Python/CLI、自定义 Docker image、filesystem、volumes、terminal、runtime URL、snapshots。这个方向会把 Hyperbrowser 推向 E2B/Daytona/OpenClaw 这类 agent runtime/sandbox 赛道。

这可能是它后续最值得盯的扩张：浏览器是 agent 接触 web 的窗口，sandbox 是 agent 执行代码/保存状态/跑工具的环境，两者合起来接近 “web agent runtime”。

## 价格与商业化

官网/文档采用 credit 定价：1 credit = $0.001。公开价格包括：
- Browser usage: 100 credits/hour = $0.10/browser hour；
- Proxy data: 10,000 credits/GB = $10/GB；
- Fetch: 1 credit/page；带 proxy +9 credits/page；JSON output +5 credits/page；
- Search: 5 credits/query；带 location 10 credits/query；
- HyperAgent / Browser Use: 20 credits/step = $0.02/step；
- AI Extract: 0.03 credits/output token = $30/M output tokens。

这个价格结构能看出它在同时服务两类用法：低层 browser session 的资源消耗，以及上层 agent/web data task 的按动作计费。

## 团队与公司状态

YC 公司页显示 Hyperbrowser founded in 2021，founders 是 Akshay Shekhawat 和 Shri Sukhani，based in San Francisco，团队规模 4 employees。LinkedIn company 页显示 11-50 employees、约 3,000 followers，口径和 YC 页有差异，后续需要再核验团队实际人数。

Shri Sukhani 的 X bio 显示 “cofounder @hyperbrowser (YC S21); prev: eng @meta”，其 X 账号约 874 followers。Akshay Shekhawat 的 LinkedIn 可确认是 founder @ hyperbrowser.ai，本轮没有找到高置信 X 账号。

本轮没有找到可靠融资新闻，不写融资结论。

## 开发者与社区信号

GitHub 组织下有几个关键仓库：
- `hyperbrowser-app-examples`：约 1.9k stars；
- `HyperAgent`：约 1.5k stars；
- `mcp`：约 770 stars；
- Python/Node SDK 持续更新；
- 还有 langchain-hyperbrowser、n8n-node、harbor 等周边仓库。

和 Browserbase/Stagehand 相比，Hyperbrowser 的单仓库星数更小，但它的 repo 组合更宽：examples、MCP、agent framework、SDK、sandbox/eval 周边都在铺。

HN 上至少有两次有效曝光：
- Show HN: Hyperbrowser - Scalable Browser Infrastructure for AI Apps；
- Show HN: Hyperbrowser MCP Server - Connect AI agents to the web through browsers。

HN 评论里创始人明确提到他们从构建 AI apps/agents 时遇到的 blocked/proxies/captchas/Kubernetes scaling/markdown crawl 等问题切入。MCP 贴里也暴露一个真实痛点：MCP 安装和 auth UX 很糟糕，用户经常要手动硬编码 credentials。

Reddit 上有一条关于 Hyperbrowser vs Browserbase/Playwright long-running agent tasks 的讨论。它的价值不是证明谁更好，而是提醒：长时间 agent 浏览器任务仍需要 checkpoint、retry、state management。社区反馈里有人觉得 Hyperbrowser startup/anti-detection 更好，也有人仍然因为 live view/debug 体验回到 Browserbase。这个风险对整个 browser-agent infra 赛道都成立。

## 中文传播信号

中文侧搜到了微信和小红书内容，但主要是工具介绍/教程/泛 AI 工具传播：
- 微信有 HyperAgent + Playwright 的教程类文章；
- 小红书有“每天半小时 AI 知识｜Hyperbrowser”这类泛工具视频，点赞收藏不算低；
- linux.do/v2ex 未搜到有效讨论。

这里不能当成开发者采用证据，只能说明 Hyperbrowser/HyperAgent 已经进入中文 AI 工具内容流。

## 流量与规模

Similarweb 登录恢复后，补到了 Jan 2026 - Jun 2026 的完整数据。hyperbrowser.ai 6 个月总访问量 400,144，月均访问 25,724，月独立访客 14,719，访问持续时间 00:02:13，页面数/访问 2.41，跳出率 54.44%。设备分布较均衡：Desktop 51.63%，Mobile Web 48.37%。

渠道上，它不像纯投放产品，也不像成熟内容 SEO 站，更像开发者 GTM 混合流：直接 39.51%、自然搜索 37.80%、自然社媒 11.73%、外链 8.91%、生成式 AI 1.28%、邮件 0.60%。详细来源里 Direct 59.74%、Google Search 23.79%、X-twitter 5.84%，GitHub、Reddit、HN、There’s An AI For That、ChatGPT 都有小比例贡献。

搜索页显示 Search Traffic 16.68K，100% 自然，862 个关键词，品牌流量 70.46%。Top 非品牌词其实也强绑定 HyperAgent/Hyperbrowser：hyperagent、hyper agent、hyperagent ai、hyperborwser、hyperbrowser_api_key。这说明它搜索增长更多来自自有产品心智，而不是宽泛内容矩阵。

地理上，overview top 5 是美国、印度、英国、孟加拉国、澳大利亚；audience 详细页 top 5 是美国、印度、英国、韩国、澳大利亚。两页口径有差异，但方向一致：美国/印度是核心市场，且美国、印度访问持续时间都在 4 分钟左右，高于整体均值。

相似网站前列是 browserbase.com、browser-use.com、skyvern.com、browsercloud.io、lightpanda.io、docs.browserless.io。前 6 个与 browser-agent / browser automation / cloud browser 高相关；后面混入 cloud hosting、社交平台和通用开发平台，不能全部当直接竞品。

截图：![Similarweb audience](../assets/hyperbrowser/similarweb-audience.png)

## 关键判断

1. Hyperbrowser 的产品边界正在从 browser infra 扩到 web-agent runtime。Cloud browser、web data API、agent framework、MCP、sandbox 是一条连续链路。

2. 它对开发者的吸引力来自“少搭 infra”：不用自己维护 browser pool、proxy、captcha、profiles、recordings，也不用从零写自然语言 browser action layer。

3. 它的差异点不是一个单点功能，而是把 agent 访问 web 的多个痛点打包：网页打开、反爬、数据抽取、自然语言动作、MCP 接入、沙盒执行。

4. 最大风险是产品面过宽。browser session、web scraping、agent framework、MCP、sandbox 都是重赛道，早期团队如果资源有限，可能会在 GTM 和技术可靠性上被拉扯。

5. 另一个风险是“stealth/captcha/proxy”天然处在灰色边界和平台对抗里，enterprise 购买者会看安全、合规、稳定性、审计和滥用控制。Hyperbrowser 官网有 HIPAA/SOC 2 enterprise 文案，但本轮没有看到像 Browserbase 那样更完整的 enterprise case study。

## 对我们的 takeaway

- Browser infra 不能只看“远程浏览器”，要看它是否向上吞 web data API、agent action framework、MCP/tool gateway，向下吞 sandbox/runtime。
- 长任务稳定性是 browser-agent infra 的核心难题，社区讨论反复指向 checkpoint/retry/state management，而不是“换一家云浏览器就万事大吉”。
- HyperAgent 的 action caching 值得重点看：它试图把 LLM-driven action 转成可复用、低成本、稳定的 automation replay，这是 agent 产品从 demo 到生产会遇到的关键问题。
- 中文传播侧目前更像工具内容流，不像严肃开发者社区采用；中文社区挖掘要区分“泛工具推荐”和“真实构建/踩坑反馈”。

## 待补

- Akshay Shekhawat 的高置信 X 账号。
- Hyperbrowser 是否有公开融资新闻或投资人。
- HyperAgent license/商业使用边界。
- 与 Browserbase、Browserless、Steel.dev、Anchor Browser、Browser Use Cloud、E2B/Daytona 的分层竞品图。

## 证据分级

S1：Hyperbrowser 官网、docs、YC company/launch、GitHub repo、LinkedIn/X adapter 抓取。
S2：HN launch 讨论、Similarweb 数据。
S3：Reddit、小红书、微信搜索结果与中文工具介绍。
S4：未能抓取正文或只搜到结果页的材料，不能作为事实来源。
