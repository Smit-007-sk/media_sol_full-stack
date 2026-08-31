"use client";

import React from "react";
import Link from "next/link";
import { BrandingData, ContactData, SocialData } from "@/types/template";
import { Shield, Linkedin, Twitter, Youtube } from "lucide-react";

export interface Footer01Props {
  branding: BrandingData;
  contact: ContactData;
  social: SocialData;
}

export function Footer01({ branding, contact, social }: Footer01Props) {
  return (
    <footer className="bg-emperor-charcoal text-emperor-ivory pt-16 pb-12 border-t border-emperor-border-dark font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1 Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-emperor-emerald flex items-center justify-center text-emperor-gold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-widest text-white">
                {branding.logoText}
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
              {branding.description}
            </p>
            <div className="flex items-center space-x-4 text-stone-400 pt-2">
              {social.linkedin && (
                <a href={social.linkedin} target="_blank" rel="noreferrer" className="hover:text-emperor-gold transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noreferrer" className="hover:text-emperor-gold transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {social.youtube && (
                <a href={social.youtube} target="_blank" rel="noreferrer" className="hover:text-emperor-gold transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2 Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Practice Areas
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link href="#services" className="hover:text-emperor-gold transition-colors">
                  Growth Strategy
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emperor-gold transition-colors">
                  Organizational Design
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-emperor-gold transition-colors">
                  Capital Advisory
                </Link>
              </li>
              <li>
                <Link href="#video" className="hover:text-emperor-gold transition-colors">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 About */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <Link href="#about" className="hover:text-emperor-gold transition-colors">
                  About Practice
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-emperor-gold transition-colors">
                  Work Showcase
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-emperor-gold transition-colors">
                  Consultation
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-emperor-gold transition-colors">
                  Template Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 Contact Info */}
          <div>
            <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Headquarters
            </h4>
            <p className="text-stone-400 leading-relaxed mb-2">
              {contact.address}
            </p>
            <p className="text-emperor-gold font-medium">
              {contact.email}
            </p>
            <p className="text-stone-400 mt-1">
              {contact.phone}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} {branding.name}. CMS-Ready Template System.</p>
          <div className="flex items-center space-x-6 text-stone-400">
            <span className="hover:text-emperor-gold cursor-pointer">Privacy Policy</span>
            <span className="hover:text-emperor-gold cursor-pointer">Terms of Counsel</span>
            <span className="hover:text-emperor-gold cursor-pointer">Regulatory Statement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
