# 模板引擎

## 要解决的问题

在前后端开发中实现显示逻辑和数据逻辑的分离。

## 需要实现的特性

-   高性能
-   安全，XSS 的防范
-   片段的复用，有以下几个层次：
    -   一个片段可以被引入到另一处，相当于一个变量到处用的效果
    -   一个片段被引入时，可以向其传递不同的数据，相当于一个函数到处用的效果
    -   一个片段可以被外部替换，但外部不提供此片段的话保持一个默认的内容，类似设计模式中的策略模式
-   支持运行时调试
-   支持数据输出时的处理，如管道过滤器
-   自定义分隔符？

## 分类

string-based / dom-based

-   string-based
-   dom-based

## 代表性的模板引擎

-   jade
-   mustache
-   ejs
-   Numjucks
-   underscore.template
-   Razor
-   Handlebars
-   NornJ（同时支持渲染 html 和 React 组件）
-   baiduTemplate （百度）
-   artTemplate （腾讯）
-   juicer （阿里）
-   doT
-   template.js

## 现状

Vue 作者尤雨溪的观点：服务端渲染的情况下，需要模板引擎；动态的应用界面，需要 DOM 的局部更新，应该去实现 MVVM\组件树的前端框架。

## 一般实现流程

1）生成模板对应的 JavaScript 执行代码 2）根据前一步生成的代码再生成渲染函数代码，可能用到字符串拼接或者数组 push 3）eval 或者 new Function 生成渲染函数 4）传入数据执行渲染函数返回字符串
