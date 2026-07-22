# Monid 本轮调研流程与反思

本轮按 [[method.product-research-workflow-v0]] 与 [[note.method.research-three-layer-framework-2026-07-09]] 执行，不把 Traffic receipt 当完整公司调研。

## 本轮怎么展开

1. **Vault 去重与 schema**：先确认没有 Monid company/source/note；`status clean`、`issues=0`，再读 company/person/source/note/traffic 字段。
2. **搭主体骨架**：确认 `company.monid`、两位联合创始人、官网、Docs、X、LinkedIn、GitHub、Product Hunt、status touchpoints。
3. **产品面拆层**：把 discover、inspect、run、wallet、x402、Skill/MCP/CLI/API 和 product integration 分开，不用首页一句话替代 contract。
4. **供给结构审计**：用公开 API 读取 24 providers / 2,143 endpoints，并计算 TikHub 66.7%、top-4 88.9%，避免把 endpoint 数写成 vendor 数。
5. **账号实测**：在用户授权的 `pinixc browser` default profile 中选择 Codex、进入注册、点击 Google；Cloudflare 人机验证出现后 STOP 自动操作，等待用户手动完成。
6. **团队与创始人**：登录态 LinkedIn + Shengkun 个人站；把自述、profile 与搜索摘要分开。
7. **GTM 证据**：读取官方 X profile 和 Shengkun 的 Akta private-market demo；views/likes 只作为传播信号。
8. **代码与 docs**：GitHub repo、raw package、Docs `llms.txt`；GitHub API 因 rate limit 失败后不制造 stars/forks/commit 数。
9. **法务/安全反查**：Terms、Privacy、status、RDAP；识别 automated use/buying agent 冲突与隐私模板占位符。
10. **Traffic 子交付**：由 cici-traffic 采集 Monid standalone 和 Pipedream/Composio/Arcade same-scope benchmark；Research 决定进入时点、对象、scope、字段和禁止推断，消费后做业务解释。
11. **资产化**：company/person/touchpoint/source/traffic/note/concept + 关键截图；保留 CF、PH、Semrush、GitHub API 等失败。

## 关键工具路径

- `pinixc browser open/read/snapshot/screenshot/eval`：动态页、登录态、X/LinkedIn、Docs、API JSON、视觉证据。
- 官方公开 API：catalog stats/providers、RDAP、raw GitHub package。
- Similarweb：Traffic receipt 独立 scope/QA；Research 不重复例行采集。
- Memex CLI：schema query、upsert/source add、asset import、body refresh、issues/graph。

## 本轮有效的方法增量

### 1. Marketplace 必须做供给集中度

目录总数是最容易被营销放大的数字。对 API/tool marketplace，至少记录 provider count、endpoint count、最大 provider share、top-N share，并区分 endpoint、provider、integration、action。

### 2. Agent-first onboarding 要做 contract contradiction audit

如果产品明确鼓励 Agent 自动调用和购买，Terms 仍禁止 automated use / buying agent，这不是通用法律噪音，而是核心 workflow 冲突。以后对 agent payment/action 产品，必须把 marketing behavior 与 Terms prohibited activities 逐项对照。

### 3. Browser 实测的 STOP 也应资产化

Cloudflare 验证不是“什么都没做成”。它证明注册入口、auth providers 与风险控制存在，也明确了自动化不能越过的边界。截图和 partial source 比口头说“注册不了”更可复核。

### 4. Traffic 进入由 Research 缺口决定

Research 负责实体、业务问题、消费者、完成边界和禁止推断；需要 provider evidence 时再给 Traffic 最小 contract。Traffic 进入后独立完成 scope、采集和机械 QA，Research 不例行重复采集，而是在 receipt 回流后做采用/GTM/竞争解释。

## 失败与边界

- Product Hunt 直达页被 Cloudflare 阻断，只保留 S4 metadata；不复用未重新验证的 votes/rank。
- GitHub API rate limit；repo 页面与 raw package 可读，但不写未知 stars/forks/commits。
- Semrush provider code 3；按 unavailable STOP，不写 no-data。
- Monid signup Cloudflare 验证需用户手动完成；在完成前不声称 `$1` credit 或真实 run 已验证。
- screenshots 只覆盖关键 claim、scope、注册状态、冲突和 UI；普通导航不为凑数量截图。

## 下一步

完成 Cloudflare/Google auth 后，用 free credit 做一个低风险、非敏感、少量结果的 endpoint：先 discover，再 inspect 价格/schema，再 run；记录起止余额、budget、run status、结果 provenance、billing 与失败语义。若需要充值或付费计划则 STOP。
