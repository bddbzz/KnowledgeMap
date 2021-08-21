let worker = new Worker('./worker/worker.js')
worker.onmessage = function (e) {
    console.log('result:' + e.data)
    document.getElementById('result').textContent = e.data
}

document.getElementById('value').addEventListener('input', function (e) {
    const value = e.target.value
    console.log('parameter', value)
    worker.postMessage(value)
})
