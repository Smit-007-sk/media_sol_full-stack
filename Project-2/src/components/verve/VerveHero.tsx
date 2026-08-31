"use client";

import { ArrowUpRight } from "lucide-react";

export default function VerveHero() {
  return (
    <section className="relative bg-[#181717] text-[#EAE5D9] border-b border-[#2D2A28] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* RADICAL 50/50 VERTICAL MAGAZINE SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[85vh]">
          
          {/* Left Column (50% Sticky Vertical Headline & Manifesto) */}
          <div className="lg:col-span-6 py-12 lg:py-20 lg:pr-12 border-b lg:border-b-0 lg:border-r border-[#332F2D] flex flex-col justify-between text-left">
            
            <div className="space-y-6">
              <div className="font-mono text-xs text-[#D96B43] tracking-[0.3em] uppercase font-bold">
                STUDIO VERVE // MAGAZINE ISSUE N° 42
              </div>

              <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal leading-[0.9] tracking-tight">
                RAW <br />
                <span className="italic text-[#D96B43] font-light">SCULPTURAL</span> <br />
                MANIFESTO
              </h1>

              <p className="text-base text-[#BDB5A6] font-sans max-w-md leading-relaxed pt-4">
                We synthesize architecture, high-fashion campaign art direction, and digital brand identities into timeless spatial experiences.
              </p>
            </div>

            <div className="pt-10 flex items-center gap-6">
              <a
                href="#services"
                className="inline-flex items-center gap-3 bg-[#D96B43] text-white px-8 py-4 font-mono text-xs uppercase font-bold tracking-widest hover:bg-[#C05A34] transition-all"
              >
                <span>EXPLORE DISCIPLINE</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="font-mono text-xs text-[#8A8174] uppercase tracking-wider">
                PARIS • MILAN • TOKYO
              </span>
            </div>

          </div>

          {/* Right Column (50% Oversized Editorial Spreads) */}
          <div className="lg:col-span-6 py-12 lg:py-20 lg:pl-12 space-y-8 flex flex-col justify-center">
            
            {/* Visual Spread 1 */}
            <div className="relative h-72 sm:h-96 bg-gradient-to-tr from-[#242120] via-[#3D3734] to-[#1C1A19] border border-[#332F2D] p-8 flex flex-col justify-between group overflow-hidden">
              <span className="font-mono text-xs text-[#D96B43] font-bold">SPREAD 01 // EXHIBITION</span>
              <h3 className="font-serif text-4xl text-[#EAE5D9] group-hover:text-white transition-colors">
                The Obsidian Pavilion
              </h3>
              <div className="font-mono text-xs text-[#A89F91]">MILAN DESIGN WEEK 2026</div>
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#D96B43]/15 rounded-full blur-2xl group-hover:bg-[#D96B43]/30 transition-all pointer-events-none" />
            </div>

            {/* Visual Spread 2 */}
            <div className="relative h-60 bg-[#252220] border border-[#332F2D] p-8 flex flex-col justify-between group">
              <span className="font-mono text-xs text-[#D96B43] font-bold">SPREAD 02 // CAMPAIGN</span>
              <h3 className="font-serif text-3xl text-[#EAE5D9] group-hover:text-white transition-colors">
                Kuro Couture Visual Identity
              </h3>
              <div className="font-mono text-xs text-[#A89F91]">PARIS FASHION WEEK</div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
