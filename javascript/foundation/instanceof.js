function instanceOf(left, right) {
    const prototype = right.prototype
    left = left.__proto__
    while (true) {
        if (left === null) {
            return false
        }
        if (left === prototype) {
            return true
        }
        left = left.__proto__
    }
}
console.log(instanceOf([], Array))
