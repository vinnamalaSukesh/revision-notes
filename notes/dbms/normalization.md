---
title: 1NF, 2NF, 3NF, BCNF
subject: DBMS
order: 3
---

- **1NF** – Single value in a cell → otherwise querying and write operations become complex
- **2NF** – No partial dependency: a non-prime column should depend on the whole primary key → `name`, `dept_id` depend only on `roll_no` (part of `(roll_no, course)`), so they repeat in every course row
- **3NF** – A non-prime attribute should not depend on another non-prime attribute → `dept_name` depends on `dept_id`, so renaming a dept means updating every student row
- **BCNF** – For every X → Y, X must be a super key → `teacher → course`, but `teacher` is not a super key, so "Rao teaches DBMS" repeats for every student
