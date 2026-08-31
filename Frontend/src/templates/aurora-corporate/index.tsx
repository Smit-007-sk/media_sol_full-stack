"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { AuroraNavbar } from './sections/AuroraNavbar';
import { AuroraHero } from './sections/AuroraHero';
import { AuroraAbout } from './sections/AuroraAbout';
import { AuroraServices } from './sections/AuroraServices';
import { AuroraGallery } from './sections/AuroraGallery';
import { AuroraTestimonials } from './sections/AuroraTestimonials';
import { AuroraContact } from './sections/AuroraContact';
import { AuroraFooter } from './sections/AuroraFooter';

export interface AuroraCorporateProps {
  content?: WebsiteContent | null;
}

export function AuroraCorporate({ content }: AuroraCorporateProps) {
  const theme = content?.theme;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#075C45] selection:text-white" style={{ backgroundColor: 'var(--theme-background, #FBF8F1)', color: 'var(--theme-text, #1F2937)' }}>
      <AuroraNavbar theme={theme} heroData={content?.hero} />
      <main className="flex-grow">
        <AuroraHero data={content?.hero} design={theme} theme={theme} />
        <AuroraAbout data={content?.about} design={theme} theme={theme} />
        <AuroraServices items={content?.services} design={theme} theme={theme} />
        <AuroraGallery items={content?.galleries?.[0]?.items} design={theme} theme={theme} />
        <AuroraTestimonials items={content?.testimonials} design={theme} theme={theme} />
        <AuroraContact data={content?.contact} design={theme} theme={theme} />
      </main>
      <AuroraFooter socialLinks={content?.socialLinks} />
    </div>
  );
}

export { auroraCorporateConfig } from './template.config';
export default AuroraCorporate;
