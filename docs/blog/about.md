---
title: 关于博主
description: 介绍博主
readingTime: false
tag:
 - 介绍
recommend: 3
sidebar: false
date: 2024-05-04 00:00:00

---

::: info Biography
一名软件工程背景的科班生。
:::

---


::: timeline 在校间
- 干过公交`大数据处理`与`地图交互`
- 嵌入式系统开发`ARM`及`AVR`板（LED阵列屏游戏开发、飞行器无线通信与控制）
- `Java`游戏开发
- `Python`应用开发
- `C`语言多服务端对多客户端游戏开发
- `OpenGL`模拟阿波罗计划飞行器登录月球等等
:::

::: timeline 毕业后
- 干过`医疗行业`前端
- 手机APP端
- `教育行业`后端教学
- `帆软大屏`数据处理与展示集团和事业单位数据
- `交通行业`前端+视频开发
:::

::: timeline 业余时
- 干过`微信小程序`
- 看`游戏开发`领域
- 视觉特效
- UI设计
- 产品研发、项目管理
- 哲学、儒释道、太极八卦
- 自然科学等内容
- [MPbug-时空葫芦-系列](https://mpbug.github.io/mpbug.tv)
- [时空葫芦播放器](https://mpbug.github.io/player/)
- `谷歌浏览器插件-魔法葫芦`等
:::

::: timeline 近来
- 因为vuepress的文档多年没更新，
- 再想重新用起来时，发现
- 无法跑起来，md页面多时，特别慢，非常卡，
- 所以尝试用vitepress来取代，顺便换了个主题，
- 从`VuePress Theme Hope`换成了`Vitepress Theme Sugarat`
- 接下来再慢慢把旧文章迁移过来
:::

---


<script setup>
import { ref, computed } from 'vue'
import { withBase, useData } from 'vitepress'
const count = ref(new Date().toLocaleString())
setInterval(() => {
    count.value=new Date().toLocaleString();
}, 1000);
</script>

{{ count }}
