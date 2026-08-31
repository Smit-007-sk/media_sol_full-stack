"use client";

import React from "react";
import { TemplateData } from "@/types/template";
import { WebsiteContent } from "@/api/content";
import { Navbar01 } from "./Navbar01";
import { Hero01 } from "./Hero01";
import { Services01 } from "./Services01";
import { About01 } from "./About01";
import { Portfolio01 } from "./Portfolio01";
import { Video01 } from "./Video01";
import { CTA01 } from "./CTA01";
import { Footer01 } from "./Footer01";

export interface Template01Props {
  data: TemplateData;
  content?: WebsiteContent | null;
}

export function Template01({ data, content }: Template01Props) {
  const heroData = content?.hero
    ? {
        ...data.hero,
        eyebrow: content.hero.eyebrow || data.hero.eyebrow,
        title: content.hero.title || data.hero.title,
        description: content.hero.description || data.hero.description,
        primaryCTA: content.hero.primaryButtonText || data.hero.primaryCTA,
        primaryURL: content.hero.primaryButtonUrl || data.hero.primaryURL,
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
        ...(content.theme.primaryColor ? { '--t-emerald': content.theme.primaryColor, '--theme-primary': content.theme.primaryColor } : {}),
        ...(content.theme.secondaryColor ? { '--t-gold': content.theme.secondaryColor, '--theme-secondary': content.theme.secondaryColor } : {}),
        ...(content.theme.accentColor ? { '--t-accent': content.theme.accentColor, '--theme-accent': content.theme.accentColor } : {}),
        ...(content.theme.headingFont ? { '--theme-heading-font': content.theme.headingFont } : {}),
      } as React.CSSProperties)
    : {};

  return (
    <div id="top" style={themeStyle} className="min-h-screen bg-t1-bg text-t1-charcoal font-sans selection:bg-t1-emerald selection:text-t1-gold">
      <Navbar01 data={data.branding} />
      <main>
        <Hero01 data={heroData} />
        <Services01 data={data.services} />
        <About01 data={aboutData} />
        <Portfolio01 data={data.gallery} />
        <Video01 data={data.videoSection} />
        <CTA01 data={contactData} />
      </main>
      <Footer01
        branding={data.branding}
        contact={contactData}
        social={data.social}
      />
    </div>
  );
}
