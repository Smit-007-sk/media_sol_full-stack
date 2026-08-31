"use client";

import TemplateSwitcher from "@/components/TemplateSwitcher";
import ApexHero from "@/components/apex/ApexHero";
import ApexProperties from "@/components/apex/ApexProperties";
import ApexAmenities from "@/components/apex/ApexAmenities";
import ApexStats from "@/components/apex/ApexStats";
import ApexInquiryForm from "@/components/apex/ApexInquiryForm";
import Footer from "@/components/Footer";

export default function ApexPage() {
  return (
    <div className="min-h-screen bg-[#0B1320] text-white selection:bg-[#D97706] selection:text-white font-sans">
      <TemplateSwitcher />
      <ApexHero />
      <ApexProperties />
      <ApexAmenities />
      <ApexStats />
      <ApexInquiryForm />
      <Footer />
    </div>
  );
}
