---
title: ACID vs BASE
subject: DBMS
order: 1
---

## ACID

- **Atomicity** – Transaction complete or nothing
- **Consistency** – Should follow the constraints and rules
- **Isolation** – If two transactions are happening, one should not affect another
- **Durability** – Survive the system failure

## BASE

- **BA – Basically available** – Should be available always
- **S – Soft state** – Data can change by itself while replicas sync
- **E – Eventual consistency** – Updates reach replicas slowly (not immediately), but eventually all match
