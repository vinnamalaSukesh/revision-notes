---
title: ACID & BASE
subject: DBMS
order: 1
---

## ACID

Rules that keep **transactions** correct. Used by SQL databases (PostgreSQL, MySQL).

| Letter | Meaning | Example |
|---|---|---|
| **A**tomicity | Transaction completes fully or not at all | Transfer: if debit succeeds but credit fails, the debit is rolled back |
| **C**onsistency | Data always follows the constraints and rules (valid state → valid state) | Balance can't go below 0, foreign keys must point to real rows |
| **I**solation | Transactions running **at the same time** don't see each other's half-done work | Two withdrawals at the same moment can't both read the old balance |
| **D**urability | Once committed, data survives a system failure | Written to disk via the write-ahead log (WAL) before "success" |

### My doubt: how is Isolation possible?

> If a user withdraws 50 ₹ and then 70 ₹ one by one, the 1st transaction affects the 2nd, right?

Yes, and that's fine. **One after another is not an isolation problem.** T1 has already committed, so T2 *should* see it.

```
Balance 100
T1: withdraw 50 → 50 → COMMIT
T2: withdraw 70 → sees 50 → not enough → fails ✅
```

Isolation protects transactions running **at the same moment**:

```
Balance 100
T1 reads 100
T2 reads 100          ← both read before either writes
T1 writes 50
T2 writes 30          ← overwrites T1  → "lost update" ❌
```

With isolation, T2 **waits** (lock) until T1 finishes, then reads 50 and fails correctly.

**One line:** Isolation = concurrent transactions give the same result as if they ran **one by one**. Seeing *committed* work is fine; seeing *half-done* work is not.

### Isolation levels

| Level | Prevents | Still allows |
|---|---|---|
| Read Uncommitted | nothing | dirty reads (seeing uncommitted data) |
| Read Committed *(Postgres default)* | dirty reads | same row reads differently twice |
| Repeatable Read *(MySQL default)* | above | phantom rows (new rows appear) |
| Serializable | everything | nothing, but slowest |

## BASE

Used by distributed NoSQL databases (Cassandra, DynamoDB, MongoDB by default).

| Letter | Meaning | Example |
|---|---|---|
| **BA** – Basically Available | Always responds, even if some servers fail (the answer may be slightly old) | App works during a node outage |
| **S** – Soft state | Data can **change by itself**, without any new write, because replicas are still syncing | Like count shows 100, then 101 a second later. Nobody clicked |
| **E** – Eventual consistency | Updates reach replicas **not immediately, but they will all match eventually** | All servers show 101 after a few seconds |

**How S and E connect:** E is the promise (*will match eventually*), S is what you see meanwhile (*values may shift*).

## ACID vs BASE

- **ACID focuses on** correctness and consistency over availability.
- **BASE focuses on** availability and speed over immediate consistency.

| | ACID | BASE |
|---|---|---|
| Priority | Correct data always | Always available, fast |
| Consistency | Immediate | Eventual |
| Databases | PostgreSQL, MySQL | Cassandra, DynamoDB, MongoDB |
| Use for | Money, orders, bookings | Likes, views, feeds, chat, analytics |

**Interview Q:** *Why not BASE for payments?* A wrong balance for even a few seconds could let someone spend the same money twice.

**Links to:** CAP theorem (system design). BASE = choosing **Availability** over **Consistency**.
