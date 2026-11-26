---
title: Keys
subject: DBMS
order: 2
---

## Example: Student

| roll_no | email | phone | name | dept_id |
|---|---|---|---|---|
| 101 | ravi@x.com | 98001 | Ravi | D1 |
| 102 | anu@x.com | 98002 | Anu | D2 |
| 103 | ravi.k@x.com | 98003 | Ravi | D1 |

## Keys

- **Super key** – Any set of columns that uniquely identifies a row → `{roll_no}`, `{email}`, `{roll_no, name}`
- **Candidate key** – The minimal super key → `{roll_no}`, `{email}`, `{phone}`
- **Primary key** – The chosen candidate key as identity (not NULL, only one) → `roll_no`
- **Alternate key** – Candidate keys not chosen as primary → `email`, `phone`
- **Foreign key** – Column pointing to another table's primary key → `dept_id`
- **Composite key** – Key made of 2+ columns → `(roll_no, course_id)`
- **Unique key** – Unique but can be NULL → `phone`
- **Surrogate key** – Made-up id with no meaning → auto-increment `id`
- **Natural key** – Real-world unique value → `email`

## Attributes

- **Prime** – Column that is part of any candidate key → `roll_no`, `email`, `phone`
- **Non-prime** – Column not in any candidate key → `name`, `dept_id`
