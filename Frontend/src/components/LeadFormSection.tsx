"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Gift,
  User,
  Mail,
  Phone,
  Briefcase,
  Globe,
  PenTool,
  ArrowRight,
  ArrowLeft,
  Server,
  FileText,
  MessageSquare,
  Smartphone,
  TrendingUp,
  ShieldCheck,
  Clock,
  Handshake,
  Upload,
  Check,
  Palette,
  Layout,
  CheckCircle2,
  Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const includedItems = [
  {
    icon: Globe,
    title: "Free Custom Slug",
    subtext: "Custom URL slug for your business website",
  },
  {
    icon: FileText,
    title: "Single Page Website",
    subtext: "High-converting single page website layout",
  },
  {
    icon: MessageSquare,
    title: "Basic Support 1 Year",
    subtext: "We're here to help whenever you need us",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly Design",
    subtext: "Responsive design for all devices",
  },
  {
    icon: TrendingUp,
    title: "SEO Ready Website",
    subtext: "Built with SEO best practices",
  },
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "No Hidden Charges",
    desc: "This is 100% free with no hidden fees or surprises.",
  },
  {
    icon: Clock,
    title: "Limited Offer",
    desc: "We are offering a limited number of websites every month.",
  },
  {
    icon: Handshake,
    title: "Our Commitment",
    desc: "We are committed to helping businesses grow online.",
  },
];

const categories = [
  "Corporate / Business",
  "E-Commerce Store",
  "Architecture & Real Estate",
  "Portfolio & Creative Agency",
  "Healthcare & Medical",
  "Restaurant & Food",
  "SaaS & Web Application",
  "Other / Custom",
];

const themeColors = [
  { name: "Luxury Dark & Gold", bg: "bg-[#072B1E]", accent: "bg-[#C09A5B]" },
  { name: "Clean White & Emerald", bg: "bg-[#FAF8F4]", accent: "bg-[#059669]" },
  { name: "Deep Royal Navy & Gold", bg: "bg-[#0B192C]", accent: "bg-[#FFD700]" },
  { name: "Modern Charcoal & Cyan", bg: "bg-[#1E293B]", accent: "bg-[#06B6D4]" },
];

const designStyles = [
  "Minimal & Modern",
  "Bold & Dynamic",
  "Warm & Elegant",
  "Corporate & Professional",
];

const featuresList = [
  "Contact Lead Form",
  "WhatsApp Chat Button",
  "Social Media Links",
  "Product Catalog / Gallery",
  "Google Map Location",
  "Blog Section",
];

