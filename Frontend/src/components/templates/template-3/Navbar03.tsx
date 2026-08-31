"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandingData } from "@/types/template";
import { Menu, X, ArrowUpRight, Compass } from "lucide-react";

export interface Navbar03Props {
  data: BrandingData;
}

export function Navbar03({ data }: Navbar03Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-emperor-noir/90 backdrop-blur-md text-emperor-white-warm border-b border-emperor-border-dark transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left Menu Drawer Trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center space-x-3 text-xs uppercase tracking-[0.25em] font-sans text-emperor-gold hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded border border-emperor-gold/40 flex items-center justify-center group-hover:border-emperor-gold">
              <Menu className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">Explore Atelier</span>
          </button>

          {/* Center Monogram Logo */}
          <Link href="#top" className="flex flex-col items-center group">
            <span className="font-serif text-2xl font-bold tracking-[0.4em] text-emperor-white-warm group-hover:text-emperor-gold transition-colors">
              {data.logoText}
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-stone-400">
              ARCHITECTURE & ATELIER
            </span>
          </Link>

          {/* Right Action */}
          <Link
            href="#contact"
            className="flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-emperor-gold border border-emperor-gold/40 px-4 py-2 hover:bg-emperor-gold hover:text-emperor-noir transition-all"
          >
            <span>Inquire</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Asymmetric Fullscreen Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-emperor-noir/98 text-emperor-white-warm flex flex-col justify-between p-8 sm:p-16 animate-fadeIn backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.3em] font-sans text-emperor-gold">
              ATELIER NAVIGATION
            </span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-3 border border-emperor-gold/40 rounded-full hover:bg-emperor-gold hover:text-emperor-noir transition-all"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto max-w-5xl mx-auto w-full">
            <div className="space-y-6 font-serif text-3xl sm:text-5xl font-light">
              <Link
                href="#projects"
                onClick={() => setDrawerOpen(false)}
                className="block hover:text-emperor-gold hover:translate-x-3 transition-all"
              >
                01 / Portfolio Showcase
              </Link>
              <Link
                href="#services"
                onClick={() => setDrawerOpen(false)}
                className="block hover:text-emperor-gold hover:translate-x-3 transition-all"
              >
                02 / Spatial Services
              </Link>
              <Link
                href="#about"
                onClick={() => setDrawerOpen(false)}
                className="block hover:text-emperor-gold hover:translate-x-3 transition-all"
              >
                03 / Studio Manifesto
              </Link>
              <Link
                href="#video"
                onClick={() => setDrawerOpen(false)}
                className="block hover:text-emperor-gold hover:translate-x-3 transition-all"
              >
                04 / Showreel Film
              </Link>
              <Link
                href="#contact"
                onClick={() => setDrawerOpen(false)}
                className="block hover:text-emperor-gold hover:translate-x-3 transition-all"
              >
                05 / Inquiry & Contact
              </Link>
            </div>

            <div className="flex flex-col justify-end space-y-4 font-sans text-xs text-stone-400 border-l border-stone-800 pl-8 hidden md:flex">
              <p className="text-emperor-gold font-semibold uppercase tracking-widest">
                Studio Kroma Atelier
              </p>
              <p>Gotthardstrasse 48, 8002 Zurich, Switzerland</p>
              <p>atelier@studiokroma.design | +41 44 290 8110</p>
              <p className="pt-4 text-stone-500">
                Atelier visits conducted by advance consultation.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 font-sans border-t border-stone-800 pt-6">
            <span>© {new Date().getFullYear()} Studio Kroma Atelier</span>
            <Link href="/templates" className="hover:text-emperor-gold">
              Back to Template Overview
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
