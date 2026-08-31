"use client";

import TemplateSwitcher from "@/components/TemplateSwitcher";
import AetheriaHero from "@/components/aetheria/AetheriaHero";
import AetheriaFeatures from "@/components/aetheria/AetheriaFeatures";
import AetheriaArchitecture from "@/components/aetheria/AetheriaArchitecture";
import AetheriaSdkDocs from "@/components/aetheria/AetheriaSdkDocs";
import AetheriaPricing from "@/components/aetheria/AetheriaPricing";
import AetheriaFaq from "@/components/aetheria/AetheriaFaq";
import Footer from "@/components/Footer";

export default function AetheriaPage() {
  return (
    <div className="min-h-screen bg-[#08090E] text-white selection:bg-purple-600 selection:text-white font-mono">
      <TemplateSwitcher />
      <AetheriaHero />
      <AetheriaFeatures />
      <AetheriaArchitecture />
      <AetheriaSdkDocs />
      <AetheriaPricing />
      <AetheriaFaq />
      <Footer />
    </div>
  );
}
