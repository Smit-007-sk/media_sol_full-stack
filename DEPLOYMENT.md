# Emperor Smart Solutions Production Deployment Guide

This document outlines the step-by-step production deployment process for the Emperor Smart Solutions central platform, comprising the NestJS REST API Backend (`Backend`) and Next.js 14 App Router Frontend (`Frontend`).

---

## 🚀 Fast Track: Docker Deployment (Recommended)

The easiest way to run and deploy the entire full-stack system (PostgreSQL + NestJS Backend + Next.js Frontend) is using **Docker Compose**.

### 1. Configure Environment
Copy the example environment file:
```bash
cp .env.docker.example .env
```
*(Optionally modify `DB_PASSWORD`, `JWT_SECRET`, and `NEXT_PUBLIC_API_URL`)*

### 2. Build & Launch Containers
```bash
docker compose up -d --build
```

### 3. Seed Database (First-Time Setup)
To create the initial admin user and default website templates:
```bash
docker compose exec backend npm run prisma:seed
```

### 4. Useful Docker Commands
- **View Logs**: `docker compose logs -f`
- **View Status**: `docker compose ps`
- **Stop Containers**: `docker compose down`
- **Restart Containers**: `docker compose restart`

---

## 🛠️ Traditional / Standalone VPS Deployment

### 1. Environment Configuration

#### A. NestJS Backend Configuration (`Backend/.env`)
Copy `Backend/.env.example` to `Backend/.env`:
```env
NODE_ENV=production
PORT=4000
DATABASE_URL="postgresql://postgres:<SECURE_PASSWORD>@localhost:5432/emperor_smart_solutions?schema=public"
JWT_SECRET="<SECURE_RANDOM_64_CHAR_JWT_SECRET>"
JWT_EXPIRES_IN="1d"
BCRYPT_SALT_ROUNDS=12
CORS_ORIGINS="https://admin.yourdomain.com,https://yourdomain.com"
DEV_ADMIN_PASSWORD="ChangeMe123!"
```

#### B. Next.js Frontend Configuration (`Frontend/.env.local`)
Copy `Frontend/.env.example` to `Frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL="https://api.yourdomain.com/api"
```

---

### 2. Backend Deployment Workflow (`Backend`)

```bash
cd Backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run prisma:seed
npm run build
pm2 start dist/main.js --name emperor-backend
```

---

### 3. Frontend Deployment Workflow (`Frontend`)

```bash
cd Frontend
npm install
npm run build
pm2 start npm --name emperor-frontend -- start -- -p 3000
```

---

## 🔒 Production Security & Verification Matrix

- [x] CORS enabled strictly for configured production frontend origins.
- [x] Sensitive variables (`JWT_SECRET`, `DATABASE_URL`) stored strictly in server-side `.env` files.
- [x] `NEXT_PUBLIC_API_URL` exposes only the public backend gateway endpoint.
- [x] Protected Admin routes (`/dashboard`, `/projects`, `/clients`, `/websites`, `/websites/[websiteId]`) require valid JWT bearer tokens.
- [x] Multi-stage Dockerfiles with non-root runner user and Next.js standalone optimization.
- [x] Automated Prisma migration execution on container startup.
