// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '魔樽Cauldron',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 魔樽Cauldron',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // 如果npx pagefind 时间过长，可以手动将其安装为项目依赖 pnpm add pagefind
  // search: false,

  // 页脚
  // footer: {
  //   // message 字段支持配置为HTML内容，配置多条可以配置为数组,
  //   message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
  //   copyright: 'MIT License | 魔樽Cauldron',
  //   icpRecord: {
  //     name: '蜀ICP备19011724号',
  //     link: 'https://beian.miit.gov.cn/'
  //   },
  //   securityRecord: {
  //     name: '公网安备xxxxx',
  //     link: 'https://www.beian.gov.cn/portal/index.do'
  //   },
  // },

  // 主题色修改
  themeColor: 'el-yellow',
  // 内置的颜色主题
  // 'vp-default': 'vp-default',
  // 'vp-green': 'vp-green',
  // 'vp-yellow': 'vp-yellow',
  // 'vp-red': 'vp-red',
  // 'el-blue': 'el-blue',
  // 'el-yellow': 'el-yellow',
  // 'el-green': 'el-green',
  // 'el-red': 'el-red'

  // 文章默认作者
  author: '魔樽Cauldron',

  homeTags: false,
  hotArticle: false,
  // {
  //   title: '🔥 精选文章',
  //   nextText: '换一组',
  //   pageSize: 9,
  //   empty: '暂无精选内容'
  // },

  // comment: {
  //   repo: 'ATQQ/sugar-blog',
  //   repoId: 'MDEwOlJlcG9zaXRvcnkyNDEyNDUyOTk',
  //   category: 'Announcements',
  //   categoryId: 'DIC_kwDODmEcc84COVc6',
  //   inputPosition: 'top',
  // },

  // 友链
  friend: [
    {
      nickname: 'Vitepress',
      des: 'Vite & Vue Powered Static Site Generator',
      avatar:
        'https://vitepress.dev/vitepress-logo-large.webp',
      url: 'https://vitepress.dev/zh/guide/markdown',
    },
    {
      nickname: 'Markdown.速查表',
      des: 'Markdown 速查表提供了所有 Markdown 语法元素的基本解释。如果你想了解某些语法元素的更多信息，请参阅更详细的 基本语法 和 扩展语法.',
      avatar:
        'https://markdown.com.cn/hero.png',
      url: 'https://markdown.com.cn/cheat-sheet.html',
    },
    {
      nickname: 'Sugarat主题',
      des: 'Vitepress Sugarat Theme',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://theme.sugarat.top/changelog.html',
    },
  ],

  alert: {
    type: 'success',
    title: '博客文章迁移更新新主题啦🎉',
    duration: 3000
  },
  // 公告
  popover: {
    title: '公告',
    body: [
      // { type: 'text', content: '👇公众号👇---👇 微信 👇' },
      // {
      //   type: 'image',
      //   src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210'
      // },
      {
        type: 'text',
        content: '博客迁移升级中...'
      },
      // {
      //   type: 'text',
      //   content: '文章首/文尾有群二维码',
      //   style: 'padding-top:0'
      // },
      // {
      //   type: 'button',
      //   content: '作者博客',
      //   link: 'https://sugarat.top'
      // },
      // {
      //   type: 'button',
      //   content: '加群交流',
      //   props: {
      //     type: 'success'
      //   },
      //   link: 'https://theme.sugarat.top/group.html',
      // }
    ],
    duration: 1000
  },
})

export { blogTheme }
