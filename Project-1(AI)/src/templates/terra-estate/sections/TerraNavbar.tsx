"use client";

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';

interface TerraNavbarProps {
  theme?: any;
  heroData?: any;
}

export function TerraNavbar({ theme, heroData }: TerraNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = theme?.logoUrl;
  const brandName = theme?.brandName || 'TERRA ESTATE';
  const ctaText = theme?.navCtaText || heroData?.primaryButtonText || 'EXPLORE PORTFOLIO';
  const ctaUrl = theme?.navCtaUrl || heroData?.primaryButtonUrl || '#gallery';

  const navLinks = [
    { label: theme?.navLink1Text || 'Overview', href: '#hero' },
    { label: theme?.navLink2Text || 'Philosophy', href: '#about' },
    { label: theme?.navLink3Text || 'Estates & Services', href: '#services' },
    { label: theme?.navLink4Text || 'Portfolio', href: '#gallery' },
    { label: theme?.navLink5Text || 'Client Reviews', href: '#testimonials' },
    { label: theme?.navLink6Text || 'Advisory', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-stone-300 text-stone-900 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo or Text */}
        <a href="#hero" className="flex items-center space-x-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-10 w-auto object-contain rounded-lg" />
          ) : (
            <div className="flex items-center space-x-2.5">
              <Compass className="w-5 h-5 text-[#B85B35]" />
              <span className="font-serif text-lg font-bold uppercase tracking-widest text-[#231B18] group-hover:text-[#B85B35] transition-colors">
                {brandName}
              </span>
            </div>
          )}
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold text-stone-700">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-[#B85B35] transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={ctaUrl}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#B85B35] hover:bg-[#A04A27] text-white text-xs font-serif font-bold uppercase tracking-widest rounded-xl shadow-md transition-all"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-stone-700 hover:text-stone-900"
        >
          {isOpen ? <X className="w-6 h-6 text-[#B85B35]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-300 bg-[#F5EFE6] px-6 py-6 space-y-3 text-xs font-medium">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-stone-800 hover:text-[#B85B35] py-2 border-b border-stone-300/60"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-3 bg-[#B85B35] text-white font-serif font-bold uppercase tracking-widest rounded-xl mt-4"
          >
            {ctaText}
          </a>
        </div>
      )}
    </header>
  );
}
