objectCanonicalKeys ![building status](https://www.travis-ci.org/drpicox/object-canonical-keys.svg?branch=master)
=============

Object canonical keys is a replacement for [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys). The original `Object.keys` returns a new array for each invocation, regardless it is the same object, or it has the same keys. This behavior is okay in most of the situations, but when we are handling concepts as _purity_ or as _memoizers_ it becomes a problem. 

If you look to the [Redux](https://redux.js.org) documentation, inside recipes there is the recommendation of splitting the [state as follows](https://redux.js.org/recipes/structuringreducers/normalizingstateshape):

```js
{
  entities: {
    byId: {
      id1: { ... },
      id2: { ... },
      ...
      idN: { ... },
    },
    allIds: ['id1', 'id2', ..., 'idN'],
  }
}
```

It is because ids usually do not change, but entities do. By keeping them apart in two lists, you can keep the same instance of the array of ids when you change your objects. It enables all sorts of optimizations and delivers dramatic improvements in React and other library performances.

However, there is a catch; you must write two logics for every kind of entity and action: one to manage entities, and other to manage the array of keys. That is not desirable, it adds extra complexity and breaks part of the Redux philosophy of having a normalized state and let memoization do the complex job of computing derived values efficiently.

`objectCanonicalKeys` borns with the desire to stop with this duplicity and keep high degrees of performance. Unlike `Object.keys`, `objectCanonicalKeys` ensures to return the same instance in each invocation with any object with the same keys. 


Quick Use
----------

Install with `npm`:

```
npm install --save object-canonical-keys
```

or `yarn`:

```
yarn add object-canonical-keys
```

And use in your Code:

```javascript
import objectCanonicalKeys from 'object-canonical-keys'

const getEntitiesIds = (state) => objectCanonicalKeys(state.entities)
```

objectCanonicalKeys API
-----------------------

It is a replacement of `Object.keys` except that it does work with non-objects.

Given any object it returns an array with the keys like the one returned by `Object.keys`:

```javascript
const keys = Object.keys({ name: 'alice', age: 7 })
const canonicalKeys = objectCanonicalKeys({ name: 'alice', age: 7 })

expect(canonicalKeys).toEqual(keys)
```

Given any array it returns an array with the keys like the one returned by `Object.keys`:

```javascript
const keys = Object.keys([1, 2, 3])
const canonicalKeys = objectCanonicalKeys([1, 2, 3])

expect(canonicalKeys).toEqual(keys)
```

Unlike `Object.keys`, it returns the same array instance given the same object:

```javascript
// objectCanonicalKeys
const object = { name: 'alice', age: 7 }
const canonicalKeys1 = objectCanonicalKeys(object)
const canonicalKeys2 = objectCanonicalKeys(object)

expect(canonicalKeys1).toBe(canonicalKeys2)

// Object.keys
const keys1 = Object.keys(object)
const keys2 = Object.keys(object)

expect(keys1).not.toBe(keys2)
```

Unlike `Object.keys`, it returns the same array instance if the object has the same keys:

```javascript
// objectCanonicalKeys
const canonicalKeys1 = objectCanonicalKeys({ name: 'alice', age: 7 })
const canonicalKeys2 = objectCanonicalKeys({ name: 'alice', age: 7 })

expect(canonicalKeys1).toBe(canonicalKeys2)

// Object.keys
const keys1 = Object.keys({ name: 'alice', age: 7 })
const keys2 = Object.keys({ name: 'alice', age: 7 })

expect(keys1).not.toBe(keys2)
```

Unlike `Object.keys`, it throws an error when a non-object or array is used:

```javascript
expect(() => objectCanonicalKeys('hello')).toThrow()
```

It throws an exception when a null value is used:

```javascript
expect(() => objectCanonicalKeys(null)).toThrow()
```

## See also

You may be also interested in a string cache to create memoizers:

- [StringCacheMap](https://github.com/drpicox/string-cache-map): 
  a replacement for WeakMap when using strings instead of objects
  or arrays.
