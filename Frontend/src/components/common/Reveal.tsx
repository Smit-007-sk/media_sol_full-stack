"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export function Reveal({
  children,
  width = "100%",
  delay = 0.1,
  duration = 0.6,
  direction = "up",
  className,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getOffset = () => {
    switch (direction) {
      case "up":
        return { y: 30, x: 0 };
      case "down":
        return { y: -30, x: 0 };
      case "left":
        return { x: 30, y: 0 };
      case "right":
        return { x: -30, y: 0 };
      case "none":
        return { x: 0, y: 0 };
      default:
        return { y: 30, x: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      style={{ width }}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier easeOutCubic
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
