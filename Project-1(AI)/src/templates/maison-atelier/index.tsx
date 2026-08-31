"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { MaisonHero } from './sections/MaisonHero';
import { MaisonAbout } from './sections/MaisonAbout';
import { MaisonServices } from './sections/MaisonServices';
import { MaisonGallery } from './sections/MaisonGallery';
import { MaisonTestimonials } from './sections/MaisonTestimonials';
import { MaisonContact } from './sections/MaisonContact';
import { MaisonFooter } from './sections/MaisonFooter';

export interface MaisonAtelierProps {
  content?: WebsiteContent | null;
}

export function MaisonAtelier({ content }: MaisonAtelierProps) {
  const theme = content?.theme;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#C5A059] selection:text-[#FAFAFA]" style={{ backgroundColor: 'var(--theme-background, #FAFAFA)', color: 'var(--theme-text, #111111)' }}>
      <main className="flex-grow">
        <MaisonHero data={content?.hero} design={theme} theme={theme} />
        <MaisonAbout data={content?.about} design={theme} theme={theme} />
        <MaisonServices items={content?.services} design={theme} theme={theme} />
        <MaisonGallery items={content?.galleries?.[0]?.items} design={theme} theme={theme} />
        <MaisonTestimonials items={content?.testimonials} design={theme} theme={theme} />
        <MaisonContact data={content?.contact} design={theme} theme={theme} />
      </main>
      <MaisonFooter socialLinks={content?.socialLinks} />
    </div>
  );
}

export { maisonAtelierConfig } from './template.config';
export default MaisonAtelier;
