"use client";

import React from 'react';
import { Contact } from '@/api/content';
import { Mail, Phone, MapPin } from 'lucide-react';

interface AuroraContactProps {
  data?: Contact | null;
  design?: any;
  theme?: any;
}

export function AuroraContact({ data, design, theme }: AuroraContactProps) {
  const contactStyle = design?.contactStyle || theme?.contactStyle || 'split';

  const email = data?.email || 'advisory@aurora-corporate.com';
  const phone = data?.phone || '+1 (800) 450-8920';
  const address = data?.address || '100 Financial Center Blvd, Suite 4200, New York, NY 10005';

  if (contactStyle === 'centered') {
    return (
      <section id="contact" className="py-20 bg-white border-t border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <span className="text-xs uppercase font-bold tracking-widest inline-block font-mono text-[#C9A45C]">
            INITIATE ADVISORY ENGAGEMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#075C45]">
            Schedule an Executive Consultation
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed font-sans max-w-xl mx-auto">
            Connect with our partner group to explore custom corporate governance, risk assessment, or capital restructuring mandates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-left">
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-2">
              <Mail className="w-6 h-6 text-[#075C45] mx-auto" />
              <div className="text-xs text-stone-500 font-mono">Email</div>
              <div className="text-xs font-bold text-stone-900">{email}</div>
            </div>
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-2">
              <Phone className="w-6 h-6 text-[#075C45] mx-auto" />
              <div className="text-xs text-stone-500 font-mono">Telephone</div>
              <div className="text-xs font-bold text-stone-900">{phone}</div>
            </div>
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/70 text-center space-y-2">
              <MapPin className="w-6 h-6 text-[#075C45] mx-auto" />
              <div className="text-xs text-stone-500 font-mono">Headquarters</div>
              <div className="text-xs font-bold text-stone-900">{address}</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest inline-block" style={{ color: 'var(--theme-secondary, #C9A45C)' }}>
              INITIATE ADVISORY ENGAGEMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif" style={{ color: 'var(--theme-primary, #075C45)' }}>
              Schedule an Executive Consultation
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              Connect with our partner group to explore custom corporate governance, risk assessment, or capital restructuring mandates.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-mono">Email Inquiries</div>
                  <a href={`mailto:${email}`} className="text-sm font-semibold text-stone-900 hover:underline">{email}</a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-mono">Direct Telephone</div>
                  <a href={`tel:${phone}`} className="text-sm font-semibold text-stone-900 hover:underline">{phone}</a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0" style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-stone-500 font-mono">Headquarters</div>
                  <div className="text-sm font-semibold text-stone-900">{address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl border shadow-xl space-y-4" style={{ backgroundColor: '#FBF8F1', borderColor: 'rgba(201, 164, 92, 0.3)' }}>
            <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--theme-primary, #075C45)' }}>Inquiry Intake Form</h3>
            <form className="space-y-4 text-xs font-sans" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
                <input type="text" placeholder="e.g. Eleanor Vance" className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#075C45]" />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Corporate Email</label>
                <input type="email" placeholder="e.g. e.vance@company.com" className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#075C45]" />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Mandate Summary</label>
                <textarea rows={3} placeholder="Briefly describe your strategic requirements..." className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#075C45]" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white shadow-md transition-opacity hover:opacity-90" style={{ backgroundColor: 'var(--theme-primary, #075C45)' }}>
                Submit Consultation Request
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
