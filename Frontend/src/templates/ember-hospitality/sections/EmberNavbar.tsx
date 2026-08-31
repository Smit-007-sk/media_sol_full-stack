"use client";

import React, { useState } from 'react';
import { Menu, X, Flame, Calendar } from 'lucide-react';

interface EmberNavbarProps {
  theme?: any;
  heroData?: any;
}

export function EmberNavbar({ theme, heroData }: EmberNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = theme?.logoUrl;
  const brandName = theme?.brandName || 'EMBER HOSPITALITY';
  const ctaText = theme?.navCtaText || heroData?.primaryButtonText || 'RESERVE TABLE';
  const ctaUrl = theme?.navCtaUrl || heroData?.primaryButtonUrl || '#contact';

  const navLinks = [
    { label: theme?.navLink1Text || 'Welcome', href: '#hero' },
    { label: theme?.navLink2Text || 'Our Culinary Story', href: '#about' },
    { label: theme?.navLink3Text || 'Private Dining & Services', href: '#services' },
    { label: theme?.navLink4Text || 'Gallery', href: '#gallery' },
    { label: theme?.navLink5Text || 'Guest Reviews', href: '#testimonials' },
    { label: theme?.navLink6Text || 'Reservations', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#120B0B]/90 backdrop-blur-md border-b border-red-950 text-stone-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo or Text */}
        <a href="#hero" className="flex items-center space-x-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-10 w-auto object-contain rounded-lg" />
          ) : (
            <div className="flex items-center space-x-2">
              <Flame className="w-5 h-5 text-red-500" />
              <span className="font-serif text-lg font-bold uppercase tracking-widest text-white group-hover:text-red-400 transition-colors">
                {brandName}
              </span>
            </div>
          )}
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-medium text-stone-300">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-red-400 transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={ctaUrl}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-red-700 hover:bg-red-600 text-white text-xs font-serif font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-red-950/60 transition-all border border-red-500/30"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{ctaText}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-stone-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6 text-red-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-red-950 bg-[#120B0B] px-6 py-6 space-y-3 text-xs font-medium">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-stone-200 hover:text-red-400 py-2 border-b border-red-950/60"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-3 bg-red-700 text-white font-serif font-bold uppercase tracking-widest rounded-xl mt-4"
          >
            {ctaText}
          </a>
        </div>
      )}
    </header>
  );
}
