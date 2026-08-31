"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandingData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { Menu, X, Shield } from "lucide-react";

export interface Navbar01Props {
  data: BrandingData;
}

export function Navbar01({ data }: Navbar01Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-emperor-ivory/90 backdrop-blur-md border-b border-emperor-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Left */}
        <Link href="#top" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-sm bg-emperor-emerald flex items-center justify-center text-emperor-gold shadow-emerald group-hover:bg-emperor-emerald-dark transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-widest text-emperor-charcoal group-hover:text-emperor-emerald transition-colors">
              {data.logoText}
            </span>
            <span className="text-[10px] tracking-widest uppercase font-sans text-stone-500 font-medium">
              ADVISORY
            </span>
          </div>
        </Link>

        {/* Desktop Nav Right */}
        <nav className="hidden md:flex items-center space-x-8 font-sans text-sm font-medium text-stone-700">
          <Link href="#services" className="hover:text-emperor-emerald transition-colors">
            Services
          </Link>
          <Link href="#about" className="hover:text-emperor-emerald transition-colors">
            About Practice
          </Link>
          <Link href="#gallery" className="hover:text-emperor-emerald transition-colors">
            Work Showcase
          </Link>
          <Link href="#video" className="hover:text-emperor-emerald transition-colors">
            Methodology
          </Link>
          <Link href="#contact" className="hover:text-emperor-emerald transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button href="#contact" variant="primary" size="sm">
            Schedule Consultation
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded text-emperor-charcoal hover:bg-emperor-emerald/10 focus:outline-none"
          aria-label="Toggle mobile navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-emperor-ivory border-b border-emperor-border px-4 pt-2 pb-6 space-y-4 font-sans text-base animate-fadeIn">
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 hover:text-emperor-emerald border-b border-stone-200"
          >
            Services
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 hover:text-emperor-emerald border-b border-stone-200"
          >
            About Practice
          </Link>
          <Link
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 hover:text-emperor-emerald border-b border-stone-200"
          >
            Work Showcase
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-stone-800 hover:text-emperor-emerald border-b border-stone-200"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Button href="#contact" variant="primary" size="md" className="w-full">
              Schedule Consultation
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
