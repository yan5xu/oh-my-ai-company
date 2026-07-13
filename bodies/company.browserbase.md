# Browserbase

![Stagehand hero](assets/browserbase-stagehand-hero-2026-07-11.png)

![Director hero](assets/browserbase-director-hero-2026-07-11.png)

## TL;DR

Browserbase 是给 AI agents 用的云浏览器基础设施：它把 browser 变成可规模化、可观测、可认证、可编程的 execution layer。它的路线不是只卖 headless browser API，而是做三层产品漏斗：

1. **Browserbase**：云浏览器 runtime / infra。
2. **Stagehand**：开源 browser-agent SDK，吸引开发者和 GitHub 心智。
3. **Director**：自然语言生成可复用 Stagehand 脚本，把 ops / 非开发者也带进 web automation。

我认为它是当前 agent infra 里最值得持续跟踪的公司之一，因为它抓住了一个很硬的事实：大量真实工作仍然发生在没有 API、登录墙、动态页面、旧系统和各种 web portal 里。Agent 想做事，必须有浏览器。

## 产品结构

### Browserbase

Browserbase 的主叙事是：Give your agents access to the whole web。

从官网 footer 和 docs 入口看，它已经不只是一个 browser session API，而是围绕 agent execution 做 primitives：Browsers、Web APIs、Runtime、Identity、Model Gateway、Observability、Stagehand、MCP。

它解决的是“把浏览器作为 agent runtime”这件事：并发、隔离、认证、代理、captcha、session replay、logs、live view、prompt observability、Agent Identity。

### Stagehand

Stagehand 的定位很清楚：The SDK for browser agents。它把 Playwright/Selenium 那类确定性脚本和 AI agent 的灵活性结合起来。

核心 primitives：

- `act()`：自然语言执行点击、填写、导航、滚动。
- `extract()`：按 schema 提取结构化数据。
- `observe()`：执行前识别页面上可操作的内容。
- `agent()`：需要多步端到端执行时自主跑 workflow。

它的核心 wedge 是：selectors 会坏，自然语言不一定会坏。传统脚本便宜、快、可预测，但 DOM 一变就断；黑箱 agent 灵活但不可控。Stagehand 站在中间：保留代码和每一步控制权，但用 AI 处理页面变化。

GitHub 上 `browserbase/stagehand` 截至 2026-07-11 约 23,455 stars / 1,610 forks。这是 Browserbase 最强 developer-led GTM 资产。

### Director

Director 是 Browserbase 从 developer infra 往更广人群扩展的产品。文案是：Describe it. Watch it happen。

它让用户用自然语言描述任务，看 agent 在真实浏览器里执行，然后把成功流程导出成 Stagehand code。典型场景包括：

- 每天从 municipal portals 拉 filings；
- 监控公开页面变化；
- 从 CSV 批量填表；
- 跨 registry 验证 license / credential / compliance；
- 在没有 bulk export 的 CRM 之间迁移数据。

这不是一次性 AI browsing，而是把“跑过一次的成功路径”转成可复用、可调度、可规模化的程序。

## 融资与团队

Founder 是 [[person.paul-klein-iv]]。X / LinkedIn 都显示他是 Browserbase founder。

融资线：

- 2024-11：$21M Series A，CRV 和 Kleiner Perkins co-led，Okta Ventures 等参与。
- 2025-06：$40M Series B，Notable Capital 领投，CRV、Kleiner Perkins 继续参与。

第三方报道还提到此前 $6.5M seed。Contrary 报告称累计融资 $67.5M、Series B valuation $300M，但这是第三方研究口径，需按 S2 使用。

LinkedIn 真实公司 slug 是 `browserbasehq`，不是 `browserbase`。真实页显示 11-50 员工、约 11k followers，员工页 pagination hint 为 84。

## 流量与 GTM

![Product Hunt](assets/browserbase-producthunt-2026-07-11.png)

Similarweb 显示，`browserbase.com` 2026 H1 全球总访问约 1.528M，月访问约 161,540，月独立访客约 80,690。参与度不错：4.01 pages/visit，00:06:07 visit duration，39.52% bounce rate。

渠道结构：

