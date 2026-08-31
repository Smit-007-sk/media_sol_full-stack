import { ComponentType } from 'react';
import { WebsiteContent } from '@/api/content';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richText'
  | 'image'
  | 'video'
  | 'color'
  | 'font'
  | 'url'
  | 'number'
  | 'boolean'
  | 'select'
  | 'array'
  | 'object';

export interface FieldSchema {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: any;
  options?: { label: string; value: string }[];
  itemSchema?: FieldSchema[];
}

export interface SectionConfigSchema {
  key: string;
  name: string;
  description?: string;
  isOptional?: boolean;
  fields?: FieldSchema[];
}

export type TemplateStatus = 'ACTIVE' | 'DRAFT' | 'INACTIVE' | 'ARCHIVED';

export interface TemplateConfig {
  id?: string;
  componentKey: string;
  name: string;
  slug: string;
  aliases?: string[];
  project: 'Project-1 (AI)' | 'Project-2' | string;
  category:
    | 'business'
    | 'saas'
    | 'real-estate'
    | 'portfolio'
    | 'healthcare'
    | 'restaurant'
    | 'technology'
    | 'consulting'
    | 'creative'
    | 'e-commerce'
    | string;
  designStyle?:
    | 'Luxury Editorial'
    | 'Dark Futuristic'
    | 'SaaS Modern'
    | 'Minimal Mono'
    | 'Swiss Clean'
    | 'Glassmorphism'
    | 'Bento Grid'
    | 'Brutalist'
    | string;
  responsiveBehavior?: 'Fluid Responsive' | 'Adaptive Mobile' | 'Mobile First' | string;
  description: string;
  thumbnailUrl: string;
  previewUrl?: string;
  version: string;
  author?: string;
  tags: string[];
  isFeatured?: boolean;
  status?: TemplateStatus;
  supportedSections: SectionConfigSchema[];
  sectionOrder?: string[];
  defaultContent?: Partial<WebsiteContent>;
  defaultTheme?: Record<string, any>;
}

export interface TemplateDefinition {
  config: TemplateConfig;
  component: ComponentType<{ content?: WebsiteContent | null; data?: any }>;
}

export interface RegistryValidationError {
  type: 'DUPLICATE_KEY' | 'DUPLICATE_ID' | 'DUPLICATE_SLUG' | 'MISSING_COMPONENT' | 'INVALID_CONFIG' | 'MISSING_SECTION';
  identifier: string;
  message: string;
}
