"use client";

import React, { useState } from 'react';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

interface FramefolioNavbarProps {
  theme?: any;
  heroData?: any;
}

export function FramefolioNavbar({ theme, heroData }: FramefolioNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = theme?.logoUrl;
  const brandName = theme?.brandName || 'FRAMEFOLIO';
  const ctaText = theme?.navCtaText || heroData?.primaryButtonText || 'VIEW WORK';
  const ctaUrl = theme?.navCtaUrl || heroData?.primaryButtonUrl || '#gallery';

  const navLinks = [
    { label: theme?.navLink1Text || 'Studio', href: '#hero' },
    { label: theme?.navLink2Text || 'Manifesto', href: '#about' },
    { label: theme?.navLink3Text || 'Services', href: '#services' },
    { label: theme?.navLink4Text || 'Showcase', href: '#gallery' },
    { label: theme?.navLink5Text || 'Feedback', href: '#testimonials' },
    { label: theme?.navLink6Text || 'Book Project', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-stone-800 text-stone-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo or Text */}
        <a href="#hero" className="flex items-center space-x-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-10 w-auto object-contain rounded-lg" />
          ) : (
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              <span className="font-sans text-base font-black uppercase tracking-tight text-white group-hover:text-pink-400 transition-colors">
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
              className="hover:text-pink-400 transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={ctaUrl}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-stone-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6 text-pink-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-stone-800 bg-[#0D0D0D] px-6 py-6 space-y-3 text-xs font-medium">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-stone-200 hover:text-pink-400 py-2 border-b border-stone-900"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-3 bg-pink-600 text-white font-bold uppercase tracking-wider rounded-xl mt-4"
          >
            {ctaText}
          </a>
        </div>
      )}
    </header>
  );
}
