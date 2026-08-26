/**
 * Strapi CMS Integration Layer
 *
 * All frontend CMS fetching goes through this file.
 * Rules: integate-rule.md §2–§9
 */

import type { Locale } from "./i18n";
// Cache disabled — every request goes to Strapi API directly

// ─── Constants ──────────────────────────────────────────────────────

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
const MAX_RETRIES = 2;
const TIMEOUT_MS = 8000;

// ─── Errors ─────────────────────────────────────────────────────────

export class StrapiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public path?: string,
  ) {
    super(message);
    this.name = "StrapiError";
  }
}

// ─── Strapi Response Types ──────────────────────────────────────────

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
}

// ─── Media Type ─────────────────────────────────────────────────────

export interface StrapiMedia {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

// ─── Component Interfaces ───────────────────────────────────────────

/** shared.seo-meta */
export interface SeoMeta {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: StrapiMedia | null;
  ogType?: "website" | "article" | "product";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: StrapiMedia | null;
  noindex?: boolean;
  nofollow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: "none" | "standard" | "large";
  maxVideoPreview?: number;
  schemaType?: string;
  alternateLanguages?: Record<string, string> | null;
  /** @deprecated Use individual boolean fields instead */
  robots?: string;
}

/** shared.seo-config */
export interface SeoConfig {
  siteUrl?: string;
  siteName?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultOgImage?: StrapiMedia | null;
  brandName?: string;
  facebookUrl?: string;
  lineUrl?: string;
  twitterUrl?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  twitterHandle?: string;
}

/** shared.contact-info */
export interface ContactInfo {
  label: string;
  value: string;
  icon?: string;
  url?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** shared.stat-item */
export interface StatItem {
  label: string;
  value: string;
  icon?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** footer.footer-section */
export interface FooterSection {
  title: string;
  links?: FooterLink[];
  sortOrder?: number;
  isActive?: boolean;
}

/** footer.footer-link */
export interface FooterLink {
  label: string;
  productPage?: Product | null;
  url?: string;
  target?: "_self" | "_blank";
  sortOrder?: number;
  isActive?: boolean;
}

/** footer.legal-link */
export interface LegalLink {
  label: string;
  url: string;
  target?: "_self" | "_blank";
  sortOrder?: number;
  isActive?: boolean;
}

/** shared.cookie-consent-settings */
export interface CookieConsentSettings {
  title?: string;
  description?: string;
  necessaryLabel?: string;
  necessaryDescription?: string;
  analyticsLabel?: string;
  analyticsDescription?: string;
  marketingLabel?: string;
  marketingDescription?: string;
  acceptAllLabel?: string;
  rejectAllLabel?: string;
  manageLabel?: string;
  saveLabel?: string;
  privacyPolicyLabel?: string;
  cookiePolicyLabel?: string;
  alwaysOnLabel?: string;
  learnMoreLabel?: string;
}

/** contact-floating.contact-action */
export interface ContactAction {
  type: "phone" | "email" | "line" | "whatsapp" | "link";
  label: string;
  description?: string;
  url: string;
  ariaLabel?: string;
  openInNewTab?: boolean;
  sortOrder?: number;
  isActive?: boolean;
}

/** navigation.nav-child-item */
export interface NavChildItem {
  label: string;
  url?: string;
  productPage?: Product | null;
  target?: "_self" | "_blank";
}

/** navigation.nav-item */
export interface NavItem {
  label: string;
  url?: string;
  target?: "_self" | "_blank";
  children?: NavChildItem[];
}

/** navigation.footer-section */
export interface NavigationFooterSection {
  title: string;
  links?: NavChildItem[];
  sortOrder?: number;
  isActive?: boolean;
}

/** navigation.product-name */
export interface ProductName {
  name: string;
  url?: string;
  sortOrder?: number;
}

/** shared.footer-labels */
export interface FooterLabels {
  contactHeading?: string;
  linksHeading?: string;
  aboutHeading?: string;
  newsletterHeading?: string;
  newsletterPlaceholder?: string;
  newsletterButton?: string;
}

/** shared.button-labels */
export interface ButtonLabels {
  contactUs?: string;
  learnMore?: string;
  viewAll?: string;
  readMore?: string;
  backToHome?: string;
  callNow?: string;
  requestQuote?: string;
  download?: string;
}

/** privacy.policy-section */
export interface PolicySection {
  title: string;
  content: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** privacy.related-link */
export interface RelatedLink {
  label: string;
  product?: Product | null;
  url?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** free-trial.trust-item */
export interface TrustItem {
  label: string;
  icon?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** free-trial.form-labels */
export interface FormLabel {
  label: string;
  placeholder?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** free-trial.trial-feature */
export interface TrialFeature {
  title: string;
  icon?: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** faq.faq-item */
export interface FaqItem {
  question: string;
  answer: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** support.hero-section */
export interface SupportHeroSection {
  badge?: string;
  title: string;
  subtitle?: string;
  faqCtaLabel?: string;
  manualCtaLabel?: string;
  contactCtaLabel?: string;
}

/** support.status-card */
export interface SupportStatusCard {
  kicker?: string;
  title?: string;
  hours?: string;
  statusLabel?: string;
}

/** support.faq-section */
export interface SupportFaqSection {
  badge?: string;
  title: string;
  subtitle?: string;
  emptyPrompt?: string;
  contactCtaLabel?: string;
}

/** support.help-center-section */
export interface SupportHelpCenterSection {
  badge?: string;
  title: string;
  subtitle?: string;
}

/** support.contact-section */
export interface SupportContactSection {
  badge?: string;
  title: string;
  addressLabel?: string;
  businessHoursLabel?: string;
  phoneLabel?: string;
  emailLabel?: string;
}

// ─── Content Type Interfaces ────────────────────────────────────────

/** api::about-page.about-page */
export interface AboutPage {
  title: string;
  subtitle?: string;
  featuredImage?: StrapiMedia | null;
  stats?: StatItem[];
  content?: string;
  teamMembers?: TeamMember[];
  partners?: Partner[];
  timelineMilestones?: TimelineMilestone[];
  seo?: SeoMeta | null;
}

/** api::article.article */
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featuredImage?: StrapiMedia | null;
  author?: string;
  articleDate?: string;
  tags?: string[];
  views?: number;
  category?: Category | null;
  seo?: SeoMeta | null;
  publishedAt?: string;
}

/** api::brand.brand */
export interface Brand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  logo?: StrapiMedia | null;
  description?: string;
  products?: Product[];
  seo?: SeoMeta | null;
}

/** api::category.category */
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiMedia | null;
  products?: Product[];
  articles?: Article[];
  seo?: SeoMeta | null;
}

/** api::contact-page.contact-page */
export interface ContactPage {
  title: string;
  subtitle?: string;
  featuredImage?: StrapiMedia | null;
  content?: string;
  seo?: SeoMeta | null;
}

/** api::cookie-category.cookie-category */
export interface CookieCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
  isRequired?: boolean;
  isDefaultEnabled?: boolean;
  cookies?: CookieEntry[] | null;
  privacyPolicyUrl?: string;
}

export interface CookieEntry {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: string;
}

/** api::cookie-policy.cookie-policy */
export interface CookiePolicy {
  title: string;
  description?: string;
  featuredImage?: StrapiMedia | null;
  content?: string;
  lastUpdated?: string;
  seo?: SeoMeta | null;
}

/** api::faq.faq */
export interface Faq {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description?: string;
  items?: FaqItem[];
  sortOrder?: number;
  isActive?: boolean;
  seo?: SeoMeta | null;
}

/** api::footer-setting.footer-setting */
export interface FooterSetting {
  ctaBadge?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  stats?: StatItem[];
  companyDescription?: string;
  socialLinks?: Record<string, string> | null;
  footerSections?: FooterSection[];
  legalLinks?: LegalLink[];
  copyright?: string;
}

/** api::free-trial.free-trial */
export interface FreeTrial {
  title: string;
  subtitle?: string;
  featuredImage?: StrapiMedia | null;
  trustItems?: TrustItem[];
  content?: string;
  trialFeatures?: TrialFeature[];
  formLabels?: FormLabel[];
  testimonials?: Testimonial[];
  seo?: SeoMeta | null;
}

/** api::global-setting.global-setting */
export interface GlobalSetting {
  siteName?: string;
  siteLogo?: StrapiMedia | null;
  contactInfo?: ContactInfo[];
  stats?: StatItem[];
  seoConfig?: SeoConfig | null;
}

/** api::cookie-setting.cookie-setting */
export interface CookieSetting {
  settings?: CookieConsentSettings | null;
}

/** api::contact-floating.contact-floating */
export interface ContactFloating {
  isEnabled?: boolean;
  buttonLabel?: string;
  panelTitle?: string;
  panelDescription?: string;
  closeLabel?: string;
  actions?: ContactAction[];
}

/** api::navigation.navigation */
export interface Navigation {
  name: string;
  headerItems?: NavItem[];
  footerSections?: NavigationFooterSection[];
  footerLabels?: FooterLabels | null;
  productNames?: ProductName[];
  buttonLabels?: ButtonLabels | null;
}

/** api::partner.partner */
export interface Partner {
  id: number;
  documentId: string;
  name: string;
  websiteUrl?: string;
  description?: string;
  logo?: StrapiMedia | null;
  aboutPage?: AboutPage | null;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::pdpa-setting.pdpa-setting */
export interface PdpaSetting {
  companyName: string;
  dpoName?: string;
  dpoPosition?: string;
  dpoEmail?: string;
  dpoPhone?: string;
  contactInfo?: ContactInfo[];
  dataRetentionDays?: number;
  dataRetentionDescription?: string;
  rightsText?: string;
  thirdPartiesText?: string;
  consentBanner?: CookieConsentSettings | null;
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;
  contactText?: string;
  appliesToProducts?: Product[];
  isActive?: boolean;
  seo?: SeoMeta | null;
}

/** api::privacy-policy.privacy-policy */
export interface PrivacyPolicy {
  title: string;
  description?: string;
  featuredImage?: StrapiMedia | null;
  content?: string;
  policySections?: PolicySection[];
  effectiveDate?: string;
  lastUpdated?: string;
  appliesToProducts?: Product[];
  relatedLinks?: RelatedLink[];
  contactInfo?: ContactInfo[];
  seo?: SeoMeta | null;
}

/** api::product.product */
export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price?: number;
  ribbonType: "wax" | "wax_resin" | "resin";
  sizes?: unknown;
  compatibility?: string;
  isFeatured?: boolean;
  images?: StrapiMedia[];
  brand?: Brand | null;
  categories?: Category[];
  privacyAppliedIn?: PrivacyPolicy[];
  pdpaAppliedIn?: PdpaSetting[];
  seo?: SeoMeta | null;
  publishedAt?: string;
}

/** api::team-member.team-member */
export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  position?: string;
  bio?: string;
  avatar?: StrapiMedia | null;
  aboutPage?: AboutPage | null;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::terms-of-service.terms-of-service */
export interface TermsOfService {
  title: string;
  description?: string;
  featuredImage?: StrapiMedia | null;
  content?: string;
  effectiveDate?: string;
  lastUpdated?: string;
  seo?: SeoMeta | null;
}

/** api::testimonial.testimonial */
export interface Testimonial {
  id: number;
  documentId: string;
  name: string;
  position?: string;
  company?: string;
  quote: string;
  rating?: number;
  avatar?: StrapiMedia | null;
  freeTrialPages?: FreeTrial[];
  sortOrder?: number;
  isActive?: boolean;
}

/** api::timeline-milestone.timeline-milestone */
export interface TimelineMilestone {
  id: number;
  documentId: string;
  title: string;
  milestoneDate?: string;
  description?: string;
  image?: StrapiMedia | null;
  aboutPage?: AboutPage | null;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::support-page.support-page */
export interface SupportPage {
  heroSection?: SupportHeroSection;
  statusCard?: SupportStatusCard;
  faqSection?: SupportFaqSection;
  faqs?: Faq[];
  helpCenterSection?: SupportHelpCenterSection;
  helpResources?: Faq[];
  contactSection?: SupportContactSection;
  contactSettings?: GlobalSetting | null;
  seo?: SeoMeta | null;
}

// ─── Fetch Engine ───────────────────────────────────────────────────

async function fetchAPI<T>(
  path: string,
  params: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });



  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const res = await fetch(url.toString(), {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new StrapiError(
          `Strapi API error: ${res.status} ${res.statusText}`,
          res.status,
          path,
        );
      }

      const data: T = await res.json();
      return data;
    } catch (err) {
      lastError = err as Error;

      if (
        err instanceof StrapiError &&
        err.status &&
        err.status >= 400 &&
        err.status < 500 &&
        err.status !== 408 &&
        err.status !== 429
      ) {
        throw err;
      }

      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      }
    }
  }