export default function LeadFormSection() {
  const [step, setStep] = useState(1);
  const MAX_BYTES = 10 * 1024 * 1024; // 10MB
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [altPhoneError, setAltPhoneError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    altPhone: "",
    businessName: "",
    category: "Corporate / Business",
    customCategory: "",
    servicesDescription: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    logoFiles: [] as File[],
    bannerFiles: [] as File[],
    selectedFeatures: ["Contact Lead Form", "WhatsApp Chat Button"],
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem("emperor_form_draft");
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          logoFiles: [],
          bannerFiles: [],
        }));
      }
    } catch (e) {
      console.error("Could not load draft from localStorage", e);
    }
  }, []);

  // Save text draft to localStorage on change
  useEffect(() => {
    try {
      const { logoFiles, bannerFiles, ...textDraft } = formData;
      localStorage.setItem("emperor_form_draft", JSON.stringify(textDraft));
    } catch (e) {
      console.error("Could not save draft to localStorage", e);
    }
  }, [formData]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((f) => f.size <= MAX_BYTES);
      if (files.length > validFiles.length) {
        setUploadError("Some logo file(s) exceeded the 10MB limit and were skipped.");
      }
      setFormData((prev) => ({
        ...prev,
        logoFiles: [...prev.logoFiles, ...validFiles],
      }));
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter((f) => f.size <= MAX_BYTES);
      if (files.length > validFiles.length) {
        setUploadError("Some banner file(s) exceeded the 10MB limit and were skipped.");
      }
      setFormData((prev) => ({
        ...prev,
        bannerFiles: [...prev.bannerFiles, ...validFiles],
      }));
    }
  };

  const removeLogoFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      logoFiles: prev.logoFiles.filter((_, i) => i !== index),
    }));
  };

  const removeBannerFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      bannerFiles: prev.bannerFiles.filter((_, i) => i !== index),
    }));
  };

  const toggleFeature = (feature: string) => {
    if (formData.selectedFeatures.includes(feature)) {
      setFormData({
        ...formData,
        selectedFeatures: formData.selectedFeatures.filter((f) => f !== feature),
      });
    } else {
      setFormData({
        ...formData,
        selectedFeatures: [...formData.selectedFeatures, feature],
      });
    }
  };

  const validatePhone = (num: string) => {
    const clean = num.replace(/[^0-9]/g, "");
    return clean.length === 10;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);
    setAltPhoneError(null);

    if (step === 1) {
      if (!validatePhone(formData.phone)) {
        setPhoneError("Please enter a valid 10-digit mobile/WhatsApp number.");
        return;
      }
      if (formData.altPhone.trim() && !validatePhone(formData.altPhone)) {
        setAltPhoneError("Please enter a valid 10-digit alternate mobile number.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    const leadPayload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      altPhone: formData.altPhone,
      businessName: formData.businessName,
      category: formData.category === "Other / Custom" ? (formData.customCategory || "Other") : formData.category,
      servicesDescription: formData.servicesDescription,
      instagram: formData.instagram,
      facebook: formData.facebook,
      linkedin: formData.linkedin,
      selectedFeatures: formData.selectedFeatures,
      notes: formData.notes,
    };

    // 1. Post directly to NestJS Backend API (port 4000)
    try {
      await fetch('http://localhost:4000/api/clients/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
    } catch (err) {
      console.warn('Backend API submit lead warning:', err);
    }

    // 2. Backup to LocalStorage
    try {
      const submissionRecord = {
        id: Date.now(),
        submittedAt: new Date().toLocaleString(),
        ...leadPayload,
        logoFilesCount: formData.logoFiles.length,
        bannerFilesCount: formData.bannerFiles.length,
      };

      const existingSubmissions = JSON.parse(localStorage.getItem("emperor_website_submissions") || "[]");
      existingSubmissions.unshift(submissionRecord);
      localStorage.setItem("emperor_website_submissions", JSON.stringify(existingSubmissions));
      localStorage.removeItem("emperor_form_draft");
    } catch (e) {
      console.error("Could not save submission to localStorage", e);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
    }, 6000);
  };

  return (
    <section id="claim-website" className="relative w-full px-6 md:px-12 lg:px-16 xl:px-20 pt-16 pb-20 overflow-hidden">
      {/* 1. Hero Offer & Lead Generation Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start mb-20">
        {/* Left Column: Offer Copy & Features */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-between"
        >
          <div>
            {/* Tagline */}
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-4 h-4 text-[#A57D3F]" />
              <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#A57D3F] uppercase">
                LIMITED TIME OFFER
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-medium leading-[1.08] text-[#1C1E1B] tracking-tight mb-6">
              Your Business Deserves
              <br />
              a Great Website.
              <br />
              <span className="italic font-normal text-[#C09A5B]">
                For Free!
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-base sm:text-lg text-[#555A56] leading-relaxed font-sans mb-8 max-w-xl">
              Tell us how you want your website to look, upload your logo and assets, and our team will build your custom website at zero development cost.
            </p>

            {/* 4 Feature Bullet Points */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#072B1E] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1E1B]">
                  Professional Design
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#072B1E] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1E1B]">
                  Fully Responsive
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#072B1E] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1E1B]">
                  SEO Optimized
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#072B1E] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#1C1E1B]">
                  Secure &amp; Reliable
                </span>
              </div>
            </div>

            {/* Photo Preview Stack */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-[#E5DFD3]">
              <Image
                src="/stacked-website-offer.jpg"
                alt="Free website builder templates"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3-Step Interactive Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          <div className="bg-white border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-xl relative">
            {/* Header Gift Badge */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#072B1E] text-white flex items-center justify-center mb-3 shadow-md">
                <Gift className="w-7 h-7 text-white" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1E1B]">
                Build Your <span className="underline decoration-[#C09A5B] underline-offset-4 text-[#072B1E]">FREE Website</span>
              </h3>

              {/* 3-Step Wizard Progress Bar */}
              <div className="w-full mt-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#6B706C] mb-1.5 px-1">
                  <span className={step >= 1 ? "text-[#072B1E]" : ""}>1. Business Info</span>
                  <span className={step >= 2 ? "text-[#072B1E]" : ""}>2. Services &amp; Social</span>
                  <span className={step >= 3 ? "text-[#072B1E]" : ""}>3. Assets &amp; Submit</span>
                </div>
                <div className="w-full h-2 bg-[#EFECE5] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#072B1E] transition-all duration-500 rounded-full"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#E6F9F3] border border-[#A7F3D0] rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[350px]"
              >
                <div className="w-16 h-16 rounded-full bg-[#059669] text-white flex items-center justify-center mb-4 shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-[#065F46] mb-2">
                  Request Received Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-[#047857] leading-relaxed max-w-sm">
                  Thank you, <strong>{formData.fullName}</strong>! Our design team will review your website preferences and logo assets and reach out on WhatsApp/Email within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleNext} className="space-y-5">
                <AnimatePresence mode="wait">
                  {/* STEP 1: CONTACT & BUSINESS INFO */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Full Name *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#8C908D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            suppressHydrationWarning
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-xs sm:text-sm text-[#1C1E1B] rounded-xl pl-10 pr-4 py-3 outline-none transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Email Address *</label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-[#8C908D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            suppressHydrationWarning
                            type="email"
                            required
                            placeholder="e.g. john@business.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-xs sm:text-sm text-[#1C1E1B] rounded-xl pl-10 pr-4 py-3 outline-none transition-all font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Phone / WhatsApp Number *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#8C908D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            suppressHydrationWarning
                            type="tel"
                            required
                            maxLength={10}
                            placeholder="e.g. 9876543210 (10 Digits)"
                            value={formData.phone}
                            onChange={(e) => {
                              setPhoneError(null);
                              const numericOnly = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                              setFormData({ ...formData, phone: numericOnly });
                            }}
                            className={`w-full bg-[#FAF8F4] border ${phoneError ? "border-[#EF4444]" : "border-[#E5DFD3]"} focus:border-[#072B1E] focus:bg-white text-xs sm:text-sm text-[#1C1E1B] rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all font-medium`}
                          />
                        </div>
                        {phoneError && <p className="text-[11px] text-[#DC2626] font-semibold mt-1">{phoneError}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Alternate Mobile Number (Optional)</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#8C908D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            suppressHydrationWarning
                            type="tel"
                            maxLength={10}
                            placeholder="e.g. 9876500000 (10 Digits)"
                            value={formData.altPhone}
                            onChange={(e) => {
                              setAltPhoneError(null);
                              const numericOnly = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                              setFormData({ ...formData, altPhone: numericOnly });
                            }}
                            className={`w-full bg-[#FAF8F4] border ${altPhoneError ? "border-[#EF4444]" : "border-[#E5DFD3]"} focus:border-[#072B1E] focus:bg-white text-xs sm:text-sm text-[#1C1E1B] rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all font-medium`}
                          />
                        </div>
                        {altPhoneError && <p className="text-[11px] text-[#DC2626] font-semibold mt-1">{altPhoneError}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Business Name *</label>
                        <div className="relative">
                          <Briefcase className="w-4 h-4 text-[#8C908D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            suppressHydrationWarning
                            type="text"
                            required
                            placeholder="e.g. Acme Studio"
                            value={formData.businessName}
                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                            className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-xs sm:text-sm text-[#1C1E1B] rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all font-medium"
                          />
                        </div>
                      </div>

                      <button
                        suppressHydrationWarning
                        type="submit"
                        className="w-full bg-[#072B1E] hover:bg-[#0C3828] text-white font-bold text-xs sm:text-sm tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-4"
                      >
                        <span>NEXT: WEBSITE DETAILS</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: CATEGORY, SERVICES DESCRIPTION & SOCIAL LINKS */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3.5"
                    >
                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Website Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-xs sm:text-sm text-[#1C1E1B] rounded-xl px-4 py-2.5 outline-none transition-all font-medium"
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Custom Category Input (shown when Other / Custom is selected) */}
                      {formData.category === "Other / Custom" && (
                        <div>
                          <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Specify Custom Website Category *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Real Estate Consultancy, Automobile Repair, Law Firm..."
                            value={formData.customCategory}
                            onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                            className="w-full bg-[#FAF8F4] border border-[#072B1E] focus:bg-white text-xs sm:text-sm text-[#1C1E1B] rounded-xl px-4 py-2.5 outline-none transition-all font-medium"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Services / Business Description</label>
                        <textarea
                          rows={2}
                          placeholder="Briefly describe your services, key products, or business offerings..."
                          value={formData.servicesDescription}
                          onChange={(e) => setFormData({ ...formData, servicesDescription: e.target.value })}
                          className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-xs text-[#1C1E1B] rounded-xl p-3 outline-none transition-all font-medium resize-none"
                        />
                      </div>

                      {/* Social Handles Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-[#1C1E1B] mb-1">Instagram ID</label>
                          <div className="relative">
                            <svg className="w-3.5 h-3.5 text-[#E1306C] absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                            <input
                              type="text"
                              placeholder="@yourbrand"
                              value={formData.instagram}
                              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                              className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-[11px] text-[#1C1E1B] rounded-xl pl-9 pr-3 py-2 outline-none transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#1C1E1B] mb-1">Facebook ID</label>
                          <div className="relative">
                            <svg className="w-3.5 h-3.5 text-[#1877F2] absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            <input
                              type="text"
                              placeholder="facebook.com/..."
                              value={formData.facebook}
                              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                              className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-[11px] text-[#1C1E1B] rounded-xl pl-9 pr-3 py-2 outline-none transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-[#1C1E1B] mb-1">LinkedIn ID</label>
                          <div className="relative">
                            <svg className="w-3.5 h-3.5 text-[#0A66C2] absolute left-3 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            <input
                              type="text"
                              placeholder="linkedin.com/in/..."
                              value={formData.linkedin}
                              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                              className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-[11px] text-[#1C1E1B] rounded-xl pl-9 pr-3 py-2 outline-none transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-1/3 bg-[#EFECE5] hover:bg-[#E5DFD3] text-[#1C1E1B] font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>BACK</span>
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-[#072B1E] hover:bg-[#0C3828] text-white font-bold text-xs sm:text-sm tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <span>NEXT: UPLOAD ASSETS</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: ASSETS & FEATURES */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {uploadError && (
                        <div className="bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs font-semibold p-2.5 rounded-xl">
                          {uploadError}
                        </div>
                      )}

                      {/* Logo Upload (Multiple, Max 10MB) */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-bold text-[#1C1E1B]">Upload Company Logo (Optional)</label>
                          <span className="text-[10px] text-[#059669] font-bold">Multiple • Max 10MB</span>
                        </div>
                        <label className="border-2 border-dashed border-[#D0C9B8] hover:border-[#072B1E] rounded-xl p-3 bg-[#FAF8F4] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-[#072B1E]" />
                            <span className="text-xs font-semibold text-[#5A5F5B]">
                              Click to Upload Logo File(s)
                            </span>
                          </div>
                          <span className="text-[10px] text-[#8C908D]">PNG, JPG, SVG, WEBP up to 10MB each</span>
                          <input type="file" accept="image/*" multiple onChange={handleLogoUpload} className="hidden" />
                        </label>

                        {/* Uploaded Logo Files List */}
                        {formData.logoFiles.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {formData.logoFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className="bg-[#EFECE5] border border-[#D0C9B8] text-[11px] font-semibold text-[#1C1E1B] rounded-lg px-2.5 py-1 flex items-center gap-1.5"
                              >
                                <span className="max-w-[120px] truncate">{file.name}</span>
                                <span className="text-[9px] text-[#5A5F5B]">({(file.size / (1024 * 1024)).toFixed(1)}MB)</span>
                                <button
                                  type="button"
                                  onClick={() => removeLogoFile(idx)}
                                  className="text-[#991B1B] hover:text-black font-bold ml-1"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Banner Images Upload (Multiple, Max 10MB) */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-xs font-bold text-[#1C1E1B]">Upload Banner Images / Assets (Optional)</label>
                          <span className="text-[10px] text-[#059669] font-bold">Multiple • Max 10MB</span>
                        </div>
                        <label className="border-2 border-dashed border-[#D0C9B8] hover:border-[#072B1E] rounded-xl p-3 bg-[#FAF8F4] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all">
                          <div className="flex items-center gap-2">
                            <Upload className="w-4 h-4 text-[#072B1E]" />
                            <span className="text-xs font-semibold text-[#5A5F5B]">
                              Click to Upload Banner Photos
                            </span>
                          </div>
                          <span className="text-[10px] text-[#8C908D]">High-resolution photos up to 10MB each</span>
                          <input type="file" accept="image/*" multiple onChange={handleBannerUpload} className="hidden" />
                        </label>

                        {/* Uploaded Banner Files List */}
                        {formData.bannerFiles.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {formData.bannerFiles.map((file, idx) => (
                              <div
                                key={idx}
                                className="bg-[#E6F9F3] border border-[#A7F3D0] text-[11px] font-semibold text-[#072B1E] rounded-lg px-2.5 py-1 flex items-center gap-1.5"
                              >
                                <span className="max-w-[120px] truncate">{file.name}</span>
                                <span className="text-[9px] text-[#059669]">({(file.size / (1024 * 1024)).toFixed(1)}MB)</span>
                                <button
                                  type="button"
                                  onClick={() => removeBannerFile(idx)}
                                  className="text-[#991B1B] hover:text-black font-bold ml-1"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Required Features Checklist */}
                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1.5">Required Features</label>
                        <div className="grid grid-cols-2 gap-2">
                          {featuresList.map((feature) => {
                            const isChecked = formData.selectedFeatures.includes(feature);
                            return (
                              <button
                                type="button"
                                key={feature}
                                onClick={() => toggleFeature(feature)}
                                className={`p-2 rounded-lg border text-left flex items-center gap-2 text-[11px] font-semibold transition-all ${
                                  isChecked
                                    ? "border-[#072B1E] bg-[#E6F9F3] text-[#072B1E]"
                                    : "border-[#E5DFD3] bg-[#FAF8F4] text-[#5A5F5B]"
                                }`}
                              >
                                <div
                                  className={`w-3.5 h-3.5 rounded flex items-center justify-center ${
                                    isChecked ? "bg-[#072B1E] text-white" : "border border-[#D0C9B8]"
                                  }`}
                                >
                                  {isChecked && <Check className="w-2.5 h-2.5" strokeWidth={3} />}
                                </div>
                                <span className="truncate">{feature}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Additional Instructions */}
                      <div>
                        <label className="block text-xs font-bold text-[#1C1E1B] mb-1">Special Instructions (Optional)</label>
                        <textarea
                          rows={2}
                          placeholder="Any specific requests or reference website URLs..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full bg-[#FAF8F4] border border-[#E5DFD3] focus:border-[#072B1E] focus:bg-white text-xs text-[#1C1E1B] rounded-xl p-3 outline-none transition-all font-medium resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="w-1/3 bg-[#EFECE5] hover:bg-[#E5DFD3] text-[#1C1E1B] font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>BACK</span>
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 bg-[#072B1E] hover:bg-[#0C3828] text-white font-bold text-xs sm:text-sm tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <span>GET MY FREE WEBSITE</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtext Guarantee */}
                <div className="text-center text-[11px] text-[#6B706C] font-semibold mt-3">
                  No Credit Card Required • 100% Free
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {/* 2. WHAT'S INCLUDED IN YOUR FREE WEBSITE Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#FAF8F4] border border-[#E5DFD3] rounded-3xl p-6 sm:p-8 shadow-sm mb-20 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#C09A5B] uppercase">
            WHAT&apos;S INCLUDED IN YOUR FREE WEBSITE
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {includedItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#F5F2EC]/60 border border-[#E8E2D7] hover:bg-white hover:shadow-md transition-all duration-300 min-h-[150px]"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#EFECE5] flex items-center justify-center text-[#1C1E1B] mb-3 shrink-0">
                  <Icon className="w-5 h-5 text-[#1C1E1B]" strokeWidth={1.8} />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1E1B] mb-1.5 leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#6B706C] font-medium leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 3. Bottom Trust & Guarantee Block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16"
      >
        {/* Left Photo Card */}
        <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-md border border-[#E5DFD3]">
          <Image
            src="/laptop-hero.jpg"
            alt="Laptop displaying website design on desk next to coffee mugs"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>

        {/* Right 3 Guarantee Cards */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {guarantees.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-[#FAF8F4] border border-[#E5DFD3] p-5 rounded-2xl flex items-center gap-4 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EFECE5] text-[#072B1E] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-sans font-bold text-sm sm:text-base text-[#1C1E1B]">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#555A56] mt-0.5 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 4. Final Bottom Crown Call to Action Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#EBE5DA] border border-[#DDD6C8] p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="shrink-0 flex items-center justify-center">
            <Crown className="w-8 h-8 text-[#072B1E]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1E1B]">
              Ready to take your business online?
            </h3>
            <p className="text-xs sm:text-sm text-[#555A56] mt-0.5 font-medium">
              Let&apos;s build something amazing together.
            </p>
          </div>
        </div>

        <Link
          href="/#claim-website"
          className="bg-[#072B1E] hover:bg-[#0C3828] text-white text-xs sm:text-sm font-bold tracking-wider px-7 py-3.5 rounded-md transition-all shadow-md hover:shadow-lg flex items-center gap-2.5 shrink-0"
        >
          <span>CLAIM YOUR FREE WEBSITE</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}
