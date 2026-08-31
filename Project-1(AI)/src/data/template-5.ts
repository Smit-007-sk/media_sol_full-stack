import { TemplateData } from "@/types/template";

export const template5Data: TemplateData = {
  templateId: "template-5",
  templateName: "Luxury / Minimal",
  templateCategory: "Haute Horlogerie, Fine Goods & Private Atelier",
  branding: {
    name: "Aethelgard Haute Horlogerie",
    logoText: "A E T H E L G A R D",
    tagline: "Uncompromising Horological Precision & Fine Artisanship",
    description: "Crafting rare mechanical timepieces and bespoke jewelry pieces conceived in limited private editions.",
    accentColor: "#C9A45C",
  },
  hero: {
    eyebrow: "HAUTE HORLOGERIE ATELIER",
    title: "ELEVATED BY TIMELESS ARTISANSHIP.",
    description: "Every Aethelgard creation is a celebration of mechanical harmony, hand-finished movement components, and quiet aesthetic perfection.",
    primaryCTA: "Explore The Masterpiece Edition",
    primaryURL: "#gallery",
    secondaryCTA: "Private Appointment",
    secondaryURL: "#contact",
    media: {
      type: "image",
      title: "Aethelgard Grand Complication Movement",
      badge: "Private Masterpiece",
      patternType: "minimal",
      placeholderBg: "from-neutral-950 via-stone-900 to-amber-950/60",
    },
  },
  services: [
    {
      id: "s1",
      title: "Bespoke Horological Commissions",
      subtitle: "Custom Calibres",
      description: "Collaborate directly with our master watchmakers to design custom complications, hand-engraved dials, and unique precious metal cases.",
      features: [
        "Hand-Finished Mechanical Movements",
        "Custom Hand-Engraved Dials",
        "Ethically Sourced Precious Metals",
      ],
      iconName: "Clock",
      media: {
        type: "image",
        title: "Horological Workbench",
        patternType: "minimal",
      },
    },
    {
      id: "s2",
      title: "High Jewelry Atelier",
      subtitle: "Rare Gemology",
      description: "Exquisite high jewelry creations featuring rare unheated gemstones, precision diamond setting, and hand-sculpted platinum mounts.",
      features: [
        "Unheated Gemstone Selection",
        "Hand-Sculpted Platinum Mountings",
        "Certificate of Heritage Provenance",
      ],
      iconName: "Gem",
      media: {
        type: "image",
        title: "Gemology Inspection",
        patternType: "minimal",
      },
    },
    {
      id: "s3",
      title: "Heritage Restoration & Care",
      subtitle: "Preservation",
      description: "Restoring historic mechanical timepieces and heirloom jewelry utilizing traditional hand-craft methods and archival documentation.",
      features: [
        "Archival Restoration Protocol",
        "Hand-Polishing & Finishing",
        "Full Calibre Overhaul",
      ],
      iconName: "Sparkle",
      media: {
        type: "image",
        title: "Movement Restoration",
        patternType: "minimal",
      },
    },
  ],
  about: {
    eyebrow: "ATELIER HERITAGE",
    title: "The Quiet Pursuit of Mechanical Perfection",
    subtitle: "Hand-finished horology in the Swiss Jura mountains",
    description: "In an era of rapid mass production, Aethelgard honors the slow, deliberate tradition of independent watchmaking. Each component is chamfered, polished, and assembled by hand in our quiet mountain atelier.",
    highlights: [
      {
        title: "Hand Anglage & Polishing",
        detail: "Beveled edges mirror polished to a flawless optical shine.",
      },
      {
        title: "In-House Calibre Design",
        detail: "Original mechanical movements developed entirely within our workshop.",
      },
      {
        title: "Limited Annual Production",
        detail: "Strictly limited pieces crafted per calendar year to preserve rarity.",
      },
    ],
    media: {
      type: "image",
      title: "Aethelgard Mountain Atelier",
      badge: "Swiss Jura Atelier",
      patternType: "minimal",
    },
  },
  gallery: [
    {
      id: "g1",
      title: "The Chronographe Tourbillon",
      category: "Master Edition",
      caption: "Hand-wound mechanical tourbillon in polished 18k rose gold case.",
      media: {
        type: "image",
        title: "Tourbillon Timepiece",
        patternType: "minimal",
      },
    },
    {
      id: "g2",
      title: "Grand Feu Enamel Dial Detail",
      category: "Artistic Crafts",
      caption: "Vitreous enamel dial fired multiple times at 800°C for deep luster.",
      media: {
        type: "image",
        title: "Enamel Dial Close-up",
        patternType: "minimal",
      },
    },
    {
      id: "g3",
      title: "Emerald Cut Diamond Ring",
      category: "Private Collection",
      caption: "Flawless emerald-cut central diamond mounted in sculpted platinum.",
      media: {
        type: "image",
        title: "Diamond Ring Sculpture",
        patternType: "minimal",
      },
    },
  ],
  videoSection: {
    eyebrow: "CRAFTSMANSHIP FILM",
    title: "The Art of Hand Anglage & Assembly",
    description: "An intimate macro documentary showcasing the delicate hand-finishing of watch movement bridges in our atelier.",
    badgeText: "Craft Film",
    media: {
      type: "video",
      title: "Aethelgard Artisanship Film",
      badge: "Watch Film",
      aspectRatio: "16/9",
      patternType: "minimal",
    },
  },
  testimonials: [
    {
      id: "t1",
      quote: "The subtle balance of classical horology and understated modern elegance makes Aethelgard timepieces truly extraordinary.",
      author: "Lord Henry Sterling",
      role: "Private Collector",
      company: "Geneva, Switzerland",
    },
    {
      id: "t2",
      quote: "Receiving our commissioned timepiece was an experience of pure artistry. The level of hand finishing is unrivaled.",
      author: "Dr. Aris Thorne",
      role: "Watch Historian",
      company: "Horological Institute",
    },
  ],
  contact: {
    phone: "+41 22 819 0900",
    email: "atelier@aethelgard.com",
    address: "Rue du Rhône 42, 1204 Geneva, Switzerland",
    hours: "Private Salon Visits by Advance Reservation",
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};
