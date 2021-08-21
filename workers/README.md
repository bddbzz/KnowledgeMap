# Web Worker

## 分类

-   Delicated Workers
-   Shared Workers
-   Chrome Workers
-   Audio Workers

## 注意点

-   在主线程中使用时，onmessage 和 postMessage() 必须挂在 worker 对象上，而在 worker 中使用时不用这样做。原因是，在 worker 内部，worker 是有效的全局作用域。
-   当一个消息在主线程和 worker 之间传递时，它被复制或者转移了，而不是共享。
-   生成 SubWorker
-   Worker 线程能够访问一个全局函数 importScripts()来引入脚本
-   Shared worker 通信必须通过端口对象
-   父级线程和 worker 线程需要双向通信，那么它们都需要调用 start()方法。
