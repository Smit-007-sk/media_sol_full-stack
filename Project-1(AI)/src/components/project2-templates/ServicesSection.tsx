"use client";

import { Layout, Smartphone, Palette, ShoppingBag, TrendingUp, Cloud, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      icon: Layout,
      title: "Web Design & Development",
      description: "Custom, ultra-fast websites crafted to convert visitors into loyal customers with high design standards.",
      tags: ["Next.js", "Responsive", "SEO Ready"],
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native & cross-platform iOS and Android applications built for speed, security, and exceptional UX.",
      tags: ["iOS & Android", "React Native", "API Integration"],
    },
    {
      icon: Palette,
      title: "UI/UX Strategy & Branding",
      description: "Intuitive interface designs, wireframes, and design systems tailored to elevate your brand presence.",
      tags: ["Wireframing", "Figma", "User Testing"],
    },
    {
      icon: ShoppingBag,
      title: "E-Commerce Solutions",
      description: "Scalable online stores engineered for high conversion rates, seamless checkout, and inventory sync.",
      tags: ["Shopify", "Custom Checkout", "Payment Gateway"],
    },
    {
      icon: TrendingUp,
      title: "SEO & Growth Optimization",
      description: "Data-driven organic search strategy, technical audit, and performance tuning to dominate Google rankings.",
      tags: ["On-Page SEO", "PageSpeed", "Analytics"],
    },
    {
      icon: Cloud,
      title: "Cloud & Infrastructure",
      description: "Reliable cloud hosting setups, DevOps automation, CI/CD pipelines, and enterprise-grade security.",
      tags: ["AWS / Vercel", "Security", "High Availability"],
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-20 relative bg-[#F6F1E6]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#B88E44]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#B88E44] uppercase font-sans">
              OUR SERVICES
            </span>
            <span className="w-8 h-px bg-[#B88E44]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2421]">
            What We Do
          </h2>

          <p className="text-base sm:text-lg text-[#5C645E]">
            Complete digital solutions for your business growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#FBF8F1] rounded-2xl p-7 text-left border border-[#E5DACB] hover:border-[#B88E44]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#0F382C] text-white flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#B88E44] transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#1F2421] mb-3 group-hover:text-[#B88E44] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#5C645E] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-semibold bg-[#F3ECE0] text-[#6B552A] px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0F382C] group-hover:text-[#B88E44] transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
