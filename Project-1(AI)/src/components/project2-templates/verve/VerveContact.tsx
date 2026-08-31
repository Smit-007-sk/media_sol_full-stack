"use client";

import { ArrowUpRight } from "lucide-react";

export default function VerveContact() {
  return (
    <section className="py-24 bg-[#181717] text-[#EAE5D9] font-mono border-b border-[#2D2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
        
        <div className="border-b border-[#332F2D] pb-8 flex items-center justify-between">
          <span className="text-xs tracking-[0.3em] text-[#D96B43] uppercase font-bold">
            INITIATE DIALOGUE // INQUIRIES
          </span>
          <span className="text-xs text-[#8A8174]">GLOBAL OFFICES</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-tight text-[#EAE5D9]">
              Let&apos;s Build Something Timeless
            </h2>
            <p className="font-sans text-sm text-[#BDB5A6] leading-relaxed">
              We accept a limited number of architectural, fashion art direction, and brand system commissions each year.
            </p>

            <div className="space-y-4 text-xs text-[#A89F91]">
              <div>
                <strong className="text-white block font-mono uppercase">PARIS STUDIO</strong>
                <span>14 Rue de la Paix, 75002 Paris, France</span>
              </div>
              <div>
                <strong className="text-white block font-mono uppercase">MILAN STUDIO</strong>
                <span>Via Montenapoleone 8, 20121 Milano, Italy</span>
              </div>
              <div>
                <strong className="text-white block font-mono uppercase">TOKYO STUDIO</strong>
                <span>5-7-2 Minamiaoyama, Minato-ku, Tokyo, Japan</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#201E1D] p-8 border border-[#332F2D] space-y-6">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-mono uppercase font-bold text-[#D96B43] mb-2">NAME / ORGANIZATION *</label>
                <input type="text" required placeholder="Maison Margiela Studio" className="w-full p-3 bg-[#171615] border border-[#332F2D] text-white focus:outline-none focus:border-[#D96B43]" />
              </div>
              <div>
                <label className="block text-mono uppercase font-bold text-[#D96B43] mb-2">EMAIL ADDRESS *</label>
                <input type="email" required placeholder="contact@maison.com" className="w-full p-3 bg-[#171615] border border-[#332F2D] text-white focus:outline-none focus:border-[#D96B43]" />
              </div>
              <div>
                <label className="block text-mono uppercase font-bold text-[#D96B43] mb-2">COMMISSION SCOPE *</label>
                <textarea rows={3} placeholder="Describe project requirements..." className="w-full p-3 bg-[#171615] border border-[#332F2D] text-white focus:outline-none focus:border-[#D96B43]" />
              </div>
              <button type="submit" className="w-full bg-[#D96B43] hover:bg-[#C05A34] text-white font-mono font-bold uppercase py-4 text-xs tracking-widest flex items-center justify-center gap-2">
                <span>SEND COMMISSION INQUIRY</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
