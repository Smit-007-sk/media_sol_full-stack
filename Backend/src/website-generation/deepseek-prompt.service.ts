import { Injectable } from '@nestjs/common';
import { WebsiteRequest } from '@prisma/client';

export interface DesignProfile {
  direction: string;
  personality: string;
  layoutPhilosophy: string;
  navigationStyle: string;
  heroComposition: string;
  sectionArchitecture: {
    name: string;
    sequence: string[];
    description: string;
  };
  gridStrategy: string;
  typographyDirection: string;
  colorPhilosophy: {
    name: string;
    primaryBg: string;
    secondaryBg: string;
    textColor: string;
    mutedText: string;
    accent: string;
    secondaryAccent: string;
    border: string;
    cta: string;
    description: string;
  };
  cardLanguage: string;
  buttonLanguage: string;
  imageTreatment: string;
  footerStrategy: string;
  interactionStyle: string;
  responsiveStrategy: string;
  visualFingerprint: string[];
  variation: number;
}

interface CoherentDesignConfig {
  architectures: Array<{
    name: string;
    sequence: string[];
    description: string;
  }>;
  heroes: string[];
  navigations: string[];
  grids: string[];
  typographies: string[];
  colors: Array<{
    name: string;
    primaryBg: string;
    secondaryBg: string;
    textColor: string;
    mutedText: string;
    accent: string;
    secondaryAccent: string;
    border: string;
    cta: string;
    description: string;
  }>;
  cards: string[];
  buttons: string[];
  footers: string[];
  imageTreatments: string[];
  interactions: string[];
  responsiveStrategies: string[];
  personalities: string[];
  layoutPhilosophies: string[];
}

