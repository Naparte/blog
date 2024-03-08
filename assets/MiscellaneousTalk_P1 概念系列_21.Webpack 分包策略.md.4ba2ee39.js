import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.8048b864.js";const E=JSON.parse('{"title":"webpack 默认分包策略","description":"","frontmatter":{},"headers":[],"relativePath":"MiscellaneousTalk/P1 概念系列/21.Webpack 分包策略.md","filePath":"MiscellaneousTalk/P1 概念系列/21.Webpack 分包策略.md"}'),e={name:"MiscellaneousTalk/P1 概念系列/21.Webpack 分包策略.md"},o=l(`<h1 id="webpack-默认分包策略" tabindex="-1">webpack 默认分包策略 <a class="header-anchor" href="#webpack-默认分包策略" aria-label="Permalink to &quot;webpack 默认分包策略&quot;">​</a></h1><p>主要是关于 SplitChunksPlugin 的分包策略，SplitChunksPlugin 通过 <code>module 被引用频率、chunk 大小、包请求数</code>三个维度决定是否执行分包操作，这些决策都可以通过 optimization.splitChunks 配置项调整定制，基于这些维度可以<code>实现单独打包某些特定路径的内容</code></p><p>SplitChunksPlugin 内置了 default 与 defaultVendors 两个配置组，提供一些开箱即用的特性：</p><ol><li>node_modules 资源会命中 defaultVendors 规则，并被单独打包</li><li>只有包体超过 20kb 的 Chunk 才会被单独打包</li><li>加载 Async Chunk 所需请求数不得超过 30</li><li>加载 Initial Chunk 所需请求数不得超过 30</li></ol><p>知识点：Webpack 内部包含三种类型的 Chunk：</p><ul><li>Initial Chunk：基于 Entry 配置项生成的 Chunk</li><li>Async Chunk：异步模块引用，如 import(xxx) 语句对应的异步 Chunk</li><li>Runtime Chunk：只包含运行时代码的 Chunk</li></ul><h2 id="根据-module-使用频率" tabindex="-1">根据 Module 使用频率 <a class="header-anchor" href="#根据-module-使用频率" aria-label="Permalink to &quot;根据 Module 使用频率&quot;">​</a></h2><p>SplitChunksPlugin 支持按 Module 被 Chunk 引用的次数决定是否进行分包，开发者可通过 optimization.splitChunks.minChunks 设定最小引用次数</p><p>注意，<code>这里“被 Chunk 引用次数”并不直接等价于被 import 的次数，而是取决于上游调用者是否被视作 Initial Chunk 或 Async Chunk 处理</code></p><h2 id="根据-请求数量分包" tabindex="-1">根据 请求数量分包 <a class="header-anchor" href="#根据-请求数量分包" aria-label="Permalink to &quot;根据 请求数量分包&quot;">​</a></h2><p>在满足 minChunks 基础上，还可以通过 maxInitialRequest/maxAsyncRequests 配置项限定分包数量，配置项语义：</p><ul><li>maxInitialRequest：用于设置 Initial Chunk 最大并行请求数</li><li>maxAsyncRequests：用于设置 Async Chunk 最大并行请求数</li></ul><p>这里所说的“请求数”，是指加载一个 Chunk 时所需同步加载的分包数。 例如对于一个 Chunk A，如果根据分包规则(如模块引用次数、第三方包)分离出了 i 个子 Chunk， 那么请求 A 时，浏览器需要同时请求所有的子 Chunk，此时并行请求数等于 ¡ 个分包加 A 主包，即 ¡+1</p><h3 id="并行请求数关键逻辑总结如下" tabindex="-1">并行请求数关键逻辑总结如下： <a class="header-anchor" href="#并行请求数关键逻辑总结如下" aria-label="Permalink to &quot;并行请求数关键逻辑总结如下：&quot;">​</a></h3><ul><li>Initial Chunk 本身算一个请求</li><li>Async Chunk 不算并行请求</li><li>通过 runtimeChunk 拆分出的 runtime 不算并行请求</li><li>如果同时有两个 Chunk 满足拆分规则，但是 maxInitialRequests(或 maxAsyncRequest) 的值只能允许再拆分一个模块，那么体积更大的模块会被优先拆解</li></ul><h2 id="根据-体积分包" tabindex="-1">根据 体积分包 <a class="header-anchor" href="#根据-体积分包" aria-label="Permalink to &quot;根据 体积分包&quot;">​</a></h2><p>在满足 minChunks 与 maxInitialRequests 的基础上，SplitChunksPlugin 还会进一步判断 Chunk 包大小决定是否分包</p><ul><li><code>minSize</code>：超过这个尺寸的 Chunk 才会正式被分包</li><li><code>maxSize</code>：超过这个尺寸的 Chunk 会尝试继续做分包</li><li><code>maxAsyncSize</code>：与 maxSize 功能类似，但只对异步引入的模块生效</li><li><code>maxInitialSize</code>：与 maxSize 类似，但只对 entry 配置的入口模块生效</li><li><code>enforceSizeThreshold</code>：超过这个尺寸的 Chunk 会被强制分包，忽略上述其它 size 限制</li></ul><h2 id="使用-cachegroups" tabindex="-1">使用 cacheGroups <a class="header-anchor" href="#使用-cachegroups" aria-label="Permalink to &quot;使用 cacheGroups&quot;">​</a></h2><p>plitChunksPlugin 提供了 cacheGroups 配置项用于为不同文件组设置不同的规则</p><ul><li><code>test</code>：接受正则表达式、函数及字符串，所有符合 test 判断的 Module 或 Chunk 都会被分到该组</li><li><code>type</code>：接受正则表达式、函数及字符串，与 test 类似均用于筛选分组命中的模块，区别是它判断的依据是文件类型而不是文件名，例如 type = &#39;json&#39; 会命中所有 JSON 文件</li><li><code>idHint</code>：字符串型，用于设置 Chunk ID，它还会被追加到最终产物文件名中，例如 idHint = &#39;vendors&#39; 时，输出产物文件名形如 vendors-xxx-xxx.js</li><li><code>priority</code>：数字型，用于设置该分组的优先级，若模块命中多个缓存组，则优先被分到 priority 更大的组</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 通过 cacheGroups 属性设置 vendors 缓存组，</span></span>
<span class="line"><span style="color:#6A737D;">// 所有命中 vendors.test 规则的模块都会被视作 vendors 分组，</span></span>
<span class="line"><span style="color:#6A737D;">// 优先应用该组下的 minChunks、minSize 等分包配置</span></span>
<span class="line"><span style="color:#79B8FF;">module</span><span style="color:#E1E4E8;">.</span><span style="color:#79B8FF;">exports</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#E1E4E8;">  optimization: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    splitChunks: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      cacheGroups: {</span></span>
<span class="line"><span style="color:#E1E4E8;">        vendors: {</span></span>
<span class="line"><span style="color:#E1E4E8;">          test:</span><span style="color:#DBEDFF;"> </span><span style="color:#9ECBFF;">/</span><span style="color:#79B8FF;">[</span><span style="color:#85E89D;font-weight:bold;">\\\\</span><span style="color:#79B8FF;">/]</span><span style="color:#DBEDFF;">node_modules</span><span style="color:#79B8FF;">[</span><span style="color:#85E89D;font-weight:bold;">\\\\</span><span style="color:#79B8FF;">/]</span><span style="color:#9ECBFF;">/</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          minChunks: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">          minSize: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        },</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 通过 cacheGroups 属性设置 vendors 缓存组，</span></span>
<span class="line"><span style="color:#6A737D;">// 所有命中 vendors.test 规则的模块都会被视作 vendors 分组，</span></span>
<span class="line"><span style="color:#6A737D;">// 优先应用该组下的 minChunks、minSize 等分包配置</span></span>
<span class="line"><span style="color:#005CC5;">module</span><span style="color:#24292E;">.</span><span style="color:#005CC5;">exports</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">//...</span></span>
<span class="line"><span style="color:#24292E;">  optimization: {</span></span>
<span class="line"><span style="color:#24292E;">    splitChunks: {</span></span>
<span class="line"><span style="color:#24292E;">      cacheGroups: {</span></span>
<span class="line"><span style="color:#24292E;">        vendors: {</span></span>
<span class="line"><span style="color:#24292E;">          test:</span><span style="color:#032F62;"> /</span><span style="color:#005CC5;">[</span><span style="color:#22863A;font-weight:bold;">\\\\</span><span style="color:#005CC5;">/]</span><span style="color:#032F62;">node_modules</span><span style="color:#005CC5;">[</span><span style="color:#22863A;font-weight:bold;">\\\\</span><span style="color:#005CC5;">/]</span><span style="color:#032F62;">/</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          minChunks: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">          minSize: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        },</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">};</span></span></code></pre></div><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><p><a href="https://www.51cto.com/article/689344.html" target="_blank" rel="noreferrer">https://www.51cto.com/article/689344.html</a></p>`,24),p=[o];function t(c,i,r,u,h,d){return n(),a("div",null,p)}const k=s(e,[["render",t]]);export{E as __pageData,k as default};
