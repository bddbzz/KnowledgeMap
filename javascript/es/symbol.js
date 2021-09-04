function* a() {}

const symbol = Symbol('a')
const obj = {
    [symbol]: () => {}
}
console.log(obj[symbol].name)
