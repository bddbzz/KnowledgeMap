//bind方法返回一个新的函数，特点，第一个参数作为运行他的this，后面的参数将作为实参传入
Function.prototype.myBind = function (obj, ...args) {
    if (typeof this != 'function') {
        throw new Error('not a function')
    }
    const self = this
    return function F(...fArgs) {
        return self.apply(obj, args.concat(fArgs))
    }
}

function calc(...args) {
    return this.initialValue + args.reduce((acc, cur) => acc + cur, 0)
}
const obj = {
    initialValue: 10
}
const newCalc = calc.myBind(obj, 10)
newCalc(1, 2)

//call/apply都是改变this的指向，第二参数一个是若干参数的列表一个是数组
//call实现思路，将函数设为对象的属性，执行这个这个对象的属性方法，删除该方法
Function.prototype.myCall = function (context, ...args) {
    if (typeof this != 'function') {
        throw new Error('not a function')
    }
    const obj = context || window
    obj.fn = this
    const result = obj.fn(...args)
    delete obj.fn
    return result
}

let mock = { value: 1 }
function mockNum(b) {
    console.log('value', this.value + b)
}
mockNum.myCall(mock, 2)

Function.prototype.myApply = function (context, args) {
    if (typeof this != 'function') {
        throw new Error('not a function')
    }
    //return this.myCall(context, ...args)
    const obj = context || window
    obj.fn = this
    const result = obj.fn(...args)
    delete obj.fn
    return result
}
mockNum.myApply(mock, [2])
