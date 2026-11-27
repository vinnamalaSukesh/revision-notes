---
title: reduce
subject: JavaScript
order: 1
---

## Syntax

```js
array.reduce((acc, cur, index, array) => {
  return newAcc
}, initialValue)
```

## Examples

**Sum**
```js
[1, 2, 3, 4].reduce((acc, n) => acc + n, 0)   // 10
```

**Count occurrences**
```js
['a', 'b', 'a'].reduce((acc, ch) => {
  acc[ch] = (acc[ch] || 0) + 1
  return acc
}, {})   // { a: 2, b: 1 }
```

**Group by**
```js
// input
const people = [
  { name: 'Ravi', city: 'Hyd' },
  { name: 'Anu', city: 'Blr' },
  { name: 'Kiran', city: 'Hyd' },
]

// code
const byCity = people.reduce((acc, p) => {
  (acc[p.city] ||= []).push(p)
  return acc
}, {})

// output
{
  Hyd: [{ name: 'Ravi', city: 'Hyd' }, { name: 'Kiran', city: 'Hyd' }],
  Blr: [{ name: 'Anu', city: 'Blr' }],
}
```
