
function combine () {
  return new RegExp('('+[].slice.call(arguments).map(function (e) {
    var e = e.toString()
    return '(?:' + e.substring(1, e.length - 1) + ')'
  }).join('|')+')')
}

var string     = /"(?:(?:\/n\\"|[^"]))*?"/
var string_    = /'(?:(?:\\'|[^']))*?'/
var comment    = /\/\*[\s\S]*?\*\//
var comment2   = /\/\/.*?\n/
var whitespace = /\s+/
var keyword    = /\b(?:var|let|for|in|class|function|return|with|case|break|switch|export|new)\b/
var name       = /[a-zA-Z_\$][a-zA-Z_\$0-9]*/
var number     = /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/
var punct      = /[;.:\?\^%()\{\}?\[\]<>=!&|+\-,]/
var regexp     = /\/(?:(?:\\\/|[^\/]))*?\//

var match = combine(string, string_, comment, comment2, 
            whitespace, name, number, regexp, punct)

module.exports = function (str) {
  return str.split(match).filter(function (e, i) {
    if(i % 2)
      return true

    if(e !== '')
      throw new Error('invalid token:'+JSON.stringify(e))

  })
}

if(!module.parent) {
  var fs = require('fs')
  console.log(module.exports(fs.readFileSync(process.argv[2], 'utf-8')))
}
