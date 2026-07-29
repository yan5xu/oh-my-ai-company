# Composio updated pricing page snapshot

Collected at：2026-07-29（Asia/Shanghai）

URL：<https://composio.dev/updated-pricing>

## 生效与过渡

- 页面明确写明新价格于 2026-08-15 生效。
- 既有客户及 2026-08-15 前购买现行套餐的客户，可保留当前套餐和额度至
  2026-12-31。

## 基础套餐

- Free：$0，20K Tool Calls/月、20K Trigger Events/月、Unlimited Connected
  Accounts、3 Team Members。
- Pro：$29/月，50K Tool Calls/月、50K Trigger Events/月、Unlimited Connected
  Accounts、Unlimited Team Members。
- Business：$599/月，Everything in Pro、IP Allowlist、Slack Support、Higher
  Rate Limits。
- Enterprise：Custom，VPC、Enhanced Security & Compliance、Custom
  Integrations、Dedicated Support。

## 资源额度和超额

- Tool Calls：Free 20K，Pro + Business 50K；超额 $4/1K，通过 Sessions
  执行时 $3/1K。
- Trigger Events：Free 20K，Pro + Business 50K；超额 $1/1K。
- LLM Tokens：Free 1M，Pro + Business 3M；超额 $3.75/M。
- Premium Tools Credit：Free $2，Pro + Business $5；超出后按工具变动价格。
- Sandbox：Free 10 GB-hour，Pro + Business 50 GB-hour；超额
  $0.50/GB-hour。
- Filesystem Storage：Free 1 GB，Pro + Business 10 GB；超额 $0.05/GB。

## 功能分层

- 1000+ Toolkits、OAuth Management、Triggers、Sessions：各套餐均包含。
- Custom Tools & MCP、White-labeling：Pro 起。
- Self-managed Credentials、Higher API Rate Limits、Read-only Dashboard
  Role、IP Allowlist：Business 起。
- DPA：Business 为 $500/月附加项，Enterprise 包含。
- VPC/Self-hosting、Custom Integrations、Premium Support：Enterprise。
- Log Retention：Free 7 天、Pro 30 天、Business 90 天、Enterprise 定制。
- Payload Retention：Free 保留；Pro/Business 可 opt-out；Enterprise 可提供 ZDR。

## 计费 FAQ

- Free 为硬上限，到达后暂停到下月或升级。
- Connected Accounts 不收费且不限数量。
- 失败的 Tool Calls 不计费。
- Proxy/raw API 请求按普通执行计费。
- Meta Tool 本身不计 Tool Call；由 Meta Tool 发起的实际 Tool 执行计费。
- 每个 Trigger 交付项计一个 Trigger Event，可通过 Filter 降低事件量。
- Premium Tool 在普通 Tool Call 之外增加对应 surcharge。
- 创建 Session 不收费；Session 调用超额价格更低。
- FOR YOU 个人使用不计入 PLATFORM Usage Limits。

## 证据边界

本来源是 2026-07-29 公开预告，不代表已经在当日对所有账户生效。正式生效后仍需重新
核验 Dashboard 实际套餐、账单和计量行为。
