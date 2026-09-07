# Deployment, DevOps & Infrastructure Guide

This guide covers Docker containerization, Nginx reverse proxy configuration, SSL termination, and production runbooks.

---

## 1. Docker Multi-Container Architecture

The platform runs via `docker-compose.yml` with 3 core services:

```yaml
services:
  # 1. PostgreSQL 16
  postgres:
    image: postgres:16-alpine
    container_name: media-sol-postgres
    ports: ["5432:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]

  # 2. NestJS Backend API
  backend:
    build:
      context: ./Backend
      dockerfile: Dockerfile
    container_name: media-sol-backend
    environment:
      PORT: 4000
      DATABASE_URL: "postgresql://postgres:postgrespassword2026@postgres:5432/emperor_smart_solutions?schema=public"
      CORS_ORIGINS: "*"
    ports: ["4050:4000"] # Exposed on host port 4050

  # 3. Next.js 14 Frontend
  frontend:
    build:
      context: ./Frontend
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_API_URL: /api
    container_name: media-sol-frontend
    ports: ["3050:3000"] # Exposed on host port 3050
```

---

## 2. Nginx Reverse Proxy & SSL Configuration

Production Nginx configuration file (`/etc/nginx/conf.d/emperormediasolutions.conf`):

```nginx
# 1. HTTP -> HTTPS Redirect
server {
    listen 80;
    server_name emperormediasolutions.com www.emperormediasolutions.com;
    return 301 https://$host$request_uri;
}

# 2. Main Secure HTTPS Server
server {
    listen 443 ssl;
    server_name emperormediasolutions.com www.emperormediasolutions.com;

    # SSL Certificate Paths (Let's Encrypt / Certbot)
    ssl_certificate /etc/letsencrypt/live/emperormediasolutions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/emperormediasolutions.com/privkey.pem;

    # API Proxy -> NestJS Backend Container (Host Port 4050)
    location /api/ {
        proxy_pass http://127.0.0.1:4050/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_cache_bypass $http_upgrade;

        # Upload limit for media assets (50MB)
        client_max_body_size 50M;
    }

    # Frontend Proxy -> Next.js Container (Host Port 3050)
    location / {
        proxy_pass http://127.0.0.1:3050;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 3. Production Deployment Commands

### First Time Setup:
```bash
# 1. Clone repository
git clone <REPO_URL> media_sol_app
cd media_sol_app

# 2. Build and launch containers in background
docker compose up -d --build

# 3. Seed database with initial Admin user and templates
docker compose exec backend npm run prisma:seed

# 4. Configure Nginx and SSL
sudo certbot --nginx -d emperormediasolutions.com -d www.emperormediasolutions.com
sudo systemctl reload nginx
```

### Updating & Redeploying After Changes:
```bash
# Pull latest code
git pull

# Rebuild and restart containers with zero downtime
docker compose up -d --build
```

---

## 4. Troubleshooting & Health Checks

| Issue | Diagnosis Command | Solution |
| :--- | :--- | :--- |
| **Backend 502 Bad Gateway** | `docker compose logs backend` | Check if PostgreSQL is healthy and migration ran. Restart backend with `docker compose restart backend`. |
| **Mixed Content Warning** | Browser Console | Ensure frontend calls `/api` and Nginx has `proxy_set_header X-Forwarded-Proto https;`. |
| **SSL Certificate Expired** | `sudo certbot certificates` | Renew with `sudo certbot renew --force-renewal && sudo systemctl reload nginx`. |
| **Database Migrations** | `docker compose exec backend npx prisma migrate status` | Apply migrations with `docker compose exec backend npx prisma migrate deploy`. |

---

## 5. Published Static Website Production-Serving Architecture

### 1. Request Flow (`/site/[slug]`):
```
Visitor Request -> Nginx (443 SSL) -> Next.js Frontend (/site/[slug])
                                            |
                         +------------------+------------------+
                         |                                     |
              (1) Generated Static Website?         (2) Legacy CMS Website?
                         |                                     |
           GET /api/website-requests/public-site/:slug    GET /api/websites/public/:slug
                         |                                     |
             Reads publishedSnapshot                Renders TemplateRenderer
                         |
           Sandboxed iframe (allow-scripts allow-forms)
```

### 2. Security & Isolation Model:
- **Null-Origin Iframe**: `sandbox="allow-scripts allow-forms"`. Omission of `allow-same-origin` ensures generated JavaScript runs in a unique null origin with zero access to parent cookies, JWT tokens, `localStorage`, or the parent admin DOM.
- **Authoritative Snapshot**: Live public visitors are served strictly from `publishedSnapshot`. Draft edits never mutate live content until explicitly updated.
- **Server-Side Asset Validation**: Placeholders (`{{LOGO_URL}}`, `{{IMAGE_1_URL}}`) are mapped at publish-time and validated against request ownership. Dangerous schemes (`javascript:`, `vbscript:`, `file:`) are strictly rejected.
- **Draft Privacy**: DRAFT and UNPUBLISHED websites return HTTP 404 to public callers.

### 3. Caching & Lifecycle Revalidation:
- Next.js dynamic client route (`/site/[slug]`) fetches published state on demand without static caching lock-in, ensuring instant availability upon publishing, immediate updates upon "Update Published Website", and instant 404 upon "Unpublish".

