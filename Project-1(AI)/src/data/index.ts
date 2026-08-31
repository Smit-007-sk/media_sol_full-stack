import { template1Data } from "./template-1";
import { template2Data } from "./template-2";
import { template3Data } from "./template-3";
import { template4Data } from "./template-4";
import { template5Data } from "./template-5";
import { TemplateData, TemplateMetadata } from "@/types/template";

export {
  template1Data,
  template2Data,
  template3Data,
  template4Data,
  template5Data,
};

export const templatesRegistry: Record<string, TemplateData> = {
  "template-1": template1Data,
  "template-2": template2Data,
  "template-3": template3Data,
  "template-4": template4Data,
  "template-5": template5Data,
};

export const templatesMetadata: TemplateMetadata[] = [
  {
    id: "template-1",
    name: "Classic Premium Business",
    tagline: "Vanguard Executive Advisory",
    description: "Classic split hero, logo left + nav right, trust logomark strip, 3-column service cards, executive about section, portfolio gallery, and consultation CTA.",
    category: "Corporate Advisory & Executive Counsel",
    colorScheme: "Emerald Green (#075C45) & Warm Cream Ivory",
    navStyle: "Classic Split (Logo Left, Links Right + CTA)",
    heroStyle: "Left Headline + Right Framed Media",
    bestSuitedFor: [
      "Executive Advisory",
      "Consulting Agencies",
      "Law & Financial Firms",
      "Professional Services",
    ],
    route: "/templates/template-1",
  },
  {
    id: "template-2",
    name: "Full-Width Editorial",
    tagline: "Aura Sanctuary & Estate",
    description: "Immersive centered logo with split distributed navigation, 100vh full-width photographic hero, large editorial story layout, botanical spa accordion, and guest quotes.",
    category: "Luxury Hospitality & Fine Travel",
    colorScheme: "Warm Terracotta (#B85B35), Clay & Sand Linen",
    navStyle: "Centered Logo with Distributed Nav Links",
    heroStyle: "Full-Viewport 100vh Atmospheric Visual",
    bestSuitedFor: [
      "Luxury Resorts & Hotels",
      "Fine Dining Restaurants",
      "Private Estates & Real Estate",
      "Lifestyle Brands",
    ],
    route: "/templates/template-2",
  },
  {
    id: "template-3",
    name: "Creative / Experimental",
    tagline: "Studio Kroma Atelier",
    description: "Asymmetric floating vertical menu layout, oversized editorial typography, overlapping geometric masks, staggered project showcase grid, and showreel video container.",
    category: "Architecture, Fine Arts & Design Studios",
    colorScheme: "Pitch Black (#0A0A0A) & Electric Ochre Gold",
    navStyle: "Asymmetric Vertical Drawer + Floating Action",
    heroStyle: "Offset Oversized Serif + Overlapping Geometry",
    bestSuitedFor: [
      "Architectural Practices",
      "Design Studios",
      "Fashion Ateliers",
      "Creative Agencies",
    ],
    route: "/templates/template-3",
  },
  {
    id: "template-4",
    name: "Corporate / Trust",
    tagline: "Veritas Enterprise Solutions",
    description: "Structured dual-row corporate bar, high-impact split value prop hero, core service pillars with features, case study cards, and board-level testimonial carousel.",
    category: "Enterprise Technology & Infrastructure",
    colorScheme: "Executive Slate Blue (#1D4ED8) & Steel Ice White",
    navStyle: "Structured Dual-Row Header with Direct Links",
    heroStyle: "Value Proposition Left + Tech Center Right",
    bestSuitedFor: [
      "B2B Enterprise SaaS",
      "Infrastructure & Cloud",
      "Financial Advisory",
      "Engineering Consultancies",
    ],
    route: "/templates/template-4",
  },
  {
    id: "template-5",
    name: "Luxury / Minimal",
    tagline: "Aethelgard Haute Horlogerie",
    description: "Ultra-minimal centered header, Cormorant Garamond typography, generous whitespace, large centered photography reveal, quiet luxury cards, and VIP inquiry form.",
    category: "Haute Horlogerie & Private Atelier",
    colorScheme: "Pure Alabaster (#FAFAFA) & Platinum Gold Accents",
    navStyle: "Minimalist Subdued Centered Monogram Header",
    heroStyle: "High-Fashion Centered Editorial + Minimal CTA",
    bestSuitedFor: [
      "Haute Horlogerie & Watchmakers",
      "Fine Jewelry Ateliers",
      "Haute Couture & Fashion",
      "Private Luxury Brands",
    ],
    route: "/templates/template-5",
  },
];
