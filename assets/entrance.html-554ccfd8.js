import{_ as n,X as s,Y as a,a4 as e}from"./framework-d8252107.js";const t={},p=e(`<h1 id="从入口开始" tabindex="-1"><a class="header-anchor" href="#从入口开始" aria-hidden="true">#</a> 从入口开始</h1><p>我们之前提到过 Vue.js 构建过程，在 web 应用下，我们来分析 Runtime + Compiler 构建出来的 Vue.js，它的入口是 <code>src/platforms/web/entry-runtime-with-compiler.js</code>：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">/* @flow */</span>

<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">&#39;core/config&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> warn<span class="token punctuation">,</span> cached <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/util/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mark<span class="token punctuation">,</span> measure <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/util/perf&#39;</span>

<span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;./runtime/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> query <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./util/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> compileToFunctions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./compiler/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> shouldDecodeNewlines<span class="token punctuation">,</span> shouldDecodeNewlinesForHref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./util/compat&#39;</span>

<span class="token keyword">const</span> idToTemplate <span class="token operator">=</span> <span class="token function">cached</span><span class="token punctuation">(</span><span class="token parameter">id</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> el <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
  <span class="token keyword">return</span> el <span class="token operator">&amp;&amp;</span> el<span class="token punctuation">.</span>innerHTML
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> mount <span class="token operator">=</span> <span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>$mount
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter">el<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Element<span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>

  <span class="token comment">/* istanbul ignore if */</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el <span class="token operator">===</span> document<span class="token punctuation">.</span>body <span class="token operator">||</span> el <span class="token operator">===</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token function">warn</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Do not mount Vue to &lt;html&gt; or &lt;body&gt; - mount to normal elements instead.</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> options <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$options
  <span class="token comment">// resolve template/el and convert to render function</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>options<span class="token punctuation">.</span>render<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> template <span class="token operator">=</span> options<span class="token punctuation">.</span>template
    <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> template <span class="token operator">===</span> <span class="token string">&#39;string&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;#&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          template <span class="token operator">=</span> <span class="token function">idToTemplate</span><span class="token punctuation">(</span>template<span class="token punctuation">)</span>
          <span class="token comment">/* istanbul ignore if */</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">warn</span><span class="token punctuation">(</span>
              <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Template element not found or is empty: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>options<span class="token punctuation">.</span>template<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span>
              <span class="token keyword">this</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">.</span>nodeType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        template <span class="token operator">=</span> template<span class="token punctuation">.</span>innerHTML
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;invalid template option:&#39;</span> <span class="token operator">+</span> template<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      template <span class="token operator">=</span> <span class="token function">getOuterHTML</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>template<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">/* istanbul ignore if */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">&#39;compile&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">const</span> <span class="token punctuation">{</span> render<span class="token punctuation">,</span> staticRenderFns <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">compileToFunctions</span><span class="token punctuation">(</span>template<span class="token punctuation">,</span> <span class="token punctuation">{</span>
        shouldDecodeNewlines<span class="token punctuation">,</span>
        shouldDecodeNewlinesForHref<span class="token punctuation">,</span>
        <span class="token literal-property property">delimiters</span><span class="token operator">:</span> options<span class="token punctuation">.</span>delimiters<span class="token punctuation">,</span>
        <span class="token literal-property property">comments</span><span class="token operator">:</span> options<span class="token punctuation">.</span>comments
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">)</span>
      options<span class="token punctuation">.</span>render <span class="token operator">=</span> render
      options<span class="token punctuation">.</span>staticRenderFns <span class="token operator">=</span> staticRenderFns

      <span class="token comment">/* istanbul ignore if */</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>performance <span class="token operator">&amp;&amp;</span> mark<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">mark</span><span class="token punctuation">(</span><span class="token string">&#39;compile end&#39;</span><span class="token punctuation">)</span>
        <span class="token function">measure</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">vue </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>_name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> compile</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token string">&#39;compile&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;compile end&#39;</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">mount</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */</span>
<span class="token keyword">function</span> <span class="token function">getOuterHTML</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">el</span><span class="token operator">:</span> Element</span><span class="token punctuation">)</span><span class="token operator">:</span> string <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>el<span class="token punctuation">.</span>outerHTML<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> el<span class="token punctuation">.</span>outerHTML
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> container <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    container<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>el<span class="token punctuation">.</span><span class="token function">cloneNode</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> container<span class="token punctuation">.</span>innerHTML
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

Vue<span class="token punctuation">.</span>compile <span class="token operator">=</span> compileToFunctions

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，当我们的代码执行 <code>import Vue from &#39;vue&#39;</code> 的时候，就是从这个入口执行代码来初始化 Vue， 那么 Vue 到底是什么，它是怎么初始化的，我们来一探究竟。</p><h2 id="vue-的入口" tabindex="-1"><a class="header-anchor" href="#vue-的入口" aria-hidden="true">#</a> Vue 的入口</h2><p>在这个入口 JS 的上方我们可以找到 <code>Vue</code> 的来源：<code>import Vue from &#39;./runtime/index&#39;</code>，我们先来看一下这块儿的实现，它定义在 <code>src/platforms/web/runtime/index.js</code> 中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;core/index&#39;</span>
<span class="token keyword">import</span> config <span class="token keyword">from</span> <span class="token string">&#39;core/config&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> extend<span class="token punctuation">,</span> noop <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;shared/util&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> mountComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/instance/lifecycle&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> devtools<span class="token punctuation">,</span> inBrowser<span class="token punctuation">,</span> isChrome <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/util/index&#39;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span>
  query<span class="token punctuation">,</span>
  mustUseProp<span class="token punctuation">,</span>
  isReservedTag<span class="token punctuation">,</span>
  isReservedAttr<span class="token punctuation">,</span>
  getTagNamespace<span class="token punctuation">,</span>
  isUnknownElement
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;web/util/index&#39;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> patch <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./patch&#39;</span>
<span class="token keyword">import</span> platformDirectives <span class="token keyword">from</span> <span class="token string">&#39;./directives/index&#39;</span>
<span class="token keyword">import</span> platformComponents <span class="token keyword">from</span> <span class="token string">&#39;./components/index&#39;</span>

<span class="token comment">// install platform specific utils</span>
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>mustUseProp <span class="token operator">=</span> mustUseProp
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>isReservedTag <span class="token operator">=</span> isReservedTag
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>isReservedAttr <span class="token operator">=</span> isReservedAttr
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>getTagNamespace <span class="token operator">=</span> getTagNamespace
Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>isUnknownElement <span class="token operator">=</span> isUnknownElement

<span class="token comment">// install platform runtime directives &amp; components</span>
<span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>directives<span class="token punctuation">,</span> platformDirectives<span class="token punctuation">)</span>
<span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">,</span> platformComponents<span class="token punctuation">)</span>

<span class="token comment">// install platform patch function</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__patch__ <span class="token operator">=</span> inBrowser <span class="token operator">?</span> patch <span class="token operator">:</span> noop

<span class="token comment">// public mount method</span>
<span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">$mount</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
  <span class="token parameter">el<span class="token operator">?</span><span class="token operator">:</span> string <span class="token operator">|</span> Element<span class="token punctuation">,</span>
  hydrating<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Component <span class="token punctuation">{</span>
  el <span class="token operator">=</span> el <span class="token operator">&amp;&amp;</span> inBrowser <span class="token operator">?</span> <span class="token function">query</span><span class="token punctuation">(</span>el<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">undefined</span>
  <span class="token keyword">return</span> <span class="token function">mountComponent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> el<span class="token punctuation">,</span> hydrating<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// ...</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里关键的代码是 <code>import Vue from &#39;core/index&#39;</code>，之后的逻辑都是对 Vue 这个对象做一些扩展，可以先不用看，我们来看一下真正初始化 Vue 的地方，在 <code>src/core/index.js</code> 中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> Vue <span class="token keyword">from</span> <span class="token string">&#39;./instance/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initGlobalAPI <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./global-api/index&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> isServerRendering <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/util/env&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> FunctionalRenderContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;core/vdom/create-functional-component&#39;</span>

<span class="token function">initGlobalAPI</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&#39;$isServer&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">get</span><span class="token operator">:</span> isServerRendering
<span class="token punctuation">}</span><span class="token punctuation">)</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span><span class="token class-name">Vue</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token string">&#39;$ssrContext&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* istanbul ignore next */</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$vnode <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$vnode<span class="token punctuation">.</span>ssrContext
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// expose FunctionalRenderContext for ssr runtime helper installation</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>Vue<span class="token punctuation">,</span> <span class="token string">&#39;FunctionalRenderContext&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> FunctionalRenderContext
<span class="token punctuation">}</span><span class="token punctuation">)</span>

Vue<span class="token punctuation">.</span>version <span class="token operator">=</span> <span class="token string">&#39;__VERSION__&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里有 2 处关键的代码，<code>import Vue from &#39;./instance/index&#39;</code> 和 <code>initGlobalAPI(Vue)</code>，初始化全局 Vue API（我们稍后介绍），我们先来看第一部分，在 <code>src/core/instance/index.js</code> 中：</p><h3 id="vue-的定义" tabindex="-1"><a class="header-anchor" href="#vue-的定义" aria-hidden="true">#</a> Vue 的定义</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> initMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./init&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> stateMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./state&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> renderMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./render&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> eventsMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./events&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> lifecycleMixin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./lifecycle&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> warn <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;../util/index&#39;</span>

<span class="token keyword">function</span> <span class="token function">Vue</span> <span class="token punctuation">(</span><span class="token parameter">options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">Vue</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&#39;Vue is a constructor and should be called with the \`new\` keyword&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_init</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">stateMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">eventsMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">lifecycleMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token function">renderMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> Vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们终于看到了 Vue 的庐山真面目，它实际上就是一个用 Function 实现的类，我们只能通过 <code>new Vue</code> 去实例化它。</p><p>有些同学看到这不禁想问，为何 Vue 不用 ES6 的 Class 去实现呢？我们往后看这里有很多 <code>xxxMixin</code> 的函数调用，并把 <code>Vue</code> 当参数传入，它们的功能都是给 Vue 的 prototype 上扩展一些方法（这里具体的细节会在之后的文章介绍，这里不展开），Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 难以实现的。这么做的好处是非常方便代码的维护和管理，这种编程技巧也非常值得我们去学习。</p><h3 id="initglobalapi" tabindex="-1"><a class="header-anchor" href="#initglobalapi" aria-hidden="true">#</a> <code>initGlobalAPI</code></h3><p>Vue.js 在整个初始化过程中，除了给它的原型 prototype 上扩展方法，还会给 <code>Vue</code> 这个对象本身扩展全局的静态方法，它的定义在 <code>src/core/global-api/index.js</code> 中：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">initGlobalAPI</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">Vue</span><span class="token operator">:</span> GlobalAPI</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// config</span>
  <span class="token keyword">const</span> configDef <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  configDef<span class="token punctuation">.</span><span class="token function-variable function">get</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> config
  <span class="token keyword">if</span> <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">!==</span> <span class="token string">&#39;production&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    configDef<span class="token punctuation">.</span><span class="token function-variable function">set</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">warn</span><span class="token punctuation">(</span>
        <span class="token string">&#39;Do not replace the Vue.config object, set individual fields instead.&#39;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>Vue<span class="token punctuation">,</span> <span class="token string">&#39;config&#39;</span><span class="token punctuation">,</span> configDef<span class="token punctuation">)</span>

  <span class="token comment">// exposed util methods.</span>
  <span class="token comment">// NOTE: these are not considered part of the public API - avoid relying on</span>
  <span class="token comment">// them unless you are aware of the risk.</span>
  Vue<span class="token punctuation">.</span>util <span class="token operator">=</span> <span class="token punctuation">{</span>
    warn<span class="token punctuation">,</span>
    extend<span class="token punctuation">,</span>
    mergeOptions<span class="token punctuation">,</span>
    defineReactive
  <span class="token punctuation">}</span>

  Vue<span class="token punctuation">.</span>set <span class="token operator">=</span> <span class="token keyword">set</span>
  Vue<span class="token punctuation">.</span>delete <span class="token operator">=</span> del
  Vue<span class="token punctuation">.</span>nextTick <span class="token operator">=</span> nextTick

  Vue<span class="token punctuation">.</span>options <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token constant">ASSET_TYPES</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">type</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    Vue<span class="token punctuation">.</span>options<span class="token punctuation">[</span>type <span class="token operator">+</span> <span class="token string">&#39;s&#39;</span><span class="token punctuation">]</span> <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token comment">// this is used to identify the &quot;base&quot; constructor to extend all plain-object</span>
  <span class="token comment">// components with in Weex&#39;s multi-instance scenarios.</span>
  Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>_base <span class="token operator">=</span> Vue

  <span class="token function">extend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">.</span>options<span class="token punctuation">.</span>components<span class="token punctuation">,</span> builtInComponents<span class="token punctuation">)</span>

  <span class="token function">initUse</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initMixin</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initExtend</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
  <span class="token function">initAssetRegisters</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里就是在 Vue 上扩展的一些全局方法的定义，Vue 官网中关于全局 API 都可以在这里找到，这里不会介绍细节，会在之后的章节我们具体介绍到某个 API 的时候会详细介绍。有一点要注意的是，<code>Vue.util</code> 暴露的方法最好不要依赖，因为它可能经常会发生变化，是不稳定的。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>那么至此，Vue 的初始化过程基本介绍完毕。这一节的目的是让同学们对 Vue 是什么有一个直观的认识，它本质上就是一个用 Function 实现的 Class，然后它的原型 prototype 以及它本身都扩展了一系列的方法和属性，那么 Vue 能做什么，它是怎么做的，我们会在后面的章节一层层帮大家揭开 Vue 的神秘面纱。</p>`,20),o=[p];function c(i,l){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","entrance.html.vue"]]);export{r as default};
