# Viktor 未登录产品入口 smoke

时间：2026-07-20。浏览器真实打开，S4 边界证据。

结果：

- `app.viktor.com/signup` 可打开，提供 Slack 或 Microsoft Teams 授权注册；
- `app.viktor.com/login` 跳转到 signin 页面，同样只提供 Slack 或 Teams；
- 当前浏览器 profile 没有 Viktor 工作区登录态；
- 未执行授权，也未创建或修改外部 workspace。

因此本轮不能把 memory、skills、scheduled tasks、usage、audit 和 integration settings 写成账号内实测。正文仅引用公开文档、官方运行披露、客户侧材料和未登录边界。

截图：![Viktor 登录入口](assets/viktor/signin-gate.png)

关联：[[company.viktor]]。
