# Hyperagent

![Hyperagent homepage](assets/homepage-hero-2026-07-10.png)

## TL;DR

Hyperagent 是 [[company.airtable]] / Formagrid 做的 **组织级 agent fleet 平台**：让团队创建一组 connected to tools and data 的 specialist agents，并把它们部署到 Slack、Airtable、Web/browser、第三方 API 等工作流里。

它不是“又一个聊天框”，也不是单点 AI employee。更准确的定位是：**给企业和 founder 搭一个 agent harness，让 agent 学会组织怎么工作，然后可控地跑起来。**

我认为它值得重点跟踪，因为它把我们最近讨论的几条线都合在一起了：

1. **System of record + agent**：Airtable 原本就是业务数据/流程层，agent 正好需要结构化上下文。
2. **Model routing**：Hyperagent 明确走 model-agnostic，supervisor 用强模型，重复任务用便宜模型。这和 GPT-5.6 Sol/Terra/Luna 的社区反馈高度一致。
3. **Browser + tools + live view**：Browserbase case study 显示 Hyperagent 自 4 月以来跑了 300,000+ browser sessions，Stagehand 进入 agent run loop，live browser view 是核心 UX。
4. **Skills / memories / evals**：Andrew Busse 访谈里说，模型智能是前提，不是产品；真正产品是 agent harness。

## 产品边界

Hyperagent 首页很克制：

- Launch your fleet of agents
- Build specialists to solve your hardest problems, connected to your tools and data
- 预置角色：Chief of Staff、Recruiter、Sales Prospector、Data Analyst

LinkedIn 说得更完整：The complete system for AGI-level agents. Build with the most capable AI agent available, teach it skills that codify how your team works, and deploy it across your entire organization.

这说明它的产品形态不是一个固定岗位 agent，而是一套可配置的 agent platform：

- 每个 agent 有自己的 job description / system prompt / rules。
- 每个 agent 可连接特定工具，比如 Gmail、Slack、Hunter.io、Airtable、浏览器、API。
- 每次运行可以生成新 skills 和 memories，用户可手动审核或自动接受。
- 可以部署到 Slack、设为定时任务、通过 webhook/event 触发。
- 可以看 agent 实时跑浏览器和步骤，而不是只看最终文字。

## 和 Airtable / Superagent / Field Agents 的关系

这条线容易混：

- **Airtable Field Agents**：Airtable 平台内部的 AI agents，运行在 Airtable records / workflows 上。官方文案是 “Don’t just ask AI. Deploy it.”
- **[[company.superagent]]**：Airtable 2026-01-27 发布的 standalone multi-agent research product。重点是复杂商业问题 -> coordinated specialist agents -> interactive boardroom-ready deliverable。
- **Hyperagent**：更大的 standalone agent fleet / agent harness 平台。它不只做 research deliverable，而是让团队配置、运行、部署、复用 agents。

Terms of Service 很关键：Hyperagent 由 Formagrid Inc. 运营；条款明确 Hyperagent Service、Airtable Service、Superagent Service 分别适用不同服务条款。这说明 Hyperagent 是 Airtable 母体内的独立产品，而不是外部 startup 或普通功能页。

## 组织起源

Airtable 2025-10-13 宣布两件事：

- David Azose 加入 Airtable 任 CTO，此前在 OpenAI 负责 ChatGPT Business Products。
- Airtable 收购 DeepSky，一个 AI superagent，用于复杂研究和分析。

Airtable 官方解释：DeepSky 是从复杂 research / analysis 切入，把 open-ended research tasks 变成结构化 business narratives，并和 Airtable 的 insight-to-execution 工作流形成闭环。2026-01-27 的 Superagent 发布也明确说 Superagent built on DeepSky acquisition。

所以 Hyperagent 不是凭空冒出来的。它背后有三层资产：

- Airtable 的系统 of record / no-code app 平台；
- DeepSky 的 superagent / research product 资产；
- David Azose/ChatGPT Business Products 的 AI business product 经验。

## 真实使用场景

### 1. Community Guardian

Reddit / Airtable 社区里有一个很好的实际案例。用户先用 Hyperagent 做社区 activity daily briefing，后来接 Slack、Airtable 和 API，构建 Builder CRM base，让 agent：

- 汇总社区活动、情绪、top contributors；
- 识别支持问题、产品反馈、优秀 builder showcase；
- 把 feature feedback 推给对应 PM；
- 从 releases channel 里识别新功能，然后回查历史帖子，草拟 “Good news! We shipped it!” 回复；
- 把社区亮点推到 services / champions channels。

