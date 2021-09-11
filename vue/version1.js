function defineReactive(data, key, val) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
        // value: val,
        // writable: true,
        //enumerable: true,
        //configurable: true,
        get() {
            //搜集依赖
            dep.depend()
            return val
        },
        set(newVal) {
            if (newVal === val) {
                return
            }
            //触发依赖
            val = newVal
            dep.notify()
        }
    })
}
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    removeSub(sub) {
        const index = this.subs.findIndex(sub)
        if (index != -1) {
            this.subs.splice(index, 1)
        }
    }
    notify() {
        for (let i = 0, n = this.subs.length; i < n; i++) {
            let sub = this.subs[i]
            sub.update()
        }
    }
    depend() {
        if (window.target) {
            this.addSub(window.target)
        }
    }
}

function parsePath(vm, expOrFn) {
    return () => vm.data[expOrFn]
}
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.getter = parsePath(vm, expOrFn)
        this.vm = vm
        this.cb = cb
        this.value = this.get()
    }
    get() {
        window.target = this
        const value = this.getter()
        window.target = undefined
        return value
    }
    update() {
        let value = this.value
        let newValue = this.get()
        if (value === newValue) {
            return
        }
        this.cb.call(this.vm, newValue, value)
        this.value = newValue
    }
}
class Vue {
    constructor() {
        this.data = {
            a: null,
            b: {
                c: 1
            }
        }
        for (let [key, value] of Object.entries(this.data)) {
            if (typeof value === 'object' && value !== null) {
            } else {
                defineReactive(this.data, key, value)
            }
        }
    }
    watch() {
        return {
            a: (newVal, val) => {
                console.log(`changed from ${val} to ${newVal}`)
            }
        }
    }
    mounted() {
        for (let [key, value] of Object.entries(this.watch())) {
            new Watcher(this, key, value)
        }
        this.data.a = 11
        this.data.b.c = 11
        setTimeout(() => {
            this.data.a = 22
            this.data.b.c = 22
        }, 2000)
    }
}
new Vue().mounted()
