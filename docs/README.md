    # Emperor Smart Solutions — Full-Stack Technical Documentation

    Welcome to the central developer and operational documentation for the **Emperor Smart Solutions (Media Solutions)** full-stack platform.

    ---

    ## 📚 Documentation Index

    | Document | Description |
    | :--- | :--- |
    | **[Architecture & System Overview](./ARCHITECTURE.md)** | High-level system architecture, component topology, authentication flow, and data pipelines. |
    | **[Database Schema & Models](./DATABASE_SCHEMA.md)** | Detailed PostgreSQL / Prisma ORM schema, entities, relationships, and cascading deletion policies. |
    | **[API Reference](./API_REFERENCE.md)** | Complete NestJS REST API endpoints, JWT authentication, request/response contracts, and role-based access control. |
    | **[Frontend & Template Registry](./FRONTEND_AND_TEMPLATES.md)** | Next.js 14 App Router, Admin Panel, Central Theme Provider, Template Registry Engine, and the 10 core agency templates. |
    | **[Deployment & DevOps](./DEPLOYMENT_AND_DEVOPS.md)** | Docker Compose multi-container setup, Nginx reverse proxy, Let's Encrypt SSL configuration, and environment setup. |
    | **[Developer Workflows](./DEVELOPER_WORKFLOWS.md)** | Step-by-step guides for adding new templates, updating database schemas, creating content sections, and local development. |

    ---

    ## 🚀 Quick Tech Stack Reference

    ```mermaid
    graph TD
        Client["Browser / Client (HTTPS)"]
        Nginx["Nginx Reverse Proxy (Port 80 / 443 SSL)"]
        Frontend["Next.js 14 App Router (Port 3050 / 3000)"]
        Backend["NestJS REST API (Port 4050 / 4000)"]
        Postgres[("PostgreSQL 16 Database (Port 5432)")]

        Client -->|HTTPS :443| Nginx
        Nginx -->|Proxy /| Frontend
        Nginx -->|Proxy /api/| Backend
        Frontend -->|API Client /api| Nginx
        Backend -->|Prisma Client| Postgres
    ```

    - **Frontend**: Next.js 14 (App Router, Standalone output), React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React.
    - **Backend**: NestJS 10, Prisma ORM 5, PostgreSQL 16, Passport JWT, Class-Validator, Swagger (OpenAPI 3.0).
    - **Infrastructure**: Docker Compose, Nginx with SSL (Let's Encrypt / Certbot), Alpine Linux base images.
    - **Production URL**: `https://emperormediasolutions.com`
    - **Swagger Documentation**: `https://emperormediasolutions.com/api/docs` (or `http://localhost:4000/api/docs` locally).

    ---

    ## 🔑 Default Seed Credentials (Local & Dev)

    - **Admin Email**: `admin@example.test`
    - **Admin Password**: `ChangeMe123!` *(or configured via `DEV_ADMIN_PASSWORD` in `.env`)*
    - **Database Name**: `emperor_smart_solutions`
