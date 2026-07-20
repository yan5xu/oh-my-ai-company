# Why automations die quietly

采集时间：2026-07-20。Viktor 官方博客，S1。

官方把 recurring task 定义为 standing instruction + schedule，并披露了一个重要内部审计：Viktor 自己的 workspace 有 236 个 standing routines，其中 53 个超过一个月没有产生输出，占 22%。常见原因包括 OAuth 过期、频道或文件夹改名、数据结构变化和上游依赖失效。

文章当前给出的处理方式：

- 在 task instruction 中要求失败时向 alert channel 发消息；
- 另建 heartbeat，检查应有产出是否出现；
- 每月列出 routine、schedule、data source 和 last successful run 做人工审计。

研究判断：这证明 scheduled workflow 已进入真实运营，也直接证明 silent failure 是现存问题。文章没有证明原生自动 retry、backoff、incident management、补偿事务或通用 rollback；当前治理更像 operator-authored monitoring。

关联：[[company.viktor]]。
