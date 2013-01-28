
/**
 * arrows
 */

var arrowKeys = ['left','up','right','down']

var arrowMap = {
   'left': [-1, 0]
,    'up': [ 0,-1]
, 'right': [ 1, 0]
,  'down': [ 0, 1]
,  'left down': [-0.75, 0.75]
,    'left up': [-0.75,-0.75]
, 'right down': [ 0.75, 0.75]
,   'up right': [ 0.75,-0.75]
}

var oppositeArrow = {
  'up': 'down'
, 'down': 'up'
, 'left': 'right'
, 'right': 'left'
}

module.exports = function (keyboard) {
  var arrows = {}

  arrows.arrowMap = [Object, arrowMap]

  arrows.update = function (e) {
    if (!keyboard.keys.length) {
      e.setDirection('')
      return
    }

    var keys = keyboard.getMappedKeys()
      .filter(function (el) { return !!~arrowKeys.indexOf(el) })

    while (keys.length) {
      var last = keys[keys.length-1]
      var idx = keys.indexOf(oppositeArrow[last])
      if (~idx) {
        keys.splice(idx, 1)
        continue
      }
      
      var joined = keys.join(' ')
      if (joined in arrowMap) {
        e.setDirection(joined)
        return
      }

      for (var k in arrowMap) {
        if (keyboard.satisfies(keys, k)) {
          e.setDirection(k)
          return
        }
      }

      keys.shift()
    }
  }

  return arrows
}
