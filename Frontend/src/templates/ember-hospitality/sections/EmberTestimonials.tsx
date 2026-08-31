"use client";

import React from 'react';
import { Testimonial } from '@/api/content';
import { Quote, Star } from 'lucide-react';

interface EmberTestimonialsProps {
  items?: Testimonial[];
  design?: any;
  theme?: any;
}

export function EmberTestimonials({ items }: EmberTestimonialsProps) {
  const defaultTestimonials: Testimonial[] = [
    {
      id: 't1',
      websiteId: '',
      name: 'Chef Marcus Vane',
      role: 'Culinary Critic',
      company: 'Gastronomy International',
      content: 'Ember delivers an unforgettable dining atmosphere. The wood-fired duck and sommelier pairing were absolute perfection.',
      sortOrder: 1,
      isActive: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

  const list = items && items.length > 0 ? items.filter((t) => t.isActive) : defaultTestimonials;

  return (
    <section id="testimonials" className="py-24 border-b border-stone-800" style={{ backgroundColor: 'var(--theme-background, #0F0F12)', color: 'var(--theme-text, #F5F5F4)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest font-mono text-red-400">
            GUEST REFLECTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
            Endorsements from Culinary Guests
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {list.map((item, idx) => (
            <div key={item.id || idx} className="p-8 rounded-3xl border border-stone-800 bg-[#16161A] shadow-sm space-y-6 relative">
              <Quote className="w-8 h-8 opacity-20 text-red-500 absolute top-6 right-6" />
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                ))}
              </div>
              <p className="text-sm sm:text-base italic leading-relaxed text-stone-300 font-serif">
                &ldquo;{item.content}&rdquo;
              </p>
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between font-mono text-xs">
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <p className="text-stone-500">{item.role} {item.company ? `• ${item.company}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
