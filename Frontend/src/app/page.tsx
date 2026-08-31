import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesBar from "@/components/FeaturesBar";
import OfferSection from "@/components/OfferSection";
import WhySection from "@/components/WhySection";
import ServicesSection from "@/components/ServicesSection";
import ServicesGridSection from "@/components/ServicesGridSection";
import LeadFormSection from "@/components/LeadFormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F1EA] flex flex-col justify-between overflow-x-clip relative selection:bg-[#C09A5B]/30">
      {/* Background ambient lighting overlay */}
      <div className="absolute top-0 right-0 w-full lg:w-3/4 h-[700px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/70 via-[#F4F1EA]/40 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col justify-between flex-grow">
        {/* Header Navigation */}
        <Header />

        {/* Section 1: Hero */}
        <Hero />

        {/* Floating Features Bar */}
        <FeaturesBar />

        {/* Section 2: Offer (So we're giving you one) */}
        <OfferSection />

        {/* Section 3: Why (Why are we doing this?) */}
        <WhySection />

        {/* Section 4: Services & What We Do (Interactive Scroll Pinned Section) */}
        <ServicesSection />

        {/* Section 5: Services 3x3 Grid & Growth Section */}
        <ServicesGridSection />

        {/* Section 6: Free Website Lead Generation Form & Guarantee Section */}
        <LeadFormSection />

        {/* Section 7: Dark Luxury EMPEROR Footer */}
        <Footer />
      </div>
    </main>
  );
}
