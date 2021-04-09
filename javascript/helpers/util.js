//冻结对象
var constantize = (obj) => {
  Object.freeze(obj)
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key])
    }
  })
}
//正确返回字符串长度的函数
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu)
  return result ? result.length : 0
}
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