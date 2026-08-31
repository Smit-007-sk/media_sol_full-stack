"use client";

import React from "react";
import { TemplateData } from "@/types/template";
import { WebsiteContent } from "@/api/content";
import { Navbar05 } from "./Navbar05";
import { Hero05 } from "./Hero05";
import { Narrative05 } from "./Narrative05";
import { Gallery05 } from "./Gallery05";
import { Craftsmanship05 } from "./Craftsmanship05";
import { Services05 } from "./Services05";
import { CTA05 } from "./CTA05";
import { Footer05 } from "./Footer05";

export interface Template05Props {
  data: TemplateData;
  content?: WebsiteContent | null;
}

export function Template05({ data, content }: Template05Props) {
  const heroData = content?.hero
    ? {
        ...data.hero,
        eyebrow: content.hero.eyebrow || data.hero.eyebrow,
        title: content.hero.title || data.hero.title,
        description: content.hero.description || data.hero.description,
      }
    : data.hero;

  const aboutData = content?.about
    ? {
        ...data.about,
        eyebrow: content.about.eyebrow || data.about.eyebrow,
        title: content.about.title || data.about.title,
        description: content.about.description || data.about.description,
      }
    : data.about;

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
    <div id="top" style={themeStyle} className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#C5A059] selection:text-[#FAFAFA]">
      <Navbar05 data={data.branding} />
      <main>
        <Hero05 data={heroData} />
        <Narrative05 data={aboutData} />
        <Gallery05 data={data.gallery} />
        <Craftsmanship05 data={data.videoSection} />
        <Services05 data={data.services} />
        <CTA05 data={contactData} />
      </main>
      <Footer05
        branding={data.branding}
        contact={contactData}
        social={data.social}
      />
    </div>
  );
}
