"use client";

import React from "react";
import Link from "next/link";
import { BrandingData, ContactData, SocialData } from "@/types/template";

export interface Footer02Props {
  branding: BrandingData;
  contact: ContactData;
  social: SocialData;
}

export function Footer02({ branding, contact }: Footer02Props) {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between pb-12 border-b border-stone-800 gap-8">
          {/* Logo */}
          <div className="text-center md:text-left space-y-1">
            <span className="font-serif text-2xl tracking-[0.3em] font-light text-emperor-white-warm block">
              {branding.logoText}
            </span>
            <p className="text-[10px] uppercase tracking-[0.25em] text-emperor-gold">
              ESTATE & SANCTUARY
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 uppercase tracking-[0.2em] text-[11px] text-stone-300">
            <Link href="#about" className="hover:text-emperor-gold transition-colors">
              Sanctuary
            </Link>
            <Link href="#services" className="hover:text-emperor-gold transition-colors">
              Pavilions
            </Link>
            <Link href="#gallery" className="hover:text-emperor-gold transition-colors">
              Gallery
            </Link>
            <Link href="#contact" className="hover:text-emperor-gold transition-colors">
              Reservations
            </Link>
            <Link href="/templates" className="hover:text-emperor-gold transition-colors">
              Template Overview
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} {branding.name}. CMS-Ready Website Template.</p>
          <div className="flex items-center space-x-6">
            <span>Privacy Notice</span>
            <span>Estate Guidelines</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
