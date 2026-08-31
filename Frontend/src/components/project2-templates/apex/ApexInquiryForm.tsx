"use client";

import { useState } from "react";
import { ShieldCheck, Send, CheckCircle2 } from "lucide-react";

export default function ApexInquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-20 bg-[#0B1320] text-white border-b border-amber-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B] bg-amber-950/80 px-3.5 py-1 rounded-full border border-amber-800/60">
            PRIVATE OFF-MARKET INQUIRY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Schedule a Confidential VIP Showing
          </h2>
          <p className="text-sm text-slate-300">
            Gain access to unlisted off-market penthouses and private estate listings.
          </p>
        </div>

        <div className="bg-[#1E293B] rounded-3xl p-8 sm:p-10 border border-slate-700/60 shadow-2xl text-left">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#D97706] text-white rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-white">VIP Request Received</h3>
              <p className="text-xs text-slate-300">Our Senior Managing Director will reach out to schedule your private showing.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">FULL NAME *</label>
                  <input type="text" required placeholder="Lord Arthur Sterling" className="w-full p-3.5 bg-[#0F172A] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">EMAIL ADDRESS *</label>
                  <input type="email" required placeholder="sterling@familyoffice.com" className="w-full p-3.5 bg-[#0F172A] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">TARGET LOCATION</label>
                  <select className="w-full p-3.5 bg-[#0F172A] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500">
                    <option>Beverly Hills &amp; Bel Air</option>
                    <option>Manhattan Penthouse Collection</option>
                    <option>Miami Beach Waterfront</option>
                    <option>Monaco &amp; French Riviera</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">ACQUISITION BUDGET</label>
                  <select className="w-full p-3.5 bg-[#0F172A] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500">
                    <option>$10M - $25M</option>
                    <option>$25M - $50M</option>
                    <option>$50M - $100M+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">SPECIFIC REQUIREMENTS</label>
                <textarea rows={3} placeholder="Mention specific requirements e.g. Helipad, Docking, Wine Cellar..." className="w-full p-3.5 bg-[#0F172A] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500" />
              </div>

              <button type="submit" className="w-full bg-[#D97706] hover:bg-[#B45309] text-white py-4 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2">
                <span>SUBMIT VIP SHOWING REQUEST</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
