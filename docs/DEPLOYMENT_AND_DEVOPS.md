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
