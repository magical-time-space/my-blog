import{_ as c,X as l,Y as i,Z as s,$ as n,a0 as a,a5 as r,a4 as e,E as t}from"./framework-d8252107.js";const d={},u=s("h1",{id:"名义化类型",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#名义化类型","aria-hidden":"true"},"#"),n(" 名义化类型")],-1),k={href:"https://basarat.gitbooks.io/typescript/content/docs/why-typescript.html",target:"_blank",rel:"noopener noreferrer"},v=e(`<p>这有一些社区使用的方式，我按照个人喜好降序排列：</p><h2 id="使用字面量类型" tabindex="-1"><a class="header-anchor" href="#使用字面量类型" aria-hidden="true">#</a> 使用字面量类型</h2><p>这种模式使用泛型和字面量类型：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 泛型 Id 类型</span>
<span class="token keyword">type</span> <span class="token class-name">Id<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token builtin">string</span><span class="token operator">&gt;</span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">;</span>
  value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 特殊的 Id 类型</span>
<span class="token keyword">type</span> <span class="token class-name">FooId</span> <span class="token operator">=</span> Id<span class="token operator">&lt;</span><span class="token string">&#39;foo&#39;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="token keyword">type</span> <span class="token class-name">BarId</span> <span class="token operator">=</span> Id<span class="token operator">&lt;</span><span class="token string">&#39;bar&#39;</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>

<span class="token comment">// 可选：构造函数</span>
<span class="token keyword">const</span> createFoo <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> FooId <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&#39;foo&#39;</span><span class="token punctuation">,</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> createBar <span class="token operator">=</span> <span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> BarId <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token operator">:</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">,</span> value <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> foo <span class="token operator">=</span> <span class="token function">createFoo</span><span class="token punctuation">(</span><span class="token string">&#39;sample&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> bar <span class="token operator">=</span> <span class="token function">createBar</span><span class="token punctuation">(</span><span class="token string">&#39;sample&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

foo <span class="token operator">=</span> bar<span class="token punctuation">;</span> <span class="token comment">// Error</span>
foo <span class="token operator">=</span> foo<span class="token punctuation">;</span> <span class="token comment">// Okey</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>优点 <ul><li>不需要类型断言。</li></ul></li><li>缺点 <ul><li>如上结构 <code>{type,value}</code> 可能不那么尽如人意，而且需要服务器序列化支持。</li></ul></li></ul><h2 id="使用枚举" tabindex="-1"><a class="header-anchor" href="#使用枚举" aria-hidden="true">#</a> 使用枚举</h2>`,6),m=e(`<p>解决办法包括：</p><ul><li>创建一个只有名字的枚举；</li><li>利用这个枚举与实际结构体创建一个交叉类型（<code>&amp;</code>）。</li></ul><p>如下所示，当实际结构体仅仅是一个字符串时：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// FOO</span>
<span class="token keyword">enum</span> FooIdBrand <span class="token punctuation">{</span>
  _ <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">FooId</span> <span class="token operator">=</span> FooIdBrand <span class="token operator">&amp;</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">// BAR</span>
<span class="token keyword">enum</span> BarIdBrand <span class="token punctuation">{</span>
  _ <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> <span class="token class-name">BarId</span> <span class="token operator">=</span> BarIdBrand <span class="token operator">&amp;</span> <span class="token builtin">string</span><span class="token punctuation">;</span>

<span class="token comment">// user</span>

<span class="token keyword">let</span> fooId<span class="token operator">:</span> FooId<span class="token punctuation">;</span>
<span class="token keyword">let</span> barId<span class="token operator">:</span> BarId<span class="token punctuation">;</span>

<span class="token comment">// 类型安全</span>
fooId <span class="token operator">=</span> barId<span class="token punctuation">;</span> <span class="token comment">// error</span>
barId <span class="token operator">=</span> fooId<span class="token punctuation">;</span> <span class="token comment">// error</span>

<span class="token comment">// 创建一个新的</span>
fooId <span class="token operator">=</span> <span class="token string">&#39;foo&#39;</span> <span class="token keyword">as</span> FooId<span class="token punctuation">;</span>
barId <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span> <span class="token keyword">as</span> BarId<span class="token punctuation">;</span>

<span class="token comment">// 两种类型都与基础兼容</span>
<span class="token keyword">let</span> str<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
str <span class="token operator">=</span> fooId<span class="token punctuation">;</span>
str <span class="token operator">=</span> barId<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意上文中的 <code>FooIdBrand</code> 与 <code>BarIdBrand</code>，它们都有一个 <code>_</code> 映射到空字符串的成员，即 <code>{ _ = &#39;&#39; }</code>。这可以强制 TypeScript 推断出这是一个基于字符串的枚举，而不是一个数字类型的枚举。这是很重要的，因为 TypeScript 会把一个空的枚举类型（<code>{}</code>）推断为一个数字类型的枚举，在 TypeScript 3.6.2 版本及其以上时，数字类型的枚举与 <code>string</code> 的交叉类型是 <code>never</code>。</p><h2 id="使用接口" tabindex="-1"><a class="header-anchor" href="#使用接口" aria-hidden="true">#</a> 使用接口</h2>`,6),b=s("code",null,"number",-1),y=s("code",null,"enum",-1),I=s("code",null,"_",-1),g=s("code",null,"Brand",-1),h={href:"https://github.com/Microsoft/TypeScript/blob/7b48a182c05ea4dea81bab73ecbbe9e013a79e99/src/compiler/types.ts#L693-L698",target:"_blank",rel:"noopener noreferrer"},_=e(`<p>解决办法包括：</p><ul><li>在类型上添加一个不用的属性，用来打破类型兼容性；</li><li>在新建或向下转换类型的时候使用断言。</li></ul><p>如下所示：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// FOO</span>
<span class="token keyword">interface</span> <span class="token class-name">FooId</span> <span class="token keyword">extends</span> <span class="token class-name">String</span> <span class="token punctuation">{</span>
  _fooIdBrand<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 防止类型错误</span>
<span class="token punctuation">}</span>

<span class="token comment">// BAR</span>
<span class="token keyword">interface</span> <span class="token class-name">BarId</span> <span class="token keyword">extends</span> <span class="token class-name">String</span> <span class="token punctuation">{</span>
  _barIdBrand<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span> <span class="token comment">// 防止类型错误</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用</span>
<span class="token keyword">let</span> fooId<span class="token operator">:</span> FooId<span class="token punctuation">;</span>
<span class="token keyword">let</span> barId<span class="token operator">:</span> BarId<span class="token punctuation">;</span>

<span class="token comment">// 类型安全</span>
fooId <span class="token operator">=</span> barId<span class="token punctuation">;</span> <span class="token comment">// error</span>
barId <span class="token operator">=</span> fooId<span class="token punctuation">;</span> <span class="token comment">// error</span>
fooId <span class="token operator">=</span> <span class="token operator">&lt;</span>FooId<span class="token operator">&gt;</span>barId<span class="token punctuation">;</span> <span class="token comment">// error</span>
barId <span class="token operator">=</span> <span class="token operator">&lt;</span>BarId<span class="token operator">&gt;</span>fooId<span class="token punctuation">;</span> <span class="token comment">// error</span>

<span class="token comment">// 创建新的</span>
fooId <span class="token operator">=</span> <span class="token string">&#39;foo&#39;</span> <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
barId <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span> <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">;</span>

<span class="token comment">// 如果你需要以字符串作为基础</span>
<span class="token keyword">var</span> str<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
str <span class="token operator">=</span> fooId <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
str <span class="token operator">=</span> barId <span class="token keyword">as</span> <span class="token builtin">any</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4);function f(w,B){const p=t("ExternalLinkIcon"),o=t("RouterLink");return l(),i("div",null,[u,s("p",null,[n("TypeScript 的类型系统是结构化的，"),s("a",k,[n("这也是其主要的优点之一"),a(p)]),n("。然而，在实际的特定用例中，有时尽管变量具有相同的结构，你也想将他们视为不同类型。一个非常常见的用例是身份类型结构（它们可能只是在 C# 或者 Java 中表示一个它们语义化名字的字符串）。")]),v,s("p",null,[n("TypeScript 中"),a(o,{to:"/views/Books/Front-end/TypescriptMaster/typings/enums.html"},{default:r(()=>[n("枚举")]),_:1}),n(" 提供一定程度的名义化类型。如果两个枚举的命名不相同，则它们类型不相等。我们可以利用这个事实来为结构上兼容的类型，提供名义化类型。")]),m,s("p",null,[n("因为 "),b,n(" 类型与 "),y,n(" 类型在类型上是兼容的，因此我们不能使用上述提到的方法来处理它们。取而代之，我们可以使用接口打破这种类型的兼容性。TypeScript 编译团队仍然在使用这种方法，因此它值得一提。使用 "),I,n(" 前缀和 "),g,n(" 后缀是一种我强烈推荐的惯例方法（"),s("a",h,[n("TypeScript 也这么推荐"),a(p)]),n("）。")]),_])}const F=c(d,[["render",f],["__file","nominalTyping.html.vue"]]);export{F as default};
