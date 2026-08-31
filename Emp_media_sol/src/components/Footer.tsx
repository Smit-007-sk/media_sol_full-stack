"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/services" },
  { name: "OUR WORK", href: "/work" },
  { name: "WHY US", href: "/why-us" },
  { name: "FREE OFFER", href: "/offer" },
  { name: "GET FREE WEBSITE", href: "/#claim-website" },
];

const socialLinks = [
  { name: "INSTAGRAM", href: "https://instagram.com" },
  { name: "LINKEDIN", href: "https://linkedin.com" },
  { name: "FACEBOOK", href: "https://facebook.com" },
  { name: "EMAIL", href: "mailto:info@emperormediasolutions.com" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#050709] text-white pt-20 pb-12 overflow-hidden border-t border-[#12161F]">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        {/* Top Grid: Left Headline & CTA + Right Nav & Social Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-20">
          {/* Left Column: Headline, Button, New Business Email */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              {/* Headline */}
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-8">
                Design it once,
                <br />
                Design it right.
              </h2>

              {/* White Action Button */}
              <Link
                href="#claim-website"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#050709] font-bold text-xs sm:text-sm tracking-wider px-8 py-3.5 rounded-md transition-all duration-300 shadow-lg mb-12"
              >
                <span>Lets Talk</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* New Business Email */}
              <div className="flex flex-col mt-4">
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">
                  NEW BUSINESS:
                </span>
                <a
                  href="mailto:info@emperormediasolutions.com"
                  className="text-sm sm:text-base font-bold text-white hover:text-[#C09A5B] transition-colors"
                >
                  info@emperormediasolutions.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Nav Links, Socials, Address & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-8"
          >
            {/* Sub-Column 1: Navigation Links + Address */}
            <div className="flex flex-col justify-between h-full gap-8">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs sm:text-sm font-bold tracking-widest text-gray-200 hover:text-[#C09A5B] transition-colors w-fit"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Location Address */}
              <div className="text-[11px] text-gray-400 leading-relaxed font-sans pt-4 border-t border-[#181D28]">
                <p>202, Shiltiratna Complex, Panchvati,</p>
                <p>Navrangpura, Ahmedabad - 380009,</p>
                <p>Gujarat, India</p>
              </div>
            </div>

            {/* Sub-Column 2: Social Links + Legal */}
            <div className="flex flex-col justify-between h-full gap-8">
              <div className="flex flex-col gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-bold tracking-widest text-gray-200 hover:text-[#C09A5B] transition-colors flex items-center gap-1.5 w-fit"
                  >
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex flex-col gap-1.5 text-[11px] text-gray-400 font-sans pt-4 border-t border-[#181D28]">
                <Link
                  href="#terms"
                  className="hover:text-white transition-colors w-fit"
                >
                  Terms &amp; Conditions
                </Link>
                <Link
                  href="#privacy"
                  className="hover:text-white transition-colors w-fit"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Width Giant Watermark Branding */}
      <div className="w-full border-t border-[#151923] pt-6 sm:pt-8 text-center overflow-hidden leading-none">
        <h1 className="text-[17vw] sm:text-[17.5vw] font-black tracking-tighter text-white leading-none select-none uppercase font-sans w-full block scale-y-105">
          EMPEROR
        </h1>
      </div>
    </footer>
  );
}
