/**
 * Strapi CMS Integration Layer
 *
 * All frontend CMS fetching goes through this file.
 * Rules: integate-rule.md §2–§9
 */

import type { Locale } from "./i18n";

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
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: StrapiMedia | null;
  og_type?: "website" | "article" | "product";
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: StrapiMedia | null;
  noindex?: boolean;
  nofollow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  max_snippet?: number;
  max_image_preview?: "none" | "standard" | "large";
  max_video_preview?: number;
  schema_type?: string;
  alternate_languages?: Record<string, string> | null;
  /** @deprecated Use individual boolean fields instead */
  robots?: string;
}

/** shared.seo-config */
export interface SeoConfig {
  site_url?: string;
  site_name?: string;
  default_title?: string;
  default_description?: string;
  default_og_image?: StrapiMedia | null;
  brand_name?: string;
  facebook_url?: string;
  line_url?: string;
  twitter_url?: string;
  google_analytics_id?: string;
  facebook_pixel_id?: string;
  twitter_handle?: string;
}

/** shared.contact-info */
export interface ContactInfo {
  label: string;
  value: string;
  icon?: string;
  url?: string;
  sort_order?: number;
  is_active?: boolean;
}

/** shared.stat-item */
export interface StatItem {
  label: string;
  value: string;
  icon?: string;
  sort_order?: number;
  is_active?: boolean;
}

/** footer.footer-section */
export interface FooterSection {
  title: string;
  links?: FooterLink[];
  sort_order?: number;
  is_active?: boolean;
}

/** footer.footer-link */
export interface FooterLink {
  label: string;
  product?: Product | null;
  url?: string;
  open_in_new_tab?: boolean;
  sort_order?: number;
  is_active?: boolean;
}

/** footer.legal-link */
export interface LegalLink {
  label: string;
  url: string;
  sort_order?: number;
  is_active?: boolean;
}

/** privacy.policy-section */
export interface PolicySection {
  title: string;
  content: string;
  sort_order?: number;
  is_active?: boolean;
}

/** privacy.related-link */
export interface RelatedLink {
  label: string;
  product?: Product | null;
  url?: string;
  sort_order?: number;
  is_active?: boolean;
}

/** free-trial.trust-item */
export interface TrustItem {
  label: string;
  icon?: string;
  sort_order?: number;
  is_active?: boolean;
}

/** free-trial.form-labels */
export interface FormLabel {
  label: string;
  placeholder?: string;
  sort_order?: number;
  is_active?: boolean;
}