这个案例说明 Hyperagent 的价值不只是“帮你写一段话”，而是把社区反馈、产品反馈、支持、发布沟通串成一条闭环。

### 2. Data Analyst / Board meeting

Andrew Busse 访谈中提到他们内部 data analyst agent：不是简单 text-to-SQL，而是通过 skills、cascading skill retrieval、MRR 定义等，把分析口径编码进 agent。Board meeting 上可以即时回答 analyst-level questions。

这点很重要：企业 agent 的关键不是会不会写 SQL，而是是否知道“我们公司怎么定义 MRR、怎么查数、什么口径能用”。

### 3. Founding 500 / agentic GTM

Andrew Busse 访谈还提到 Founding 500：Hyperagent 发放 1000 万美元 inference credits 给 500 个 founders。更有意思的是，这个 campaign 本身几乎全流程由 Hyperagent agent 跑：founder/influencer outreach、landing page、lead qualification，最后由人类终审。

这既是 GTM，也是 dogfooding：用 agent 跑 agent 产品的 launch。

### 4. Small business / creator workflows

AI Tools SME review 提供了小企业视角：backlink outreach agent、AI tool outreach agent、content generation agent、keyword cannibalisation agent。它提到每个 agent 可以有工具、memory、budget limits，并能观察实时运行。

这个来源偏 affiliate/review，但场景具体，有参考价值。

## 技术与基础设施

Browserbase case study 是目前最硬的技术侧证据：

- Hyperagent 自 4 月以来在 Browserbase 上跑了 300,000+ sessions。
- Stagehand powers every web action inside the agent run loop。
- live browser view 是每次 agent run 的核心 UX。
- Browserbase 提供 Agent Identity / Web Bot Auth、并发浏览器、session replay、structured logs、live view。

这说明 Hyperagent 把 browser use 当作核心能力，而不是 demo。对企业 agent 来说，浏览器不是“网页抓取”，而是执行环境、认证环境、调试表面和用户信任来源。

## 增长与分发

### X / GPT-5.6 借势

Hyperagent 官方 X 账号 `@hyperagentapp` 已认证，约 9.5k followers。它在 GPT-5.6 发布当天发 thread，对比 GPT-5.6 和 Fable 在知识工作、写作结构、视觉层级上的输出，并宣布 GPT-5.6 已可在 Hyperagent 使用。

这是一种很典型的模型能力借势 GTM：

- 不说“我们也是 agent 平台”；
- 而是拿最新 frontier model 的输出质量差异，展示“你可以在 Hyperagent 里直接用”。

### LinkedIn / Founder audience

Andrew Busse、Howie Liu 和 Airtable 体系在 LinkedIn 上有明显分发。搜索结果显示 Andrew 关于 Hyperagent、Founding 500、Claude/Fable、agent workflows 的帖子有较多互动。

### Founding 500

Founding 500 是一个强 GTM 机制：用 1000 万美元 inference credits 吸引 500 个 agent-first founders。它同时筛用户、造案例、建立 founder 生态，也把 Hyperagent 定位成“agentic business infrastructure”，不是普通 SaaS 自动化工具。

### 流量

Similarweb 能看到 `hyperagent.com` 的 2026 H1 全流量数据。Jan 2026 - Jun 2026 全球总访问量约 1.665M，月访问约 325,566，月独立访客约 180,245。参与度是 3.09 pages/visit、00:03:37 visit duration、61.47% bounce rate。

渠道结构很有意思：

- 直接：32.32%
- 自然搜索：6.81%
- 付费搜索：16.18%
- 自然社媒：8.69%
- 付费社媒：29.37%
- 外链：2.67%
- 生成式 AI：0.44%

这说明 Hyperagent 不是纯 SEO 起量，也不是完全自然口碑扩散。它更像是 **direct + paid social + paid search** 组合拳：一方面靠 Airtable/创始人/社区声量建立直接访问，另一方面用付费社媒和搜索抢 agent/browser/AI employee 相邻需求。

社交流量里 YouTube 46.16%、Reddit 32.92%、X/Twitter 15.36%、LinkedIn 3.40%。这对我们有启发：agent 产品不是只在 X/LinkedIn 传播，YouTube demo 和 Reddit 讨论可能是更强的解释/转化场。

搜索词也值得注意。自然/付费搜索里出现 OpenClaw、Manus、Nooks、agent platform desktop app 等词，说明它在竞争的不是单一 “Airtable AI” 品牌词，而是在抢更宽的 agent execution / browser agent / AI employee 注意力。

### Product Hunt / Superagent launch

