import{_ as n,X as s,Y as a,a4 as e}from"./framework-d8252107.js";const t={},i=e(`<h1 id="构建切换" tabindex="-1"><a class="header-anchor" href="#构建切换" aria-hidden="true">#</a> 构建切换</h1><p>根据 JavaScript 项目的运行环境进行切换环境变量是很常见的，通过 webpack 可以很轻松地做到这一点，因为它支持基于环境变量的死代码排除。</p><p>在你的 <code>package.json script</code> 里，添加不同的编译目标：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token comment">//&quot;build:test&quot;: &quot;webpack -p --config ./src/webpack.config.js&quot;,</span>
<span class="token comment">//&quot;build:prod&quot;: &quot;webpack -p --define process?.env?.NODE_ENV=&#39;\\&quot;production\\&quot;&#39; --config ./src/webpack.config.js&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当然，假设你已经安装了 webpack <code>npm install webpack</code>，现在，你可以运行 <code>npm run build:test</code> 了。</p><p>使用环境变量也超级简单：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token doc-comment comment">/**
 * This interface makes sure we don&#39;t miss adding a property to both \`prod\` and \`test\`
 */</span>
<span class="token keyword">interface</span> <span class="token class-name">Config</span> <span class="token punctuation">{</span>
  someItem<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * We only export a single thing. The config.
 */</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> config<span class="token operator">:</span> Config<span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * \`p<wbr>rocess.env.NODE_ENV\` definition is driven from webpack
 *
 * The whole \`else\` block will be removed in the emitted JavaScript
 *  for a production build
 */</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  config <span class="token operator">=</span> <span class="token punctuation">{</span>
    someItem<span class="token operator">:</span> <span class="token string">&#39;prod&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Running in prod&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  config <span class="token operator">=</span> <span class="token punctuation">{</span>
    someItem<span class="token operator">:</span> <span class="token string">&#39;test&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Running in test&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>我们使用 <code>p<wbr>rocess.env.NODE_ENV</code> 仅仅是因为绝大多数 JavaScript 库中都使用此变量，例如：<code>React</code>。</p></div>`,8),o=[i];function c(p,l){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","buildToggles.html.vue"]]);export{u as default};
