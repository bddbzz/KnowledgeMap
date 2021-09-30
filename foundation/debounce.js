//防抖：多次连续请求变成最后一次
function debounce(fn, wait) {
    let timer = null
    return function _debounce(...args) {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(() => fn(args), wait)
    }
}
function resize(e) {
    console.warn(e)
    console.log('resize')
}
window.addEventListener('resize', debounce(resize, 1000))
