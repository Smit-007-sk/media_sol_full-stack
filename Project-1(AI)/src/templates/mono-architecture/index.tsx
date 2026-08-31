"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { MonoHero } from './sections/MonoHero';
import { MonoAbout } from './sections/MonoAbout';
import { MonoServices } from './sections/MonoServices';
import { MonoGallery } from './sections/MonoGallery';
import { MonoTestimonials } from './sections/MonoTestimonials';
import { MonoContact } from './sections/MonoContact';
import { MonoFooter } from './sections/MonoFooter';

export interface MonoArchitectureProps {
  content?: WebsiteContent | null;
}

export function MonoArchitecture({ content }: MonoArchitectureProps) {
  const theme = content?.theme;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#171717] selection:text-white" style={{ backgroundColor: 'var(--theme-background, #FFFFFF)', color: 'var(--theme-text, #171717)' }}>
      <main className="flex-grow">
        <MonoHero data={content?.hero} design={theme} theme={theme} />
        <MonoAbout data={content?.about} design={theme} theme={theme} />
        <MonoServices items={content?.services} design={theme} theme={theme} />
        <MonoGallery items={content?.galleries?.[0]?.items} design={theme} theme={theme} />
        <MonoTestimonials items={content?.testimonials} design={theme} theme={theme} />
        <MonoContact data={content?.contact} design={theme} theme={theme} />
      </main>
      <MonoFooter socialLinks={content?.socialLinks} />
    </div>
  );
}

export { monoArchitectureConfig } from './template.config';
export default MonoArchitecture;
