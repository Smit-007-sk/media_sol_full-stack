# Emperor Smart Solutions Production Deployment Guide

This document outlines the step-by-step production deployment process for the Emperor Smart Solutions central platform, comprising the NestJS REST API Backend (`C:\template\Backend`) and Next.js 14 App Router Frontend (`C:\template\Project-1(AI)`).

---

## 1. Environment Configuration

### A. NestJS Backend Configuration (`Backend/.env`)

Copy `Backend/.env.example` to `Backend/.env` and update the values for your production environment:

```env
# Node Environment
NODE_ENV=production
PORT=4000

# PostgreSQL Connection String
DATABASE_URL="postgresql://postgres:<SECURE_PASSWORD>@<DB_HOST>:5432/emperor_smart_solutions?schema=public"

# JWT Authentication Configuration
JWT_SECRET="<SECURE_RANDOM_64_CHAR_JWT_SECRET>"
JWT_EXPIRES_IN="1d"
BCRYPT_SALT_ROUNDS=10

# Allowed CORS Origins (Comma Separated)
CORS_ORIGINS="https://admin.yourdomain.com,https://yourdomain.com"
```

### B. Next.js Frontend Configuration (`Project-1(AI)/.env.local`)

Copy `Project-1(AI)/.env.example` to `Project-1(AI)/.env.local`:

```env
NEXT_PUBLIC_API_URL="https://api.yourdomain.com/api"
```

---

## 2. Backend Deployment Workflow (`C:\template\Backend`)

1. **Install Dependencies**:
   ```bash
   cd C:\template\Backend
   npm install --production=false
   ```

2. **Validate Prisma Schema & Generate Client**:
   ```bash
   npx prisma validate
   npx prisma generate
   ```

3. **Database Migration / Schema Deployment**:
   - For existing databases, deploy migrations:
     ```bash
     npx prisma migrate deploy
     ```

4. **Build Production Dist Output**:
   ```bash
   npm run build
   ```

5. **Start Production Backend Process**:
   ```bash
   npm run start:prod
   ```
   *Alternatively, use PM2 or Docker*:
   ```bash
   pm2 start dist/main.js --name emperor-backend
   ```

---

## 3. Frontend Deployment Workflow (`C:\template\Project-1(AI)`)

1. **Install Dependencies**:
   ```bash
   cd C:\template\Project-1(AI)
   npm install
   ```

2. **Build Optimized Production Assets**:
   ```bash
   npm run build
   ```

3. **Start Production Next.js Server**:
   ```bash
   npm run start -p 3000
   ```
   *Alternatively, use PM2 or Vercel/Docker*:
   ```bash
   pm2 start npm --name emperor-frontend -- start -- -p 3000
   ```

---

## 4. Production Security & Verification Matrix

- [x] CORS enabled strictly for configured production frontend origins.
- [x] Sensitive variables (`JWT_SECRET`, `DATABASE_URL`) stored strictly in server-side `.env` files.
- [x] `NEXT_PUBLIC_API_URL` exposes only the public backend gateway endpoint.
- [x] Protected Admin routes (`/dashboard`, `/projects`, `/clients`, `/websites`, `/websites/[websiteId]`) require valid JWT bearer tokens.
- [x] STAFF role users enforce read-only access (403 Forbidden on write operations).
- [x] DRAFT and ARCHIVED websites are protected from public access at `/site/[slug]`.
- [x] PUBLISHED websites render pure template UI with 0 admin details exposed.
