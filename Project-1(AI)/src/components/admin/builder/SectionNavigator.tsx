"use client";

import React from 'react';
import {
  Palette,
  Sparkles,
  Info,
  PhoneCall,
  Briefcase,
  Images,
  MessageSquareQuote,
  Share2,
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw,
} from 'lucide-react';

export type SectionType =
  | 'theme'
  | 'design'
  | 'seo'
  | 'hero'
  | 'about'
  | 'services'
  | 'gallery'
  | 'testimonials'
  | 'contact'
  | 'social';

interface SectionItem {
  id: SectionType;
  label: string;
  icon: any;
  status: 'completed' | 'configured' | 'optional';
  isVisiblyEnabled: boolean;
}

interface SectionNavigatorProps {
  sections: SectionItem[];
  activeSection: SectionType;
  onSelectSection: (sec: SectionType) => void;
  onToggleVisibility: (sec: SectionType) => void;
  onResetAll: () => void;
  isDirty: boolean;
}

export function SectionNavigator({
  sections,
  activeSection,
  onSelectSection,
  onToggleVisibility,
  onResetAll,
  isDirty,
}: SectionNavigatorProps) {
  return (
    <aside className="w-52 sm:w-56 bg-[#0B0F17] border-r border-slate-800 shrink-0 flex flex-col min-h-0 z-20 font-sans">
      {/* Header */}
      <div className="p-3 border-b border-slate-800 bg-[#0F172A] flex items-center justify-between">
        <div>
          <h2 className="text-[11px] font-black uppercase tracking-wider text-[#FA8373]">Website Sections</h2>
          <p className="text-[10px] text-slate-400 mt-0.5">Select to customize</p>
        </div>
        {isDirty && (
          <button
            onClick={onResetAll}
            className="p-1 rounded-lg text-slate-400 hover:text-orange-400 hover:bg-slate-800 transition-colors"
            title="Reset All Changes to Saved Database State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 min-h-0 overflow-y-auto p-2 space-y-1">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          const isEnabled = sec.isVisiblyEnabled;

          return (
            <div
              key={sec.id}
              className={`group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                isActive
                  ? 'bg-[#1E293B] text-[#FA8373] shadow-md border-[#FA8373]/50 shadow-rose-950/20'
                  : isEnabled
                  ? 'text-slate-300 hover:bg-[#1E293B]/70 hover:text-white border-transparent'
                  : 'text-slate-500 bg-slate-900/50 border-slate-900 line-through'
              }`}
            >
              {/* Select Button */}
              <button
                type="button"
                onClick={() => onSelectSection(sec.id)}
                className="flex-1 flex items-center space-x-2 truncate text-left"
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#FA8373]' : isEnabled ? 'text-slate-400' : 'text-slate-600'}`} />
                <span className="truncate text-[11px]">{sec.label}</span>
              </button>

              {/* Action Badges & Visibility Toggle */}
              <div className="flex items-center space-x-1 shrink-0 ml-1">
                {sec.status === 'completed' && isEnabled && (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                )}

                {/* Section Visibility Toggle */}
                {sec.id !== 'theme' && sec.id !== 'design' && sec.id !== 'seo' && sec.id !== 'hero' && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleVisibility(sec.id);
                    }}
                    className={`p-0.5 rounded transition-colors ${
                      isEnabled
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                        : 'text-rose-400 bg-rose-950/50 hover:bg-rose-900/60'
                    }`}
                    title={isEnabled ? 'Hide Section from Preview' : 'Show Section in Preview'}
                  >
                    {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
