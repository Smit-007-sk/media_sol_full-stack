"use client";

import React from "react";
import { TemplateData } from "@/types/template";
import { WebsiteContent } from "@/api/content";
import { Navbar03 } from "./Navbar03";
import { Hero03 } from "./Hero03";
import { Projects03 } from "./Projects03";
import { Services03 } from "./Services03";
import { Process03 } from "./Process03";
import { Video03 } from "./Video03";
import { CTA03 } from "./CTA03";
import { Footer03 } from "./Footer03";

export interface Template03Props {
  data: TemplateData;
  content?: WebsiteContent | null;
}

export function Template03({ data, content }: Template03Props) {
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
    <div id="top" style={themeStyle} className="min-h-screen bg-[#0A0A0A] text-[#FFFFFF] font-sans selection:bg-[#E5B842] selection:text-[#0A0A0A]">
      <Navbar03 data={data.branding} />
      <main>
        <Hero03 data={heroData} />
        <Projects03 data={data.gallery} />
        <Services03 data={data.services} />
        <Process03 data={aboutData} />
        <Video03 data={data.videoSection} />
        <CTA03 data={contactData} />
      </main>
      <Footer03
        branding={data.branding}
        contact={contactData}
        social={data.social}
      />
    </div>
  );
}
