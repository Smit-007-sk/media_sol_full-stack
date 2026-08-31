"use client";

import React from "react";
import Link from "next/link";
import { BrandingData, ContactData, SocialData } from "@/types/template";
import { Building } from "lucide-react";

export interface Footer04Props {
  branding: BrandingData;
  contact: ContactData;
  social: SocialData;
}

export function Footer04({ branding, contact }: Footer04Props) {
  return (
    <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Building className="w-5 h-5 text-emperor-gold" />
              <span className="font-sans text-xl font-bold text-white tracking-widest">
                {branding.logoText}
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              {branding.description}
            </p>
          </div>

          <div>
            <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link href="#services" className="hover:text-emperor-gold transition-colors">
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emperor-gold transition-colors">
                  Data Governance
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emperor-gold transition-colors">
                  Cyber Resilience
                </Link>
              </li>
              <li>
                <Link href="#cases" className="hover:text-emperor-gold transition-colors">
                  Case Deployments
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-4">
              Corporate Office
            </h4>
            <p className="text-stone-400 leading-relaxed">{contact.address}</p>
            <p className="text-emperor-gold font-medium mt-2">{contact.email}</p>
            <p className="text-stone-400 mt-1">{contact.phone}</p>
          </div>

          <div>
            <h4 className="font-sans text-sm font-bold text-white uppercase tracking-wider mb-4">
              System Overview
            </h4>
            <Link
              href="/templates"
              className="inline-block px-4 py-2 bg-emperor-gold text-emperor-noir font-bold uppercase tracking-wider text-[10px] rounded"
            >
              Template System Overview
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} {branding.name}. CMS-Ready Template.</p>
          <div className="flex items-center space-x-6">
            <span>Corporate Compliance</span>
            <span>Security Statement</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
