"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function VitalisFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast can I speak with a certified doctor?",
      a: "Our virtual urgent care wait time averages under 4 minutes, 24 hours a day, 7 days a week.",
    },
    {
      q: "Are video consultations covered by health insurance?",
      a: "Yes! Vitalis partners with over 50 major insurance providers including Aetna, BlueCross, Cigna, and UnitedHealthcare.",
    },
    {
      q: "How do digital prescriptions work?",
      a: "Following your video visit, your doctor transmits your e-prescription directly to your chosen local pharmacy or home delivery system.",
    },
    {
      q: "Is my personal medical data encrypted?",
      a: "Absolutely. Vitalis utilizes zero-knowledge HIPAA-compliant SSL encryption for all patient records and video calls.",
    },
  ];

  return (
    <section className="py-20 bg-[#F0FDFA] text-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488] bg-teal-100 px-3.5 py-1 rounded-full">
            PATIENT HELP CENTER
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4 text-left font-sans">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-teal-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 flex items-center justify-between font-bold text-sm text-[#0F172A] hover:text-[#0284C7] text-left focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#0284C7] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
