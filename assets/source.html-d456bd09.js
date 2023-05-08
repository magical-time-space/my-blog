import{_ as d,X as o,Y as i,Z as e,$ as n,a0 as c,a4 as a,E as l}from"./framework-d8252107.js";const t={},r=a(`<p>了解了源码的文件目录，这一节我们看看如何调试源码。</p><p>即使版本号相同（当前最新版为<code>17.0.0 RC</code>），但是<code>facebook/react</code>项目<code>master</code>分支的代码和我们使用<code>create-react-app</code>创建的项目<code>node_modules</code>下的<code>react</code>项目代码还是有些区别。</p><p>因为<code>React</code>的新代码都是直接提交到<code>master</code>分支，而<code>create-react-app</code>内的<code>react</code>使用的是稳定版的包。</p><p>为了始终使用最新版<code>React</code>教学，我们调试源码遵循以下步骤：</p><ol><li>从<code>facebook/react</code>项目<code>master</code>分支拉取最新源码</li><li>基于最新源码构建<code>react</code>、<code>scheduler</code>、<code>react-dom</code>三个包</li><li>通过<code>create-react-app</code>创建测试项目，并使用步骤2创建的包作为项目依赖的包</li></ol><h2 id="拉取源码" tabindex="-1"><a class="header-anchor" href="#拉取源码" aria-hidden="true">#</a> 拉取源码</h2><p>拉取<code>facebook/react</code>代码</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 拉取代码</span>
<span class="token function">git</span> clone https://github.com/facebook/react.git

<span class="token comment"># 如果拉取速度很慢，可以考虑如下2个方案：</span>

<span class="token comment"># 1. 使用cnpm代理</span>
<span class="token function">git</span> clone https://github.com.cnpmjs.org/facebook/react

<span class="token comment"># 2. 使用码云的镜像（一天会与react同步一次）</span>
<span class="token function">git</span> clone https://gitee.com/mirrors/react.git

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装依赖</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 切入到react源码所在文件夹</span>
<span class="token builtin class-name">cd</span> react

<span class="token comment"># 安装依赖</span>
<span class="token function">yarn</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打包<code>react</code>、<code>scheduler</code>、<code>react-dom</code>三个包为dev环境可以使用的<code>cjs</code>包。</p>`,11),p=e("code",null,"React",-1),m={href:"https://zh-hans.reactjs.org/docs/how-to-contribute.html#development-workflow",target:"_blank",rel:"noopener noreferrer"},u=a(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># 执行打包命令</span>
<span class="token function">yarn</span> build react/index,react/jsx,react-dom/index,scheduler <span class="token parameter variable">--type</span><span class="token operator">=</span>NODE


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),v={class:"hint-container details"},b=e("summary",null,"网络不好的同学看这里",-1),h=e("p",null,[n("如果网络不好，执行"),e("code",null,"yarn"),n("命令无法完成依赖安装，或者执行"),e("code",null,"yarn build"),n("无法完成打包，可以使用我打好的包。")],-1),k=e("p",null,[n("版本为"),e("code",null,"17.0.0-alpha.0")],-1),_={href:"https://gitee.com/kasong/react",target:"_blank",rel:"noopener noreferrer"},g=a(`<p>现在源码目录<code>build/node_modules</code>下会生成最新代码的包。我们为<code>react</code>、<code>react-dom</code>创建<code>yarn link</code>。</p><blockquote><p>通过<code>yarn link</code>可以改变项目中依赖包的目录指向</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> build/node_modules/react
<span class="token comment"># 申明react指向</span>
<span class="token function">yarn</span> <span class="token function">link</span>
<span class="token builtin class-name">cd</span> build/node_modules/react-dom
<span class="token comment"># 申明react-dom指向</span>
<span class="token function">yarn</span> <span class="token function">link</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2><p>接下来我们通过<code>create-react-app</code>在其他地方创建新项目。这里我们随意起名，比如“a-react-demo”。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>npx create-react-app a-react-demo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在新项目中，将<code>react</code>与<code>react-dom</code>2个包指向<code>facebook/react</code>下我们刚才生成的包。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将项目内的react react-dom指向之前申明的包</span>
<span class="token function">yarn</span> <span class="token function">link</span> react react-dom
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在试试在<code>react/build/node_modules/react-dom/cjs/react-dom.development.js</code>中随意打印些东西。</p><p>在<code>a-react-demo</code>项目下执行<code>yarn start</code>。现在浏览器控制台已经可以打印出我们输入的东西了。</p><p>通过以上方法，我们的运行时代码就和<code>React</code>最新代码一致了。</p>`,11);function f(x,y){const s=l("ExternalLinkIcon");return o(),i("div",null,[r,e("blockquote",null,[e("p",null,[n("我们的步骤只包含具体做法，对每一步更详细的介绍可以参考"),p,n("文档"),e("a",m,[n("源码贡献章节"),c(s)])])]),u,e("details",v,[b,h,k,e("p",null,[e("a",_,[n("地址"),c(s)])])]),g])}const E=d(t,[["render",f],["__file","source.html.vue"]]);export{E as default};
