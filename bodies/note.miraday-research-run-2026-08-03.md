# MiraDay 完整调研运行记录（2026-08-03）

## 任务

Owner 直接要求对 MiraDay 做完整调研。第一消费者为 CP，cutoff 为 2026-08-03。研究终点是 [[company.miraday]] 的 research-complete，不做发布、内容生产、外部触达或最终战略/投资判断。

## 方法

- 使用 Pinixc default profile 读取公开官网、Docs、Chrome Web Store、LinkedIn、Career International 官方站、arXiv、X、Reddit、Product Hunt 和搜索页；
- 没有注册或登录 MiraDay，没有提交候选人数据，没有执行触达；
- 产品状态按“已公开可验证 / coming soon / 未实测”分层；
- 公司关系按人员交叉任职、技术论文血缘、法律与资本关系分开；
- Traffic 交给 cici-traffic 独立执行，本 Agent 未重复采集 provider 数据。

## STOP 与限制

- Product Hunt 被 Cloudflare 验证阻断；Google 出现 429 / unusual traffic，停止继续搜索；
- Similarweb 报告入口 `ERR_CONNECTION_CLOSED`，Semrush 登录过期，均在报告前 STOP；
- SEC Form D 检索请求失败，未重试或切换身份；
- 竞争产品官网批量读取返回 `ERR_CONNECTION_CLOSED`，未把未核验的竞品细节写入正文；
- 未登录产品，所以端到端候选人搜索、团队协作、Credits、邮件、回退和审计只按公开文档表达。

## 完成证据

- 公司正文、两位核心人员、18 条来源与 4 张持久化截图已写入 Vault；
- 事实、厂商自述、推断、冲突与未知已分开；
- Traffic 不可用被保留为 access STOP，而非零流量；
- Career International 的规模数据没有归入 MiraDay。