Product Hunt 页面现在可以打开。`Superagent from Airtable` 的 launch 信息是：The multi-agent system that delivers finished work，AI Workflow Automation 类别，5 个月前 launch，#6 Day Rank，149 points，120 followers。

这个数据不能直接等同于 Hyperagent 的 launch，因为 Product Hunt 页面是 Superagent，而不是 Hyperagent。但它能说明 Airtable 在 standalone agent 产品线上已经做过公开 launch，并拿到一定早期外部分发。它也支持一个判断：Airtable/Hyperagent 这条线不是只在企业销售里暗推，而是在用 Product Hunt、X、LinkedIn、founder campaign、community dogfooding 多渠道测试叙事。

## 竞品/相邻定位

Hyperagent 不是直接对标 Artisan/Viktor 那类岗位 AI employee，也不是纯 browser automation。更合理的相邻图谱：

- **OpenClaw / Claude Code / Codex / ChatGPT Work**：个人或团队级 agent execution harness。
- **Gumloop / n8n / Make / Zapier Agents**：可编排自动化/agent workflows，但 Hyperagent 强调 autonomous agent + skills/memory/evals，而不是固定流程图。
- **Dust / Glean / enterprise AI workspace**：组织知识与工具连接，但 Hyperagent 更偏“agent fleet 执行”。
- **Airtable Field Agents / Superagent**：同母体产品线，相互补位。
- **Browserbase / Stagehand**：不是竞品，是底层 browser infra。

## 判断

Hyperagent 最值得学的是：**它没有把 agent 当成一个模型产品，而是当成组织工作系统。**

它的产品假设是：

- 模型会持续变化，不能押单一模型；
- 企业真正需要的是让 agent 安全接入数据和工具；
- agent 要能积累 skills/memories，而不是每次从 prompt 开始；
- 要有可观察、可审核、可计费、可治理的运行环境；
- 最后结果要回到 system of record，而不是散在聊天记录里。

这和我们做 agent infra 的方向非常贴：Hyperagent 证明“agent harness + system of record + browser/tool execution + model routing”正在成为一个清晰产品形态。

## 风险与疑问

- 产品线命名复杂：Airtable Field Agents、Superagent、Hyperagent、DeepSky 容易混淆，外部用户理解成本高。
- 官网信息很少，很多关键解释来自访谈、社区和第三方 case study。
- Product Hunt 数据来自 Superagent 页面，不是 Hyperagent 独立页面，不能直接当作 Hyperagent launch 表现。
- Similarweb 是第三方估算，适合看量级和渠道结构，不宜把绝对数字当官方 analytics。
- Hyperagent 是否能脱离 Airtable 数据层形成独立强产品，还需要继续观察。它的优势和 Airtable system of record 强绑定，但独立 GTM 是否足够强尚未验证。
- 权限和治理会是核心难点。Andrew 访谈也提到多人协作 agent 涉及 Workday、Databricks、HR 数据等权限问题，不能靠 YOLO browser agent 解决。

## 证据库

- [[source.hyperagent.home-2026-07-10]]：官网首页，一句话定位与预置 agent 角色。
- [[source.hyperagent.terms-2026-05-28]]：Terms of Service，确认运营主体 Formagrid Inc. 与服务边界。
- [[source.linkedin.hyperagent-company-2026-07-10]]：LinkedIn 公司页。
- [[source.x.hyperagent-profile-2026-07-10]]：官方 X 账号。
- [[source.x.hyperagent-gpt56-thread-2026-07-09]]：GPT-5.6 借势 thread。
- [[source.airtable.ai-agents-2026-07-10]]：Airtable Field Agents 官方页。
- [[source.airtable.superagent-launch-2026-01-27]]：Superagent 官方发布。
- [[source.airtable.deepsky-acquisition-2025-10-13]]：Airtable 收购 DeepSky + David Azose CTO。
- [[source.browserbase.hyperagent-case-2026-07-02]]：Browserbase case study，300,000+ sessions。
- [[source.opensourceceo.hyperagent-andrew-busse-2026-06-07]]：Andrew Busse 访谈。
- [[source.reddit.airtable-hyperagent-community-guardian-2026-07-10]]：Airtable 社区实际用例。
- [[source.aitoolssme.hyperagent-review-2026-06-18]]：小企业/creator 使用评测。
- [[source.similarweb.hyperagent-traffic-2026-07-10]]：Similarweb 全流量快照。
- [[source.producthunt.superagent-launch-2026-07-10]]：Product Hunt 上 Superagent from Airtable 的 launch 页面。
