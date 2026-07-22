# Monid

> **一句话**：Monid 是一个面向 AI Agent 的工具与数据 API broker：Agent 通过同一套 Skill、MCP、CLI 或 HTTP 接口，在运行时 discover、inspect、run 第三方端点，并从统一余额或 x402 钱包按次付款。

![Monid homepage](../assets/monid/homepage-2026-07-22.png)

## TL;DR

Monid 解决的是一个真实但窄的基础设施问题：Agent 为了一次研究、抓取或 enrichment 调用，不必逐家注册供应商、保管 API key、管理最低消费和账单。它把 **运行时发现 + 统一认证/钱包 + 按调用结算 + provider routing** 合成一层，当前公开目录为 2,143 个 endpoints、24 个 providers。[[source.monid.public-api-catalog-2026-07-22]]

产品并非纯 landing-page 概念：公开 API 能列出目录；Docs 给出 discover / inspect / run / runs / wallet，支持 Skill、MCP、CLI、HTTP 和 x402；GitHub 有公开 TypeScript CLI 与 12 个 releases。[[source.monid.docs-2026-07-22]] [[source.github.monid-cli-2026-07-22]]

但供给规模不能只看总 endpoint 数。TikHub 一家占 1,429/2,143（约 66.7%），前四家合计约 88.9%；大量 endpoint 来自社交抓取与长尾数据供应。Monid 目前更像早期的 **agent-native paid data exchange / broker**，还不是覆盖主流 SaaS 用户授权、复杂 action workflow 与企业治理的通用工具层。

商业模式透明：底层 provider 价格上加 10%，无订阅和最低消费；失败请求官方声称不收费，误扣可联系客服退款。若 10% markup 是主要收入，按终端支付额换算，平台收入约占终端金额 9.1%，尚需承担支付、失败、支持与路由成本。[[source.monid.homepage-2026-07-22]]

## 产品结构

| 层 | 当前公开能力 | 证据边界 |
| --- | --- | --- |
| Discover | 用自然语言搜索并按 fit / price 找 endpoint | Docs/API 可验证；排序质量未系统 benchmark |
| Inspect | 返回 schema、定价与 endpoint 详情 | Docs 可验证；真实 schema coverage 待登录实测 |
| Run | 统一执行第三方 endpoint | Docs/API/CLI 表面可验证；生产成功率和退款闭环未验证 |
| Wallet | prepaid balance、活动记录、budget 页面 | UI 可见；本轮注册被 Cloudflare 人机验证阻断，尚未验证账务准确性 |
| x402 | 使用 USDC 按 run 支付，支持 Base / Monad | 官方 Docs；未做链上支付实测 |
| Integration | Skill、remote MCP、CLI、HTTP、OAuth、direct/proxy | 官方 Docs；企业级 auth/governance 深度未知 |

## 供给结构

2026-07-22 公开 API 返回 24 个 providers、2,143 endpoints。最大四家为 TikHub 1,429、Strale 269、BlockRun 112、Semrush 96；随后是 DefiLlama 44、Apify 41、Kadec 36、Heurist Mesh 35。[[source.monid.public-api-catalog-2026-07-22]]

这说明 Monid 当前优势不是“每个品类都有很多独立供应商”，而是把少量大目录与一批 x402/数据供应商统一成可被 Agent 动态采购的 registry。它的供给集中度高，单一 provider 质量、合规和可用性会显著影响总体体验。

![Monid tools catalog](../assets/monid/tools-catalog-2026-07-22.png)

## 团队与公司

公开 LinkedIn 把公司标为 2026 年成立、San Francisco、2-10 人；2026-07-22 页面显示 169 followers。联合创始人为 [[person.shengkun-ye]] 与 [[person.feiyou-guo]]。[[source.linkedin.monid-company-2026-07-22]]

Shengkun 的履历与产品切入点高度相关：他公开称曾在 TabaPay 负责 payments risk，并构建 real-time monitoring 产品。Feiyou 的公开 LinkedIn 列出 Founders, Inc. 与 University of Washington。本轮没有找到已公开、可独立核验的机构融资轮；不要把 Founders, Inc. 经历或 demo-day 露出直接写成融资关系。

## GTM 与公开势能

- 官网采用强 agent-first onboarding：不是先展示 dashboard，而是要求把远程 `SKILL.md` 发给 Agent。
- Product Hunt 搜索可确认产品页与 “OpenRouter for agent tools” 定位，但直达页被 Cloudflare 阻断，本轮只保留 metadata-only，不把票数和排名当强证据。[[source.producthunt.monid-search-2026-07-22]]
- 官方 X 在 2026-07-22 显示 2,178 followers、77 posts，加入时间为 2026 年 3 月；相较 LinkedIn 的 169 followers，当前传播更偏创始人/X 驱动。[[source.x.monid-profile-2026-07-22]]
- Shengkun 的 private-market demo 帖以 “killed PitchBook” 定位 Akta × Monid，展示 `$0.125/request` 对比 `$25k/seat/year`，当前页面显示约 58.8 万 views。它证明传播能力与明确 wedge，不证明 Monid 已替代 PitchBook 或形成广泛付费采用。[[source.x.shengkun-private-market-demo-2026-07-14]]

