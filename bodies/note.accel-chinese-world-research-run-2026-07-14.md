# Accel 中文世界认知补充：本轮流程与反思

这是一轮实际过程记录，不是固定 SOP。

## 本轮怎么跑

1. 先查 Accel 已有 39 条 source，确认没有中文材料。
2. 用 Google 搜机构史、中国关系、AI portfolio 与 partner 访谈；再用搜狗微信、知乎、小红书、即刻/微博搜索补平台差异。
3. 对候选文章运行 browser read；正文不足 200 字或只有导航时不使用。本轮选中的网页与微信文章都抓到完整正文。
4. 对两篇公众号文章反向追到同一场 20VC/Miles Clements 访谈。
5. 用 `yt-dlp` 下载 YouTube `en-orig` 自动字幕，核对 TTV/DOV、Cursor Agent 使用与 merged PR 数据是否有原话。
6. 中文线新增的 Scale AI 和 Miles Clements 再用 Accel、Scale 官方页面确认，才进入 company/person/investment 图谱。

## 本轮形成的判断

- 中文媒体最完整的 Accel 叙事来自机构史，而不是融资快讯。
- 中文社区对 Accel 的心智主要由明星项目、巨额回报和“顶级 VC”标签构成。
- 公众号能有效搬运最新投资框架，但必须把翻译文章与原始播客分层。
- 跨语言研究的价值之一是反向发现遗漏节点；本轮补出了 [[company.scale-ai]] 与 [[person.miles-clements]]。

## 工具与建模反馈

- 搜狗微信 adapter 能找到并抓取正文，但结果 URL 是临时签名；已在 source body 记录 `__biz/mid/idx`。
- 小红书 adapter 能返回正文、互动数与图片列表，适合判断社区心智，不适合作强事实源。
- `source.item.platform` 缺少 WeChat、Zhihu、Xiaohongshu 等枚举，只能暂写 Website/Other；已向 cici-mmx 提工具/schema 需求。
- 投资机构中文认知不应写进 `investor.focus`，应以 source + note 挂回机构，避免把外部印象当机构事实。

## 与上一轮 Accel 调研相比

上一轮解决“Accel 自己如何解释自己、投了谁”；本轮解决“中文世界选择记住 Accel 的什么”。两者不能合并成同一证据层。这个区别值得保留，但目前只跑过一家机构，所以新方法仍标为 draft/low confidence。

关联：[[investor.accel]]、[[method.investor-chinese-perception-audit]]。
