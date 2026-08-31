"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Crown, Cpu, Palette, HeartPulse, Building2, ChevronUp, ChevronDown } from "lucide-react";

export default function TemplateSwitcher() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const templates = [
    {
      id: "emperor",
      name: "1. Emperor Agency",
      category: "Digital Agency",
      path: "/",
      icon: Crown,
      color: "bg-[#0F382C] text-[#D8B775]",
      activeBg: "bg-[#0F382C] text-[#D8B775] border-[#B88E44]",
    },
    {
      id: "aetheria",
      name: "2. Aetheria AI",
      category: "AI & SaaS",
      path: "/templates/aetheria",
      icon: Cpu,
      color: "bg-[#1E1B4B] text-[#818CF8]",
      activeBg: "bg-[#312E81] text-[#A5B4FC] border-[#818CF8]",
    },
    {
      id: "verve",
      name: "3. Verve Creative",
      category: "Luxury Studio",
      path: "/templates/verve",
      icon: Palette,
      color: "bg-[#181717] text-[#D96B43]",
      activeBg: "bg-[#2A2421] text-[#E57C57] border-[#D96B43]",
    },
    {
      id: "vitalis",
      name: "4. Vitalis Health",
      category: "MedTech & Health",
      path: "/templates/vitalis",
      icon: HeartPulse,
      color: "bg-[#0F766E] text-[#5EEAD4]",
      activeBg: "bg-[#115E59] text-[#99F6E4] border-[#2DD4BF]",
    },
    {
      id: "apex",
      name: "5. Apex Zenith",
      category: "Luxury Real Estate",
      path: "/templates/apex",
      icon: Building2,
      color: "bg-[#0B1320] text-[#F59E0B]",
      activeBg: "bg-[#1E293B] text-[#FBBF24] border-[#F59E0B]",
    },
  ];

  return (
    <div className="sticky top-0 z-50 w-full bg-[#0F1117]/95 backdrop-blur-md text-white border-b border-gray-800 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#B88E44] to-[#8B5CF6] flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold tracking-wider text-gray-200 uppercase">
              Template Showcase
            </span>
            <span className="text-[10px] text-gray-400">
              5 Distinct Themes & Layouts
            </span>
          </div>
        </div>

        {/* Template Selector Tabs */}
        {!collapsed && (
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
            {templates.map((tpl) => {
              const Icon = tpl.icon;
              const isActive = pathname === tpl.path || (tpl.path === "/" && pathname === "/");

              return (
                <Link
                  key={tpl.id}
                  href={tpl.path}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 border ${
                    isActive
                      ? tpl.activeBg + " shadow-md ring-2 ring-[#B88E44]/30"
                      : "bg-gray-900/60 text-gray-400 hover:text-white hover:bg-gray-800 border-gray-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tpl.name}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
          title={collapsed ? "Expand template switcher" : "Collapse template switcher"}
        >
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

      </div>
    </div>
  );
}
