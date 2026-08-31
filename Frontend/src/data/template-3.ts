import { TemplateData } from "@/types/template";

export const template3Data: TemplateData = {
  templateId: "template-3",
  templateName: "Creative / Experimental",
  templateCategory: "Architecture, Design Studio & Digital Art",
  branding: {
    name: "Studio Kroma Atelier",
    logoText: "K R O M A",
    tagline: "Multidisciplinary Spatial Architecture & Experimental Design",
    description: "Designing tactile architectural monuments, experimental interior environments, and avant-garde physical experiences.",
    accentColor: "#D9BD7A",
  },
  hero: {
    eyebrow: "SPATIAL ARCHITECTURE & ATELIER",
    title: "Sculpting Form, Materiality & Spatial Experience",
    description: "We challenge conventional structural forms to craft tactile, high-concept spaces that merge sculptural rigor with contemporary function.",
    primaryCTA: "View Work Showcase",
    primaryURL: "#projects",
    secondaryCTA: "Inquire Collaboration",
    secondaryURL: "#contact",
    media: {
      type: "image",
      title: "Monolithic Concrete Pavilion Sculpture",
      badge: "Experimental Design",
      patternType: "architectural",
      placeholderBg: "from-zinc-950 via-zinc-900 to-emerald-950",
    },
  },
  services: [
    {
      id: "s1",
      title: "Sculptural Architecture",
      subtitle: "Monolithic & Modular Form",
      description: "Custom residential and public spatial designs characterized by bold geometry, raw natural stone, and dramatic light play.",
      features: [
        "Monolithic Concrete Formwork",
        "Spatial Daylight Optimization",
        "Custom Structural Detail",
      ],
      iconName: "Compass",
      media: {
        type: "image",
        title: "Architectural Model Render",
        patternType: "architectural",
      },
    },
    {
      id: "s2",
      title: "Experimental Interiors",
      subtitle: "Tactile Environments",
      description: "Curating interior sanctuaries through bespoke furniture pieces, raw brass detailing, textured plaster, and ambient lighting.",
      features: [
        "Bespoke Furniture Fabrication",
        "Material Texture Curation",
        "Acoustic & Lighting Design",
      ],
      iconName: "Layers",
      media: {
        type: "image",
        title: "Interior Spatial Detail",
        patternType: "architectural",
      },
    },
    {
      id: "s3",
      title: "Public Cultural Installs",
      subtitle: "Interactive Installations",
      description: "Temporary and permanent site-specific installations exploring the tension between digital projection and raw physical materials.",
      features: [
        "Site-Specific Spatial Art",
        "Interactive Material Studies",
        "Public Exhibition Curation",
      ],
      iconName: "Feather",
      media: {
        type: "image",
        title: "Installation Preview",
        patternType: "architectural",
      },
    },
  ],
  about: {
    eyebrow: "ATELIER MANIFESTO",
    title: "Where Raw Structure Meets Refined Spatial Poetics",
    subtitle: "A studio dedicated to pushing architectural boundaries",
    description: "Founded on the belief that spaces evoke emotion, Studio Kroma balances structural engineering with sculptural artistry. We treat each project as a unique canvas—exploring light, shadow, scale, and material authenticity.",
    highlights: [
      {
        title: "Material Authenticity",
        detail: "Honoring raw brass, cast concrete, honed stone, and sustainable hardwood.",
      },
      {
        title: "Precise Scale & Harmony",
        detail: "Crafting proportions that feel both monumental and deeply human.",
      },
      {
        title: "Collaborative Atelier Model",
        detail: "Working directly with master craftspeople, stonemasons, and engineers.",
      },
    ],
    media: {
      type: "image",
      title: "Atelier Studio Space",
      badge: "Creative Studio",
      patternType: "architectural",
    },
  },
  gallery: [
    {
      id: "g1",
      title: "House of Curved Concrete",
      category: "Residential Architecture",
      caption: "A sweeping monolithic villa integrated into natural hillside rock.",
      media: {
        type: "image",
        title: "Curved Concrete Structure",
        patternType: "architectural",
      },
    },
    {
      id: "g2",
      title: "Brass & Plaster Gallery Room",
      category: "Interior Spatial Design",
      caption: "Custom exhibition space featuring hand-burnished brass light alcoves.",
      media: {
        type: "image",
        title: "Gallery Interior",
        patternType: "architectural",
      },
    },
    {
      id: "g3",
      title: "Linear Timber Pavilion",
      category: "Cultural Architecture",
      caption: "Public shade installation crafted from Japanese cedar geometry.",
      media: {
        type: "image",
        title: "Timber Pavilion",
        patternType: "architectural",
      },
    },
  ],
  videoSection: {
    eyebrow: "ATELIER SHOWREEL",
    title: "Exploring Spatial Light & Material Textures",
    description: "A short documentary film capturing our architectural process from raw sketch to physical construction.",
    badgeText: "Showreel 2026",
    media: {
      type: "video",
      title: "Studio Kroma Atelier Film",
      badge: "Play Showreel",
      aspectRatio: "16/9",
      patternType: "architectural",
    },
  },
  testimonials: [
    {
      id: "t1",
      quote: "Studio Kroma transformed our residential pavilion into a living work of sculptural art. The spatial light balance is extraordinary.",
      author: "Daria Rostova",
      role: "Art Collector & Patron",
      company: "Zurich, Switzerland",
    },
    {
      id: "t2",
      quote: "Their commitment to material honesty and architectural precision sets Kroma apart as a visionary design studio.",
      author: "Soren Lindqvist",
      role: "Design Director",
      company: "Nordic Cultural Foundation",
    },
  ],
  contact: {
    phone: "+41 44 290 8110",
    email: "atelier@studiokroma.design",
    address: "Gotthardstrasse 48, 8002 Zurich, Switzerland",
    hours: "Atelier Visits by Appointment Only",
  },
  social: {
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
};
