
function combine () {
  return new RegExp('('+[].slice.call(arguments).map(function (e) {
    var e = e.toString()
    return '(?:' + e.substring(1, e.length - 1) + ')'
  }).join('|')+')')
}

var pattern = {
  string1    : /"(?:(?:\/n\\"|[^"]))*?"/
, string2    : /'(?:(?:\\'|[^']))*?'/
, comment    : /\/\*[\s\S]*?\*\//
, comment2   : /\/\/.*?\n/
, whitespace : /\s+/
, keyword    : /\b(?:var|let|for|in|class|function|return|with|case|break|switch|export|new)\b/
, name       : /[a-zA-Z_\$][a-zA-Z_\$0-9]*/
, number     : /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/
, regexp     : /\/(?:(?:\\\/|[^\/]))*?\//
, punct      : /[;.:\?\^%()\{\}?\[\]<>=!&|+\-,]/
}

var match = combine(
  pattern.string1,
  pattern.string2,
  pattern.comment,
  pattern.comment2, 
  pattern.whitespace,
  pattern.name,
  pattern.number,
  pattern.regexp,
  pattern.punct
)

module.exports = function (str) {
  return str.split(match).filter(function (e, i) {
    if(i % 2)
      return true

    if(e !== '')
      throw new Error('invalid token:'+JSON.stringify(e))

  })
}

module.exports.type = function (e) {
  for (var type in pattern)
    if(pattern[type].test(e))
      return type
  return null
}
if(!module.parent) {
  var fs = require('fs')
  console.log(module.exports(fs.readFileSync(process.argv[2], 'utf-8')))
}
