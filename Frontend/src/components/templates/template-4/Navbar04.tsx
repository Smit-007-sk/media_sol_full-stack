"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandingData, ContactData } from "@/types/template";
import { Button } from "@/components/common/Button";
import { Menu, X, Building, Phone, Mail, Clock } from "lucide-react";

export interface Navbar04Props {
  branding: BrandingData;
  contact: ContactData;
}

export function Navbar04({ branding, contact }: Navbar04Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F172A]/95 backdrop-blur-md text-white border-b border-[#1E293B] shadow-md">
      {/* Top Corporate Strip */}
      <div className="bg-[#090D16] border-b border-[#1E293B] py-2 text-xs font-sans text-slate-300 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{contact.phone}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{contact.email}</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{contact.hours}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Left */}
        <Link href="#top" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded bg-[#1D4ED8] text-white flex items-center justify-center font-bold shadow-md">
            <Building className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-bold tracking-widest text-white group-hover:text-[#38BDF8] transition-colors">
              {branding.logoText}
            </span>
            <span className="text-[9px] uppercase tracking-widest font-sans text-[#38BDF8] font-semibold">
              ENTERPRISE ADVISORY
            </span>
          </div>
        </Link>

        {/* Desktop Links Center */}
        <nav className="hidden lg:flex items-center space-x-8 font-sans text-sm font-medium text-slate-200">
          <Link href="#metrics" className="hover:text-[#38BDF8] transition-colors">
            Capabilities
          </Link>
          <Link href="#services" className="hover:text-[#38BDF8] transition-colors">
            Solutions
          </Link>
          <Link href="#cases" className="hover:text-[#38BDF8] transition-colors">
            Case Studies
          </Link>
          <Link href="#contact" className="hover:text-[#38BDF8] transition-colors">
            Contact
          </Link>
        </nav>

        {/* CTA Right */}
        <div className="hidden lg:block">
          <Button href="#contact" variant="primary" size="sm" className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white">
            Request Advisory Briefing
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded text-[#38BDF8] focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-[#1E293B] px-6 py-6 space-y-4 font-sans text-sm text-slate-200">
          <Link
            href="#metrics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#1E293B] hover:text-[#38BDF8]"
          >
            Capabilities
          </Link>
          <Link
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#1E293B] hover:text-[#38BDF8]"
          >
            Solutions
          </Link>
          <Link
            href="#cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b border-[#1E293B] hover:text-[#38BDF8]"
          >
            Case Studies
          </Link>

          <div className="pt-2">
            <Button href="#contact" variant="primary" size="md" className="w-full bg-[#1D4ED8] text-white">
              Request Advisory Briefing
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
