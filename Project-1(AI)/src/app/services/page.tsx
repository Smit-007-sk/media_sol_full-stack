"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadFormSection from "@/components/LeadFormSection";
import Link from "next/link";
import {
  Code,
  Layout,
  ShoppingCart,
  Zap,
  Search,
  Smartphone,
  ShieldCheck,
  Cpu,
  Palette,
  Megaphone,
  Cloud,
  AppWindow,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";

const servicesList = [
  {
    id: "web-design",
    icon: Layout,
    title: "Website Design & Development",
    tagline: "Custom Built for Maximum Conversion",
    description:
      "We build modern, responsive, high-performance websites tailored specifically to your business goals. Designed with pixel-perfect precision and clean code.",
    features: [
      "Responsive on all screen sizes",
      "Fast loading speed (<1.5s)",
      "SEO friendly HTML5 structure",
      "Custom UI/UX component library",
    ],
    badge: "Most Popular",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "eCommerce Store Development",
    tagline: "Turn Visitors Into Paying Customers",
    description:
      "Complete online store solutions equipped with secure payment gateways, inventory management, product filters, and seamless checkout flows.",
    features: [
      "Stripe, PayPal & local payments",
      "Inventory & order management",
      "Mobile optimized checkout",
      "High security & SSL encryption",
    ],
    badge: "High Growth",
  },
  {
    id: "web-apps",
    icon: Code,
    title: "Custom Web Applications",
    tagline: "Scalable SaaS & Business Portals",
    description:
      "Bespoke web applications built with Next.js, React, and modern backend infrastructure to automate operations and power complex digital products.",
    features: [
      "User authentication & roles",
      "Real-time database integration",
      "REST & GraphQL API design",
      "Cloud deployment & auto-scaling",
    ],
    badge: "Enterprise",
  },
  {
    id: "performance",
    icon: Zap,
    title: "Performance & Speed Optimization",
    tagline: "Lightning-Fast Load Times",
    description:
      "We optimize assets, code splitting, caching strategies, and server response times to get your website scoring 95+ on Google PageSpeed Insights.",
    features: [
      "Core Web Vitals green score",
      "Image compression & WebP/AVIF",
      "Script deferral & CDN setup",
      "Database & query optimization",
    ],
    badge: "95+ Score",
  },
  {
    id: "seo",
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    tagline: "Rank Higher on Google Organically",
    description:
      "Technical, on-page, and structural SEO implementation that ensures your website gets indexed quickly and attracts consistent organic traffic.",
    features: [
      "Keyword research & meta tags",
      "Structured schema markup",
      "Sitemap & robots.txt creation",
      "Google Search Console setup",
    ],
    badge: "Organic Reach",
  },
  {
    id: "mobile-uiux",
    icon: Smartphone,
    title: "Mobile-First UI/UX Design",
    tagline: "Engaging Experiences on Mobile",
    description:
      "More than 60% of web traffic comes from mobile devices. We design intuitive, touch-friendly interfaces that captivate mobile users instantly.",
    features: [
      "Touch gesture friendly controls",
      "Adaptive dynamic typography",
      "Figma design prototypes",
      "Micro-animations & transitions",
    ],
    badge: "Mobile Ready",
  },
  {
    id: "maintenance",
    icon: ShieldCheck,
    title: "Maintenance & Support",
    tagline: "Reliable 24/7 Website Care",
    description:
      "Keep your digital assets secure, updated, and performing optimally. We handle daily backups, security monitoring, and regular updates.",
    features: [
      "Weekly automated cloud backups",
      "Malware scanning & firewall",
      "Core dependency updates",
      "Priority emergency bug fixes",
    ],
    badge: "24/7 Managed",
  },
  {
    id: "custom-software",
    icon: Cpu,
    title: "Custom Software Solutions",
    tagline: "Tailored to Your Workflow",
    description:
      "Engineered software tools designed to streamline your business operations, eliminate repetitive tasks, and scale efficiency across teams.",
    features: [
      "Custom workflow automation",
      "Third-party API integrations",
      "Legacy system migration",
      "Detailed technical documentation",
    ],
    badge: "Bespoke Code",
  },
  {
    id: "branding",
    icon: Palette,
    title: "Branding & Digital Identity",
    tagline: "Unforgettable Visual Branding",
    description:
      "Stand out in a crowded market with custom logo design, color typography systems, brand guidelines, and distinctive visual assets.",
    features: [
      "Logo design & vector assets",
      "Color palette & typography guide",
      "Social media graphics kit",
      "Brand voice & stylebook",
    ],
    badge: "Creative",
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Digital Marketing & Ads",
    tagline: "Targeted Growth Campaigns",
    description:
      "Strategic pay-per-click (PPC) campaigns and social media marketing designed to convert impressions into loyal, paying customers.",
    features: [
      "Google Search & Display ads",
      "Meta (Facebook/IG) ad setup",
      "Conversion tracking & analytics",
      "A/B testing ad copy & landing pages",
    ],
    badge: "ROI Focused",
  },
  {
    id: "cloud-api",
    icon: Cloud,
    title: "Cloud & API Architecture",
    tagline: "High-Availability Infrastructure",
    description:
      "Modern serverless and cloud hosting configurations ensuring 99.99% uptime, global CDN caching, and secure database connections.",
    features: [
      "Vercel, AWS & Cloudflare setup",
      "Serverless function APIs",
      "Global CDN edge caching",
      "DDoS protection & SSL certificates",
    ],
    badge: "Cloud Native",
  },
  {
    id: "mobile-apps",
    icon: AppWindow,
    title: "Mobile App Development",
    tagline: "Cross-Platform iOS & Android Apps",
    description:
      "Native-quality iOS and Android applications built with React Native and Expo to extend your web platform into App Store ecosystems.",
    features: [
      "React Native & Expo cross-platform",
      "Push notifications & deep linking",
      "App Store & Google Play publishing",
      "Offline sync & storage",
    ],
    badge: "App Store Ready",
  },
];

const faqs = [
  {
    q: "How does the Free Website offer work?",
    a: "We design and develop a complete professional website for eligible businesses with no upfront design or development fees. You get full control of your website.",
  },
  {
    q: "What tech stack do you use?",
    a: "We use Next.js 15, React 19, Tailwind CSS, TypeScript, and modern headless CMS platforms to deliver ultra-fast, secure, and future-proof websites.",
  },
  {
    q: "How long does a website project take?",
    a: "Most standard websites are completed within 5 to 10 business days depending on content readiness and feedback speed.",
  },
  {
    q: "Will my website be mobile friendly and SEO optimized?",
    a: "Yes! Every single website we build is 100% responsive across mobile, tablet, and desktop devices, and includes complete search engine optimization.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#F4F1EA] flex flex-col justify-between overflow-x-clip relative selection:bg-[#C09A5B]/30">
      <Header />

      {/* Hero Header Banner */}
      <section className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-12 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center max-w-3xl mx-auto"
        >
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#C09A5B] uppercase mb-3">
            EMPEROR MEDIA SOLUTIONS SERVICES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-[#1C1E1B] tracking-tight leading-tight mb-6">
            Complete Digital Services to{" "}
            <span className="italic text-[#C09A5B]">Scale Your Business.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#5A5F5B] leading-relaxed font-sans mb-8">
            From bespoke websites and eCommerce stores to custom web applications, cloud architecture, and digital identity.
          </p>
          <Link
            href="/#claim-website"
            className="inline-flex items-center gap-3 bg-[#072B1E] hover:bg-[#0C3828] text-white text-sm font-bold tracking-wider px-8 py-4 rounded-md transition-all duration-300 shadow-md hover:shadow-xl"
          >
            <span>GET A FREE WEBSITE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Services Detailed Grid */}
      <section className="w-full px-6 md:px-12 lg:px-16 xl:px-20 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="bg-[#FAF8F4] border border-[#E6E0D5] rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#EFECE5] flex items-center justify-center text-[#072B1E] group-hover:bg-[#072B1E] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-[#C09A5B] bg-[#C09A5B]/10 px-3 py-1 rounded-full uppercase">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl font-bold text-[#1C1E1B] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#C09A5B] mb-4">
                    {service.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5A5F5B] leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-8 border-t border-[#EBE6DC] pt-6">
                    {service.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-center gap-2.5 text-xs text-[#1C1E1B] font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/#claim-website"
                  className="inline-flex items-center justify-between w-full bg-[#EFECE5] hover:bg-[#072B1E] text-[#1C1E1B] hover:text-white text-xs font-bold px-5 py-3.5 rounded-xl transition-all duration-300"
                >
                  <span>REQUEST THIS SERVICE</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-[11px] font-sans font-bold tracking-[0.2em] text-[#C09A5B] uppercase">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1E1B] mt-2">
            Got questions? We have answers.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="bg-[#FAF8F4] border border-[#E6E0D5] rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#1C1E1B] text-sm sm:text-base focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C09A5B] transition-transform duration-300 ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#5A5F5B] leading-relaxed border-t border-[#EBE6DC] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form Section */}
      <LeadFormSection />

      <Footer />
    </main>
  );
}
