"use client";

import React from 'react';
import { Contact } from '@/api/content';
import { Mail, Phone, MapPin } from 'lucide-react';

interface HorizonContactProps {
  data?: Contact | null;
  design?: any;
  theme?: any;
}

export function HorizonContact({ data }: HorizonContactProps) {
  const email = data?.email || 'private@horizon-finance.com';
  const phone = data?.phone || '+1 (212) 555-8000';
  const address = data?.address || '200 Park Avenue, 45th Floor, New York, NY 10166';

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-200 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#1D4ED8]">
              PRIVATE CONSULTATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans">Schedule an Executive Briefing</h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Connect with our senior partner group to evaluate multi-family office setup, liquidity structuring, or global wealth advisory.
            </p>

            <div className="space-y-4 pt-4 font-sans text-xs">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-[#1D4ED8]" />
                <div>
                  <div className="text-slate-400 text-[11px]">PARTNER EMAIL</div>
                  <a href={`mailto:${email}`} className="text-slate-900 font-semibold hover:underline">{email}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-[#1D4ED8]" />
                <div>
                  <div className="text-slate-400 text-[11px]">DIRECT LINE</div>
                  <a href={`tel:${phone}`} className="text-slate-900 font-semibold hover:underline">{phone}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-[#1D4ED8]" />
                <div>
                  <div className="text-slate-400 text-[11px]">NEW YORK HQ</div>
                  <div className="text-slate-900 font-semibold">{address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-2xl border border-slate-200 bg-[#F8FAFC] space-y-4 shadow-sm">
            <h3 className="text-xl font-bold font-sans text-slate-900">Institutional Intake Form</h3>
            <form className="space-y-4 text-xs font-sans" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                <input type="text" placeholder="e.g. Richard Vance" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Corporate Email</label>
                <input type="email" placeholder="e.g. r.vance@familyoffice.com" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]" />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Advisory Mandate</label>
                <textarea rows={3} placeholder="Summarize your wealth management or corporate treasury requirements..." className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white bg-[#1D4ED8] hover:bg-blue-700 transition-colors">
                Submit Executive Intake
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