  throw new StrapiError(
    `Failed to fetch ${path} after ${MAX_RETRIES + 1} attempts: ${lastError?.message || "Unknown error"}`,
    undefined,
    path,
  );
}

// ─── Public Fetch Helpers (integate-rule.md §2) ────────────────────

/**
 * Fetch a single type from Strapi.
 * Use for: about-page, contact-page, free-trial, privacy-policy, etc.
 */
export async function fetchStrapiSingle<T>(
  slug: string,
  options: { locale?: Locale; populate?: string[] } = {},
): Promise<StrapiSingleResponse<T>> {
  const { locale = "th", populate = ["*"] } = options;
  return fetchAPI<StrapiSingleResponse<T>>(`/${slug}`, {
    locale,
    populate: populate.join(","),
  });
}

/**
 * Fetch a collection type from Strapi.
 * Use for: products, articles, categories, brands, etc.
 */
export async function fetchStrapiCollection<T>(
  slug: string,
  options: {
    locale?: Locale;
    populate?: string[];
    sort?: string;
    filters?: Record<string, string>;
    pagination?: { page: number; pageSize: number };
  } = {},
): Promise<StrapiResponse<T[]>> {
  const {
    locale = "th",
    populate = ["*"],
    sort,
    filters,
    pagination,
  } = options;

  const params: Record<string, string> = {
    locale,
    populate: populate.join(","),
  };

  if (sort) params.sort = sort;
  if (pagination) {
    params["pagination[page]"] = String(pagination.page);
    params["pagination[pageSize]"] = String(pagination.pageSize);
  }
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params[key] = value;
    });
  }

  return fetchAPI<StrapiResponse<T[]>>(`/${slug}`, params);
}

