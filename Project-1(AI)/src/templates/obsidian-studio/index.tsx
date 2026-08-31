"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { ObsidianNavbar } from './sections/ObsidianNavbar';
import { ObsidianHero } from './sections/ObsidianHero';
import { ObsidianAbout } from './sections/ObsidianAbout';
import { ObsidianServices } from './sections/ObsidianServices';
import { ObsidianGallery } from './sections/ObsidianGallery';
import { ObsidianTestimonials } from './sections/ObsidianTestimonials';
import { ObsidianContact } from './sections/ObsidianContact';
import { ObsidianFooter } from './sections/ObsidianFooter';

export interface ObsidianStudioProps {
  content?: WebsiteContent | null;
}

export function ObsidianStudio({ content }: ObsidianStudioProps) {
  const theme = content?.theme;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#E5B842] selection:text-black" style={{ backgroundColor: 'var(--theme-background, #0A0A0A)', color: 'var(--theme-text, #FFFFFF)' }}>
      <ObsidianNavbar theme={theme} heroData={content?.hero} />
      <main className="flex-grow">
        <ObsidianHero data={content?.hero} design={theme} theme={theme} />
        <ObsidianAbout data={content?.about} design={theme} theme={theme} />
        <ObsidianServices items={content?.services} design={theme} theme={theme} />
        <ObsidianGallery items={content?.galleries?.[0]?.items} design={theme} theme={theme} />
        <ObsidianTestimonials items={content?.testimonials} design={theme} theme={theme} />
        <ObsidianContact data={content?.contact} design={theme} theme={theme} />
      </main>
      <ObsidianFooter socialLinks={content?.socialLinks} />
    </div>
  );
}

export { obsidianStudioConfig } from './template.config';
export default ObsidianStudio;
