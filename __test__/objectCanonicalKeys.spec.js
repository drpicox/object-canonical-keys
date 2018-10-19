const objectCanonicalKeys = require('..')

test('returns an array like Object.keys object', () => {
  const keys = Object.keys({ name: 'alice', age: 7 })
  const canonicalKeys = objectCanonicalKeys({ name: 'alice', age: 7 })

  expect(canonicalKeys).toEqual(keys)
})

test('returns an array like Object.keys array', () => {
  const keys = Object.keys([1, 2, 3])
  const canonicalKeys = objectCanonicalKeys([1, 2, 3])

  expect(canonicalKeys).toEqual(keys)
})

test('returns the same instance if the same object is used twice', () => {
  const object = { name: 'alice', age: 7 }
  const canonicalKeys1 = objectCanonicalKeys(object)
  const canonicalKeys2 = objectCanonicalKeys(object)

  expect(canonicalKeys1).toBe(canonicalKeys2)
})

test('returns the same instance if the same object is used twice', () => {
  const object = { name: 'alice', age: 7 }
  const keys1 = Object.keys(object)
  const keys2 = Object.keys(object)

  expect(keys1).not.toBe(keys2)
})

test('returns the same instance if both objects have the same properties', () => {
  const canonicalKeys1 = objectCanonicalKeys({ name: 'alice', age: 7 })
  const canonicalKeys2 = objectCanonicalKeys({ name: 'alice', age: 7 })

  expect(canonicalKeys1).toBe(canonicalKeys2)
})

test('Object keys does not return the same instance if both objects have the same properties', () => {
  const keys1 = Object.keys({ name: 'alice', age: 7 })
  const keys2 = Object.keys({ name: 'alice', age: 7 })

  expect(keys1).not.toBe(keys2)
})

test('it only accepts objects', () => {
  expect(() => objectCanonicalKeys('hello')).toThrow()
})

test('it does not accept null', () => {
  expect(() => objectCanonicalKeys(null)).toThrow()
})
