class EventEmitter {
    cache = new Map()
    constructor() {}
    on(type, handler) {
        const handlers = this.cache?.get(type)
        const added = handlers && handlers.push(handler)
        if (!added) {
            this.cache.set(type, [handler])
        }
    }
    off(type, handler) {
        const handlers = this.cache.get(type)
        if (handlers) {
            handlers.splice(handlers.indexOf(handler), 1)
        }
    }
    once(type, handler) {
        const decor = (...args) => {
            handler && handler.apply(this, args)
            this.off(type, handler)
        }
        this.on(type, decor)
    }
    emit(type, evt) {
        for (const handler of this.cache.get(type) || []) {
            handler(evt)
        }
    }
    clear() {
        this.cache.clear()
    }
}
const interviewEmitter = new EventEmitter()
interviewEmitter.on('interview', (item) => {
    console.log('收到面试通知：')
    console.log(item)
})
interviewEmitter.emit('interview', 'XX公司邀请您去面试')
