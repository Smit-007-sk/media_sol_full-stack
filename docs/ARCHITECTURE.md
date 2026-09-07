# System Architecture & Technical Design

This document details the high-level architecture, module decomposition, networking topology, security model, and data flow of the Emperor Smart Solutions platform.

---

## 1. Architectural Overview

Emperor Smart Solutions is an enterprise-grade agency content management and dynamic website rendering platform. It allows admins to manage clients, projects, reusable website templates, and publish client-customized websites with real-time theme overrides and content management.

```mermaid
flowchart TB
    subgraph Client Layer
        WebUser["Public Visitors / Clients"]
        AdminUser["Staff & Admin Users"]
    end

    subgraph Edge & Reverse Proxy
        Nginx["Nginx (SSL Termination :443, HTTP Redirect :80)"]
    end

    subgraph Application Tier
        NextApp["Next.js 14 Frontend Service (Port 3000/3050)"]
        NestAPI["NestJS Backend Service (Port 4000/4050)"]
    end

    subgraph Data Tier
        DB[("PostgreSQL 16 Database")]
        Storage["Media Storage / Static CDN"]
    end

    WebUser -->|HTTPS| Nginx
    AdminUser -->|HTTPS| Nginx

    Nginx -->|/ (Page Routes)| NextApp
    Nginx -->|/api/ (REST Calls)| NestAPI

    NextApp -->|Internal / Client Fetch| NestAPI
    NestAPI -->|Prisma ORM (SQL)| DB
    NestAPI -->|Upload / Serve| Storage
```

---

## 2. Core Subsystems

### 2.1 Backend (NestJS Architecture)
Located in `c:/media_sol_full-stack/Backend`:
- **Modular Design**: Structured using NestJS Modules, Controllers, Services, and DTOs.
- **Data Persistence**: Prisma ORM with PostgreSQL.
- **Authentication**: JWT Strategy via `@nestjs/passport` and `passport-jwt`.
- **Validation**: Global `ValidationPipe` with `class-validator` and `class-transformer`.
- **Documentation**: Swagger/OpenAPI generated at `/api/docs`.
- **Exception Handling**: Global `HttpExceptionFilter` producing consistent JSON error structures.

#### Backend Module Structure:
```
Backend/src/
├── app.module.ts              # Root aggregation module
├── main.ts                   # Application bootstrap, CORS, Swagger, validation
├── auth/                     # JWT authentication, guards, roles, hashing
├── users/                    # User account management (ADMIN / STAFF)
├── projects/                 # Top-level agency projects/categories
├── templates/                # Reusable website template specs
├── clients/                  # Client business records & details
├── websites/                 # Deployed/customized client websites
├── content/                  # Modular CMS section engines:
│   ├── theme/                # Color palettes, typography, layout options
│   ├── hero/                 # Hero banners, CTA buttons, media
│   ├── about/                # About company/founder overview
│   ├── services/             # Dynamic service items & pricing
│   ├── gallery/              # Media galleries & portfolios
│   ├── testimonials/         # Client reviews and quotes
│   ├── contact/              # Contact forms, maps, address info
│   ├── social-links/         # Social platform links
│   └── media/                # File uploads, metadata, assets
├── database/                 # PrismaService lifecycle connection
└── health/                   # System health check endpoints
```

---

### 2.2 Frontend (Next.js 14 App Router)
Located in `c:/media_sol_full-stack/Frontend`:
- **App Router (`src/app/`)**: Server & Client Components leveraging Next.js 14.
- **Admin Management Suite (`src/app/(admin)/`)**: Full CRUD interfaces for Projects, Templates, Clients, Websites, Media Assets, and Settings.
- **Public & Agency Pages**:
  - `/` — Emperor Media Solutions agency home page.
  - `/work` — Portfolio showcase.
  - `/services` — Services offering.
  - `/why-us` — Agency differentiators.
  - `/offer` — Landing page & lead acquisition.
  - `/templates` & `/templates/[slug]` — Interactive template catalog & live preview.
  - `/site/[slug]` — Production client website rendering route.
  - `/login` — Secure admin authentication.
- **Dynamic Template Registry (`src/templates/registry.tsx`)**: In-memory registry that maps database template keys (`template-01`, `aurora-corporate`, etc.) to React visual tree components.
- **Central Theme Provider (`src/components/theme/CentralThemeProvider.tsx`)**: Dynamic CSS variables injector that changes color schemes, typography, container widths, and border radii in real-time.

---

## 3. Security Model

### 3.1 Authentication & Authorization Flow
1. **User Login**: Admin/Staff sends `POST /api/auth/login` with email and password.
2. **Password Verification**: Backend verifies bcrypt hash (`saltRounds = 12`).
3. **JWT Issuance**: Backend returns signed JWT containing `{ sub: userId, email, role }`.
4. **Token Storage**: Frontend stores token in `localStorage` (`access_token`) and headers (`Authorization: Bearer <token>`).
5. **Guard Enforcement**:
   - `JwtAuthGuard`: Enforces token validity on protected endpoints.
   - `RolesGuard`: Enforces role-based permissions (`ADMIN` vs `STAFF`).

### 3.2 CORS & Mixed Content Policy
- Backend allows configured origins via `CORS_ORIGINS` environment variable (supports wildcards, localhost, and production domains).
- Frontend `api/client.ts` automatically detects HTTPS and uses relative `/api` paths to eliminate Mixed Content browser blocking.
- Nginx proxies `/api/` directly to backend port 4050, preserving HTTPS encryption end-to-end.
