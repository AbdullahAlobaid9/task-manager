# 🗂️ Task Manager App

A full-stack task management platform with user authentication, task filtering, search, background notifications, and Docker-based deployment. Built with Django, React, PostgreSQL, Redis, and Celery.

---

## 🚀 Features

- ✅ User registration and login (JWT-based)
- ✅ Task creation, editing, deletion
- ✅ Priority and status filtering
- ✅ Search tasks by title or description (instant frontend)
- ✅ Background notifications via Celery + Redis
- ✅ Responsive UI using React
- ✅ Fully Dockerized environment with PostgreSQL

---

## 🛠️ Tech Stack

| Layer    | Technology                    |
| -------- | ----------------------------- |
| Frontend | React, JavaScript             |
| Backend  | Django, Django REST Framework |
| Auth     | JWT (via SimpleJWT)           |
| Database | PostgreSQL                    |
| Queue    | Celery + Redis                |
| DevOps   | Docker, Docker Compose        |
| CI/CD    | GitHub Actions                |

---

## 📦 Setup Instructions

### 📁 1. Clone the repository

```bash
git clone https://github.com/abdullahalobaid9/task-manager.git
cd task-manager
```

### 🐳 2. Run with Docker

```bash
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

---

## ⚙️ Services Overview

| Service  | Port | Description               |
| -------- | ---- | ------------------------- |
| frontend | 3000 | React app                 |
| backend  | 8000 | Django REST API           |
| postgres | 5432 | Relational database       |
| redis    | 6379 | Message broker for Celery |
| celery   | —    | Worker for async tasks    |

---

## 📮 API Endpoints (Samples)

- `POST /api/users/register/` – Register user
- `POST /api/users/login/` – Obtain JWT tokens
- `GET /api/tasks/` – List tasks (with optional `?priority=` and `?status=`)
- `POST /api/tasks/` – Create task
- `PATCH /api/tasks/:id/` – Update task
- `DELETE /api/tasks/:id/` – Delete task

---

## 📎 Assumptions

- Search is handled on the frontend for instant performance.
- Notifications are mocked via `print()` for assessment purposes.
- All services are assumed to run locally via Docker.

---

## 🧪 Running Tests (optional)

You can add Django test cases here in the future.

---

## 👨‍🔧 Author

- Abdullah Alobaid
- [GitHub](https://github.com/abdullahalobaid9)
