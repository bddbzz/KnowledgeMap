let handler = {
    getPrototypeOf(target) {
        return Array.prototype
    },
    setPrototypeOf(target, newProto) {
        throw new Error("forbidden")
    },
    isExtensible(target) {
        return Reflect.isExtensible(target)
    },
    preventExtensions(target) {//isExtensible & preventExtensions 返回值相反
        return Reflect.preventExtensions(target)
    },
    getOwnPropertyDescriptor(target, prop) {
        return {
            configurable: true, enumerable: true, value: 10
        }
    },
    defineProperty(target, prop, descriptor) {
        console.log("a")
        return Reflect.defineProperty(target, prop, descriptor)
    },
    has(target, key) {//针对for in的代理
        if (key[0] === "_") { //避免遍历出_开头的属性
            return false
        }
        return key in target
    },
    get(target, prop) {
        return target[prop] + "_new"
    },
    set(target, prop, value, receiver) { //receiver最初被调用的对象，通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）。
        // if (value % 2 != 0) {
        //     throw new Error("value must be an even number")
        // }
        console.log(target)
        console.log(receiver)
        return Reflect.set(...arguments)
    },
    deleteProperty(target, prop) {
        Reflect.defineProperty(target, prop)
    },
    ownKeys(target) { //拦截 Object.getOwnPropertyNames()   Object.getOwnPropertySymbols()   Object.keys()      Reflect.ownKeys() 数组的元素类型要么是一个 String ，要么是一个 Symbol.
        return Reflect.ownKeys(target)
    },
    apply(target, thisArg, argumentsList) {//拦截函数的调用,target必须是函数对象,拦截：proxy(...args)    Function.prototype.apply() 和 Function.prototype.call()   Reflect.apply()
        return argumentsList[0] + argumentsList[1]
    },
    construct(target, args) {//拦截new操作符
        return { value: 1 }
    }
}
let obj = {}
let p = new Proxy(obj, handler)
//5种触发 getPrototypeOf 代理方法的方式
console.log(Object.getPrototypeOf(p) === Array.prototype, Reflect.getPrototypeOf(p) === Array.prototype, p.__proto__ === Array.prototype, Array.prototype.isPrototypeOf(p), p instanceof Array)
//2种情况下的异常
/**
 * 1、TypeError: getPrototypeOf 返回值必须是 object or null
 * 2、TypeError: 对象禁止扩展的时候Object.preventExtensions，expected same prototype value
 */

//Object.setPrototypeOf(p, Object.prototype)

console.log(Object.getOwnPropertyDescriptor(p, "a"))

Object.defineProperty(p, "name", { value: 'annie', writable: true })
console.log(p.name)

//p.eyeNumber = 3
p.eyeNumber = 4


let fn = function (a, b) { return a * b }
let p2 = new Proxy(fn, handler)
console.log(fn(1, 2))
console.log(p2(1, 2))

function foo() {
    this.id = 1
}
let p3 = new Proxy(foo, handler)
console.log(new p3())

//可撤销的Proxy
let revocable = Proxy.revocable({}, {
    get(target, prop) {
        return `[[${prop}]]`
    }
})
let p4 = revocable.proxy
console.log(p4.name)
revocable.revoke()
console.log(p4.name)