- Direct：45.24%
- Organic Search：32.62%
- Referral：7.26%
- Paid Search：5.14%
- Organic Social：4.34%
- Paid Social：1.64%
- Generative AI：1.94%

这和 [[company.hyperagent]] 非常不一样。Hyperagent 更像 paid social / campaign 驱动；Browserbase 更像 **direct + organic search + open-source/devrel** 驱动。

自然搜索里品牌占 77%，非品牌 23%。非品牌词包括 stagehand、agent browser、gemini browser、browser for agents、browser use。付费搜索词包括 firecrawl、gologin、playwright、browserless、testsprite。这些词说明它的竞争心智在 agent browser、browser automation、web scraping/testing 的交叉区。

Product Hunt 也很强：Browserbase 主产品页 2K followers、14 reviews、5.0。Director 在 2025-10-21 launch，#1 of day、#2 of week、#4 of month，782 upvotes。Browse.sh 在 2026-06-08 launch，#2 of day、#5 of week，512 upvotes。

这三次 launch 的演化很有意思：

- Browserbase 初次 launch：A web browser for your AI，60 votes，几乎没有评论。
- Director：Lovable for web automation，782 votes / 87 comments，拿到 #1 of day。
- Browse.sh：Give your agents muscle memory for automating the web，513 votes / 51 comments。

这说明 Browserbase 的 public narrative 在往更易懂的上层抽象移动：从“给 AI 一个浏览器”到“Lovable for web automation”，再到“给 agents muscle memory”。底层 infra 本身不容易传播，能演示、能复用、能用一句话理解的产品更适合 PH。

## 社区与开发者 traction

HN 上 Stagehand 的 Show HN 主帖有 326 points / 86 comments。主帖把 Stagehand 解释为 TypeScript project extending Playwright with `act` / `extract` / `observe`，目标是让 browser automations 更容易写、更能抗 DOM 变化。

GitHub traction 很强：23k+ stars，且 repo 在 2026-07-11 仍活跃 push。Stagehand 还在扩语言：TypeScript、Python、Go、Java、Ruby、Rust，以及 PHP/C#/Kotlin alpha。它想把 browser automation 从 Playwright/Puppeteer/Selenium 小圈子变成多语言 agent SDK。

GitHub activity 也显示它不是静态营销 repo：2026-06 仍在密集发布 `browse`、`stagehand`、`stagehand-server-v3`；2026-07 的 merged PR 包括 GPT-5.6 CUA models、browse skills、agent-facing help、snapshot unicode fix。open issues 里能看到真实技术边界：cross-origin iframe、CUA deterministic eval、Cloudflare Workers runtime、headed mode steals focus、agent typing race 等。

Stagehand docs 的问题定义值得记下来：传统 automation 太 brittle，纯 browser agent 又 too agentic。Stagehand 的位置就是把 AI 限定在可组合的 primitives 里，让开发者自己决定每一步用多少 AI。

## 技术与安全扩张

### Enterprise security

Browserbase 的 enterprise security docs 明确写了几层能力：

- SOC 2 Type II、HIPAA、third-party pen testing。
- 1 browser per VM。
- 每个 browser 在 isolated subnet 里跑，strict firewall rules。
- session 结束后 VM kill and recreate，不复用 browser。
- logs 和 recordings 可关闭。
- US/EU/Asia data residency。
- BYO-LLM 与 interceptor customization。

这说明它在主动把“浏览器执行”包装成 regulated enterprise workload 可接受的 infra，而不是只服务 scraping startup。

### ZDR / BYOS

Zero Data Retention 允许 session 不持久化 logs、recordings、DOM replay。Live View 仍可实时使用，但 replay/log endpoints 对 ZDR sessions 为空或 404。与 BYOS 配合后，downloads、uploads、contexts、extensions 可以进入客户自己的 AWS/KMS/lifecycle policy。

这是一个很企业化的 tradeoff：ZDR 减少数据留存风险，但也削弱 Browserbase support/debug 能力。对金融、医疗、政府客户，这个选项很关键。

### Agent Identity

Browserbase 与 Cloudflare 合作 Web Bot Auth，把 agent identity 做成 cryptographic passport。核心判断是：网站不能长期只靠 IP/user-agent/fingerprint 区分好 agent 和坏 bot；合法 agent 需要证明自己是谁、代表谁行动。

