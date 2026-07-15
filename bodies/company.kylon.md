> **一句话**：Kylon 把人类、云端 Agent 与本地 Codex / Claude Code 放进同一协作空间，并用 Gateway、Proxy、权限、审批、共享上下文和结构化数据承接整家公司工作；它已经有较深的产品实现，但当前仍以 waitlist 为主，市场采用证据很弱。

![Kylon 产品预览：频道、人类与 Agent 协作，以及由同一上下文生成的经营面板](assets/kylon/app-preview.png)

## TL;DR

- **产品不是 Slack bot**：Kylon 自建了频道、消息、文件、表格、workflow、web project 和公司级记忆。Agent 是工作空间的一等成员，而不是在现有聊天工具里被 @ 的外挂。
- **隐藏的技术主线更重要**：开发文档显示它同时提供本地 Agent Gateway、workspace CLI 和统一 Proxy。Codex、Claude Code 或 generic CLI Agent 可以接收任务、运行本地进程、回写结果；模型、工具、数据、权限、额度与调用归因则由 Proxy 统一处理。
- **执行深度与市场规模必须拆开**：CLI 2026-06-16 才发布，随后出现大量 prerelease；iOS App 06-15 上线，07-06 到 1.0.4。它证明产品真的在开发和交付，不证明已有大规模客户。官网仍写 Join the Waitlist，应用登录页也提示 early access。
- **团队很小，技术背景强**：LinkedIn 为 2-10 人，可见 Quinn Leng、Yue Li、Christina Bowllan。Quinn 曾在 Databricks 参与 Mosaic Research、评测、生成式 AI 产品与计算控制面。Ashton Teng 被 2026-04 官方博客标为联合创始人，但当前 LinkedIn 未列 Kylon，日常经营角色待确认。
- **融资必须按产品谱系归属**：Leonis 官方 portfolio 支持其投资 Kylon，但轮次和金额未披露。PearX S25 与 Atria 的线索属于两位创始人此前的 [[company.kepler-ai|Kepler AI 历史产品]]，不能迁移成 Kylon 融资。
- **规模仍极早期**：第三方流量数据为 N/A；Kylon X 约 7 个关注者、2 条帖子，LinkedIn 约 33 个关注者，App Store 只有 1 个评分。npm 近 30 天 9,845 次下载受大量 prerelease、CI 与重复安装影响，不能当用户数。
- **核心判断**：Kylon 值得关注的不是“又一个 AI employee”，而是把协作 UI、公司上下文、本地 runtime、工具/模型 proxy、额度和治理做成同一控制面。它的产品野心领先于当前分发和采用。

## 它在卖什么

官网把 Kylon 定义为 “The AI agent team that runs your entire business”。用户在频道中提出任务，Agent 读取跨频道、文件、表格与工具的公司上下文，拥有长期身份与职责，并把工作直接交付为 PR、外呼序列、广告活动、结构化数据或应用。

适用场景不是单次问答，而是持续经营：

- 工程：从 bug report 生成 PR、维护 changelog、跟踪发布；
- GTM：从竞品或线索事件生成个性化 outbound 与 campaign；
- 经营分析：把 Stripe、GA4、CRM 等数据汇成可操作面板；
- 研究与运营：在频道之间传递反馈、自动生成 feature request 和后续动作；
- 内部工具：Agent 在工作空间内创建表格、workflow 和 web app。

![官网展示的三层产品：AI coworker、结构化数据与跨公司的共享记忆](assets/kylon/product-layers.png)

## 产品架构：协作空间只是外层

### 1. AI-native workspace

Kylon 自己拥有频道、消息、thread、文件、表格、workflow、web project 等资源。官方对 Claude in Slack 的比较强调，自有工作空间可以控制信息密度、为不同用户渲染不同 UI、保留跨项目记忆、表达结构化数据，并让 Agent 互相协调。

