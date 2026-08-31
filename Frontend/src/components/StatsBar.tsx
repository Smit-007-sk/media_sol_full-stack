"use client";

import React from "react";
import { Users, Smile, Rocket, Code2, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Projects Completed",
    color: "text-[#059669]",
    bg: "bg-[#059669]/10",
  },
  {
    icon: Smile,
    value: "100%",
    label: "Client Satisfaction",
    color: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
  },
  {
    icon: Rocket,
    value: "5+",
    label: "Years Experience",
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
  },
  {
    icon: Code2,
    value: "50+",
    label: "Technologies",
    color: "text-[#2563EB]",
    bg: "bg-[#2563EB]/10",
  },
  {
    icon: Headphones,
    value: "24/7",
    label: "Support & Maintenance",
    color: "text-[#EC4899]",
    bg: "bg-[#EC4899]/10",
  },
];

export default function StatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mt-6 pb-20 relative z-20"
    >
      <div className="bg-[#FAF8F4]/90 backdrop-blur-md border border-[#E6E0D5] rounded-3xl p-6 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.04)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#E6E0D5]">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`flex items-center gap-4 ${
                idx !== 0 ? "pt-4 sm:pt-0 lg:pl-6" : ""
              }`}
            >
              {/* Icon Circle */}
              <div
                className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105`}
              >
                <Icon className={`w-6 h-6 ${item.color}`} strokeWidth={1.8} />
              </div>

              {/* Text Value & Label */}
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold text-[#1C1E1B] tracking-tight leading-none">
                  {item.value}
                </span>
                <span className="text-xs text-[#6B706C] font-semibold mt-1">
                  {item.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
