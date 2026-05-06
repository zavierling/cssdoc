---
title: 毛玻璃效果
description: 经典的玻璃态（Glassmorphism）背景模糊效果
category: backgrounds
tags:
  - glassmorphism
  - glass
  - blur
  - card
date: 2026-05-06
---

# 毛玻璃效果

Glassmorphism（玻璃态）是一种通过背景模糊营造玻璃质感的流行设计风格。核心三要素：**半透明背景**、**背景模糊**、**微妙边框**。

<CssDemo
  height="400px"
  bg="linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
  :html="html"
  :css="css"
/>

<script setup>
const html = `<div class="glass-card">
  <div class="glass-icon">✦</div>
  <h2 class="glass-title">Glassmorphism</h2>
  <p class="glass-desc">背景模糊营造玻璃质感，半透明带来层次深度。</p>
  <button class="glass-btn">了解更多</button>
</div>`

const css = `
.glass-card {
  width: 320px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
}

.glass-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.9;
}

.glass-title {
  font-size: 24px;
  margin-bottom: 12px;
  font-weight: 700;
}

.glass-desc {
  font-size: 15px;
  line-height: 1.6;
  opacity: 0.85;
  margin-bottom: 24px;
}

.glass-btn {
  padding: 10px 32px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.5);
}
`
</script>

## Glassmorphism 核心公式

```css
.card {
  /* 1. 半透明背景 */
  background: rgba(255, 255, 255, 0.15);

  /* 2. 背景模糊（核心） */
  backdrop-filter: blur(20px);

  /* 3. 微妙边框 */
  border: 1px solid rgba(255, 255, 255, 0.25);

  /* 4. 阴影增加层次 */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
```

## 使用建议

- 毛玻璃效果需要搭配**有层次感的背景**（渐变、图片等）才能突显质感
- `blur` 值建议在 `15px` - `30px` 之间
- 背景透明度建议在 `0.1` - `0.25` 范围
- 始终同时设置 `backdrop-filter` 和 `-webkit-backdrop-filter` 保证兼容性
