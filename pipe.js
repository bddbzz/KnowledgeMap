let triple = (x) => x * 3
let plus10 = (x) => (x + 10)
let minus10 = (x) => (x - 10)

function pipe(...functions) {
    return function (input) {
        return functions.reduce((acc, fn) => {
            return fn(acc)
        }, input)
    }
}
console.log(pipe(plus10, minus10, triple)(10))