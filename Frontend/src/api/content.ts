import { apiRequest } from './client';
import { PaginatedResponse } from './projects';

// Helper to strip backend metadata system fields forbidden by NestJS DTO validation
export function cleanDto<T extends Record<string, any>>(dto: T): Partial<T> {
  const { id, websiteId, createdAt, updatedAt, ...clean } = dto;
  return clean as Partial<T>;
}

export interface SeoConfig {
  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterImage?: string | null;
  faviconUrl?: string | null;
}

export interface DesignConfig {
  heroLayout?: string | null;
  aboutLayout?: string | null;
  servicesStyle?: string | null;
  galleryStyle?: string | null;
  testimonialsStyle?: string | null;
  contactStyle?: string | null;
  sectionSpacing?: string | null;
  containerWidth?: string | null;
  buttonSize?: string | null;
  designPreset?: string | null;
}

// 1. Theme
export interface Theme extends SeoConfig, DesignConfig {
  id: string;
  websiteId: string;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  accentColor?: string | null;
  backgroundColor?: string | null;
  textColor?: string | null;
  headingFont?: string | null;
  bodyFont?: string | null;
  buttonStyle?: string | null;
  borderRadius?: string | null;
  logoUrl?: string | null;
  brandName?: string | null;
  navLink1Text?: string | null;
  navLink2Text?: string | null;
  navLink3Text?: string | null;
  navLink4Text?: string | null;
  navLink5Text?: string | null;
  navLink6Text?: string | null;
  navCtaText?: string | null;
  navCtaUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getThemeApi(websiteId: string) {
  return apiRequest<{ success: boolean; data: Theme }>(`/websites/${websiteId}/theme`, { method: 'GET' });
}

export async function createThemeApi(websiteId: string, dto: Partial<Theme>) {
  return apiRequest<{ success: boolean; message: string; data: Theme }>(`/websites/${websiteId}/theme`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateThemeApi(websiteId: string, dto: Partial<Theme>) {
  return apiRequest<{ success: boolean; message: string; data: Theme }>(`/websites/${websiteId}/theme`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function deleteThemeApi(websiteId: string) {
  return apiRequest<{ success: boolean; message: string; data: Theme }>(`/websites/${websiteId}/theme`, {
    method: 'DELETE',
  });
}

export async function upsertThemeApi(websiteId: string, dto: Partial<Theme>) {
  try {
    const res = await updateThemeApi(websiteId, dto);
    if (res && res.success) return res;
  } catch (err: any) {
    // Fallback to create if record missing
  }
  return createThemeApi(websiteId, dto);
}

// 2. Hero
export interface Hero {
  id: string;
  websiteId: string;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  primaryButtonText?: string | null;
  primaryButtonUrl?: string | null;
  secondaryButtonText?: string | null;
  secondaryButtonUrl?: string | null;
  imageId?: string | null;
  image?: any;
  bgOpacity?: string | null;
  videoId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getHeroApi(websiteId: string) {
  return apiRequest<{ success: boolean; data: Hero }>(`/websites/${websiteId}/hero`, { method: 'GET' });
}

export async function createHeroApi(websiteId: string, dto: Partial<Hero>) {
  return apiRequest<{ success: boolean; message: string; data: Hero }>(`/websites/${websiteId}/hero`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateHeroApi(websiteId: string, dto: Partial<Hero>) {
  return apiRequest<{ success: boolean; message: string; data: Hero }>(`/websites/${websiteId}/hero`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function upsertHeroApi(websiteId: string, dto: Partial<Hero>) {
  try {
    const res = await updateHeroApi(websiteId, dto);
    if (res && res.success) return res;
  } catch (err: any) {
    // Fallback to create if record missing
  }
  return createHeroApi(websiteId, dto);
}

export async function deleteHeroApi(websiteId: string) {
  return apiRequest<{ success: boolean; message: string; data: Hero }>(`/websites/${websiteId}/hero`, {
    method: 'DELETE',
  });
}

// 3. About
export interface About {
  id: string;
  websiteId: string;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  imageId?: string | null;
  image?: any;
  bgOpacity?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getAboutApi(websiteId: string) {
  return apiRequest<{ success: boolean; data: About }>(`/websites/${websiteId}/about`, { method: 'GET' });
}

export async function createAboutApi(websiteId: string, dto: Partial<About>) {
  return apiRequest<{ success: boolean; message: string; data: About }>(`/websites/${websiteId}/about`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateAboutApi(websiteId: string, dto: Partial<About>) {
  return apiRequest<{ success: boolean; message: string; data: About }>(`/websites/${websiteId}/about`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function upsertAboutApi(websiteId: string, dto: Partial<About>) {
  try {
    const res = await updateAboutApi(websiteId, dto);
    if (res && res.success) return res;
  } catch (err: any) {
    // Fallback to create if record missing
  }
  return createAboutApi(websiteId, dto);
}

export async function deleteAboutApi(websiteId: string) {
  return apiRequest<{ success: boolean; message: string; data: About }>(`/websites/${websiteId}/about`, {
    method: 'DELETE',
  });
}

// 4. Contact
export interface Contact {
  id: string;
  websiteId: string;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  mapUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getContactApi(websiteId: string) {
  return apiRequest<{ success: boolean; data: Contact }>(`/websites/${websiteId}/contact`, { method: 'GET' });
}

export async function createContactApi(websiteId: string, dto: Partial<Contact>) {
  return apiRequest<{ success: boolean; message: string; data: Contact }>(`/websites/${websiteId}/contact`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateContactApi(websiteId: string, dto: Partial<Contact>) {
  return apiRequest<{ success: boolean; message: string; data: Contact }>(`/websites/${websiteId}/contact`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function upsertContactApi(websiteId: string, dto: Partial<Contact>) {
  try {
    const res = await updateContactApi(websiteId, dto);
    if (res && res.success) return res;
  } catch (err: any) {
    // Fallback to create if record missing
  }
  return createContactApi(websiteId, dto);
}

export async function deleteContactApi(websiteId: string) {
  return apiRequest<{ success: boolean; message: string; data: Contact }>(`/websites/${websiteId}/contact`, {
    method: 'DELETE',
  });
}

// 5. Service
export interface ServiceItem {
  id: string;
  websiteId: string;
  title: string;
  shortDescription?: string | null;
  description?: string | null;
  imageId?: string | null;
  icon?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getServicesApi(websiteId: string, params: { page?: number; limit?: number; search?: string; isActive?: boolean } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.isActive !== undefined) query.append('isActive', params.isActive.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<PaginatedResponse<ServiceItem>>(`/websites/${websiteId}/services${queryString}`, { method: 'GET' });
}

export async function getServiceApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; data: ServiceItem }>(`/websites/${websiteId}/services/${id}`, { method: 'GET' });
}

export async function createServiceApi(websiteId: string, dto: Partial<ServiceItem>) {
  return apiRequest<{ success: boolean; message: string; data: ServiceItem }>(`/websites/${websiteId}/services`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateServiceApi(websiteId: string, id: string, dto: Partial<ServiceItem>) {
  return apiRequest<{ success: boolean; message: string; data: ServiceItem }>(`/websites/${websiteId}/services/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function deleteServiceApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; message: string; data: ServiceItem }>(`/websites/${websiteId}/services/${id}`, {
    method: 'DELETE',
  });
}

// 6. Gallery & GalleryItem
export interface GalleryItem {
  id: string;
  galleryId: string;
  mediaId: string;
  media?: Partial<MediaItem>;
  title?: string | null;
  description?: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Gallery {
  id: string;
  websiteId: string;
  title: string;
  description?: string | null;
  items?: GalleryItem[];
  createdAt: string;
  updatedAt: string;
}

export async function getGalleriesApi(websiteId: string, params: { page?: number; limit?: number; search?: string } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<PaginatedResponse<Gallery>>(`/websites/${websiteId}/gallery${queryString}`, { method: 'GET' });
}

export async function getGalleryApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; data: Gallery }>(`/websites/${websiteId}/gallery/${id}`, { method: 'GET' });
}

export async function createGalleryApi(websiteId: string, dto: Partial<Gallery>) {
  return apiRequest<{ success: boolean; message: string; data: Gallery }>(`/websites/${websiteId}/gallery`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateGalleryApi(websiteId: string, id: string, dto: Partial<Gallery>) {
  return apiRequest<{ success: boolean; message: string; data: Gallery }>(`/websites/${websiteId}/gallery/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function deleteGalleryApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; message: string; data: Gallery }>(`/websites/${websiteId}/gallery/${id}`, {
    method: 'DELETE',
  });
}

export async function getGalleryItemsApi(websiteId: string, galleryId: string) {
  return apiRequest<{ success: boolean; data: GalleryItem[] }>(`/websites/${websiteId}/gallery/${galleryId}/items`, { method: 'GET' });
}

export async function createGalleryItemApi(websiteId: string, galleryId: string, dto: Partial<GalleryItem>) {
  return apiRequest<{ success: boolean; message: string; data: GalleryItem }>(`/websites/${websiteId}/gallery/${galleryId}/items`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateGalleryItemApi(websiteId: string, galleryId: string, id: string, dto: Partial<GalleryItem>) {
  return apiRequest<{ success: boolean; message: string; data: GalleryItem }>(`/websites/${websiteId}/gallery/${galleryId}/items/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function deleteGalleryItemApi(websiteId: string, galleryId: string, id: string) {
  return apiRequest<{ success: boolean; message: string; data: GalleryItem }>(`/websites/${websiteId}/gallery/${galleryId}/items/${id}`, {
    method: 'DELETE',
  });
}

// 7. Testimonials
export interface Testimonial {
  id: string;
  websiteId: string;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  avatarMediaId?: string | null;
  avatarMedia?: Partial<MediaItem>;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getTestimonialsApi(websiteId: string, params: { page?: number; limit?: number; search?: string; isActive?: boolean } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.isActive !== undefined) query.append('isActive', params.isActive.toString());

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<PaginatedResponse<Testimonial>>(`/websites/${websiteId}/testimonials${queryString}`, { method: 'GET' });
}

export async function getTestimonialApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; data: Testimonial }>(`/websites/${websiteId}/testimonials/${id}`, { method: 'GET' });
}

export async function createTestimonialApi(websiteId: string, dto: Partial<Testimonial>) {
  return apiRequest<{ success: boolean; message: string; data: Testimonial }>(`/websites/${websiteId}/testimonials`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateTestimonialApi(websiteId: string, id: string, dto: Partial<Testimonial>) {
  return apiRequest<{ success: boolean; message: string; data: Testimonial }>(`/websites/${websiteId}/testimonials/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function deleteTestimonialApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; message: string; data: Testimonial }>(`/websites/${websiteId}/testimonials/${id}`, {
    method: 'DELETE',
  });
}

// 8. Social Links
export type SocialPlatform = 'INSTAGRAM' | 'FACEBOOK' | 'YOUTUBE' | 'LINKEDIN' | 'TWITTER' | 'WHATSAPP' | 'OTHER';

export interface SocialLink {
  id: string;
  websiteId: string;
  platform: SocialPlatform;
  url: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export async function getSocialLinksApi(websiteId: string) {
  return apiRequest<{ success: boolean; data: SocialLink[] }>(`/websites/${websiteId}/social-links`, { method: 'GET' });
}

export async function getSocialLinkApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; data: SocialLink }>(`/websites/${websiteId}/social-links/${id}`, { method: 'GET' });
}

export async function createSocialLinkApi(websiteId: string, dto: { platform: SocialPlatform; url: string; sortOrder?: number }) {
  return apiRequest<{ success: boolean; message: string; data: SocialLink }>(`/websites/${websiteId}/social-links`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateSocialLinkApi(websiteId: string, id: string, dto: { platform?: SocialPlatform; url?: string; sortOrder?: number }) {
  return apiRequest<{ success: boolean; message: string; data: SocialLink }>(`/websites/${websiteId}/social-links/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function deleteSocialLinkApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; message: string; data: SocialLink }>(`/websites/${websiteId}/social-links/${id}`, {
    method: 'DELETE',
  });
}

// 9. Media
export type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT';

export interface MediaItem {
  id: string;
  websiteId?: string | null;
  type: MediaType;
  url: string;
  storageKey: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  width?: number | null;
  height?: number | null;
  altText?: string | null;
  createdAt: string;
  updatedAt: string;
}

export async function getMediaApi(websiteId: string, params: { page?: number; limit?: number; search?: string; type?: MediaType; mimeType?: string } = {}) {
  const query = new URLSearchParams();
  if (params.page) query.append('page', params.page.toString());
  if (params.limit) query.append('limit', params.limit.toString());
  if (params.search) query.append('search', params.search);
  if (params.type) query.append('type', params.type);
  if (params.mimeType) query.append('mimeType', params.mimeType);

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiRequest<PaginatedResponse<MediaItem>>(`/websites/${websiteId}/media${queryString}`, { method: 'GET' });
}

export async function getMediaItemApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; data: MediaItem }>(`/websites/${websiteId}/media/${id}`, { method: 'GET' });
}

export async function createMediaApi(websiteId: string, dto: Partial<MediaItem>) {
  return apiRequest<{ success: boolean; message: string; data: MediaItem }>(`/websites/${websiteId}/media`, {
    method: 'POST',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function updateMediaApi(websiteId: string, id: string, dto: Partial<MediaItem>) {
  return apiRequest<{ success: boolean; message: string; data: MediaItem }>(`/websites/${websiteId}/media/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(cleanDto(dto)),
  });
}

export async function deleteMediaApi(websiteId: string, id: string) {
  return apiRequest<{ success: boolean; message: string; data: MediaItem }>(`/websites/${websiteId}/media/${id}`, {
    method: 'DELETE',
  });
}

// 10. Normalized Full Website Content Interface & Aggregator
export interface WebsiteContent {
  websiteId: string;
  theme?: Theme | null;
  hero?: Hero | null;
  about?: About | null;
  contact?: Contact | null;
  services?: ServiceItem[];
  galleries?: Gallery[];
  testimonials?: Testimonial[];
  socialLinks?: SocialLink[];
  media?: MediaItem[];
}

export async function fetchWebsiteFullContent(websiteId: string): Promise<WebsiteContent> {
  const [
    themeRes,
    heroRes,
    aboutRes,
    contactRes,
    servicesRes,
    galleriesRes,
    testimonialsRes,
    socialLinksRes,
    mediaRes,
  ] = await Promise.allSettled([
    getThemeApi(websiteId),
    getHeroApi(websiteId),
    getAboutApi(websiteId),
    getContactApi(websiteId),
    getServicesApi(websiteId, { limit: 100 }),
    getGalleriesApi(websiteId, { limit: 100 }),
    getTestimonialsApi(websiteId, { limit: 100 }),
    getSocialLinksApi(websiteId),
    getMediaApi(websiteId, { limit: 100 }),
  ]);

  return {
    websiteId,
    theme: themeRes.status === 'fulfilled' && themeRes.value.success ? themeRes.value.data : null,
    hero: heroRes.status === 'fulfilled' && heroRes.value.success ? heroRes.value.data : null,
    about: aboutRes.status === 'fulfilled' && aboutRes.value.success ? aboutRes.value.data : null,
    contact: contactRes.status === 'fulfilled' && contactRes.value.success ? contactRes.value.data : null,
    services: servicesRes.status === 'fulfilled' && servicesRes.value.success ? servicesRes.value.data.items : [],
    galleries: galleriesRes.status === 'fulfilled' && galleriesRes.value.success ? galleriesRes.value.data.items : [],
    testimonials: testimonialsRes.status === 'fulfilled' && testimonialsRes.value.success ? testimonialsRes.value.data.items : [],
    socialLinks: socialLinksRes.status === 'fulfilled' && socialLinksRes.value.success ? socialLinksRes.value.data : [],
    media: mediaRes.status === 'fulfilled' && mediaRes.value.success ? mediaRes.value.data.items : [],
  };
}
