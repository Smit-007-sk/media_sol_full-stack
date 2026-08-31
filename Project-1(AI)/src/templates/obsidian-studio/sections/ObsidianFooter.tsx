"use client";

import React from 'react';
import { SocialLink } from '@/api/content';

interface ObsidianFooterProps {
  socialLinks?: SocialLink[];
}

export function ObsidianFooter({ socialLinks }: ObsidianFooterProps) {
  return (
    <footer className="py-12 bg-[#0A0A0A] text-stone-400 text-xs font-mono border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-white tracking-widest uppercase">
            OBSIDIAN STUDIO
          </div>
          <div className="text-[11px] text-stone-600">
            Powered by Emperor Media Solution Engine
          </div>
        </div>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center space-x-4">
            {socialLinks.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white transition-colors uppercase text-[10px]">
                {s.platform}
              </a>
            ))}
          </div>
        )}

        <div className="text-[11px] text-stone-600">
          &copy; {new Date().getFullYear()} Studio Obsidian. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
