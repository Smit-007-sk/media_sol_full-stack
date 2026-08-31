"use client";

import { Search, Video, Pill } from "lucide-react";

export default function VitalisTimeline() {
  const steps = [
    {
      step: "STEP 1",
      icon: Search,
      title: "Select Symptom or Specialist",
      desc: "Use our intelligent match engine to select a certified specialist within minutes.",
    },
    {
      step: "STEP 2",
      icon: Video,
      title: "Join HD Video Visit",
      desc: "Connect 1-on-1 over secure HIPAA-compliant HD video from any phone or browser.",
    },
    {
      step: "STEP 3",
      icon: Pill,
      title: "Receive Prescription & Plan",
      desc: "Digital e-prescriptions sent directly to your local pharmacy with 24/7 follow-up.",
    },
  ];

  return (
    <section className="py-20 bg-white text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] bg-sky-50 px-3.5 py-1 rounded-full border border-sky-200">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2942]">
            Your 3-Step Healthcare Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 text-left relative space-y-4">
                <span className="text-xs font-bold text-[#059669] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#0284C7] text-white flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-[#0F172A]">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
