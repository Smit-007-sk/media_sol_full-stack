"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandingData } from "@/types/template";
import { Menu, X } from "lucide-react";

export interface Navbar02Props {
  data: BrandingData;
}

export function Navbar02({ data }: Navbar02Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#231B18]/95 backdrop-blur-md text-[#F5EFE6] border-b border-[#B85B35]/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left Nav Links */}
        <nav className="hidden lg:flex items-center space-x-8 font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#E6DDD3]">
          <Link href="#about" className="hover:text-[#B85B35] transition-colors">
            Sanctuary
          </Link>
          <Link href="#services" className="hover:text-[#B85B35] transition-colors">
            Pavilions
          </Link>
        </nav>

        {/* Center Logo */}
        <Link href="#top" className="flex flex-col items-center group mx-auto lg:mx-0">
          <span className="font-serif text-2xl tracking-[0.3em] font-light text-[#F5EFE6] group-hover:text-[#B85B35] transition-colors">
            {data.logoText}
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#B85B35] font-sans font-semibold">
            TERRACOTTA ESTATE & SANCTUARY
          </span>
        </Link>

        {/* Right Nav Links + CTA */}
        <div className="hidden lg:flex items-center space-x-8 font-sans text-xs uppercase tracking-[0.2em] font-medium text-[#E6DDD3]">
          <Link href="#gallery" className="hover:text-[#B85B35] transition-colors">
            Gallery
          </Link>
          <Link href="#contact" className="hover:text-[#B85B35] transition-colors">
            Contact
          </Link>
          <Link
            href="#contact"
            className="px-5 py-2.5 bg-[#B85B35] text-[#F5EFE6] font-semibold hover:bg-[#8C3B1A] transition-colors rounded-none tracking-widest shadow-md"
          >
            Reserve Stay
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded text-[#B85B35] focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#231B18] border-b border-[#3B2923] px-6 py-6 space-y-4 font-sans text-xs uppercase tracking-[0.2em] text-[#F5EFE6]">
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#B85B35] border-b border-[#3B2923]"
          >
            Sanctuary
          </Link>
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#B85B35] border-b border-[#3B2923]"
          >
            Pavilions
          </Link>
          <Link
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#B85B35] border-b border-[#3B2923]"
          >
            Gallery
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#B85B35] border-b border-[#3B2923]"
          >
            Contact
          </Link>
          <div className="pt-2">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 text-center bg-[#B85B35] text-[#F5EFE6] font-semibold tracking-widest"
            >
              Reserve Sanctuary
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
