---
title: 波纹点击按钮
description: 点击按钮时产生扩散涟漪波纹效果
category: buttons
tags:
  - button
  - ripple
  - click
  - effect
date: 2026-05-06
---

# 波纹点击按钮

点击按钮时，从点击位置向外扩散开一圈波纹，模拟水波纹效果。需要少量 JavaScript 实现动态波纹。

<CssDemo
  height="220px"
  bg="#f0f2f5"
  :html="html"
  :css="css"
  :js="js"
/>

<script setup>
const html = `<button id="ripple-btn" class="ripple-btn">
  Click Me
  <span class="ripple"></span>
</button>`

const css = `
.ripple-btn {
  position: relative;
  overflow: hidden;
  padding: 16px 48px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  outline: none;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.ripple-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.ripple-btn:active {
  transform: translateY(0);
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: scale(0);
  animation: ripple-anim 0.6s ease-out;
  pointer-events: none;
}

@keyframes ripple-anim {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
`

const js = `
document.getElementById('ripple-btn').addEventListener('click', function(e) {
  const ripple = this.querySelector('.ripple');
  const rect = this.getBoundingClientRect();

  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  // 重置动画
  ripple.style.animation = 'none';
  ripple.offsetHeight; // 强制回流以重启动画
  ripple.style.animation = 'ripple-anim 0.6s ease-out';
});
`
</script>

## 原理说明

1. 点击时获取鼠标相对于按钮的位置坐标
2. 创建一个圆形的 `<span>` 波纹元素，定位在点击点
3. 通过 CSS `@keyframes` 控制波纹从 `scale(0)` 到 `scale(4)` 放大并淡出
4. 每次点击时重置动画以重新触发

## 关键点

- 按钮必须设置 `overflow: hidden` 来裁剪波纹范围
- 使用 `pointer-events: none` 确保波纹不干扰点击
- JavaScript 需要强制回流（`offsetHeight`）来重启动画
