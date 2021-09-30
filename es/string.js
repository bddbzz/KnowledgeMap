/**
 * 模板字符串用于模板编译
 * 1、根据模板生成模板表达式
 * /** 编译目标
 * echo("<ul>")
 * for(let i=0; i < data.supplies.length; i++)
 * echo("<li>")
 * echo(data.supplies[i])
 * echo("</li>")
 * }
 * echo("</ul>")
 * 2、根据模板表达式生成编译函数
 * 3、执行编译函数
 * @param {*} template
 * @returns
 */

function compile(template) {
  const evalExpr = /<%=(.*?)%>/g
  const expr = /<%(.*?)%>/g
  template = template.replace(evalExpr, '`);echo($1);echo(`').replace(expr, '`);$1;echo(`')
  template = 'echo(`' + template + '`)'
  let script = `(function parse(data){
        let output = ''
        function echo(html) {
        output += html
        }
        ${template} 
        return output
    })`
  return script
}
let template = `
    <ul>
      <% for(let i=0; i < data.supplies.length; i++) { %>
        <li><%= data.supplies[i] %></li>
      <% } %>
    </ul>
    `
const parse = eval(compile(template))
console.log(parse({ supplies: ['broom', 'mop', 'cleaner'] }))

/**
 * 标签模板实现HTML字符过滤
 * @param {*} template
 * @returns
 */
const safeHTML = function safeHTML(template) {
  let s = template[0]
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i])
    s += arg.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;')
    s += template[i]
  }
  return s
}
const sender = `<script>alert("haha");</script>`
console.log(safeHTML`您的姓名是：${sender}`)

const i18n = function i18n(template) {
  let s = template[0]
  for (let i = 1; i < arguments.length; i++) {
    let arg = String(arguments[i])
    s += arg
    s += template[i]
  }
  return s
}
const lang = {
  zh: {
    siteName: '我的宝宝'
  },
  en: {
    siteName: 'My Baby'
  }
}
const langConfig = lang.zh
console.log(i18n`Welcome to my site ${langConfig.siteName}`)

/**
 * String.raw pollyfill
 * @param {*} strings
 * @param  {...any} values
 * @returns
 */
String.raw = function (strings, ...values) {
  let output = ''
  let index
  for (index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index]
  }
  output += strings[index]
  return output
}

/**
 * charAt\charCodeAt\codePointAt
 * codePointAt (方法定义在字符串的实例对象，与 String.fromCodePoint 方法相反)
 * JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节
 * UTF-8 标准规定，0xD800 到 0xDFFF 之间的码点，不能单独使用，必须配对使用，每个字符固定为 2 个字节
 * 对于那些需要 4 个字节储存的字符（Unicode 码点大于 0xFFFF 的字符），JavaScript 会认为它们是两个字符
 * for of 循环可以识别大于 0xFFFF 的码点，传统的 for 循环无法识别这样的码点
 * String.fromCharCode(不可以识别大于 0xFFFF 的字符) String.fromCodePoint(可以识别大于 0xFFFF 的字符)
 */
{
  let s = '𠮷a'
  for (let ch of s) {
    console.log(ch.codePointAt(0).toString(16))
  }
  // 20bb7
  // 61
  let arr = [...'𠮷a'] // arr.length === 2
  arr.forEach((ch) => console.log(ch.codePointAt(0).toString(16)))
}
//测试一个字符由两个字节还是由四个字节组成
function is32Bit(c) {
  return c.codePointAt(0) > 0xffff
}
is32Bit('𠮷') // true
is32Bit('a') // false
