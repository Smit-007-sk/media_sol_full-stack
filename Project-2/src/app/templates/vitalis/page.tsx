"use client";

import TemplateSwitcher from "@/components/TemplateSwitcher";
import VitalisHero from "@/components/vitalis/VitalisHero";
import VitalisTimeline from "@/components/vitalis/VitalisTimeline";
import VitalisDoctors from "@/components/vitalis/VitalisDoctors";
import VitalisServices from "@/components/vitalis/VitalisServices";
import VitalisTestimonials from "@/components/vitalis/VitalisTestimonials";
import VitalisFaq from "@/components/vitalis/VitalisFaq";
import Footer from "@/components/Footer";

export default function VitalisPage() {
  return (
    <div className="min-h-screen bg-[#F0FDFA] text-[#0F172A] selection:bg-[#059669] selection:text-white font-sans">
      <TemplateSwitcher />
      <VitalisHero />
      <VitalisTimeline />
      <VitalisDoctors />
      <VitalisServices />
      <VitalisTestimonials />
      <VitalisFaq />
      <Footer />
    </div>
  );
}
