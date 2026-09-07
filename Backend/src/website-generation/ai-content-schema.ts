export interface AiHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
}

export interface AiAboutContent {
  eyebrow: string;
  title: string;
  description: string;
  highlights?: string[];
}

export interface AiServiceItem {
  title: string;
  shortDescription?: string;
  description: string;
  icon?: string;
}

export interface AiWhyChooseUsPoint {
  title: string;
  description: string;
}

export interface AiWhyChooseUsContent {
  title: string;
  description?: string;
  points: AiWhyChooseUsPoint[];
}

export interface AiGalleryContent {
  title: string;
  description: string;
  suggestedCaptions?: string[];
}

export interface AiContactContent {
  title: string;
  description: string;
}

export interface AiSeoContent {
  title: string;
  description: string;
  keywords: string[];
}

export interface AiGeneratedWebsiteContent {
  brand: {
    businessName: string;
    tagline: string;
    shortDescription: string;
  };
  hero: AiHeroContent;
  about: AiAboutContent;
  services: AiServiceItem[];
  whyChooseUs?: AiWhyChooseUsContent;
  gallery?: AiGalleryContent;
  contact: AiContactContent;
  seo: AiSeoContent;
}

export interface AiGenerationMetadata {
  provider: string;
  model: string;
  generatedAt: string;
  templateKey: string;
  promptVersion: string;
  validationStatus: 'VALID' | 'FALLBACK_GENERATED';
}
