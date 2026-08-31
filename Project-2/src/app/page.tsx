"use client";

import { useState } from "react";
import TemplateSwitcher from "@/components/TemplateSwitcher";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import CtaBanner from "@/components/CtaBanner";
import FloatingControls from "@/components/FloatingControls";
import QuoteModal from "@/components/QuoteModal";
import DemoModal from "@/components/DemoModal";
import Footer from "@/components/Footer";

export default function Home() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-[#B88E44] selection:text-white scroll-smooth">
      {/* Global Template Switcher Top Bar */}
      <TemplateSwitcher />

      {/* Navigation Header */}
      <Navbar onOpenQuote={() => setQuoteModalOpen(true)} />

      {/* Template 1: Emperor Smart Solutions Single Page Sections */}
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

      {/* Footer */}
      <Footer />

      {/* Floating Controls */}
      <FloatingControls />

      {/* Modals */}
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
