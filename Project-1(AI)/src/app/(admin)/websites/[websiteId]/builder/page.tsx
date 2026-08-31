"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getWebsiteApi, updateWebsiteApi, Website } from '@/api/websites';
import {
  fetchWebsiteFullContent,
  updateThemeApi,
  upsertThemeApi,
  updateHeroApi,
  upsertHeroApi,
  updateAboutApi,
  upsertAboutApi,
  updateContactApi,
  upsertContactApi,
  createServiceApi,
  updateServiceApi,
  deleteServiceApi,
  createGalleryItemApi,
  updateGalleryItemApi,
  deleteGalleryItemApi,
  createTestimonialApi,
  updateTestimonialApi,
  deleteTestimonialApi,
  createSocialLinkApi,
  updateSocialLinkApi,
  deleteSocialLinkApi,
  WebsiteContent,
  ServiceItem,
  Testimonial,
  SocialLink,
  GalleryItem,
  Theme,
} from '@/api/content';
import { useAuth } from '@/context/AuthContext';
import { ToastContainer, ToastMessage } from '@/components/admin/Toast';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import { ChangeTemplateModal } from '@/components/admin/builder/ChangeTemplateModal';
import { resolveTemplateDefinition } from '@/templates';

// Modular Builder Components
import { BuilderToolbar, ViewportType } from '@/components/admin/builder/BuilderToolbar';
import { SectionNavigator, SectionType } from '@/components/admin/builder/SectionNavigator';
import { LivePreview } from '@/components/admin/builder/LivePreview';
import { ThemeEditor } from '@/components/admin/builder/ThemeEditor';
import { HeroEditor } from '@/components/admin/builder/HeroEditor';
import { AboutEditor } from '@/components/admin/builder/AboutEditor';
import { ServicesEditor } from '@/components/admin/builder/ServicesEditor';
import { GalleryEditor } from '@/components/admin/builder/GalleryEditor';
import { TestimonialsEditor } from '@/components/admin/builder/TestimonialsEditor';
import { ContactEditor } from '@/components/admin/builder/ContactEditor';
import { SocialLinksEditor } from '@/components/admin/builder/SocialLinksEditor';
import { DesignCustomizerEditor } from '@/components/admin/builder/DesignCustomizerEditor';
import { SeoEditor } from '@/components/admin/builder/SeoEditor';
import { PublishSummaryModal } from '@/components/admin/builder/PublishSummaryModal';

import {
  Palette,
  Sparkles,
  Info,
  PhoneCall,
  Briefcase,
  Images,
  MessageSquareQuote,
  Share2,
  Sliders,
  Search,
  Loader2,
} from 'lucide-react';

