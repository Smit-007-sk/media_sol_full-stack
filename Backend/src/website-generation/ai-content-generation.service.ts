import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebsiteRequest } from '@prisma/client';
import {
  AiGeneratedWebsiteContent,
  AiGenerationMetadata,
} from './ai-content-schema';

@Injectable()
export class AiContentGenerationService {
  private readonly logger = new Logger('AIContentGeneration');
  private readonly apiKey?: string;
  private readonly model: string;
  private readonly timeoutMs: number;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.model = this.configService.get<string>('OPENAI_MODEL', 'gpt-4o-mini');
    this.timeoutMs = parseInt(
      this.configService.get<string>('OPENAI_TIMEOUT_MS', '30000'),
      10,
    );
  }

  /**
   * Generates validated structured website content tailored to the selected template.
   */
  async generateWebsiteContent(
    request: WebsiteRequest,
    templateKey: string,
  ): Promise<{ content: AiGeneratedWebsiteContent; metadata: AiGenerationMetadata }> {
    this.logger.log(`Starting content generation for template: "${templateKey}"`);

    // If no API key is set, use safe deterministic rule-based generator
    if (!this.apiKey || this.apiKey.trim() === '' || this.apiKey.includes('placeholder')) {
      this.logger.log(
        'OPENAI_API_KEY not configured. Utilizing safe domain-specific structured content generator.',
      );
      const fallbackContent = this.generateDeterministicContent(request, templateKey);
      return {
        content: fallbackContent,
        metadata: {
          provider: 'DETERMINISTIC_SAFE_GENERATOR',
          model: 'rule-based-v1',
          generatedAt: new Date().toISOString(),
          templateKey,
          promptVersion: '1.0.0',
          validationStatus: 'FALLBACK_GENERATED',
        },
      };
    }

    try {
      const response = await this.callOpenAiApi(request, templateKey);
      const validatedContent = this.validateAndNormalizeContent(response, request, templateKey);

      this.logger.log('Generated content successfully and passed validation');

      return {
        content: validatedContent,
        metadata: {
          provider: 'OPENAI',
          model: this.model,
          generatedAt: new Date().toISOString(),
          templateKey,
          promptVersion: '1.0.0',
          validationStatus: 'VALID',
        },
      };
    } catch (error) {
      this.logger.warn(
        `OpenAI call failed (${error?.message || error}). Falling back to safe deterministic content generation.`,
      );
      const fallbackContent = this.generateDeterministicContent(request, templateKey);
      return {
        content: fallbackContent,
        metadata: {
          provider: 'DETERMINISTIC_FALLBACK',
          model: 'rule-based-v1',
          generatedAt: new Date().toISOString(),
          templateKey,
          promptVersion: '1.0.0',
          validationStatus: 'FALLBACK_GENERATED',
        },
      };
    }
  }

  /**
   * Calls OpenAI Chat Completions API with strict JSON mode.
   */
  private async callOpenAiApi(
    request: WebsiteRequest,
    templateKey: string,
  ): Promise<any> {
    const systemPrompt = `You are a professional website copywriter creating high-converting, elegant website copy.
The website template selected is "${templateKey}".

STRICT FACTUAL SAFETY RULES:
1. SOURCE OF TRUTH: The client's business name is "${request.businessName}". Always use this exact name.
2. NO FABRICATION: Never fabricate statistics (e.g., "500+ projects", "10+ years experience"), awards, certifications, physical branch addresses, pricing, or team members.
3. NO TESTIMONIALS: Never generate fake client testimonials or reviews.
4. Expand the client's business description professionally into clear, compelling headings and service descriptions appropriate for the "${request.category}" industry.
5. Return strictly a JSON object conforming to the required schema.`;

    const userPrompt = `Generate website content for:
Business Name: ${request.businessName}
Category: ${request.category}
Description: ${request.description || 'Professional services'}
Selected Features: ${JSON.stringify(request.selectedFeatures || [])}
Special Instructions: ${request.specialInstructions || 'None'}

Return a JSON object with:
{
  "brand": {
    "businessName": "${request.businessName}",
    "tagline": "A concise, impactful tagline",
    "shortDescription": "1-2 sentence business overview"
  },
  "hero": {
    "eyebrow": "Short category eyebrow in uppercase",
    "title": "Compelling main hero headline",
    "description": "Engaging 2-sentence hero introduction",
    "primaryButtonText": "Primary CTA text (e.g., 'Get Started' or 'Book a Session')",
    "primaryButtonUrl": "#contact",
    "secondaryButtonText": "Secondary CTA text (e.g., 'View Services' or 'Explore Gallery')",
    "secondaryButtonUrl": "#services"
  },
  "about": {
    "eyebrow": "About section eyebrow",
    "title": "About section heading",
    "description": "2-3 sentence overview of business philosophy and approach without inventing unverified facts",
    "highlights": ["Key benefit 1", "Key benefit 2", "Key benefit 3"]
  },
  "services": [
    {
      "title": "Service Name",
      "shortDescription": "Brief summary",
      "description": "Full service description"
    }
  ],
  "whyChooseUs": {
    "title": "Why Work With Us",
    "points": [
      { "title": "Commitment to Quality", "description": "Description" },
      { "title": "Client-Centric Approach", "description": "Description" }
    ]
  },
  "gallery": {
    "title": "Portfolio & Showcase",
    "description": "Overview of featured work",
    "suggestedCaptions": ["Featured Work", "Recent Project"]
  },
  "contact": {
    "title": "Get in Touch",
    "description": "Contact invitation"
  },
  "seo": {
    "title": "${request.businessName} — Professional ${request.category}",
    "description": "SEO meta description under 160 characters",
    "keywords": ["keyword1", "keyword2"]
  }
}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`OpenAI API responded with status ${response.status}: ${errorBody}`);
      }

      const json = await response.json();
      const contentStr = json?.choices?.[0]?.message?.content;
      if (!contentStr) {
        throw new Error('Empty response from OpenAI');
      }

      return JSON.parse(contentStr);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Validates and guarantees all mandatory fields exist and are clean.
   */
  private validateAndNormalizeContent(
    raw: any,
    request: WebsiteRequest,
    templateKey: string,
  ): AiGeneratedWebsiteContent {
    const businessName = request.businessName.trim();

    return {
      brand: {
        businessName,
        tagline: raw?.brand?.tagline || `Excellence in ${request.category}`,
        shortDescription:
          raw?.brand?.shortDescription ||
          request.description ||
          `Dedicated to providing exceptional ${request.category.toLowerCase()} solutions.`,
      },
      hero: {
        eyebrow: (raw?.hero?.eyebrow || request.category).toUpperCase(),
        title: raw?.hero?.title || `${businessName} — Crafted with Precision`,
        description:
          raw?.hero?.description ||
          request.description ||
          `Welcome to ${businessName}. We specialize in quality, reliability, and tailored solutions.`,
        primaryButtonText: raw?.hero?.primaryButtonText || 'Contact Us',
        primaryButtonUrl: raw?.hero?.primaryButtonUrl || '#contact',
        secondaryButtonText: raw?.hero?.secondaryButtonText || 'Our Services',
        secondaryButtonUrl: raw?.hero?.secondaryButtonUrl || '#services',
      },
      about: {
        eyebrow: (raw?.about?.eyebrow || 'OUR PHILOSOPHY').toUpperCase(),
        title: raw?.about?.title || `About ${businessName}`,
        description:
          raw?.about?.description ||
          request.description ||
          `At ${businessName}, we focus on delivering dependable and customer-oriented services.`,
        highlights: Array.isArray(raw?.about?.highlights) && raw.about.highlights.length > 0
          ? raw.about.highlights.map(String)
          : ['Quality Focus', 'Dedicated Service', 'Client Satisfaction'],
      },
      services: Array.isArray(raw?.services) && raw.services.length > 0
        ? raw.services.map((s: any, idx: number) => ({
            title: s?.title || `Service ${idx + 1}`,
            shortDescription: s?.shortDescription || s?.title || '',
            description: s?.description || s?.title || `Professional ${s?.title || 'service'}.`,
            icon: s?.icon || 'CheckCircle',
          }))
        : this.generateDefaultServices(request),
      whyChooseUs: {
        title: raw?.whyChooseUs?.title || 'Why Choose Us',
        description: raw?.whyChooseUs?.description || 'What sets our approach apart',
        points: Array.isArray(raw?.whyChooseUs?.points) && raw.whyChooseUs.points.length > 0
          ? raw.whyChooseUs.points.map((p: any) => ({
              title: p?.title || 'Reliable Service',
              description: p?.description || 'Committed to superior client outcomes.',
            }))
          : [
              {
                title: 'Client-Centric Focus',
                description: 'We prioritize customer needs with clear communication and transparency.',
              },
              {
                title: 'High Standards',
                description: 'Every project is handled with rigor, attention to detail, and care.',
              },
            ],
      },
      gallery: {
        title: raw?.gallery?.title || 'Featured Portfolio & Showcase',
        description: raw?.gallery?.description || 'Explore our latest work and client highlights.',
        suggestedCaptions: Array.isArray(raw?.gallery?.suggestedCaptions)
          ? raw.gallery.suggestedCaptions.map(String)
          : ['Featured Showcase', 'Quality Craftsmanship'],
      },
      contact: {
        title: raw?.contact?.title || 'Let us start a conversation',
        description:
          raw?.contact?.description ||
          'Reach out today to discuss your requirements or schedule a consultation.',
      },
      seo: {
        title: raw?.seo?.title || `${businessName} | ${request.category}`,
        description:
          raw?.seo?.description ||
          `Official website of ${businessName}. Providing professional ${request.category.toLowerCase()} services.`,
        keywords: Array.isArray(raw?.seo?.keywords) && raw.seo.keywords.length > 0
          ? raw.seo.keywords.map(String)
          : [businessName.toLowerCase(), request.category.toLowerCase(), 'services'],
      },
    };
  }

  /**
   * Deterministic domain-specific content generator for when API key is not present or API is offline.
   */
  private generateDeterministicContent(
    request: WebsiteRequest,
    templateKey: string,
  ): AiGeneratedWebsiteContent {
    const businessName = request.businessName.trim();
    const category = request.category.trim();
    const description = (request.description || '').trim();

    return {
      brand: {
        businessName,
        tagline: this.getDomainTagline(category, templateKey),
        shortDescription:
          description ||
          `Dedicated to providing exceptional ${category.toLowerCase()} services.`,
      },
      hero: {
        eyebrow: `${category.toUpperCase()} EXCELLENCE`,
        title: this.getDomainHeroTitle(businessName, category, templateKey),
        description:
          description ||
          `Welcome to ${businessName}. We specialize in quality, reliability, and tailored solutions for our clients.`,
        primaryButtonText: this.getDomainPrimaryCta(category, templateKey),
        primaryButtonUrl: '#contact',
        secondaryButtonText: 'Explore Offerings',
        secondaryButtonUrl: '#services',
      },
      about: {
        eyebrow: 'OUR COMMITMENT',
        title: `Dedicated to Quality at ${businessName}`,
        description:
          description ||
          `${businessName} provides high-caliber ${category.toLowerCase()} services tailored to the unique goals of our clients.`,
        highlights: [
          'Client-First Philosophy',
          'Rigorous Attention to Detail',
          'Transparent Communication',
        ],
      },
      services: this.generateDefaultServices(request),
      whyChooseUs: {
        title: 'Why Work With Us',
        description: 'Our core principles and dedication to your success',
        points: [
          {
            title: 'Customer-First Approach',
            description: 'We listen closely to your vision and tailor every detail accordingly.',
          },
          {
            title: 'Reliable Standards',
            description: 'Consistent execution and reliable quality across every engagement.',
          },
        ],
      },
      gallery: {
        title: 'Featured Showcase',
        description: 'A glimpse into our work, craftsmanship, and projects.',
        suggestedCaptions: ['Featured Highlights', 'Recent Projects', 'Quality Showcase'],
      },
      contact: {
        title: 'Ready to collaborate?',
        description:
          'Reach out to our team via phone, email, or WhatsApp to discuss your requirements.',
      },
      seo: {
        title: `${businessName} — Professional ${category}`,
        description:
          description ||
          `Official website of ${businessName}. Discover professional ${category.toLowerCase()} services and solutions.`,
        keywords: [
          businessName.toLowerCase(),
          category.toLowerCase(),
          'professional services',
          templateKey,
        ],
      },
    };
  }

  private getDomainTagline(category: string, templateKey: string): string {
    const cat = category.toLowerCase();
    if (cat.includes('restaurant') || cat.includes('food') || templateKey === 'ember-hospitality') {
      return 'Culinary passion, authentic taste, and memorable dining experiences.';
    }
    if (cat.includes('health') || cat.includes('medical') || templateKey === 'vitalis-health') {
      return 'Compassionate clinical care and dedicated wellness solutions.';
    }
    if (cat.includes('photo') || cat.includes('wedding') || templateKey === 'framefolio') {
      return 'Capturing genuine emotions and timeless visual stories.';
    }
    if (cat.includes('finance') || templateKey === 'horizon-finance') {
      return 'Strategic financial counsel and disciplined wealth management.';
    }
    if (cat.includes('saas') || cat.includes('ai') || templateKey === 'nova-ai') {
      return 'Intelligent digital architecture engineered for modern scale.';
    }
    if (cat.includes('real estate') || cat.includes('estate') || templateKey === 'terra-estate') {
      return 'Distinctive properties and exceptional living spaces.';
    }
    if (cat.includes('fashion') || cat.includes('boutique') || templateKey === 'maison-atelier') {
      return 'Bespoke elegance, luxury craftsmanship, and timeless style.';
    }
    if (cat.includes('architecture') || templateKey === 'mono-architecture') {
      return 'Intentional spatial design and structural purity.';
    }
    return 'Delivering excellence and dependable solutions for our clients.';
  }

  private getDomainHeroTitle(name: string, category: string, templateKey: string): string {
    const cat = category.toLowerCase();
    if (cat.includes('restaurant') || cat.includes('food') || templateKey === 'ember-hospitality') {
      return `Authentic Flavors & Warm Hospitality at ${name}`;
    }
    if (cat.includes('health') || cat.includes('medical') || templateKey === 'vitalis-health') {
      return `Personalized Care & Clinical Expertise at ${name}`;
    }
    if (cat.includes('photo') || templateKey === 'framefolio') {
      return `Preserving Moments into Cinematic Art with ${name}`;
    }
    if (cat.includes('finance') || templateKey === 'horizon-finance') {
      return `Guiding Financial Clarity & Sustainable Growth`;
    }
    if (cat.includes('saas') || cat.includes('ai') || templateKey === 'nova-ai') {
      return `Next-Generation Intelligent Systems Built for Scale`;
    }
    if (cat.includes('real estate') || templateKey === 'terra-estate') {
      return `Luxury Estates & Prime Architectural Properties`;
    }
    return `Professional ${category} Tailored to Your Vision`;
  }

  private getDomainPrimaryCta(category: string, templateKey: string): string {
    const cat = category.toLowerCase();
    if (cat.includes('restaurant') || cat.includes('food') || templateKey === 'ember-hospitality') {
      return 'Book a Table';
    }
    if (cat.includes('health') || cat.includes('medical') || templateKey === 'vitalis-health') {
      return 'Schedule Appointment';
    }
    if (cat.includes('photo') || templateKey === 'framefolio') {
      return 'Inquire About Booking';
    }
    if (cat.includes('finance') || templateKey === 'horizon-finance') {
      return 'Request Consultation';
    }
    return 'Get in Touch';
  }

  private generateDefaultServices(request: WebsiteRequest) {
    const cat = request.category.toLowerCase();
    if (cat.includes('restaurant') || cat.includes('food')) {
      return [
        {
          title: 'Signature Dining Experience',
          shortDescription: 'Freshly prepared specialty dishes',
          description: 'A curated menu featuring seasonal ingredients crafted with care and passion.',
        },
        {
          title: 'Private Events & Gatherings',
          shortDescription: 'Memorable event hosting',
          description: 'Customized dining arrangements for special celebrations, corporate gatherings, and family dinners.',
        },
      ];
    }
    if (cat.includes('photo')) {
      return [
        {
          title: 'Wedding & Event Coverage',
          shortDescription: 'Cinematic storytelling',
          description: 'Full-day documentation capturing heartfelt candid moments and beautiful portraits.',
        },
        {
          title: 'Creative Portrait Sessions',
          shortDescription: 'Personalized visual sessions',
          description: 'High-resolution individual and family studio or outdoor portrait sessions.',
        },
      ];
    }
    return [
      {
        title: 'Core Advisory & Consulting',
        shortDescription: 'Comprehensive client solutions',
        description: `Tailored ${request.category.toLowerCase()} services designed around your specific requirements.`,
      },
      {
        title: 'Ongoing Support & Implementation',
        shortDescription: 'Reliable follow-through',
        description: 'Dedicated assistance to ensure seamless delivery and long-term satisfaction.',
      },
    ];
  }
}
