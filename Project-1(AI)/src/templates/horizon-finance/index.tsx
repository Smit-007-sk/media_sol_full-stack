"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { HorizonHero } from './sections/HorizonHero';
import { HorizonAbout } from './sections/HorizonAbout';
import { HorizonServices } from './sections/HorizonServices';
import { HorizonGallery } from './sections/HorizonGallery';
import { HorizonTestimonials } from './sections/HorizonTestimonials';
import { HorizonContact } from './sections/HorizonContact';
import { HorizonFooter } from './sections/HorizonFooter';

export interface HorizonFinanceProps {
  content?: WebsiteContent | null;
}

export function HorizonFinance({ content }: HorizonFinanceProps) {
  const theme = content?.theme;

  return (
    <div className="w-full min-h-screen flex flex-col font-sans selection:bg-[#1D4ED8] selection:text-white" style={{ backgroundColor: 'var(--theme-background, #F8FAFC)', color: 'var(--theme-text, #0F172A)' }}>
      <main className="flex-grow">
        <HorizonHero data={content?.hero} design={theme} theme={theme} />
        <HorizonAbout data={content?.about} design={theme} theme={theme} />
        <HorizonServices items={content?.services} design={theme} theme={theme} />
        <HorizonGallery items={content?.galleries?.[0]?.items} design={theme} theme={theme} />
        <HorizonTestimonials items={content?.testimonials} design={theme} theme={theme} />
        <HorizonContact data={content?.contact} design={theme} theme={theme} />
      </main>
      <HorizonFooter socialLinks={content?.socialLinks} />
    </div>
  );
}

export { horizonFinanceConfig } from './template.config';
export default HorizonFinance;
