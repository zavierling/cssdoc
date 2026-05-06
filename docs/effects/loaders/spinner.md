---
title: 旋转 Spinner
description: 纯 CSS 的平滑旋转加载指示器，支持多种颜色和尺寸
category: loaders
tags:
  - loader
  - spinner
  - animation
  - loading
date: 2026-05-06
---

# 旋转 Spinner

一个简洁的纯 CSS 旋转加载指示器，使用 `conic-gradient` 实现渐变色环。

<CssDemo
  height="220px"
  bg="#f0f2f5"
  :html="html"
  :css="css"
/>

<script setup>
const html = `<div class="spinner-wrapper">
  <div class="spinner"></div>
  <span class="spinner-text">Loading...</span>
</div>`

const css = `
.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    #667eea,
    #764ba2,
    #f093fb,
    #667eea
  );
  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 6px),
    #fff calc(100% - 6px)
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 6px),
    #fff calc(100% - 6px)
  );
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner-text {
  font-size: 14px;
  color: #666;
  letter-spacing: 2px;
  animation: pulse-text 1.5s ease-in-out infinite;
}

@keyframes pulse-text {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
`
</script>

## 变体：单色 Spinner

如果需要更简洁的单色风格，可以用这种方式：

```css
.spinner-solid {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

## 原理说明

| 技术 | 说明 |
|------|------|
| `conic-gradient` | 创建围绕圆心的渐变色谱 |
| `mask: radial-gradient(...)` | 挖空中心区域，形成环状 |
| `@keyframes spin` | 360° 旋转动画 |

## 自定义

- **调整尺寸**：修改 `width`/`height`
- **改变粗细**：调整 `mask` 中的 `transparent calc(100% - 6px)` 的 `6px` 值
- **变换颜色**：修改 `conic-gradient` 中的色值
- **控制速度**：调整 `animation` 的时长
