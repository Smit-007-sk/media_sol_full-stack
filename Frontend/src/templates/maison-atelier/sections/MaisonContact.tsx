"use client";

import React from 'react';
import { Contact } from '@/api/content';
import { Mail, Phone, MapPin } from 'lucide-react';

interface MaisonContactProps {
  data?: Contact | null;
  design?: any;
  theme?: any;
}

export function MaisonContact({ data }: Contact | any) {
  const email = data?.email || 'appointments@maison-atelier.com';
  const phone = data?.phone || '+33 1 42 68 00 00';
  const address = data?.address || '12 Rue de la Paix, 75002 Paris, France';

  return (
    <section id="contact" className="py-24 bg-white border-t border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-serif italic text-xs uppercase tracking-[0.2em] text-[#C5A059]">
              PRIVATE APPOINTMENT
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light">Schedule an Atelier Consultation</h2>
            <p className="text-sm text-stone-600 leading-relaxed font-light font-sans">
              Our salon accepts private appointments for couture fittings and interior architectural consultations in Paris and Milan.
            </p>

            <div className="space-y-4 pt-4 font-serif text-xs">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <Mail className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <div className="text-stone-400 font-sans text-[11px]">SALON EMAIL</div>
                  <a href={`mailto:${email}`} className="text-stone-900 font-light hover:underline">{email}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                <MapPin className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <div className="text-stone-400 font-sans text-[11px]">PARIS SALON</div>
                  <div className="text-stone-900 font-light">{address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl border border-stone-200 bg-[#FAFAFA] space-y-4 shadow-sm text-center">
            <h3 className="text-xl font-serif font-light text-stone-900">Private Booking Intake</h3>
            <form className="space-y-4 text-xs font-sans text-left" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                <input type="text" placeholder="e.g. Lady Genevieve" className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]" />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Email Address</label>
                <input type="email" placeholder="e.g. genevieve@monaco.mc" className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]" />
              </div>
              <div>
                <label className="block text-stone-700 font-medium mb-1">Commission Brief</label>
                <textarea rows={3} placeholder="Describe gown or spatial requirements..." className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl font-serif text-white bg-[#C5A059] hover:opacity-90 transition-opacity">
                Request Private Salon Booking
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
