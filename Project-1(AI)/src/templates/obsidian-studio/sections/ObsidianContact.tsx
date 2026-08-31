"use client";

import React from 'react';
import { Contact } from '@/api/content';
import { Mail, MapPin, ArrowRight } from 'lucide-react';

interface ObsidianContactProps {
  data?: Contact | null;
  design?: any;
  theme?: any;
}

export function ObsidianContact({ data, design, theme }: ObsidianContactProps) {
  const contactStyle = design?.contactStyle || theme?.contactStyle || 'split';

  const email = data?.email || 'commissions@obsidian-studio.com';
  const address = data?.address || '74 Rue de Turenne, 75003 Paris, France';

  if (contactStyle === 'centered') {
    return (
      <section id="contact" className="py-24 border-b border-stone-800 bg-[#0F0F12] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <span className="font-mono text-xs uppercase font-bold tracking-[0.2em] text-[#E5B842]">
            INITIATE COMMISSION
          </span>
          <h2 className="text-4xl font-bold font-serif">Let&rsquo;s Build a Digital Monument</h2>
          <p className="text-sm text-stone-400 leading-relaxed font-sans max-w-xl mx-auto">
            We accept a limited number of high-impact brand direction and web architecture commissions each quarter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-left">
            <div className="p-6 rounded-2xl bg-[#141416] border border-stone-800 space-y-2">
              <div className="text-stone-500">// DIRECT EMAIL</div>
              <div className="text-white font-bold">{email}</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#141416] border border-stone-800 space-y-2">
              <div className="text-stone-500">// PARIS STUDIO</div>
              <div className="text-white font-bold">{address}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 border-b border-stone-800 bg-[#0F0F12] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase font-bold tracking-[0.2em]" style={{ color: 'var(--theme-primary, #E5B842)' }}>
              INITIATE COMMISSION
            </span>
            <h2 className="text-4xl font-bold font-serif">Let&rsquo;s Build a Digital Monument</h2>
            <p className="text-sm text-stone-400 leading-relaxed font-sans">
              We accept a limited number of high-impact brand direction and web architecture commissions each quarter.
            </p>

            <div className="space-y-4 pt-4 font-mono text-xs">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#141416] border border-stone-800">
                <Mail className="w-5 h-5 text-stone-400 shrink-0" />
                <div>
                  <div className="text-stone-500">DIRECT EMAIL</div>
                  <a href={`mailto:${email}`} className="text-white hover:underline font-bold">{email}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#141416] border border-stone-800">
                <MapPin className="w-5 h-5 text-stone-400 shrink-0" />
                <div>
                  <div className="text-stone-500">PARIS STUDIO</div>
                  <div className="text-white font-bold">{address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl border border-stone-800 bg-[#141416] space-y-4">
            <h3 className="text-xl font-bold font-serif text-white">Commission Intake</h3>
            <form className="space-y-4 text-xs font-sans" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-stone-300 font-bold mb-1">Your Name / Title</label>
                <input type="text" placeholder="e.g. Jean-Luc Moreau" className="w-full px-4 py-3 rounded-xl border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-[#E5B842]" />
              </div>
              <div>
                <label className="block text-stone-300 font-bold mb-1">Contact Email</label>
                <input type="email" placeholder="e.g. jeanluc@studio.com" className="w-full px-4 py-3 rounded-xl border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-[#E5B842]" />
              </div>
              <div>
                <label className="block text-stone-300 font-bold mb-1">Commission Brief</label>
                <textarea rows={3} placeholder="Outline your project scope and timelines..." className="w-full px-4 py-3 rounded-xl border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-[#E5B842]" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-black flex items-center justify-center space-x-2 transition-transform hover:scale-105" style={{ backgroundColor: 'var(--theme-primary, #E5B842)' }}>
                <span>Send Brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
