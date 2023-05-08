import{_ as e,X as t,Y as p,Z as c,$ as n,a0 as i,a5 as o,a4 as s,E as l}from"./framework-d8252107.js";const u={},d=s(`<h1 id="类是有用的" tabindex="-1"><a class="header-anchor" href="#类是有用的" aria-hidden="true">#</a> 类是有用的</h1><p>以下结构在应用中很常见：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> someProperty<span class="token punctuation">;</span>

  <span class="token comment">// 一些其他的初始化代码</span>

  <span class="token keyword">function</span> <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 用 someProperty 做一些事情</span>
    <span class="token comment">// 可能有其他属性</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 可能有其他的方法</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    someMethod
    <span class="token comment">// 可能有其他方法</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它被称为模块模式（利用 JavaScript 的闭包）。</p>`,4),r=s(`<p>然而，开发者有时会写以下类似代码：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> someProperty<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 一些初始化代码</span>
<span class="token punctuation">}</span>

<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
someProperty <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span> <span class="token comment">// 其他初始化代码</span>

<span class="token comment">// 一些其它未导出</span>

<span class="token comment">// later</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>尽管我并不是一个特别喜欢使用<strong>继承</strong>的人，但是我确实发现让开发者使用类，可以在一定程度上更好的组织他们的代码，例如：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> someProperty<span class="token punctuation">;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 一些初始化内容</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ..code</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token function">someUtility</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// .. code</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这并不仅仅有利于开发者，在创建基于类的更出色可视化工具中，它更常见。并且，这有利于项目的理解和维护。</p><div class="hint-container tip"><p class="hint-container-title">提示</p><p>在浅层次的结构中，如果它们能够提供明显的重复使用和减少模版的好处，那么在这个观点里，我并没有错误。</p></div>`,6);function v(m,k){const a=l("RouterLink");return t(),p("div",null,[d,c("p",null,[n("如果你使用"),i(a,{to:"/views/Books/Front-end/TypescriptMaster/project/modules.html#%E6%96%87%E4%BB%B6%E6%A8%A1%E5%9D%97"},{default:o(()=>[n("文件模块")]),_:1}),n("（你确实应该将全局变量视为错误），文件中的代码与示例一样，都不是全局变量。")]),r])}const y=e(u,[["render",v],["__file","classAreUseful.html.vue"]]);export{y as default};
