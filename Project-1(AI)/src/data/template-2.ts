import { TemplateData } from "@/types/template";

export const template2Data: TemplateData = {
  templateId: "template-2",
  templateName: "Full-Width Editorial",
  templateCategory: "Luxury Hospitality & Fine Travel",
  branding: {
    name: "Aura Sanctuary & Estate",
    logoText: "A U R A",
    tagline: "A Secluded Sanctuary of Serenity & Architectural Balance",
    description: "Immerse in timeless architectural retreat environments designed for quiet reflection, refined hospitality, and natural harmony.",
    accentColor: "#C9A45C",
  },
  hero: {
    eyebrow: "THE SANCTUARY ESTATE",
    title: "Where Quiet Architecture Meets Natural Serenity",
    description: "Nestled amidst undisturbed coastal hills, Aura offers an intimate collection of private pavilion suites crafted for mindful living.",
    primaryCTA: "Reserve Your Stay",
    primaryURL: "#contact",
    secondaryCTA: "Discover The Experience",
    secondaryURL: "#about",
    media: {
      type: "image",
      title: "Aura Sanctuary Sunset View",
      badge: "Editorial Retreat",
      patternType: "editorial",
      placeholderBg: "from-stone-900 via-stone-800 to-amber-950/70",
    },
  },
  services: [
    {
      id: "s1",
      title: "Private Pavilion Suites",
      subtitle: "Architectural Living",
      description: "Sunlit living spaces crafted with natural stone, warm timber, and floor-to-ceiling glass looking out over the sanctuary landscape.",
      features: [
        "Private Plunge Pools",
        "Panoramic Coastal Views",
        "Dedicated Estate Concierge",
      ],
      iconName: "Home",
      media: {
        type: "image",
        title: "Pavilion Suite Interior",
        patternType: "editorial",
      },
    },
    {
      id: "s2",
      title: "Botanical Wellness & Spa",
      subtitle: "Holistic Restoration",
      description: "Restorative therapies using locally harvested botanical extracts, thermal mineral baths, and meditative soundscapes.",
      features: [
        "Thermal Mineral Baths",
        "Custom Botanical Treatments",
        "Private Meditation Gardens",
      ],
      iconName: "Sparkles",
      media: {
        type: "image",
        title: "Botanical Spa Pavilion",
        patternType: "editorial",
      },
    },
    {
      id: "s3",
      title: "Seasonal Culinary Tasting",
      subtitle: "Farm-to-Table Dining",
      description: "An evolving daily menu celebrating regional organic produce, wild-harvested herbs, and sommelier-curated fine pairings.",
      features: [
        "Organic Estate Gardens",
        "Private Dining Terraces",
        "Sommelier Tasting Reserve",
      ],
      iconName: "Utensils",
      media: {
        type: "image",
        title: "Culinary Presentation",
        patternType: "editorial",
      },
    },
  ],
  about: {
    eyebrow: "PHILOSOPHY OF SPACE",
    title: "Designed in Harmony with the Natural Contours of the Land",
    subtitle: "Sustainably crafted luxury surrounded by untouched wilderness",
    description: "Aura was conceived as a dialogue between modern minimalist architecture and surrounding ecology. Every structure is positioned to preserve existing topography, maximize natural ventilation, and celebrate the gentle shift of light throughout the day.",
    highlights: [
      {
        title: "Low-Impact Architecture",
        detail: "Built utilizing indigenous materials and passive environmental cooling systems.",
      },
      {
        title: "Unrivaled Privacy",
        detail: "Secluded spatial planning ensuring calm, uninterrupted personal solitude.",
      },
      {
        title: "Mindful Hospitality",
        detail: "Warm, understated service focused on detail, discretion, and comfort.",
      },
    ],
    media: {
      type: "image",
      title: "Aura Estate Courtyard",
      badge: "Estate Architecture",
      patternType: "editorial",
    },
  },
  gallery: [
    {
      id: "g1",
      title: "Morning Sun at Pavilion Terrace",
      category: "Living Spaces",
      caption: "Soft morning light filtering across handcrafted stone surfaces.",
      media: {
        type: "image",
        title: "Terrace View",
        patternType: "editorial",
      },
    },
    {
      id: "g2",
      title: "Reflecting Pool & Zen Garden",
      category: "Estate Grounds",
      caption: "Quiet water courtyard designed for evening contemplation.",
      media: {
        type: "image",
        title: "Reflecting Pool",
        patternType: "editorial",
      },
    },
    {
      id: "g3",
      title: "Sunset Lounge Pavilion",
      category: "Dining & Gatherings",
      caption: "Open-air lounge looking toward horizon twilight views.",
      media: {
        type: "image",
        title: "Sunset Pavilion",
        patternType: "editorial",
      },
    },
  ],
  videoSection: {
    eyebrow: "VISUAL JOURNEY",
    title: "Step Inside the Atmosphere of Aura Sanctuary",
    description: "A cinematic look through the peaceful gardens, light-filled pavilions, and tranquil spaces of our coastal estate.",
    badgeText: "Cinematic Film",
    media: {
      type: "video",
      title: "Aura Sanctuary Atmosphere Film",
      badge: "Watch Experience",
      aspectRatio: "21/9",
      patternType: "editorial",
    },
  },
  testimonials: [
    {
      id: "t1",
      quote: "A rare haven where every architectural line and natural breeze feels intentionally designed for deep peace.",
      author: "Julian Thorne",
      role: "Architectural Critic",
      company: "Spatial Design Journal",
    },
    {
      id: "t2",
      quote: "The quiet luxury, serene natural surroundings, and impeccable hospitality created an unforgettable retreat.",
      author: "Claire & Harrison Bennett",
      role: "Private Guests",
      company: "London, UK",
    },
  ],
  contact: {
    phone: "+1 (888) 720-9182",
    email: "reservations@aurasanctuary.com",
    address: "1200 Sanctuary Ridge Way, Big Sur, CA 93920",
    hours: "Guest Services: 24/7 Concierge Available",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    pinterest: "https://pinterest.com",
  },
};