// ─── Media Helpers (integate-rule.md §9) ────────────────────────────

/**
 * Get absolute URL for a Strapi media asset.
 * Supports optional format (small, medium, thumbnail, etc.)
 */
export function getStrapiAbsoluteImageUrl(
  media: StrapiMedia | null | undefined,
  format?: string,
): string {
  if (!media) return "";

  // Try requested format first
  if (format && media.formats?.[format]) {
    const fmtUrl = media.formats[format].url;
    if (fmtUrl.startsWith("http")) return fmtUrl;
    return `${STRAPI_URL}${fmtUrl}`;
  }

  // Fall back to original URL
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

/**
 * Get absolute URL for a Strapi media asset (alias for backward compat).
 */
export function getStrapiMedia(
  url: string | null | undefined,
): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// ─── URL Normalization (integate-rule.md §5) ────────────────────────

/**
 * Normalize internal CMS URLs to the current locale.
 * Handles: /privacy/, /th/privacy/, /en/privacy/, privacy/
 */
export function normalizeInternalUrl(
  url: string | undefined,
  homePrefix: string,
): string {
  if (!url) return "#";
  if (/^(https?:|mailto:|tel:|#)/.test(url)) return url;

  // Strip existing locale prefix
  const path = url.replace(/^\/(th|en)\//, "/");

  // Add current locale prefix
  if (path.startsWith("/")) {
    return `${homePrefix}${path.replace(/^\//, "")}`;
  }
  return path;
}

/**
 * Get the URL for a footer/link item, preferring relation over manual URL.
 * (integate-rule.md §8)
 */
export function getLinkUrl(
  link: { productPage?: { slug?: string } | null; url?: string },
  homePrefix: string,
): string {
  if (link.productPage?.slug) return `${homePrefix}${link.productPage.slug}/`;
  return normalizeInternalUrl(link.url, homePrefix);
}

// ─── List Helpers (integate-rule.md §7) ─────────────────────────────

/**
 * Filter active items and sort by sortOrder.
 * Works for any component with sortOrder and isActive fields.
 */
export function filterAndSort<T extends { sortOrder?: number; isActive?: boolean }>(
  items: T[] | undefined,
): T[] {
  if (!items) return [];
  return items
    .filter((item) => item.isActive !== false)
    .slice()
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// ─── API Result Wrapper ─────────────────────────────────────────────

export type ApiResult<T> =
  | { ok: true; data: T; isOffline: false }
  | { ok: false; data: T; isOffline: boolean; error: StrapiError };

/**
 * Safe fetch wrapper that never throws.
 * Returns ApiResult with fallback data on error.
 */
export async function safeFetch<T>(
  fn: () => Promise<T>,
  fallback: T,
): Promise<ApiResult<T>> {
  try {
    const data = await fn();
    return { ok: true, data, isOffline: false };
  } catch (err) {
    const isOffline =
      err instanceof StrapiError &&
      (err.message.includes("fetch") ||
        err.message.includes("abort") ||
        err.message.includes("Failed to fetch"));
    return {
      ok: false,
      data: fallback,
      isOffline,
      error: err as StrapiError,
    };
  }
}
