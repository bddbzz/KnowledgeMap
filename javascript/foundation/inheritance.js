//原型继承
//构造函数继承
//组合继承
//寄生继承
//寄生组合继承
//class
//Proxy

function extend(sup, base) {
    var descriptor = Object.getOwnPropertyDescriptor(base.prototype, 'constructor')
    base.prototype = Object.create(sup.prototype)
    var handler = {
        construct: function (target, args) {
            var obj = Object.create(base.prototype)
            this.apply(target, obj, args)
            return obj
        },
        apply: function (target, that, args) {
            sup.apply(that, args)
            base.apply(that, args)
        }
    }
    var proxy = new Proxy(base, handler)
    descriptor.value = proxy
    Object.defineProperty(base.prototype, 'constructor', descriptor)
    return proxy
}

var Person = function (name) {
    this.name = name
}

var Boy = extend(Person, function (name, age) {
    this.age = age
})

Boy.prototype.sex = 'M'

var Peter = new Boy('Peter', 13)
console.log(Peter.sex) // "M"
console.log(Peter.name) // "Peter"
console.log(Peter.age) // 13
