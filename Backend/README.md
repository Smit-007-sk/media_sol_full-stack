# EMPEROR SMART SOLUTIONS — Central Website Management Backend

Production-ready NestJS centralized backend architecture designed to power reusable website templates for client projects.

## Project Architecture

```
NEXT.JS (Frontend / Templates / Admin Panel)
    ↓ REST API
NESTJS (Business Logic / Auth / Client & Website Management / Publishing)
    ↓ Prisma ORM
POSTGRESQL (Persistent Application Data)
```

### Core Architecture Concept
- **Template Source Code** defines **HOW** the website looks.
- **Backend & Database** define **WHAT** the website contains.
- Reusable templates (e.g. `template-03`) are paired with client-specific content and styling without modifying template source code.

---

## Directory Structure

```
Backend/
├── src/
│   ├── common/
│   │   └── filters/
│   │       └── http-exception.filter.ts
│   ├── health/
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

### 1. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your local environment variables in `.env`:
- `PORT`: Port on which the API runs (Default: `4000`)
- `NODE_ENV`: Development or production environment
- `CORS_ORIGINS`: Comma-separated allowed frontend origins

### 2. Installation

Install dependencies:

```bash
npm install
```

### 3. Build

Compile TypeScript source code:

```bash
npm run build
```

### 4. Running the Application

Development mode:

```bash
npm run start:dev
```

Production build execution:

```bash
npm run start:prod
```

---

## API Documentation Overview

Base URL: `http://localhost:4000/api`

### Health Check Endpoint
- **GET** `/api/health`
- **Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-08-26T10:25:00.000Z",
  "uptime": "12.34s",
  "service": "NestJS Central Backend API"
}
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTE4MThmZi05NjZkLTRiMTUtOWU2Yi1hMDkzMTQ5OTQ5YmEiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUudGVzdCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc4NzcyNjQ4NywiZXhwIjoxNzg3ODEyODg3fQ.cDMpr3shNdRETyRogLBEEQ6anv9dZvsBER69HepDdmY
token