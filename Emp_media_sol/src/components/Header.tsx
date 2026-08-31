"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Crown } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/", id: "hero" },
  { name: "Services", href: "/services", id: "services-page" },
  { name: "Our Work", href: "/work", id: "work-page" },
  { name: "Why Us", href: "/why-us", id: "why-us-page" },
  { name: "Free Offer", href: "/offer", id: "offer-page" },
  { name: "Get Website", href: "/#claim-website", id: "claim-website" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sectionIds = ["hero", "offer", "why-us", "services", "solutions", "claim-website"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header className="w-full pt-6 pb-4 px-6 md:px-12 lg:px-16 xl:px-20 flex items-center justify-between z-50 relative">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-3 group">
        <img
          src="/emperor-logo.png"
          alt="Emperor Media Solutions Logo"
          className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] contrast-110 group-hover:scale-105 transition-transform duration-300"
        />
        <div className="flex flex-col items-start">
          <span className="font-serif font-bold text-2xl tracking-wide text-[#1C1E1B] leading-none">
            EMPEROR
          </span>
          <span className="text-[9px] font-sans font-semibold tracking-[0.28em] text-[#4A4E4B] uppercase mt-1">
            MEDIA SOLUTIONS
          </span>
        </div>
      </Link>

      {/* Desktop Navigation Menu */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        {navItems.map((item) => {
          const isPageActive =
            item.href === pathname ||
            (pathname === "/" && item.href.startsWith("/#") && activeSection === item.id);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors relative py-1 ${
                isPageActive
                  ? "text-[#1C1E1B] font-bold"
                  : "text-[#555A56] hover:text-[#1C1E1B]"
              }`}
            >
              {item.name}
              {isPageActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C09A5B] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Top Right CTA Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/#claim-website"
          className="hidden sm:inline-flex items-center gap-2.5 bg-[#072B1E] hover:bg-[#0C3828] text-white text-xs lg:text-sm font-semibold tracking-wider px-5 lg:px-6 py-3 rounded-md transition-all duration-300 shadow-sm hover:shadow-md hover:translate-y-[-1px]"
        >
          <span>GET A FREE WEBSITE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1C1E1B] hover:text-[#A57D3F] focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-6 right-6 bg-[#FAF8F4] border border-[#E2DDD3] rounded-2xl p-6 shadow-xl flex flex-col gap-4 md:hidden z-50 animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base py-2 border-b border-[#EBE6DC] font-medium text-[#1C1E1B] hover:text-[#C09A5B]"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#claim-website"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-[#072B1E] text-white text-sm font-semibold py-3 rounded-lg mt-2"
          >
            <span>GET A FREE WEBSITE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
