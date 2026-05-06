<template>
  <div class="css-demo">
    <!-- 工具栏 -->
    <div class="demo-header">
      <span class="demo-badge">实时预览</span>
      <div class="demo-header-spacer" />
      <button class="demo-btn" :class="{ active: showCode }" @click="showCode = !showCode">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 18l6-6-6-6" />
          <path d="M8 6l-6 6 6 6" />
        </svg>
        {{ showCode ? '收起代码' : '查看代码' }}
      </button>
      <button class="demo-btn" @click="copyCode" :title="copied ? '已复制' : '复制全部代码'">
        <svg v-if="!copied" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
        <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5" />
        </svg>
        {{ copied ? '已复制' : '复制' }}
      </button>
      <button class="demo-btn" @click="openNewWindow" title="新窗口打开">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        新窗口
      </button>
    </div>

    <!-- iframe 预览区域 -->
    <div class="demo-preview" :style="{ height: previewHeight }">
      <iframe
        ref="iframeRef"
        :srcdoc="iframeDoc"
        :sandbox="sandbox"
        title="CSS 效果预览"
        @load="onIframeLoad"
      />
      <!-- 加载占位 -->
      <div v-if="!loaded" class="demo-loading">
        <div class="loading-spinner" />
      </div>
    </div>

    <!-- 源代码展示 -->
    <div v-if="showCode" class="demo-code">
      <div v-if="html" class="code-section">
        <div class="code-section-header">HTML</div>
        <pre><code>{{ html }}</code></pre>
      </div>
      <div v-if="css" class="code-section">
        <div class="code-section-header">CSS</div>
        <pre><code class="language-css">{{ css }}</code></pre>
      </div>
      <div v-if="js" class="code-section">
        <div class="code-section-header">JavaScript</div>
        <pre><code class="language-javascript">{{ js }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{
  /** HTML 结构 */
  html?: string
  /** CSS 样式 */
  css?: string
  /** JavaScript 交互代码 */
  js?: string
  /** 预览区域高度，如 '200px' 或 '300px' */
  height?: string
  /** 预览背景色，默认浅灰 */
  bg?: string
  /** 是否禁用沙箱中的脚本（安全模式） */
  noScript?: boolean
}>(), {
  html: '',
  css: '',
  js: '',
  height: '300px',
  bg: '#f7f7f7',
  noScript: false,
})

const showCode = ref(false)
const loaded = ref(false)
const copied = ref(false)
const iframeRef = ref<HTMLIFrameElement | null>(null)

const previewHeight = computed(() => props.height)

const sandbox = computed(() => {
  const perms = ['allow-scripts']
  return perms.join(' ')
})

const iframeDoc = computed(() => {
  const styleContent = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      font-family: system-ui, -apple-system, sans-serif;
    }
    ${props.css || ''}
  `

  const htmlContent = props.html || '<p style="color:#999">请在 <code>html</code> prop 中填入效果代码</p>'

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${styleContent}</style>
</head>
<body style="background:${props.bg}">
  ${htmlContent}
  ${props.js ? `<script>${props.js}<\/script>` : ''}
</body>
</html>`
})

function onIframeLoad() {
  loaded.value = true
}

function copyCode() {
  const text = [
    props.html ? `<!-- HTML -->\n${props.html}` : '',
    props.css ? `/* CSS */\n${props.css}` : '',
    props.js ? `// JavaScript\n${props.js}` : '',
  ].filter(Boolean).join('\n\n')

  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  })
}

function openNewWindow() {
  const win = window.open('', '_blank')
  if (win) {
    win.document.write(iframeDoc.value)
    win.document.close()
  }
}
</script>

<style scoped>
.css-demo {
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 8px;
  overflow: hidden;
  margin: 20px 0;
  transition: border-color 0.2s;
}

.css-demo:hover {
  border-color: var(--vp-c-brand, #646cff);
}

/* ===== 工具栏 ===== */
.demo-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--vp-c-bg-soft, #f6f6f7);
  border-bottom: 1px solid var(--vp-c-border, #e2e2e3);
}

.demo-badge {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-brand, #646cff);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  user-select: none;
}

.demo-header-spacer {
  flex: 1;
}

.demo-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  padding: 4px 10px;
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 4px;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text-2, #666);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.demo-btn:hover {
  border-color: var(--vp-c-brand, #646cff);
  color: var(--vp-c-brand, #646cff);
}

.demo-btn.active {
  background: var(--vp-c-brand-soft, #e8e8ff);
  border-color: var(--vp-c-brand, #646cff);
  color: var(--vp-c-brand, #646cff);
}

/* ===== iframe 预览 ===== */
.demo-preview {
  position: relative;
  background: var(--vp-c-bg, #fff);
  overflow: hidden;
}

.demo-preview iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

.demo-loading {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--vp-c-bg, #fff);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--vp-c-border, #e2e2e3);
  border-top-color: var(--vp-c-brand, #646cff);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== 代码展示 ===== */
.demo-code {
  border-top: 1px solid var(--vp-c-border, #e2e2e3);
  background: var(--vp-c-bg, #fff);
}

.code-section {
  border-bottom: 1px solid var(--vp-c-border, #e2e2e3);
}

.code-section:last-child {
  border-bottom: none;
}

.code-section-header {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 16px;
  background: var(--vp-c-bg-soft, #f6f6f7);
  color: var(--vp-c-text-2, #666);
  border-bottom: 1px solid var(--vp-c-border, #e2e2e3);
  user-select: none;
}

.code-section pre {
  margin: 0 !important;
  padding: 16px !important;
  border-radius: 0 !important;
  background: var(--vp-c-bg, #fff) !important;
  overflow-x: auto;
}

.code-section code {
  font-size: 13px !important;
  line-height: 1.6 !important;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace !important;
  color: var(--vp-c-text, #333) !important;
  white-space: pre !important;
  word-break: normal !important;
}

/* ===== 暗色模式适配 ===== */
:root.dark .demo-preview {
  background: #1a1a1a;
}

:root.dark .demo-loading {
  background: #1a1a1a;
}

:root.dark .code-section code {
  color: var(--vp-c-text, #ccc) !important;
}
</style>
