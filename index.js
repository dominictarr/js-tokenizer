
function combine () {
  return new RegExp('('+[].slice.call(arguments).map(function (e) {
    var e = e.toString()
    return '(?:' + e.substring(1, e.length - 1) + ')'
  }).join('|')+')')
}
var s = 'foo  \
foo'
var string     = /"(?:(?:\/n\\"|[^"]))*?"/
var string_    = /'(?:(?:\\'|[^']))*?'/
var comment    = /\/\*[\s\S]*?\*\//
var comment2   = /\/\/.*?\n/
var whitespace = /\s+/
var keyword    = /\b(?:var|let|for|in|class|function|return|with|case|break|switch|export|new)\b/
var name       = /[a-zA-Z_\$][a-zA-Z_\$0-9]*/
var number     = /-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/
var punct      = /[;.:\?\^%(){}?\[\]<>=!]/
var regexp     = /\/(?:(?:\\\/|[^\/]))*?\//

var match = combine(string, string_, comment, comment2, whitespace, name, regexp, punct)


//console.log(
;(function f () {

  /*co"mme"nt!*/
  /*aoeuaoeu
  "string'"
  */
    function r () {
      'aoeu\*ntaohe*/unotehu'
      "comment in string //"
      //comment!
      var regexp = /.*/
    }

  //"string" in 'comment'

}).toString().split(match).filter(Boolean)
//)

//console.log(combine(comment))

var fs = require('fs')

console.log(fs.readFileSync(process.argv[2], 'utf-8').split(match).filter(Boolean))
