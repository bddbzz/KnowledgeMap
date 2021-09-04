function defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
        // value: val,
        // writable: true,
        //enumerable: true,
        //configurable: true,
        get() {
            return val
        },
        set(newVal) {
            if (newVal === val) {
                console.log('write error')
                return
            }
            console.log('write successfully')
            val = newVal
        }
    })
}
const obj = {}
defineReactive(obj, 'a', 10)
console.log(obj.a)
obj.a = 20
console.log(obj.a)
obj.a = 30
console.log(obj.a)
obj.a = 30
console.log(obj.a)

//getter中搜集依赖，在setter中触发依赖
