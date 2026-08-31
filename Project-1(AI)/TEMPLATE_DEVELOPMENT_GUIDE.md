# Scalable 100+ Template Development Guide

Welcome to the **Emperor Media Solution** Scalable Template Architecture guide. This document explains how developers can rapidly build and register **100+ completely unique website templates** (with independent layouts, visual hierarchies, section order, components, and custom editor schemas) without altering core admin modules, website builder logic, database schemas, or public website routes.

---

## 1. Architecture Directory Structure

All templates reside in `src/templates/` and are organized by category:

```
src/templates/
├── types.ts                      # TypeScript definitions (TemplateConfig, FieldSchema, SectionConfigSchema)
├── registry.tsx                  # Centralized Template Registry & Zero-Collision Resolver
├── index.tsx                     # Master Registration File
│
├── business/                     # Business Category Templates
│   ├── corporate-modern/         # Self-contained template folder
│   │   ├── index.tsx             # Main React template layout
│   │   ├── template.config.ts    # Metadata, category, tags, supported sections, editor schema
│   │   ├── components/           # Custom components (Navbars, Footers, Cards)
│   │   ├── sections/             # Custom section blocks
│   │   └── styles/               # Template-specific CSS / modules
│   └── ...
│
├── saas/                         # SaaS & Tech Category Templates
│   ├── nexora/
│   │   ├── index.tsx
│   │   └── template.config.ts
│   └── ...
│
├── real-estate/                  # Real Estate Category Templates
├── portfolio/                    # Creative Portfolio Category Templates
├── healthcare/                   # Healthcare & Clinical Category Templates
├── restaurant/                   # Hospitality & Dining Category Templates
└── e-commerce/                   # E-commerce Category Templates
```

---

## 2. Step-by-Step: Creating a New Template (e.g. Template #11)

### STEP 1: Create Template Folder Structure
Choose an appropriate category under `src/templates/` (e.g. `saas/aurelia-tech/`) and create your files:

```powershell
mkdir src\templates\saas\aurelia-tech
```

---

### STEP 2: Define `template.config.ts`
Create `template.config.ts` defining metadata, design style, and supported section editor schemas:

```ts
import { TemplateConfig } from '../../types';

export const config: TemplateConfig = {
  id: 'aurelia-tech-01',
  componentKey: 'aurelia-tech',
  name: 'Aurelia AI SaaS Platform',
  slug: 'aurelia-tech',
  project: 'Project-1 (AI)',
  category: 'saas',
  designStyle: 'Dark Futuristic',
  responsiveBehavior: 'Fluid Responsive',
  description: 'High-contrast Indigo AI SaaS platform layout with dynamic features and pricing tables',
  thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  version: '1.0.0',
  author: 'Emperor Media Solution',
  tags: ['saas', 'ai', 'dark-mode', 'futuristic'],
  isFeatured: true,
  supportedSections: [
    { key: 'theme', name: 'Theme & Fonts' },
    { key: 'design', name: 'Design & Layouts' },
    { key: 'seo', name: 'SEO & Metadata' },
    { key: 'hero', name: 'Hero Banner' },
    { key: 'about', name: 'About Overview' },
    {
      key: 'features',
      name: 'Product Features',
      description: 'Highlight core features with interactive cards',
      fields: [
        { key: 'headline', label: 'Feature Section Headline', type: 'text', placeholder: 'Why choose Aurelia...' },
        { key: 'subheadline', label: 'Subtitle', type: 'textarea' },
      ],
    },
    { key: 'services', name: 'Services' },
    { key: 'testimonials', name: 'Testimonials' },
    { key: 'contact', name: 'Contact Details' },
    { key: 'social', name: 'Social Profiles' },
  ],
};
```

---

### STEP 3: Build Self-Contained React Template Component (`index.tsx`)
Build your React component. You can consume `content?: WebsiteContent | null` props to render live data:

```tsx
"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';

export function AureliaTechTemplate({ content }: { content?: WebsiteContent | null }) {
  const hero = content?.hero;
  const theme = content?.theme;

  return (
    <div className="w-full min-h-screen bg-[#0B0F19] text-white font-sans">
      {/* Custom Navbar */}
      <header className="py-6 px-8 border-b border-indigo-900/40 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider text-indigo-400">AURELIA AI</h1>
      </header>

      {/* Custom Hero Section */}
      <section className="py-24 px-6 text-center max-w-5xl mx-auto space-y-6">
        <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-700/50">
          {hero?.eyebrow || 'Next-Gen AI Platform'}
        </span>
        <h2 className="text-4xl sm:text-6xl font-extrabold text-white">
          {hero?.title || 'Empower Enterprise Workflows with AI'}
        </h2>
        <p className="text-stone-300 text-sm max-w-2xl mx-auto">
          {hero?.description || 'Automate complex operations seamlessly.'}
        </p>
      </section>
    </div>
  );
}
```

---

### STEP 4: Register Template in `src/templates/index.tsx`
Open `src/templates/index.tsx` and register your new template:

```tsx
import { AureliaTechTemplate } from './saas/aurelia-tech';
import { config as aureliaConfig } from './saas/aurelia-tech/template.config';

registerTemplate({
  config: aureliaConfig,
  component: AureliaTechTemplate,
});
```

---

## 3. Automated System Integration

Once registered in `src/templates/index.tsx`, your new template **automatically works everywhere**:

1. **Unified Template Gallery (`/templates`)**: Displays thumbnail, name, design style, category, and tags.
2. **Template Preview (`/templates/[id]`)**: Dynamically resolves and renders the template component.
3. **Website Creation**: Available in the Admin website creation modal dropdown.
4. **Dynamic Website Builder (`/websites/[websiteId]/builder`)**:
   - The left `SectionNavigator` queries `config.supportedSections` and displays only supported sections.
   - Schema-driven custom sections (e.g. `features`, `pricing`, `faq`) automatically render typed input controls via `DynamicSectionEditor`.
5. **Live Preview Canvas**: Real-time sync updates preview instantly.
6. **Public Website Route (`/site/[slug]`)**: Renders published websites smoothly.

---

## 4. Verification & Health Check

Run automated verification and production build checks:

```powershell
cd C:\template\Project-1(AI)
npm run build
```

The system includes automated build-time checks that catch:
- Duplicate template IDs
- Duplicate component keys
- Duplicate slugs
- Unmapped React components
