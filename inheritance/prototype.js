//"use strict"
//case1 如果原型链上层对象存在foo属性并且没有标记只读writable:false，那么会直接在obj对象添加新属性，为屏蔽属性
const parentObj = { foo: 5 }
const obj = Object.create(parentObj)
obj.foo = 10
console.log(obj.foo, parentObj.foo)

//case2 如果原型链上层对象上存在foo并且是只读属性writable:false，那么就无法修改属性或者在obj上创建屏蔽属性，在严格模式下还会报错
const parentObj2 = {}
Object.defineProperty(parentObj2, "foo", {
    value: 5,
    writable: false
})
const obj2 = Object.create(parentObj2)
obj2.foo = 10
console.log(obj2.foo, parentObj2.foo)

//case3 如果原型链上层对象存在foo并且是个setter，那就一定会调用这个setter，foo不会添加到obj，并且也不会重新定义setter
const parentObj3 = {
    _foo: 2,
    get foo() {
        return this._foo
    },
    set foo(value) {
        this._foo = value * 2
    }
}
parentObj3.foo = 2
const obj3 = Object.create(parentObj3)
obj3.foo = 3
console.log(obj3.foo, parentObj3.foo)

//case2\3 如果确实想在obj加上屏蔽属性，得用Object.defineProperty