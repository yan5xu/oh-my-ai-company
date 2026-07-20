# How to run security due diligence on an AI employee

采集时间：2026-07-20。Viktor 官方博客，S1。

文章称凭据由基础设施注入，模型本身不直接看到 token；offboarding 应包括断开 integration、暂停用户和停止 scheduled task。官方合规口径包括 SOC 2 Type I，Type II 仍在进行中。

证据边界：这是供应商安全说明，不等于采购方完成了 penetration test、权限验收或审计复核。断开、暂停和删除是 stop/reset control，不是对已发生外部副作用的 rollback。

关联：[[company.viktor]]。
