# Viktor runtime、浏览器与审计边界

采集时间：2026-07-20。Viktor 官方对比文章，S1。

文章称：

- Viktor 拥有隔离、持久的云端工作环境；
- API integrations 是 recurring、结构化企业工作的主要执行路径；
- browser tasks 可以执行，但不是产品最主要的稳定路径；
- per-workspace audit log 记录 triggering prompt、tool call 和 integration；
- meaningful/high-risk action 采用 review-first。

研究边界：能确认官方产品设计包含 runtime、browser 和 audit，但本轮没有账号内复现 browser 成功率、验证码/页面漂移处理、retry/backoff、rollback 或审计日志完整性。

关联：[[company.viktor]]。
