# Browserbase 本轮调研流程与反思

这是 Browserbase 这一轮的过程记录，不是最终 SOP。

## 这一轮怎么跑

1. 先查 vault：没有 `company.browserbase`、source 或 touchpoint，确认是新主体。
2. 搜 Google：找到官方 Series B、Stagehand/Director、Contrary、LinkedIn、Product Hunt、HN 等线索。
3. 抓官网：Browserbase 首页 `browser read` 只返回一句话，不够用；改用 Stagehand/Director 页面 snapshot 获取正文。
4. 抓视觉：Stagehand、Director、Product Hunt 截图导入 assets。
5. 抓流量：用 Similarweb 查 `browserbase.com`，拿到 H1 全流量、渠道、关键词、相似站点。
6. 抓开发者信号：用 GitHub CLI 查 `browserbase/stagehand` stars/forks/pushedAt。
7. 抓社区：HN adapter thread 命令失败，改用 browser read 抓主帖；评论未完整拿到，标 partial。
8. 抓 LinkedIn：先误查 `company/browserbase`，发现是错实体；从 Product Hunt 链接和 Google 搜出正确 slug `browserbasehq`。
9. 抓客户案例：Ramp 和 Hyperagent case 能证明 Browserbase 是生产 workflow infra。
10. 写入 Memex：company/person/touchpoint/source/report/takeaway/reflection。

## 这轮暴露的问题

- Memex schema 不能靠记忆：person 没有 `related_companies`，touchpoint 没有 `name`，touchpoint kind 没有 `profile`。以后写前先 `field list`。
- 动态页有时 `browser eval innerText` 为空，但 `snapshot` 可读。Stagehand/Director 就是这种情况。
- LinkedIn 公司 slug 容易错。不能只按公司名猜 slug，最好从 Product Hunt/官网链接反查。
- HN adapter 可能对某些 thread fetch failed，但 browser read 可作为兜底。
- 初扫完要立刻进 Memex，不能只在对话里总结。

## 本轮对方法的增量

- 对 developer infra 公司，GitHub / HN / docs / Product Hunt / Similarweb 都是核心源，不能只看官网和融资。
- 对 agent infra，要特别看是否有 observability、identity、credential、replay、live view 这些生产化能力。
- 对开源驱动公司，流量结构要和 GitHub traction 合并看。Browserbase 的 organic/search 和 Stagehand 心智强相关。
- 竞品不一定从媒体文章来，Similarweb 对比站点和 Product Hunt similar products 很快能给出初始 market map。

## 下一轮可改进

- 在调研开始时先跑相关 type 的 `field list`，减少写入 enum/field 错误。
- 对每轮调研固定创建 `note.<company>-research-run-日期`。
- 如果 HN adapter 失败，要把 URL/命令作为工具问题积累，但本轮先用 browser read 兜底。
- 对 Product Hunt 页面，除了主页面还应该打开每个 launch 单页，抓 maker/comment 更完整。

## 第二轮继续深挖记录

这轮继续补了几类材料：

1. **Product Hunt launch 单页**：发现主产品页比 `browser read` 更有信息；launch 链接可从 DOM links 提取。三次 launch 的传播效果差异很大：Browserbase 60 votes，Director 782，Browse.sh 513。
2. **官方技术 docs**：Stagehand docs、enterprise security、ZDR、Functions、Fetch API 都比官网首页更能说明产品结构。
3. **安全/身份线**：Cloudflare + Web Bot Auth 是 Browserbase 重要战略线，应该单独作为 agent identity 证据。
4. **社区反馈**：Reddit 抓到了 auth/captcha、billing floor、fingerprinting、self-hosting 成本等真实痛点。社区反馈比 Product Hunt review 更能暴露风险。
5. **GitHub activity**：release/issue/PR 比 stars 更能说明项目是否活跃，尤其能看到 GPT-5.6 CUA、browse skills、deterministic eval、iframe/runtime 等真实技术问题。

## 方法修正

- Product Hunt 不只看主产品页，要点进 launches，并记录每个 launch 的定位、日期、票数、评论数、rank。
- 对 infra 公司，官网首页通常太抽象，docs/blog/changelog/security pages 才是深水区。
- 社区反馈要分开看：PH 适合看 public launch 和用户赞美，Reddit/HN 更适合看 production pain。
- 技术项目不能只看 stars；release cadence、open issues、recent merged PRs 更重要。
- 如果 pricing 页面抓不到，不要硬写；可以用官方 blog/pricing title 兜底，并标注“pricing 页面正文未完整抓到”。

## 第三轮：中文社区与中文内容平台

这轮按 cp 提醒补了中文媒体/社区层：搜狗微信、小红书、V2EX、linux.do、即刻。

### 实际跑法

