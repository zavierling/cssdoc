import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** 递归扫描 effects 目录，自动生成侧边栏 */
function buildEffectsSidebar() {
  const effectsDir = path.resolve(__dirname, '../effects')
  const sidebar: Array<{ text: string; collapsed?: boolean; items: Array<{ text: string; link: string }> }> = []

  if (!fs.existsSync(effectsDir)) return sidebar

  const entries = fs.readdirSync(effectsDir, { withFileTypes: true }).sort((a, b) => {
    // 目录排前面
    if (a.isDirectory() && !b.isDirectory()) return -1
    if (!a.isDirectory() && b.isDirectory()) return 1
    return a.name.localeCompare(b.name)
  })

  for (const entry of entries) {
    // 跳过非目录（只有分类目录才进 sidebar）
    if (!entry.isDirectory()) continue

    const categoryPath = path.join(effectsDir, entry.name)
    const files = fs.readdirSync(categoryPath)
      .filter(f => f.endsWith('.md'))
      .sort()

    if (files.length === 0) continue

    const displayName = entry.name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())

    const items: Array<{ text: string; link: string }> = []

    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const link = `/effects/${entry.name}/${file.replace(/\.md$/, '')}`

      if (file === 'index.md') {
        items.unshift({ text: '概览', link })
      } else {
        const title = extractTitle(filePath) || file.replace(/\.md$/, '').replace(/[-_]/g, ' ')
        items.push({ text: title, link })
      }
    }

    sidebar.push({
      text: displayName,
      collapsed: true,
      items,
    })
  }

  return sidebar
}

/** 从 Markdown 文件 frontmatter 中提取 title */
function extractTitle(filePath: string): string | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^title:\s*(.+)$/m)
    return match ? match[1].trim() : null
  } catch {
    return null
  }
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'CSS Effects',
  description: '精选 CSS 效果收集与展示',

  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    logo: false,

    search: {
      provider: 'local',
    },

    nav: [
      { text: '效果集', link: '/effects/', activeMatch: '/effects/' },
      { text: '添加指南', link: '/guide/how-to-add' },
    ],

    sidebar: {
      '/effects/': [
        {
          text: '效果分类',
          items: buildEffectsSidebar(),
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/css-effects' },
    ],

    footer: {
      message: '基于 VitePress 构建 · 效果代码可自由使用',
      copyright: 'MIT License',
    },

    outline: {
      level: [2, 3],
      label: '本页内容',
    },

    lastUpdatedText: '最后更新',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到亮色模式',
    darkModeSwitchTitle: '切换到暗色模式',
  },

  markdown: {
    image: { lazyLoading: true },
  },
})
