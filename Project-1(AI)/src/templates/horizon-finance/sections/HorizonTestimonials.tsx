"use client";

import React from 'react';
import { Testimonial } from '@/api/content';
import { Quote, Star } from 'lucide-react';

interface HorizonTestimonialsProps {
  items?: Testimonial[];
  design?: any;
  theme?: any;
}

export function HorizonTestimonials({ items }: HorizonTestimonialsProps) {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 't1',
      websiteId: '',
      name: 'Julian Rothschild',
      role: 'Managing Partner',
      company: 'Rothschild Capital Zurich',
      content: 'Horizon Finance provided impeccable risk management counsel during our European private equity restructuring. Their clarity and precision are unsurpassed.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const list = items && items.length > 0 ? items.filter((t) => t.isActive) : defaultTestimonials;

  return (
    <section id="testimonials" className="py-20" style={{ backgroundColor: 'var(--theme-background, #F8FAFC)', color: 'var(--theme-text, #0F172A)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#1D4ED8]">
            INVESTOR ENDORSEMENTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-sans text-slate-900">
            Trusted by Global Capital Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item, idx) => (
            <div key={item.id || idx} className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6 relative">
              <Quote className="w-8 h-8 opacity-20 text-[#1D4ED8] absolute top-6 right-6" />
              <p className="text-sm sm:text-base italic leading-relaxed text-slate-700 font-sans">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between font-sans">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                  <p className="text-xs text-slate-500">{item.role} {item.company ? `• ${item.company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
