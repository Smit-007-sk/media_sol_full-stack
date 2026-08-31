"use client";

import { X, Play, Crown } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#1A1D1A] rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#121412]">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-[#B88E44]" />
            <span className="font-serif font-bold text-white text-base">
              Emperor Smart Solutions Demo Showcase
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          
          {/* Animated Background Graphics */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0F382C]/40 via-transparent to-[#B88E44]/30 pointer-events-none" />

          {/* Interactive Play Visual */}
          <div className="relative z-10 text-center space-y-4 p-6">
            <div className="w-20 h-20 rounded-full bg-[#0F382C] border-2 border-[#B88E44] flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-8 h-8 text-white fill-current ml-1" />
            </div>
            <div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
                Interactive Showcase Video
              </h4>
              <p className="text-xs sm:text-sm text-gray-400">
                Discover how our modern website design process transforms business growth.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
