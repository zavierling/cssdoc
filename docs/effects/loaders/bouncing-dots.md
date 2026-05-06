---
title: 弹跳小球
description: 三个小球交替弹跳的加载动画，模拟物理弹跳效果
category: loaders
tags:
  - loader
  - dots
  - bounce
  - animation
date: 2026-05-06
---

# 弹跳小球

三个小球依次弹跳的加载动画，每个小球有独立的延迟，形成波浪般的节奏感。

<CssDemo
  height="220px"
  :html="html"
  :css="css"
/>

<script setup>
const html = `<div class="dots-wrapper">
  <div class="dot dot-1"></div>
  <div class="dot dot-2"></div>
  <div class="dot dot-3"></div>
</div>`

const css = `
.dots-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #667eea;
  animation: bounce 1.4s ease-in-out infinite both;
}

.dot-1 { animation-delay: -0.32s; background: #667eea; }
.dot-2 { animation-delay: -0.16s; background: #764ba2; }
.dot-3 { animation-delay: 0s; background: #f093fb; }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
`
</script>

## 变体：水平弹跳

如果更喜欢左右弹跳的效果：

```css
@keyframes bounce-horizontal {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-24px);
  }
}
```

## 关键技巧

| 技巧 | 说明 |
|------|------|
| 负值 `animation-delay` | 让小球从动画的不同阶段开始，形成错落感 |
| `both` 填充模式 | 保持动画开始前和结束后的状态一致 |
| 独立的 `background` | 每个小球使用不同但同色系的颜色增加层次 |

## 参数调节

- **速度**：调整 `1.4s` 为更小/更大的值
- **大小**：修改 `width`/`height`
- **弹跳高度**：调整 `@keyframes` 中的 `transform: scale(1)` 或 `translateY`
- **颜色**：每个 `.dot-n` 可独立设置颜色
