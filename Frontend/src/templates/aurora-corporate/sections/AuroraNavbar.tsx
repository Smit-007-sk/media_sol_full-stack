"use client";

import React, { useState } from 'react';
import { Menu, X, ChevronRight, Building2 } from 'lucide-react';

interface AuroraNavbarProps {
  theme?: any;
  heroData?: any;
}

export function AuroraNavbar({ theme, heroData }: AuroraNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = theme?.logoUrl;
  const brandName = theme?.brandName || 'AURORA CORPORATE';
  const ctaText = theme?.navCtaText || heroData?.primaryButtonText || 'GET IN TOUCH';
  const ctaUrl = theme?.navCtaUrl || heroData?.primaryButtonUrl || '#contact';

  const navLinks = [
    { label: theme?.navLink1Text || 'Overview', href: '#hero' },
    { label: theme?.navLink2Text || 'Our Mission', href: '#about' },
    { label: theme?.navLink3Text || 'Services', href: '#services' },
    { label: theme?.navLink4Text || 'Case Studies', href: '#gallery' },
    { label: theme?.navLink5Text || 'Client Trust', href: '#testimonials' },
    { label: theme?.navLink6Text || 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#071813]/90 backdrop-blur-md border-b border-stone-800 text-stone-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo or Text */}
        <a href="#hero" className="flex items-center space-x-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-10 w-auto object-contain rounded-lg" />
          ) : (
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-[#075C45] text-[#C9A45C] border border-[#C9A45C]/30 shadow-md">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="font-serif text-lg font-bold tracking-tight text-white group-hover:text-[#C9A45C] transition-colors">
                {brandName}
              </span>
            </div>
          )}
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-stone-300">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-[#C9A45C] transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={ctaUrl}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#075C45] hover:bg-[#075C45]/90 text-[#C9A45C] text-xs font-semibold rounded-xl border border-[#C9A45C]/30 shadow-lg transition-all"
          >
            <span>{ctaText}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-stone-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6 text-[#C9A45C]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-800 bg-[#071813] px-6 py-6 space-y-3 text-xs font-medium">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-stone-200 hover:text-[#C9A45C] py-2 border-b border-stone-800/60"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-3 bg-[#075C45] text-[#C9A45C] font-semibold rounded-xl mt-4 border border-[#C9A45C]/30"
          >
            {ctaText}
          </a>
        </div>
      )}
    </header>
  );
}
