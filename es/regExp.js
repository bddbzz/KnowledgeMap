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
