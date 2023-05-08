import{_ as s,X as n,Y as a,a4 as e}from"./framework-d8252107.js";const t={},o=e(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 配置用户信息</span>
$ git config <span class="token operator">--</span>global user<span class="token punctuation">.</span>name <span class="token string">&quot;qq&quot;</span>
$ git config <span class="token operator">--</span>global user<span class="token punctuation">.</span>email <span class="token string">&quot;123456@qq.com&quot;</span>

<span class="token comment">// 链接测试 </span>
$ ssh <span class="token operator">-</span><span class="token constant">T</span> git@github<span class="token punctuation">.</span>com

<span class="token comment">// 创建密钥</span>
$ ssh<span class="token operator">-</span>keygen <span class="token operator">-</span>t rsa <span class="token operator">-</span><span class="token constant">C</span> <span class="token string">&quot;123456@qq.com&quot;</span>
$ ssh<span class="token operator">-</span>keygen <span class="token operator">-</span>t ed25519 <span class="token operator">-</span><span class="token constant">C</span> <span class="token string">&quot;your_email@example.com&quot;</span>
$ ssh<span class="token operator">-</span>keygen <span class="token operator">-</span>t rsa <span class="token operator">-</span>b <span class="token number">4096</span> <span class="token operator">-</span><span class="token constant">C</span> <span class="token string">&quot;your_email@example.com&quot;</span>

<span class="token comment">// 启动ssh-agent</span>
# start the ssh<span class="token operator">-</span>agent <span class="token keyword">in</span> the background
$ eval <span class="token string">&quot;$(ssh-agent -s)&quot;</span>
<span class="token operator">&gt;</span> Agent pid <span class="token number">59566</span>

<span class="token comment">// 添加密钥</span>
ssh<span class="token operator">-</span>add <span class="token operator">-</span><span class="token constant">L</span>
$ ssh<span class="token operator">-</span>add <span class="token constant">YOUR</span><span class="token operator">-</span><span class="token constant">KEY</span>
$ ssh<span class="token operator">-</span>add <span class="token operator">~</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh<span class="token operator">/</span>id_rsa

<span class="token comment">// 设置配置</span>
touch <span class="token operator">~</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh<span class="token operator">/</span>config

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>Host example<span class="token punctuation">.</span>com
  ForwardAgent yes

Host github<span class="token punctuation">.</span>com
    HostName github<span class="token punctuation">.</span>com
    PreferredAuthentications publickey
    IdentityFile <span class="token operator">~</span><span class="token operator">/</span><span class="token punctuation">.</span>ssh<span class="token operator">/</span>id_rsa

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">[</span>remote <span class="token string">&quot;origin&quot;</span><span class="token punctuation">]</span>
  url <span class="token operator">=</span> git@github<span class="token punctuation">.</span>com<span class="token operator">:</span><span class="token constant">YOUR_ACCOUNT</span><span class="token operator">/</span><span class="token constant">YOUR_PROJECT</span><span class="token punctuation">.</span>git
  fetch <span class="token operator">=</span> <span class="token operator">+</span>refs<span class="token operator">/</span>heads<span class="token comment">/*:refs/remotes/origin/*
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>$ cat <span class="token operator">/</span>etc<span class="token operator">/</span>ssh_config
# Print out the <span class="token operator">/</span>etc<span class="token operator">/</span>ssh_config file
<span class="token operator">&gt;</span> Host <span class="token operator">*</span>
<span class="token operator">&gt;</span>   SendEnv <span class="token constant">LANG</span> <span class="token constant">LC_</span><span class="token operator">*</span>
<span class="token operator">&gt;</span>   ForwardAgent no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),p=[o];function i(c,l){return n(),a("div",null,p)}const d=s(t,[["render",i],["__file","Git with SSH.html.vue"]]);export{d as default};
