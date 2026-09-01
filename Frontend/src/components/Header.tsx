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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (pathname !== "/") return;
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

  const handleClaimClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      const el = document.getElementById('claim-website') || document.getElementById('claim-form') || document.getElementById('lead-form');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', '#claim-website');
      } else {
        window.location.href = '/#claim-website';
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-16 xl:px-20 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F4]/90 backdrop-blur-md shadow-sm border-b border-[#E2DDD3]"
          : "bg-transparent"
      }`}
    >
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

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 bg-[#EDE8DE]/60 border border-[#DCD5C5] px-6 py-2 rounded-full backdrop-blur-sm">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => {
                if (item.href.includes('#claim-website')) {
                  handleClaimClick(e);
                }
              }}
              className={`text-xs font-semibold tracking-wider transition-all duration-200 relative py-1 ${
                isActive
                  ? "text-[#072B1E] font-bold"
                  : "text-[#474B48] hover:text-[#1C1E1B]"
              }`}
            >
              {item.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C09A5B] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Top Right CTA Button */}
      <div className="flex items-center gap-4">
        <Link
          href="/#claim-website"
          onClick={handleClaimClick}
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
              onClick={(e) => {
                if (item.href.includes('#claim-website')) {
                  handleClaimClick(e);
                } else {
                  setMobileMenuOpen(false);
                }
              }}
              className="text-base py-2 border-b border-[#EBE6DC] font-medium text-[#1C1E1B] hover:text-[#C09A5B]"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#claim-website"
            onClick={handleClaimClick}
            className="flex items-center justify-center gap-2 bg-[#072B1E] text-white text-sm font-semibold py-3 rounded-lg mt-2 cursor-pointer"
          >
            <span>GET A FREE WEBSITE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
