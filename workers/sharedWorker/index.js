let worker = new SharedWorker('./sharedWorker/worker.js')
worker.port.start()
worker.port.onmessage = function (e) {
    console.log('result:' + e.data)
    document.getElementById('result').textContent = e.data
}

document.getElementById('value').addEventListener('input', function (e) {
    const value = e.target.value
    console.log('parameter', value)
    console.warn(worker.port)
    worker.port.postMessage(value)
})
