"use client";

import React from "react";
import { TemplateData } from "@/types/template";
import { WebsiteContent } from "@/api/content";
import { Navbar04 } from "./Navbar04";
import { Hero04 } from "./Hero04";
import { Metrics04 } from "./Metrics04";
import { Services04 } from "./Services04";
import { CaseStudies04 } from "./CaseStudies04";
import { Video04 } from "./Video04";
import { Testimonials04 } from "./Testimonials04";
import { CTA04 } from "./CTA04";
import { Footer04 } from "./Footer04";

export interface Template04Props {
  data: TemplateData;
  content?: WebsiteContent | null;
}

export function Template04({ data, content }: Template04Props) {
  const heroData = content?.hero
    ? {
        ...data.hero,
        eyebrow: content.hero.eyebrow || data.hero.eyebrow,
        title: content.hero.title || data.hero.title,
        description: content.hero.description || data.hero.description,
      }
    : data.hero;

  const contactData = content?.contact
    ? {
        ...data.contact,
        email: content.contact.email || data.contact.email,
        phone: content.contact.phone || data.contact.phone,
        address: content.contact.address || data.contact.address,
      }
    : data.contact;

  const themeStyle: React.CSSProperties = content?.theme
    ? ({
        ...(content.theme.backgroundColor ? { backgroundColor: content.theme.backgroundColor } : {}),
        ...(content.theme.textColor ? { color: content.theme.textColor } : {}),
        ...(content.theme.bodyFont ? { fontFamily: content.theme.bodyFont } : {}),
        ...(content.theme.primaryColor ? { '--theme-primary': content.theme.primaryColor } : {}),
        ...(content.theme.secondaryColor ? { '--theme-secondary': content.theme.secondaryColor } : {}),
        ...(content.theme.accentColor ? { '--theme-accent': content.theme.accentColor } : {}),
        ...(content.theme.headingFont ? { '--theme-heading-font': content.theme.headingFont } : {}),
      } as React.CSSProperties)
    : {};

  return (
    <div id="top" style={themeStyle} className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#1D4ED8] selection:text-[#FFFFFF]">
      <Navbar04 branding={data.branding} contact={contactData} />
      <main>
        <Hero04 data={heroData} />
        <Metrics04 />
        <Services04 data={data.services} />
        <CaseStudies04 data={data.gallery} />
        <Video04 data={data.videoSection} />
        <Testimonials04 data={data.testimonials} />
        <CTA04 data={contactData} />
      </main>
      <Footer04
        branding={data.branding}
        contact={contactData}
        social={data.social}
      />
    </div>
  );
}
