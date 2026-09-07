import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { WebsiteRequest } from '@prisma/client';
import { TEMPLATE_PROFILES, TemplateProfile } from './template-profiles';

export interface TemplateSelectionResult {
  templateId: string | null;
  templateKey: string;
  score: number;
  reasons: string[];
  method: 'RULE_ENGINE';
}

interface ScoredTemplate {
  profile: TemplateProfile;
  score: number;
  categoryScore: number;
  industryScore: number;
  serviceScore: number;
  featureScore: number;
  reasons: string[];
}

@Injectable()
export class TemplateSelectionService {
  private readonly logger = new Logger('TemplateSelection');

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Deterministically selects the best template for a given WebsiteRequest.
   */
  async selectTemplate(request: WebsiteRequest): Promise<TemplateSelectionResult> {
    const scoredTemplates = this.evaluateAllTemplates(request);

    // Sort with deterministic tie-breaking:
    // 1. Total score (desc)
    // 2. Category score (desc)
    // 3. Industry keyword score (desc)
    // 4. Base priority (desc)
    // 5. templateKey (alphabetical asc)
    scoredTemplates.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.categoryScore !== a.categoryScore) return b.categoryScore - a.categoryScore;
      if (b.industryScore !== a.industryScore) return b.industryScore - a.industryScore;
      if (b.profile.priority !== a.profile.priority) return b.profile.priority - a.profile.priority;
      return a.profile.templateKey.localeCompare(b.profile.templateKey);
    });

    const best = scoredTemplates[0] || {
      profile: TEMPLATE_PROFILES[TEMPLATE_PROFILES.length - 1],
      score: 10,
      reasons: ['Default baseline fallback'],
    };

    this.logger.log(`Selected ${best.profile.templateKey}`);
    this.logger.log(`Score: ${best.score}`);
    this.logger.log(`Reasons:\n${best.reasons.map((r) => `- ${r}`).join('\n')}`);

    // Resolve corresponding Template ID from database if present
    const templateId = await this.resolveDbTemplateId(best.profile);

    return {
      templateId,
      templateKey: best.profile.templateKey,
      score: best.score,
      reasons: best.reasons,
      method: 'RULE_ENGINE',
    };
  }

  /**
   * Evaluates and scores all template profiles against the request.
   */
  private evaluateAllTemplates(request: WebsiteRequest): ScoredTemplate[] {
    const normCategory = this.normalize(request.category || '');
    const normBusinessName = this.normalize(request.businessName || '');
    const normDescription = this.normalize(request.description || '');
    const normSpecialInstructions = this.normalize(request.specialInstructions || '');

    const features: string[] = Array.isArray(request.selectedFeatures)
      ? (request.selectedFeatures as string[]).map((f) => this.normalize(String(f)))
      : [];

    const combinedIndustryText = `${normBusinessName} ${normCategory} ${normSpecialInstructions}`;
    const combinedServiceText = `${normDescription} ${normSpecialInstructions}`;

    return TEMPLATE_PROFILES.map((profile) => {
      let score = profile.priority;
      let categoryScore = 0;
      let industryScore = 0;
      let serviceScore = 0;
      let featureScore = 0;
      const reasons: string[] = [];

      // 1. Category Matching (+40 for exact match, +20 for partial/keyword match)
      for (const catMatch of profile.categoryMatches) {
        const normMatch = this.normalize(catMatch);
        if (normCategory === normMatch) {
          categoryScore = Math.max(categoryScore, 40);
          reasons.push(`Direct category match: "${catMatch}"`);
          break;
        } else if (normCategory.includes(normMatch) || normMatch.includes(normCategory)) {
          categoryScore = Math.max(categoryScore, 20);
          reasons.push(`Category keyword match: "${catMatch}"`);
        }
      }

      // 2. Industry Keywords in Business Name (+20 each) and other industry text (+15 each)
      let industryMatchesCount = 0;
      for (const kw of profile.industryKeywords) {
        if (industryMatchesCount >= 4) break;

        if (this.containsWordOrPhrase(normBusinessName, kw)) {
          industryMatchesCount++;
          industryScore += 20;
          reasons.push(`Business name keyword detected: "${kw}"`);
        } else if (this.containsWordOrPhrase(combinedIndustryText, kw)) {
          industryMatchesCount++;
          industryScore += 15;
          reasons.push(`Industry keyword detected: "${kw}"`);
        }
      }

      // 3. Service Keywords (+10 each, up to 3 matches = max 30)
      let serviceMatchesCount = 0;
      for (const kw of profile.serviceKeywords) {
        if (serviceMatchesCount >= 3) break;
        if (this.containsWordOrPhrase(combinedServiceText, kw)) {
          serviceMatchesCount++;
          serviceScore += 10;
          reasons.push(`Service keyword detected: "${kw}"`);
        }
      }

      // 4. Preferred Features (+5 each)
      for (const prefFeat of profile.preferredFeatures) {
        const normPref = this.normalize(prefFeat);
        if (features.some((f) => f.includes(normPref) || normPref.includes(f))) {
          featureScore += 5;
          reasons.push(`Preferred feature selected: "${prefFeat}"`);
        }
      }

      // 5. Excluded Keywords Penalty (-50)
      if (profile.excludedKeywords) {
        for (const excl of profile.excludedKeywords) {
          if (
            this.containsWordOrPhrase(combinedIndustryText, excl) ||
            this.containsWordOrPhrase(combinedServiceText, excl)
          ) {
            score -= 50;
            reasons.push(`Excluded keyword penalty: "${excl}"`);
          }
        }
      }

      score += categoryScore + industryScore + serviceScore + featureScore;

      return {
        profile,
        score,
        categoryScore,
        industryScore,
        serviceScore,
        featureScore,
        reasons: reasons.length > 0 ? reasons : ['Base template compatibility profile'],
      };
    });
  }

  /**
   * Helper to find the database Template ID corresponding to the chosen profile.
   */
  private async resolveDbTemplateId(profile: TemplateProfile): Promise<string | null> {
    try {
      const templates = await this.prisma.template.findMany({
        select: { id: true, slug: true, templateKey: true },
      });

      // 1. Direct slug or templateKey match
      const directMatch = templates.find(
        (t) =>
          t.slug.toLowerCase() === profile.templateKey.toLowerCase() ||
          t.templateKey.toLowerCase() === profile.templateKey.toLowerCase(),
      );
      if (directMatch) return directMatch.id;

      // 2. Alias match from profile.dbLookupKeys
      for (const key of profile.dbLookupKeys) {
        const aliasMatch = templates.find(
          (t) =>
            t.slug.toLowerCase().includes(key.toLowerCase()) ||
            t.templateKey.toLowerCase() === key.toLowerCase(),
        );
        if (aliasMatch) return aliasMatch.id;
      }

      // 3. Fallback: return first active template ID if available
      return templates[0]?.id || null;
    } catch (err) {
      this.logger.warn(`Could not resolve DB template ID: ${err?.message || err}`);
      return null;
    }
  }

  /**
   * Checks whether normalized text contains a word or phrase with word boundary awareness.
   */
  private containsWordOrPhrase(text: string, phrase: string): boolean {
    const normPhrase = this.normalize(phrase);
    if (!normPhrase) return false;
    const regex = new RegExp(`(^|\\s)${normPhrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|\\s)`, 'i');
    return regex.test(text);
  }

  /**
   * Text normalization for robust, punctuation-tolerant matching.
   */
  private normalize(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
