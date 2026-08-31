"use client";

import { Crown, ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A261E] text-white pt-16 pb-12 border-t border-[#134537]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#164E3F]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#134537] border border-[#1E614F] flex items-center justify-center">
                <Crown className="w-6 h-6 text-[#D8B775]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  EMPEROR
                </span>
                <span className="text-[9px] font-semibold tracking-[0.2em] text-[#D8B775] uppercase -mt-1">
                  SMART SOLUTIONS
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-300 max-w-sm leading-relaxed">
              We design and develop high-converting, modern, responsive websites and digital solutions tailored to accelerate your business success.
            </p>

            <div className="pt-2 flex items-center gap-3 text-sm text-[#D8B775]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Silicon Valley & Global Offices</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#home" className="hover:text-[#D8B775] transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-[#D8B775] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#D8B775] transition-colors">Our Services</a></li>
              <li><a href="#portfolio" className="hover:text-[#D8B775] transition-colors">Portfolio</a></li>
              <li><a href="#blog" className="hover:text-[#D8B775] transition-colors">Latest News</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-white">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#services" className="hover:text-[#D8B775] transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-[#D8B775] transition-colors">Mobile App Dev</a></li>
              <li><a href="#services" className="hover:text-[#D8B775] transition-colors">UI/UX Strategy</a></li>
              <li><a href="#services" className="hover:text-[#D8B775] transition-colors">E-Commerce</a></li>
              <li><a href="#services" className="hover:text-[#D8B775] transition-colors">SEO & Growth</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-bold text-white">Get in Touch</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D8B775]" />
                <span>info@emperorsolutions.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D8B775]" />
                <span>+1 (800) 555-0199</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs text-gray-400 mb-2">Subscribe to our newsletter</p>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="px-3 py-2 text-xs rounded-l-lg bg-[#134537] border border-[#1E614F] focus:outline-none text-white w-full"
                />
                <button className="bg-[#B88E44] hover:bg-[#A67C37] text-white px-3 py-2 rounded-r-lg text-xs font-bold transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} Emperor Smart Solutions. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
