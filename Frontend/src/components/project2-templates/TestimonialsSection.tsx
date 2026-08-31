"use client";

import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Emperor Smart Solutions completely transformed our digital presence. Our online lead conversions surged by 220% within 60 days of launching our new website. Incredible craft and speed!",
      author: "Marcus Vance",
      role: "CEO & Founder",
      company: "Vance Logistics Group",
      initials: "MV",
      rating: 5,
    },
    {
      quote: "The visual design and attention to detail are stunning. They understood our brand identity perfectly and delivered an ultra-responsive web app that exceeded all our expectations.",
      author: "Elena Rostova",
      role: "Head of Marketing",
      company: "Aura Luxury Properties",
      initials: "ER",
      rating: 5,
    },
    {
      quote: "Working with Emperor was the best investment we made this year. The Next.js stack is lightning fast and our Google SEO scores jumped from page 4 to #1 for our top keywords.",
      author: "David Chen",
      role: "Chief Product Officer",
      company: "HealthSync Mobile",
      initials: "DC",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#FBF8F1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#B88E44]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#B88E44] uppercase font-sans">
              CLIENT TESTIMONIALS
            </span>
            <span className="w-8 h-px bg-[#B88E44]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2421]">
            What Our Clients Say
          </h2>

          <p className="text-base text-[#5C645E]">
            Real feedback from business leaders who scaled with Emperor Smart Solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-8 text-left border border-[#E5DACB] flex flex-col justify-between relative hover:border-[#B88E44]/50 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <Quote className="w-10 h-10 text-[#B88E44]/30 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#B88E44]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm text-[#3E4540] italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-[#E5DACB] flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#0F382C] text-white flex items-center justify-center font-bold text-sm shrink-0 border border-[#B88E44]/40">
                  {item.initials}
                </div>
                <div>
                  <div className="font-serif font-bold text-base text-[#1F2421]">
                    {item.author}
                  </div>
                  <div className="text-xs text-gray-600 font-medium">
                    {item.role} • <span className="text-[#B88E44] font-semibold">{item.company}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
