"use client";

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import { Image as ImageIcon, Shield, Sparkles, Building2, Compass, Server } from "lucide-react";

export interface ImagePlaceholderProps {
  media?: any;
  className?: string;
  aspectRatio?: "16/9" | "4/3" | "3/4" | "1/1" | "21/9" | "auto";
  badgeText?: string;
  overlay?: boolean;
  altText?: string;
}

export function ImagePlaceholder({
  media,
  className,
  aspectRatio = "16/9",
  badgeText,
  overlay = true,
  altText,
}: ImagePlaceholderProps) {
  const [imgError, setImgError] = useState(false);

  const aspectClasses = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "1/1": "aspect-square",
    "21/9": "aspect-[21/9]",
    auto: "h-full min-h-[300px]",
  };

  // Safely extract URL if media is string or contains url property
  const imageUrl =
    typeof media === "string"
      ? media
      : media?.url || media?.src || media?.media?.url || null;

  // Safely resolve patternType & metadata with robust fallbacks
  const patternType = (typeof media === "object" && media?.patternType) || "corporate";
  const displayTitle = (typeof media === "object" && media?.title) || "Media Showcase";
  const displayBadge = (typeof media === "object" && media?.badge) || badgeText || "Media Asset";

  const getGradient = () => {
    switch (patternType) {
      case "editorial":
        return "bg-gradient-to-tr from-stone-900 via-[#5C2B16] to-[#8C3B1A]";
      case "architectural":
        return "bg-gradient-to-br from-[#0A0A0A] via-[#1F1F24] to-[#3B2C0A]";
      case "corporate-blue":
        return "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1D4ED8]";
      case "minimal":
        return "bg-gradient-to-tr from-[#1C1814] via-[#2A241C] to-[#594828]";
      case "corporate":
      default:
        return "bg-gradient-to-br from-[#042F24] via-[#075C45] to-[#18201C]";
    }
  };

  const getAccentColor = () => {
    switch (patternType) {
      case "editorial":
        return "text-[#F5EFE6]";
      case "architectural":
        return "text-[#E5B842]";
      case "corporate-blue":
        return "text-[#60A5FA]";
      case "minimal":
        return "text-[#C5A059]";
      case "corporate":
      default:
        return "text-[#C9A45C]";
    }
  };

  const getIcon = () => {
    switch (patternType) {
      case "architectural":
        return <Building2 className="w-8 h-8 text-[#E5B842]" />;
      case "editorial":
        return <Sparkles className="w-8 h-8 text-[#F5EFE6]" />;
      case "corporate-blue":
        return <Server className="w-8 h-8 text-[#60A5FA]" />;
      case "minimal":
        return <Compass className="w-8 h-8 text-[#C5A059]" />;
      case "corporate":
      default:
        return <Shield className="w-8 h-8 text-[#C9A45C]" />;
    }
  };

  // If a valid image URL is available and hasn't errored out, render actual image element
  if (imageUrl && !imgError) {
    return (
      <div
        className={cn(
          "relative overflow-hidden group select-none shadow-sm bg-stone-900 border border-stone-800/60",
          aspectClasses[aspectRatio],
          className
        )}
      >
        <img
          src={imageUrl}
          alt={altText || displayTitle || "Media Image"}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity" />
        )}
      </div>
    );
  }

  // Graceful SVG Pattern Placeholder Fallback (100% Null-Safe)
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm group select-none border shadow-card",
        patternType === "editorial" && "border-[#B85B35]/40",
        patternType === "architectural" && "border-[#E5B842]/40",
        patternType === "corporate-blue" && "border-[#3B82F6]/40",
        patternType === "minimal" && "border-[#C5A059]/40",
        patternType === "corporate" && "border-[#C9A45C]/30",
        aspectClasses[aspectRatio],
        getGradient(),
        className
      )}
    >
      {/* Background SVG Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id={`grid-${patternType}`}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className={getAccentColor()}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${patternType})`} />
        </svg>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="p-3 mb-3 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
          {getIcon()}
        </div>

        <span className={cn("text-xs uppercase tracking-[0.2em] font-sans font-medium mb-1", getAccentColor())}>
          {displayBadge}
        </span>

        <h4 className="text-sm sm:text-base font-serif text-white max-w-xs font-medium tracking-wide">
          {displayTitle}
        </h4>

        <div className="mt-3 inline-flex items-center text-[10px] uppercase tracking-widest text-stone-300 bg-black/60 px-2.5 py-1 rounded border border-white/10">
          <ImageIcon className={cn("w-3 h-3 mr-1", getAccentColor())} />
          CMS Media Slot
        </div>
      </div>

      {/* Bottom Accent Line */}
      {overlay && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      )}
    </div>
  );
}
