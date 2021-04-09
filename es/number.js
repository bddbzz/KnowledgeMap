//ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。用Number转十进制
//在可接受的误差范围
function withinErrorMargin(left, right) {
    return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}
//是否在整数的安全边界
Number.isSafeInteger = function (n) {
    return (typeof n === 'number' &&
        Math.round(n) === n &&
        Number.MIN_SAFE_INTEGER <= n &&
        n <= Number.MAX_SAFE_INTEGER);
}

// 9007199254740993===9007199254740992
// true
//如果只验证运算结果是否为安全整数，很可能得到错误结果，应同时验证两个运算数和运算结果
function trusty(left, right, result) {
    if (
        Number.isSafeInteger(left) &&
        Number.isSafeInteger(right) &&
        Number.isSafeInteger(result)
    ) {
        return result;
    }
    throw new RangeError('Operation cannot be trusted!');
}

Math.trunc = Math.trunc || function (x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
};

Math.sign = Math.sign || function (x) {
    x = +x;
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};

Math.cbrt = Math.cbrt || function (x) {
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
};