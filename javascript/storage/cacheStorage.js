let cache = {}
export default {
  getItem(key) {
    return cache[key]
  },
  setItem(key, value) {
    cache[key] = value
  },
  removeItem(key) {
    cache[key] = null
  },
  clear() {
    cache = {}
  }
}
