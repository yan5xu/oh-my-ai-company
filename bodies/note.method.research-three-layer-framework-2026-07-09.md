# 调研方法观察：单体研究、网络扩张、资产沉淀

这不是固定 SOP，而是我们连续调研 Superset、Viktor、Interloom、Lace 等公司后形成的工作框架。当前可以先按三层理解：单体研究、网络扩张、资产沉淀。

## 1. 单体研究
目标：把一个公司或产品看明白。

单体研究不是材料堆积，而是回答几个核心问题：

- 它一句话是什么？
- 它解决的是哪一层问题？
- 用户/客户是谁？
- 产品怎么工作？
- 团队和融资怎么样？
- 增长和 GTM 怎么跑？
- 有什么关键判断和风险？
- 我们为什么要关注它？

这一层的典型对象是 `company`、`source.item`、`note.takeaway` 和产品图片/官网素材。

经验：不要把所有公司都叫 agent 公司。先判断它在图谱里的位置，比如执行入口、browser infra、组织记忆层、垂直 workflow operator、coding workflow、GTM operating system、agent sandbox/validation/security 等。

例子：

- [[company.viktor]]：Slack/Teams 里的 AI employee，偏执行入口。
- [[company.interloom]]：企业 Context Graph / corporate memory，偏组织记忆层。
- [[company.lace-ai]]：home services call center 的 AI revenue operator，偏垂直行业收入流程。
- [[company.superset]]：agentic coding / IDE workflow，传播上有 HN、Product Hunt、创始人网络等特点。

## 2. 网络扩张
目标：不是只看一个点，而是顺着关系网找到下一个重要节点。

常见网络包括：

- 投资网络：investor -> investment -> company。
- 创始人网络：founder -> past company / YC / ex-company。
- 媒体网络：journalist -> article -> company / investor。
- 竞品网络：company -> competitor / category peer。
- 客户/合作网络：company -> customer / partner。
- 传播网络：X / Product Hunt / HN / LinkedIn 上谁在放大。

网络扩张时要记录“它怎么进入我们视野”。进入视野路径本身就是信号。

例子：

- [[company.interloom]] 是从 [[company.viktor]] 的投资人相邻网络里进入视野的：Viktor -> [[investor.bek-ventures]] -> Interloom。
- [[company.lace-ai]] 也是从 Bek 的 portfolio / thesis 进入视野，但它不是 Viktor 的直接竞品，而是 vertical AI 的相邻样本。
- 媒体线里，TechCrunch、Forbes、Reuters 等记者和报道对象也可以作为“信号网络”来挖。

网络扩张的关键不是覆盖更多点，而是判断关系类型：竞品、上下游、同投资组合、同叙事、同 GTM 模式，还是只是弱相关噪音。

## 3. 资产沉淀
目标：让调研不是一次性对话，而是进入可复用系统。

沉淀分两类：Memex 沉淀和 X list 沉淀。

### Memex 沉淀
Memex 是结构化研究资产。不同对象承载不同含义：

- `company`：主体档案和产品判断。
- `person`：创始人、投资人、媒体人。
- `investor` / `investment`：投资关系。
- `source.item`：单条证据，文章、官网、LinkedIn post、X profile、客户 PR 等。
- `touchpoint`：长期监控入口，官网、Blog、LinkedIn、X、Product Hunt 等。
- `note`：人的判断、takeaway、方法反思。
- `concept` / `method`：跨公司复用的概念和方法。

经验：不要把所有东西藏进 body。需要被 query 的东西应该结构化，比如投资关系、source、touchpoint、人物和 list 监控状态。

### X list 沉淀
X list 是持续监控入口，不是调研结论。

当前使用：

- `AI Product`：公司/产品官方号。
- `AI Founder`：创始人。
- `AI Media`：记者/媒体节点。

未来可以考虑：

- `AI Investor`：投资人账号。
- `AI Customer/Operator`：客户侧或行业操盘手账号，如果后续证明有价值。

经验：不是所有 X 账号都值得加。账号要么是产品官方更新源，要么是创始人/媒体/投资人这类信号节点。对于 Lace 这种 X 很弱的公司，LinkedIn 和客户 PR 可能比 X 更关键，但公司号和创始人号仍可低成本纳入基础监控。

## 三层如何连接
这三层不是并列任务，而是一个循环：

1. 单体研究产出判断。
2. 网络扩张决定下一个看谁。
3. 资产沉淀让成果能被复用和持续监控。

一个比较完整的调研动作，不只是写完报告，而是要回答：

- 这个公司在图谱里的位置是什么？
- 它通过什么路径进入我们视野？
- 它产生了哪些新节点？
- 哪些节点值得继续监控？
- 有哪些方法或工具问题需要沉淀？

## 当前原则
- 先判断层级，再判断竞品关系。
- 先提取官网原始素材，再截图保留上下文。
- 空壳页面不能作为证据。
- 事实和判断分开，source 和 note 分开。
- 一次深挖应该转化为长期监控。
- 调研同时要反哺工具和方法，这是 research workflow 的方法沉淀价值。
