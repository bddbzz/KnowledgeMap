const obj = Object.create(null, {
    a: {
        // configurable: false, //不允许delete，删失效，默认false
        // writable: false, //不允许写，写失效，默认false
        // enumerable: true,//是否可枚举，默认false
        value: '1'
    }
})
obj.a = 10
const zz = Symbol('zz')
obj[zz] = 10
obj.b = 10
console.log(obj)
for (let i in obj) {
    console.log(`item:${i}`)
}
console.log(Reflect.ownKeys(obj)) //包含Symbol包含不可枚举
console.log(Object.getOwnPropertyNames(obj)) //不包含Symbol包含不可枚举
console.log(Object.keys(obj)) //不包含Symbol不包含不可枚举
delete obj.a
console.log(obj)
obj[zz] = 11
obj.b = 11
console.log(obj)
delete obj.b
delete obj[zz]
console.log(obj)

//.操作符定义的默认可写、可删、可枚举
