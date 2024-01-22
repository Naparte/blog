import{_ as e,o as a,c as l,Q as i}from"./chunks/framework.84f90f1e.js";const k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"InterviewQuestions/面试相关/bytedance.md","filePath":"InterviewQuestions/面试相关/bytedance.md"}'),t={name:"InterviewQuestions/面试相关/bytedance.md"},r=i('<h2 id="作为前端负责人在前端基础设施做了哪些事情" tabindex="-1">作为前端负责人在前端基础设施做了哪些事情 <a class="header-anchor" href="#作为前端负责人在前端基础设施做了哪些事情" aria-label="Permalink to &quot;作为前端负责人在前端基础设施做了哪些事情&quot;">​</a></h2><ul><li>开发阶段：技术选型，页面模版，组件库，工具插件库，codegen，jsonSchema，mock 服务，监控 Sentry，静态扫描 checklit</li><li>基于公司的 docker 平台 做一个 docker 镜像，做代码规范扫描检测，自动出包，部署到测试环境服务器</li></ul><ol><li>开发阶段：包含了技术选型、项目创建、模板化、脚手架工具等方面的工作</li><li>部署阶段：如何去做自动化的 CI/CD、如何将项目部署到服务器</li><li>质量保证，尝试使用一些自动化测试框架进行项目测试，同时对项目配置进行收敛，减少配置的修改，以保证每个项目的基础设施统一</li><li>如何提效，通过脚手架工具来实现零配置启动部署项目，通过模板、组件以及对应的 schema 调用方式来降低开发门槛和效率提升</li></ol><h2 id="vite-的底层原理是什么" tabindex="-1">Vite 的底层原理是什么 <a class="header-anchor" href="#vite-的底层原理是什么" aria-label="Permalink to &quot;Vite 的底层原理是什么&quot;">​</a></h2><ul><li><a href="https://juejin.cn/post/7064853960636989454" target="_blank" rel="noreferrer">https://juejin.cn/post/7064853960636989454</a></li><li><a href="https://juejin.cn/post/6844904038543130637" target="_blank" rel="noreferrer">https://juejin.cn/post/6844904038543130637</a></li></ul><h2 id="你觉得-vite-相比于-webpack-哪些方面更好" tabindex="-1">你觉得 Vite 相比于 Webpack 哪些方面更好 <a class="header-anchor" href="#你觉得-vite-相比于-webpack-哪些方面更好" aria-label="Permalink to &quot;你觉得 Vite 相比于 Webpack 哪些方面更好&quot;">​</a></h2><ul><li>本地开发的构建速度快，由于 Vite 是基于 ESM 和 esbuild 的，所以在本地开发时整体的构建速度会比 webpack 更快</li><li>使用简单，Vite 内置了很多 loader 和配置，让开发者可以零配置跑起来一个项目，而 webpack 则是需要写很多复杂的配置</li></ul><h2 id="vite-的热更新原理是什么" tabindex="-1">Vite 的热更新原理是什么 <a class="header-anchor" href="#vite-的热更新原理是什么" aria-label="Permalink to &quot;Vite 的热更新原理是什么&quot;">​</a></h2><ul><li>Vite 本地启动时会创建一个 WebSocket 连接，同时去监听本地的文件变化</li><li>当用户修改了本地的文件时，WebSocket 的服务端会拿到变化的文件的 ID 或者其他标识，并推送给客户端</li><li>客户端获取到变化的文件信息之后，便去请求最新的文件并刷新页面</li></ul><h2 id="介绍一下之前的监控告警是怎么做的" tabindex="-1">介绍一下之前的监控告警是怎么做的 <a class="header-anchor" href="#介绍一下之前的监控告警是怎么做的" aria-label="Permalink to &quot;介绍一下之前的监控告警是怎么做的&quot;">​</a></h2><ul><li><p>分为两部分，第一部分为日志的埋点和上传，包含了代码日志和业务日志。主要是自己实现了一个基于 WebSocket 的日志服务，在客户端项目加载的时候启动 WebSocket，然后通过提供的 log 方法在代码中去进行日志打点。服务端收到上传的日志之后传入到公司内的数仓，之后通过数仓的 API 实现日志的查询。</p></li><li><p>对于业务数据的埋点则是在对应的用户操作时进行埋点上报。另一部分则是告警的实现，这部分利用公司的统一基础设施去做。在拿到前面的埋点信息之后，在公司的告警平台可以看到对应的埋点数据的趋势图，根据趋势可以设置告警阈值。告警阈值主要是通过人工去指定告警策略并根据实际情况进行调整和优化，以实现更准确的告警。</p></li></ul><h2 id="性能优化做了哪些事" tabindex="-1">性能优化做了哪些事 <a class="header-anchor" href="#性能优化做了哪些事" aria-label="Permalink to &quot;性能优化做了哪些事&quot;">​</a></h2><h2 id="d2c-做了哪些事情" tabindex="-1">D2C 做了哪些事情 <a class="header-anchor" href="#d2c-做了哪些事情" aria-label="Permalink to &quot;D2C 做了哪些事情&quot;">​</a></h2><ul><li><p>主要是做了一个 sketch 插件，通过插件的开发语言 cocoascript 和其中的 webview 的方式来实现的。为了降低开发成本，插件面板内的所有内容都是在 webview 中去开发前端页面。当从面板中拖拽某个图标或组件出来时，通过 message 将组件的信息传递到插件原生种，之后通过 cocoascript 开发 sketch 文件的查找和放置画板的逻辑。</p></li><li><p>为了简单实现，我们在插件安装的时候内置了符合业务规范的 sketch 组件包，因此面板中的每个组件都有唯一标识与 sketch 组件一一对应。最后导出页面时同样是对画板中模板和组件进行遍历，找到对应的组件代码并进行组装。</p></li></ul><h2 id="作为前端负责人在技术上做了哪些基建" tabindex="-1">作为前端负责人在技术上做了哪些基建 <a class="header-anchor" href="#作为前端负责人在技术上做了哪些基建" aria-label="Permalink to &quot;作为前端负责人在技术上做了哪些基建&quot;">​</a></h2><ul><li><p>脚手架</p><ul><li>提供前端脚手架工具，支持一行代码自动完成项目创建，同时调用 gitlab 的 API 完成远程仓库的创建，最后自动生成相应的 CI/CD 脚本实现自动化部署</li><li>将项目的配置项进行收敛，包含 ESLint、Prettier、TSConfig、Vite 的等，将标准的配置文件全部内置在脚手架当中，只提供部分配置项以单独的脚手架配置项透出</li><li>提供自动化命令，包含代码格式化、质量检测、本地开发、生产打包等</li></ul></li><li><p>框架</p><ul><li>前端框架部分主要是对一些公共模块和服务进行了单独的封装，包含请求模块、状态管理、路由等，所有的功能都由框架导出给开发者直接调用</li><li>提供了业务通用能力的封装，如 PDF 预览、统一图表展示、富文本编辑器等</li></ul></li><li><p>组件</p><ul><li>组件部分主要是基于 Antd 去做一些样式和改造以及更上层的组件封装</li><li>对常见的 CRUD 页面封装成模板，并提供 JSON2Page 的使用方式，以实现通过 JSON 配置直接生成页面</li></ul></li></ul><h2 id="富文本编辑器是如何实现的" tabindex="-1">富文本编辑器是如何实现的 <a class="header-anchor" href="#富文本编辑器是如何实现的" aria-label="Permalink to &quot;富文本编辑器是如何实现的&quot;">​</a></h2><ul><li>一开始是通过 slate.js 去实现的，slate.js 提供了富文本编辑器的核心能力，基于这些核心能力我们可以在上层实现各种复杂的富文本编辑器。但是随着业务对富文本编辑器的功能需求越来越多，我们就需要在 slate.js 上投入更多的人力去开发这些新的功能需求，这显然在我们这样的小团队中是不太现实的。于是就考虑找一款功能完善的富文本编辑器，最后选择了 jodit，一款基于 TS 实现的富文本编辑器，整体代码比较易读，便于后续对其进行二次开发。</li></ul><h2 id="有没有在质量和稳定性上做一些事情" tabindex="-1">有没有在质量和稳定性上做一些事情 <a class="header-anchor" href="#有没有在质量和稳定性上做一些事情" aria-label="Permalink to &quot;有没有在质量和稳定性上做一些事情&quot;">​</a></h2><p>包含两部分，一部分是开发过程中的质量保障，主要有两点一个是单元测试，通过 Jest 去实现，另一个则是 UI 的自动化测试，通过 cypress 实现。第二部分是对线上稳定性的监控，这个是基于开源项目加二次开发实现的。具体可以分为以下几个步骤：</p><ul><li>异常捕获：对异常进行分类，不同分类通过不同的方式进行捕获，如 addEventListener(&#39;error&#39;)监听 JS 代码异常，window.onerror 监听资源加载异常，xhr.addEventListener(&#39;error&#39;)监听请求异常等</li><li>异常上报：可以通过 WebSocket 进行上报，或者直接通过 HTTP 请求上报，在上报的时候需要考虑到弱网的缓存，以及高并发的数据合并情况</li><li>数据接收：启动一个 Node 服务，在接收到异常数据之后直接存在数据库中即可</li><li>数据使用：对上传的异常和监控数据进行分类查询，并提供对应的监控告警机制，当超出阈值范围时发送告警邮件</li></ul><h2 id="介绍一下业务做了哪些系统" tabindex="-1">介绍一下业务做了哪些系统 <a class="header-anchor" href="#介绍一下业务做了哪些系统" aria-label="Permalink to &quot;介绍一下业务做了哪些系统&quot;">​</a></h2><h2 id="在以往的工作经历中有哪些最有成就感的项目" tabindex="-1">在以往的工作经历中有哪些最有成就感的项目 <a class="header-anchor" href="#在以往的工作经历中有哪些最有成就感的项目" aria-label="Permalink to &quot;在以往的工作经历中有哪些最有成就感的项目&quot;">​</a></h2><h2 id="当时为什么考虑现在的公司" tabindex="-1">当时为什么考虑现在的公司 <a class="header-anchor" href="#当时为什么考虑现在的公司" aria-label="Permalink to &quot;当时为什么考虑现在的公司&quot;">​</a></h2><p>从三个方面进行考虑：</p><ul><li>在互联网行业待了一段时间，想要看看其他行业是什么样的，同时自己对金融还是比较感兴趣</li><li>大厂“打螺丝”不能充分发挥出自己的价值，想要到小公司去做更多的事情，让自己变得更全面</li><li>有一定的创业精神，选择了一个创业团队，可以收获一些创业的经验</li></ul><h2 id="现在为什么又要从现在的公司离开" tabindex="-1">现在为什么又要从现在的公司离开 <a class="header-anchor" href="#现在为什么又要从现在的公司离开" aria-label="Permalink to &quot;现在为什么又要从现在的公司离开&quot;">​</a></h2><p>有两个原因：</p><ul><li>团队发展不看好：新换了一个老板，对团队的定位发生了变化，由创新的探索性团队变成了支持性的 IT 团队，跟自己的期望不符</li><li>个人发展受限：从技术上来看，产品用户量较少，且复杂度较低，技术上持续在做输出，但是输入很少；从管理上来看，团队规模趋于稳定，后续不会再有更多人让自己来带</li></ul><h2 id="对自己未来的发展规划是什么" tabindex="-1">对自己未来的发展规划是什么 <a class="header-anchor" href="#对自己未来的发展规划是什么" aria-label="Permalink to &quot;对自己未来的发展规划是什么&quot;">​</a></h2><p>也是可以从两个方面来讲，一个走技术路线，一个走管理路线。</p><p>技术路线：</p><ul><li>对自身已经掌握的技术持续精进，并通过技术手段去回馈团队和业务（如前端架构、异常监控、性能优化、指标体系等）</li><li>在某一个技术方向上做到突出，能够沉淀出相应方法论，并建设出系统性的平台，在部门及公司内部普及应用</li><li>保持对新技术的热情，持续扩宽技术广度，对团队的技术栈持续迭代，保持团队整体技术的竞争力</li></ul><p>管理路线：</p><ul><li>定目标 —— 包含业务支撑、技术成长和团队培养三部分</li><li>看执行 —— 主要是对现有流程的问题进行梳理，让过程更加规范化、流程化，同时需要发掘高潜，给其空间快速成长</li><li>拿结果 —— 需要有可量化的具体数据来作为结果的衡量依据</li></ul><h2 id="画一个自己做过的最复杂项目的架构图" tabindex="-1">画一个自己做过的最复杂项目的架构图 <a class="header-anchor" href="#画一个自己做过的最复杂项目的架构图" aria-label="Permalink to &quot;画一个自己做过的最复杂项目的架构图&quot;">​</a></h2><h2 id="如何理解业务的" tabindex="-1">如何理解业务的 <a class="header-anchor" href="#如何理解业务的" aria-label="Permalink to &quot;如何理解业务的&quot;">​</a></h2><ul><li>都是先介绍公司做啥业务，然后再结合业务介绍对应的系统，最后讲一下每个系统的功能。</li></ul><h2 id="参考文献" tabindex="-1">参考文献 <a class="header-anchor" href="#参考文献" aria-label="Permalink to &quot;参考文献&quot;">​</a></h2><p>链接：<a href="https://juejin.cn/post/7298218459795734582" target="_blank" rel="noreferrer">https://juejin.cn/post/7298218459795734582</a><a href="https://juejin.cn/post/7072168887344693256" target="_blank" rel="noreferrer">https://juejin.cn/post/7072168887344693256</a></p>',40),o=[r];function n(h,s,c,u,d,p){return a(),l("div",null,o)}const q=e(t,[["render",n]]);export{k as __pageData,q as default};
