"use client";

import React, { useState } from "react";
import { WebsiteContent } from "@/api/content";
import Navbar from "./Navbar";
import Hero from "./Hero";
import StatsBar from "./StatsBar";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import PortfolioSection from "./PortfolioSection";
import TestimonialsSection from "./TestimonialsSection";
import BlogSection from "./BlogSection";
import ContactSection from "./ContactSection";
import CtaBanner from "./CtaBanner";
import QuoteModal from "./QuoteModal";
import DemoModal from "./DemoModal";
import Footer from "./Footer";

export interface Project2Template05Props {
  content?: WebsiteContent | null;
}

export function Project2Template05({ content }: Project2Template05Props) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

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
    <div style={themeStyle} className="min-h-screen flex flex-col relative selection:bg-[#B88E44] selection:text-white scroll-smooth bg-[#0A0D14] text-white font-sans">
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />
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
      <main className="flex-grow">
        <Hero
          onOpenQuote={() => setQuoteModalOpen(true)}
          onOpenDemo={() => setDemoModalOpen(true)}
        />
        <StatsBar />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
        <CtaBanner onOpenQuote={() => setQuoteModalOpen(true)} />
      </main>
      <Footer />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
}
