# 学习 Vue2 的源码

## 项目的目录结构
```shell
├─benchmarks          // 性能测试相关
├─dist                // 打包后的文件集合
├─flow                // flow类型声明
├─packages            // 与`vue`相关的一些其他的npm包, `vue-server-render`, `vue-template-compiler`等
├─scripts             // 构建相关的脚本
├─src                 // 源代码入口
|  ├─shared           // 项目中用到的一些公共变量,方法等
|  ├─sfc              // 用于处理单文件组件(.vue)解析的逻辑
|  ├─server           // 服务端渲染相关的代码
|  ├─platforms        // 不同平台之间的代码
|  ├─core             // Vue的核心**运行时**代码
|  |  ├─vdom          // 虚拟dom相关的代码
|  |  ├─util          // Vue里用到的一些工具方法抽取
|  |  ├─observer      // 实现响应式原理的代码
|  |  ├─instance      // vue实例相关的核心逻辑
|  |  ├─global-api    // 全局api Vue.extend, Vue.component等
|  |  ├─components    // 内置的全局组件
|  ├─compiler         // 与模板编译相关的代码
├─types               // Typescript类型声明
├─test                // 测试相关的代码
```

## 编译后的版本
> 如果执行 npm run build 命令，dist 目录中会出现各种后缀的包，不同的后缀代表不同的编译版本，主要区别是模块规范和是否带编译器。

|模块规范|UMD|CommonJS|ES Module|ES Module（直接用于浏览器）|
| ----- | ----- | ----- | ----- | ----- |
|完整版|vue.js|vue.common.js|vue.esm.js|vue.esm.browser.js|
|只包含运行时版|vue.runtime.js|vue.runtime.common.js|vue.runtime.esm.js|\-|
|完整版（生产环境）|vue.min.js|\-|\-|vue.esm.browser.min.js|
|只包含运行时版（生产环境）|vue.runtime.js|\-|\-|\-|

* **完整版**: 同时包含编译器和运行时的版本。
* **编译器**：主要用于将模板字符串编译成 Javascript 渲染函数。
* **运行时**： 负责创建 vue 实例、渲染并处理虚拟 DOM 等的代码。没有编译模板功能。
* **UMD**：UMD 版本可以通过标签直接用在浏览器中。jsDelivr CDN 的 cdn.jsdelivr.net/npm/vue 默认文件就是运行时 + 编译器的 UMD 版本 (`vue.js`)。
* **CommonJS**：CommonJS 版本用来配合老的打包工具比如 Browserify 或 webpack 1。这些打包工具的默认文件 (`pkg.main`) 是只包含运行时的 CommonJS 版本 (`vue.runtime.common.js`)。
* **ES Module**：从 2.6 开始 Vue 会提供两个 ES Modules (ESM) 构建文件：
