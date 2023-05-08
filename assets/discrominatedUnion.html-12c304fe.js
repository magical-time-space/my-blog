import{_ as c,X as i,Y as l,Z as s,$ as n,a0 as a,a5 as u,a4 as t,E as e}from"./framework-d8252107.js";const r={},d=s("h1",{id:"辨析联合类型",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#辨析联合类型","aria-hidden":"true"},"#"),n(" 辨析联合类型")],-1),k=t(`<p>作为一个例子，考虑 <code>Square</code> 和 <code>Rectangle</code> 的联合类型 <code>Shape</code>。<code>Square</code> 和 <code>Rectangle</code>有共同成员 <code>kind</code>，因此 <code>kind</code> 存在于 <code>Shape</code> 中。</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Square</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&#39;square&#39;</span><span class="token punctuation">;</span>
  size<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&#39;rectangle&#39;</span><span class="token punctuation">;</span>
  width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Square <span class="token operator">|</span> Rectangle<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你使用类型保护风格的检查（<code>==</code>、<code>===</code>、<code>!=</code>、<code>!==</code>）或者使用具有判断性的属性（在这里是 <code>kind</code>），TypeScript 将会认为你会使用的对象类型一定是拥有特殊字面量的，并且它会为你自动把类型范围变小：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;square&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 现在 TypeScript 知道 s 的类型是 Square</span>
    <span class="token comment">// 所以你现在能安全使用它</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 不是一个 square ？因此 TypeScript 将会推算出 s 一定是 Rectangle</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>width <span class="token operator">*</span> s<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="详细的检查" tabindex="-1"><a class="header-anchor" href="#详细的检查" aria-hidden="true">#</a> 详细的检查</h2><p>通常，联合类型的成员有一些自己的行为（代码）：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">Square</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&#39;square&#39;</span><span class="token punctuation">;</span>
  size<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">interface</span> <span class="token class-name">Rectangle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&#39;rectangle&#39;</span><span class="token punctuation">;</span>
  width<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  height<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 有人仅仅是添加了 \`Circle\` 类型</span>
<span class="token comment">// 我们可能希望 TypeScript 能在任何被需要的地方抛出错误</span>
<span class="token keyword">interface</span> <span class="token class-name">Circle</span> <span class="token punctuation">{</span>
  kind<span class="token operator">:</span> <span class="token string">&#39;circle&#39;</span><span class="token punctuation">;</span>
  radius<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> <span class="token class-name">Shape</span> <span class="token operator">=</span> Square <span class="token operator">|</span> Rectangle <span class="token operator">|</span> Circle<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个可能会让你的代码变差的例子：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;square&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;rectangle&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>width <span class="token operator">*</span> s<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 如果你能让 TypeScript 给你一个错误，这是不是很棒？</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以通过一个简单的向下思想，来确保块中的类型被推断为与 <code>never</code> 类型兼容的类型。例如，你可以添加一个更详细的检查来捕获错误：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;square&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;rectangle&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>width <span class="token operator">*</span> s<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// Error: &#39;Circle&#39; 不能被赋值给 &#39;never&#39;</span>
    <span class="token keyword">const</span> _exhaustiveCheck<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> s<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它将强制你添加一种新的条件：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;square&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;rectangle&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>width <span class="token operator">*</span> s<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind <span class="token operator">===</span> <span class="token string">&#39;circle&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> s<span class="token punctuation">.</span>radius <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// ok</span>
    <span class="token keyword">const</span> _exhaustiveCheck<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> s<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="switch" tabindex="-1"><a class="header-anchor" href="#switch" aria-hidden="true">#</a> Switch</h2><div class="hint-container tip"><p class="hint-container-title">提示</p><p>你可以通过 <code>switch</code> 来实现以上例子。</p></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;square&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;rectangle&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>width <span class="token operator">*</span> s<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;circle&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> s<span class="token punctuation">.</span>radius <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">const</span> _exhaustiveCheck<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> s<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="strictnullchecks" tabindex="-1"><a class="header-anchor" href="#strictnullchecks" aria-hidden="true">#</a> strictNullChecks</h2><p>如果你使用 <code>strictNullChecks</code> 选项来做详细的检查，你应该返回 <code>_exhaustiveCheck</code> 变量（类型是 <code>never</code>），否则 TypeScript 可能会推断返回值为 <code>undefined</code>：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">area</span><span class="token punctuation">(</span>s<span class="token operator">:</span> Shape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>s<span class="token punctuation">.</span>kind<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;square&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>size <span class="token operator">*</span> s<span class="token punctuation">.</span>size<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;rectangle&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> s<span class="token punctuation">.</span>width <span class="token operator">*</span> s<span class="token punctuation">.</span>height<span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;circle&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span> <span class="token operator">*</span> s<span class="token punctuation">.</span>radius <span class="token operator">**</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">const</span> _exhaustiveCheck<span class="token operator">:</span> <span class="token builtin">never</span> <span class="token operator">=</span> s<span class="token punctuation">;</span>
      <span class="token keyword">return</span> _exhaustiveCheck<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="redux" tabindex="-1"><a class="header-anchor" href="#redux" aria-hidden="true">#</a> Redux</h2><p>Redux 库正是使用的上述例子。</p>`,21),v={href:"https://github.com/reduxjs/redux#the-gist",target:"_blank",rel:"noopener noreferrer"},m=t(`<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;redux&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">Action</span> <span class="token operator">=</span>
  <span class="token operator">|</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">&#39;INCREMENT&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token operator">|</span> <span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">&#39;DECREMENT&#39;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * This is a reducer, a pure function with (state, action) =&gt; state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a \`switch\` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */</span>
<span class="token keyword">function</span> <span class="token function">counter</span><span class="token punctuation">(</span>state <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> action<span class="token operator">:</span> Action<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;INCREMENT&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">&#39;DECREMENT&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Create a Redux store holding the state of your app.</span>
<span class="token comment">// Its API is { subscribe, dispatch, getState }.</span>
<span class="token keyword">let</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// You can use subscribe() to update the UI in response to state changes.</span>
<span class="token comment">// Normally you&#39;d use a view binding library (e.g. React Redux) rather than subscribe() directly.</span>
<span class="token comment">// However it can also be handy to persist the current state in the localStorage.</span>

store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// The only way to mutate the internal state is to dispatch an action.</span>
<span class="token comment">// The actions can be serialized, logged or stored and later replayed.</span>
store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&#39;INCREMENT&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 1</span>
store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&#39;INCREMENT&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 2</span>
store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&#39;DECREMENT&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与 TypeScript 一起使用可以有效的防止拼写错误，并且能提高重构和书写文档化代码的能力。</p>`,2);function b(h,y){const p=e("RouterLink"),o=e("ExternalLinkIcon");return i(),l("div",null,[d,s("p",null,[n("当类中含有"),a(p,{to:"/views/Books/Front-end/TypescriptMaster/typings/literals.html"},{default:u(()=>[n("字面量成员")]),_:1}),n("时，我们可以用该类的属性来辨析联合类型。")]),k,s("p",null,[n("以下是添加了 TypeScript 类型注解的"),s("a",v,[n("redux 要点"),a(o)]),n("。")]),m])}const w=c(r,[["render",b],["__file","discrominatedUnion.html.vue"]]);export{w as default};