这条线很重要。传统 browser automation 的默认逻辑是 stealth/proxy/captcha；Browserbase 现在试图把它升级成“被网站承认的 agent identity”。如果这个方向成立，它的护城河会从 browser infra 走向 agent traffic trust layer。

### Functions / Fetch

Browserbase Functions 说明它不满足于托管 browser session。很多客户还要自己跑 worker、cron、queue、workflow engine 来控制浏览器，Browserbase 认为这是同一个问题：既然它托管 browser，就应该托管驱动 browser 的 code。

Functions 的抽象是 function / deployment / invocation，强调 explicit promote、local dev with real browser sessions、async invocation。这更像 browser-agent runtime，而不是 API service。

Fetch API 是另一侧的成本优化：不是所有 agent web access 都需要完整 browser。Browserbase 提出 search -> fetch -> decide -> browse。先用轻量 Fetch 读页面，只有需要点击/登录/执行时才开 browser。定价也明显更轻：Fetch $1/1,000 pages，markdown/JSON extract $4/1,000 pages，with proxies $7/1,000 pages。

## 客户案例

### Ramp

Ramp case 很关键。Browserbase 支撑 Ramp 的 procurement agent 和 receipt fetching。Procurement agent 会去真实 vendor site 拉 security assessment、contract terms、pricing details；receipt fetching 则从 merchant order histories 自动拉收据。

文中称 Ramp customers 每月在 5M+ receipts 上跑 receipt automation，回收约 30,000 小时 manual work；Browserbase 每月为 Ramp finance agents 节省 4,200+ 小时。

更重要的是 Agent Identity：Browserbase 不只是伪装成人访问网站，而是通过 Web Bot Auth 给 session cryptographically verified credential，证明 agent 是谁、代表谁行动。这是进入企业/金融场景的关键。

### Hyperagent

Browserbase case 称 [[company.hyperagent]] 自 4 月以来在 Browserbase 上跑 300,000+ sessions，Stagehand powers every web action inside the agent run loop，live browser view 是核心 UX。

这说明 Browserbase 是企业 agent fleet 的底层执行层，而不是只服务 scraper 或 QA。

## 社区反馈与风险信号

Reddit / HN 反馈把真实痛点说得很直接：

- **auth/captcha 不是框架问题**：Stagehand / Browser Use 这类 fresh sessions 每次都要重新处理登录、MFA、captcha，生产化会卡在认证态。
- **billing floor 对短任务不友好**：有用户说短 scrape 会浪费 billed time，实际需要 batching / bin packing，把多个短任务塞进同一 session。
- **fingerprinting 是军备竞赛**：WebGL renderer、audio context、canvas hash、headless Chrome 检测会持续变化。
- **self-hosting 有上限**：VPS + headless Chrome 适合部分场景，但一旦需要 fingerprint rotation、residential proxies、监控、内存管理，就会变成自己的 infra 产品。
- **浏览器资源问题真实存在**：Chrome memory leak、long-lived session、cloud startup latency 都会影响成本和可靠性。

这些反馈没有否定 Browserbase，反而说明它做的是一个真实痛点很硬的市场。但也提醒我们：Browserbase 的长期挑战不是“有没有 browser API”，而是成本、认证、身份、合规、调试、anti-bot 生态的综合能力。

### 中文社区补充

第三轮补了中文社区/中文内容平台，信号和英文源不太一样。

![小红书 Browserbase 科普配图](assets/browserbase/xhs-headless-browser-openai.webp)

V2EX / linux.do 的讨论更关心“真实网页能不能跑通”：

