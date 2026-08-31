"use client";

import React from 'react';
import { SocialLink } from '@/api/content';

interface HorizonFooterProps {
  socialLinks?: SocialLink[];
}

export function HorizonFooter({ socialLinks }: HorizonFooterProps) {
  return (
    <footer className="py-12 border-t border-slate-800 text-slate-400 text-xs font-sans bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-bold text-sm tracking-wider uppercase text-white">
            HORIZON FINANCE ADVISORY
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Powered by Emperor Media Solution Engine
          </div>
        </div>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center space-x-4 font-mono text-[10px]">
            {socialLinks.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors uppercase">
                {s.platform}
              </a>
            ))}
          </div>
        )}

        <div className="text-[11px] text-slate-500 font-mono">
          &copy; {new Date().getFullYear()} Horizon Finance. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
