"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center" | "right";
  fontFamily?: "serif" | "display" | "sans";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = "left",
  fontFamily = "serif",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const fontStyles = {
    serif: "font-serif",
    display: "font-display",
    sans: "font-sans font-bold tracking-tight",
  };

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex flex-col max-w-3xl mb-12 lg:mb-16",
        alignStyles[align],
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-xs uppercase tracking-[0.25em] font-sans font-semibold mb-3 py-1 px-3 rounded-full border inline-block",
            isDark
              ? "text-emperor-gold border-emperor-gold/30 bg-emperor-gold/10"
              : "text-emperor-emerald border-emperor-emerald/20 bg-emperor-emerald/5"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight font-medium",
          fontStyles[fontFamily],
          isDark ? "text-emperor-white-warm" : "text-emperor-charcoal"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-base sm:text-lg font-serif italic mt-2",
            isDark ? "text-emperor-gold-soft" : "text-emperor-emerald"
          )}
        >
          {subtitle}
        </p>
      )}

      {description && (
        <p
          className={cn(
            "text-sm sm:text-base leading-relaxed mt-4 font-sans font-normal max-w-2xl",
            isDark ? "text-stone-300" : "text-stone-600"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