- V2EX 上关于 AI 驱动浏览器的讨论，重点落在页面理解、HTML + 截图、视觉成本、事件封装、反爬检测上。这里不是在追问 Browserbase 的品牌，而是在追问这类产品的物理边界：模型能不能理解页面、能不能稳定点击、成本是否会爆。
- V2EX 的 WebTop / OpenClaw 方案说明，开发者会自己搭 Oracle Cloud + WebTop + Chromium + CDP + Tailscale，给 agent 一个更像真人使用的云端浏览器。它是 Browserbase 的自建替代，也是需求验证。
- linux.do 上 Browserbase 出现在注册自动化、Gemini Computer Use、智能浏览器工具、Web Agent 招聘等语境里。社区关心 403/access denied、手机号验证、免费额度、能否过 reCAPTCHA/Cloudflare、能否自己搭替代。
- 一条 Web Agent 招聘帖把 browser-use / Browserbase / Stagehand / Skyvern 列为加分经验，并把 session 隔离、profile 管理、live view、登录态持久化、崩溃恢复、长程任务状态机、HITL、反爬失败分类、可观测性列为岗位能力。这说明 Browserbase 所在能力已经开始变成 Web Agent runtime 工程岗位语言。

小红书 / 即刻的信号更偏“中文传播与科普”：

![小红书 Browserbase 创投科普配图](assets/browserbase/xhs-ai-browser-infra-valuation.webp)

- 小红书搜索 Browserbase 返回多条内容，主题包括 OpenAI 合作、MCP Server、AI 浏览器新基建、估值、Search/Extract/Fetch。点赞收藏不算大，但说明 Browserbase 已经从英文开发者圈进入中文 AI 工具科普圈。
- 小红书内容的常见表达是“AI 会写代码/画图，为什么不能帮我们点网页”，比官方 infra 文案更适合泛人群理解。
- 一条中文方法论帖子把 Agent 上网拆成 Search / Extract / Fetch，并把 Browserbase / Browserless 放在“不想自己管浏览器集群时用”的托管平台层。这和 Browserbase 自己的 Fetch-before-browse 思路一致：不是所有网页任务都应该直接开完整浏览器。
- 即刻上 Browserbase 作为 Agent infra 明星项目被拿来和 E2B 类比，也出现在 Google Computer Use Preview 运行环境的短帖里。这是弱信号，但说明 Browserbase 在中文增长/开发者内容里已有心智。
- 微信/公众号不是没有 Browserbase 内容。新版 `weixin` adapter 修复后，已经能从搜狗微信搜索返回真实 `mp.weixin.qq.com` 链接，并抓到正文。可读到的内容包括 Stagehand 结构化日志/自愈、浏览器 GUI Agent 技术路线全景、agent infra 分层、Computer Use / Browser Use 赛道综述等。

![小红书 Agent 上网三件套配图](assets/browserbase/xhs-search-extract-fetch.webp)

收尾复测后，公众号正文也能抓。微信的价值从“搜索结果弱信号”升级为“中文技术内容源”：它比小红书更适合看技术路线和市场地图，但仍要注意，公众号文章里融资、下载量、benchmark、市场规模等数字应回到官方或强第三方来源核验。

这次补抓的公众号里，Stagehand 被反复放在一个明确位置：不是黑箱 browser agent，而是架在 Playwright 上的结构化 primitives。中文作者关注的关键词包括可观测、Sessions 回放、Self-Healing、Action 缓存、DOM/无障碍树、视觉兜底、生产协作、token 成本。这和我们此前从官方 docs / GitHub / HN 得到的判断一致。

另一个新增信号来自小红书《浏览器Agent用Browserbase CLI前》：这类内容已经不只是在做“AI 浏览器科普”，而是在提醒 session/context、真实登录态、本地 QA、密钥环境、function/fetch/search、截图/日志产物之间的边界。对 Browserbase 这类产品来说，生产化难点确实在状态、凭证、审计和产物边界。

对 Browserbase 的新增判断：

- 英文官方/企业叙事是 infra、identity、compliance、observability；中文开发者叙事更直接：能不能过盾、过验证码、抗风控、撑住长任务、别太贵。
- 中文内容平台有传播势能，但目前更多是科普/搬运/创投解释，深度用户反馈主要还是 V2EX/linux.do 这类开发者社区。
- Browserbase 在中国开发者语境里可能同时被看作“生产 infra”和“注册/自动化/爬取工具”，后者带来需求，也带来灰色用途和风控风险。

## 竞品与相邻

Product Hunt / Similarweb / 搜索结果中出现的相邻对象：

- Browser Use：让 websites accessible for agents。
- Firecrawl：Web Data API for AI Agents and Developers。
- Hyperbrowser：相近 browser infra，Similarweb 对比站点。
- Lightpanda：浏览器/automation infra 相邻。
- Browserless：老牌 headless browser as a service。
- Airtop：Automate your work with just words。
- Intuned / Owl Browser：code-first 或 undetectable browser automation。

