"use client";

import React from 'react';
import { Contact } from '@/api/content';
import { Mail, Phone, MapPin } from 'lucide-react';

interface EmberContactProps {
  data?: Contact | null;
  design?: any;
  theme?: any;
}

export function EmberContact({ data }: EmberContactProps) {
  const email = data?.email || 'reservations@ember-hospitality.com';
  const phone = data?.phone || '+1 (800) 900-EMBER';
  const address = data?.address || '100 Highland Ridge Road, Aspen, CO 81611';

  return (
    <section id="contact" className="py-24 bg-[#121216] border-b border-stone-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest font-mono text-red-400">
              RESERVATIONS & INQUIRIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">Reserve Your Hearth Experience</h2>
            <p className="text-sm text-stone-400 leading-relaxed font-sans">
              Our hearth restaurant and highland villa suites accept bookings up to 90 days in advance.
            </p>

            <div className="space-y-4 pt-4 font-mono text-xs">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#16161A] border border-stone-800">
                <Mail className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-stone-500">CONCIERGE EMAIL</div>
                  <a href={`mailto:${email}`} className="text-white font-semibold hover:underline">{email}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#16161A] border border-stone-800">
                <Phone className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-stone-500">DIRECT LINE</div>
                  <a href={`tel:${phone}`} className="text-white font-semibold hover:underline">{phone}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-[#16161A] border border-stone-800">
                <MapPin className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-stone-500">ASPEN HIGHLANDS</div>
                  <div className="text-white font-semibold">{address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl border border-stone-800 bg-[#16161A] space-y-4 shadow-xl">
            <h3 className="text-xl font-bold font-serif text-white">Table & Villa Reservation</h3>
            <form className="space-y-4 text-xs font-sans" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Guest Name</label>
                <input type="text" placeholder="e.g. Lord Sterling" className="w-full px-4 py-3 rounded-xl border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Email Address</label>
                <input type="email" placeholder="e.g. sterling@aspen.com" className="w-full px-4 py-3 rounded-xl border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-stone-300 font-semibold mb-1">Reservation Request</label>
                <textarea rows={3} placeholder="Party size, preferred date, tasting menu or suite stay..." className="w-full px-4 py-3 rounded-xl border border-stone-800 bg-stone-900 text-white focus:outline-none focus:border-red-500" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white bg-red-800 hover:bg-red-700 transition-colors">
                Request Table & Suite Booking
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
