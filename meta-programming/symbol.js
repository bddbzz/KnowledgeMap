//Symbols 是 实现了的反射（Reflection within implementation）—— 你将 Symbols 应用到你已有的类和对象上去改变它们的行为。
console.log(Symbol())
console.log(Symbol("foo").toString())
console.log(typeof Symbol())
Object.prototype.pid = 1
let obj = {}
obj[Symbol()] = "zz"
obj[Symbol('foo')] = 'dd'
obj.id = 1

for (let i in obj) { //包括自身及原型链
    console.log(i)
}
console.log(Object.keys(obj))//自身所有可枚举的属性
console.log(Object.getOwnPropertyNames(obj))//包括自身不可枚举的属性
console.log(Object.getOwnPropertySymbols(obj))//自身的Symbol为key的属性

//全局Symbol注册中心，iframe或者service worker的Symbol与当期frame的Symbol相等
console.log(Symbol.for("foo") === Symbol.for("foo"))
console.log(Symbol.keyFor(Symbol.for("foo")))

/**
 * 特点：
 * 1、不会与字符串key冲突
 * 2、无法通过现有的反射工具获取，需要通过Object.getOwnPropertySymbols来访问
 * 3、不要去存储真正私有化的值，Symbol总是能被拿到
 * 4、可枚举的Symbols能够被复制到其他对象
 * 5、不能强制类型转换为原始对象，除了boolean
 * 6、并不总是唯一的
 */
let newObj = {}
Object.assign(newObj, obj)
console.log(newObj)
console.log(typeof !!Symbol(''))

/**
 * 使用场景：
 * 1、枚举值
 * 2、存储元信息
 * 3、API中为对象添加钩子的能力
 */

const log = {
    levels: {
        INFO: Symbol("info"),
        WARN: Symbol("warn"),
        DEBUG: Symbol("debug"),
        ERROR: Symbol("error")
    }
}

const size = Symbol("size")
class Collection {
    constructor() {
        this[size] = 0
    }
    add(item) {
        this[this[size]] = item
        this[size]++
    }
    length() {
        return this[size]
    }
    static sizeOf(instance) {
        return instance[size]
    }
}
let x = new Collection()
x.add("zz")
x.add("dd")

console.log(x.length(), Collection.sizeOf(x))

// var inspect = console.Symbols.INSPECT;
// let myInspectObj = {}
// console.log(myInspectObj)
// myInspectObj[inspect] = function () {
//     return "xxxx"
// }
// console.log(myInspectObj)

//内置的Symbols改变javascript的内部行为
//Symbol.hasInstance:instanceof
class MyClass {
    static [Symbol.hasInstance](obj) {
        return Array.isArray(obj)
    }
}
console.log([] instanceof MyClass)

//for of循环调用右手操作数的Symbol.iterator来取得当前值进行迭代
let myArray = [1, 2, 3]
for (let i of myArray) {
    console.log(i)
}
let _myArray = myArray[Symbol.iterator]();
let _iteration;
while (_iteration = _myArray.next()) {
    if (_iteration.done) {
        break;
    }
    let value = _iteration.value
    console.log(value)
}

class Collection2 {
    *[Symbol.iterator]() {
        let i = 0
        while (this[i] !== undefined) {
            yield this[i]
            i++
        }
    }
}
let myCollection2 = new Collection2()
myCollection2[0] = 1
myCollection2[1] = 2
for (let value of myCollection2) {
    console.log(value)
}

//Symbol.isConcatSpreadable指定concat数组是否展开
class Collection3 extends Array {
    get [Symbol.isConcatSpreadable]() {
        return true
    }
}
let collection3 = new Collection3()
collection3[0] = 10
collection3[1] = 11
console.log([1, 2].concat(collection3))

//Symbol.unscopables 不会被作用域的值
class MyClass2 {
    foo() { return 1 }
}
let foo = function () { return 2 }
console.log(MyClass2)
with (MyClass2.prototype) {
    console.log(foo())
}

class MyClass3 {
    foo() { return 1 }
    get [Symbol.unscopables]() { //不会被作用域访问的值
        return { foo: true }
    }
}
with (MyClass3.prototype) {
    console.log(foo())
}
//Symbol.match对应String#match
//Symbol.search应String#search
//Symbol.split应String#split
//Symbol.replace应String#replace

//重载抽象相等运算符Symbol.toPrimitive，
//比如+object会调用object[Symbol.toPrimitive]('number')
//比如''+object会调用object[Symbol.toPrimitive]('string')
//比如if(object)会调用object[Symbol.toPrimitive]('default')

//Object#toString()检测是否有[Symbol.toStringTag]属性
class Collection4 {
    get [Symbol.toStringTag]() {
        return "Collection"
    }
}
let x4 = new Collection4()
console.log(Object.prototype.toString.call(x4) === "[object Collection]")