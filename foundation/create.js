const obj = { a: 1, b: 2 }
console.log(Object.create(obj))

function F() {
    return {
        id: 1,
        setId(id) {
            this.id = id
        }
    }
}
console.log(Object.create(F))

//Object.create(Object.prototype) 与 {} 创建的对象结构类似
//你需要一个非常干净且高度可定制的对象当作数据字典的时候、想节省hasOwnProperty带来的一丢丢性能损失并且可以偷懒少些一点代码的时候 Object.create(null)
Object.myCreate = function (proto, properties) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object: ' + proto)
    } else if (proto === null) {
        throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.")
    }

    if (typeof propertiesObject != 'undefined') {
        throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.")
    }

    function F() {}
    F.prototype = proto

    return new F()
}
