"use client";

import React from 'react';
import { Testimonial } from '@/api/content';
import { Quote, Star } from 'lucide-react';

interface TerraTestimonialsProps {
  items?: Testimonial[];
  design?: any;
  theme?: any;
}

export function TerraTestimonials({ items }: TerraTestimonialsProps) {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 't1',
      websiteId: '',
      name: 'Alexander DuPont',
      role: 'Estate Investor',
      company: 'DuPont Holdings',
      content: 'Terra Estate facilitated the acquisition of our Malibu sanctuary with absolute confidentiality and architectural expertise.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const list = items && items.length > 0 ? items.filter((t) => t.isActive) : defaultTestimonials;

  return (
    <section id="testimonials" className="py-20" style={{ backgroundColor: 'var(--theme-background, #F5EFE6)', color: 'var(--theme-text, #231B18)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B85B35]">
            CLIENT REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
            Endorsements from Private Buyers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item, idx) => (
            <div key={item.id || idx} className="p-8 rounded-3xl border border-stone-300 bg-white shadow-sm space-y-6 relative">
              <Quote className="w-8 h-8 opacity-20 text-[#B85B35] absolute top-6 right-6" />
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                ))}
              </div>
              <p className="text-sm sm:text-base italic leading-relaxed text-stone-700 font-serif">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{item.name}</h4>
                  <p className="text-xs text-stone-500">{item.role} {item.company ? `• ${item.company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
