const search = '?q=IIFE&q=ABCD&PC=U316&FORM=CHROMN'

//方法一，缺陷：无法合并同名健值
function parseQuery(search) {
    return JSON.parse('{"' + decodeURIComponent(search.substring(1)).replace(/=/g, '":"').replace(/&/g, '","').substr(0) + '"}')
}

parseQuery(search)

//方法二
//console.log(new URL('https://cn.bing.com/search?q=IIFE&PC=U316&FORM=CHROMN').searchParams)
//console.log(new URLSearchParams('?q=IIFE&PC=U316&FORM=CHROMN'))
//支持strSearchParamsURL查询字符串、arrSearchSequence数组形式的查询字符序列、objSearchKeyValue键值对形式的查询对象
// append: ƒ append()
// delete: ƒ delete()
// entries: ƒ entries()
// forEach: ƒ forEach()
// get: ƒ ()
// getAll: ƒ getAll()
// has: ƒ has()
// keys: ƒ keys()
// set: ƒ ()
// sort: ƒ sort()
// toString: ƒ toString()
// values: ƒ values()
const search = '?q=IIFE&q=ABC&PC=U316&FORM=CHROMN'

function parseQuery2(search) {
    const searchParams = new URLSearchParams(search)
    const params = {}
    for (let [key, value] of searchParams.entries()) {
        if (params[key]) {
            if (Array.isArray(params[key])) {
                params[key].push(value)
            } else {
                params[key] = [params[key], value]
            }
        } else {
            params[key] = value
        }
    }
    return params
}

parseQuery2(search)

//方法三
function parseQuery3(search) {
    const params = {}
    search.replace(/([^=&?]+)=([^&]+)/g, function (_, key, value) {
        if (params[key]) {
            if (Array.isArray(params[key])) {
                params[key].push(value)
            } else {
                params[key] = [params[key], value]
            }
        } else {
            params[key] = value
        }
        return _
    })
    return params
}

parseQuery3(search)

// 构造函数支持传入 URL 参数串
searchParams = new URLSearchParams('foo=1&bar=2')

// 构造函数也支持传入一个包含参数键值对的对象
searchParams = new URLSearchParams({ foo: '1', bar: '2' })

// 实例支持 get()、set()、has()、append() 四个方法
console.log(searchParams.get('foo')) // "1"
searchParams.set('foo', '10')
console.log(searchParams.has('bar')) // true
searchParams.append('foo', '100')

// 实例支持 toString() 方法
console.log(searchParams.toString()) // "foo=10&bar=2&foo=100"

// 实例支持 for-of 迭代
for (const [key, value] of searchParams) {
    console.log([key, value])
    // ["foo", "10"]
    // ["bar", "2"]
    // ["foo", "100"]
}

class URLSearchParams {
    #searchParams = []

    constructor(init) {
        if (typeof init === 'string') {
            this.#searchParams = init.split('&').map((kv) => kv.split('='))
        } else {
            this.#searchParams = Object.entries(init)
        }
    }

    get(key) {
        const param = this.#searchParams.find((param) => param[0] === key)
        return param && param[1]
    }

    set(key, value) {
        const param = this.#searchParams.find((param) => param[0] === key)

        if (param) {
            param[1] = value
        } else {
            this.#searchParams.push([key, value])
        }
    }

    has(key) {
        return this.#searchParams.some((param) => param[0] === key)
    }

    append(key, value) {
        this.#searchParams.push([key, value])
    }

    toString() {
        return this.#searchParams.map((param) => param.join('=')).join('&')
    }

    *[Symbol.iterator]() {
        yield* this.#searchParams
    }
}
