# Lindy 调研过程记录：双层产品与资本继承

## 本轮实际路径

从 AI employee 主流产品缺口进入，先查当前官网和 pricing，发现前台已经变成 executive assistant；再读完整 docs，确认 Custom Agents、Computer Use、Evals、Memory、HITL、Observability 并未消失。随后按 release/blog 重建 2023–2026 演化，沿创始人访谈反查 Teamflow，再用官方融资公告和投资人 portfolio 校正资本主体。最后补 Product Hunt/HN、Reddit、微信、小红书、LinkedIn/X 与 2026 H1 网站流量。[[company.lindy]]

## 本轮新增的方法动作

1. **前台定位与底层能力分开读。** 首页回答当前卖什么，docs 回答底层还能做什么；只看其中之一会把双层产品误写成 pivot 或功能堆叠。
2. **转向公司先做资本连续性。** 发现 rebrand/pivot 后，融资必须回到历史主体、原公告和 portfolio；不把公司累计融资重写为新产品融资。
3. **外部副作用单独审计。** 对能发邮件、建会议、付款或改记录的 Agent，固定检查授权来源、独立 validator、HITL、豁免路径、审计和 eval，而不是只看 tool count。
4. **模型迁移追真实质量链。** 不只记录换了哪个模型，还看 offline eval、small rollout、retention、回滚和成本；离线通过不等于线上可用。
5. **重复 launch 作为发行序列。** Product Hunt 不只记一次榜单，而是看每个新包装如何改 Elevator Pitch，并与流量和渠道变化对照。
6. **集成数量追供应链。** 通过 Pipedream 案例确认 connector 广度有外部供应，避免把 6000+ 直接写成全自研能力。

## 失败与纠偏

- Web App 进入登录页，本轮没有创建账号，因此只记录 auth boundary，不声称体验过真实 task。
- YouTube 视频存在英文自动字幕，但本机没有 yt-dlp，当前 site 也没有 transcript；页面时间戳只能作为 metadata，不能冒充完整转录。已把能力缺口交给 site-forge。
- Trust Center 连接关闭，安全结论只来自官方 security/docs 页面，不声称审阅过审计材料。
- Similarweb 月线合计与顶卡 total 冲突，保留两套原始口径，不挑一个“看起来更对”的数字。
- 小红书正文能抓到，但主要价值在图片；未 OCR 的图不进入事实结论。
- Product Hunt review 只有 7 条，Reddit 也只是少量线程；全部降为社区弱证据。

## 对前几轮方法的修正

Ema 强化的是 enterprise customer proof ladder 和 Agent day-2 operations；Lindy 进一步说明，同一类产品还可能同时拥有个人入口与平台底座。以后不能给所有 AI employee 公司套统一 enterprise 模板：要先判断它的默认用户、第一屏任务、计量单位和主要分发渠道，再决定深挖重点。

## 下一轮保留的最小闭环

对 11x 先验证：预置销售角色是否仍是主产品、是否也有平台底座；融资与创始人网络；客户成效证据是否由客户侧确认；定价/合同与使用门槛；LinkedIn/X/社区；网站流量和 SEO/paid acquisition；真实产品入口及权限边界。只有出现相似证据时，才把 Lindy 的动作升级为正式方法。
