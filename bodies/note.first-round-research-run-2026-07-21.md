# First Round Capital 调研过程记录（2026-07-21）

## 为什么选它做试点

现有 vault 中 Accel、Lightspeed、General Catalyst、Conviction 已有较完整 dossier；a16z、YC 过大或机制特殊。First Round 同时满足：已连接 [[company.clay]]、[[company.fal]]、[[company.gumloop]]、[[company.parallel]]、[[company.ploy]] 等目标公司，机构正文却很薄；官方资料结构化程度高，规模又足以在一轮内跑完。

## 实际使用的平台和方法

1. **Memex 基线盘点：** 查 investor、investment、source、person、touchpoint 和现有 method，确认只有五条投资边、没有人物对象。
2. **官网结构化抽取：** 浏览 Companies、Team、How We Work、Who We Back、PMF Method、Angel Track、The Review、Applied Intelligence。
3. **动态页面处理：** Companies 页 URL 参数最初没有稳定恢复筛选状态；点击 AI filter 后，从 Next/RSC payload 解析 191 家公司数据，再得到 48 家 AI 标记公司、stage、partner、founder、location 和 website。
4. **监管文件：** 用 SEC Form D 核对 Fund IX/X 的发行目标与 related persons，同时保留 offering amount 不等于 closed amount 的边界。
5. **人物线：** 读取六位现任 Partner 与 Annie Duke 的官方 profile，补 X、LinkedIn 和人物画像；按官方 portfolio attribution 形成 partner clusters。
6. **平台验证：** X adapter 验证 @firstround；LinkedIn adapter读取公司页，但 employees 返回 partial/0，因此没有把它当团队名单。
7. **中文认知：** 微信和小红书搜索用于观察中文世界记住了什么，不用于确认机构事实。
8. **图文资产：** 同时保留官网 hero、AI portfolio、Applied Intelligence 截图和官方人物原图。

## 本轮有效方法

- 先把机构当作一个 operating system，而不是 portfolio 容器，才能发现 decision science、working session、Pitch Assist、PMF Method 和 Angel Track 之间的关系。
- 官网 portfolio 的 `partner` 字段比行业标签更有解释力；它把统一机构 thesis 拆成真实能力圈。
- SEC filing 适合确认基金实体、日期、offering target 和 related persons，但必须把“申报”与“募资完成”分开。
- 中文平台更适合做 perception audit。First Round 在中文世界主要被记为方法论来源和单笔融资投资方，而非当前 AI thesis。

## 失败与修正

- 逐个点击 40+ portfolio 卡片导致 browser eval 超时；改从页面已有 RSC 数据解析，信息更完整且减少重复动作。
- LinkedIn employees 没抓到有效员工卡，保持 partial，不用空结果推团队规模。
- 小红书和微信结果混入大量具体公司融资，不能用搜索 count 衡量机构影响力。
- 首次容易把两期 5 亿美元写成“募资额稳定”，核对 Form D 后降级为“发行目标相同”。

## 对 SOP 的新增要求

在已有 portfolio expansion 与中文认知审计之外，投资机构研究至少还要补：

1. fund vehicle / stage discipline；
2. current team 与 historical attribution 分离；
3. decision mechanism；
4. founder support operating system；
5. content/community 与 deal flow 的事实连接；
6. partner cluster，而非只列热门公司；
7. monitoring touchpoints 与更新触发器。

本轮据此形成 [[method.investor-research-sop-v0]]，仍需用不同类型机构继续校准。
