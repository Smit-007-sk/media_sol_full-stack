import { TemplateData } from "@/types/template";

export const template1Data: TemplateData = {
  templateId: "template-1",
  templateName: "Classic Premium Business",
  templateCategory: "Professional Services & Executive Advisory",
  branding: {
    name: "Vanguard Strategic Partners",
    logoText: "VANGUARD",
    tagline: "Executive Counsel & Strategic Business Advisory",
    description: "Partnering with visionary leadership teams to deliver sustainable growth, organizational transformation, and market expansion.",
    accentColor: "#075C45",
  },
  hero: {
    eyebrow: "STRATEGIC LEADERSHIP & ADVISORY",
    title: "Elevating Executive Vision into Sustainable Enterprise Impact",
    description: "We provide structured guidance, operational clarity, and strategic counsel tailored for expanding mid-market companies and enterprise organizations.",
    primaryCTA: "Schedule Consultation",
    primaryURL: "#contact",
    secondaryCTA: "Explore Our Practice",
    secondaryURL: "#services",
    media: {
      type: "image",
      title: "Strategic Advisory Session",
      badge: "Executive Counsel",
      patternType: "corporate",
      placeholderBg: "from-emerald-950/90 to-emerald-900/80",
    },
  },
  trustedPartners: [
    "Aethelgard Advisory",
    "Kroma Digital",
    "Meridian Enterprise",
    "Apex Global",
    "Solstice Partners",
  ],
  services: [
    {
      id: "s1",
      title: "Corporate Growth Strategy",
      subtitle: "Enterprise Realignment",
      description: "Developing comprehensive strategic roadmaps to navigate complex market environments and unlock new operational potential.",
      features: [
        "Market Positioning Analysis",
        "Operational Expansion Strategy",
        "Performance Optimization Frameworks",
      ],
      iconName: "TrendingUp",
      media: {
        type: "image",
        title: "Growth Planning Framework",
        patternType: "corporate",
      },
    },
    {
      id: "s2",
      title: "Organizational Transformation",
      subtitle: "Operational Excellence",
      description: "Re-architecting organizational workflows, leadership structures, and internal governance to support scalable execution.",
      features: [
        "Leadership Structure Realignment",
        "Workflow Modernization",
        "Change Management Oversight",
      ],
      iconName: "ShieldCheck",
      media: {
        type: "image",
        title: "Organizational Diagram",
        patternType: "corporate",
      },
    },
    {
      id: "s3",
      title: "Capital & Advisory Readiness",
      subtitle: "Strategic Finance",
      description: "Structuring capital strategies, financial modeling, and transaction readiness frameworks for enterprise initiatives.",
      features: [
        "Financial Architecture Review",
        "Capital Structure Advisory",
        "Valuation Preparation",
      ],
      iconName: "Briefcase",
      media: {
        type: "image",
        title: "Advisory Analysis",
        patternType: "corporate",
      },
    },
  ],
  about: {
    eyebrow: "ABOUT OUR PRACTICE",
    title: "Rooted in Principle, Driven by Measured Precision",
    subtitle: "A trusted advisory partner for forward-looking leadership",
    description: "Vanguard Strategic Partners operates at the intersection of strategic foresight and practical execution. We collaborate closely with executive teams to clarify strategic objectives, optimize core operations, and ensure resilient long-term organizational value.",
    highlights: [
      {
        title: "Tailored Advisory Frameworks",
        detail: "Every strategy is custom-built around specific operational benchmarks and market objectives.",
      },
      {
        title: "Disciplined Governance",
        detail: "Grounded in rigorous analytical methodologies and transparent implementation milestones.",
      },
      {
        title: "End-to-End Partnership",
        detail: "From initial assessment through strategy deployment and operational integration.",
      },
    ],
    media: {
      type: "image",
      title: "Vanguard Advisory Headquarters",
      badge: "Established Practice",
      patternType: "architectural",
    },
  },
  gallery: [
    {
      id: "g1",
      title: "Executive Strategy Alignment",
      category: "Advisory Workshop",
      caption: "Interactive leadership session establishing Q4 strategic priorities.",
      media: {
        type: "image",
        title: "Strategy Session Preview",
        patternType: "corporate",
      },
    },
    {
      id: "g2",
      title: "Operations Blueprint Review",
      category: "Operational Design",
      caption: "Mapping streamlined workflow structures for cross-functional efficiency.",
      media: {
        type: "image",
        title: "Operations Blueprint",
        patternType: "corporate",
      },
    },
    {
      id: "g3",
      title: "Enterprise Governance Session",
      category: "Board Advisory",
      caption: "Providing structured counsel during corporate restructuring initiative.",
      media: {
        type: "image",
        title: "Governance Briefing",
        patternType: "corporate",
      },
    },
  ],
  videoSection: {
    eyebrow: "OUR METHODOLOGY",
    title: "Experience the Vanguard Strategic Approach",
    description: "A short visual overview illustrating how our advisory framework fosters clarity, alignment, and execution confidence across partner organizations.",
    badgeText: "Methodology Preview",
    media: {
      type: "video",
      title: "Vanguard Corporate Overview Video",
      badge: "Watch Overview",
      aspectRatio: "16/9",
      patternType: "corporate",
    },
  },
  testimonials: [
    {
      id: "t1",
      quote: "Vanguard brought structured clarity and disciplined strategy to our leadership team during a critical phase of organizational expansion.",
      author: "Eleanor Vance",
      role: "Managing Director",
      company: "Apex Enterprise Holdings",
    },
    {
      id: "t2",
      quote: "Their advisory framework allowed us to streamline core operations and position our company for sustainable long-term development.",
      author: "Marcus Sterling",
      role: "Chief Executive Officer",
      company: "Meridian Logistics Group",
    },
  ],
  contact: {
    phone: "+1 (800) 555-0192",
    email: "contact@vanguard-advisory.com",
    address: "750 Park Avenue, Suite 2400, New York, NY 10021",
    hours: "Monday – Friday: 8:30 AM – 6:00 PM EST",
  },
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
};
