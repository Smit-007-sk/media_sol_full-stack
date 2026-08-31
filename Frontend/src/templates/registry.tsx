"use client";

import React, { ComponentType } from 'react';
import { TemplateConfig, TemplateDefinition, TemplateStatus, RegistryValidationError } from './types';
import { Website } from '@/api/websites';
import { Template } from '@/api/templates';
import { AlertCircle } from 'lucide-react';
import { templateDefaultContents } from './defaultContent';

const registry: Map<string, TemplateDefinition> = new Map();
const registeredList: TemplateDefinition[] = [];

// 1. Register Template Definition
export function registerTemplate(definition: TemplateDefinition): RegistryValidationError[] {
  const errors: RegistryValidationError[] = [];
  const { config, component } = definition;

  if (!config) {
    errors.push({ type: 'INVALID_CONFIG', identifier: 'unknown', message: 'Template definition is missing config' });
    return errors;
  }
  if (!component) {
    errors.push({ type: 'MISSING_COMPONENT', identifier: config.componentKey || 'unknown', message: `Template ${config.name || 'unnamed'} is missing React component` });
  }

  // Inject template default content if not already explicitly attached
  if (!config.defaultContent && config.id && templateDefaultContents[config.id]) {
    config.defaultContent = templateDefaultContents[config.id] as any;
  }
  if (!config.status) {
    config.status = 'ACTIVE';
  }

  // Register primary lookup keys
  if (config.componentKey) {
    registry.set(config.componentKey.toLowerCase(), definition);
  }
  if (config.id) {
    registry.set(config.id.toLowerCase(), definition);
  }
  if (config.slug) {
    registry.set(config.slug.toLowerCase(), definition);
  }
  if (config.project && config.componentKey) {
    const projSlug = config.project.toLowerCase().includes('project-2') ? 'project-2' : 'project-1';
    registry.set(`${projSlug}:${config.componentKey.toLowerCase()}`, definition);
  }

  // Register optional aliases
  if (config.aliases && Array.isArray(config.aliases)) {
    config.aliases.forEach((alias) => {
      if (alias) {
        registry.set(alias.toLowerCase(), definition);
      }
    });
  }

  // Avoid duplicate entries in registeredList
  const existingIdx = registeredList.findIndex(d => d.config.id === config.id);
  if (existingIdx >= 0) {
    registeredList[existingIdx] = definition;
  } else {
    registeredList.push(definition);
  }

  return errors;
}

// 2. Validate Entire Template Registry (Development & Build-time Audit)
export function validateTemplateRegistry(): RegistryValidationError[] {
  const errors: RegistryValidationError[] = [];
  const seenIds = new Set<string>();
  const seenKeys = new Map<string, string>();
  const seenSlugs = new Set<string>();

  registeredList.forEach((def) => {
    const { config, component } = def;

    if (!component) {
      errors.push({ type: 'MISSING_COMPONENT', identifier: config.id || 'unknown', message: `Template ${config.name} is missing React component` });
    }

    if (config.id) {
      if (seenIds.has(config.id.toLowerCase())) {
        errors.push({ type: 'DUPLICATE_ID', identifier: config.id, message: `Duplicate Template ID: ${config.id}` });
      } else {
        seenIds.add(config.id.toLowerCase());
      }
    }

    const projSlug = (config.project || 'Project-1').toLowerCase().includes('project-2') ? 'project-2' : 'project-1';
    const compositeKey = `${projSlug}:${(config.componentKey || '').toLowerCase()}`;
    if (seenKeys.has(compositeKey)) {
      errors.push({ type: 'DUPLICATE_KEY', identifier: compositeKey, message: `Duplicate Component Key in ${config.project}: ${config.componentKey}` });
    } else {
      seenKeys.set(compositeKey, config.name);
    }

    if (config.slug) {
      if (seenSlugs.has(config.slug.toLowerCase())) {
        errors.push({ type: 'DUPLICATE_SLUG', identifier: config.slug, message: `Duplicate Template Slug: ${config.slug}` });
      } else {
        seenSlugs.add(config.slug.toLowerCase());
      }
    }
  });

  return errors;
}

