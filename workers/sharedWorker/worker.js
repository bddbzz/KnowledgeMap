importScripts('../fibonacci')
console.log('worker')
onconnect = function (e) {
    console.log('connected')
    const port = e.ports[0]
    port.start()
    port.onmessage = function (e) {
        const n = Number(e.data)
        port.postMessage(fibonacci(n))
    }
}
