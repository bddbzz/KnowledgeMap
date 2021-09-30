//拷贝
//浅拷贝：扩展运算符、Object.assign
//深拷贝：

const m = {
    id: 1,
    name: 'name',
    getId() {
        return this.id
    },
    setName(str) {
        this.name = str
    }
}
const n = [{ id: 1, name: 2 }, m]
const o = function o(a, b) {
    return a + b
}
class P {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
    setId(id) {
        this.id = id
    }
}
const obj = {
    a: 1,
    b: '',
    c: true,
    d: null,
    e: undefined,
    f: Symbol(),
    g: BigInt(2),
    h: [1, 2, 3],
    i: {},
    j: () => {},
    k: new Date(),
    l: new RegExp('a', 'gi'),
    m,
    n,
    o,
    p: P,
    q: new P(1, 'zz')
}

const isType = (obj, type) => {
    if (typeof obj !== 'object') return false
    const typeString = Object.prototype.toString.call(obj)
    let flag
    switch (type) {
        case 'Array':
            flag = typeString === '[object Array]'
            break
        case 'Date':
            flag = typeString === '[object Date]'
            break
        case 'RegExp':
            flag = typeString === '[object RegExp]'
            break
        default:
            break
    }
    return flag
}
const getRegExp = (re) => {
    var flags = ''
    if (re.global) flags += 'g'
    if (re.ignoreCase) flags += 'i'
    if (re.multiline) flags += 'm'
    return flags
}

const clone = (parent) => {
    const parents = []
    const children = []
    const _clone = (parent) => {
        if (parent === null) return null
        if (typeof parent !== 'object') return parent
        let child, proto
        if (isType(parent, 'Array')) {
            child = []
        } else if (isType(parent, 'RegExp')) {
            child = new RegExp(parent.source, getRegExp(parent))
            if (parent.lastIndex) child.lastIndex = parent.lastIndex
        } else if (isType(parent, 'Date')) {
            child = new Date(parent.getTime())
        } else {
            proto = Object.getPrototypeOf(parent)
            child = Object.create(proto)
        }
        const index = parents.indexOf(parent)
        if (index !== -1) {
            return children[index]
        }
        parents.push(parent)
        children.push(child)
        for (let i in parent) {
            child[i] = _clone(parent[i])
        }
        return child
    }
    return _clone(parent)
}

//1、JSON.parse(JSON.stringfy(object))
//有BigInt会报错，undefined、Symbol、class定义、函数（对象的属性方法、函数）会被忽略，Date会变成字符串形式，RegExp会变成空对象
console.log(JSON.parse(JSON.stringify(obj)))

//2、深拷贝函数
console.log(clone(obj))
//7种基本类型、函数直接返回
//数组、对象迭代递归拷贝
//循环引用的问题
