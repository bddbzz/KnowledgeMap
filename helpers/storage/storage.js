const DEFAULT_EXPIRES = 20 * 60 * 1000
export class Storage {
    constructor(storage) {
        this.isLocalStorage = storage === window.localStorage
        this.$store = storage
    }
    _setLocalItem(key, value, expires = DEFAULT_EXPIRES) {
        let newValue = {
            value,
            expireTime: this.getExpireTime(expires)
        }
        this.$store.setItem(key, JSON.stringify(newValue))
    }
    _getLocalItem(key) {
        let result = this.$store.getItem(key)
        if (typeof result === "string") {
            let resultObj = JSON.parse(result)
            let expireTime = resultObj.expireTime
            if (this.isExpired(expireTime)) {
                return null
            }
            return resultObj.value
        }
        return result
    }
    _setSessionItem(key, value) {
        this.$store.setItem(key, JSON.stringify(value))
    }
    _getSessionItem(key) {
        let value = this.$store.getItem(key)
        if (typeof value === "string") {
            return JSON.parse(value)
        }
        return value
    }
    setItem() {
        this[this.isLocalStorage ? "_setLocalItem" : "_setSessionItem"].apply(this, arguments)
    }
    getItem() {
        return this[this.isLocalStorage ? "_getLocalItem" : "_getSessionItem"].apply(this, arguments)
    }
    removeItem(key) {
        this.$store.removeItem(key)
    }
    clear() {
        this.$store.clear()
    }
    getExpireTime(expireTime) {
        return new Date().getTime() + expireTime
    }
    isExpired(expireTime) {
        return new Date().getTime() > expireTime
    }
}