这使它同时接近 [[concept.agent-native-context-workspace]]、[[concept.agent-native-collaboration-os]] 和 [[concept.agent-company-control-plane]]：界面是协作工具，底层却是身份、上下文、资源和动作的控制平面。

### 2. Local Agent Gateway

Developer Docs 明确支持 `codex`、`claude-code` 和 `generic` 三类本地 provider。`kylon gateway run` 会完成注册并启动长期 daemon；Agent 收到 assignment 后，daemon 拉起本地 provider 进程、流式回传进度并提交最终结果。会话保存在 `~/.kylon/gateway-session.json`，还可以把特定 Agent 绑定到 provider 与工作目录。

![Kylon Gateway 文档：把本地 Codex、Claude Code 或 generic Agent 接入工作空间](assets/kylon/gateway-docs.png)

这意味着 Kylon 不只在云端生成文本，它试图把本地开发环境、已有 coding Agent 和团队工作空间接起来。对 Agent infra 而言，这是比官网“AI coworkers”更有辨识度的产品面。

### 3. Proxy 与经济控制面

Proxy 集中处理模型、工具、外部数据和 API 调用：

- 统一认证、权限检查、request attribution 与 provider routing；
- 对工具执行、搜索和第三方 provider 收固定或动态 credits；
- 调用前做额度检查，余额不足可返回 402；
- 流式调用记录 usage，失败请求也进入账务/错误记录；
- 对 OpenAI、Anthropic、Gemini、Cerebras、OpenRouter、ElevenLabs、Apify、Apollo 等提供统一入口。

因此它真正闭环的是：**任务进入 → Agent 获得身份和上下文 → 本地/云端执行 → 工具与模型调用受控 → 结果回到工作空间 → 人审批关键动作**。

## 一个被低估的问题：Agent 输出会淹没人

Kylon 在与 Claude Tag 的比较中提出，Agent 规模扩大后，人的注意力会成为瓶颈。聊天工具若把全部过程直接投进频道，会制造新的信息过载；工作空间需要压缩过程、突出结论、异常和待审批动作，并保留可追溯上下文。

这是 [[concept.agent-output-attention-compression]]：AI employee 的竞争不只是谁能执行更多，也是谁能把更多机器输出压缩成人类可管理的决策面。

## 产品成熟度：已经 ship，但尚未开放增长

![Kylon 当前登录入口，底部仍提示 early access / join waitlist](assets/kylon/app-signin.png)

可以确认已经 ship 的 receipt：

- iOS App 由 Pure Reason Inc. 发布，首版日期 2026-06-15；
- 2026-07-06 更新到 1.0.4，release notes 涉及数据库查看器、CSV/TSV、语音/通话/转录与 chat fixes；
- npm 上 `kylon-cli` 创建于 2026-06-16，stable 为 0.1.0，另有大量 `0.2.0-next.*`；
- Docs 给出了完整 gateway、workspace CLI、proxy API 与 billing 说明；
- GitHub 组织 `fre-so` 有 docs、Codex hook、E2B Go fork 和若干应用仓库，但公开 star 很少。

不能确认的部分：

- 当前没有公开 pricing；
- 官网和应用仍以 waitlist / early access 为主；
- App Store 只有 1 个评分，样本无意义；
- npm 下载无法区分客户、开发环境、CI、版本发布和机器人；
- 没有独立客户案例、留存、付费或工作负载数据。

官方比较文称有 free trial，与当前入口仍在 waitlist 存在口径冲突。这里保留冲突，不替厂商推断开放范围。

## 团队与产品谱系

### Quinn Leng

[[person.quinn-leng]] 是当前 LinkedIn 明确标注的 Kylon co-founder。其经历与当前架构高度相关：在 Databricks 先参与生成式 AI 产品和 compute control plane，后在 Mosaic Research 做研究基础设施、evaluation 与 compound AI system。这解释了 Kylon 为什么同时重视 runtime、proxy、权限和可观测的执行面。

### Ashton Teng

