"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#FBF8F1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#B88E44]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#B88E44] uppercase font-sans">
              CONTACT US
            </span>
            <span className="w-8 h-px bg-[#B88E44]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2421]">
            Let&apos;s Work Together
          </h2>

          <p className="text-base text-[#5C645E]">
            Have a project in mind? Fill out the form below or contact us directly.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0F382C] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#175242] space-y-8">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Get in Touch
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We are available for new projects, custom web design consultations, and full digital transformations.
                </p>
              </div>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#175242] border border-[#216B58] flex items-center justify-center text-[#D8B775] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Phone</div>
                    <div className="font-bold text-white mt-0.5">+1 (800) 555-0199</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#175242] border border-[#216B58] flex items-center justify-center text-[#D8B775] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Email</div>
                    <div className="font-bold text-white mt-0.5">info@emperorsolutions.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#175242] border border-[#216B58] flex items-center justify-center text-[#D8B775] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Office Location</div>
                    <div className="font-bold text-white mt-0.5">Silicon Valley Tech Plaza, CA, USA</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#175242] border border-[#216B58] flex items-center justify-center text-[#D8B775] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Working Hours</div>
                    <div className="font-bold text-white mt-0.5">Mon - Fri: 9:00 AM - 6:00 PM EST</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E5DACB] shadow-xl">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 bg-[#0F382C] text-white rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-[#D8B775]" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#1F2421]">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out. A dedicated project specialist from Emperor Smart Solutions will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DACB] bg-[#FBF8F1] focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DACB] bg-[#FBF8F1] focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl border border-[#E5DACB] bg-[#FBF8F1] focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-2">
                      Estimated Budget
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-[#E5DACB] bg-[#FBF8F1] focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]">
                      <option>$2,500 - $5,000</option>
                      <option>$5,000 - $10,000</option>
                      <option>$10,000 - $25,000</option>
                      <option>$25,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A524D] mb-2">
                    Project Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your goals, timeline, and key features..."
                    className="w-full px-4 py-3 rounded-xl border border-[#E5DACB] bg-[#FBF8F1] focus:outline-none focus:ring-2 focus:ring-[#B88E44] text-sm text-[#1F2421]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F382C] text-white py-4 rounded-xl font-bold text-sm hover:bg-[#08291F] transition-all shadow-xl shadow-[#0F382C]/20 flex items-center justify-center gap-2 group"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
