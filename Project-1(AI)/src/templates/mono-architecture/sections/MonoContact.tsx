"use client";

import React from 'react';
import { Contact } from '@/api/content';
import { Mail, MapPin } from 'lucide-react';

interface MonoContactProps {
  data?: Contact | null;
  design?: any;
  theme?: any;
}

export function MonoContact({ data }: MonoContactProps) {
  const email = data?.email || 'studio@mono-architecture.com';
  const address = data?.address || 'Strandgade 44, 1401 Copenhagen, Denmark';

  return (
    <section id="contact" className="py-24 bg-stone-50 border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase font-bold tracking-[0.2em] text-stone-500">
              PROJECT COMMISSIONS
            </span>
            <h2 className="text-4xl font-serif">Initiate Spatial Dialogue</h2>
            <p className="text-sm text-stone-600 leading-relaxed font-sans font-light">
              Our Copenhagen studio accepts a limited number of architectural commissions worldwide each year.
            </p>

            <div className="space-y-4 pt-4 font-mono text-xs">
              <div className="flex items-center space-x-4 p-4 border border-stone-300 bg-white">
                <Mail className="w-5 h-5 text-stone-600" />
                <div>
                  <div className="text-stone-400">DIRECT INQUIRIES</div>
                  <a href={`mailto:${email}`} className="text-stone-900 font-bold hover:underline">{email}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 border border-stone-300 bg-white">
                <MapPin className="w-5 h-5 text-stone-600" />
                <div>
                  <div className="text-stone-400">COPENHAGEN STUDIO</div>
                  <div className="text-stone-900 font-bold">{address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 border border-stone-900 bg-stone-950 text-white space-y-4">
            <h3 className="text-xl font-serif font-light text-white">Project Intake Brief</h3>
            <form className="space-y-4 text-xs font-mono" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-stone-300 font-bold mb-1">Your Name / Firm</label>
                <input type="text" placeholder="e.g. Henrik Lind" className="w-full px-4 py-3 border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-stone-300 font-bold mb-1">Contact Email</label>
                <input type="email" placeholder="e.g. henrik@lind.dk" className="w-full px-4 py-3 border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-white" />
              </div>
              <div>
                <label className="block text-stone-300 font-bold mb-1">Commission Brief</label>
                <textarea rows={3} placeholder="Site location, projected square footage, timeline..." className="w-full px-4 py-3 border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-white" />
              </div>
              <button type="submit" className="w-full py-3.5 font-mono text-xs font-bold text-black bg-white hover:bg-stone-200 transition-colors uppercase tracking-widest">
                Submit Project Brief
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
