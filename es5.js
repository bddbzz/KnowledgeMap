let data = {
    //name: 'monkey',
    _age: 30,
    //books: ['javascript', 'css', 'html'],
   // id: Symbol("id"),
   // others: {
   //     introduction: 'hello, i am monkey.'
   // }
}

Object.defineProperty(data, "gender", {
    enumerable:false,   
    configurable:false,
    writable:false,
    value:'girl'
})
delete data.gender

Object.defineProperty(data, "age", {
    enumerable:true,//默认false
    configurable:true,//默认false
    get:function(){
        return this._age
    },
    set:function(value){
        this._age = value
    }
})
data.__defineGetter__("age",function(){
    return this._age + "_def"
})
data.__defineSetter__("age",function(value){
    this._age = value + "zz"
})
console.log(data.age)
data.age = 100
console.log(data.age)
var descriptor = Object.getOwnPropertyDescriptor(data,"_age")
console.log(descriptor)
descriptor = Object.getOwnPropertyDescriptor(data,"age")
console.log(descriptor)

