---
title: Debounce, Throttle & AbortController
subject: JavaScript
order: 2
---

## Debounce

Wait 300–400 ms after the user stops, then call once — prevents unnecessary calls.

```js
function debounce(fn, delay) {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
```

## Throttle

Call at most once every X ms, extra calls are ignored.

```js
function throttle(fn, delay) {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn(...args)
    }
  }
}
```

## Loading guard

Loading state + disable button on click — prevents double submit.

```jsx
const handleSubmit = async () => {
  if (loading) return
  setLoading(true)
  try { await api.save() }
  finally { setLoading(false) }
}

<button onClick={handleSubmit} disabled={loading}>Save</button>
```

## AbortController

Cancel the previous API call so its response doesn't override the new one.

```js
let controller

async function search(q) {
  controller?.abort()
  controller = new AbortController()
  try {
    const res = await fetch(`/api/search?q=${q}`, { signal: controller.signal })
    console.log(await res.json())
  } catch (err) {
    if (err.name !== 'AbortError') throw err
  }
}
```
