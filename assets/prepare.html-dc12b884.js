import{_ as r,X as l,Y as d,Z as e,$ as n,a0 as s,a5 as i,a4 as a,E as t}from"./framework-d8252107.js";const p={},u=a('<p>经过前几章的学习，我们终于有足够的前置知识理解<strong>状态更新</strong>的整个流程。</p><p>这一章我们看看几种常见的触发<strong>状态更新</strong>的方法是如何完成工作的。</p><h2 id="几个关键节点" tabindex="-1"><a class="header-anchor" href="#几个关键节点" aria-hidden="true">#</a> 几个关键节点</h2><p>在开始学习前，我们先了解源码中几个关键节点（即几个关键函数的调用）。通过这章的学习，我们会将这些关键节点的调用路径串起来。</p><p>先从我们所熟知的概念开始。</p><h3 id="render阶段的开始" tabindex="-1"><a class="header-anchor" href="#render阶段的开始" aria-hidden="true">#</a> render阶段的开始</h3>',6),v=e("p",null,[e("code",null,"render阶段"),n("开始于"),e("code",null,"performSyncWorkOnRoot"),n("或"),e("code",null,"performConcurrentWorkOnRoot"),n("方法的调用。这取决于本次更新是同步更新还是异步更新。")],-1),b=e("h3",{id:"commit阶段的开始",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#commit阶段的开始","aria-hidden":"true"},"#"),n(" commit阶段的开始")],-1),k=a(`<p><code>commit阶段</code>开始于<code>commitRoot</code>方法的调用。其中<code>rootFiber</code>会作为传参。</p><p>我们已经知道，<code>render阶段</code>完成后会进入<code>commit阶段</code>。让我们继续补全从<code>触发状态更新</code>到<code>render阶段</code>的路径。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>触发状态更新（根据场景调用不同方法）

    <span class="token operator">|</span>
    <span class="token operator">|</span>
    <span class="token function">v</span>

    ？

    <span class="token operator">|</span>
    <span class="token operator">|</span>
    <span class="token function">v</span>

render阶段（<span class="token variable"><span class="token variable">\`</span>performSyncWorkOnRoot<span class="token variable">\`</span></span> 或 <span class="token variable"><span class="token variable">\`</span>performConcurrentWorkOnRoot<span class="token variable">\`</span></span>）

    <span class="token operator">|</span>
    <span class="token operator">|</span>
    <span class="token function">v</span>

commit阶段（<span class="token variable"><span class="token variable">\`</span>commitRoot<span class="token variable">\`</span></span>）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建update对象" tabindex="-1"><a class="header-anchor" href="#创建update对象" aria-hidden="true">#</a> 创建Update对象</h3><p>在<code>React</code>中，有如下方法可以触发状态更新（排除<code>SSR</code>相关）：</p><ul><li><p>ReactDOM.render</p></li><li><p>this.setState</p></li><li><p>this.forceUpdate</p></li><li><p>useState</p></li><li><p>useReducer</p></li></ul><p>这些方法调用的场景各不相同，他们是如何接入同一套<strong>状态更新机制</strong>呢？</p><p>答案是：每次<code>状态更新</code>都会创建一个保存<strong>更新状态相关内容</strong>的对象，我们叫他<code>Update</code>。在<code>render阶段</code>的<code>beginWork</code>中会根据<code>Update</code>计算新的<code>state</code>。</p><p>我们会在下一节详细讲解<code>Update</code>。</p><h3 id="从fiber到root" tabindex="-1"><a class="header-anchor" href="#从fiber到root" aria-hidden="true">#</a> 从fiber到root</h3><p>现在<code>触发状态更新的fiber</code>上已经包含<code>Update</code>对象。</p><p>我们知道，<code>render阶段</code>是从<code>rootFiber</code>开始向下遍历。那么如何从<code>触发状态更新的fiber</code>得到<code>rootFiber</code>呢？</p><p>答案是：调用<code>markUpdateLaneFromFiberToRoot</code>方法。</p>`,13),m={href:"https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L636",target:"_blank",rel:"noopener noreferrer"},h=e("code",null,"markUpdateLaneFromFiberToRoot",-1),f=a(`<p>该方法做的工作可以概括为：从<code>触发状态更新的fiber</code>一直向上遍历到<code>rootFiber</code>，并返回<code>rootFiber</code>。</p><p>由于不同更新优先级不尽相同，所以过程中还会更新遍历到的<code>fiber</code>的优先级。这对于我们当前属于超纲内容。</p><h3 id="调度更新" tabindex="-1"><a class="header-anchor" href="#调度更新" aria-hidden="true">#</a> 调度更新</h3><p>现在我们拥有一个<code>rootFiber</code>，该<code>rootFiber</code>对应的<code>Fiber树</code>中某个<code>Fiber节点</code>包含一个<code>Update</code>。</p><p>接下来通知<code>Scheduler</code>根据<strong>更新</strong>的优先级，决定以<strong>同步</strong>还是<strong>异步</strong>的方式调度本次更新。</p><p>这里调用的方法是<code>ensureRootIsScheduled</code>。</p><p>以下是<code>ensureRootIsScheduled</code>最核心的一段代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>newCallbackPriority <span class="token operator">===</span> SyncLanePriority<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 任务已经过期，需要同步执行render阶段</span>
  newCallbackNode <span class="token operator">=</span> <span class="token function">scheduleSyncCallback</span><span class="token punctuation">(</span>
    <span class="token function">performSyncWorkOnRoot</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// 根据任务优先级异步执行render阶段</span>
  <span class="token keyword">var</span> schedulerPriorityLevel <span class="token operator">=</span> <span class="token function">lanePriorityToSchedulerPriority</span><span class="token punctuation">(</span>
    newCallbackPriority
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  newCallbackNode <span class="token operator">=</span> <span class="token function">scheduleCallback</span><span class="token punctuation">(</span>
    schedulerPriorityLevel<span class="token punctuation">,</span>
    <span class="token function">performConcurrentWorkOnRoot</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),_={href:"https://github.com/facebook/react/blob/b6df4417c79c11cfb44f965fab55b573882b1d54/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L602",target:"_blank",rel:"noopener noreferrer"},g=e("code",null,"ensureRootIsScheduled",-1),R=a(`<p>其中，<code>scheduleCallback</code>和<code>scheduleSyncCallback</code>会调用<code>Scheduler</code>提供的调度方法根据<code>优先级</code>调度回调函数执行。</p><p>可以看到，这里调度的回调函数为：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">performSyncWorkOnRoot</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">performConcurrentWorkOnRoot</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>即<code>render阶段</code>的入口函数。</p><p>至此，<code>状态更新</code>就和我们所熟知的<code>render阶段</code>连接上了。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>让我们梳理下<code>状态更新</code>的整个调用路径的关键节点：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>触发状态更新（根据场景调用不同方法）

    <span class="token operator">|</span>
    <span class="token operator">|</span>
    <span class="token function">v</span>

创建Update对象（接下来三节详解）

    <span class="token operator">|</span>
    <span class="token operator">|</span>
    <span class="token function">v</span>

从fiber到root（<span class="token variable"><span class="token variable">\`</span>markUpdateLaneFromFiberToRoot<span class="token variable">\`</span></span>）

    <span class="token operator">|</span>
    <span class="token operator">|</span>
    <span class="token function">v</span>

调度更新（<span class="token variable"><span class="token variable">\`</span>ensureRootIsScheduled<span class="token variable">\`</span></span>）

    <span class="token operator">|</span>
    <span class="token operator">|</span>
    <span class="token function">v</span>

render阶段（<span class="token variable"><span class="token variable">\`</span>performSyncWorkOnRoot<span class="token variable">\`</span></span> 或 <span class="token variable"><span class="token variable">\`</span>performConcurrentWorkOnRoot<span class="token variable">\`</span></span>）

    <span class="token operator">|</span>
    <span class="token operator">|</span>
    <span class="token function">v</span>

commit阶段（<span class="token variable"><span class="token variable">\`</span>commitRoot<span class="token variable">\`</span></span>）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1" aria-hidden="true">#</a> 总结</h2><p>本节我们了解了<strong>状态更新</strong>的整个流程。</p><p>在接下来三节中，我们会花大量篇幅讲解<code>Update</code>的工作机制，因为他是构成<code>React concurrent mode</code>的核心机制之一。</p>`,11);function y(S,x){const o=t("RouterLink"),c=t("ExternalLinkIcon");return l(),d("div",null,[u,e("p",null,[n("我们在"),s(o,{to:"/views/Books/Front-end/JustReact/process/reconciler.html"},{default:i(()=>[n("render阶段流程概览一节")]),_:1}),n("讲到，")]),v,b,e("p",null,[n("我们在"),s(o,{to:"/views/Books/Front-end/JustReact/renderer/prepare.html"},{default:i(()=>[n("commit阶段流程概览一节")]),_:1}),n("讲到，")]),k,e("blockquote",null,[e("p",null,[n("你可以从"),e("a",m,[n("这里"),s(c)]),n("看到"),h,n("的源码")])]),f,e("blockquote",null,[e("p",null,[n("你可以从"),e("a",_,[n("这里"),s(c)]),n("看到"),g,n("的源码")])]),R])}const w=r(p,[["render",y],["__file","prepare.html.vue"]]);export{w as default};
