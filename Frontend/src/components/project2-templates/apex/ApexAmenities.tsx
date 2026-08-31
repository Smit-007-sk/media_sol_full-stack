"use client";

import { Key, Shield, Anchor, Plane, Wine, Sparkles } from "lucide-react";

export default function ApexAmenities() {
  const amenities = [
    { icon: Key, title: "Private VIP Concierge", desc: "Dedicated 24/7 estate manager and security staff." },
    { icon: Anchor, title: "Deep-Water Docking", desc: "Private yacht mooring accommodating superyachts up to 200ft." },
    { icon: Plane, title: "Helipad Access", desc: "FAA-certified private helipad with direct airport transfers." },
    { icon: Wine, title: "Sommelier Cellars", desc: "Temperature-controlled subterranean cellars for 5,000+ bottles." },
  ];

  return (
    <section className="py-20 bg-[#080D17] text-white border-b border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-800/60">
            VIP ESTATE SERVICES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Unrivaled Luxury Amenities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-[#111A29] p-7 rounded-3xl border border-slate-800 text-left space-y-3 hover:border-amber-500 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-800/60 text-[#F59E0B] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
