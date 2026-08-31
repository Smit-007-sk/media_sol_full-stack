"use client";

import React from 'react';
import { registerTemplate } from './registry';
import { TemplateConfig } from './types';
import { template1Data, template2Data, template3Data, template4Data, template5Data } from '@/data';

// Import New 10 Modern Physical Templates
import { AuroraCorporate, auroraCorporateConfig } from './aurora-corporate';
import { ObsidianStudio, obsidianStudioConfig } from './obsidian-studio';
import { TerraEstate, terraEstateConfig } from './terra-estate';
import { NovaAi, novaAiConfig } from './nova-ai';
import { MaisonAtelier, maisonAtelierConfig } from './maison-atelier';
import { VitalisHealth, vitalisHealthConfig } from './vitalis-health';
import { HorizonFinance, horizonFinanceConfig } from './horizon-finance';
import { Framefolio, framefolioConfig } from './framefolio';
import { EmberHospitality, emberHospitalityConfig } from './ember-hospitality';
import { MonoArchitecture, monoArchitectureConfig } from './mono-architecture';
import SolarisTechTemplate, { solarisTechConfig } from './solaris-tech';

// Import Project-1 Physical React Templates (Legacy fallbacks)
import { Template01 } from '@/components/templates/template-1/Template01';
import { Template02 } from '@/components/templates/template-2/Template02';
import { Template03 } from '@/components/templates/template-3/Template03';
import { Template04 } from '@/components/templates/template-4/Template04';
import { Template05 } from '@/components/templates/template-5/Template05';

// Import Project-2 Physical React Templates
import { Project2Template01 } from '@/components/project2-templates/Project2Template01';
import { Project2Template02 } from '@/components/project2-templates/Project2Template02';
import { Project2Template03 } from '@/components/project2-templates/Project2Template03';
import { Project2Template04 } from '@/components/project2-templates/Project2Template04';
import { Project2Template05 } from '@/components/project2-templates/Project2Template05';

// Common Section Schemas
const commonSections = [
  { key: 'theme', name: 'Theme & Fonts' },
  { key: 'design', name: 'Design & Layouts' },
  { key: 'seo', name: 'SEO & Metadata' },
  { key: 'hero', name: 'Hero Banner' },
  { key: 'about', name: 'About Overview' },
  { key: 'services', name: 'Services' },
  { key: 'gallery', name: 'Media Gallery' },
  { key: 'testimonials', name: 'Testimonials' },
  { key: 'contact', name: 'Contact Details' },
  { key: 'social', name: 'Social Profiles' },
];

// Helper to wrap Project 1 templates that pass static default data fallback
function createP1Component(Component: any, defaultData: any) {
  return function WrappedP1(props: any) {
    return <Component data={defaultData} {...props} />;
  };
}

// ----------------------------------------------------
// NEW MODULAR 10 UNIQUE TEMPLATES REGISTRATION
// ----------------------------------------------------

registerTemplate({
  config: auroraCorporateConfig,
  component: AuroraCorporate,
});

registerTemplate({
  config: obsidianStudioConfig,
  component: ObsidianStudio,
});

registerTemplate({
  config: terraEstateConfig,
  component: TerraEstate,
});

registerTemplate({
  config: novaAiConfig,
  component: NovaAi,
});

registerTemplate({
  config: maisonAtelierConfig,
  component: MaisonAtelier,
});

registerTemplate({
  config: vitalisHealthConfig,
  component: VitalisHealth,
});

registerTemplate({
  config: horizonFinanceConfig,
  component: HorizonFinance,
});

registerTemplate({
  config: framefolioConfig,
  component: Framefolio,
});

registerTemplate({
  config: emberHospitalityConfig,
  component: EmberHospitality,
});

registerTemplate({
  config: monoArchitectureConfig,
  component: MonoArchitecture,
});

registerTemplate({
  config: solarisTechConfig,
  component: SolarisTechTemplate,
});

// ----------------------------------------------------
// PROJECT-1 TEMPLATES REGISTRATION (Legacy Fallbacks)
// ----------------------------------------------------

registerTemplate({
  config: {
    id: 'a0f7e44e-1234-5678-9abc-def012345678',
    componentKey: 'template-01-legacy',
    name: 'Emerald Prestige (Legacy)',
    slug: 'template-01-legacy',
    aliases: ['template-01', 'template-1', 'template01', 'project-1-ai-template-01'],
    project: 'Project-1 (AI)',
    category: 'business',
    description: 'Dark charcoal baseline with gold & emerald accents for executive firms',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    version: '1.0.0',
    tags: ['luxury', 'corporate', 'executive'],
    supportedSections: commonSections,
  },
  component: createP1Component(Template01, template1Data),
});

registerTemplate({
  config: {
    id: '7c27d13c-f94f-4dbc-adb6-e367418a7642',
    componentKey: 'template-02-legacy',
    name: 'Editorial Terra (Legacy)',
    slug: 'template-02-legacy',
    aliases: ['template-02', 'template-2', 'template02', 'project-1-ai-template-02'],
    project: 'Project-1 (AI)',
    category: 'business',
    description: 'Warm terra-cotta tones and serif typography for editorial narratives',
    thumbnailUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    version: '1.0.0',
    tags: ['editorial', 'warm', 'serif'],
    supportedSections: commonSections.filter((s) => s.key !== 'gallery'),
  },
  component: createP1Component(Template02, template2Data),
});