[[person.ashton-teng]] 是 2026-04-22 官方博客作者卡片中的 co-founder，之前与 Quinn 共同创办 Kepler AI。当前 LinkedIn headline 仍是 “AI x Bio Founder | PearX S25”，经历页未列 Kylon，Kylon 当前员工搜索也未出现他。因此正文保留“官方历史联合创始人”事实，但把当前 operating role 标为待确认。

### Christina Bowllan 与团队构成

[[person.christina-bowllan]] 自报 2026-04 起加入 Kylon founding team，此前在 TikTok Shop / ByteDance 做 GTM、战略合作与运营。LinkedIn 公司页显示 2-10 人，员工搜索总数 4、可见 3 人；这不是完整花名册，不能把 3 写成精确团队规模。

### 从 Kepler AI 到 Kylon：思想连续，法律连续未证实

2025 年两位创始人做的是垂直生命科学 Agent：连接生物数据、工具和知识图谱，充当 AI bioinformatician。采访中他们已经明确讨论公司上下文、Agent onboarding、employee onboarding、Devin / Claude Code，以及“组织运营本身为什么没有被 AI 加速”。

这条问题意识后来在 Kylon 变成横向产品：从生物研究上下文扩到整家公司，从 AI scientist 扩到多个职能 Agent，从特定 vertical workflow 扩到 workspace + gateway + proxy。

但目前没有可靠证据证明 Kepler AI 被正式改名、并入 Pure Reason Inc. 或作为同一法律实体延续。当前 `getkepler.ai` 还跳到另一类金融验证产品，也不能拿现网页反推历史。图谱只表达共享创始人与思想谱系，不建立 rename、acquisition 或 corporate succession 关系。

## 融资：三条边，两个归属

- **Kylon**：[[investor.leonis-capital|Leonis Capital]] 官方 portfolio 列出 Kylon，支持投资关系；轮次、金额、日期未披露，保持 medium confidence。
- **Kepler AI（历史）**：[[investor.pear-vc|Pear VC]] 管理合伙人官方帖将 Ashton 与 Quinn 的 Kepler AI 列为 PearX S25，建立 accelerator 边，不填金额。
- **Kepler AI（历史）**：[[investor.atria-ventures|Atria Ventures]] 投资人在同一帖中自称 co-investor，建立 medium confidence participant 边，不填轮次和金额。

Pear 与 Atria 的关系不能画到 Kylon 上。共享创始人不等于融资继承。

## 安全、数据和治理

![Kylon 官网披露的权限、审批、角色与训练边界](assets/kylon/trust-controls.png)

官网披露了 scoped permissions、sensitive action approval、role-based access 和 never train on your data。隐私政策进一步说明：

- 服务运营主体为 Delaware 的 Pure Reason Inc.；
- 可能处理消息、文件、表格、语音/音频和第三方 credentials；
- Clerk 负责认证，Composio 负责部分集成；
- 数据基础设施涉及 GCP、PostgreSQL/pgvector、GCS、Redis、TiDB Cloud；
- secrets 涉及 pgcrypto、Doppler / GCP Secret Manager；
- 删除 workspace 后主要数据 30 天内删除，backup 最长 90 天；session 90 天，analytics 12 个月，error log 30 天；
- subprocessor 列表覆盖多个模型、语音、工具、分析、支付与基础设施供应商。

官网写 “SOC 2 Type II in progress”，不能表述为已经通过。GDPR compliant 也是公司自述，本轮未审阅认证或外部审计报告。

## 分发与规模判断

截至 2026-07-15：

- Similarweb 对 kylon.io 的 H1 访问量、访客、时长、页数、跳出率、地域和渠道均为 N/A；
- Kylon X 约 7 个关注者、2 条帖子；
- LinkedIn 公司页约 33 个关注者，2-10 人；
- iOS App 只有 1 个评分；
- Product Hunt 未找到可核验页面；
- Reddit、Hacker News、微信精确检索未找到有效讨论。

