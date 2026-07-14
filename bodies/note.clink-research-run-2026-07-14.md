# Clink 调研过程与反思 2026-07-14

## 本轮怎么跑

1. 先消歧：确认对象是 `clinkbill.com`，不是同名 `clinkpay.xyz` 或 crypto 项目。
2. 官网、Clink for Claw、Terms、Docs index、Agent Payment API、Skill Marketplace、GitHub 三个仓库并行读取。
3. 点击真实 CTA，确认注册进入 UAT 且需要邀请码；无凭证时停止，不伪造产品体验。
4. 读创始人专访、中文公测、两次公司新闻稿、香港公司注册处，重建 2025-2026 时间线。
5. 扫 LinkedIn、X、小红书、微信、Reddit、HN、PH、V2EX、Linux.do、即刻，区分官方传播与独立反馈。
6. 流量先看主域，发现总访问与参与度严重冲突；切换 Include Subdomains 后解释差异，再从 Highcharts 对象提取月度点位。
7. 下载官网原图、文档配图和平台素材，保留注册与流量截图。
8. 将事实、判断、冲突与待验证项分别写入 company/source/note/concept/investment/traffic/touchpoint。

## 本轮有效的方法

- **支付产品必须读合同**：Terms 比首页更准确地暴露 MoR、费率结构、FX、payout、Reserve、拒付和责任边界。
- **API infra 必须含子域**：marketing root 很小，但 app/checkout/docs 子域可能承载真实使用；主域和全产品网络要分别判断。
- **流量冲突先找口径，不急着判数据错**：本轮 32 visits 与 64,617 的冲突来自 includeSubdomains 开关。读取 Highcharts series 得到 938/768/4,179/10,894/17,829/30,009 的精确序列。
- **公开访问必须点 CTA**：新闻稿说 public access，产品入口仍要求邀请码，实际 onboarding 比发布语言更保守。
- **Repo 要运行，不只数 stars**：官方集成 Skill 测试全过，证明工程完整度；stars 仍用于限制 adoption 结论。
- **Referral 要做交易语义解释**：AI 工具站点到 Clink 再回跳，比媒体 referral 更像 checkout；仍不能直接写成客户或 GMV。

## 失败与边界

- 无邀请码，无法完成开户、KYC、绑卡、3DS、Agent 支付、退款与结算。
- 没有找到公开 Fee Schedule、PCI AoC、Visa 官方点名或投资方正式公告。
- Marketplace 的公开路径不可验证，只有文档、截图与仓库。
- 社区讨论接近空白，不能做用户满意度判断。
- LinkedIn people 只能看到部分成员；Ning Gao 的结果需要人工识别为生态伙伴，避免误计团队。

## 对方法的增量

本轮补入 [[method.product-research-workflow-v0]] 的四个动作：支付/金融产品做 operating contract audit；API/checkout 产品做 root vs subdomain traffic audit；所有“open/public”声明做 CTA onboarding smoke；Referral graph 区分媒体流量、商户回跳与产品调用。

产品判断：[[note.clink-product-takeaway-2026-07-14]]；主体：[[company.clink]]。