registerTemplate({
  config: {
    id: '177594da-2c5f-4fc2-b8af-6e8b4d92eb30',
    componentKey: 'template-03-legacy',
    name: 'Pitch Gold Studio (Legacy)',
    slug: 'template-03-legacy',
    aliases: ['template-03', 'template-3', 'template03', 'project-1-ai-template-03'],
    project: 'Project-1 (AI)',
    category: 'portfolio',
    description: 'Vibrant studio gradient theme with portfolio media grid layout',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=800&q=80',
    version: '1.0.0',
    tags: ['creative', 'studio', 'portfolio'],
    supportedSections: commonSections.filter((s) => s.key !== 'services'),
  },
  component: createP1Component(Template03, template3Data),
});

registerTemplate({
  config: {
    id: '64484e2e-1f7f-4ae2-a6ee-c9eb77f24c16',
    componentKey: 'template-04-legacy',
    name: 'Slate Blue Enterprise (Legacy)',
    slug: 'template-04-legacy',
    aliases: ['template-04', 'template-4', 'template04', 'project-1-ai-template-04'],
    project: 'Project-1 (AI)',
    category: 'business',
    description: 'Professional navy blue tones and sharp geometry for financial services',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    version: '1.0.0',
    tags: ['navy', 'financial', 'corporate'],
    supportedSections: commonSections.filter((s) => s.key !== 'gallery'),
  },
  component: createP1Component(Template04, template4Data),
});

registerTemplate({
  config: {
    id: '9ba4b67b-cdf0-450e-b063-66ff338fb855',
    componentKey: 'template-05-legacy',
    name: 'Alabaster Minimal (Legacy)',
    slug: 'template-05-legacy',
    aliases: ['template-05', 'template-5', 'template05', 'project-1-ai-template-05'],
    project: 'Project-1 (AI)',
    category: 'portfolio',
    description: 'Monochrome luxury studio layout with spacious typography and hero grid',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    version: '1.0.0',
    tags: ['minimal', 'monochrome', 'studio'],
    supportedSections: commonSections,
  },
  component: createP1Component(Template05, template5Data),
});

// ----------------------------------------------------
// PROJECT-2 TEMPLATES REGISTRATION
// ----------------------------------------------------

registerTemplate({
  config: {
    id: '8299c0d7-10b5-40fb-9f69-7510b5a4724a',
    componentKey: 'project2-template-01',
    name: 'Aetheria Tech Cloud',
    slug: 'project2-template-01',
    aliases: ['project-2-template-01', 'p2-template-01', 'p2-01'],
    project: 'Project-2',
    category: 'saas',
    description: 'High-contrast Indigo AI SaaS platform layout with dynamic features',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    version: '2.0.0',
    tags: ['saas', 'ai', 'tech'],
    supportedSections: commonSections.filter((s) => s.key !== 'gallery'),
  },
  component: Project2Template01,
});

registerTemplate({
  config: {
    id: '82bfd6c3-14f5-4692-901d-f4ffacb9e5c0',
    componentKey: 'project2-template-02',
    name: 'Apex Luxury Real Estate',
    slug: 'project2-template-02',
    aliases: ['project-2-template-02', 'p2-template-02', 'p2-02'],
    project: 'Project-2',
    category: 'real-estate',
    description: 'Luxury architecture and real-estate showcase with property gallery',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    version: '2.0.0',
    tags: ['real-estate', 'luxury', 'architecture'],
    supportedSections: commonSections,
  },
  component: Project2Template02,
});

registerTemplate({
  config: {
    id: 'c9ed18ca-96bb-4e76-b84d-e15b37586b03',
    componentKey: 'project2-template-03',
    name: 'Verve Creative Motion',
    slug: 'project2-template-03',
    aliases: ['project-2-template-03', 'p2-template-03', 'p2-03'],
    project: 'Project-2',
    category: 'portfolio',
    description: 'Dynamic motion agency showcase with horizontal video gallery',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    version: '2.0.0',
    tags: ['motion', 'agency', 'creative'],
    supportedSections: commonSections,
  },
  component: Project2Template03,
});

registerTemplate({
  config: {
    id: 'c02055f2-f7a0-48e0-bbca-0fe7886c663f',
    componentKey: 'project2-template-04',
    name: 'Vitalis Medical Portal',
    slug: 'project2-template-04',
    aliases: ['project-2-template-04', 'p2-template-04', 'p2-04'],
    project: 'Project-2',
    category: 'healthcare',
    description: 'Clinical healthcare and wellness portal with medical services list',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    version: '2.0.0',
    tags: ['medical', 'healthcare', 'wellness'],
    supportedSections: commonSections.filter((s) => s.key !== 'gallery'),
  },
  component: Project2Template04,
});

registerTemplate({
  config: {
    id: '302c608a-93fb-4038-a787-022d0d873067',
    componentKey: 'project2-template-05',
    name: 'Vanguard Corporate Suite',
    slug: 'project2-template-05',
    aliases: ['project-2-template-05', 'p2-template-05', 'p2-05'],
    project: 'Project-2',
    category: 'saas',
    description: 'Enterprise digital suite with multi-tenant dashboard preview',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    version: '2.0.0',
    tags: ['enterprise', 'suite', 'digital'],
    supportedSections: commonSections,
  },
  component: Project2Template05,
});


export * from './types';
export * from './registry';
