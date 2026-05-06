---
title: 如何添加新效果
description: 向 CSS Effects 网站添加新效果的完整指南
---

# 如何添加新效果

向本站添加新的 CSS 效果非常简单，只需要创建一个 Markdown 文件并使用 `<CssDemo>` 组件。

## 快速上手

### 第一步：创建文件

在 `docs/effects/` 下找到对应的分类目录，创建 `.md` 文件。如果没有合适的分类，可以先新建一个目录。

```
docs/effects/
├── buttons/              # 已有分类
│   └── my-effect.md      ← 新建文件
└── animations/           # 新建分类（可选）
    ├── index.md          ← 分类页面
    └── my-animation.md   ← 效果文件
```

### 第二步：编写 Frontmatter

文件顶部使用 YAML frontmatter 定义元数据：

```yaml
---
title: 你的效果标题
description: 简短的效果描述，会显示在侧边栏和搜索中
category: buttons
tags:
  - button
  - hover
  - custom
date: 2026-05-06
---
```

### 第三步：编写效果内容

使用 `<CssDemo>` 组件嵌入实时预览，通过 `<script setup>` 定义 HTML/CSS/JS 代码：

```markdown
# 效果标题

效果描述文字...

<CssDemo
  height="250px"
  bg="#1a1a2e"
  :html="html"
  :css="css"
/>

<script setup>
// 在这里定义效果代码
const html = `<button class="my-btn">按钮</button>`

const css = `
.my-btn {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}
.my-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}
`
</script>

## 使用方式

说明如何使用这个效果...
```

## CssDemo 组件参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `html` | string | `''` | HTML 结构代码 |
| `css` | string | `''` | CSS 样式代码 |
| `js` | string | `''` | JavaScript 交互代码（可选） |
| `height` | string | `'300px'` | 预览区域高度 |
| `bg` | string | `'#f7f7f7'` | 预览区域背景色 |

## 新建分类目录

要创建一个新分类（如 `animations`）：

1. 在 `docs/effects/` 下创建目录 `animations/`
2. 创建 `animations/index.md` 作为分类概览页
3. 侧边栏会自动扫描目录并生成导航

`index.md` 示例：

```markdown
---
title: 动画效果
description: CSS 动画效果合集
---

# 动画效果

描述该分类...

---

## 效果列表

- [效果一](./effect-one) — 描述
- [效果二](./effect-two) — 描述
```

## 完整示例模板

```markdown
---
title: 效果名称
description: 简短描述
tags:
  - tag1
  - tag2
date: 2026-05-06
---

# 效果名称

效果说明。

<CssDemo
  height="250px"
  :html="html"
  :css="css"
  :js="js"
/>

<script setup>
const html = `...`
const css = `...`
const js = `...` // 可选
</script>

## 原理说明

解释效果背后的 CSS 原理。

## 使用方式

使用该效果的注意事项。
```

## 预览与构建

```bash
# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 提交到 Git

建议将整个项目用 Git 管理，每次添加新效果后提交：

```bash
git add .
git commit -m "feat: 添加 [效果名称]"
git push
```

推送到 GitHub 后，Netlify 会自动部署。
