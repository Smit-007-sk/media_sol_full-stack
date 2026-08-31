"use client";

import React from "react";
import { WebsiteContent } from "@/api/content";
import AetheriaHero from "./aetheria/AetheriaHero";
import AetheriaFeatures from "./aetheria/AetheriaFeatures";
import AetheriaArchitecture from "./aetheria/AetheriaArchitecture";
import AetheriaSdkDocs from "./aetheria/AetheriaSdkDocs";
import AetheriaPricing from "./aetheria/AetheriaPricing";
import AetheriaFaq from "./aetheria/AetheriaFaq";
import Footer from "./Footer";

export interface Project2Template01Props {
  content?: WebsiteContent | null;
}

export function Project2Template01({ content }: Project2Template01Props) {
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
    <div style={themeStyle} className="min-h-screen bg-[#08090E] text-white selection:bg-purple-600 selection:text-white font-mono">
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
      <AetheriaHero />
      <AetheriaFeatures />
      <AetheriaArchitecture />
      <AetheriaSdkDocs />
      <AetheriaPricing />
      <AetheriaFaq />
      <Footer />
    </div>
  );
}
