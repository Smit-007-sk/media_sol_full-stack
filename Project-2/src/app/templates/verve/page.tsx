"use client";

import TemplateSwitcher from "@/components/TemplateSwitcher";
import VerveHero from "@/components/verve/VerveHero";
import VerveMarquee from "@/components/verve/VerveMarquee";
import VervePhilosophy from "@/components/verve/VervePhilosophy";
import VerveGallery from "@/components/verve/VerveGallery";
import VerveServices from "@/components/verve/VerveServices";
import VervePress from "@/components/verve/VervePress";
import VerveContact from "@/components/verve/VerveContact";
import Footer from "@/components/Footer";

export default function VervePage() {
  return (
    <div className="min-h-screen bg-[#181717] text-[#EAE5D9] selection:bg-[#D96B43] selection:text-white font-sans">
      <TemplateSwitcher />
      <VerveHero />
      <VerveMarquee />
      <VervePhilosophy />
      <VerveGallery />
      <VerveServices />
      <VervePress />
      <VerveContact />
      <Footer />
    </div>
  );
}