/** free-trial.trial-feature */
export interface TrialFeature {
  title: string;
  icon?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

/** faq.faq-item */
export interface FaqItem {
  question: string;
  answer: string;
  sort_order?: number;
  is_active?: boolean;
}

// ─── Content Type Interfaces ────────────────────────────────────────

/** api::about-page.about-page */
export interface AboutPage {
  title: string;
  subtitle?: string;
  featured_image?: StrapiMedia | null;
  stats?: StatItem[];
  content?: string;
  team_members?: TeamMember[];
  partners?: Partner[];
  timeline_milestones?: TimelineMilestone[];
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
  featured_image?: StrapiMedia | null;
  author?: string;
  article_date?: string;
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

/** api::company-info.company-info */
export interface CompanyInfo {
  company_name: string;
  company_name_en?: string;
  address?: string;
  phone?: string;
  email?: string;
  business_hours?: string;
  map_link?: string;
  customer_count?: number;
  contact_info?: ContactInfo[];
}

/** api::contact-page.contact-page */
export interface ContactPage {
  title: string;
  subtitle?: string;
  featured_image?: StrapiMedia | null;
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
  sort_order?: number;
  is_active?: boolean;
  is_required?: boolean;
  is_default_enabled?: boolean;
  cookies?: CookieEntry[] | null;
  privacy_policy_url?: string;
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
  featured_image?: StrapiMedia | null;
  content?: string;
  last_updated?: string;
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
  sort_order?: number;
  is_active?: boolean;
  seo?: SeoMeta | null;
}

/** api::footer-setting.footer-setting */
export interface FooterSetting {
  copyright_text?: string;
  social_links?: Record<string, string> | null;
  footer_sections?: FooterSection[];
  legal_links?: LegalLink[];
  newsletter_text?: string;
}

/** api::free-trial.free-trial */
export interface FreeTrial {
  title: string;
  subtitle?: string;
  featured_image?: StrapiMedia | null;
  trust_items?: TrustItem[];
  content?: string;
  trial_features?: TrialFeature[];
  form_labels?: FormLabel[];
  testimonials?: Testimonial[];
  seo?: SeoMeta | null;
}

/** api::global-setting.global-setting */
export interface GlobalSetting {
  seoConfig?: SeoConfig | null;
}

/** api::partner.partner */
export interface Partner {
  id: number;
  documentId: string;
  name: string;
  website_url?: string;
  description?: string;
  logo?: StrapiMedia | null;
  about_page?: AboutPage | null;
  sort_order?: number;
  is_active?: boolean;
}

/** api::pdpa-setting.pdpa-setting */
export interface PdpaSetting {
  company_name: string;
  dpo_name?: string;
  dpo_position?: string;
  dpo_email?: string;
  dpo_phone?: string;
  contact_info?: ContactInfo[];
  data_retention_days?: number;
  data_retention_description?: string;
  rights_text?: string;
  third_parties_text?: string;
  consent_banner_title?: string;
  consent_banner_description?: string;
  consent_accept_all_text?: string;
  consent_reject_all_text?: string;
  consent_manage_text?: string;
  consent_save_text?: string;
  privacy_policy_url?: string;
  cookie_policy_url?: string;
  contact_text?: string;
  applies_to_products?: Product[];
  is_active?: boolean;
  seo?: SeoMeta | null;
}

/** api::privacy-policy.privacy-policy */
export interface PrivacyPolicy {
  title: string;
  description?: string;
  featured_image?: StrapiMedia | null;
  content?: string;
  policy_sections?: PolicySection[];
  effective_date?: string;
  last_updated?: string;
  applies_to_products?: Product[];
  related_links?: RelatedLink[];
  contact_info?: ContactInfo[];
  seo?: SeoMeta | null;
}

/** api::product.product */
export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  price?: number;
  ribbon_type: "wax" | "wax_resin" | "resin";
  sizes?: unknown;
  compatibility?: string;
  is_featured?: boolean;
  images?: StrapiMedia[];
  brand?: Brand | null;
  categories?: Category[];
  privacy_applied_in?: PrivacyPolicy[];
  pdpa_applied_in?: PdpaSetting[];
  seo?: SeoMeta | null;
  publishedAt?: string;
}

/** api::site-setting.site-setting */
export interface SiteSetting {
  site_name: string;
  site_logo?: StrapiMedia | null;
  site_favicon?: StrapiMedia | null;
  site_description?: string;
  currency?: string;
  phone?: string;
  email?: string;
  stats?: StatItem[];
}

/** api::team-member.team-member */
export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  position?: string;
  bio?: string;
  avatar?: StrapiMedia | null;
  about_page?: AboutPage | null;
  sort_order?: number;
  is_active?: boolean;
}

/** api::terms-of-service.terms-of-service */
export interface TermsOfService {
  title: string;
  description?: string;
  featured_image?: StrapiMedia | null;
  content?: string;
  effective_date?: string;
  last_updated?: string;
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
  free_trial_pages?: FreeTrial[];
  sort_order?: number;
  is_active?: boolean;
}

/** api::timeline-milestone.timeline-milestone */
export interface TimelineMilestone {
  id: number;
  documentId: string;
  title: string;
  milestone_date?: string;
  description?: string;
  image?: StrapiMedia | null;
  about_page?: AboutPage | null;
  sort_order?: number;
  is_active?: boolean;
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

      return res.json();
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
  link: { product?: { slug?: string } | null; url?: string },
  homePrefix: string,
): string {
  if (link.product?.slug) return `${homePrefix}${link.product.slug}/`;
  return normalizeInternalUrl(link.url, homePrefix);
}

// ─── List Helpers (integate-rule.md §7) ─────────────────────────────

/**
 * Filter active items and sort by sort_order.
 * Works for any component with sort_order and is_active fields.
 */
export function filterAndSort<T extends { sort_order?: number; is_active?: boolean }>(
  items: T[] | undefined,
): T[] {
  if (!items) return [];
  return items
    .filter((item) => item.is_active !== false)
    .slice()
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
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
