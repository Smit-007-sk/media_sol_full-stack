"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { Play, Film, Volume2, Maximize2 } from "lucide-react";

export interface VideoPlaceholderProps {
  media?: any;
  className?: string;
  aspectRatio?: "16/9" | "21/9" | "4/3";
  title?: string;
  description?: string;
}

export function VideoPlaceholder({
  media,
  className,
  aspectRatio = "16/9",
  title,
  description,
}: VideoPlaceholderProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const aspectClasses = {
    "16/9": "aspect-[16/9]",
    "21/9": "aspect-[21/9]",
    "4/3": "aspect-[4/3]",
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const mediaTitle = title || (typeof media === "object" && media?.title) || "Video Feature Showcase";
  const mediaBadge = (typeof media === "object" && media?.badge) || "Video Feature";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border border-emperor-gold/30 shadow-card bg-emperor-noir group select-none",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Background Poster Visual Simulation */}
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-950 via-emerald-950/80 to-zinc-900 transition-transform duration-700 group-hover:scale-105">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emperor-gold/10 via-transparent to-transparent opacity-60" />
        
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="video-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="#C9A45C" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#video-grid)" />
          </svg>
        </div>
      </div>

      {/* Simulated Active Video State when Playing */}
      {isPlaying && (
        <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full border-2 border-emperor-gold border-t-transparent animate-spin mb-4" />
          <p className="text-emperor-gold font-serif text-lg tracking-wide">
            Simulating Stream Playback...
          </p>
          <span className="text-xs text-stone-400 font-sans mt-2">
            CMS Video Slot ({mediaTitle})
          </span>
          <button
            onClick={handlePlayToggle}
            className="mt-6 px-4 py-2 bg-emperor-emerald text-white text-xs font-sans rounded uppercase tracking-wider hover:bg-emperor-emerald-dark"
          >
            Pause Preview
          </button>
        </div>
      )}

      {/* Default Overlay Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 lg:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-sans font-medium text-emperor-gold bg-emperor-noir/80 px-3 py-1 rounded-full border border-emperor-gold/30 backdrop-blur-sm">
            <Film className="w-3.5 h-3.5 mr-1.5" />
            {mediaBadge}
          </span>

          <div className="flex items-center space-x-2 text-stone-400 text-xs">
            <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 font-mono">
              HD 4K
            </span>
          </div>
        </div>

        {/* Center Big Play Button */}
        <div className="flex flex-col items-center justify-center my-auto py-4">
          <button
            onClick={handlePlayToggle}
            aria-label="Play video preview"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emperor-gold/90 text-emperor-charcoal flex items-center justify-center shadow-gold group-hover:scale-110 group-hover:bg-emperor-gold transition-all duration-300 backdrop-blur-md border-2 border-white/20"
          >
            <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-current" />
          </button>

          <span className="mt-3 text-xs uppercase tracking-widest text-emperor-white-warm font-sans font-medium opacity-90 group-hover:opacity-100">
            Click to Play Preview
          </span>
        </div>

        {/* Bottom Details */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-serif text-emperor-white-warm font-medium tracking-wide">
              {mediaTitle}
            </h3>
            {description && (
              <p className="text-xs sm:text-sm text-stone-300 font-sans mt-1 max-w-lg line-clamp-2">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-3 text-stone-400">
            <Volume2 className="w-4 h-4 hover:text-emperor-gold transition-colors" />
            <Maximize2 className="w-4 h-4 hover:text-emperor-gold transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