Browserbase 的差异点不是单点能力，而是组合：cloud browser infra + open-source SDK + no-code Director + identity/observability/enterprise case。

第二轮补充后，我会把竞品拆成几类：

- **direct browser infra**：Hyperbrowser、Browserless、Steel.dev、Anchor Browser。
- **browser agent framework**：Browser Use、Stagehand、Playwright/Selenium + AI wrappers。
- **web data / crawl API**：Firecrawl、ScrapingBee、Bright Data。
- **no-code / AI automation**：Airtop、Director、Skyvern。
- **legacy incumbents**：BrowserStack、Sauce Labs、UiPath、RPA 平台。

Browserbase 的位置不是每类都最强，而是同时覆盖 infra、framework、identity、runtime、no-code entry，这让它更像平台公司。

## 判断

Browserbase 的高明之处是把“浏览器”重新包装成 agent 时代的基础设施 primitive。

它不是说“我们有一个 browser agent”，而是说：

- 你可以用 Stagehand 写更稳的 browser automation；
- 你可以在 Browserbase 上大规模运行；
- 你可以用 Director 让非工程用户生成可复用脚本；
- 你可以通过 observability/replay/live view 调试；
- 你可以通过 Agent Identity 处理 trust/auth 问题。

对我们最有启发的是：agent infra 的价值不一定在“最聪明的 agent”，而在把真实世界的脏接口变成可运行、可观察、可治理、可复用的执行层。

## 风险与疑问

- 竞争会很密集。Hyperbrowser、Browserless、Browser Use、Firecrawl、Airtop、RPA/QA 平台都会从不同方向进入。
- 核心基础能力容易被大平台内化。OpenAI/Anthropic/Google/云厂商都有可能自建 browser runtime。
- 合规和反爬边界会长期存在。Browserbase 的 Agent Identity 是好方向，但它能否成为行业标准还要观察。
- 云浏览器成本结构较重，和纯 SaaS 不同，规模越大越考验 infra 成本控制。
- Director 是否能真正进入非开发者日常，还需要更多用户案例验证。
- 短任务 billing floor 和浏览器 session 成本会影响 self-serve 用户体验，Fetch API 是回应之一，但 browser execution 成本无法完全消失。
- 如果网站/anti-bot 厂商不接受 Web Bot Auth / agent passport，Browserbase 仍会被迫回到 stealth/proxy/fingerprint 军备竞赛。
- Stagehand 的开源 traction 是优势，但也可能让核心 framework 层被快速模仿；真正难复制的是 cloud runtime + identity + enterprise trust + customer workloads。

## 待补

- 深挖 Stagehand GitHub star history。
- 看 Browserbase / Stagehand / Director 的 X thread 和 founder 传播方式。
- 继续分析 Hyperbrowser、Browser Use、Firecrawl、Airtop 等竞品。
- 深挖 Product Hunt launch 评论区和 maker 互动。
- 补完整 pricing 页面截图/结构；当前 pricing 页面在 browser 里呈现 iframe/空内容，正文未完整抓到。
- 深挖 HN/Reddit 评论区，尤其 production reliability、cost、auth、fingerprinting。

## 证据库

