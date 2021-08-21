# 官方定义

WebAssembly 是个基于栈式虚拟机的虚拟二进制指令集（V-ISA），它被设计为高级语言的可移植编译目标。

## 其他信息

-   2015 年诞生
-   2019 年 12 月，W3C 正式宣布，Wasm 将成为除现有的 HTML、CSS 以及 JavaScript 之外的第四种，W3C 官方推荐在 Web 平台上使用的“语言”
-   多达几十种编程语言的代码可以在相关基础设施的帮助下编译为 Wasm 二进制格式，Wasm 已成为编程语言的重要编译目标
-   起源于 Web，不止于 Web

## Start

### JavaScript 二进制数组

#### 类型

-   ArrayBuffer
-   TypedArray 底层的二进制数据缓冲区（binary data buffer）的一个类数组视图（view），在 WebGL 规范中被引入，用于解决 JavaScript 处理二进制数据的问题。
-   Uint8Array
-   Uint8ClampedArray
-   Int8Array
-   Uint16Array
-   Int16Array
-   Uint32Array
-   Int32Array
-   Float32Array
-   Float64Array
-   DataView
-   SharedArrayBuffer 用于浏览器启动多个 WebWorker，需要多个进程共享数据，

#### 应用

-   Ajax
    ResponseType 可以为 arrayBuffer 或者 blob
-   Canvas
    getImageData 返回 UintClampedArray
-   WebSocket 可以通过 ArrayBuffer，发送或者接收二进制数据
    socket.binaryType = 'arrayBuffer'
-   Fetch API 取回的数据就是 ArrayBuffer 对象

```JavaScript
fetch(url)
.then(function(request){
  return request.arrayBuffer()
})
.then(function(arrayBuffer){
  // ...
});
```

-   File API

```JavaScript
var reader = new FileReader();
reader.addEventListener("load", (e) {
  var buffer = e.target.result;
  var datav = new DataView(buffer);
  var bitmap = {};
  // 具体的处理步骤
}, false);
reader.readAsArrayBuffer(file);
```
