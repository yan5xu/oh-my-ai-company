# Why your AI employee cannot access a tool

采集时间：2026-07-20。Viktor 官方博客，S1。

文章把工具访问拆成四道门：

1. integration 是否连接；
2. Viktor 是否属于目标频道；
3. integration 是否具有 read/write 权限；
4. data scope 是否覆盖目标对象。

常见失败包括 expired connection、wrong channel、read-only scope 和 scoped data slice。官方建议直接询问 Viktor 当前能读取和修改什么，并在外部系统检查连接范围。

研究价值：这比“支持 3,200+ integrations”更接近真实权限模型，也说明 connected 不等于 authorized，authorized 不等于能完成目标动作。

关联：[[company.viktor]]。
