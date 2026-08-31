"use client";

import { useState } from "react";
import { X, Crown, CheckCircle2 } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FBF8F1] rounded-2xl shadow-2xl border border-[#E5DACB] overflow-hidden p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black rounded-full hover:bg-[#F3ECE0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center space-y-4">
            <div className="w-16 h-16 bg-[#0F382C] text-white rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#1F2421]">
              Quote Request Sent!
            </h3>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Thank you for reaching out to Emperor Smart Solutions. Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#F3ECE0] border border-[#E5DACB] flex items-center justify-center">
                <Crown className="w-6 h-6 text-[#B88E44]" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1F2421]">
                  Get a Free Quote
                </h3>
                <p className="text-xs text-gray-600">
                  Transform your business with a modern website
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-1">
                  Project Type
                </label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]">
                  <option>Custom Website Redesign</option>
                  <option>E-Commerce Online Store</option>
                  <option>Mobile App & UI/UX</option>
                  <option>SEO & Growth Strategy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-1">
                  Project Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your business goals..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5DACB] bg-white focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0F382C] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#08291F] transition-all shadow-lg shadow-[#0F382C]/20"
              >
                Submit Quote Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
