"use client";

import React from "react";
import { WebsiteContent } from "@/api/content";
import VerveHero from "./verve/VerveHero";
import VerveMarquee from "./verve/VerveMarquee";
import VerveServices from "./verve/VerveServices";
import VervePhilosophy from "./verve/VervePhilosophy";
import VerveGallery from "./verve/VerveGallery";
import VervePress from "./verve/VervePress";
import VerveContact from "./verve/VerveContact";
import Footer from "./Footer";

export interface Project2Template03Props {
  content?: WebsiteContent | null;
}

export function Project2Template03({ content }: Project2Template03Props) {
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
    <div style={themeStyle} className="min-h-screen bg-[#0D0D0D] text-[#E5E5E5] selection:bg-[#FF3366] selection:text-white font-sans">
      {content?.hero && (
        <div className="bg-[#121614] border-b border-stone-800 p-8 text-center space-y-3">
          {content.hero.eyebrow && (
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A45C] bg-[#075C45]/30 px-3 py-1 rounded-md border border-[#C9A45C]/30">
              {content.hero.eyebrow}
            </span>
          )}
          {content.hero.title && (
            <h1 className="text-3xl font-bold font-serif text-white">{content.hero.title}</h1>
          )}
          {content.hero.description && (
            <p className="text-xs text-stone-300 max-w-2xl mx-auto">{content.hero.description}</p>
          )}
        </div>
      )}
      <VerveHero />
      <VerveMarquee />
      <VerveServices />
      <VervePhilosophy />
      <VerveGallery />
      <VervePress />
      <VerveContact />
      <Footer />
    </div>
  );
}
