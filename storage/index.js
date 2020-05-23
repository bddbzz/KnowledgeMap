import { Storage } from './storage'
import cacheStorage from './cacheStorage'
export const $session = new Storage(window.sessionStorage)
export const $local = new Storage(window.localStorage)
export const $cache = new Storage(cacheStorage)
export const apiBuilder = function (storeAPI, STATE_KEY) {
    return {
        get() {
            return storeAPI.getItem(STATE_KEY)
        },
        set(value) {
            storeAPI.setItem(STATE_KEY, value)
        },
        remove() {
            storeAPI.removeItem(STATE_KEY)
        },
        clear() {
            storeAPI.clear()
        }
    }
}
