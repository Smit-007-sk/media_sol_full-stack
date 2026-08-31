"use client";

import React from 'react';
import { Contact } from '@/api/content';
import { Mail, Phone, MapPin } from 'lucide-react';

interface TerraContactProps {
  data?: Contact | null;
  design?: any;
  theme?: any;
}

export function TerraContact({ data }: TerraContactProps) {
  const email = data?.email || 'inquiries@terra-estate.com';
  const phone = data?.phone || '+1 (888) 550-TERRA';
  const address = data?.address || '200 Coastal Highway, Suite 900, Malibu, CA 90265';

  return (
    <section id="contact" className="py-20 bg-white border-t border-stone-200/50 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#B85B35]">
              PRIVATE INQUIRY
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif">Schedule a Private Viewing</h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Connect with our principal advisors for confidential access to our off-market estate portfolio.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <Mail className="w-5 h-5 text-[#B85B35]" />
                <div>
                  <div className="text-xs text-stone-500 font-mono">Email Inquiries</div>
                  <a href={`mailto:${email}`} className="text-sm font-semibold text-stone-900 hover:underline">{email}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <Phone className="w-5 h-5 text-[#B85B35]" />
                <div>
                  <div className="text-xs text-stone-500 font-mono">Direct Line</div>
                  <a href={`tel:${phone}`} className="text-sm font-semibold text-stone-900 hover:underline">{phone}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
                <MapPin className="w-5 h-5 text-[#B85B35]" />
                <div>
                  <div className="text-xs text-stone-500 font-mono">Malibu Office</div>
                  <div className="text-sm font-semibold text-stone-900">{address}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-3xl border border-stone-300 bg-[#F5EFE6] space-y-4 shadow-xl">
            <h3 className="text-xl font-bold font-serif text-stone-900">Private Viewing Request</h3>
            <form className="space-y-4 text-xs" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Full Name</label>
                <input type="text" placeholder="e.g. Harrison Vance" className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B85B35]" />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Email Address</label>
                <input type="email" placeholder="e.g. harrison@vance.com" className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B85B35]" />
              </div>
              <div>
                <label className="block text-stone-700 font-semibold mb-1">Property Requirements</label>
                <textarea rows={3} placeholder="Desired location, square footage, amenities..." className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#B85B35]" />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl font-bold text-white shadow-md bg-[#B85B35] hover:opacity-90 transition-opacity">
                Request Private Portfolio
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
