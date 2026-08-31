export interface BrandingData {
  name: string;
  logoText: string;
  tagline: string;
  description: string;
  accentColor?: string;
}

export interface MediaPlaceholder {
  type: 'image' | 'video';
  url?: string;
  title: string;
  aspectRatio?: string;
  badge?: string;
  placeholderBg?: string;
  patternType?: 'geometric' | 'architectural' | 'editorial' | 'minimal' | 'corporate' | 'corporate-blue';
}

export interface HeroData {
  eyebrow: string;
  title: string;
  description: string;
  primaryCTA: string;
  primaryURL: string;
  secondaryCTA?: string;
  secondaryURL?: string;
  media: MediaPlaceholder;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  iconName: string; // Lucide icon name string
  media: MediaPlaceholder;
}

export interface AboutData {
  eyebrow: string;
  title: string;
  subtitle?: string;
  description: string;
  highlights: { title: string; detail: string }[];
  media: MediaPlaceholder;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  media: MediaPlaceholder;
}

export interface VideoSectionData {
  eyebrow: string;
  title: string;
  description: string;
  badgeText: string;
  media: MediaPlaceholder;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface ContactData {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export interface SocialData {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
  pinterest?: string;
}

export interface TemplateData {
  templateId: 'template-1' | 'template-2' | 'template-3' | 'template-4' | 'template-5';
  templateName: string;
  templateCategory: string;
  branding: BrandingData;
  hero: HeroData;
  services: ServiceItem[];
  about: AboutData;
  gallery: GalleryItem[];
  videoSection: VideoSectionData;
  testimonials: TestimonialItem[];
  contact: ContactData;
  social: SocialData;
  trustedPartners?: string[];
}

export interface TemplateMetadata {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  colorScheme: string;
  navStyle: string;
  heroStyle: string;
  bestSuitedFor: string[];
  route: string;
}
