"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandingData } from "@/types/template";
import { Menu, X } from "lucide-react";

export interface Navbar05Props {
  data: BrandingData;
}

export function Navbar05({ data }: Navbar05Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAFA]/95 backdrop-blur-md text-[#111111] border-b border-[#EAE3D2] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex flex-col justify-center items-center relative">
        {/* Centered Monogram Header */}
        <Link href="#top" className="flex flex-col items-center group">
          <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.4em] text-[#111111] group-hover:text-[#C5A059] transition-colors">
            {data.logoText}
          </span>
          <span className="text-[8px] uppercase tracking-[0.4em] font-sans text-[#C5A059] font-semibold mt-0.5">
            HAUTE HORLOGERIE & ATELIER
          </span>
        </Link>

        {/* Minimal Nav Links */}
        <nav className="hidden md:flex items-center space-x-10 font-sans text-[11px] uppercase tracking-[0.25em] font-light text-stone-600 mt-2">
          <Link href="#narrative" className="hover:text-[#C5A059] transition-colors">
            Atelier
          </Link>
          <Link href="#gallery" className="hover:text-[#C5A059] transition-colors">
            Masterpieces
          </Link>
          <Link href="#craft" className="hover:text-[#C5A059] transition-colors">
            Craftsmanship
          </Link>
          <Link href="#contact" className="hover:text-[#C5A059] transition-colors">
            Private Salon
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden absolute right-4 top-6 p-2 text-stone-600 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAFAFA] border-b border-[#EAE3D2] px-6 py-6 space-y-3 text-center font-sans text-xs uppercase tracking-[0.25em] text-stone-700">
          <Link
            href="#narrative"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#C5A059] border-b border-[#EAE3D2]"
          >
            Atelier
          </Link>
          <Link
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#C5A059] border-b border-[#EAE3D2]"
          >
            Masterpieces
          </Link>
          <Link
            href="#craft"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#C5A059] border-b border-[#EAE3D2]"
          >
            Craftsmanship
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-[#C5A059]"
          >
            Private Salon
          </Link>
        </div>
      )}
    </header>
  );
}
