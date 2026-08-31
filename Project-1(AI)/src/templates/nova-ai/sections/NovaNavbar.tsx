"use client";

import React, { useState } from 'react';
import { Menu, X, Zap, Cpu } from 'lucide-react';

interface NovaNavbarProps {
  theme?: any;
  heroData?: any;
}

export function NovaNavbar({ theme, heroData }: NovaNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const logoUrl = theme?.logoUrl;
  const brandName = theme?.brandName || 'NOVA AI';
  const ctaText = theme?.navCtaText || heroData?.primaryButtonText || 'LAUNCH CONSOLE';
  const ctaUrl = theme?.navCtaUrl || heroData?.primaryButtonUrl || '#contact';

  const navLinks = [
    { label: theme?.navLink1Text || 'Platform', href: '#hero' },
    { label: theme?.navLink2Text || 'Neural Engine', href: '#about' },
    { label: theme?.navLink3Text || 'Capabilities', href: '#services' },
    { label: theme?.navLink4Text || 'Models', href: '#gallery' },
    { label: theme?.navLink5Text || 'Benchmark Trust', href: '#testimonials' },
    { label: theme?.navLink6Text || 'API Access', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0914]/90 backdrop-blur-md border-b border-purple-900/40 text-stone-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo or Text */}
        <a href="#hero" className="flex items-center space-x-3 group">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-10 w-auto object-contain rounded-lg" />
          ) : (
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/40 text-purple-400 shadow-lg shadow-purple-950/50">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-mono text-sm font-extrabold uppercase tracking-[0.25em] text-white group-hover:text-purple-400 transition-colors">
                {brandName}
              </span>
            </div>
          )}
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-mono font-semibold text-stone-300">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-purple-400 transition-colors tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={ctaUrl}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-purple-900/40 transition-all border border-purple-400/30"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{ctaText}</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-stone-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6 text-purple-400" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-purple-900/40 bg-[#0B0914] px-6 py-6 space-y-3 text-xs font-mono">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-stone-200 hover:text-purple-400 py-2 border-b border-purple-950"
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaUrl}
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-3 bg-purple-600 text-white font-bold uppercase tracking-widest rounded-xl mt-4"
          >
            {ctaText}
          </a>
        </div>
      )}
    </header>
  );
}
