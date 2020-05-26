//保证一个类仅有一个实例，并且提供一个全局访问点
//1、标准单例，增加了类的不透明性（对调用者来说），使用者必须知道这是一个单例类
var Singleton = function (name) {
    this.name = name
}
Singleton.prototype.getName = function () {
    return this.name
}
Singleton.getInstance = (function () {
    let instance = null
    return function (name) {
        if (!instance) {
            instance = new Singleton(name)
        }
        return instance
    }
})()

console.log(Singleton.getInstance("zz"), Singleton.getInstance("dd"))

//2、透明单例，正常new创建实例，用到了闭包和自执行函数，缺点程序复杂度较高，违背单一职责，Create负责两件事情，创建对象和执行init方法，保证只有一个对象
var Singleton2 = (function () {
    var instance = null
    var Create = function (id) {
        if (instance) {
            return instance
        }
        this.id = id
        this.init()
        return instance = this
    }
    Create.prototype.init = function () {
        console.log("inited", this.id)
    }
    return Create
})()

console.log(new Singleton2('zz'), new Singleton2('dd'))

//3、代理实现单例，把负责管理单例的逻辑移到了代理类中
var CreateDiv = function (html) {
    this.html = html
    this.init()
}
CreateDiv.prototype.init = function () {
    let div = document.createElement("div")
    div.innerHTML = this.html
    document.body.appendChild(div)
}
var ProxySingletonCreateDiv = (function () {
    var instance = null
    return function (html) {
        if (!instance) {
            instance = new CreateDiv(html)
        }
        return instance
    }
})()
var ProxySingletonCreateDiv2 = (function () {
    let instance = null
    return new Proxy(CreateDiv, {
        construct(target, args) {
            if (!instance) instance = new target(...args)
            return instance
        }
    })
})()
console.log(new ProxySingletonCreateDiv("zz"), new ProxySingletonCreateDiv("dd"))
console.log(new ProxySingletonCreateDiv2("zz"), new ProxySingletonCreateDiv2("dd"))

//4、结合闭包、高阶函数实现惰性单例，第一次调用时才创建，把创建对象和管理单例的逻辑分开
function CreateLoginModal() {
    const div = document.createElement("div")
    div.innerHTML = "登录窗口"
    document.body.appendChild(div)
    return div
}
function getSingle(fn) {
    let result = null
    return function () {
        return result || (result = fn.apply(this, arguments))
    }
}
const CreateSingleLoginModal = getSingle(CreateLoginModal)
CreateSingleLoginModal()

//5、ES6方式的单例
class SingletonApple {
    constructor(creator) {
        this.creator = creator
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new SingletonApple(...arguments)
        }
        return this.instance
    }
}

console.log(SingletonApple.getInstance("Jobs"), SingletonApple.getInstance("zz"))

//应用场景：全局缓存、登录弹框
