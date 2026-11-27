---
title: Promise.all, allSettled, race, any
subject: JavaScript
order: 3
---

- **Promise.all** – use when all must succeed. Fails as soon as one fails.
- **Promise.allSettled** – waits for all and returns the result of each (success or failure). Never fails.
- **Promise.race** – returns whichever finishes first (success or failure) and ignores the rest.
- **Promise.any** – returns the first success. Fails only if all fail.
