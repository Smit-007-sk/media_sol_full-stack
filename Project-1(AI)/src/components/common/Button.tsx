"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

export interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "emerald" | "gold" | "gold-outline" | "dark" | "ghost" | "minimal";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  icon = true,
  style,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans tracking-wide transition-all duration-300 cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-emperor-gold/50";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs font-medium uppercase tracking-wider",
    md: "px-6 py-3 text-sm font-medium tracking-wide",
    lg: "px-8 py-4 text-base font-medium tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-emperor-emerald text-emperor-white-warm hover:opacity-90 shadow-subtle hover:shadow-emerald",
    emerald:
      "bg-emperor-emerald-dark text-emperor-gold-soft hover:opacity-90 shadow-emerald border border-emperor-gold/20",
    gold:
      "bg-emperor-gold text-emperor-charcoal hover:opacity-90 font-semibold shadow-gold",
    "gold-outline":
      "bg-transparent text-emperor-gold border border-emperor-gold/40 hover:border-emperor-gold hover:bg-emperor-gold/10",
    dark:
      "bg-emperor-charcoal text-emperor-ivory hover:bg-emperor-noir border border-emperor-border-dark",
    ghost:
      "bg-transparent text-emperor-charcoal hover:bg-emperor-emerald/10 border border-emperor-border",
    minimal:
      "bg-transparent text-emperor-gold p-0 hover:text-emperor-gold-soft border-b border-emperor-gold/40 hover:border-emperor-gold pb-1 rounded-none",
  };

  // Dynamic Theme CSS Custom Properties binding
  const dynamicVariantStyle: React.CSSProperties = {
    borderRadius: 'var(--design-radius, 8px)',
    ...(variant === "primary"
      ? { backgroundColor: "var(--theme-primary, #075C45)", color: "#FFFFFF" }
      : variant === "gold" || variant === "emerald"
      ? { backgroundColor: "var(--theme-secondary, #C9A45C)", color: "#000000" }
      : {}),
    ...style,
  };

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight
          className={cn(
            "ml-2 transition-transform duration-300 group-hover:translate-x-1",
            size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4"
          )}
        />
      )}
    </>
  );

  const combinedClass = cn(
    baseStyles,
    variant !== "minimal" && sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClass} style={dynamicVariantStyle}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClass} style={dynamicVariantStyle}>
      {content}
    </button>
  );
}
