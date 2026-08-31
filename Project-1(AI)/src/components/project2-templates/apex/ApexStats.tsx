"use client";

import { Award, Shield, Compass, Landmark } from "lucide-react";

export default function ApexStats() {
  const stats = [
    {
      icon: Landmark,
      value: "$4.8 Billion+",
      label: "Closed Luxury Sales",
    },
    {
      icon: Compass,
      value: "14 Countries",
      label: "Global Prime Presence",
    },
    {
      icon: Award,
      value: "#1 Agency",
      label: "Ultra-High Net Worth",
    },
    {
      icon: Shield,
      value: "100% Confidential",
      label: "Off-Market Advisory",
    },
  ];

  return (
    <section className="py-16 bg-[#080D17] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-[#111A29] p-6 rounded-2xl border border-slate-800 text-center space-y-2">
                <Icon className="w-8 h-8 text-amber-500 mx-auto" />
                <div className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {item.value}
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
