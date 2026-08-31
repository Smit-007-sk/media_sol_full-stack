"use client";

import React from 'react';
import { WebsiteContent } from '@/api/content';
import { solarisTechConfig } from './template.config';
import { SolarisHero } from './sections/SolarisHero';
import { AuroraAbout } from '../aurora-corporate/sections/AuroraAbout';
import { AuroraServices } from '../aurora-corporate/sections/AuroraServices';
import { AuroraGallery } from '../aurora-corporate/sections/AuroraGallery';
import { AuroraTestimonials } from '../aurora-corporate/sections/AuroraTestimonials';
import { AuroraContact } from '../aurora-corporate/sections/AuroraContact';
import { AuroraFooter } from '../aurora-corporate/sections/AuroraFooter';

export { solarisTechConfig };

export default function SolarisTechTemplate({
  content,
}: {
  content?: WebsiteContent | null;
  data?: any;
}) {
  const heroData = content?.hero;
  const aboutData = content?.about;
  const servicesData = content?.services || [];
  const galleryData = content?.galleries?.[0]?.items || [];
  const testimonialsData = content?.testimonials || [];
  const contactData = content?.contact;
  const socialData = content?.socialLinks || [];

  return (
    <div
      className="w-full min-h-screen font-sans selection:bg-amber-500 selection:text-black"
      style={{
        backgroundColor: 'var(--theme-background, #060913)',
        color: 'var(--theme-text, #F3F4F6)',
      }}
    >
      <SolarisHero data={heroData} design={content?.theme} theme={content?.theme} />
      <AuroraAbout data={aboutData} design={content?.theme} theme={content?.theme} />
      <AuroraServices items={servicesData} design={content?.theme} theme={content?.theme} />
      <AuroraGallery items={galleryData} design={content?.theme} theme={content?.theme} />
      <AuroraTestimonials items={testimonialsData} design={content?.theme} theme={content?.theme} />
      <AuroraContact data={contactData} design={content?.theme} theme={content?.theme} />
      <AuroraFooter socialLinks={socialData} />
    </div>
  );
}
