let obj = {}
console.log(Object.getPrototypeOf(obj) === obj) //false
console.log(Object.getPrototypeOf(obj) === obj.__proto__) //true

let proxyObj = new Proxy(obj, {
    has() {
        return true
    }
})
console.log('b' in proxyObj) //true
console.log('b' in obj) //false

proxyObj = new Proxy(obj, {
    getPrototypeOf() {
        return obj
    }
})
console.log(Object.getPrototypeOf(proxyObj) === obj) //true
console.log(Object.getPrototypeOf(obj) === obj) //false

//Proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。
//可定义的捕捉器：
//handler.getPrototypeOf()
//handler.setPrototypeOf()
//handler.isExtensible()
//handler.preventExtensions()
//handler.getOwnPropertyDescriptor()
//handler.defineProperty()
//handler.has() in 操作符的捕捉器
//handler.get()
//handler.set()
//handler.deleteProperty()
//handler.ownKeys() :Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。
//handler.apply() ：函数调用的捕捉器
//handler.construct() ：new 操作符的捕捉器

//1、属性的链式操作
let pipe = (function () {
    const funcStack = []
    return function pipe(value) {
        let proxy = new Proxy(
            {},
            {
                get(obj, fnName) {
                    if (fnName === 'get') {
                        debugger
                        return funcStack.reduce((acc, cur) => {
                            return cur(acc)
                        }, value)
                    }
                    funcStack.push(window[fnName])
                    return proxy
                }
            }
        )
        return proxy
    }
})()
var double = (x) => x * 2
var pow = (x) => x * x
console.log(pipe(1).double.pow.get)

//2、创建dom
const dom = new Proxy(
    {},
    {
        get(target, prop) {
            return function create(attrs = {}, ...children) {
                const el = document.createElement(prop)
                for (let key of Object.keys(attrs)) {
                    debugger
                    el.setAttribute(key, attrs[key])
                }
                for (let child of children) {
                    if (typeof child === 'string') {
                        child = document.createTextNode(child)
                    }
                    el.appendChild(child)
                }
                return el
            }
        }
    }
)
const el = dom.div({ id: 1, editable: true }, dom.h1({}, '标题1'), dom.a({ href: '#' }, '链接'), dom.ul({}, dom.li({}, '列表1'), dom.li({}, '列表2')))
document.body.appendChild(el)

//set的拦截应用
//1、数据的限制
//2、数据绑定，当某些数据改变时候同步更新dom
//3、防止内部属性“_”被外部读写

//apply拦截 函数调用\call\apply
{
    const sum = (a, b) => a + b
    const twice = {
        apply(target, thisArg, args) {
            return Reflect.apply(target, thisArg, args) * 2
        }
    }
    const proxy = new Proxy(sum, twice)
    console.log(proxy(1, 2))
    console.log(proxy.apply(null, [1, 2]))
    console.log(proxy.call(null, 1, 2))
}

//可撤销的实例
{
    const target = { a: 1 }
    const handler = {}
    const { proxy, revoke } = Proxy.revocable(target, handler)
    proxy.a = 123
    console.log(proxy.a)
    revoke()
    console.log(proxy.a) //TypeError
}

//Proxy 不是透明代理，不做任何拦截的情况下也无法和目标对象行为一致，代理对象的this改变了

//改变this指向
{
    const target = new Date()
    const handler = {
        get(target, prop) {
            if (prop === 'getDate') {
                return target.getDate.bind(target)
            }
            return Reflect.get(target, prop)
        }
    }
    const proxy = new Proxy(target, handler)
    console.log(proxy.getDate())
}

//proxy 实现数据库的ORM层
