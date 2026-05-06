# CSS Effects Collection

基于 VitePress 构建的 CSS 效果收集与展示网站。

## 特点

- **实时预览** — 每个效果在隔离的 iframe 中直接预览
- **源码即内容** — Markdown 文件中定义代码，无需额外数据库
- **交互支持** — 支持悬停、点击、动画等 CSS/JS 交互
- **自动导航** — 根据目录结构自动生成侧边栏
- **一键部署** — Netlify 部署配置已内置

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm run preview
```

## 添加新效果

在 `docs/effects/` 下对应分类目录中创建 `.md` 文件，参考 [添加指南](docs/guide/how-to-add.md)。

## 部署

已配置 `netlify.toml`，连接 GitHub 仓库后 Netlify 会自动部署。

## 项目结构

```
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts                  # 站点配置，内含自动侧边栏
│   │   └── theme/
│   │       ├── index.ts               # 主题入口，注册 CssDemo 组件
│   │       └── components/
│   │           └── CssDemo.vue        # 核心：iframe 预览 + 代码展示
│   ├── effects/                       # 效果目录（自动扫描生成侧边栏）
│   │   ├── buttons/                   # 按钮效果分类
│   │   ├── backgrounds/               # 背景效果分类
│   │   └── loaders/                   # 加载动画分类
│   ├── guide/
│   │   └── how-to-add.md              # 添加效果指南
│   └── index.md                       # 首页
├── netlify.toml                       # Netlify 部署配置
└── package.json
```

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态站点生成器
- Vue 3 — 组件系统
- iframe Sandbox — 样式隔离