@Injectable()
export class DeepseekPromptService {
  /**
   * Fast, reliable string hashing (djb2 variant) returning a positive 32-bit integer.
   */
  private hashString(str: string): number {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  // ============================================================================
  // MASTER CATALOGS OF DESIGN TOKENS & ATOMS
  // ============================================================================

  private readonly MASTER_ARCHITECTURES = {
    ARCH_A: {
      name: 'Structure A: Editorial Curated Index',
      sequence: ['Editorial Topbar', 'Asymmetric Typography Hero', 'Curated Trust Strip', 'Featured Service Index', 'Visual Showcase Story', 'Client Case/Proof', 'Editorial Inset CTA', 'Bespoke Column Footer'],
      description: 'Magazine-like hierarchy prioritizing narrative flow, asymmetric imagery, and refined text blocks.',
    },
    ARCH_B: {
      name: 'Structure B: Split Story & Process Timeline',
      sequence: ['Minimal Floating Nav', 'Split Screen Dual Hero', 'Brand Manifesto / Story', 'Core Practice/Service Matrix', 'Step-by-Step Process Timeline', 'Visual Media Collage', 'Consultation Inquiry Form', 'Minimal Architectural Footer'],
      description: 'Dual-panel hero flowing into a structured timeline and media collage, ideal for high-trust storytelling.',
    },
    ARCH_C: {
      name: 'Structure C: Immersive Visual Showcase',
      sequence: ['Transparent Overlay Nav', 'Full-Screen Cinematic Hero', 'Floating Quick-Jump Bar', 'Visual Experience Highlights', 'Interactive Service Cards', 'Customer Story Mosaic', 'High-Impact Booking CTA', 'Dark Immersive Footer'],
      description: 'Atmospheric, high-impact imagery leading into floating service selectors and rich visual storytelling.',
    },
    ARCH_D: {
      name: 'Structure D: Interactive Bento & Filter Matrix',
      sequence: ['Announcement Header + Clean Nav', 'Bento Box Headline Hero', 'Key Benefits Grid', 'Interactive Offering Tabs', 'Visual Proof Gallery', 'Interactive FAQ Accordion', 'Direct Action Intake Panel', 'Clean Multi-Column Footer'],
      description: 'Structured bento grid presentation with tabbed interactive content blocks and structured proof.',
    },
    ARCH_E: {
      name: 'Structure E: Bold Statement & Feature Mosaic',
      sequence: ['Compact Brand Nav', 'Large Typographic Manifesto Hero', 'Full-Width Feature Carousel/Scroll', 'Key Differentiators Bento', 'Founder Story / Philosophy', 'Social Proof Grid', 'Prominent Next-Step CTA', 'Bold Branded Footer'],
      description: 'Typographic punch with wide horizontal spans and structured differentiator panels.',
    },
    ARCH_F: {
      name: 'Structure F: Sticky Side-Panel Architecture',
      sequence: ['Sidebar / Fixed Rail Nav', 'Offset Hero with Overlapping Elements', 'Structured Offerings List', 'Numbered Process Milestones', 'Visual Portfolio Row', 'Direct Contact Drawer', 'Compact Utility Footer'],
      description: 'Unconventional layout utilizing offset framing, numbered milestone lists, and compact side controls.',
    },
    ARCH_G: {
      name: 'Structure G: Swiss Precision & Technical Matrix',
      sequence: ['Strict Geometric Topbar', 'Mathematical Grid Hero with Stat Badges', 'Standardized Capability Matrix', 'Detailed Specification / Scope Row', 'Structured Quality Proof', 'Direct Consultation Intake', 'Comprehensive Swiss Footer'],
      description: 'Strict modular grid lines, high-contrast monochrome hierarchy, and data-dense capability cards.',
    },
    ARCH_H: {
      name: 'Structure H: Warm Artisanal Story & Craft Gallery',
      sequence: ['Organic Centered Nav', 'Warm Visual Cover Hero', 'Origin Story & Values', 'Crafted Offerings Catalog', 'Behind-the-Scenes Mosaic', 'Client Notes & Praise', 'Personalized Connection Form', 'Warm Earthy Footer'],
      description: 'Tactile, organic shapes with warm typography, storytelling origin sections, and handcrafted card framing.',
    },
  };

  private readonly MASTER_HEROES = {
    HERO_SPLIT_MEDIA: 'Split-screen with bold left headline & right featured floating media container',
    HERO_OVERSIZED_EDITORIAL: 'Centered oversized editorial typography with delicate sub-headline and dual pill CTAs',
    HERO_ASYMMETRIC_CANVAS: 'Asymmetric hero with text overlapping a framed visual canvas and floating badge',
    HERO_FULLBLEED_GLASS: 'Full-bleed immersive background atmosphere with high-contrast centered glass card',
    HERO_BENTO_MULTI: 'Bento-style multi-cell hero featuring headline, quick stat badge, and preview media',
    HERO_MINIMAL_MANIFESTO: 'Minimal text-only manifesto hero with generous whitespace and interactive down-indicator',
    HERO_DIAGONAL_DYNAMIC: 'Diagonal dynamic composition with angled background partition and offset card',
    HERO_SIDE_GOLDEN: 'Side-by-side golden ratio layout (60% content, 40% high-definition media frame)',
    HERO_STACKED_EDITORIAL: 'Stacked editorial cover hero with top full-width headline and three preview cards below',
    HERO_FLOATING_CANVAS: 'Floating card hero: elevated container hovering over subtle textured canvas',
    HERO_STICKY_SPLIT: 'Horizontal split hero with sticky text column and scrolling media preview',
    HERO_TYPOGRAPHIC_MARQUEE: 'Typographic marquee hero with high-contrast headline banner and immediate action button',
    HERO_FRAMED_PORTRAIT: 'Framed portrait hero with refined borders, subtle drop shadow, and clean caption tag',
    HERO_SWISS_GRID: 'Swiss strict grid hero with monochrome dividers, numerical indexes, and clean CTAs',
    HERO_WARM_VISUAL: 'Warm visual cover hero with handcrafted badge, organic image framing, and soft invite CTA',
  };

  private readonly MASTER_COLORS = {
    WARM_LUXURY: {
      name: 'Warm Luxury & Champagne',
      primaryBg: '#0F172A',
      secondaryBg: '#1E293B',
      textColor: '#F8FAFC',
      mutedText: '#94A3B8',
      accent: '#FA8373',
      secondaryAccent: '#F59E0B',
      border: 'rgba(255, 255, 255, 0.1)',
      cta: '#FA8373',
      description: 'Sophisticated deep slate background with warm peach/coral accents and champagne gold highlights.',
    },
    MINIMAL_NORDIC: {
      name: 'Minimal Nordic Light',
      primaryBg: '#FFFFFF',
      secondaryBg: '#F8FAFC',
      textColor: '#0F172A',
      mutedText: '#64748B',
      accent: '#2563EB',
      secondaryAccent: '#38BDF8',
      border: '#E2E8F0',
      cta: '#0F172A',
      description: 'Crisp white surfaces, extreme whitespace, slate typography, and electric cobalt focus accents.',
    },
    DARK_CINEMATIC: {
      name: 'Dark Cinematic Velvet',
      primaryBg: '#0A0D14',
      secondaryBg: '#121824',
      textColor: '#FFFFFF',
      mutedText: '#8E9BAE',
      accent: '#FA8373',
      secondaryAccent: '#818CF8',
      border: 'rgba(255, 255, 255, 0.08)',
      cta: '#FA8373',
      description: 'Midnight obsidian canvas with glowing warm ember accents, soft velvet card backgrounds, and atmospheric depth.',
    },
    ORGANIC_EARTH: {
      name: 'Organic Earth & Sage',
      primaryBg: '#FAF8F5',
      secondaryBg: '#F0ECE4',
      textColor: '#2D312E',
      mutedText: '#666C67',
      accent: '#4A6B53',
      secondaryAccent: '#D97706',
      border: '#E5DFD5',
      cta: '#3D5A44',
      description: 'Soft linen paper background, calming sage green accents, terracotta highlights, and warm organic charcoal text.',
    },
    SWISS_MONOCHROME: {
      name: 'Swiss Monochrome & Cobalt',
      primaryBg: '#FFFFFF',
      secondaryBg: '#F1F5F9',
      textColor: '#09090B',
      mutedText: '#52525B',
      accent: '#0052FF',
      secondaryAccent: '#18181B',
      border: '#E4E4E7',
      cta: '#0052FF',
      description: 'High-contrast monochrome foundation with laser-precise international Klein blue interactive triggers.',
    },
    NEO_BRUTALIST: {
      name: 'Neo-Brutalist High Contrast',
      primaryBg: '#FFFDF9',
      secondaryBg: '#FFF3D6',
      textColor: '#000000',
      mutedText: '#333333',
      accent: '#FF5C35',
      secondaryAccent: '#FFE600',
      border: '#000000',
      cta: '#FF5C35',
      description: 'Creamy high-contrast canvas with solid 2px black borders, hard offset shadows, and vibrant fiery coral highlights.',
    },
    CORP_NAVY: {
      name: 'Corporate Executive Navy',
      primaryBg: '#F8FAFC',
      secondaryBg: '#FFFFFF',
      textColor: '#0F172A',
      mutedText: '#475569',
      accent: '#0369A1',
      secondaryAccent: '#0D9488',
      border: '#CBD5E1',
      cta: '#0369A1',
      description: 'Refined executive palette with deep navy structural accents, crisp card elevations, and seafoam teal credibility markers.',
    },
    ELECTRIC_NEON: {
      name: 'Electric Neon & Dark Glass',
      primaryBg: '#05070E',
      secondaryBg: '#0D1322',
      textColor: '#F1F5F9',
      mutedText: '#94A3B8',
      accent: '#6366F1',
      secondaryAccent: '#EC4899',
      border: 'rgba(99, 102, 241, 0.2)',
      cta: '#6366F1',
      description: 'Ultra-dark futuristic glass background with violet-indigo glow gradients, translucent overlays, and pink neon sparks.',
    },
  };

  /**
   * Industry category matching to prioritized design direction pool.
   * Index 0 is the most authentic, tailored direction for the industry.
   */
  private getCompatibleDirections(category: string, businessName: string): string[] {
    const text = `${category} ${businessName}`.toLowerCase();

    // Beauty / Salon / Spa / Nails / Hair / Wellness
    if (/salon|nail|beauty|spa|hair|barber|wellness|skin|cosmetic|lash|massage/.test(text)) {
      return [
        'Luxury / Premium',
        'Luxury Editorial',
        'Organic / Natural',
        'Editorial / Magazine',
        'Minimal Scandinavian',
        'Playful / Vibrant',
      ];
    }

    // Restaurant / Food / Dining / Cafe / Bakery / Bar / Catering
    if (/restaurant|cafe|coffee|dining|food|bakery|bar|bistro|catering|pub|kitchen|grill|eatery|culinary/.test(text)) {
      return [
        'Artisanal / Handmade',
        'Dark Cinematic',
        'Organic / Natural',
        'Editorial / Magazine',
        'Luxury / Premium',
        'Luxury Editorial',
      ];
    }

    // Law / Legal / Finance / Accounting / Consulting / Insurance / Corporate
    if (/law|legal|attorney|lawyer|advocate|finance|financial|account|tax|consult|insurance|wealth|advis|corporate|audit/.test(text)) {
      return [
        'Corporate Executive',
        'Swiss / Grid-Based',
        'Editorial / Magazine',
        'Luxury / Premium',
        'Minimal Scandinavian',
      ];
    }

    // Gym / Fitness / Sports / Athletics / Martial Arts / Crossfit
    if (/gym|fitness|crossfit|workout|trainer|athletics|sport|martial|boxing|yoga|pilates|active/.test(text)) {
      return [
        'Neo-Brutalist',
        'Bold Creative Studio',
        'Dark Cinematic',
        'Product Showcase',
        'Swiss / Grid-Based',
      ];
    }

    // Photography / Videography / Studio / Art / Portfolio / Creative
    if (/photo|camera|studio|video|cinema|art|artist|creative|portfolio|film|production|gallery/.test(text)) {
      return [
        'Portfolio / Gallery',
        'Dark Cinematic',
        'Luxury Editorial',
        'Minimal Scandinavian',
        'Editorial / Magazine',
        'Bold Creative Studio',
      ];
    }

    // Tech / Software / SaaS / AI / Cloud / IT / Digital / Agency / Startup
    if (/tech|software|saas|app|cloud|ai|it|digital|startup|agency|cyber|data|code|dev|analytics|network/.test(text)) {
      return [
        'Modern SaaS',
        'Glass / Futuristic',
        'Swiss / Grid-Based',
        'Minimal Scandinavian',
        'Bold Creative Studio',
        'Dark Cinematic',
      ];
    }

    // Real Estate / Architecture / Interior / Construction
    if (/estate|realty|property|architect|interior|decor|construct|builder|renovat|home/.test(text)) {
      return [
        'Luxury / Premium',
        'Corporate Executive',
        'Swiss / Grid-Based',
        'Luxury Editorial',
        'Editorial / Magazine',
        'Minimal Scandinavian',
      ];
    }

    // Healthcare / Medical / Clinic / Dental / Therapy / Pharmacy
    if (/health|medical|clinic|doctor|dent|therap|hospital|care|pharma|physio/.test(text)) {
      return [
        'Minimal Scandinavian',
        'Corporate Executive',
        'Organic / Natural',
        'Swiss / Grid-Based',
      ];
    }

    // Artisanal / Handcrafted / Jewelry / Fashion / Boutique / Crafts
    if (/artisan|craft|handmade|jewelry|fashion|boutique|tailor|leather|pottery|gift/.test(text)) {
      return [
        'Artisanal / Handmade',
        'Organic / Natural',
        'Luxury Editorial',
        'Product Showcase',
        'Editorial / Magazine',
      ];
    }

    // Global pool of all 16 directions for general or unclassified requests
    return [
      'Editorial / Magazine',
      'Luxury / Premium',
      'Modern SaaS',
      'Neo-Brutalist',
      'Glass / Futuristic',
      'Minimal Scandinavian',
      'Bold Creative Studio',
      'Organic / Natural',
      'Dark Cinematic',
      'Swiss / Grid-Based',
      'Playful / Vibrant',
      'Corporate Executive',
      'Artisanal / Handmade',
      'Luxury Editorial',
      'Product Showcase',
      'Portfolio / Gallery',
    ];
  }

  /**
   * Direction Coherence Configuration Map.
   * Every Design Direction strictly maps ONLY to compatible, visually coherent design tokens.
   */
  private getCoherentConfig(direction: string): CoherentDesignConfig {
    const { ARCH_A, ARCH_B, ARCH_C, ARCH_D, ARCH_E, ARCH_F, ARCH_G, ARCH_H } = this.MASTER_ARCHITECTURES;
    const {
      HERO_SPLIT_MEDIA,
      HERO_OVERSIZED_EDITORIAL,
      HERO_ASYMMETRIC_CANVAS,
      HERO_FULLBLEED_GLASS,
      HERO_BENTO_MULTI,
      HERO_MINIMAL_MANIFESTO,
      HERO_DIAGONAL_DYNAMIC,
      HERO_SIDE_GOLDEN,
      HERO_STACKED_EDITORIAL,
      HERO_FLOATING_CANVAS,
      HERO_TYPOGRAPHIC_MARQUEE,
      HERO_FRAMED_PORTRAIT,
      HERO_SWISS_GRID,
      HERO_WARM_VISUAL,
    } = this.MASTER_HEROES;
    const {
      WARM_LUXURY,
      MINIMAL_NORDIC,
      DARK_CINEMATIC,
      ORGANIC_EARTH,
      SWISS_MONOCHROME,
      NEO_BRUTALIST,
      CORP_NAVY,
      ELECTRIC_NEON,
    } = this.MASTER_COLORS;

    switch (direction) {
      case 'Artisanal / Handmade':
        return {
          architectures: [ARCH_H, ARCH_B],
          heroes: [HERO_WARM_VISUAL, HERO_FRAMED_PORTRAIT],
          navigations: [
            'Centered logo navigation with split left/right navigation links and warm borders',
            'Editorial top navigation featuring serif brand lettering and thin horizontal rule',
          ],
          grids: [
            'Masonry-style visual collage with staggered card elevations and subtle hover scaling',
            'Alternating full-width split panels (Left Image + Right Text, then Right Image + Left Text)',
          ],
          typographies: [
            'Warm Artisanal: Soft rounded headings (Outfit / Quicksand) paired with warm readable body text',
          ],
          colors: [ORGANIC_EARTH],
          cards: [
            'Soft Pill: extra-rounded 24px corners, warm off-white background, subtle pastel hover border glow',
            'Editorial Framed: thin horizontal dividers, no enclosed boxes, generous vertical spacing, typography-led',
          ],
          buttons: [
            'Editorial Arrow Link: text-link with animated expanding underline and trailing SVG arrow (→) that shifts on hover',
            'Sharp Modern: 4px crisp corner radius, solid brand color, subtle top-highlight border, high-contrast text',
          ],
          footers: [
            'Artisanal Warm Footer: warm background, handwritten/script brand accent, personal sign-off, and verified details',
          ],
          imageTreatments: [
            'Refined rounded frames (border-radius: 20px) with subtle warm border outline and soft shadow depth',
            'Asymmetric floating masks with offset decorative background shapes and subtle shadow depth',
          ],
          interactions: [
            'Gentle image zoom (transform: scale(1.04)) contained within overflow: hidden card wrappers',
            'Elegant animated link underlines that expand from left to right on hover using CSS ::after pseudo-elements',
          ],
          responsiveStrategies: [
            'Fluid collapse: multi-column desktop grids gracefully convert to single-column stacked cards with 16px horizontal gutters',
          ],
          personalities: ['Warm', 'Handcrafted', 'Authentic', 'Storytelling'],
          layoutPhilosophies: [
            'Tactile and human-centric story architecture guiding clients through origin, craftsmanship, and personal connection.',
          ],
        };

      case 'Portfolio / Gallery':
        return {
          architectures: [ARCH_C, ARCH_F],
          heroes: [HERO_FULLBLEED_GLASS, HERO_STACKED_EDITORIAL],
          navigations: [
            'Transparent minimal header overlaid seamlessly across the hero section',
            'Floating rounded pill navigation with blur backdrop (glassmorphism) and centered links',
          ],
          grids: [
            'Horizontal card strip with clean touch-swipe support and completely hidden scrollbar (zero visible scrollbar)',
            'Masonry-style visual collage with staggered card elevations and subtle hover scaling',
          ],
          typographies: [
            'High-Impact Modern: Syne / Cabinet Grotesk style dynamic headings + clean utility body font',
            'Luxury Elegance: High-contrast display serif (Cormorant Garamond / Bodoni) + Ultra-clean minimal sans body',
          ],
          colors: [DARK_CINEMATIC, SWISS_MONOCHROME],
          cards: [
            'Image-First Container: full-bleed background image with dark bottom gradient scrim and white bottom-aligned text',
            'Floating Glass: semi-transparent backdrop blur, soft 1px glow border, subtle hover elevation translateY(-4px)',
          ],
          buttons: [
            'Outlined Ghost: transparent background, 1.5px border matching accent color, fills with solid color on hover',
            'Editorial Arrow Link: text-link with animated expanding underline and trailing SVG arrow (→) that shifts on hover',
          ],
          footers: [
            'Dark Immersive Footer: rich contrasting background, newsletter/intake input, social icons, and legal disclaimers',
          ],
          imageTreatments: [
            'Cinematic full-width visual bands with dark vignette overlays and overlaid typographic text',
            'Clean geometric cards with 1:1 and 16:9 aspect-ratio framing and subtle grayscale-to-color hover transition',
          ],
          interactions: [
            'Smooth card hover lift (translateY -4px) with soft shadow intensification and button scale effect',
          ],
          responsiveStrategies: [
            'Horizontal touch scroll on mobile for showcase/gallery cards, converting to multi-column grid on desktop (>=768px)',
          ],
          personalities: ['Visual-First', 'Immersive', 'Cinematic', 'Minimalist'],
          layoutPhilosophies: [
            'Visual-first immersion where high-resolution imagery and spacious typography command attention without UI clutter.',
          ],
        };

      case 'Neo-Brutalist':
        return {
          architectures: [ARCH_E, ARCH_D],
          heroes: [HERO_TYPOGRAPHIC_MARQUEE, HERO_DIAGONAL_DYNAMIC],
          navigations: [
            'Strict geometric monochrome topbar with micro-spaced typography and 1px crisp border',
            'Full-width topbar with solid 2px divider border and prominent high-contrast contact button',
          ],
          grids: [
            'Modern Bento grid layout combining variable-width cards (1-col, 2-col, 3-col spans)',
            'Numbered card sequence with large decorative numeral watermarks (01, 02, 03, 04)',
          ],
          typographies: [
            'Bold Brutalist: Heavy condensed uppercase headings (Impact / Anton / Archivo Black) + Monospace details (Space Mono)',
          ],
          colors: [NEO_BRUTALIST],
          cards: [
            'Neo-Brutalist: solid black 2px border, 4px solid black hard drop shadow (box-shadow: 4px 4px 0 #000), 0px rounded corners',
            'Bento Solid: solid contrasting background, thick 16px corner radius, bold title font, clear icon accent badge',
          ],
          buttons: [
            'Neo-Brutalist Button: 0px border-radius, 2px solid black outline, 3px hard black shadow, pressed down on active',
            'Oversized Action Block: large padded CTA button with sub-label and bold icon for maximum conversion clarity',
          ],
          footers: [
            'High-Impact CTA Footer: massive "Ready to begin?" headline with direct WhatsApp and Call buttons',
          ],
          imageTreatments: [
            'Clean geometric cards with solid 2px black border outline and zero corner radius',
          ],
          interactions: [
            'Tactile button active states with translateY(2px) and shadow collapse feedback for authentic physical feel',
          ],
          responsiveStrategies: [
            'Fluid collapse: multi-column desktop grids gracefully convert to single-column stacked cards with 16px horizontal gutters',
          ],
          personalities: ['Bold', 'Raw', 'High-Contrast', 'Unapologetic'],
          layoutPhilosophies: [
            'High-energy, uncompromising visual impact with stark outlines, punchy headlines, and zero decorative fluff.',
          ],
        };

      case 'Luxury / Premium':
        return {
          architectures: [ARCH_A, ARCH_C],
          heroes: [HERO_OVERSIZED_EDITORIAL, HERO_ASYMMETRIC_CANVAS],
          navigations: [
            'Editorial top navigation featuring serif brand lettering and thin horizontal rule',
            'Floating rounded pill navigation with blur backdrop (glassmorphism) and centered links',
          ],
          grids: [
            'Editorial magazine layout with multi-column text flow, drop-caps, and inline image callouts',
            'Asymmetric 12-column grid with alternating content offsets and large visual anchors',
          ],
          typographies: [
            'Luxury Elegance: High-contrast display serif (Cormorant Garamond / Bodoni) + Ultra-clean minimal sans body',
            'Editorial Pairing: Serif headings (Playfair Display / Merriweather) + Crisp Sans body (Plus Jakarta Sans)',
          ],
          colors: [WARM_LUXURY, DARK_CINEMATIC],
          cards: [
            'Floating Glass: semi-transparent backdrop blur, soft 1px glow border, subtle hover elevation translateY(-4px)',
            'Editorial Framed: thin horizontal dividers, no enclosed boxes, generous vertical spacing, typography-led',
          ],
          buttons: [
            'Pill Solid: full border-radius (9999px), high-contrast background, bold text, smooth scale(1.02) hover state',
            'Editorial Arrow Link: text-link with animated expanding underline and trailing SVG arrow (→) that shifts on hover',
          ],
          footers: [
            'Editorial Large Footer: oversized brand logo headline, multi-column navigation, and clean bottom copyright row',
          ],
          imageTreatments: [
            'Refined rounded frames (border-radius: 16px) with subtle 1px border outline and smooth scale(1.03) hover zoom',
          ],
          interactions: [
            'Elegant animated link underlines that expand from left to right on hover using CSS ::after pseudo-elements',
          ],
          responsiveStrategies: [
            'Adaptive typographic scaling using clamp(1.75rem, 5vw, 3.25rem) for seamless fluid display on 320px to 1920px screens',
          ],
          personalities: ['Refined', 'Prestige', 'Opulent', 'Bespoke'],
          layoutPhilosophies: [
            'Sophisticated editorial balance pairing generous whitespace with meticulous typographic contrast and velvet textures.',
          ],
        };

      case 'Luxury Editorial':
        return {
          architectures: [ARCH_A, ARCH_C],
          heroes: [HERO_ASYMMETRIC_CANVAS, HERO_OVERSIZED_EDITORIAL],
          navigations: [
            'Editorial top navigation featuring serif brand lettering and thin horizontal rule',
            'Transparent minimal header overlaid seamlessly across the hero section',
          ],
          grids: [
            'Editorial magazine layout with multi-column text flow, drop-caps, and inline image callouts',
            'Asymmetric 12-column grid with alternating content offsets and large visual anchors',
          ],
          typographies: [
            'Luxury Elegance: High-contrast display serif (Cormorant Garamond / Bodoni) + Ultra-clean minimal sans body',
          ],
          colors: [WARM_LUXURY, DARK_CINEMATIC],
          cards: [
            'Editorial Framed: thin horizontal dividers, no enclosed boxes, generous vertical spacing, typography-led',
            'Floating Glass: semi-transparent backdrop blur, soft 1px glow border, subtle hover elevation translateY(-4px)',
          ],
          buttons: [
            'Editorial Arrow Link: text-link with animated expanding underline and trailing SVG arrow (→) that shifts on hover',
            'Pill Solid: full border-radius (9999px), high-contrast background, bold text, smooth scale(1.02) hover state',
          ],
          footers: [
            'Editorial Large Footer: oversized brand logo headline, multi-column navigation, and clean bottom copyright row',
          ],
          imageTreatments: [
            'Refined rounded frames (border-radius: 16px) with subtle 1px border outline and smooth scale(1.03) hover zoom',
          ],
          interactions: [
            'Elegant animated link underlines that expand from left to right on hover using CSS ::after pseudo-elements',
          ],
          responsiveStrategies: [
            'Adaptive typographic scaling using clamp(1.75rem, 5vw, 3.25rem) for seamless fluid display on 320px to 1920px screens',
          ],
          personalities: ['Haute', 'Exclusive', 'Artistic', 'Refined'],
          layoutPhilosophies: [
            'Editorial showcase focusing on delicate type hierarchy, high-contrast imagery, and refined visual pacing.',
          ],
        };

      case 'Swiss / Grid-Based':
        return {
          architectures: [ARCH_G, ARCH_D],
          heroes: [HERO_SWISS_GRID, HERO_MINIMAL_MANIFESTO],
          navigations: [
            'Strict geometric monochrome topbar with micro-spaced typography and 1px crisp border',
            'Full-width topbar with subtle bottom divider border and prominent contact button',
          ],
          grids: [
            'Strict Swiss 3-column mathematical grid with crisp 1px borders and high alignment',
            'Numbered card sequence with large decorative numeral watermarks (01, 02, 03, 04)',
          ],
          typographies: [
            'Swiss International: Neo-grotesk typography (Inter / Helvetica Neue) with strict mathematical scale and high hierarchy',
          ],
          colors: [SWISS_MONOCHROME, MINIMAL_NORDIC],
          cards: [
            'Bordered Minimal: 1px subtle border, zero heavy shadow, clean 12px rounded corners, generous inner padding',
            'Numbered Tile: large muted index numeral in top-right corner with strong headline and action link',
          ],
          buttons: [
            'Sharp Modern: 4px crisp corner radius, solid brand color, subtle top-highlight border, high-contrast text',
            'Outlined Ghost: transparent background, 1.5px border matching accent color, fills with solid color on hover',
          ],
          footers: [
            'Swiss Structured Footer: strict grid layout with categorized service links, business hours, and interactive map link',
          ],
          imageTreatments: [
            'Clean geometric cards with 1:1 and 16:9 aspect-ratio framing and subtle grayscale-to-color hover transition',
          ],
          interactions: [
            'Focus-visible accessibility rings with crisp 2px colored outlines for keyboard navigability',
          ],
          responsiveStrategies: [
            'Fluid collapse: multi-column desktop grids gracefully convert to single-column stacked cards with 16px horizontal gutters',
          ],
          personalities: ['Rigorous', 'Systematic', 'Mathematical', 'Ultra-Clean'],
          layoutPhilosophies: [
            'Mathematical precision where geometric grids, uniform borders, and objective hierarchy create effortless clarity.',
          ],
        };

      case 'Modern SaaS':
        return {
          architectures: [ARCH_D, ARCH_G],
          heroes: [HERO_BENTO_MULTI, HERO_FLOATING_CANVAS],
          navigations: [
            'Floating rounded pill navigation with blur backdrop (glassmorphism) and centered links',
            'Left brand logo + right clean inline navigation links + bold pill action CTA',
          ],
          grids: [
            'Modern Bento grid layout combining variable-width cards (1-col, 2-col, 3-col spans)',
            'Asymmetric 12-column grid with alternating content offsets and large visual anchors',
          ],
          typographies: [
            'Modern SaaS / Tech: Geometric Sans-Serif (Plus Jakarta Sans / Outfit) with bold weights and tight letter-spacing',
          ],
          colors: [ELECTRIC_NEON, MINIMAL_NORDIC],
          cards: [
            'Bento Solid: solid contrasting background, thick 16px corner radius, bold title font, clear icon accent badge',
            'Floating Glass: semi-transparent backdrop blur, soft 1px glow border, subtle hover elevation translateY(-4px)',
          ],
          buttons: [
            'Dual CTA Pair: Primary solid brand button paired with clean secondary ghost/text button with gap-4 spacing',
            'Pill Solid: full border-radius (9999px), high-contrast background, bold text, smooth scale(1.02) hover state',
          ],
          footers: [
            'Direct Action Footer: prominent final booking/inquiry banner followed by clean 3-column contact links',
          ],
          imageTreatments: [
            'Refined rounded frames (border-radius: 16px) with subtle 1px border outline and smooth scale(1.03) hover zoom',
          ],
          interactions: [
            'Interactive service switcher tabs with smooth fade-in transitions for active content panels',
          ],
          responsiveStrategies: [
            'Fluid collapse: multi-column desktop grids gracefully convert to single-column stacked cards with 16px horizontal gutters',
          ],
          personalities: ['Modern', 'Dynamic', 'High-Conversion', 'Innovative'],
          layoutPhilosophies: [
            'Bento-first modular interface engineered for instant product comprehension, interactive exploration, and frictionless conversion.',
          ],
        };

      case 'Corporate Executive':
        return {
          architectures: [ARCH_B, ARCH_G],
          heroes: [HERO_SPLIT_MEDIA, HERO_SIDE_GOLDEN],
          navigations: [
            'Full-width topbar with subtle bottom divider border and prominent contact button',
            'Left brand logo + right clean inline navigation links + bold pill action CTA',
          ],
          grids: [
            'Alternating full-width split panels (Left Image + Right Text, then Right Image + Left Text)',
            'Strict Swiss 3-column mathematical grid with crisp 1px borders and high alignment',
          ],
          typographies: [
            'Swiss International: Neo-grotesk typography (Inter / Helvetica Neue) with strict mathematical scale and high hierarchy',
          ],
          colors: [CORP_NAVY],
          cards: [
            'Bordered Minimal: 1px subtle border, zero heavy shadow, clean 12px rounded corners, generous inner padding',
            'Numbered Tile: large muted index numeral in top-right corner with strong headline and action link',
          ],
          buttons: [
            'Sharp Modern: 4px crisp corner radius, solid brand color, subtle top-highlight border, high-contrast text',
            'Dual CTA Pair: Primary solid brand button paired with clean secondary ghost/text button with gap-4 spacing',
          ],
          footers: [
            'Executive Corporate Footer: structured credibility badges, complete contact address, phone, email, and navigation',
          ],
          imageTreatments: [
            'Clean geometric cards with 1:1 and 16:9 aspect-ratio framing and subtle grayscale-to-color hover transition',
          ],
          interactions: [
            'Subtle accordion expand/collapse transitions with rotating chevron icons for FAQ/details',
          ],
          responsiveStrategies: [
            'Fluid collapse: multi-column desktop grids gracefully convert to single-column stacked cards with 16px horizontal gutters',
          ],
          personalities: ['Authoritative', 'Institutional', 'Credible', 'Prestigious'],
          layoutPhilosophies: [
            'Executive credibility and trust architecture focusing on process clarity, verified credentials, and institutional stature.',
          ],
        };

      case 'Organic / Natural':
        return {
          architectures: [ARCH_H, ARCH_A],
          heroes: [HERO_WARM_VISUAL, HERO_FRAMED_PORTRAIT],
          navigations: [
            'Centered logo navigation with split left/right navigation links and warm borders',
          ],
          grids: [
            'Alternating full-width split panels (Left Image + Right Text, then Right Image + Left Text)',
          ],
          typographies: [
            'Warm Artisanal: Soft rounded headings (Outfit / Quicksand) paired with warm readable body text',
          ],
          colors: [ORGANIC_EARTH],
          cards: [
            'Soft Pill: extra-rounded 24px corners, warm off-white background, subtle pastel hover border glow',
          ],
          buttons: [
            'Editorial Arrow Link: text-link with animated expanding underline and trailing SVG arrow (→) that shifts on hover',
          ],
          footers: [
            'Artisanal Warm Footer: warm background, handwritten/script brand accent, personal sign-off, and verified details',
          ],
          imageTreatments: [
            'Refined rounded frames (border-radius: 20px) with subtle warm border outline and soft shadow depth',
          ],
          interactions: [
            'Gentle image zoom (transform: scale(1.04)) contained within overflow: hidden card wrappers',
          ],
          responsiveStrategies: [
            'Fluid collapse: multi-column desktop grids gracefully convert to single-column stacked cards with 16px horizontal gutters',
          ],
          personalities: ['Earthy', 'Tranquil', 'Botanical', 'Wholesome'],
          layoutPhilosophies: [
            'Harmonious botanical balance pairing organic paper textures with soothing natural palettes and human warmth.',
          ],
        };

      default:
        return {
          architectures: [ARCH_E, ARCH_C, ARCH_D, ARCH_B],
          heroes: [HERO_TYPOGRAPHIC_MARQUEE, HERO_DIAGONAL_DYNAMIC, HERO_FULLBLEED_GLASS, HERO_STACKED_EDITORIAL],
          navigations: [
            'Floating rounded pill navigation with blur backdrop (glassmorphism) and centered links',
            'Left brand logo + right clean inline navigation links + bold pill action CTA',
          ],
          grids: [
            'Asymmetric 12-column grid with alternating content offsets and large visual anchors',
            'Modern Bento grid layout combining variable-width cards (1-col, 2-col, 3-col spans)',
          ],
          typographies: [
            'High-Impact Modern: Syne / Cabinet Grotesk style dynamic headings + clean utility body font',
          ],
          colors: [DARK_CINEMATIC, ELECTRIC_NEON, WARM_LUXURY],
          cards: [
            'Floating Glass: semi-transparent backdrop blur, soft 1px glow border, subtle hover elevation translateY(-4px)',
          ],
          buttons: [
            'Pill Solid: full border-radius (9999px), high-contrast background, bold text, smooth scale(1.02) hover state',
          ],
          footers: [
            'High-Impact CTA Footer: massive "Ready to begin?" headline with direct WhatsApp and Call buttons',
          ],
          imageTreatments: [
            'Cinematic full-width visual bands with dark vignette overlays and overlaid typographic text',
          ],
          interactions: [
            'Smooth card hover lift (translateY -4px) with soft shadow intensification and button scale effect',
          ],
          responsiveStrategies: [
            'Fluid collapse: multi-column desktop grids gracefully convert to single-column stacked cards with 16px horizontal gutters',
          ],
          personalities: ['Expressive', 'Dynamic', 'Audacious', 'Engaging'],
          layoutPhilosophies: [
            'High-energy narrative flow built to captivate modern users and spark immediate interactive engagement.',
          ],
        };
    }
  }

  /**
   * Generates a comprehensive, highly deterministic, and visually coherent Design Profile.
   * Business -> Industry Compatibility Pool -> Design Direction -> Direction-Compatible Pools -> Final Blueprint
   */
  public generateDesignProfile(request: WebsiteRequest, variation = 0): DesignProfile {
    const requestId = request.id || 'default-request';
    const category = request.category?.trim() || 'Corporate / Business';
    const businessName = request.businessName?.trim() || 'Custom Business';

    const compatiblePool = this.getCompatibleDirections(category, businessName);

    // 1. Prioritized deterministic direction selection with variation cycling
    const direction = compatiblePool[variation % compatiblePool.length];

    // 2. Retrieve the strictly coherent design configuration for this direction
    const config = this.getCoherentConfig(direction);

    // 3. Deterministic subcomponent index calculation
    const archIndex = variation % config.architectures.length;
    const sectionArchitecture = config.architectures[archIndex];

    const heroIndex = variation % config.heroes.length;
    const heroComposition = config.heroes[heroIndex];

    const navIndex = variation % config.navigations.length;
    const navigationStyle = config.navigations[navIndex];

    const gridIndex = variation % config.grids.length;
    const gridStrategy = config.grids[gridIndex];

    const typoIndex = variation % config.typographies.length;
    const typographyDirection = config.typographies[typoIndex];

    const colorIndex = variation % config.colors.length;
    const colorPhilosophy = config.colors[colorIndex];

    const cardIndex = variation % config.cards.length;
    const cardLanguage = config.cards[cardIndex];

    const buttonIndex = variation % config.buttons.length;
    const buttonLanguage = config.buttons[buttonIndex];

    const footerIndex = variation % config.footers.length;
    const footerStrategy = config.footers[footerIndex];

    const imageTreatmentIndex = variation % config.imageTreatments.length;
    const imageTreatment = config.imageTreatments[imageTreatmentIndex];

    const interactionIndex = variation % config.interactions.length;
    const interactionStyle = config.interactions[interactionIndex];

    const responsiveIndex = variation % config.responsiveStrategies.length;
    const responsiveStrategy = config.responsiveStrategies[responsiveIndex];

    const personality = config.personalities.join(' • ');
    const layoutPhilosophy = config.layoutPhilosophies[variation % config.layoutPhilosophies.length];

    // 4. Holistic Visual Fingerprint synthesizing the entire unified design system
    const visualFingerprint = [
      `Design Direction Identity: "${direction}" visual personality with ${personality.toLowerCase()} aesthetic.`,
      `Bespoke Hero Architecture: ${heroComposition}.`,
      `Dedicated Structural Sequence: ${sectionArchitecture.name} with custom section flow.`,
      `Custom Grid Matrix: ${gridStrategy}.`,
      `Typographic Pairing: ${typographyDirection}.`,
      `Color Chemistry: ${colorPhilosophy.name} (${colorPhilosophy.description}).`,
      `Card & Surface Language: ${cardLanguage}.`,
      `Interactive CTA Signature: ${buttonLanguage}.`,
    ];

    return {
      direction,
      personality,
      layoutPhilosophy,
      navigationStyle,
      heroComposition,
      sectionArchitecture,
      gridStrategy,
      typographyDirection,
      colorPhilosophy,
      cardLanguage,
      buttonLanguage,
      imageTreatment,
      footerStrategy,
      interactionStyle,
      responsiveStrategy,
      visualFingerprint,
      variation,
    };
  }

  /**
   * Builds a comprehensive, professional, zero-fabrication prompt for DeepSeek
   * instructing it to generate standalone HTML5, CSS3, and Vanilla JavaScript
   * with a concrete, authoritative Design Blueprint and Anti-Repetition Quality Gate.
   */
  generatePrompt(request: WebsiteRequest, variation = 0): string {
    const businessName = request.businessName?.trim() || 'Custom Business';
    const clientName = request.fullName?.trim() || 'Valued Client';
    const email = request.email?.trim() || 'Not provided';
    const phone = request.phone?.trim() || 'Not provided';
    const whatsapp = request.alternatePhone?.trim() || 'Not provided';
    const category = request.category?.trim() || 'Corporate / Business';
    const description = request.description?.trim() || 'Not provided';
    const specialInstructions = request.specialInstructions?.trim() || 'None provided';

    // Social Links
    const socialLinks: string[] = [];
    if (request.instagram?.trim()) socialLinks.push(`- Instagram: ${request.instagram.trim()}`);
    if (request.facebook?.trim()) socialLinks.push(`- Facebook: ${request.facebook.trim()}`);
    if (request.linkedin?.trim()) socialLinks.push(`- LinkedIn: ${request.linkedin.trim()}`);
    const socialText = socialLinks.length > 0 ? socialLinks.join('\n') : '- No social media links provided';

    // Selected Features
    const features: string[] = Array.isArray(request.selectedFeatures)
      ? (request.selectedFeatures as string[])
      : [];
    const featuresText = features.length > 0
      ? features.map((f) => `- ${f}`).join('\n')
      : '- Standard clean business website sections';

    // Asset References
    const assetRefs = (request.assetReferences as any) || {};
    const logoAssets = Array.isArray(assetRefs.logoAssets) ? assetRefs.logoAssets : [];
    const bannerAssets = Array.isArray(assetRefs.bannerAssets) ? assetRefs.bannerAssets : [];

    const assetLines: string[] = [];
    if (logoAssets.length > 0) {
      assetLines.push(`- Company Logo: Available -> Use placeholder {{LOGO_URL}} in the <img> tag (Alt: "${businessName} Logo")`);
    } else {
      assetLines.push(`- Company Logo: None uploaded -> Render a clean, stylized typography brand logo for "${businessName}" with an optional matching inline SVG icon`);
    }

    if (bannerAssets.length > 0) {
      bannerAssets.forEach((asset: any, idx: number) => {
        assetLines.push(`- Image ${idx + 1} (${asset.fileName || `Showcase ${idx + 1}`}): Available -> Use placeholder {{IMAGE_${idx + 1}_URL}}`);
      });
    } else {
      assetLines.push(`- Gallery / Showcase Images: None uploaded -> Use clean CSS-based cards, stylized abstract geometric patterns, or high-contrast modern card containers with SVG icons`);
    }
    const assetsText = assetLines.join('\n');

    // Generate the concrete Design Profile & Blueprint
    const blueprint = this.generateDesignProfile(request, variation);

    const sectionSequenceLines = blueprint.sectionArchitecture.sequence
      .map((sec, idx) => `   ${idx + 1}. ${sec}`)
      .join('\n');

    const fingerprintLines = blueprint.visualFingerprint
      .map((item, idx) => `   ${idx + 1}. ${item}`)
      .join('\n');

    return `You are an elite, award-winning senior frontend web designer and developer specializing in creating high-converting, bespoke, visually stunning business websites.

Your objective is to design and code a complete, modern, production-grade website for "${businessName}".

CRITICAL INSTRUCTION: You MUST follow the explicit DESIGN BLUEPRINT and ANTI-TEMPLATE RULES below. Every generated website must have a genuinely distinct personality, layout structure, component composition, typography, and visual hierarchy.

================================================================================
1. CLIENT & BUSINESS BRIEF
================================================================================
- Business Name: ${businessName}
- Owner / Contact Person: ${clientName}
- Industry / Category: ${category}
- Business & Services Description:
${description}

================================================================================
2. CONTACT DETAILS & SOCIAL PROFILES
================================================================================
- Email: ${email}
- Primary Phone: ${phone}
- WhatsApp Number: ${whatsapp}
${socialText}

================================================================================
3. REQUESTED FEATURES & FUNCTIONALITY
================================================================================
${featuresText}

================================================================================
4. SPECIAL CLIENT INSTRUCTIONS & STYLING PREFERENCES
================================================================================
${specialInstructions}

================================================================================
5. AVAILABLE ASSETS & PLACEHOLDER RULES
================================================================================
${assetsText}

PLACEHOLDER INSTRUCTIONS:
- Do NOT invent fake external image URLs (like random Unsplash IDs or broken links).
- Use the exact placeholders {{LOGO_URL}}, {{IMAGE_1_URL}}, {{IMAGE_2_URL}}, {{IMAGE_3_URL}} where appropriate.
- If additional visual accents are needed, use inline SVG icons (Lucide/Heroicons style) or rich CSS styling (glassmorphism, gradient accents, modern border outlines).

================================================================================
6. STRICT TECHNOLOGY REQUIREMENTS
================================================================================
You must generate ONLY standard, vanilla static web files:
- HTML5 (Semantic, modern document structure)
- CSS3 (Vanilla CSS with CSS custom properties in :root, Flexbox, Grid, smooth transitions)
- Vanilla JavaScript (Clean, modern ES6+ with zero external library dependencies)

FORBIDDEN TECHNOLOGIES (DO NOT USE):
- NO React, Next.js, Vue, Angular, or Svelte
- NO Tailwind CSS, Bootstrap, or any CSS framework
- NO TypeScript or JSX
- NO npm packages, webpack, vite, or build tools
- NO external CDN dependencies that could break offline (Google Fonts & standard system font stacks are allowed)

The website must work instantly when opening index.html directly in any web browser.

================================================================================
7. ===== DESIGN BLUEPRINT ===== (AUTHORITATIVE DESIGN SPECIFICATION)
================================================================================
The following Design Blueprint has been deterministically engineered for this website. You MUST strictly adhere to this architectural specification:

- Design Direction:
  ${blueprint.direction}

- Visual Personality:
  ${blueprint.personality}

- Layout Philosophy:
  ${blueprint.layoutPhilosophy}

- Navigation Style:
  ${blueprint.navigationStyle}

- Hero Composition:
  ${blueprint.heroComposition}

- Section Architecture (${blueprint.sectionArchitecture.name}):
${sectionSequenceLines}
  Summary: ${blueprint.sectionArchitecture.description}

- Grid Strategy:
  ${blueprint.gridStrategy}

- Typography Direction:
  ${blueprint.typographyDirection}

- Color Philosophy (${blueprint.colorPhilosophy.name}):
  * Primary Background: ${blueprint.colorPhilosophy.primaryBg}
  * Secondary / Surface Background: ${blueprint.colorPhilosophy.secondaryBg}
  * Text Color: ${blueprint.colorPhilosophy.textColor}
  * Muted Text: ${blueprint.colorPhilosophy.mutedText}
  * Primary Accent: ${blueprint.colorPhilosophy.accent}
  * Secondary Accent: ${blueprint.colorPhilosophy.secondaryAccent}
  * Border Color: ${blueprint.colorPhilosophy.border}
  * CTA Button Color: ${blueprint.colorPhilosophy.cta}
  * Palette Description: ${blueprint.colorPhilosophy.description}

- Card Language:
  ${blueprint.cardLanguage}

- Button Language:
  ${blueprint.buttonLanguage}

- Image Treatment:
  ${blueprint.imageTreatment}

- Footer Strategy:
  ${blueprint.footerStrategy}

- Interaction Style:
  ${blueprint.interactionStyle}

- Responsive Strategy:
  ${blueprint.responsiveStrategy}

- Visual Fingerprint (Distinctive Signatures):
${fingerprintLines}

================================================================================
8. ===== ANTI-TEMPLATE MANDATES & QUALITY GATE =====
================================================================================
1. The Design Blueprint above is 100% AUTHORITATIVE. DeepSeek MUST follow its exact section architecture, hero composition, navigation style, and visual fingerprint.
2. DO NOT make this website look like a generic SaaS or default corporate template.
3. DO NOT reuse the formulaic: Navbar → Hero → About → Services → Testimonials → CTA → Footer pattern unless explicitly dictated by the Section Architecture above.
4. DO NOT make uniqueness depend merely on colors, images, or text. Structural uniqueness is mandatory.
5. ANTI-REPETITION QUALITY GATE: At least 4 major layout decisions MUST visibly differ from a conventional website (e.g. hero layout, navigation treatment, section sequence, card structure, bento grid, or footer design).
6. Every major section must visually belong to the same assigned design system and visual fingerprint.
7. ZERO VISIBLE SCROLLBARS MANDATE: Scrollbars MUST NOT be visible anywhere in the UI (no vertical or horizontal scrollbars in any layout, container, card, modal, or template). Smooth scrolling must work 100% invisibly across mouse wheel, touch swipe, and trackpad.
8. The final website must feel like a bespoke, handcrafted digital masterpiece designed specifically for ${businessName}.

================================================================================
9. CONTENT INTEGRITY & ZERO-FABRICATION RULES (CRITICAL)
================================================================================
- Use ONLY facts and services directly provided in the client brief.
- NEVER fabricate fake awards, fake certifications, fake statistics, fake years of experience, or fake client testimonials.
- If testimonials were NOT provided, do NOT create fake reviews. Either omit the section or replace it with verified business highlights based on the client's description.
- Contact info (Email, Phone, WhatsApp, Social links) must match the client brief exactly. Never invent dummy addresses or phone numbers.

================================================================================
10. RESPONSIVENESS & ACCESSIBILITY
================================================================================
- Mobile-First & Fluid Responsive: Fully tested across screen widths (320px, 375px, 768px, 1024px, 1440px, 1920px).
- Zero horizontal container overflow or layout breaks.
- Zero visible scrollbars: Smooth scrolling must be 100% functional without showing any visual scrollbar track or thumb on any device or viewport.
- WCAG 2.1 AA Compliance: High text contrast ratios, descriptive alt attributes, accessible form labels, keyboard navigable menus.

================================================================================
11. JAVASCRIPT SPECIFICATIONS
================================================================================
Implement clean Vanilla JS in script.js for:
- Mobile navigation drawer toggle with smooth open/close animation.
- Smooth scrolling for internal anchor links (e.g., #contact, #services).
- Interactive FAQ accordions, tab switchers, or filter selectors (if applicable).
- Client-side contact form input validation with user-friendly feedback states (without requiring a backend server).

================================================================================
12. REQUIRED OUTPUT FORMAT
================================================================================
You MUST provide your response in EXACTLY three clearly delineated code sections using the exact file markers below. Do NOT write conversational text or Markdown explanations outside the markers.

===== index.html =====
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessName} | Official Website</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Complete semantic HTML structure according to Design Blueprint -->
  <script src="script.js"></script>
</body>
</html>

===== style.css =====
/* Universal Zero-Scrollbar Reset - Scrollbars must never be visible anywhere */
html, body, * {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
html::-webkit-scrollbar,
body::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

/* Complete, production-ready, beautifully structured CSS implementing the Design Blueprint */

===== script.js =====
// Complete Vanilla JavaScript interactions

Generate the complete, flawless, production-ready bespoke website code now.`;
  }
}
