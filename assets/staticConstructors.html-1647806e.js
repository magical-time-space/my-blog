import{_ as s,X as n,Y as a,a4 as t}from"./framework-d8252107.js";const e={},c=t(`<h1 id="typescript-中的静态构造函数" tabindex="-1"><a class="header-anchor" href="#typescript-中的静态构造函数" aria-hidden="true">#</a> TypeScript 中的静态构造函数</h1><p>TypeScript 中的 <code>class</code> （JavaScript 中的 <code>class</code>）没有静态构造函数的功能，但是你可以通过调用它自己来获取相同的效果：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token function">initalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

MyClass<span class="token punctuation">.</span><span class="token function">initalize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),i=[c];function p(o,l){return n(),a("div",null,i)}const d=s(e,[["render",p],["__file","staticConstructors.html.vue"]]);export{d as default};