npm 在 2026-06-16 至 07-15 返回 9,845 downloads，但同一时期存在约 150 个 prerelease 版本。这个数字可证明包被频繁安装，不能证明有 9,845 个用户，更不能与公司客户数等同。

因此规模判断是：**产品工程投入明显，公开采用仍处于极早期；当前主要信号来自官方产品与开发活动，而非用户、社区或流量。**

## 关键判断与风险

1. **产品方向有辨识度**：把本地 Agent runtime、公司上下文、协作界面与经济/权限控制面放在一起，比“AI teammate in chat”更完整。
2. **市场窗口尚未验证**：用户是否愿意迁移到新的工作空间，而不是让 Agent 进入 Slack/Teams，仍是最大 GTM 问题。
3. **注意力压缩是重要产品面**：多 Agent 系统最终会被 output density 反噬，Kylon 已把这点写进架构叙事，但需要真实使用验证。
4. **开放程度矛盾**：官方文章写 free trial，当前入口仍 waitlist；公开定价、活跃客户和可体验路径缺失。
5. **安全承诺仍在建设中**：SOC 2 只是 in progress，subprocessor 很多，跨模型/工具/语音的数据边界复杂。
6. **创始人状态有缺口**：Ashton 的官方 co-founder 身份有一手证据，但当前经营角色与法律/股权关系没有公开确认。

## 后续更新触发器

- waitlist 转公开 self-serve 或公布 pricing；
- SOC 2 Type II 完成并出现可核验 Trust Center；
- 公开付费客户、活跃 workspace、任务量、留存或案例；
- Quinn / Ashton 对当前团队和 Kepler → Kylon 谱系给出正式说明；
- Leonis 或公司披露 Kylon 轮次、金额与日期；
- CLI stable 版本推进、Gateway / Proxy 权限与 billing contract 变化；
- Reddit、HN、中文社区开始出现真实用户反馈。

## 证据边界

- S1：官网、博客、Docs、Privacy、Subprocessors、Terms；
- S2：Apple / npm 元数据、LinkedIn 人物与公司资料、Pear 官方管理合伙人帖、腾讯/Z Potentials 访谈；
- S3：第三方网站流量估算；
- S4：未登录 app smoke、社区无结果/误命中记录。

报告更新时间：2026-07-15。

## 证据索引

- 产品与架构：[[source.kylon.homepage-2026-07-15]]、[[source.kylon.docs-index-2026-07-15]]、[[source.kylon.docs-gateway-2026-07-15]]、[[source.kylon.docs-billing-2026-07-15]]
- 产品思想：[[source.kylon.why-built-2026-04-22]]、[[source.kylon.claude-tag-comparison-2026-07-13]]
- 安全与法律：[[source.kylon.privacy-2026-07-15]]、[[source.kylon.subprocessors-2026-07-02]]、[[source.kylon.terms-2026-07-15]]
- 发布与实现：[[source.apple.kylon-app-2026-07-15]]、[[source.npm.kylon-cli-metadata-2026-07-15]]、[[source.npm.kylon-cli-downloads-2026-07-15]]、[[source.github.kylon-org-2026-07-15]]、[[source.kylon.app-smoke-2026-07-15]]
- 团队与谱系：[[source.linkedin.kylon-company-2026-07-15]]、[[source.linkedin.kylon-employees-2026-07-15]]、[[source.linkedin.quinn-leng-2026-07-15]]、[[source.linkedin.ashton-teng-2026-07-15]]、[[source.linkedin.christina-bowllan-2026-07-15]]、[[source.tencent.kepler-interview-2025-09-18]]
- 投资：[[source.leonis.portfolio-2026-07-08]]、[[source.linkedin.pear-kepler-launch-2025]]
- 规模与社区：[[source.similarweb.kylon-2026-07-15]]、[[source.x.kylon-profile-2026-07-15]]、[[source.producthunt.kylon-search-2026-07-15]]、[[source.reddit.kylon-search-2026-07-15]]、[[source.hn.kylon-search-2026-07-15]]、[[source.wechat.kylon-search-2026-07-15]]
