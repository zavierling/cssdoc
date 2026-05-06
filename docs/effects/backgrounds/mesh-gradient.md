---
title: Mesh 渐变背景
description: 利用多个模糊色块叠加实现的流畅 Mesh 渐变背景
category: backgrounds
tags:
  - background
  - gradient
  - mesh
  - blur
date: 2026-05-06
---

# Mesh 渐变背景

利用大模糊半径的色块叠加，形成像丝缎一样流动的渐变背景。不需要图片，纯 CSS 实现。

<CssDemo
  height="400px"
  bg="#0a0a1a"
  :html="html"
  :css="css"
/>

<script setup>
const html = `<div class="mesh-bg">
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
  <div class="blob blob-4"></div>
  <div class="mesh-content">
    <h1>Mesh Gradient</h1>
    <p>纯 CSS 实现的流畅渐变背景</p>
  </div>
</div>`

const css = `
.mesh-bg {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #0a0a1a;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: blob-move 20s ease-in-out infinite alternate;
}

.blob-1 {
  width: 400px;
  height: 400px;
  background: #ff6b6b;
  top: -10%;
  left: -10%;
  animation-duration: 18s;
}

.blob-2 {
  width: 350px;
  height: 350px;
  background: #4ecdc4;
  top: 40%;
  right: -5%;
  animation-duration: 22s;
  animation-delay: -3s;
}

.blob-3 {
  width: 300px;
  height: 300px;
  background: #a29bfe;
  bottom: -10%;
  left: 20%;
  animation-duration: 20s;
  animation-delay: -6s;
}

.blob-4 {
  width: 250px;
  height: 250px;
  background: #fd79a8;
  top: 10%;
  right: 20%;
  animation-duration: 25s;
  animation-delay: -9s;
}

@keyframes blob-move {
  0% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(50px, -30px) scale(1.1); }
  50% { transform: translate(-20px, 60px) scale(0.9); }
  75% { transform: translate(30px, -50px) scale(1.05); }
  100% { transform: translate(-40px, 20px) scale(0.95); }
}

.mesh-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

.mesh-content h1 {
  font-size: 48px;
  margin-bottom: 8px;
  letter-spacing: 4px;
}

.mesh-content p {
  font-size: 18px;
  opacity: 0.8;
}
`
</script>

## 原理说明

1. 多个 `div` 色块设置大半径 `filter: blur(80px)`，形成柔和的光晕
2. 每个色块独立的 `@keyframes` 动画，不同速度和延迟，产生流动感
3. 内容层通过 `position: relative; z-index: 1` 置于色块之上

## 配色方案参考

| 色块 | 适用场景 |
|------|----------|
| `#ff6b6b` 红 + `#4ecdc4` 青 + `#a29bfe` 紫 | 活泼创意 |
| `#667eea` 蓝 + `#764ba2` 紫 | 科技感 |
| `#f093fb` 粉 + `#f5576c` 红 | 温柔甜美 |
