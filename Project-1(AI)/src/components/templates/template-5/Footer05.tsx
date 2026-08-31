"use client";

import React from "react";
import Link from "next/link";
import { BrandingData, ContactData, SocialData } from "@/types/template";

export interface Footer05Props {
  branding: BrandingData;
  contact: ContactData;
  social: SocialData;
}

export function Footer05({ branding, contact }: Footer05Props) {
  return (
    <footer className="bg-emperor-white-warm text-stone-500 py-16 border-t border-emperor-border font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="font-serif text-2xl tracking-[0.4em] font-light text-emperor-charcoal block">
          {branding.logoText}
        </span>
        <p className="text-[10px] uppercase tracking-[0.3em] text-emperor-gold font-medium">
          GENÈVE HAUTE HORLOGERIE
        </p>

        <div className="flex flex-wrap justify-center gap-8 uppercase tracking-[0.2em] text-[10px] text-stone-600 pt-4">
          <Link href="#narrative" className="hover:text-emperor-gold transition-colors">
            Atelier
          </Link>
          <Link href="#gallery" className="hover:text-emperor-gold transition-colors">
            Masterpieces
          </Link>
          <Link href="#craft" className="hover:text-emperor-gold transition-colors">
            Craftsmanship
          </Link>
          <Link href="#contact" className="hover:text-emperor-gold transition-colors">
            Private Salon
          </Link>
          <Link href="/templates" className="hover:text-emperor-gold transition-colors">
            Template System
          </Link>
        </div>

        <div className="pt-8 border-t border-emperor-border flex flex-col sm:flex-row items-center justify-between text-stone-400 text-[10px] gap-4">
          <p>© {new Date().getFullYear()} {branding.name}. All Rights Reserved.</p>
          <p>Geneva Atelier | Rue du Rhône 42, 1204 Geneva</p>
        </div>
      </div>
    </footer>
  );
}
