"use client";

import React from "react";
import Link from "next/link";
import { BrandingData, ContactData, SocialData } from "@/types/template";

export interface Footer03Props {
  branding: BrandingData;
  contact: ContactData;
  social: SocialData;
}

export function Footer03({ branding, contact }: Footer03Props) {
  return (
    <footer className="bg-emperor-noir text-stone-400 py-16 border-t border-stone-800 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          <div>
            <span className="font-serif text-2xl tracking-[0.4em] font-bold text-emperor-white-warm block mb-2">
              {branding.logoText}
            </span>
            <p className="text-stone-400 text-xs leading-relaxed max-w-xs">
              {branding.description}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link href="#projects" className="hover:text-emperor-gold transition-colors">
                  Portfolio Showcase
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emperor-gold transition-colors">
                  Spatial Disciplines
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-emperor-gold transition-colors">
                  Atelier Manifesto
                </Link>
              </li>
              <li>
                <Link href="#video" className="hover:text-emperor-gold transition-colors">
                  Showreel Film
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Atelier Zurich
            </h4>
            <p className="text-stone-400 leading-relaxed mb-2">
              {contact.address}
            </p>
            <p className="text-emperor-gold font-medium">
              {contact.email}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              System Overview
            </h4>
            <Link
              href="/templates"
              className="inline-block px-4 py-2 bg-emperor-gold text-emperor-noir font-semibold uppercase tracking-wider text-[10px]"
            >
              Browse 5 Templates
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} {branding.name}. CMS-Ready Template.</p>
          <div className="flex items-center space-x-6">
            <span>Spatial Copyright</span>
            <span>Terms of Commission</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
