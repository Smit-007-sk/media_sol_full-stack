"use client";

import React from 'react';
import { SocialLink } from '@/api/content';

interface AuroraFooterProps {
  socialLinks?: SocialLink[];
}

export function AuroraFooter({ socialLinks }: AuroraFooterProps) {
  return (
    <footer className="py-12 border-t border-stone-800 text-stone-300 text-xs font-sans" style={{ backgroundColor: '#121614' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-sm font-serif tracking-wider" style={{ color: 'var(--theme-secondary, #C9A45C)' }}>
            EMPEROR MEDIA SOLUTION
          </div>
          <div className="text-[11px] text-stone-500 font-mono">
            Aurora Corporate Executive Template • Powered by Emperor Media Solution
          </div>
        </div>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center space-x-4">
            {socialLinks.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-100 transition-colors uppercase font-mono text-[10px]">
                {s.platform}
              </a>
            ))}
          </div>
        )}

        <div className="text-[11px] text-stone-500 font-mono">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