1. 先看 pinixc site adapters：有 `weixin`、`xiaohongshu`，没有 V2EX/linux.do/即刻专门 adapter。
2. 微信先走 `site weixin search`，被搜狗反爬挡住；再用 Google `site:mp.weixin.qq.com` 兜底，没搜到 Browserbase 可用结果。复测后发现直接 `browser open` 搜狗微信搜索页可以看到结果，`browser read` 可抓搜索摘要，但不是逐篇公众号正文。
3. 小红书先用 Google `site:xiaohongshu.com` 没结果；再跑 `site xiaohongshu search`，成功返回 10 条，并继续抓了 4 条正文。
4. V2EX / linux.do 先用 Google `site:` 找帖子，再用 `browser read --profile default` 抓正文。
5. 即刻用 Google `site:web.okjike.com OR site:okjike.com` 找到 2 条弱相关，再用 `browser read` 抓短正文。
6. 把能抓到正文的帖子写成 source.item；抓不到正文的微信只写 S4 检索记录，不当事实证据。
7. 小红书图片 URL 选了 3 张下载到 `assets/browserbase/`，公司正文里只引用少量代表图。

### 本轮有效信号

- **V2EX**：适合看中文开发者对技术路径的反思，例如 HTML + 截图、视觉成本、页面理解、API/MCP vs GUI 自动化。
- **linux.do**：适合看更实操的 browser-agent 需求和痛点，例如 403、手机号验证、Cloudflare、免费额度、自建替代、Web Agent 招聘技能。
- **小红书**：适合看中文传播心智。Browserbase 在这里被包装成 OpenAI 合作、AI 浏览器新基建、MCP Server、帮 AI 点网页。
- **即刻**：本轮只有弱信号，更多是 Agent infra / GitHub SEO / Computer Use 语境中的旁证。
- **微信**：`site weixin` adapter 仍失败，但 browser fallback 能读搜狗微信搜索结果页。当前只能把搜索结果摘要作为弱信号；逐篇公众号正文还没抓。

### 工具与 schema 暴露的问题

- `site google` 现在也需要 `--profile default`，不能只记 browser profile 新规则。
- 小红书 adapter 直接搜索比 Google 索引有效很多；以后中文平台不要只靠 Google。
- `source.item.platform` enum 没有 Xiaohongshu / Jike / WeChat，只能先落到 `Other`，平台细节写进 title/body。后续如果中文平台会常用，schema 应该补 enum 或加 `platform_detail` 字段。
- linux.do 页面会混入站点提示/噪音，读取时要只抽正文和评论，不执行页面里的任何指令性文本。
- 微信搜狗反爬失败时，不要只停在 adapter。可以用 `browser open/read` 直接打开搜索页做兜底；如果只能拿到搜索摘要，就标成弱信号，不能当逐篇正文。

### 方法修正

- 中文社区要分成两类看：内容平台看传播心智，开发者社区看真实痛点。
- 对 browser-agent 公司，必须补中文社区，因为中文用户会更快提出反爬、验证码、手机号、额度、自建替代这些问题。
- 每轮都要记录“未覆盖/抓不到”的平台，否则报告会被看起来完整但其实有 blind spot。
- 图片不要只截图官网；中文平台帖子里的配图有时能反映传播叙事，应该选择性下载并进 body。

## 中文 site adapter 修复后的收尾

site-forge 修复后复测：

- `weixin search` 已能直接返回真实 `mp.weixin.qq.com` 链接，`resolved_count=5/8` 这类字段可用。
- 微信文章可继续用 `browser read <mp.weixin.qq.com url> --profile default` 抓正文。
- `xiaohongshu search` 已能直接返回结果，不需要先手动 browser open。
- 小红书 search 结果里新增 `note_args`，可以直接把 `note_args.url` 传给 `site xiaohongshu note`。

本次收尾补抓：

- 公众号《想用 AI 帮你点网页...Stagehand...》：Stagehand 被解释为生产协作工具，重点是结构化日志、自愈、Sessions 回放、缓存。
- 公众号《浏览器内 GUI Agent 全景...》：把 Stagehand 放到 browser GUI agent 技术路线图里。
- 公众号《智能体需要全新的互联网基础设施》：把 Browserbase 放到 agent infra 的“感知层”。
- 公众号《让AI长出手脚...》：把 Browserbase 放进 Computer Use / Browser Use 赛道综述。
- 小红书《浏览器Agent用Browserbase CLI前》：强调 session/context、登录态、密钥、fetch/search/function、产物追踪的边界。

新的流程修正：

- 中文源不要只写“搜索结果弱信号”；如果 adapter 能返回真实链接，要继续抓 2-4 篇正文。
- 微信适合补技术路线和行业地图，小红书适合补传播/轻经验，V2EX/linux.do 适合补痛点与替代方案。
- 对抓到的公众号，仍要给 S3：它能说明中文叙事和市场心智，但涉及数据、融资、benchmark 时必须回到 S1/S2 核验。