export default function WebsiteBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const { isAdmin } = useAuth();
  const websiteId = params.websiteId as string;

  // Website & Content State
  const [website, setWebsite] = useState<Website | null>(null);
  const [savedContent, setSavedContent] = useState<WebsiteContent | null>(null);
  const [builderContent, setBuilderContent] = useState<WebsiteContent | null>(null);

  // Undo / Redo History Stacks
  const [historyStack, setHistoryStack] = useState<WebsiteContent[]>([]);
  const [redoStack, setRedoStack] = useState<WebsiteContent[]>([]);

  // Navigation & Viewport State
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [viewport, setViewport] = useState<ViewportType>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Section Visibility State (Local Toggle)
  const [sectionVisibility, setSectionVisibility] = useState<Record<SectionType, boolean>>({
    theme: true,
    design: true,
    seo: true,
    hero: true,
    about: true,
    services: true,
    gallery: true,
    testimonials: true,
    contact: true,
    social: true,
  });

  // UI Modals & Loading State
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishSummaryOpen, setIsPublishSummaryOpen] = useState(false);
  const [isUnpublishModalOpen, setIsUnpublishModalOpen] = useState(false);
  const [isUnsavedWarningOpen, setIsUnsavedWarningOpen] = useState(false);
  const [isChangeTemplateOpen, setIsChangeTemplateOpen] = useState(false);
  const [pendingNavigationUrl, setPendingNavigationUrl] = useState<string | null>(null);

  // Media Picker Popup State
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaTargetField, setMediaTargetField] = useState<{
    section: SectionType;
    field: string;
    index?: number;
  } | null>(null);

  // Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string, title?: string) => {
    setToasts((prev) => [...prev, { id: 'toast-' + Date.now() + '-' + Math.random(), type, message, title }]);
  };

  // ----------------------------------------------------
  // INITIALIZATION DATA FETCHING
  // ----------------------------------------------------
  useEffect(() => {
    if (!websiteId) return;
    setIsLoading(true);

    Promise.all([
      getWebsiteApi(websiteId),
      fetchWebsiteFullContent(websiteId),
    ])
      .then(([webRes, contentData]) => {
        if (webRes && webRes.data) {
          setWebsite(webRes.data);
        }
        if (contentData) {
          setSavedContent(contentData);
          setBuilderContent(contentData);
          setHistoryStack([contentData]);
        }
      })
      .catch((err) => {
        console.error('Builder initialization failed:', err);
        addToast('error', 'Failed to load website workspace content.', 'Load Error');
      })
      .finally(() => setIsLoading(false));
  }, [websiteId]);

  // Dirty check: True if builderContent differs from savedContent
  const isDirty = React.useMemo(() => {
    if (!builderContent || !savedContent) return false;
    return JSON.stringify(builderContent) !== JSON.stringify(savedContent);
  }, [builderContent, savedContent]);

  // ----------------------------------------------------
  // HISTORY UNDO / REDO CONTROLS
  // ----------------------------------------------------
  const updateBuilderContentState = useCallback((newContent: WebsiteContent) => {
    setBuilderContent((prev) => {
      if (prev) {
        setHistoryStack((hStack) => [...hStack, prev]);
        setRedoStack([]);
      }
      return newContent;
    });
  }, []);

  const handleUndo = useCallback(() => {
    if (historyStack.length <= 1 || !builderContent) return;
    const previous = historyStack[historyStack.length - 1];
    const newHistory = historyStack.slice(0, historyStack.length - 1);

    setRedoStack((rStack) => [builderContent, ...rStack]);
    setHistoryStack(newHistory);
    setBuilderContent(previous);
  }, [historyStack, builderContent]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0 || !builderContent) return;
    const next = redoStack[0];
    const newRedo = redoStack.slice(1);

    setHistoryStack((hStack) => [...hStack, builderContent]);
    setRedoStack(newRedo);
    setBuilderContent(next);
  }, [redoStack, builderContent]);

  // Keyboard Shortcuts for Undo/Redo (Ctrl+Z / Ctrl+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Unsaved Changes Browser Exit Protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const handleSafeBackNavigation = (url: string) => {
    if (isDirty) {
      setPendingNavigationUrl(url);
      setIsUnsavedWarningOpen(true);
    } else {
      router.push(url);
    }
  };

  // ----------------------------------------------------
  // SECTION VISIBILITY TOGGLE
  // ----------------------------------------------------
  const handleToggleSectionVisibility = (sec: SectionType) => {
    setSectionVisibility((prev) => ({
      ...prev,
      [sec]: !prev[sec],
    }));
  };

  // Filtered Content for TemplateRenderer Preview
  const displayPreviewContent = React.useMemo(() => {
    if (!builderContent) return null;
    return {
      ...builderContent,
      hero: sectionVisibility.hero ? builderContent.hero : null,
      about: sectionVisibility.about ? builderContent.about : null,
      services: sectionVisibility.services ? builderContent.services : [],
      galleries: sectionVisibility.gallery ? builderContent.galleries : [],
      testimonials: sectionVisibility.testimonials ? builderContent.testimonials : [],
      contact: sectionVisibility.contact ? builderContent.contact : null,
      socialLinks: sectionVisibility.social ? builderContent.socialLinks : [],
    };
  }, [builderContent, sectionVisibility]);

  // ----------------------------------------------------
  // RESET SECTION & RESET ALL
  // ----------------------------------------------------
  const handleResetSection = (sec: SectionType) => {
    if (!builderContent || !savedContent) return;
    const contentKey =
      sec === 'gallery' ? 'galleries' : sec === 'social' ? 'socialLinks' : sec;
    const restored = { ...builderContent, [contentKey]: savedContent[contentKey as keyof WebsiteContent] };
    updateBuilderContentState(restored as WebsiteContent);
    addToast('info', `Restored ${sec} section to saved database state.`);
  };

  const handleResetAll = () => {
    if (!savedContent) return;
    setBuilderContent(savedContent);
    setHistoryStack([savedContent]);
    setRedoStack([]);
    addToast('info', 'Restored all sections to last saved database state.');
  };

  // ----------------------------------------------------
  // FIELD UPDATE HANDLERS
  // ----------------------------------------------------
  const handleThemeChange = (field: string, value: string) => {
    if (!builderContent) return;
    const baseTheme = builderContent.theme || {
      id: '',
      websiteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    updateBuilderContentState({
      ...builderContent,
      theme: { ...baseTheme, [field]: value },
    });
  };

  const handleApplyDesignPreset = (presetId: string) => {
    if (!builderContent) return;
    const baseTheme = builderContent.theme || {
      id: '',
      websiteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const presetsMap: Record<string, Partial<Theme>> = {
      luxury: {
        primaryColor: '#075C45',
        secondaryColor: '#C9A45C',
        backgroundColor: '#0F1412',
        bodyFont: 'Playfair Display, serif',
        borderRadius: 'medium',
        buttonStyle: 'solid',
        heroLayout: 'editorial',
        aboutLayout: 'asymmetric',
        servicesStyle: 'cards',
        galleryStyle: 'masonry',
        testimonialsStyle: 'quote',
        sectionSpacing: 'spacious',
        containerWidth: 'wide',
      },
      modern: {
        primaryColor: '#4F46E5',
        secondaryColor: '#06B6D4',
        backgroundColor: '#0F172A',
        bodyFont: 'Inter, sans-serif',
        borderRadius: 'large',
        buttonStyle: 'solid',
        heroLayout: 'centered',
        aboutLayout: 'text-image',
        servicesStyle: 'bento',
        galleryStyle: 'grid',
        testimonialsStyle: 'cards',
        sectionSpacing: 'comfortable',
        containerWidth: 'standard',
      },
      corporate: {
        primaryColor: '#1E3A8A',
        secondaryColor: '#3B82F6',
        backgroundColor: '#F8FAFC',
        bodyFont: 'Roboto, sans-serif',
        borderRadius: 'small',
        buttonStyle: 'solid',
        heroLayout: 'split',
        aboutLayout: 'image-text',
        servicesStyle: 'numbered',
        galleryStyle: 'grid',
        testimonialsStyle: 'cards',
        sectionSpacing: 'comfortable',
        containerWidth: 'standard',
      },
      creative: {
        primaryColor: '#EC4899',
        secondaryColor: '#8B5CF6',
        backgroundColor: '#18181B',
        bodyFont: 'Outfit, sans-serif',
        borderRadius: 'pill',
        buttonStyle: 'pill',
        heroLayout: 'asymmetric',
        aboutLayout: 'asymmetric',
        servicesStyle: 'carousel',
        galleryStyle: 'masonry',
        testimonialsStyle: 'carousel',
        sectionSpacing: 'spacious',
        containerWidth: 'full',
      },
      hospitality: {
        primaryColor: '#991B1B',
        secondaryColor: '#F59E0B',
        backgroundColor: '#0F0F12',
        bodyFont: 'Playfair Display, serif',
        borderRadius: 'large',
        buttonStyle: 'solid',
        heroLayout: 'fullBleed',
        aboutLayout: 'centered',
        servicesStyle: 'cards',
        galleryStyle: 'horizontal',
        testimonialsStyle: 'quote',
        sectionSpacing: 'luxury',
        containerWidth: 'wide',
      },
      executive: {
        primaryColor: '#0F172A',
        secondaryColor: '#1D4ED8',
        backgroundColor: '#F8FAFC',
        bodyFont: 'Inter, sans-serif',
        borderRadius: 'small',
        buttonStyle: 'editorial',
        heroLayout: 'editorial',
        aboutLayout: 'text-image',
        servicesStyle: 'numbered',
        galleryStyle: 'grid',
        testimonialsStyle: 'cards',
        sectionSpacing: 'spacious',
        containerWidth: 'wide',
      },
    };

    const presetValues = presetsMap[presetId] || {};
    updateBuilderContentState({
      ...builderContent,
      theme: { ...baseTheme, ...presetValues },
    });

    addToast('success', `Applied ${presetId} design preset successfully.`);
  };

  const handleResetDesignOnly = () => {
    if (!builderContent || !savedContent) return;
    const savedTheme = (savedContent.theme || {}) as any;
    const baseTheme = builderContent.theme || {
      id: '',
      websiteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    updateBuilderContentState({
      ...builderContent,
      theme: {
        ...baseTheme,
        heroLayout: savedTheme.heroLayout || 'split',
        aboutLayout: savedTheme.aboutLayout || 'text-image',
        servicesStyle: savedTheme.servicesStyle || 'cards',
        galleryStyle: savedTheme.galleryStyle || 'grid',
        testimonialsStyle: savedTheme.testimonialsStyle || 'cards',
        contactStyle: savedTheme.contactStyle || 'split',
        sectionSpacing: savedTheme.sectionSpacing || 'comfortable',
        containerWidth: savedTheme.containerWidth || 'standard',
        borderRadius: savedTheme.borderRadius || 'medium',
        buttonStyle: savedTheme.buttonStyle || 'solid',
        buttonSize: savedTheme.buttonSize || 'medium',
      },
    });

    addToast('info', 'Restored design & layout settings to last saved database state.');
  };

  const handleHeroChange = (field: string, value: string) => {
    if (!builderContent) return;
    const baseHero = builderContent.hero || {
      id: '',
      websiteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedHero: any = { ...baseHero, [field]: value };
    if (field === 'imageId') {
      updatedHero.image = value ? { url: value } : null;
    } else if (field === 'image') {
      const urlVal = typeof value === 'string' ? value : (value as any)?.url || '';
      updatedHero.imageId = urlVal;
    }

    updateBuilderContentState({
      ...builderContent,
      hero: updatedHero,
    });
  };

  const handleAboutChange = (field: string, value: string) => {
    if (!builderContent) return;
    const baseAbout = builderContent.about || {
      id: '',
      websiteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedAbout: any = { ...baseAbout, [field]: value };
    if (field === 'imageId') {
      updatedAbout.image = value ? { url: value } : null;
    } else if (field === 'image') {
      const urlVal = typeof value === 'string' ? value : (value as any)?.url || '';
      updatedAbout.imageId = urlVal;
    }

    updateBuilderContentState({
      ...builderContent,
      about: updatedAbout,
    });
  };

  const handleContactChange = (field: string, value: string) => {
    if (!builderContent) return;
    const baseContact = builderContent.contact || {
      id: '',
      websiteId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    updateBuilderContentState({
      ...builderContent,
      contact: { ...baseContact, [field]: value },
    });
  };

  // ----------------------------------------------------
  // MEDIA PICKER HANDLERS
  // ----------------------------------------------------
  const handleOpenMediaPicker = (section: SectionType, field: string, index?: number) => {
    setMediaTargetField({ section, field, index });
    setIsMediaPickerOpen(true);
  };

  const handleSelectMediaUrl = (url: string) => {
    if (!mediaTargetField || !builderContent) return;
    const { section, field, index } = mediaTargetField;

    if (section === 'hero') {
      const baseHero = builderContent.hero || {
        id: '',
        websiteId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateBuilderContentState({
        ...builderContent,
        hero: { ...baseHero, imageId: url, image: { url } as any },
      });
    } else if (section === 'about') {
      const baseAbout = builderContent.about || {
        id: '',
        websiteId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updateBuilderContentState({
        ...builderContent,
        about: { ...baseAbout, imageId: url, image: { url } as any },
      });
    } else if (section === 'seo') {
      handleThemeChange(field, url);
    } else if (section === 'gallery' && index !== undefined) {
      const galleries = builderContent.galleries || [];
      const updatedItems = [...(galleries[0]?.items || [])];
      if (updatedItems[index]) {
        updatedItems[index] = { ...updatedItems[index], mediaId: url };
        const updatedGalleries = [...galleries];
        if (updatedGalleries[0]) {
          updatedGalleries[0] = { ...updatedGalleries[0], items: updatedItems };
        }
        updateBuilderContentState({ ...builderContent, galleries: updatedGalleries });
      }
    } else if (section === 'testimonials' && index !== undefined) {
      const testimonials = [...(builderContent.testimonials || [])];
      if (testimonials[index]) {
        testimonials[index] = { ...testimonials[index], avatarMediaId: url };
        updateBuilderContentState({ ...builderContent, testimonials });
      }
    }
  };

  // ----------------------------------------------------
  // SAVE ALL EDITS TO BACKEND
  // ----------------------------------------------------
  const handleSaveAll = async () => {
    if (!builderContent || !website) return;
    setIsSaving(true);
    try {
      // 1. Theme, Design & SEO Config
      if (builderContent.theme) {
        await upsertThemeApi(websiteId, {
          primaryColor: builderContent.theme.primaryColor,
          secondaryColor: builderContent.theme.secondaryColor || undefined,
          accentColor: builderContent.theme.accentColor || undefined,
          backgroundColor: builderContent.theme.backgroundColor || undefined,
          textColor: builderContent.theme.textColor || undefined,
          headingFont: builderContent.theme.headingFont || undefined,
          bodyFont: builderContent.theme.bodyFont || undefined,
          logoUrl: builderContent.theme.logoUrl || undefined,
          brandName: builderContent.theme.brandName || undefined,
          buttonStyle: builderContent.theme.buttonStyle || undefined,
          borderRadius: builderContent.theme.borderRadius || undefined,
          heroLayout: builderContent.theme.heroLayout || undefined,
          aboutLayout: builderContent.theme.aboutLayout || undefined,
          servicesStyle: builderContent.theme.servicesStyle || undefined,
          galleryStyle: (builderContent.theme as any).galleryStyle || (builderContent.theme as any).galleryLayout || undefined,
          testimonialsStyle: builderContent.theme.testimonialsStyle || undefined,
          contactStyle: builderContent.theme.contactStyle || undefined,
          sectionSpacing: builderContent.theme.sectionSpacing || undefined,
          containerWidth: builderContent.theme.containerWidth || undefined,
          buttonSize: builderContent.theme.buttonSize || undefined,
          designPreset: builderContent.theme.designPreset || undefined,
          seoTitle: builderContent.theme.seoTitle || undefined,
          seoDescription: builderContent.theme.seoDescription || undefined,
          keywords: builderContent.theme.keywords || undefined,
          canonicalUrl: builderContent.theme.canonicalUrl || undefined,
          ogTitle: builderContent.theme.ogTitle || undefined,
          ogDescription: builderContent.theme.ogDescription || undefined,
          ogImage: builderContent.theme.ogImage || undefined,
          twitterImage: builderContent.theme.twitterImage || undefined,
          faviconUrl: builderContent.theme.faviconUrl || undefined,
        });
      }

      // 2. Hero
      if (builderContent.hero) {
        await upsertHeroApi(websiteId, {
          eyebrow: builderContent.hero.eyebrow || undefined,
          title: builderContent.hero.title,
          description: builderContent.hero.description || undefined,
          primaryButtonText: builderContent.hero.primaryButtonText || undefined,
          primaryButtonUrl: builderContent.hero.primaryButtonUrl || undefined,
          secondaryButtonText: builderContent.hero.secondaryButtonText || undefined,
          secondaryButtonUrl: builderContent.hero.secondaryButtonUrl || undefined,
          imageId: builderContent.hero.imageId ?? '',
          bgOpacity: (builderContent.hero as any).bgOpacity || undefined,
        } as any);
      }

      // 3. About
      if (builderContent.about) {
        await upsertAboutApi(websiteId, {
          eyebrow: builderContent.about.eyebrow || undefined,
          title: builderContent.about.title,
          description: builderContent.about.description || undefined,
          imageId: builderContent.about.imageId ?? '',
          bgOpacity: (builderContent.about as any).bgOpacity || undefined,
        } as any);
      }

      // 4. Contact
      if (builderContent.contact) {
        await upsertContactApi(websiteId, {
          email: builderContent.contact.email || undefined,
          phone: builderContent.contact.phone || undefined,
          whatsapp: builderContent.contact.whatsapp || undefined,
          address: builderContent.contact.address || undefined,
          city: builderContent.contact.city || undefined,
          state: builderContent.contact.state || undefined,
          country: builderContent.contact.country || undefined,
          mapUrl: builderContent.contact.mapUrl || undefined,
        });
      }

      // 5. Services items
      if (builderContent.services && builderContent.services.length > 0) {
        for (const srv of builderContent.services) {
          if (srv.id && !srv.id.startsWith('temp-') && !srv.id.startsWith('s')) {
            await updateServiceApi(websiteId, srv.id, {
              title: srv.title,
              shortDescription: srv.shortDescription || undefined,
              description: srv.description || undefined,
              sortOrder: srv.sortOrder,
              isActive: srv.isActive,
            });
          }
        }
      }

      // 6. Testimonials items
      if (builderContent.testimonials && builderContent.testimonials.length > 0) {
        for (const tst of builderContent.testimonials) {
          if (tst.id && !tst.id.startsWith('temp-') && !tst.id.startsWith('t')) {
            await updateTestimonialApi(websiteId, tst.id, {
              name: tst.name,
              role: tst.role || undefined,
              company: tst.company || undefined,
              content: tst.content,
              sortOrder: tst.sortOrder,
              isActive: tst.isActive,
            });
          }
        }
      }

      // Refresh full saved content
      const freshContent = await fetchWebsiteFullContent(websiteId);
      if (freshContent) {
        setSavedContent(freshContent);
        setBuilderContent(freshContent);
        setHistoryStack([freshContent]);
        setRedoStack([]);
      }

      addToast('success', 'All website changes persisted successfully to database.', 'Changes Saved');
    } catch (err: any) {
      console.error('Save failed:', err);
      addToast('error', err.message || 'Unable to save website changes. Please try again.', 'Save Error');
    } finally {
      setIsSaving(false);
    }
  };

  // Safe Template Switch Handler
  const handleConfirmTemplateSwitch = async (newConfig: any) => {
    if (!website) return;
    try {
      const res = await updateWebsiteApi(websiteId, {
        templateId: newConfig.id || newConfig.slug,
      });

      if (res && res.data) {
        setWebsite({
          ...res.data,
          template: {
            id: newConfig.id || '',
            name: newConfig.name,
            slug: newConfig.slug,
            templateKey: newConfig.componentKey,
          } as any,
        });
      }

      if (builderContent && newConfig.defaultContent) {
        const mergedTheme = { ...newConfig.defaultContent.theme, ...builderContent.theme };
        setBuilderContent({
          ...builderContent,
          theme: mergedTheme,
        });
      }

      addToast('success', `Website template switched to ${newConfig.name}. All existing content preserved.`, 'Template Switched');
    } catch (err: any) {
      addToast('error', err.message || 'Failed to switch website template.', 'Template Switch Error');
    }
  };

  // Publish / Unpublish Actions
  const handlePublishToggle = async (publish: boolean) => {
    try {
      const res = await updateWebsiteApi(websiteId, {
        isPublished: publish,
        status: publish ? 'PUBLISHED' : 'DRAFT',
      });
      if (res && res.data) {
        setWebsite(res.data);
        addToast(
          'success',
          publish ? 'Website is now published live on public web route.' : 'Website status changed to Draft.',
          publish ? 'Website Published' : 'Website Unpublished'
        );
      }
    } catch (err: any) {
      addToast('error', err.message || 'Failed to update website status.', 'Status Error');
    } finally {
      setIsPublishSummaryOpen(false);
      setIsUnpublishModalOpen(false);
    }
  };

  // Resolve template configuration schema dynamically
  const templateDef = resolveTemplateDefinition(website, website?.template);
  const supportedKeys = templateDef?.config?.supportedSections?.map((s) => s.key) || [
    'theme',
    'design',
    'seo',
    'hero',
    'about',
    'services',
    'gallery',
    'testimonials',
    'contact',
    'social',
  ];

  // Section items configuration for SectionNavigator
  const sectionsList = [
    { id: 'theme' as SectionType, label: 'Theme & Fonts', icon: Palette, status: 'completed' as const, isVisiblyEnabled: sectionVisibility.theme },
    { id: 'design' as SectionType, label: 'Design & Layouts', icon: Sliders, status: 'completed' as const, isVisiblyEnabled: sectionVisibility.design },
    { id: 'seo' as SectionType, label: 'SEO & Metadata', icon: Search, status: 'completed' as const, isVisiblyEnabled: sectionVisibility.seo },
    { id: 'hero' as SectionType, label: 'Hero Banner', icon: Sparkles, status: 'completed' as const, isVisiblyEnabled: sectionVisibility.hero },
    { id: 'about' as SectionType, label: 'About Overview', icon: Info, status: 'completed' as const, isVisiblyEnabled: sectionVisibility.about },
    { id: 'services' as SectionType, label: 'Services', icon: Briefcase, status: (builderContent?.services?.length || 0) > 0 ? 'completed' as const : 'optional' as const, isVisiblyEnabled: sectionVisibility.services },
    { id: 'gallery' as SectionType, label: 'Media Gallery', icon: Images, status: (builderContent?.galleries?.[0]?.items?.length || 0) > 0 ? 'completed' as const : 'optional' as const, isVisiblyEnabled: sectionVisibility.gallery },
    { id: 'testimonials' as SectionType, label: 'Testimonials', icon: MessageSquareQuote, status: (builderContent?.testimonials?.length || 0) > 0 ? 'completed' as const : 'optional' as const, isVisiblyEnabled: sectionVisibility.testimonials },
    { id: 'contact' as SectionType, label: 'Contact Details', icon: PhoneCall, status: 'completed' as const, isVisiblyEnabled: sectionVisibility.contact },
    { id: 'social' as SectionType, label: 'Social Profiles', icon: Share2, status: (builderContent?.socialLinks?.length || 0) > 0 ? 'completed' as const : 'optional' as const, isVisiblyEnabled: sectionVisibility.social },
  ].filter((sec) => supportedKeys.includes(sec.id));

  if (isLoading || !website) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0F1412] flex flex-col items-center justify-center space-y-3 font-sans text-stone-200">
        <Loader2 className="w-8 h-8 text-[#C9A45C] animate-spin" />
        <p className="text-sm font-semibold tracking-wide">Initializing Emperor Media Solution Website Builder...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] w-screen h-screen bg-[#0F1412] text-stone-100 flex flex-col font-sans overflow-hidden">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />

      {/* TOP STICKY TOOLBAR */}
      <BuilderToolbar
        website={website}
        isDirty={isDirty}
        isSaving={isSaving}
        canUndo={historyStack.length > 1}
        canRedo={redoStack.length > 0}
        viewport={viewport}
        isFullscreen={isFullscreen}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onViewportChange={setViewport}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onSave={handleSaveAll}
        onSafeBack={handleSafeBackNavigation}
        onOpenPublishModal={() => setIsPublishSummaryOpen(true)}
        onOpenUnpublishModal={() => setIsUnpublishModalOpen(true)}
        onOpenChangeTemplateModal={() => setIsChangeTemplateOpen(true)}
        isAdmin={isAdmin}
      />

      {/* MAIN 3-COLUMN BUILDER WORKSPACE */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* COLUMN 1: LEFT SECTION NAVIGATOR */}
        <SectionNavigator
          sections={sectionsList}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onToggleVisibility={handleToggleSectionVisibility}
          onResetAll={handleResetAll}
          isDirty={isDirty}
        />

        {/* COLUMN 2: CENTER REAL-TIME LIVE PREVIEW CANVAS */}
        <LivePreview
          website={website}
          content={displayPreviewContent}
          viewport={viewport}
          isFullscreen={isFullscreen}
          onExitFullscreen={() => setIsFullscreen(false)}
        />

        {/* COLUMN 3: RIGHT CONTEXTUAL SECTION EDITOR */}
        <aside className="w-80 sm:w-96 bg-[#0B0F17] border-l border-slate-800 shrink-0 flex flex-col min-h-0 z-20 font-sans">
          <div className="p-3 border-b border-slate-800 bg-[#0F172A] flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#FA8373]">
              {sectionsList.find((s) => s.id === activeSection)?.label} Editor
            </h2>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 text-slate-200">
            {activeSection === 'theme' && (
              <ThemeEditor
                content={builderContent}
                onChangeField={handleThemeChange}
                onOpenMediaPicker={() => handleOpenMediaPicker('seo', 'logoUrl')}
                onResetSection={() => handleResetSection('theme')}
              />
            )}

            {activeSection === 'design' && (
              <DesignCustomizerEditor
                content={builderContent}
                onChangeThemeField={handleThemeChange}
                onApplyPreset={handleApplyDesignPreset}
                onResetDesignOnly={handleResetDesignOnly}
              />
            )}

            {activeSection === 'seo' && (
              <SeoEditor
                content={builderContent}
                slug={website.slug}
                websiteName={website.name}
                onChangeThemeField={handleThemeChange}
                onOpenMediaPickerForSeo={(field) => handleOpenMediaPicker('seo', field)}
              />
            )}

            {activeSection === 'hero' && (
              <HeroEditor
                content={builderContent}
                onChangeField={handleHeroChange}
                onOpenMediaPicker={() => handleOpenMediaPicker('hero', 'imageId')}
                onResetSection={() => handleResetSection('hero')}
              />
            )}

            {activeSection === 'about' && (
              <AboutEditor
                content={builderContent}
                onChangeField={handleAboutChange}
                onOpenMediaPicker={() => handleOpenMediaPicker('about', 'imageId')}
                onResetSection={() => handleResetSection('about')}
              />
            )}

            {activeSection === 'services' && (
              <ServicesEditor
                content={builderContent}
                websiteId={websiteId}
                onUpdateServices={(services) =>
                  updateBuilderContentState({ ...builderContent!, services })
                }
                onResetSection={() => handleResetSection('services')}
              />
            )}

            {activeSection === 'gallery' && (
              <GalleryEditor
                content={builderContent}
                onOpenMediaPickerForGallery={(idx) => handleOpenMediaPicker('gallery', 'mediaId', idx)}
                onRemoveGalleryItem={(idx) => {
                  const galleries = [...(builderContent?.galleries || [])];
                  if (galleries[0] && galleries[0].items) {
                    const items = [...galleries[0].items];
                    items.splice(idx, 1);
                    galleries[0] = { ...galleries[0], items };
                    updateBuilderContentState({ ...builderContent!, galleries });
                  }
                }}
                onResetSection={() => handleResetSection('gallery')}
              />
            )}

            {activeSection === 'testimonials' && (
              <TestimonialsEditor
                content={builderContent}
                websiteId={websiteId}
                onUpdateTestimonials={(testimonials) =>
                  updateBuilderContentState({ ...builderContent!, testimonials })
                }
                onResetSection={() => handleResetSection('testimonials')}
                onOpenMediaPickerForAvatar={(idx) => handleOpenMediaPicker('testimonials', 'avatarMediaId', idx)}
              />
            )}

            {activeSection === 'contact' && (
              <ContactEditor
                content={builderContent}
                onChangeField={handleContactChange}
                onResetSection={() => handleResetSection('contact')}
              />
            )}

            {activeSection === 'social' && (
              <SocialLinksEditor
                content={builderContent}
                websiteId={websiteId}
                onUpdateSocialLinks={(socialLinks) =>
                  updateBuilderContentState({ ...builderContent!, socialLinks })
                }
                onResetSection={() => handleResetSection('social')}
              />
            )}
          </div>
        </aside>
      </div>

      {/* MEDIA PICKER MODAL */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectMedia={handleSelectMediaUrl}
        websiteId={websiteId}
      />

      {/* PRE-PUBLISH AUDIT & SUMMARY MODAL */}
      <PublishSummaryModal
        isOpen={isPublishSummaryOpen}
        onClose={() => setIsPublishSummaryOpen(false)}
        onConfirmPublish={() => handlePublishToggle(true)}
        website={website}
        content={builderContent}
        isPublishing={false}
      />

      {/* UNPUBLISH CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={isUnpublishModalOpen}
        onClose={() => setIsUnpublishModalOpen(false)}
        onConfirm={() => handlePublishToggle(false)}
        title="Unpublish Website?"
        message={`Revert "${website.name}" back to Draft status? Public visitors will no longer be able to view this website.`}
        confirmText="Unpublish"
        isDanger={true}
      />

      {/* UNSAVED CHANGES WARNING DIALOG */}
      <ConfirmDialog
        isOpen={isUnsavedWarningOpen}
        onClose={() => setIsUnsavedWarningOpen(false)}
        onConfirm={() => {
          setIsUnsavedWarningOpen(false);
          if (pendingNavigationUrl) router.push(pendingNavigationUrl);
        }}
        title="Discard Unsaved Changes?"
        message="You have unsaved changes in your website builder session. Leaving now will discard all unsaved edits."
        confirmText="Discard & Leave"
        isDanger={true}
      />

      {/* CHANGE TEMPLATE ENGINE MODAL */}
      <ChangeTemplateModal
        isOpen={isChangeTemplateOpen}
        currentTemplateId={website.templateId || website.template?.slug}
        onClose={() => setIsChangeTemplateOpen(false)}
        onConfirmSwitch={handleConfirmTemplateSwitch}
      />
    </div>
  );
}
