import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// const base = process.env.GITHUB_ACTIONS === 'true'
//   ? '/my-blog/'
//   : '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  base:'/my-blog/',
  lang: 'zh-cn',
  title: 'MPCauldron',
  description: '魔樽Cauldron',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    // ['link', { rel: 'icon', href: `${base}favicon.ico` }], // 修改了 base 这里也需要同步修改
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  markdown: {
    math: true
  },
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '目录',
    lastUpdatedText: '上次更新于',
    // 设置logo
    logo: '/logo.png',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '日记', items: [
          { text: 'story', link: '/blog/story/' },
          { text: '音乐', link: '/blog/story/music/' },
        ]
      },
      {
        text: '音视频', items: [
          { text: '介绍', link: '/blog/video-engineering/' },
          { text: '音乐', link: '/blog/video-engineering/music/' },
        ]
      },
      {
        text: '视觉', items: [
          {
            text: '3D', items: [
              { text: 'WebGL', link: '/blog/video-engineering/music/' },
              { text: 'WebGPU', link: '/blog/video-engineering/music/' },
              { text: 'Unity', link: '/blog/video-engineering/music/' },
              { text: 'Cesium', link: '/blog/video-engineering/music/' },
              { text: 'ThreeJS', link: '/blog/video-engineering/music/' },
              { text: 'Babylon.js', link: '/blog/video-engineering/music/' },
              { text: 'PlayCanvas', link: '/blog/video-engineering/music/' },
              { text: 'Unreal Engine 4', link: '/blog/video-engineering/music/' },
            ]
          },
          {
            text: '大屏', items: [
              { text: 'FineReport', link: '/blog/video-engineering/music/' },
            ]
          },
        ]
      },
      {
        text: '前端', items: [
          { text: '介绍', link: '/blog/front-end-engineering/about' },
          { text: 'NodeJS', link: '/blog/front-end-engineering/music/' },
          { text: 'Deno', link: '/blog/front-end-engineering/music/' },
        ]
      },
      {
        text: '后端', items: [
          { text: '介绍', link: '/blog/back-end-engineering/' },
          { text: '音乐', link: '/blog/back-end-engineering/music/' },
        ]
      },
      { text: '关于博主', link: '/blog/about' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/mpbug'
      },
      {
        icon: 'gitee',
        link: 'https://gitee.com/mpbug'
      }
    ]
  },
})
