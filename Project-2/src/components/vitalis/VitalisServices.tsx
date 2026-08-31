"use client";

import { ShieldCheck, Stethoscope, Pill, Dna, Activity, HeartPulse } from "lucide-react";

export default function VitalisServices() {
  const services = [
    {
      icon: Stethoscope,
      title: "Virtual Telehealth 24/7",
      desc: "Connect with board-certified doctors via high-definition encrypted video calls anytime, anywhere.",
    },
    {
      icon: Pill,
      title: "Digital E-Prescriptions",
      desc: "Instant prescription renewals sent directly to your local pharmacy or home delivery network.",
    },
    {
      icon: Dna,
      title: "Genomic Risk Screening",
      desc: "Advanced DNA sequencing analysis to identify potential health risks before symptoms manifest.",
    },
    {
      icon: Activity,
      title: "Remote Patient Monitoring",
      desc: "Continuous bio-metric tracking with wearable sensors sync for real-time vitals alerts.",
    },
    {
      icon: HeartPulse,
      title: "Cardiovascular Health",
      desc: "Comprehensive ECG reviews, blood pressure management, and preventative heart care plans.",
    },
    {
      icon: ShieldCheck,
      title: "Zero-Knowledge Encryption",
      desc: "Your medical history and lab reports are locked with enterprise-grade HIPAA compliance.",
    },
  ];

  return (
    <section className="py-20 bg-[#F0FDFA] text-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0D9488] bg-teal-100 px-3.5 py-1 rounded-full">
            CLINICAL EXCELLENCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F2942]">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-base text-[#475569]">
            Engineered to streamline patient care, diagnostics, and long-term wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 text-left border border-teal-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#059669] flex items-center justify-center mb-6 group-hover:bg-[#059669] group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-xl text-[#0F172A] mb-2 group-hover:text-[#0284C7] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
