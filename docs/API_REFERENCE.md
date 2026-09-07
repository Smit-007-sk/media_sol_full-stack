# REST API Reference

The backend API is built with NestJS and follows RESTful design principles. All endpoints are prefixed with `/api`.

Interactive Swagger / OpenAPI UI is accessible at:
- Production: `https://emperormediasolutions.com/api/docs`
- Local: `http://localhost:4000/api/docs`

---

## 1. Authentication & Security Headers

Protected endpoints require a valid JWT token passed in the `Authorization` header:
```http
Authorization: Bearer <YOUR_JWT_ACCESS_TOKEN>
```

### Standard Response Envelopes

#### Success Response:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

#### Paginated Response:
```json
{
  "success": true,
  "data": {
    "items": [ ... ],
    "meta": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
}
```

#### Error Response:
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request",
  "timestamp": "2026-09-02T12:00:00.000Z",
  "path": "/api/websites"
}
```

---

## 2. API Endpoints Catalog

### 2.1 Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Public | Authenticate user with `{ email, password }` and return JWT token. |
| `GET` | `/auth/me` | Bearer Token | Return current user's profile and assigned role. |
| `GET` | `/auth/admin-only` | ADMIN | Test endpoint strictly verifying `ADMIN` role access. |

---

### 2.2 Projects (`/api/projects`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects` | Bearer Token | List all projects (supports `?page=1&limit=10&search=...`). |
| `GET` | `/projects/:id` | Bearer Token | Get single project details including its templates. |
| `POST` | `/projects` | ADMIN | Create a new project `{ name, slug, description }`. |
| `PUT` | `/projects/:id` | ADMIN | Update project metadata. |
| `DELETE` | `/projects/:id` | ADMIN | Soft delete / deactivate project. |

---

### 2.3 Templates (`/api/templates`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/templates` | Bearer Token | List all templates (supports `?projectId=...&search=...`). |
| `GET` | `/templates/:id` | Bearer Token | Get single template by ID or technical key. |
| `POST` | `/templates` | ADMIN | Create new template `{ projectId, name, slug, templateKey, description, previewImage }`. |
| `PUT` | `/templates/:id` | ADMIN | Update existing template. |
| `DELETE` | `/templates/:id` | ADMIN | Soft delete / deactivate template. |

---

### 2.4 Clients (`/api/clients`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/clients` | Bearer Token | List all clients with website counts. |
| `GET` | `/clients/:id` | Bearer Token | Get client profile, contact info, and deployed websites. |
| `POST` | `/clients` | Bearer Token | Create new client profile `{ businessName, email, phone, address, ... }`. |
| `PUT` | `/clients/:id` | Bearer Token | Update client profile. |
| `DELETE` | `/clients/:id` | Bearer Token | Soft delete or archive client. |

---

### 2.5 Websites (`/api/websites`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/websites` | Bearer Token | List all websites (supports `?clientId=...&status=...`). |
| `GET` | `/websites/:id` | Bearer Token | Get website details with all populated CMS relations. |
| `GET` | `/websites/slug/:slug` | Public | Public route to render client website by slug. |
| `POST` | `/websites` | ADMIN | Create new client website attached to a template. |
| `PUT` | `/websites/:id` | ADMIN | Update website metadata, slug, or publication status. |
| `PATCH` | `/websites/:id/publish` | ADMIN | Toggle published state (`isPublished: true/false`). |
| `DELETE` | `/websites/:id` | ADMIN | Archive or delete website. |

---

### 2.6 CMS Content Sections (`/api/content/*`)

| Section Module | Method & Endpoint | Description |
| :--- | :--- | :--- |
| **Theme** | `GET /content/theme/website/:websiteId`<br>`POST /content/theme`<br>`PUT /content/theme/:id` | Manage website color palette, fonts, button styling, layout variants. |
| **Hero** | `GET /content/hero/website/:websiteId`<br>`POST /content/hero`<br>`PUT /content/hero/:id` | Manage hero banner titles, eyebrows, CTAs, hero image/video. |
| **About** | `GET /content/about/website/:websiteId`<br>`POST /content/about`<br>`PUT /content/about/:id` | Manage about story, imagery, and executive summaries. |
| **Services** | `GET /content/services/website/:websiteId`<br>`POST /content/services`<br>`PUT /content/services/:id`<br>`DELETE /content/services/:id` | Manage list of services, icons, and descriptions. |
| **Gallery** | `GET /content/gallery/website/:websiteId`<br>`POST /content/gallery`<br>`PUT /content/gallery/:id` | Manage media galleries and photo showcases. |
| **Testimonials** | `GET /content/testimonials/website/:websiteId`<br>`POST /content/testimonials`<br>`PUT /content/testimonials/:id`<br>`DELETE /content/testimonials/:id` | Manage client reviews, ratings, and quotes. |
| **Contact** | `GET /content/contact/website/:websiteId`<br>`POST /content/contact`<br>`PUT /content/contact/:id` | Manage contact emails, phones, addresses, and maps. |
| **Social Links** | `GET /content/social-links/website/:websiteId`<br>`POST /content/social-links`<br>`PUT /content/social-links/:id`<br>`DELETE /content/social-links/:id` | Manage social media platform links and sort order. |
| **Media Uploads** | `POST /content/media/upload`<br>`GET /content/media`<br>`DELETE /content/media/:id` | Upload image/video assets (up to 50MB payload). |
