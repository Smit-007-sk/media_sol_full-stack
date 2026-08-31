"use client";

import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';

interface ObsidianNavbarProps {
  theme?: any;
  heroData?: any;
}

export function ObsidianNavbar({ theme, heroData }: ObsidianNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = theme?.logoUrl;
  const brandName = theme?.brandName || 'OBSIDIAN STUDIO';
  const ctaText = theme?.navCtaText || heroData?.primaryButtonText || 'COMMISSION WORK';
  const ctaUrl = theme?.navCtaUrl || heroData?.primaryButtonUrl || '#contact';

  const navLinks = [
    { label: theme?.navLink1Text || '// HERO', href: '#hero' },
    { label: theme?.navLink2Text || '// ABOUT', href: '#about' },
    { label: theme?.navLink3Text || '// SERVICES', href: '#services' },
    { label: theme?.navLink4Text || '// GALLERY', href: '#gallery' },
    { label: theme?.navLink5Text || '// REVIEWS', href: '#testimonials' },
    { label: theme?.navLink6Text || '// CONTACT', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0F0F12]/90 backdrop-blur-md border-b border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo or Text */}
        <a href="#hero" className="flex items-center space-x-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-10 w-auto object-contain rounded-lg" />
          ) : (
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-[#E5B842]" />
              <span className="font-mono text-sm font-black uppercase tracking-[0.25em] text-white group-hover:text-[#E5B842] transition-colors">
                {brandName}
              </span>
            </div>
          )}
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 font-mono text-xs text-stone-400">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-[#E5B842] transition-colors py-1 tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={ctaUrl}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-stone-900 border border-stone-700 hover:border-[#E5B842] text-[#E5B842] text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all hover:bg-stone-800 shadow-md"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-stone-400 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6 text-[#E5B842]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-800 bg-[#0F0F12] px-6 py-6 space-y-4 font-mono text-xs">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-stone-300 hover:text-[#E5B842] py-2 border-b border-stone-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-3 bg-[#E5B842] text-black font-bold uppercase tracking-widest rounded-xl mt-4"
          >
            {ctaText}
          </a>
        </div>
      )}
    </header>
  );
}