// 3. Resolve Template Definition from Website or Template object
export function resolveTemplateDefinition(
  website?: Website | null,
  template?: Template | Partial<Template> | null
): TemplateDefinition | undefined {
  const activeTemplate = template || website?.template;

  const key = (activeTemplate?.templateKey || '').toLowerCase().trim();
  const slug = (activeTemplate?.slug || website?.slug || '').toLowerCase().trim();
  const id = (activeTemplate?.id || website?.templateId || '').toLowerCase().trim();
  const projName = (activeTemplate?.project?.name || '').toLowerCase();

  const isProject2 = projName.includes('project-2') || slug.includes('project-2') || key.includes('project-2') || key.includes('project2');
  const projPrefix = isProject2 ? 'project-2' : 'project-1';

  if (key) {
    const compResult = registry.get(`${projPrefix}:${key}`);
    if (compResult) return compResult;
    const keyResult = registry.get(key);
    if (keyResult) return keyResult;
  }
  if (id) {
    const idResult = registry.get(id);
    if (idResult) return idResult;
  }
  if (slug) {
    const slugResult = registry.get(slug);
    if (slugResult) return slugResult;
  }

  // Normalize key lookup (e.g. 'template-05' matches 'template05' or 'template-5')
  if (key) {
    const norm = key.replace(/[^a-z0-9]/g, '');
    const found = registeredList.find((d) => {
      const cKey = (d.config.componentKey || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const sKey = (d.config.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const iKey = (d.config.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      return cKey === norm || sKey === norm || iKey === norm || cKey.includes(norm);
    });
    if (found) return found;
  }

  // Graceful fallback to the primary modern template (Aurora Corporate / registeredList[0])
  if (registeredList.length > 0) {
    return registeredList[0];
  }

  return undefined;
}



// 4. Retrieve All Registered Template Configurations
export function getAllTemplateConfigs(): TemplateConfig[] {
  return registeredList.map((def) => def.config);
}

// 5. Template Duplication System (Cloning Catalog Definition referencing visual base component)
export function duplicateTemplate(sourceTemplateId: string, customName?: string): TemplateConfig | null {
  const sourceDef = registeredList.find((d) => d.config.id === sourceTemplateId || d.config.slug === sourceTemplateId);
  if (!sourceDef) return null;

  const timestamp = Date.now().toString().slice(-4);
  const newName = customName || `${sourceDef.config.name} (Copy)`;
  const newSlug = `${sourceDef.config.slug}-copy-${timestamp}`;
  const newId = `${sourceDef.config.id}-copy-${timestamp}`;
  const newComponentKey = `${sourceDef.config.componentKey}-copy-${timestamp}`;

  const duplicatedConfig: TemplateConfig = {
    ...JSON.parse(JSON.stringify(sourceDef.config)),
    id: newId,
    slug: newSlug,
    componentKey: newComponentKey,
    name: newName,
    status: 'ACTIVE',
    isFeatured: false,
    version: `${sourceDef.config.version || '1.0.0'}-copy`,
    description: `Duplicated from ${sourceDef.config.name}. ${sourceDef.config.description}`,
  };

  registerTemplate({
    config: duplicatedConfig,
    component: sourceDef.component,
  });

  return duplicatedConfig;
}

// 6. Template Status Lifecycle Management
export function setTemplateStatus(templateId: string, status: TemplateStatus): boolean {
  const def = registeredList.find((d) => d.config.id === templateId || d.config.slug === templateId);
  if (!def) return false;
  def.config.status = status;
  return true;
}

// 7. Toggle Featured Status
export function toggleTemplateFeatured(templateId: string): boolean {
  const def = registeredList.find((d) => d.config.id === templateId || d.config.slug === templateId);
  if (!def) return false;
  def.config.isFeatured = !def.config.isFeatured;
  return true;
}

// Fallback Error Component if a template component is unmapped
export function FallbackTemplateError({ templateKey }: { templateKey?: string }) {
  return (
    <div className="min-h-[400px] bg-[#0F1412] text-stone-100 flex items-center justify-center p-8 font-sans">
      <div className="max-w-md w-full bg-[#161C19] border border-stone-800 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-950/80 border border-amber-800/40 text-amber-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-serif text-stone-100">Template Component Unavailable</h3>
          <p className="text-xs text-stone-400">
            The requested template component <span className="font-mono text-[#C9A45C]">{templateKey || 'unknown'}</span> is not registered in the Template Registry.
          </p>
        </div>
        <div className="pt-2 border-t border-stone-800 text-[11px] font-mono text-stone-500">
          Emperor Media Solution Template Registry Engine
        </div>
      </div>
    </div>
  );
}
