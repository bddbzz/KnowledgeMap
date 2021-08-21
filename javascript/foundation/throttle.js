//防抖：将多次执行变成间隔一个时间点去执行的函数
function throttle(fn, time) {
    let lastTime = null
    return function _throttle(...args) {
        let nowTime = Date.now()
        if (nowTime - lastTime > time || !lastTime) {
            fn(...args)
            lastTime = nowTime
        }
    }
}
function resize(e) {
    console.warn(e)
    console.log('resize')
}
window.addEventListener('resize', throttle(resize, 1000))
