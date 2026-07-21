# General Catalyst 投资机构调研过程记录（2026-07-21）
# General Catalyst 投资机构调研过程记录（2026-07-21）

## 本轮起点

General Catalyst 已有约 5 千字卷宗、14 家公司关系和 11 条来源，但人物只有正文双链，没有结构字段；基金、Creation、Customer Value、Transformation 也混在同一叙述层。

## 实际路径

1. 先审计现有 investment，保留已明确标成 portfolio relation 的边，不补猜 round、lead 或 amount。
2. 从 Fund XII 官方公告拆出 core VC、Creation、SMA 三类资本口径。
3. 从 Capital、Customer Value、Transformation 和 Seed 官方材料区分资本产品、公司创建、企业部署和早期网络。
4. 从 current team、人物 profile 和投资文章建立 [[person.hemant-taneja]]、[[person.marc-bhargava]]、[[person.jeannette-zu-furstenberg]]、[[person.quentin-clark]] 四个责任节点。
5. 用官网 live DOM 验证 portfolio 页面有 partner、sector、region、seed/CVF/creation/status 等隐藏字段，并把重复采集需求交给 site-forge 侦察。
6. 中文检索主要命中具体融资名单和二次转述，缺少足以与官方机制材料对照的高质量中文机构分析，因此正文只记录认知缺口，不用弱材料装饰结论。

## 本轮反思

- 大型机构的差异不只在基金规模，而在是否把不同风险装进不同资本产品。
- 负责 Partner attribution 比完整团队目录更有研究价值；历史署名人不能自动写成 current team。
- 官网 portfolio 是候选关系源，不是轮次数据库。
- 投资机构自写客户案例仍然带利益相关，不能升级为独立采用证据。
- 新增正文后必须以 `mmx status clean=true` 验收，不能只看 Git clean 与 issues=0。

关联：[[investor.general-catalyst]]、[[source.story.general-catalyst-fund-xii-2024-10-24]]、[[source.story.general-catalyst-seed-2025-07-08]]、[[source.story.general-catalyst-customer-value]]。
