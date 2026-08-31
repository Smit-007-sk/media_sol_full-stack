"use client";

import React from 'react';
import { SocialLink } from '@/api/content';

interface TerraFooterProps {
  socialLinks?: SocialLink[];
}

export function TerraFooter({ socialLinks }: TerraFooterProps) {
  return (
    <footer className="py-12 border-t border-stone-800 text-stone-400 text-xs font-sans" style={{ backgroundColor: '#231B18' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-sm font-serif tracking-wider text-[#B85B35]">
            TERRA ESTATE ARCHITECTURE
          </div>
          <div className="text-[11px] text-stone-500 font-mono">
            Powered by Emperor Media Solution Engine
          </div>
        </div>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center space-x-4">
            {socialLinks.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white transition-colors uppercase font-mono text-[10px]">
                {s.platform}
              </a>
            ))}
          </div>
        )}

        <div className="text-[11px] text-stone-500 font-mono">
          &copy; {new Date().getFullYear()} Terra Estate. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
