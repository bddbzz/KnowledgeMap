importScripts('../fibonacci.js')
onmessage = function (e) {
    const n = Number(e.data)
    postMessage(fibonacci(n))
}