- [[source.browserbase.website-2026-07-11]]：官网入口。
- [[source.browserbase.stagehand-page-2026-07-11]]：Stagehand 产品页。
- [[source.browserbase.director-page-2026-07-11]]：Director 产品页。
- [[source.browserbase.series-b-2025-06-18]]：官方 Series B + Director/Stagehand Python/降价。
- [[source.browserbase.series-a-2024-11-12]]：Series A 第三方报道。
- [[source.github.browserbase-stagehand-2026-07-11]]：Stagehand GitHub 数据。
- [[source.similarweb.browserbase-traffic-2026-07-11]]：Similarweb 流量快照。
- [[source.producthunt.browserbase-2026-07-11]]：Product Hunt 主页面和 launches。
- [[source.producthunt.browserbase-launches-2026-07-11]]：Product Hunt 三次 launch 细节。
- [[source.hn.stagehand-show-2025-01-08]]：Stagehand Show HN。
- [[source.stagehand.docs-intro-2026-07-11]]：Stagehand docs introduction。
- [[source.browserbase.enterprise-security-2026-07-11]]：Enterprise security docs。
- [[source.browserbase.zdr-2026-07-11]]：Zero Data Retention docs。
- [[source.browserbase.cloudflare-identity-2026-07-11]]：Cloudflare + Browserbase Web Bot Auth。
- [[source.browserbase.functions-2026-02-10]]：Browserbase Functions。
- [[source.browserbase.fetch-api-2026-03-11]]：Browserbase Fetch API。
- [[source.reddit.stagehand-vs-browser-use-2026-07-11]]：Reddit Stagehand vs Browser Use。
- [[source.reddit.browserbase-10k-sessions-2026-07-11]]：Reddit 10k+ sessions feedback。
- [[source.github.stagehand-activity-2026-07-11]]：GitHub release/issue/PR activity。
- [[source.browserbase.ramp-case-2026-05-21]]：Ramp 客户案例。
- [[source.browserbase.hyperagent-case-2026-07-02]]：Hyperagent 客户案例。
- [[source.v2ex.browserbase-ai-browser-operation-2024-12-22]]：V2EX AI 驱动浏览器操作讨论。
- [[source.v2ex.openclaw-webtop-browser-2026-03-22]]：V2EX WebTop / OpenClaw 自建云端浏览器方案。
- [[source.v2ex.agent-cli-browserbase-2026-02-27]]：V2EX AI/Agent 与 CLI/API/MCP 讨论。
- [[source.linuxdo.browserbase-registration-2026-04-03]]：linux.do Browserbase 替代与注册自动化讨论。
- [[source.linuxdo.gemini-browserbase-limits-2026-04-02]]：linux.do Gemini Browserbase 使用限制讨论。
- [[source.linuxdo.browser-agent-tools-2025-11-06]]：linux.do 智能自动操作浏览器项目讨论。
- [[source.linuxdo.web-agent-hiring-2026-07-02]]：linux.do Web Agent 招聘中的 Browserbase/Stagehand 技能信号。
- [[source.linuxdo.gemini-computer-use-browserbase-2025-10-08]]：linux.do Gemini Computer Use 与 Browserbase 试用讨论。
- [[source.xiaohongshu.browserbase-search-2026-07-11]]：小红书 Browserbase 搜索结果快照。
- [[source.xiaohongshu.browserbase-headless-browser-2025-05-27]]：小红书 Browserbase 无头浏览器科普。
- [[source.xiaohongshu.browserbase-mcp-2025-05-09]]：小红书 Browserbase MCP Server 科普。
- [[source.xiaohongshu.browserbase-valuation-2025-06-28]]：小红书 Browserbase 创投科普。
- [[source.xiaohongshu.search-extract-fetch-2026-06-19]]：小红书 Agent 上网三件套。
- [[source.xiaohongshu.browserbase-cli-before-2026-06-21]]：小红书 Browserbase CLI 前置边界。
- [[source.jike.browserbase-seo-github-2026-07-11]]：即刻 Agent infra / GitHub SEO 弱信号。
- [[source.jike.google-computer-use-browserbase-2026-07-11]]：即刻 Google Computer Use / Browserbase 弱信号。
- [[source.weixin.browserbase-search-2026-07-11]]：微信/公众号 Browserbase 搜索结果快照。
- [[source.weixin.stagehand-structured-logs-2026-07-05]]：公众号 Stagehand 结构化日志与自愈。
- [[source.weixin.gui-agent-landscape-stagehand-2026-07-04]]：公众号浏览器 GUI Agent 技术路线全景。
- [[source.weixin.agent-infra-browserbase-2026-03-29]]：公众号 agent infra 地图中的 Browserbase。
- [[source.weixin.computer-use-browserbase-2026-06-29]]：公众号 Computer Use / Browser Use 赛道综述。
- [[source.browserbase.linkedin-company-2026-07-11]]：LinkedIn 公司页。
- [[source.x.browserbase-profile-2026-07-11]]：官方 X。
- [[source.x.paul-klein-iv-profile-2026-07-11]]：Paul Klein IV X。
