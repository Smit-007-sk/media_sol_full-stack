"use client";

import React from "react";
import { Reveal } from "@/components/common/Reveal";
import { Shield, Cloud, Database, Lock } from "lucide-react";

export function Metrics04() {
  const pillars = [
    {
      icon: <Cloud className="w-6 h-6 text-emperor-gold" />,
      title: "Multi-Cloud Architecture",
      detail: "Zero-trust ecosystem design with redundant failover across primary regions.",
    },
    {
      icon: <Database className="w-6 h-6 text-emperor-gold" />,
      title: "Enterprise Data Lakes",
      detail: "Real-time stream telemetry and automated data lineage management.",
    },
    {
      icon: <Shield className="w-6 h-6 text-emperor-gold" />,
      title: "Regulatory Compliance",
      detail: "Audited security architectures designed for strictly regulated markets.",
    },
    {
      icon: <Lock className="w-6 h-6 text-emperor-gold" />,
      title: "Continuous Governance",
      detail: "Senior advisory board oversight and continuous vulnerability mitigation.",
    },
  ];

  return (
    <section id="metrics" className="py-16 bg-stone-950 text-emperor-white-warm border-t border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <Reveal key={idx} delay={0.1 * (idx + 1)}>
              <div className="p-6 bg-stone-900 border border-stone-800 rounded hover:border-emperor-gold/40 transition-colors">
                <div className="p-3 bg-emperor-emerald/20 rounded w-fit mb-4">
                  {pillar.icon}
                </div>
                <h4 className="font-sans text-base font-bold text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
