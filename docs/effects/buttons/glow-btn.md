---
title: 霓虹辉光按钮
description: 利用多重 box-shadow 和 transition 实现的霓虹辉光悬停效果
category: buttons
tags:
  - button
  - neon
  - glow
  - hover
date: 2026-05-06
---

# 霓虹辉光按钮

一个经典的霓虹灯风格按钮悬停效果。鼠标悬停时，按钮边缘和背景散发出明亮的辉光。

<CssDemo
  height="220px"
  bg="#1a1a2e"
  :html="html"
  :css="css"
/>

<script setup>
const html = `<button class="glow-btn">Hover Me</button>`

const css = `
.glow-btn {
  padding: 16px 48px;
  font-size: 20px;
  font-weight: 700;
  color: #00ffff;
  background: transparent;
  border: 2.5px solid #00ffff;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 4px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.glow-btn:hover {
  color: #1a1a2e;
  background: #00ffff;
  box-shadow:
    0 0 10px #00ffff,
    0 0 20px #00ffff,
    0 0 40px #00ffff,
    0 0 80px #00ffff;
  transform: translateY(-2px);
}

.glow-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.glow-btn:hover::before {
  left: 100%;
}
`
</script>

## 原理说明

| 属性 | 作用 |
|------|------|
| `box-shadow` 多层叠加 | 逐层增大模糊半径，形成由内到外的辉光渐变 |
| `transition` | 控制颜色和阴影变换的平滑过渡 |
| `::before` 扫光动画 | 利用 `linear-gradient` 配合偏移实现光线扫过效果 |

## 使用方式

直接复制 HTML 和 CSS 到你的项目中使用。注意：

- 建议搭配**深色背景**使用，辉光效果更明显
- 辉光颜色（`#00ffff`）可替换为你需要的主题色
