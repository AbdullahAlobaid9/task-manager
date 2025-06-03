# 🧱 System Design Document – Task Manager App

This document outlines the architecture, components, and design choices for the Task Manager application.

---

## 1. 🧭 Overview

A full-stack task management system built with Django (REST API), React (frontend), PostgreSQL (database), Redis (message broker), and Celery (background task queue). The app supports authentication, task CRUD, filtering, and background notifications.

---

## 2. 🗺️ Architecture Diagram (Textual)

```
[ React (Frontend) ]
         |
         | HTTP (JWT Auth, JSON)
         ↓
[ Django REST API (Backend) ] ← Celery ← Redis
         |
         ↓
[ PostgreSQL DB ]
```

---

## 3. 🔍 Component Breakdown

### ✅ Frontend (React)

- Handles user registration/login with JWT
- Displays task list with filtering, search, and status/priority updates
- Sends requests to `/api/` endpoints with Bearer tokens

### ✅ Backend (Django + DRF)

- Provides RESTful APIs for users and tasks
- Authenticated via JWT (SimpleJWT)
- Triggers background tasks (Celery) upon task creation

### ✅ Database (PostgreSQL)

- Stores users and tasks
- Tasks linked to users via foreign key

### ✅ Queue (Celery + Redis)

- Celery handles background notifications
- Redis acts as broker between Django and Celery worker

---

## 4. 🔁 Data Flow

1. User registers/logs in → JWT issued
2. Frontend stores token and uses it for requests
3. User creates a task
4. Backend saves task → triggers `notify_task_created` via Celery
5. Celery logs notification message asynchronously
6. Frontend fetches tasks and displays filtered/updated view

---

## 5. 🔧 Technology Justification

| Layer    | Tech           | Reason                                |
| -------- | -------------- | ------------------------------------- |
| Frontend | React          | Fast SPA, great form/state management |
| Backend  | Django REST    | Robust, secure, rapid API dev         |
| Auth     | JWT(SimpleJWT) | Stateless auth, frontend-friendly     |
| DB       | PostgreSQL     | ACID-compliant, relational integrity  |
| Queue    | Celery + Redis | Simple task queue for notifications   |
| DevOps   | Docker         | Isolated, reproducible environment    |

---

## 6. 📈 Scalability Notes

- Can horizontally scale Django with Gunicorn behind a load balancer
- Celery workers can scale independently
- Redis and PostgreSQL can be managed via managed cloud services (e.g., AWS RDS, Elasticache)
- React frontend is static and deployable via CDN or S3

---

## 7. 🔁 DevOps Flow

- Docker used to build and run all services
- `docker-compose` manages multi-container environment
- (Optional) GitHub Actions planned for CI/CD

---

## ✅ Status

- All core components functional
- Background task demo via print/log
- Ready for deployment
