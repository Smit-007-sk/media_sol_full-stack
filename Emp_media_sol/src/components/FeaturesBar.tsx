"use client";

import React from "react";
import { Zap, Monitor, ShieldCheck, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Modern Technology",
    subtitle: "Fast. Secure. Scalable.",
  },
  {
    icon: Monitor,
    title: "Responsive Design",
    subtitle: "Perfect on every device.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    subtitle: "Your data, always protected.",
  },
  {
    icon: TrendingUp,
    title: "Results Driven",
    subtitle: "Focus on growth & ROI.",
  },
];

export default function FeaturesBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full px-6 md:px-12 lg:px-16 xl:px-20 mt-8 sm:mt-12 pb-12 relative z-20"
    >
      <div className="bg-[#FAF8F4]/90 backdrop-blur-md border border-[#E6E0D5] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#E6E0D5]">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`flex items-center gap-4 ${
                idx !== 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
              }`}
            >
              {/* Icon Circle Badge */}
              <div className="w-12 h-12 rounded-full bg-[#EFECE5] flex items-center justify-center shrink-0 text-[#1C1E1B] transition-transform duration-300 hover:scale-105">
                <Icon className="w-5 h-5 text-[#1C1E1B]" strokeWidth={1.8} />
              </div>

              {/* Text content */}
              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-bold text-[#1C1E1B] tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#6B706C] mt-0.5 font-medium">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
