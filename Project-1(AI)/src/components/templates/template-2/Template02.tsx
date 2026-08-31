"use client";

import React from "react";
import { TemplateData } from "@/types/template";
import { WebsiteContent } from "@/api/content";
import { Navbar02 } from "./Navbar02";
import { Hero02 } from "./Hero02";
import { EditorialIntro02 } from "./EditorialIntro02";
import { Services02 } from "./Services02";
import { Gallery02 } from "./Gallery02";
import { Video02 } from "./Video02";
import { Testimonials02 } from "./Testimonials02";
import { CTA02 } from "./CTA02";
import { Footer02 } from "./Footer02";

export interface Template02Props {
  data: TemplateData;
  content?: WebsiteContent | null;
}

export function Template02({ data, content }: Template02Props) {
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
    <div id="top" style={themeStyle} className="min-h-screen bg-[#F5EFE6] text-[#231B18] font-sans selection:bg-[#B85B35] selection:text-[#F5EFE6]">
      <Navbar02 data={data.branding} />
      <main>
        <Hero02 data={heroData} />
        <EditorialIntro02 data={aboutData} />
        <Services02 data={data.services} />
        <Gallery02 data={data.gallery} />
        <Video02 data={data.videoSection} />
        <Testimonials02 data={data.testimonials} />
        <CTA02 data={contactData} />
      </main>
      <Footer02
        branding={data.branding}
        contact={contactData}
        social={data.social}
      />
    </div>
  );
}
