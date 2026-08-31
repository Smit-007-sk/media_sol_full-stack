"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { TerraNavbar } from './sections/TerraNavbar';
import { TerraHero } from './sections/TerraHero';
import { TerraAbout } from './sections/TerraAbout';
import { TerraServices } from './sections/TerraServices';
import { TerraGallery } from './sections/TerraGallery';
import { TerraTestimonials } from './sections/TerraTestimonials';
import { TerraContact } from './sections/TerraContact';
import { TerraFooter } from './sections/TerraFooter';

export interface TerraEstateProps {
  content?: WebsiteContent | null;
}

export function TerraEstate({ content }: TerraEstateProps) {
  const theme = content?.theme;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#B85B35] selection:text-white" style={{ backgroundColor: 'var(--theme-background, #F5EFE6)', color: 'var(--theme-text, #231B18)' }}>
      <TerraNavbar theme={theme} heroData={content?.hero} />
      <main className="flex-grow">
        <TerraHero data={content?.hero} design={theme} theme={theme} />
        <TerraAbout data={content?.about} design={theme} theme={theme} />
        <TerraServices items={content?.services} design={theme} theme={theme} />
        <TerraGallery items={content?.galleries?.[0]?.items} design={theme} theme={theme} />
        <TerraTestimonials items={content?.testimonials} design={theme} theme={theme} />
        <TerraContact data={content?.contact} design={theme} theme={theme} />
      </main>
      <TerraFooter socialLinks={content?.socialLinks} />
    </div>
  );
}

export { terraEstateConfig } from './template.config';
export default TerraEstate;
