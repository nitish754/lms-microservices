<<<<<<< HEAD
# LMS Microservices Backend

Monorepo for a Learning Management System (LMS) backend built with **Node.js + Express + TypeScript + Prisma + Postgres** and orchestrated via **Turborepo**.

## Architecture Overview

### Services
- **auth-service**: Signup/login, email verification, JWT + refresh tokens, admin seed.
- **user-service**: User profile + preferences.
- **course-service**: Course CRUD + publish workflow.
- **content-service**: Video metadata + S3/CDN integration.
- **comment-service**: Threaded comments/replies.
- **rating-service**: 1–5 star ratings + comment (one per user per course).
- **notification-service**: Promotional and transactional emails.
- **bff-service**: Aggregation for course list/detail (BFF layer).

Each service has its **own Postgres database** and Prisma schema (except BFF).

### Access Control (RBAC)
- **STUDENT**: view courses, details, comments, ratings
- **TEACHER**: create/edit/delete/publish courses
- **ADMIN**: manage all content, remove misleading content, send promotions

### High-Level Flow
- Auth issues JWT access token + refresh token.
- API Gateway validates JWT and injects user context headers.
- Services trust these headers and only enforce RBAC/ownership checks.

## Repository Layout
```
/services
  /auth-service
  /user-service
  /course-service
  /content-service
  /comment-service
  /rating-service
  /notification-service
  /bff-service
/packages
  /shared
```

## Requirements
- Node.js 18+
- Postgres 14+
- npm 9+
- Docker (optional for local compose)

## Install
From repository root:
```
npm install
```

## Environment Setup
Each service has an `.env.example`. Copy and update values:
```
cp services/auth-service/.env.example services/auth-service/.env
```
Do the same for all services.

### Required Variables
- `DATABASE_URL` (per service)
- `JWT_SECRET` (auth-service)
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (auth-service seed)

## Local Dev (Docker Compose)
This starts Postgres + all services locally.
```
docker compose up --build
```

To stop:
```
docker compose down
```

Notes:
- DBs are created via `/deploy/docker/init-db.sql`
- Services use Docker-internal host `postgres` for DB

## Database Migrations
Run migrations per service:
```
npm run migrate -w @lms/auth-service
npm run migrate -w @lms/user-service
npm run migrate -w @lms/course-service
npm run migrate -w @lms/content-service
npm run migrate -w @lms/comment-service
npm run migrate -w @lms/rating-service
npm run migrate -w @lms/notification-service
```

## Seed Admin (auth-service)
```
npm run seed -w @lms/auth-service
```
This creates an **Admin** user from `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Run in Dev (without Docker)
```
npm run dev
```
This runs all services in parallel via Turbo.

## Build
```
npm run build
```

## Tests
Unit tests:
```
npm run test:unit -w @lms/auth-service
```

Integration tests (requires DB + env vars):
```
npm run test:integration -w @lms/auth-service
```

## Auth API (auth-service)
Base: `http://localhost:4001`

- `POST /auth/signup`
- `POST /auth/verify-email`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

## BFF API (bff-service)
Base: `http://localhost:4010`

- `GET /bff/courses`
- `GET /bff/courses/:id`

## Notes
- Each service uses repository/service/controller pattern.
- Prisma client is initialized in `src/utils/prisma.ts` per service.
- Replace the placeholder Prisma models as you implement real features.

## Trust Boundary (API Gateway)
This setup assumes **Amazon API Gateway** validates JWTs and injects user context headers.
Services trust these headers and only perform **authorization** (RBAC/ownership) checks.

Expected headers from API Gateway:
- `x-user-id`
- `x-user-role` (STUDENT | TEACHER | ADMIN | SYSTEM)
- `x-user-email` (optional)
=======
# lms-microservices
>>>>>>> 3e4e9fa0f06865d16c772ec7ba83ff66537a301f
