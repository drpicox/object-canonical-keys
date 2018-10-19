'use strict'

var entryCount = 0
var MAX_ENTRIES = 4096

var quickMap = new WeakMap()

var byLength = {} // byFirstMidLast // memory

function areArrayEquals(a, b) {
  var length = a.length
  var index = 0
  while (index < length && a[index] === b[index]) index += 1
  return index === length
}

function objectCanonicalKeys(object) {
  if (typeof object !== 'object')
    throw new TypeError('Cannot get cannonical keys from a non-object')

  if (object === null)
    throw new TypeError('Cannot get cannonical keys from null')

  var result = quickMap.get(object)
  if (result) return result

  var keys = Object.keys(object)

  var length = keys.length
  var byFirstMidLast = byLength[length]
  if (!byFirstMidLast) {
    byFirstMidLast = {}
    byLength[length] = byFirstMidLast
  }

  var first = keys[0]
  var mid = keys[length / 2]
  var last = keys[length - 1]
  var firstMidLast = '' + first + '#' + mid + '#' + last
  var memory = byFirstMidLast[firstMidLast]
  if (!memory) {
    memory = []
    byFirstMidLast[firstMidLast] = memory
  }

  var conflicts = memory.length
  var row = 0
  while (row < conflicts) {
    var entry = memory[row]
    if (areArrayEquals(entry, keys)) break

    row += 1
  }

  if (row < conflicts) {
    result = memory[row]
  } else {
    result = keys

    entryCount += 1
    if (entryCount < MAX_ENTRIES) {
      memory.push(keys)
    } else {
      byLength = {}
    }
  }

  quickMap.set(object, result)
  return result
}

module.exports = objectCanonicalKeys
