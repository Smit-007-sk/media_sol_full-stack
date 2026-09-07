# Developer Workflows & Contribution Guide

This guide provides step-by-step instructions for common engineering tasks, adding new templates, updating database schemas, and creating new CMS content sections.

---

## 1. Local Development Setup

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- PostgreSQL 16
- Docker & Docker Compose (optional, for containerized local dev)

### Setup Steps:
```bash
# 1. Backend Setup
cd Backend
npm install
cp .env.example .env
# Ensure DATABASE_URL in .env points to your local PostgreSQL
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev   # Starts NestJS on http://localhost:4000

# 2. Frontend Setup (in a second terminal)
cd ../Frontend
npm install
npm run dev         # Starts Next.js on http://localhost:3000
```

---

## 2. How to Add a New Website Template

Follow these 4 steps to add a new physical React template to the platform:

### Step 1: Create the Template Component
Create a new directory under `Frontend/src/templates/<template-name>/`:
```
Frontend/src/templates/my-new-template/
├── index.tsx          # Master template wrapper with CentralThemeProvider
└── sections/          # Modular template sections (Hero, Services, About, etc.)
    ├── NewHero.tsx
    ├── NewServices.tsx
    └── NewFooter.tsx
```

### Step 2: Define the Template Config
Export the `TemplateConfig` object:
```typescript
import { TemplateConfig } from '../types';

export const myNewTemplateConfig: TemplateConfig = {
  id: 'my-new-template',
  name: 'My New Template',
  slug: 'my-new-template',
  componentKey: 'my-new-template',
  project: 'Project-1(AI)',
  category: 'Modern Business',
  description: 'Clean modern template designed for high-growth startups.',
  previewImage: '/previews/my-new-template.jpg',
  status: 'ACTIVE',
  isFeatured: true,
  version: '1.0.0',
  defaultTheme: {
    primaryColor: '#6366F1',
    secondaryColor: '#0F172A',
    accentColor: '#EC4899',
    backgroundColor: '#090D16',
    textColor: '#F8FAFC',
    headingFont: 'Syne',
    bodyFont: 'Plus Jakarta Sans',
    borderRadius: '1rem',
  }
};
```

### Step 3: Register the Template in the Registry
In `Frontend/src/templates/index.tsx`:
```typescript
import { MyNewTemplate, myNewTemplateConfig } from './my-new-template';

registerTemplate({
  config: myNewTemplateConfig,
  component: MyNewTemplate,
});
```

### Step 4: Add Seeder Record in Backend
In `Backend/prisma/seed.ts`, add the template key and metadata under the appropriate project. Then run:
```bash
npm run prisma:seed
```

---

## 3. Database Schema Changes & Migrations

When modifying models in `Backend/prisma/schema.prisma`:

1. **Update `schema.prisma`** with your new fields or relations.
2. **Generate Migration**:
   ```bash
   cd Backend
   npx prisma migrate dev --name <describe_your_change>
   ```
3. **Regenerate Prisma Client**:
   ```bash
   npx prisma generate
   ```
4. **Update Frontend API interfaces**:
   Update `Frontend/src/api/` or `Frontend/src/types/` to reflect the new fields.

---

## 4. Adding a New CMS Content Section

To add a new modular section (e.g. `FAQ`, `PricingTable`):

1. **Database Model**: Add model in `Backend/prisma/schema.prisma` linked to `Website`.
2. **Backend Controller & Service**: Add module in `Backend/src/content/<section-name>/`.
3. **Frontend API Hook**: Add fetch/mutation functions in `Frontend/src/api/`.
4. **Admin UI Form**: Add editor tab in `Frontend/src/app/(admin)/websites/[websiteId]/page.tsx`.
5. **Template Consumer**: Render the section conditionally in templates:
   ```tsx
   {website.faqs && website.faqs.length > 0 && <TemplateFaqSection data={website.faqs} />}
   ```
