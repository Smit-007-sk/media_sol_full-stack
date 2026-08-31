"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight, Menu, X, Crown } from "lucide-react";

interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FBF8F1]/90 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F3ECE0] border border-[#E5DACB] group-hover:scale-105 transition-transform">
            <Crown className="w-6 h-6 text-[#B88E44]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1F2421]">
              EMPEROR
            </span>
            <span className="text-[9px] font-semibold tracking-[0.2em] text-[#B88E44] uppercase -mt-1">
              SMART SOLUTIONS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-[#4A524D]">
          {/* Home Link (Active) */}
          <a
            href="#home"
            className="relative text-[#1F2421] font-semibold py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#B88E44]"
          >
            Home
          </a>

          <a href="#about" className="hover:text-[#1F2421] transition-colors py-1">
            About
          </a>

          {/* Services with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="flex items-center gap-1 hover:text-[#1F2421] transition-colors py-1"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180 text-[#B88E44]" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-[#E5DACB] p-2 mt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                <a
                  href="#services"
                  className="block px-4 py-2.5 text-sm rounded-lg hover:bg-[#FBF8F1] hover:text-[#B88E44] transition-colors"
                >
                  <div className="font-semibold">Web Development</div>
                  <div className="text-xs text-gray-500">Custom modern responsive websites</div>
                </a>
                <a
                  href="#services"
                  className="block px-4 py-2.5 text-sm rounded-lg hover:bg-[#FBF8F1] hover:text-[#B88E44] transition-colors"
                >
                  <div className="font-semibold">UI/UX & Mobile Apps</div>
                  <div className="text-xs text-gray-500">User-centric interfaces & app dev</div>
                </a>
                <a
                  href="#services"
                  className="block px-4 py-2.5 text-sm rounded-lg hover:bg-[#FBF8F1] hover:text-[#B88E44] transition-colors"
                >
                  <div className="font-semibold">Digital Marketing & SEO</div>
                  <div className="text-xs text-gray-500">Scale audience reach & search ranking</div>
                </a>
              </div>
            )}
          </div>

          <a href="#portfolio" className="hover:text-[#1F2421] transition-colors py-1">
            Portfolio
          </a>

          <a href="#blog" className="hover:text-[#1F2421] transition-colors py-1">
            Blog
          </a>

          <a href="#contact" className="hover:text-[#1F2421] transition-colors py-1">
            Contact
          </a>
        </nav>

        {/* Header Action Button */}
        <div className="hidden sm:flex items-center">
          <button
            onClick={onOpenQuote}
            className="group flex items-center gap-2 bg-[#0F382C] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#08291F] hover:shadow-lg hover:shadow-[#0F382C]/20 transition-all active:scale-95"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#1F2421] hover:bg-[#F3ECE0] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF8F1] border-b border-[#E5DACB] px-4 pt-2 pb-6 space-y-3">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-semibold text-[#1F2421] bg-[#F3ECE0]"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-[#4A524D] hover:bg-[#F3ECE0]"
          >
            About
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-[#4A524D] hover:bg-[#F3ECE0]"
          >
            Services
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-[#4A524D] hover:bg-[#F3ECE0]"
          >
            Portfolio
          </a>
          <a
            href="#blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-[#4A524D] hover:bg-[#F3ECE0]"
          >
            Blog
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md font-medium text-[#4A524D] hover:bg-[#F3ECE0]"
          >
            Contact
          </a>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0F382C] text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-[#08291F] transition-all"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
