# AI Company Research Vault

这是 `cici-research` 使用的 AI 公司/产品调研知识库。仓库是私有的，内容包括公司档案、创始人/投资人网络、融资关系、证据来源、流量快照、社区反馈、图片素材、方法论记录和研究笔记。

底层知识库产品是 [Memex](https://github.com/yan5xu/memex)，CLI 叫 `mmx`。Memex 是 local-first 的对象图谱知识库：SQLite 存 schema/object/link，Markdown 存正文。

## 这个 vault 的价值

这个仓库不是单篇调研报告的集合，而是一个可复用的 AI 公司研究网络。每次调研一个公司，都会把公司、创始人、投资机构、融资事件、流量数据、社区反馈、媒体报道、竞品关系和研究判断沉淀成可查询的对象与关系。

它主要解决几个问题：

- **从点到网**：从一个公司 seed 出发，扩展到投资人 portfolio、创始人履历、相邻产品、关键媒体人和社区讨论，形成 market map。
- **事实和判断分离**：`source.item` 保存证据，`note` 保存人的判断，避免把 PR、社区情绪和研究结论混在一起。
- **可复用的调研资产**：同一个投资人、公司、创始人、概念或方法可以被多轮调研复用，不需要每次重新搜索。
- **增长与 GTM 观察**：用 `traffic.snapshot`、Product Hunt、HN、Reddit、X、中文社区等信号记录产品传播路径和流量变化。
- **agent 协作入口**：README 给人看，`AGENTS.md` 给 agent 看。agent 可以按固定 CLI 流程读写 vault、检查 issues、更新图谱和提交变更。

典型用法是：看到一个产品或融资消息后，先查 vault 已知信息，再补官网、团队、融资、流量、社区反馈、竞品和投资网络，最后把证据、判断、图谱关系和方法反思都写回 vault。下一次调研不从零开始，而是沿着已有网络继续扩展。

边界：这个 vault 存公司研究资产，不存社媒运营资产。X、Reddit、微信公众号、小红书等内容如果是某家公司调研的证据，可以作为 `source.item` 保存；账号运营、发文、阅读数据、社媒复盘等内容不放在这里。

## 界面预览

公司档案：

![Memex company research example](assets/readme/memex-company-superset-research.png)

投资机构 portfolio 图谱：

![Memex portfolio graph example](assets/readme/memex-portfolio-lightspeed.png)

## 仓库结构

```text
.
├── .memex/memex.db          # SQLite：type、field、object、link
├── bodies/                  # Markdown body：公司报告、source 摘要、note、method
├── assets/                  # 图片、截图、官网素材、研究配图
├── memex.graph-views.json   # Graph v2 视图配置
├── AGENTS.md                # 给 agent 看的运行手册
└── README.md                # 给人看的项目说明
```

不要手动编辑 `.memex/memex.db`。日常读写走 `mmx`，长文内容可以直接改 `bodies/*.md`，但改完要 `body refresh`。

## 准备

进入仓库根目录后使用：

```bash
MMX=/tmp/mmx
VAULT=$(pwd)
```

检查 CLI：

```bash
$MMX --help
```

检查 vault：

```bash
$MMX -C "$VAULT" vault info
$MMX -C "$VAULT" status
$MMX -C "$VAULT" issues
```

健康状态应为 `issues` 返回 `count: 0`。

## 常用读取

查看 schema：

```bash
$MMX -C "$VAULT" type list
$MMX -C "$VAULT" field list company
$MMX -C "$VAULT" field list source.item
```

查对象：

```bash
$MMX -C "$VAULT" query company --where 'title=Browserless' --select id,title,website,tags
$MMX -C "$VAULT" get company.browserless --body-preview 800
$MMX -C "$VAULT" backlinks company.browserless
```

查某公司的证据和流量：

```bash
$MMX -C "$VAULT" query source.item \
  --where 'about_company=company.browserless' \
  --select id,title,platform,evidence_level,quality

$MMX -C "$VAULT" query traffic.snapshot \
  --where 'company=company.browserless' \
  --select id,domain,monthly_visits,total_visits,period_start,period_end
```

## 写入流程

新公司：

```bash
cat <<'EOF' | $MMX -C "$VAULT" upsert company company.example \
  name="Example" \
  title="Example" \
  status=active \
  website="https://example.com" \
  tags=ai-agent,developer-tool \
  --body-stdin
# Example

一句话介绍、产品判断、证据链接和分析。
EOF
```

新增证据：

```bash
cat <<'EOF' | $MMX -C "$VAULT" source add source.example-home \
  --title "Example homepage" \
  --url "https://example.com" \
  platform=Website \
  item_type=profile \
  evidence_level=S1 \
  quality=full \
  about_company=company.example \
  --body-stdin
官网正文摘要、关键事实、抓取状态和证据边界。
EOF
```

新增判断笔记：

```bash
cat <<'EOF' | $MMX -C "$VAULT" upsert note note.example-takeaway \
  title="Example 产品 takeaway" \
  kind=takeaway \
  author=cici-research \
  about_company=company.example \
  created_at=2026-07-13 \
  --body-stdin
人的判断写这里。事实和判断分开；不确定的地方标注待验证。
EOF
```

建立结构化关系：

```bash
$MMX -C "$VAULT" link company.example founders person.example-founder
$MMX -C "$VAULT" link source.example-home about_company company.example
```

Markdown 正文里可以写 `[[company.example]]` 形成 body link。写完后刷新：

```bash
$MMX -C "$VAULT" body refresh company.example
$MMX -C "$VAULT" issues
```

## Graph 视图

Graph v2 配置在：

```text
memex.graph-views.json
```

常用视图：

- `company-research-map`：公司全景，证据、笔记、触点、流量、创始人、投资人、概念/方法。
- `company-evidence`：公司证据库。
- `company-traffic`：公司流量快照。
- `portfolio`：投资机构 portfolio。
- `investor-map`：投资机构全景。
- `person-network`：人物全景。
- `concept-evidence`：概念/模式证据。
- `source-trail`：从单条 source 追溯到主体、笔记、投资关系、方法。

查询示例：

```bash
$MMX -C "$VAULT" graph view list
$MMX -C "$VAULT" graph query --view company-research-map --center company.browserless
$MMX -C "$VAULT" graph query --view portfolio --center investor.lightspeed-venture-partners
```

改 Graph 配置前先验证：

```bash
$MMX -C "$VAULT" graph view validate --file memex.graph-views.json
$MMX -C "$VAULT" graph view apply --file memex.graph-views.json
```

## X 监控列表

调研里发现的高价值 X 账号，除了写成 `touchpoint`，还会加入 X list 做持续监控。当前 research 相关列表：

| List | 用途 | URL |
| --- | --- | --- |
| `AI Product` | AI 产品/公司官方账号。用于监控 launch、产品更新、客户互动和传播反馈。 | https://x.com/i/lists/2074319950106497342 |
| `AI Founder` | AI 公司创始人、CEO、核心 operator。用于监控 founder narrative、融资/发布节点、招聘和市场判断。 | https://x.com/i/lists/2074309338932576685 |
| `AI Media` | AI/startup 记者、编辑、核心媒体节点。用于监控叙事扩散、报道来源和关键媒体人网络。 | https://x.com/i/lists/2074809210010050753 |

原则：

- `touchpoint` 是 vault 内的结构化监控入口，X list 是外部持续阅读入口；两边都要尽量同步。
- 公司官方账号进 `AI Product`，创始人/CEO/核心 operator 进 `AI Founder`，媒体人/记者/编辑进 `AI Media`。
- 账号身份没确认时先不要加 list；可以先在正文或 note 里标成 candidate。
- 不要把一次性 tweet/thread 当 `touchpoint`。单条内容应存为 `source.item`。

常用命令：

```bash
/tmp/pinixc site twitter list-members --profile default --name "AI Product" --count 20
/tmp/pinixc site twitter list-add-member --profile default --list_name "AI Product" --screen_name example
/tmp/pinixc site twitter list-add-member --profile default --list_name "AI Founder" --screen_name founder
/tmp/pinixc site twitter list-add-member --profile default --list_name "AI Media" --screen_name reporter
```

## Web UI

启动：

```bash
$MMX -C "$VAULT" serve --addr 127.0.0.1:8765
```

打开：

```text
http://127.0.0.1:8765
```

如果需要显式指定 vault，可以使用 URL 参数。这里的值应替换成你本机的仓库路径：

```text
http://127.0.0.1:8765/?vault=<url-encoded-local-vault-path>
```

Web 自动化入口是 `window.memex`。

## 维护规则

- 每轮调研至少沉淀：`company/person/investor`、`source.item`、`note`，必要时补 `traffic.snapshot`、`touchpoint`、`concept`、`method`。
- `source.item` 放单条证据，正文写抓取状态、摘要、证据等级和不确定性。
- `touchpoint` 放持续监控入口，不放一次性文章。
- `note` 放人的判断、takeaway、反思和问题，不把判断混进 source 摘要。
- 社媒运营资产不进这个 vault；不要创建 `social.account`、`social.post`、`social.analytics.snapshot` 这类对象。
- 图片、截图和官网素材放 `assets/`，并在 body 里用相对路径引用。
- 每轮结束运行：

```bash
$MMX -C "$VAULT" issues
git status -sb
```

## GitHub

当前远程仓库：

```text
git@github.com:yan5xu/ai-company-research-vault.git
https://github.com/yan5xu/ai-company-research-vault
```

仓库应保持 `PRIVATE`。提交前确认没有无关变更：

```bash
git status -sb
git diff --stat
```
