"use client";

import { Monitor, Zap, Smartphone, ArrowRight, Play } from "lucide-react";
import DeviceShowcase from "./DeviceShowcase";

interface HeroProps {
  onOpenQuote: () => void;
  onOpenDemo: () => void;
}

export default function Hero({ onOpenQuote, onOpenDemo }: HeroProps) {
  return (
    <section className="relative pt-6 sm:pt-10 pb-16 lg:pb-24 overflow-hidden hero-glow" style={{ fontFamily: 'var(--theme-body-font, inherit)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Top Tagline Subtitle */}
            <div className="inline-block">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#B88E44] uppercase font-sans" style={{ color: 'var(--theme-secondary, #B88E44)' }}>
                SMART IDEAS. POWERFUL SOLUTIONS.
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-medium leading-[1.1] text-[#1F2421] tracking-tight" style={{ fontFamily: 'var(--theme-heading-font, inherit)' }}>
              Build a Modern <br />
              Website for Your <br />
              <span className="font-serif italic font-normal text-[#B88E44] swoosh-underline inline-block pb-1" style={{ color: 'var(--theme-primary, #B88E44)' }}>
                Business
              </span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-base sm:text-lg text-[#4A524D] font-normal leading-relaxed max-w-lg">
              Custom, responsive and high-performing websites that turn visitors into customers.
            </p>

            {/* Feature Tag Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#1F2421] shadow-sm hover:scale-105 transition-transform">
                <Monitor className="w-3.5 h-3.5 text-[#0F382C]" style={{ color: 'var(--theme-primary, #0F382C)' }} />
                <span>Modern Design</span>
              </div>
              <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#1F2421] shadow-sm hover:scale-105 transition-transform">
                <Zap className="w-3.5 h-3.5 text-[#0F382C]" style={{ color: 'var(--theme-primary, #0F382C)' }} />
                <span>Fast Performance</span>
              </div>
              <div className="glass-pill px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-[#1F2421] shadow-sm hover:scale-105 transition-transform">
                <Smartphone className="w-3.5 h-3.5 text-[#0F382C]" style={{ color: 'var(--theme-primary, #0F382C)' }} />
                <span>Mobile Friendly</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenQuote}
                style={{ backgroundColor: 'var(--theme-primary, #0F382C)', color: '#ffffff' }}
                className="group flex items-center gap-2.5 bg-[#0F382C] text-white px-7 py-3.5 rounded-xl font-medium text-sm sm:text-base hover:opacity-90 shadow-lg shadow-[#0F382C]/15 hover:shadow-xl transition-all active:scale-95"
              >
                <span>Get a Free Website</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenDemo}
                className="group flex items-center gap-3 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[#1F2421] hover:text-[#0F382C] transition-colors"
              >
                <div className="w-9 h-9 rounded-full border-2 border-[#1F2421] group-hover:border-[#0F382C] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-current ml-0.5 text-[#1F2421] group-hover:text-[#0F382C]" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Device Showcase */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            <DeviceShowcase />
          </div>

        </div>
      </div>
    </section>
  );
}
