"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { EmberNavbar } from './sections/EmberNavbar';
import { EmberHero } from './sections/EmberHero';
import { EmberAbout } from './sections/EmberAbout';
import { EmberServices } from './sections/EmberServices';
import { EmberGallery } from './sections/EmberGallery';
import { EmberTestimonials } from './sections/EmberTestimonials';
import { EmberContact } from './sections/EmberContact';
import { EmberFooter } from './sections/EmberFooter';

export interface EmberHospitalityProps {
  content?: WebsiteContent | null;
}

export function EmberHospitality({ content }: EmberHospitalityProps) {
  const theme = content?.theme;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#991B1B] selection:text-white" style={{ backgroundColor: 'var(--theme-background, #0F0F12)', color: 'var(--theme-text, #F5F5F4)' }}>
      <EmberNavbar theme={theme} heroData={content?.hero} />
      <main className="flex-grow">
        <EmberHero data={content?.hero} design={theme} theme={theme} />
        <EmberAbout data={content?.about} design={theme} theme={theme} />
        <EmberServices items={content?.services} design={theme} theme={theme} />
        <EmberGallery items={content?.galleries?.[0]?.items} design={theme} theme={theme} />
        <EmberTestimonials items={content?.testimonials} design={theme} theme={theme} />
        <EmberContact data={content?.contact} design={theme} theme={theme} />
      </main>
      <EmberFooter socialLinks={content?.socialLinks} />
    </div>
  );
}

export { emberHospitalityConfig } from './template.config';
export default EmberHospitality;
