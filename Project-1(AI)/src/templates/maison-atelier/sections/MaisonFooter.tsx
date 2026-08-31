"use client";

import React from 'react';
import { SocialLink } from '@/api/content';

interface MaisonFooterProps {
  socialLinks?: SocialLink[];
}

export function MaisonFooter({ socialLinks }: MaisonFooterProps) {
  return (
    <footer className="py-12 border-t border-stone-200 text-stone-500 text-xs font-serif bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-light text-sm tracking-widest uppercase text-[#C5A059]">
            MAISON ATELIER PARIS
          </div>
          <div className="text-[11px] text-stone-400 font-sans">
            Powered by Emperor Media Solution Engine
          </div>
        </div>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center space-x-4 font-sans text-[10px]">
            {socialLinks.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors uppercase">
                {s.platform}
              </a>
            ))}
          </div>
        )}

        <div className="text-[11px] text-stone-400 font-sans">
          &copy; {new Date().getFullYear()} Maison Atelier. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
