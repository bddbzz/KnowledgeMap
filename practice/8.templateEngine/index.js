/**
 * 模板字符串用于模板编译
 * 1）生成模板对应的 JavaScript 执行代码 2）根据前一步生成的代码再生成渲染函数代码，可能用到字符串拼接或者数组 push 3）eval 或者 new Function 生成渲染函数 4）传入数据执行渲染函数返回字符串
 * 编译目标
 * echo("<ul>")
 * for(let i=0; i < data.supplies.length; i++)
 * echo("<li>")
 * echo(data.supplies[i])
 * echo("</li>")
 * }
 * echo("</ul>")
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
 * 简单的变量替换函数
 * @param {*} template
 * @param {*} data
 * @returns
 */
function compile1(template, data) {
  return template.replace(/\{(\w+)\}/g, function (match, $1) {
    return data[$1] || match
  })
}
console.log(compile1(`<div>我是一个{name}</div>`, { name: 'haha' }))