## 实测状态

本轮按产品 onboarding 在 `pinixc browser` default profile 中选择 Codex、进入注册。账号创建页支持 GitHub、Google、email；点击 Google 后触发 Cloudflare “Verify you are human”，随后页面明确报 CAPTCHA 在当前浏览器/扩展环境中加载失败。本轮没有关闭扩展、换浏览器或脚本绕过。[[source.monid.app-onboarding-2026-07-22]]

![Monid signup](../assets/monid/app-signup-2026-07-22.png)

因此当前可确认的是：公开目录、Docs、API contract、CLI repo 和注册入口真实存在；**免费 `$1` credit、API key、budget、真实 run、扣费/失败不扣费/退款闭环因 CAPTCHA 兼容性阻断，尚未完成账户内验证**。

## 流量与外部注意力

[[traffic.similarweb.monid-2026-h1]] 记录了 Jan-Jun 2026、Worldwide、All Traffic、root-only 的第三方估算。Displayed total 为 21,762，monthly visits card 为 5,192；月线却只有 Apr-Jun 非零，六点合计 15,576.9，最新 MoM 与 displayed change 也不一致。所有冲突均保留，不能挑一个当真值。

同 scope benchmark 中，Monid 的 monthly card 5,192，Arcade 22,543，Pipedream 378,780，Composio 496,433。这个比较只能说明 provider 观测下的网站 Web footprint 量级，不等于市场份额、采用、客户、收入或产品质量。

## 竞品与相邻

- **直接/近邻 broker**：[[company.sapiom]]、[[company.anyway]]、[[company.nevermined]]、[[company.skyfire]]。重叠在统一 key、能力访问、计量、钱包与 agent 支付；各自向 runtime、identity、merchant/settlement、governance 延伸。
- **action integration**：Pipedream、Composio、Arcade。它们更偏 SaaS integrations、user auth、actions/events 与 permissioned execution，不等同于 Monid 的 paid data marketplace。
- **API marketplace**：RapidAPI。供给市场类似，但不是围绕 Agent runtime discovery、wallet 与 per-run execution 设计。
- **直接签 provider**：高频、稳定、合规敏感的客户可直接签供应商，避免 10% markup 与平台中间层。

详细边界见 [[note.monid-competitor-map-2026-07-22]]。

## 风险与待验证

1. **供给集中**：TikHub 占 endpoint 总数约三分之二，总数不等于多供应商冗余。
2. **法务模板冲突**：Terms 同时禁止 automated use、购买代理和自动创建账号，而产品正面向 Agent 自动发现/购买；这需要正式澄清。[[source.monid.terms-2026-07-22]]
3. **治理与企业能力缺口**：未见公开 SOC 2、DPA、subprocessor list、SSO/RBAC、audit log、data residency 或 enterprise SLA。
4. **第三方数据合规**：社交抓取、people/company enrichment 和聚合数据的来源、许可、删除请求与 downstream liability 需逐 provider 核验。
5. **账务与失败语义**：官方 FAQ 声称 only charge on delivered results，但 retry、partial result、metered result、provider timeout 与人工 refund 的边界尚未实测。
6. **早期公司风险**：域名注册于 2026-03-13；公开公司和产品历史很短。[[source.monid.rdap-2026-07-22]]
7. **状态页证据短**：当前状态页显示在线及 API 99.622% uptime，但未显示明确统计窗口和完整 incident history。[[source.monid.status-2026-07-22]]

## 判断

Monid 最有价值的不是再做一个静态 API marketplace，而是把 endpoint discovery、pricing 与 payment 放进 Agent 的运行时决策。这个模式适合低频、突发、长尾、跨供应商的 paid data calls；在这些任务里，10% markup 可能低于集成、开户与最低消费成本。

它目前还不能被判断成通用 “agent tool layer”。如果任务需要用户 OAuth、可逆 actions、复杂权限、审计和 SLA，Composio/Pipedream/Arcade 一类产品的控制面更成熟；如果调用高频稳定，直接 provider 关系更经济。Monid 是否能形成防御性，取决于 provider distribution、路由/质量数据、失败恢复、wallet/spend controls，以及是否能把早期的 X-driven demand 变成可复购调用。

核心判断：[[note.monid-product-takeaway-2026-07-22]]；研究过程：[[note.monid-research-run-2026-07-22]]。
