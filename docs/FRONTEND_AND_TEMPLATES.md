# Frontend Architecture, Design System & Template Registry

This document covers the Next.js 14 frontend architecture, the Dynamic Template Registry, the Central Theme Provider, and the 10 core agency templates.

---

## 1. Directory Structure

```
Frontend/src/
├── api/                       # API clients & fetch wrappers (auth, websites, templates, etc.)
│   ├── auth.ts
│   ├── client.ts              # Resilient fetch wrapper (handles HTTPS / same-origin / tokens)
│   ├── projects.ts
│   ├── templates.ts
│   └── websites.ts
├── app/                       # Next.js 14 App Router
│   ├── (admin)/               # Protected Admin Suite:
│   │   ├── admin-templates/   # Template catalog & CRUD
│   │   ├── clients/           # Client CRM & management
│   │   ├── dashboard/         # Central analytics & metrics
│   │   ├── media/             # Digital asset manager
│   │   ├── projects/          # Projects manager
│   │   ├── settings/          # System configuration
│   │   └── websites/          # Websites builder & live editor
│   ├── login/                 # Admin login page
│   ├── offer/                 # Lead acquisition page
│   ├── services/              # Services overview
│   ├── site/[slug]/           # Dynamic client website renderer
│   ├── templates/             # Public template gallery & preview
│   ├── why-us/                # Value proposition page
│   ├── work/                  # Case studies & agency portfolio
│   ├── layout.tsx             # Root HTML & font loader
│   └── page.tsx               # Agency landing page
├── components/
│   ├── admin/                 # Admin UI toolkit (DataTable, Modal, FormField, Toast)
│   ├── theme/                 # CentralThemeProvider & font injections
│   └── ui/                    # Reusable primitives
├── context/
│   └── AuthContext.tsx        # React Auth Provider (user state, login, logout, role check)
└── templates/                 # 10 Modern Physical Templates & Registry Engine
    ├── aurora-corporate/
    ├── ember-hospitality/
    ├── framefolio/
    ├── horizon-finance/
    ├── maison-atelier/
    ├── mono-architecture/
    ├── nova-ai/
    ├── obsidian-studio/
    ├── solaris-tech/
    ├── terra-estate/
    ├── vitalis-health/
    ├── defaultContent.ts      # Rich fallback mockup datasets
    ├── index.tsx              # Template registration boots
    ├── registry.tsx           # Dynamic Registry, resolution & validator
    └── types.ts               # Template TypeScript interfaces
```

---

## 2. Dynamic Template Registry Engine

Located at `Frontend/src/templates/registry.tsx`.

### Key Capabilities
1. **Dynamic Resolution**: `resolveTemplateDefinition(website, template)` dynamically resolves the correct visual component using multiple fallback strategies:
   - Primary lookup by `compositeKey` (`project-1:aurora-corporate`).
   - Technical key lookup (`templateKey` e.g. `aurora-corporate`, `template-01`).
   - Direct `id` or `slug` matching.
   - Normalized slug matching (handles dashes/underscores).
   - Graceful fallback to default template (`Aurora Corporate`).
2. **Catalog Integrity Audit**: `validateTemplateRegistry()` runs in dev/build time to assert that every template has a registered React component, unique ID, unique slug, and non-conflicting component key.
3. **Template Duplication**: `duplicateTemplate(id)` allows agency admins to clone existing templates into custom variations with deep copies of configurations.

---

## 3. The 10 Modern Physical Templates

| # | Template Key | Template Name | Target Industry | Design Aesthetics |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `aurora-corporate` | **Aurora Corporate** | Enterprise / SaaS | Sleek dark slate, emerald accents, glassmorphic cards. |
| 2 | `obsidian-studio` | **Obsidian Studio** | Creative Agency | Obsidian dark mode, neon crimson glows, bold typography. |
| 3 | `terra-estate` | **Terra Estate** | Luxury Real Estate | Warm earth tones, serif headings, spacious architectural cards. |
| 4 | `nova-ai` | **Nova AI** | AI & Machine Learning | Electric cyan gradients, futuristic grid lines, tech badges. |
| 5 | `maison-atelier` | **Maison Atelier** | Haute Couture & Fashion | Minimalist monochrome, editorial typography, full-bleed imagery. |
| 6 | `vitalis-health` | **Vitalis Health** | Medical & Wellness | Clean cyan-teal, soft shadows, trust indicators. |
| 7 | `horizon-finance` | **Horizon Finance** | Fintech & Investment | Deep navy, golden champagne accents, analytical graphs. |
| 8 | `framefolio` | **Framefolio** | Photography & Design | Dark gallery frame, interactive lightboxes, focus on visual assets. |
| 9 | `ember-hospitality`| **Ember Hospitality** | Fine Dining & Hotels | Charcoal & amber warm lighting, rich menus, reservation CTA. |
| 10| `mono-architecture`| **Mono Architecture** | Architecture & Urbanism| Brutalist mono grid, architectural lines, structured typography. |
| 11| `solaris-tech` | **Solaris Tech** | Green Tech & Clean Energy| Vibrant emerald & solar amber, dynamic hero animations. |

---

## 4. Central Theme Engine (`CentralThemeProvider`)

Located in `Frontend/src/components/theme/CentralThemeProvider.tsx`.

When a website is loaded in `/site/[slug]` or live preview in the Admin Editor, the `CentralThemeProvider` injects custom CSS variables into the root element:

```css
:root {
  --theme-primary: #10B981;
  --theme-secondary: #0F172A;
  --theme-accent: #38BDF8;
  --theme-bg: #0B0F17;
  --theme-text: #F8FAFC;
  --font-heading: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --theme-radius: 1rem;
  --theme-container-width: 1280px;
}
```

Components consume these variables via Tailwind utility classes (e.g. `bg-[var(--theme-primary)]` or `text-[var(--theme-text)]`), allowing instantaneous real-time customization from the Admin Panel without code changes or redeployments.
