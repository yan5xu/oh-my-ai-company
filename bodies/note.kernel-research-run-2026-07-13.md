# Kernel 本轮调研流程与反思

这是一轮实际工作记录，不代表已经固化为所有公司都适用的 SOP。

## 本轮怎么跑

1. **查已知**：先查 vault 中 Browserbase、Hyperbrowser、Browserless 与 Kernel 的既有引用，确定它是 browser/agent infra 图谱缺口。
2. **官方骨架**：读 YC、founder introduction、官网 docs/pricing/auth、融资公告和最新 vision，建立产品层、时间线、团队与融资骨架。
3. **技术与发布**：读 HN 首发及评论、YC X launch、GitHub org/repo/issues，比较具体技术 artifact 和泛产品传播的差异。
4. **规模双轨**：一边看 Similarweb 的网站量级/渠道/地域/关键词/相似站，一边找客户 session、agents/day、browser launches、团队增长等使用侧信号。
5. **客户验证**：读 Benny、Felicity、Effective AI、Anthropic 案例，把“快浏览器”还原为登录、反检测、受监管 workflow、benchmark 等实际场景。
6. **网络扩张**：补创始人、Accel/YC/战略投资人、天使与 Cloudflare/Vercel/Anthropic 合作关系。
7. **社区补查**：跑 HN、X、Reddit、微信、V2EX、Linux.do、即刻、小红书和 Product Hunt；把抓不到与没有结果分开记录。
8. **资产化**：写入 company/person/investor/investment/source.item/touchpoint/traffic.snapshot/note/concept，并将官网、创始人账号加入监控入口和 X lists。

## 这轮新增的认识

### API-first infra 要把“注意力”和“使用量”拆开

过去的流量方法更偏网站产品。Kernel 显示：marketing site 半年访问约 15 万，不妨碍单一客户月跑 88 万 sessions。以后研究 infra 公司至少并列四类信号：网站注意力、API/backend 使用、客户 workflow、开发者/团队活动。

### Launch 不是单一日期

Kernel 至少有三个 launch：4 月技术 artifact、8 月 YC 产品 launch、10 月融资与路线图。它们分别服务技术可信度、产品认知和资源放大。以后应重建 launch sequence，而不是只填一个日期。

### 最新 founder vision 是战略证据

官网 hero 讲当前产品，release/docs 讲能力，founder vision 才会说明它想控制哪一层。Kernel 最新文章把浏览器产品提升到身份与委托，这改变了竞品地图。

## 工具问题

- Kernel 首页在 browser 中只显示背景，read/snapshot 没有正文；改用官方 docs/blog/metadata，并已反馈浏览器工具 owner。
- Reddit adapter 的相对 URL 解析失败；用搜索引擎补查，但不能把补查不充分写成“无人讨论”。
- LinkedIn employees 返回错误的推荐卡片；改用公开人物搜索和官方 team image 交叉验证，已反馈 site owner。
- X list 连续并行写入时出现 target closed；串行重试更稳。
- GitHub 当前数据可取，但 star history 没有可靠接口，本轮明确缺失，不自行拟合。
- 无 `KERNEL_API_KEY`，所以没有产品实测。报告必须明确这是 desk research。

## 对既有方法的更新建议

- 给 [[method.traffic-snapshot-model-v0]] 增加 API-first infra 的解释边界。
- 给 [[method.launch-playbook-extraction]] 增加 launch sequence 与“artifact specificity”比较。
- 给 [[method.product-research-workflow-v0]] 增加 usage-side scale、founder vision 和空壳/adapter 失败的回退顺序。

这些只来自 Kernel 与前几轮 browser infra 样本，先作为方法增量，不上升为最终规范。
