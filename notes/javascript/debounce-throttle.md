---
title: Debounce, Throttle & AbortController
subject: JavaScript
order: 2
---

- **Debounce** – Wait 300–400 ms after the user stops, then call once — prevents unnecessary calls.
- **Throttle** – Call at most once every X ms, extra calls are ignored.
- **AbortController** – Cancel the previous API call so its response doesn't override the new one.

```jsx
import { useEffect, useRef, useState } from 'react'

export default function SearchForm() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const lastSubmit = useRef(0)

  useEffect(() => {
    if (!query) return

    // ABORT CONTROLLER
    const controller = new AbortController()

    // DEBOUNCE – call API 400ms after user stops typing
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${query}`, { signal: controller.signal })
        setResults(await res.json())
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err)
      }
    }, 400)

    // runs when query changes again
    return () => {
      clearTimeout(timer)   // cancel pending debounce
      controller.abort()    // cancel previous API call
    }
  }, [query])

  // THROTTLE – submit at most once every 2s
  const handleSubmit = (e) => {
    e.preventDefault()
    const now = Date.now()
    if (now - lastSubmit.current < 2000) return
    lastSubmit.current = now

    fetch('/api/submit', { method: 'POST', body: JSON.stringify({ query }) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="submit">Submit</button>
      <ul>
        {results.map((r) => <li key={r.id}>{r.name}</li>)}
      </ul>
    </form>
  )
}
```
