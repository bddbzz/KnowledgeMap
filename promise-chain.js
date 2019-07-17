let p1 = function (a) {
    return new Promise((resolve, reject) => {
        resolve(a * 2)
    })
}
let p2 = function (a) {
    return new Promise((resolve, reject) => {
        resolve(a * 3)
    })
}
let p3 = function (a) {
    return new Promise((resolve, reject) => {
        resolve(a * 4)
    })
}

function runPromiseInSequence(arr, input) {
    return arr.reduce((promiseChain, currentFunction) => {
        return promiseChain.then(currentFunction)
    }, Promise.resolve(input))
}
runPromiseInSequence([p1, p2, p3], 10).then(console.log)

