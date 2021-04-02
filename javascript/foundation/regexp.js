//lastIndex表示下一次匹配开始的位置
//RegExp 的子类可以覆写 [@@match]()方法来修改默认行为。

//String.prototype.match RegExp.prototype.exec RegExp.prototype[@@match]() RegExp.prototype[@@matchAll]()
{
  const str = 'Hello everyone, I am Wangda.'
  const re = /(Wangda)/

  console.log(str.match(re))
  console.log(re.exec(str))
  console.log(re[Symbol.match](str))
  console.log(re[Symbol.matchAll](str))
}
//都返回数组,0:匹配字符串,1~n-1:捕获组，同时返回input\index\length等原型属性
//如果re = /(Wangda)/g，match只返回匹配项数组，不会返回捕获组，exec多次执行index将不一样，字符串查找完毕之后会返回null

//String.prototype.search RegExp.prototype.test RegExp.prototype[@@search]()
{
  const str = 'Hello everyone, I am Wangda.'
  const re = /(Wangda)/

  console.log(str.search(re))
  console.log(re.test(str))
  console.log(re[Symbol.search](str))
}
//search返回匹配到的位置索引，test返回是否匹配成功，如果re = /(Wangda)/g，search的返回结果不变,test再次执行会从lastIndex的位置开始查找，查找完毕后lastIndex重置为0

//String.prototype.split  RegExp.prototype[@@split]()
{
  class MyRegExp extends RegExp {
    [Symbol.split](str, limit) {
      const result = RegExp.prototype[Symbol.split].call(this, str, limit)
      return result.map((x) => '(' + x + ')')
    }
  }
  const str = 'Hello everyone, I am Wangda.Wangda'
  const re = /Wangda/
  const myRe = new MyRegExp('Wangda')
  console.log(str.split(re))
  console.log(str.split(myRe))
  console.log(re[Symbol.split](str))
}
//String.prototype.replace RegExp.prototype[@@replace]()
{
  const str = 'Hello everyone, I am Wangda.Wangda'
  const re = /(Wangda)/g

  console.log(
    str.replace(re, function (m, $1) {
      return 'Vision'
    })
  )

  console.log(
    re[Symbol.replace](str, function (m, $1) {
      return 'Vision'
    })
  )
}
