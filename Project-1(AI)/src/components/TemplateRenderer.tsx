"use client";

import React from 'react';
import { Website } from '@/api/websites';
import { Template } from '@/api/templates';
import { WebsiteContent } from '@/api/content';
import { resolveTemplateDefinition, FallbackTemplateError } from '@/templates';
import { CentralThemeProvider, computeThemeCssVariables } from '@/components/theme/CentralThemeProvider';

interface TemplateRendererProps {
  website?: Website | null;
  template?: Template | Partial<Template> | null;
  content?: WebsiteContent | null;
}

export function getThemeCssVariables(theme?: any): React.CSSProperties {
  return computeThemeCssVariables(theme);
}

export function TemplateRenderer({ website, template, content }: TemplateRendererProps) {
  // Resolve template component via centralized Template Registry
  const definition = resolveTemplateDefinition(website, template);

  if (definition) {
    const Component = definition.component;
    return (
      <CentralThemeProvider theme={content?.theme}>
        <Component content={content} />
      </CentralThemeProvider>
    );
  }

  // Graceful Fallback if template is missing from registry
  const activeTemplate = template || website?.template;
  const keyKey = activeTemplate?.templateKey || website?.slug || 'unknown';

  return <FallbackTemplateError templateKey={keyKey} />;
}
