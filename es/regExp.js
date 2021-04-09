{
  const re = /(?<year>\d{4})-(?<month>\d{2})-(?<date>\d{2})/
  const str = '2021-04-01'
  const {
    groups: { month, year, date }
  } = re.exec(str)
  console.log(month, year, date)
  //使用$ < 组名 > 引用具名组

  console.log('2021-04-05'.replace(re, '$<date>/$<month>/$<year>'))
  //正则表达式内部引用\k<组名> \1
  const re_twice = /^(?<word>[a-z]+)!\k<word>$/
  console.log(re_twice.test('abc!abc'))
}
{
  //indices,第一个成员是整个匹配结果的开始位置和结束位置，之后是组匹配的开始位置和结束位置
  //indcies.group
  const text = 'zabbcdef'
  const re = /ab+(cd(ef))/
  const result = re.exec(text)
  result.indices // [ [1, 8], [4, 8], [6, 8] ]
}
//string.matchAll(regex)返回的是遍历器，所以可以用for...of循环取出。相对于返回数组，返回遍历器的好处在于，如果匹配结果是一个很大的数组，那么遍历器比较节省资源
//sticky，必须从剩余位置的第一个位置开始匹配，y修饰符号隐含了头部匹配的标志^
//global，只要剩余位置中存在匹配

function tokenize(TOKEN_REGEX, str) {
  const result = []
  let match = null
  while (match = TOKEN_REGEX.exec(str)) {
    result.push(match[1])
  }
  return result
}
console.log(tokenize(/\s*(\+|[0-9]+)\s*/g, "3x+4"))//g会忽略非法字符
console.log(tokenize(/\s*(\+|[0-9]+)\s*/y, "3x+4"))//y遇到非法字符就会停止

//ES2018引入s修饰符，使得.可以匹配任意字符，包括\r\n,dotAll模式
//先行断言
console.log(/\d+(?=%)/.test("100%"))

//先行否定断言

console.log(/^\d+(?!%)$/.test("100%"))

//后行断言
console.log(/(?<=\$)\d+/.test("$100"))

//后行否定断言
console.log(/^(?<!\$)\d+$/.test("$100"))
{
  console.log(/(?<=(\d+)(\d+))$/.exec('1053'))// ["", "1", "053"]
  console.log(/^(\d+)(\d+)$/.exec('1053'))// ["1053", "105", "3"]
  //上面代码中，需要捕捉两个组匹配。没有“后行断言”时，第一个括号是贪婪模式，第二个括号只能捕获一个字符，所以结果是105和3。
  //而“后行断言”时，由于执行顺序是从右到左，第二个括号是贪婪模式，第一个括号只能捕获一个字符，所以结果是1和053。
}
