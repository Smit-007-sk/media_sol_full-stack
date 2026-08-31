"use client";

import { Star, Heart } from "lucide-react";

export default function VitalisTestimonials() {
  const reviews = [
    {
      quote: "Being able to speak with a cardiologist in under 4 minutes from home was a lifesaver. The digital e-prescription was sent instantly to my pharmacy.",
      author: "Jennifer Sterling",
      condition: "Cardiology Patient",
      rating: 5,
    },
    {
      quote: "The Health Score Calculator and AI symptom matcher directed me to the exact specialist I needed. Seamless and compassionate care.",
      author: "Robert Miller",
      condition: "Neurology Patient",
      rating: 5,
    },
    {
      quote: "Top-tier pediatric care for my kids without having to wait in crowded hospital waiting rooms. Vitalis has changed how our family manages health.",
      author: "Amanda Cruz",
      condition: "Family Telehealth User",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059669] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            PATIENT REVIEWS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942]">
            Loved by 50,000+ Patients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-[#F8FAFC] rounded-3xl p-7 border border-slate-200 text-left space-y-4 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: rev.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                &ldquo;{rev.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-slate-200">
                <div className="font-bold text-sm text-[#0F172A]">{rev.author}</div>
                <div className="text-xs text-[#059669] font-semibold">{rev.condition}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
