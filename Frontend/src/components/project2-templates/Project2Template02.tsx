"use client";

import React from "react";
import { WebsiteContent } from "@/api/content";
import ApexHero from "./apex/ApexHero";
import ApexProperties from "./apex/ApexProperties";
import ApexAmenities from "./apex/ApexAmenities";
import ApexStats from "./apex/ApexStats";
import ApexInquiryForm from "./apex/ApexInquiryForm";
import Footer from "./Footer";

export interface Project2Template02Props {
  content?: WebsiteContent | null;
}

export function Project2Template02({ content }: Project2Template02Props) {
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
    <div style={themeStyle} className="min-h-screen bg-[#0B1320] text-white selection:bg-[#D97706] selection:text-white font-sans">
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
      <ApexHero />
      <ApexProperties />
      <ApexAmenities />
      <ApexStats />
      <ApexInquiryForm />
      <Footer />
    </div>
  );
}
