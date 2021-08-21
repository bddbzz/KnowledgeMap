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
