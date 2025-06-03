# 🧬 Entity Relationship Diagram – Task Manager App

This document describes the structure and relationships between core entities in the database.

---

## 📋 Entities

### 👤 User

| Field      | Type      | Description           |
| ---------- | --------- | --------------------- |
| id         | UUID / PK | Unique identifier     |
| username   | String    | Unique username       |
| email      | String    | Email address         |
| password   | String    | Hashed password       |
| created_at | DateTime  | Account creation time |
| updated_at | DateTime  | Last update time      |

---

### ✅ Task

| Field       | Type      | Description                       |
| ----------- | --------- | --------------------------------- |
| id          | UUID / PK | Unique task ID                    |
| user_id     | FK(User)  | Owner of the task                 |
| title       | String    | Task title                        |
| description | Text      | Task details                      |
| priority    | Enum      | low / medium / high               |
| status      | Enum      | pending / in-progress / completed |
| created_at  | DateTime  | Creation timestamp                |
| updated_at  | DateTime  | Last modification timestamp       |

---

## 🔗 Relationship

```
User (1) ────────┐
                 │
                 └──< Task (Many)
```

- A **User** can have many **Tasks**
- Each **Task** belongs to exactly one **User**

---

## 🔄 Future Considerations

- Tag or label entities for grouping tasks
- Due dates and reminders(using Celery)
- Archived or deleted task states
