"use client";

import React from 'react';
import { Theme } from '@/api/content';

interface CentralThemeProviderProps {
  theme?: Theme | Partial<Theme> | null;
  children: React.ReactNode;
  className?: string;
}

export function computeThemeCssVariables(theme?: Theme | Partial<Theme> | null): React.CSSProperties {
  if (!theme) {
    return {
      '--theme-primary': '#075C45',
      '--theme-secondary': '#C9A45C',
      '--theme-accent': '#EAB308',
      '--theme-background': '#0F1412',
      '--theme-text': '#F3F4F6',
      '--theme-heading-font': 'Playfair Display, serif',
      '--theme-body-font': 'Inter, sans-serif',
      '--theme-surface': '#161C19',
      '--theme-border': 'rgba(201, 164, 92, 0.25)',
      '--design-section-spacing': '5rem',
      '--design-container-width': '80rem',
      '--design-radius': '8px',
      '--design-button-padding': '0.75rem 1.5rem',
      '--design-button-size': '0.875rem',
    } as React.CSSProperties;
  }

  const primary = theme.primaryColor || '#075C45';
  const secondary = theme.secondaryColor || '#C9A45C';
  const accent = theme.accentColor || secondary;
  const background = theme.backgroundColor || '#0F1412';
  const text = theme.textColor || '#F3F4F6';
  const headingFont = theme.headingFont || theme.bodyFont || 'Inter, sans-serif';
  const bodyFont = theme.bodyFont || 'Inter, sans-serif';

  // Section Spacing Token Mapping
  const spacingMap: Record<string, string> = {
    compact: '3rem',
    comfortable: '5rem',
    spacious: '7rem',
    luxury: '9rem',
  };
  const sectionSpacing = spacingMap[theme.sectionSpacing || ''] || '5rem';

  // Container Width Token Mapping
  const containerMap: Record<string, string> = {
    compact: '56rem',
    narrow: '56rem',
    standard: '72rem',
    wide: '80rem',
    full: '100%',
  };
  const containerWidth = containerMap[theme.containerWidth || ''] || '80rem';

  // Corner Radius Token Mapping
  const radiusMap: Record<string, string> = {
    none: '0px',
    small: '4px',
    medium: '8px',
    large: '16px',
    xl: '24px',
    pill: '9999px',
  };
  const radius = radiusMap[theme.borderRadius || (theme as any).cornerRadius || ''] || '8px';

  // Button Size Token Mapping
  const buttonSizeMap: Record<string, { padding: string; fontSize: string }> = {
    small: { padding: '0.5rem 1rem', fontSize: '0.75rem' },
    sm: { padding: '0.5rem 1rem', fontSize: '0.75rem' },
    medium: { padding: '0.75rem 1.5rem', fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '0.875rem' },
    large: { padding: '1rem 2rem', fontSize: '1rem' },
    lg: { padding: '1rem 2rem', fontSize: '1rem' },
  };
  const bSize = buttonSizeMap[theme.buttonSize || 'medium'] || buttonSizeMap.medium;

  return {
    '--theme-primary': primary,
    '--theme-secondary': secondary,
    '--theme-accent': accent,
    '--theme-background': background,
    '--theme-text': text,
    '--theme-heading-font': headingFont,
    '--theme-body-font': bodyFont,
    '--theme-surface': 'rgba(255, 255, 255, 0.04)',
    '--theme-border': `${secondary}40`,

    '--design-section-spacing': sectionSpacing,
    '--design-container-width': containerWidth,
    '--design-radius': radius,
    '--design-button-padding': bSize.padding,
    '--design-button-size': bSize.fontSize,

    // Legacy CSS property mappings for backwards compatibility with older templates
    '--t-emerald': primary,
    '--t-gold': secondary,
    '--t-charcoal': text,
    '--t-bg': background,
    '--primary': primary,
    '--secondary': secondary,
    '--accent': accent,

    // Inline style fallbacks for container root
    backgroundColor: background,
    color: text,
    fontFamily: bodyFont,
  } as React.CSSProperties;
}

export function CentralThemeProvider({ theme, children, className = '' }: CentralThemeProviderProps) {
  const cssVars = computeThemeCssVariables(theme);

  return (
    <div style={cssVars} className={`w-full min-h-screen transition-colors duration-200 ${className}`}>
      {children}
    </div>
  );
}
