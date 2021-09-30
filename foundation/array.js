Array.prototype.myReduce = function (cb, pre) {
    let prev = pre || this[0]
    for (var i = pre ? 0 : 1; i < this.length; i++) {
        prev = cb(prev, this[i], i, this)
    }
    return prev
}
Array.prototype.myFilter = function (cb) {
    var arr = []
    for (var i = 0; i < this.length; i++) {
        var item = this[i]
        if (cb(item)) arr.push(item)
    }
    return arr
}
