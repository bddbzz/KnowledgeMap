# JavaScript基础数据类型
- 原始类型:undefined null string number boolean symbol bigint
- 引用类型:object, function 和 array都属于object
# 克隆
- 浅克隆
对象只会被克隆最外部一层，更深层的对象依然通过引用指向同一块堆内存；实现：循环、Object.assign
- 深克隆
先将JS对象序列化成JSON字符串，将JSON字符串反序列化成JS对象，JSON.parse(JSON.stringify(obj))，能解决大部分的使用场景，却又很多的坑；
1、无法实现对函数、RegExp(Buffer对象、Promise、Set、Map)等特殊对象的克隆
2、会抛弃对象的constructor，所有的构造函数会指向Object
3、对象有循环引用会报错
4、稀疏数组复制错误
所以需要针对性的克隆策略，靠谱的深克隆方法：_.deepClone
# 学习资料
- https://juejin.im/post/6844903584023183368
