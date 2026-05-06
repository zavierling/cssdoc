import DefaultTheme from 'vitepress/theme'
import CssDemo from './components/CssDemo.vue'
import type { Theme } from 'vitepress'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件，Markdown 中可直接使用 <CssDemo>
    app.component('CssDemo', CssDemo)
  },
} satisfies Theme
