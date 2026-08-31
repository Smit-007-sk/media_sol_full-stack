"use client";

import { ArrowRight, Crown } from "lucide-react";

interface CtaBannerProps {
  onOpenQuote: () => void;
}

export default function CtaBanner({ onOpenQuote }: CtaBannerProps) {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0D3328] via-[#0F382C] to-[#0A261E] text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B88E44]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B88E44]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-[#175242] border border-[#216B58] flex items-center justify-center mx-auto text-[#D8B775]">
          <Crown className="w-7 h-7" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight">
          Ready to Elevate Your Business with a <span className="italic font-normal text-[#D8B775]">Modern Website?</span>
        </h2>

        <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
          Let&apos;s turn your vision into a high-performing digital asset. Contact us today for a free design audit and quote.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenQuote}
            className="group flex items-center gap-2.5 bg-[#B88E44] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#A67C37] shadow-xl shadow-[#B88E44]/20 hover:shadow-2xl transition-all active:scale-95"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold text-base text-white border border-white/30 hover:bg-white/10 transition-colors"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
