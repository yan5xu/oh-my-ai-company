# Clink 官方 GitHub Skills 与 CLI 实测

官方组织：<https://github.com/clinkbillcom>

## 仓库

- `openclaw-payment-skills`：2026-03-09 创建，钱包、绑卡、充值、退款、自动充值、风险规则；3 stars。
- `clink-integ-skills`：2026-04-09 创建，让 coding agent 完成商品目录、Checkout、订阅、Webhook 与 sandbox 验证；5 stars、3 forks。
- `agentic-payment-skills`：2026-04-16 创建，Claude Code/Agent 的支付、VIC 授权、UCP checkout、异步事件与风险规则；1 star、1 fork。

## 实测

下载 `clink-integ-skills` 后执行 `npm test`：

- 99 CLI bundle checks
- 453 structure checks
- 121 behavior checks
- 40 decision checks
- 13 docs gate checks
- 233 runtime checks
- 11 contract checks

全部通过。内置 CLI 可列出 catalog、checkout、subscription、webhook、refund、doctor 与 smoke-test 等命令；无 API key 时只能验证离线结构与配置，不能完成真实支付。

## 判断

代码证明 [[company.clink]] 的 coding-agent integration 不是纯营销；但 stars/forks 很低，不能证明广泛采用。Git 历史主要贡献者包括 Dylan Liu 与 `zht/HaotianZhangClink`，不据此推断完整雇佣关系。
