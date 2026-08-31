"use client";

import { Gem, Users, Rocket, Trophy } from "lucide-react";

export default function StatsBar() {
  const stats = [
    {
      icon: Gem,
      value: "5+ Years",
      label: "of Experience",
    },
    {
      icon: Users,
      value: "250+",
      label: "Happy Clients",
    },
    {
      icon: Rocket,
      value: "120+",
      label: "Projects Delivered",
    },
    {
      icon: Trophy,
      value: "98%",
      label: "Client Satisfaction",
    },
  ];

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-20 z-20">
      <div className="glass-card rounded-2xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 items-center border border-[#E5DACB]">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-xl bg-[#F3ECE0] border border-[#E5DACB] flex items-center justify-center group-hover:bg-[#B88E44] group-hover:text-white transition-colors duration-300 shrink-0">
                <Icon className="w-6 h-6 text-[#B88E44] group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-extrabold text-xl sm:text-2xl text-[#1F2421] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#6B7260] leading-tight">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
