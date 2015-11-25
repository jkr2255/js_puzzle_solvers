'use strict'

# IE8以下ではプロダクト全体が動かないので、古いブラウザのことは気にしない

timeouts = []
messageName = "set_timeout_#{Math.random()}"

setImmediate = (func)->
  timeouts.push func
  window.postMessage messageName, '*'
  null

window.addEventListener 'message', (event)->
  if event.source == window && event.data == messageName
    do event.stopPropagation
    if timeouts.length > 0
      timeouts.shift()()
  return
, true

module.exports = setImmediate
