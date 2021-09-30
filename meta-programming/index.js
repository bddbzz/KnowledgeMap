/**
 * 两个子分支：
 * --代码生成
 *  |-eval
 *  |-new Function
 * --反射
 *  |-函数 Function#name\length\bind\apply\call Object上的方法
 *  |-反射、内省运算符，typeof instanceof delete 
 *  |-ES6
 *      |-Symbol
 *      |-Reflect
 *      |-Proxy
 */

//动态生成获取属性的函数
class User {
    constructor(userId) {
        this.id = userId
        this.registerProperties(["name", "age", "address"])
    }
    registerProperties(props) {
        props.forEach(prop => {
            let fnBody = `return this.__fetchData("${key}").then((res) => { if (this["__handle_${key}"]) { return this["__handle_${key}"](res.data) } else { return res.data } })`
            this[`get_` + prop] = new Function(fnBody)
        });
    }
    __fetchData(key) {
        return fetch(`/user/${id}/${key}`)
    }
}

//利用反射机制动态生成函数
class UserDataBase {
    constructor() {
        this.get_name = async (id) => { }
        this.get_age = async (id) => { return id }
        this.get_anything_else = async (id) => { }
    }
}
let userDataBase = new UserDataBase()
class User2 {
    constructor(userId, dataBase) {
        this.id = userId
        this.__dataBase = dataBase
        console.log(Object.getOwnPropertyNames(dataBase))
        console.log(Object.getOwnPropertySymbols(dataBase))
        console.log(Object.keys(dataBase))
        for (let methodName in dataBase) {
            console.log(methodName)
            this.registerMethod(methodName)
        }
    }
    registerMethod(methodName) {
        let propertyName = methodName.slice(4)
        let fnBody = `return this.__dataBase["${methodName}"]('${this.id}').then((res) => { if (this["__handle_${propertyName}"]) { return this["__handle_${propertyName}"](res) } else { return res } })`
        this[methodName] = new Function(fnBody)
    }
    __handle_name(res) {
        return res
    }
}
let user = new User2(1, userDataBase)
let userProxy = new Proxy(user, {
    get(target, prop) {
        if (typeof target[prop] === "function") {
            return target[prop].bind(target)
        }
        return () => false
    }
})
console.log(userProxy.get_age(1));
console.log(userProxy.get_agexxx(1));

const methods = {
    double: (n) => n * 2,
    pow: (n) => n * n
}

const pipe = function (value) {
    let pipe = []
    let obj = {}
    let proxy = new Proxy(obj, {
        get(target, prop) {
            if (prop === "get") {
                return () => { return pipe.reduce((acc, cur) => { return cur(acc) }, value) }
            }
            pipe.push(methods[prop])
            return proxy
        }
    })
    return proxy
}

const result = pipe(2).double.pow.get()
console.log(result)