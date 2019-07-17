let data = {
    name: 'monkey',
    age: 30,
    books: ['javascript', 'css', 'html'],
    id: Symbol("id"),
    others: {
        introduction: 'hello, i am monkey.'
    }
}
Object.defineProperties(data, {
    name: {
        get() {
            return data._name
        },
        set(v) {
            data._name = v
        }
    }
})
console.log(data.name)
data.name = 'xxd'
console.log(data.name)
let arr = [1]
let result = arr.reduce((acc, cur, index, arr) => {
    console.table({ acc, cur, index, arr })
    return acc + cur
}, 2)
console.log(result)