import{_ as i,X as l,Y as u,Z as n,$ as s,a0 as a,a5 as c,a4 as o,E as p}from"./framework-d8252107.js";const d={},r=n("code",null,"commitRoot",-1),k=n("code",null,"commit阶段",-1),v=n("code",null,"fiberRootNode",-1),m=o(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">commitRoot</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在<code>rootFiber.firstEffect</code>上保存了一条需要执行<code>副作用</code>的<code>Fiber节点</code>的单向链表<code>effectList</code>，这些<code>Fiber节点</code>的<code>updateQueue</code>中保存了变化的<code>props</code>。</p><p>这些<code>副作用</code>对应的<code>DOM操作</code>在<code>commit</code>阶段执行。</p><p>除此之外，一些生命周期钩子（比如<code>componentDidXXX</code>）、<code>hook</code>（比如<code>useEffect</code>）需要在<code>commit</code>阶段执行。</p><p><code>commit</code>阶段的主要工作（即<code>Renderer</code>的工作流程）分为三部分：</p><ul><li><p>before mutation阶段（执行<code>DOM</code>操作前）</p></li><li><p>mutation阶段（执行<code>DOM</code>操作）</p></li><li><p>layout阶段（执行<code>DOM</code>操作后）</p></li></ul>`,6),f={href:"https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2001",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"commit",-1),h=o(`<p>在<code>before mutation阶段</code>之前和<code>layout阶段</code>之后还有一些额外工作，涉及到比如<code>useEffect</code>的触发、<code>优先级相关</code>的重置、<code>ref</code>的绑定/解绑。</p><p>这些对我们当前属于超纲内容，为了内容完整性，在这节简单介绍。</p><h2 id="before-mutation之前" tabindex="-1"><a class="header-anchor" href="#before-mutation之前" aria-hidden="true">#</a> before mutation之前</h2><p><code>commitRootImpl</code>方法中直到第一句<code>if (firstEffect !== null)</code>之前属于<code>before mutation</code>之前。</p><p>我们大体看下他做的工作，现在你还不需要理解他们：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token comment">// 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务</span>
    <span class="token function">flushPassiveEffects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>rootWithPendingPassiveEffects <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// root指 fiberRootNode</span>
  <span class="token comment">// root.finishedWork指当前应用的rootFiber</span>
  <span class="token keyword">const</span> finishedWork <span class="token operator">=</span> root<span class="token punctuation">.</span>finishedWork<span class="token punctuation">;</span>

  <span class="token comment">// 凡是变量名带lane的都是优先级相关</span>
  <span class="token keyword">const</span> lanes <span class="token operator">=</span> root<span class="token punctuation">.</span>finishedLanes<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>finishedWork <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  root<span class="token punctuation">.</span>finishedWork <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  root<span class="token punctuation">.</span>finishedLanes <span class="token operator">=</span> NoLanes<span class="token punctuation">;</span>

  <span class="token comment">// 重置Scheduler绑定的回调函数</span>
  root<span class="token punctuation">.</span>callbackNode <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  root<span class="token punctuation">.</span>callbackId <span class="token operator">=</span> NoLanes<span class="token punctuation">;</span>

  <span class="token keyword">let</span> remainingLanes <span class="token operator">=</span> <span class="token function">mergeLanes</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>lanes<span class="token punctuation">,</span> finishedWork<span class="token punctuation">.</span>childLanes<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 重置优先级相关变量</span>
  <span class="token function">markRootFinished</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> remainingLanes<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>rootsWithPendingDiscreteUpdates <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token operator">!</span><span class="token function">hasDiscreteLanes</span><span class="token punctuation">(</span>remainingLanes<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
      rootsWithPendingDiscreteUpdates<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      rootsWithPendingDiscreteUpdates<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 重置全局变量</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> workInProgressRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    workInProgressRoot <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    workInProgress <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    workInProgressRootRenderLanes <span class="token operator">=</span> NoLanes<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 将effectList赋值给firstEffect</span>
  <span class="token comment">// 由于每个fiber的effectList只包含他的子孙节点</span>
  <span class="token comment">// 所以根节点如果有effectTag则不会被包含进来</span>
  <span class="token comment">// 所以这里将有effectTag的根节点插入到effectList尾部</span>
  <span class="token comment">// 这样才能保证有effect的fiber都在effectList中</span>
  <span class="token keyword">let</span> firstEffect<span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>effectTag <span class="token operator">&gt;</span> PerformedWork<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>lastEffect <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      finishedWork<span class="token punctuation">.</span>lastEffect<span class="token punctuation">.</span>nextEffect <span class="token operator">=</span> finishedWork<span class="token punctuation">;</span>
      firstEffect <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>firstEffect<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      firstEffect <span class="token operator">=</span> finishedWork<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 根节点没有effectTag</span>
    firstEffect <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>firstEffect<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code>before mutation</code>之前主要做一些变量赋值，状态重置的工作。</p><p>这一长串代码我们只需要关注最后赋值的<code>firstEffect</code>，在<code>commit</code>的三个子阶段都会用到他。</p><h2 id="layout之后" tabindex="-1"><a class="header-anchor" href="#layout之后" aria-hidden="true">#</a> layout之后</h2><p>接下来让我们简单看下<code>layout</code>阶段执行完后的代码，现在你还不需要理解他们：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> rootDidHavePassiveEffects <span class="token operator">=</span> rootDoesHavePassiveEffects<span class="token punctuation">;</span>

<span class="token comment">// useEffect相关</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>rootDoesHavePassiveEffects<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  rootDoesHavePassiveEffects <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  rootWithPendingPassiveEffects <span class="token operator">=</span> root<span class="token punctuation">;</span>
  pendingPassiveEffectsLanes <span class="token operator">=</span> lanes<span class="token punctuation">;</span>
  pendingPassiveEffectsRenderPriority <span class="token operator">=</span> renderPriorityLevel<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 性能优化相关</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>remainingLanes <span class="token operator">!==</span> NoLanes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableSchedulerTracing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>

<span class="token comment">// 性能优化相关</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>enableSchedulerTracing<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>rootDidHavePassiveEffects<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ...检测无限循环的同步任务</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span>remainingLanes <span class="token operator">===</span> SyncLane<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span> 

<span class="token comment">// 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度</span>
<span class="token function">ensureRootIsScheduled</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// ...处理未捕获错误及老版本遗留的边界问题</span>


<span class="token comment">// 执行同步任务，这样同步任务不需要等到下次事件循环再执行</span>
<span class="token comment">// 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行</span>
<span class="token comment">// 或useLayoutEffect</span>
<span class="token function">flushSyncCallbackQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),_={href:"https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2195",target:"_blank",rel:"noopener noreferrer"},y=n("p",null,"主要包括三点内容：",-1),g=n("ol",null,[n("li",null,[n("code",null,"useEffect"),s("相关的处理。")])],-1),w=n("p",null,[s("我们会在讲解"),n("code",null,"layout阶段"),s("时讲解。")],-1),E=n("ol",{start:"2"},[n("li",null,"性能追踪相关。")],-1),L=n("code",null,"interaction",-1),P=n("code",null,"React",-1),W={href:"https://zh-hans.reactjs.org/docs/profiler.html",target:"_blank",rel:"noopener noreferrer"},R={href:"https://github.com/facebook/react-devtools/pull/1069",target:"_blank",rel:"noopener noreferrer"},D={href:"https://gist.github.com/bvaughn/8de925562903afd2e7a12554adcdda16#overview",target:"_blank",rel:"noopener noreferrer"},j=o('<ol start="3"><li>在<code>commit</code>阶段会触发一些生命周期钩子（如 <code>componentDidXXX</code>）和<code>hook</code>（如<code>useLayoutEffect</code>、<code>useEffect</code>）。</li></ol><p>在这些回调方法中可能触发新的更新，新的更新会开启新的<code>render-commit</code>流程。考虑如下Demo：</p>',2),x={class:"hint-container details"},N=o(`<summary>useLayoutEffect Demo</summary><p>在该Demo中我们点击页面中的数字，状态会先变为0，再在<code>useLayoutEffect</code>回调中变为随机数。但在页面上数字不会变为0，而是直接变为新的随机数。</p><p>这是因为<code>useLayoutEffect</code>会在<code>layout阶段</code>同步执行回调。回调中我们触发了状态更新<code>setCount(randomNum)</code>，这会重新调度一个同步任务。</p><p>该任务会在在如上<code>commitRoot</code>倒数第二行代码处被同步执行。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">flushSyncCallbackQueue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>所以我们看不到页面中元素先变为0。</p><p>如果换成<code>useEffect</code>多点击几次就能看到区别。</p>`,7),B=n("strong",null,"908",-1);function I(F,S){const t=p("RouterLink"),e=p("ExternalLinkIcon");return l(),u("div",null,[n("p",null,[s("上一章"),a(t,{to:"/views/Books/Front-end/JustReact/process/completeWork.html#%E6%B5%81%E7%A8%8B%E7%BB%93%E5%B0%BE"},{default:c(()=>[s("最后一节")]),_:1}),s("我们介绍了，"),r,s("方法是"),k,s("工作的起点。"),v,s("会作为传参。")]),m,n("p",null,[s("你可以从"),n("a",f,[s("这里"),a(e)]),s("看到"),b,s("阶段的完整代码")]),h,n("blockquote",null,[n("p",null,[s("你可以在"),n("a",_,[s("这里"),a(e)]),s("看到这段代码")])]),y,g,w,E,n("p",null,[s("源码里有很多和"),L,s("相关的变量。他们都和追踪"),P,s("渲染时间、性能相关，在"),n("a",W,[s("Profiler API"),a(e)]),s("和"),n("a",R,[s("DevTools"),a(e)]),s("中使用。")]),n("blockquote",null,[n("p",null,[s("你可以在这里看到"),n("a",D,[s("interaction的定义"),a(e)])])]),j,n("details",x,[N,n("p",null,[a(t,{to:"/views/Books/Front-end/JustReact/me.html"},{default:c(()=>[s("关注公众号")]),_:1}),s("，后台回复"),B,s("获得在线Demo地址")])])])}const X=i(d,[["render",I],["__file","prepare.html.vue"]]);export{X as default};
