---
title: Promises & async/await
subject: JavaScript
order: 3
---

## Promise

A value that arrives later. 3 states → UI:

- **pending** → loading
- **fulfilled** → data
- **rejected** → error

## async/await in React

```jsx
useEffect(() => {
  async function load() {
    try {
      const res = await fetch('/api/orders')
      if (!res.ok) throw new Error('Failed')   // fetch doesn't throw on 404/500
      setOrders(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  load()
}, [])
```

- `useEffect(async () => ...)` ❌. Define an async function inside the effect and call it.

## Combinators

- **Promise.all** – use when all must succeed. Fails as soon as one fails.
- **Promise.allSettled** – waits for all and returns the result of each (success or failure). Never fails.
- **Promise.race** – returns whichever finishes first (success or failure) and ignores the rest.
- **Promise.any** – returns the first success. Fails only if all fail.

```js
const [user, orders] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/orders').then(r => r.json()),
])
```
