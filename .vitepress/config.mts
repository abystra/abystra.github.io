import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'velax',
  description: '写代码、学架构、聊技术。',

  server: {
    host: '0.0.0.0',
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archives' },
    ],

    sidebar: false,

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 velax.cn',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com' },
    ],
  },
})
