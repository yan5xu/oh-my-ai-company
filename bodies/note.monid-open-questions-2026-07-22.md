# Monid 待验证问题

1. Terms 为什么禁止 automated use / buying agent？是否有专门针对 Agent workflow 的新版条款或书面授权？
2. `$1` free credit 是否自动到账？是否需要绑卡？不同 provider 的 markup、最低扣费和 per-result billing 如何显示？
3. run 返回 partial result、provider 4xx/5xx、timeout、retry 时，什么算 “delivers results”？自动零扣费还是人工 refund？
4. API key 能否按 workspace/agent 隔离？是否支持 scoped keys、rotation、budget alerts、hard limits、audit export？
5. provider credentials 由 Monid 持有时，数据许可、DPA、subprocessor、删除请求和 downstream liability 如何处理？
6. provider 目录中同类 endpoint 的 routing 有无质量、延迟、成功率和价格 benchmark？
7. OAuth/direct/proxy integration 的生产客户、审核流程和 SLA 是否存在？
8. TikHub 占 endpoint 66.7% 时，产品对单一 provider 中断和政策变化的韧性如何？
9. 公开 status API uptime 99.622% 的窗口是什么？是否有 incident archive？
10. 是否有独立付费客户案例、repeat top-up、paid run volume、retention 或 gross margin 证据？
