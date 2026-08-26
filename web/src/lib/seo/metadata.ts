/**
 * SEO Metadata Generation
 *
 * Handles metadata generation with priority:
 * 1. Explicit page props
 * 2. CMS seo component values
 * 3. Frontend defaults
 *
 * Source: rules/seo-rule.md §Frontend Metadata Rules
 */

import { siteConfig, type Locale, type OgType, type SchemaType } from "./config";
import { generateCanonicalUrl, generateHreflangs, type HreflangLink } from "./canonical";

// ─── Types ─────────────────────────────────────────────────────────

export interface SeoMeta {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: { url: string; width?: number; height?: number } | null;
  ogType?: OgType;
  noindex?: boolean;
  nofollow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: "none" | "standard" | "large";
  maxVideoPreview?: number;
  schemaType?: SchemaType;
  alternateLanguages?: Record<string, string> | null;
}

export interface ArticleMeta {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export interface ProductMeta {
  price?: string;
  currency?: string;
  availability?: string;
  brand?: string;
}

export interface MetadataInput {
  /** Page title (will be formatted with site name) */
  title?: string;

  /** Page description */
  description?: string;

  /** OG image URL */
  ogImage?: string;

  /** OG image alt text */
  ogImageAlt?: string;

  /** OG type */
  ogType?: OgType;

  /** Robots meta */
  robots?: string;

  /** Author */
  author?: string;

  /** Keywords */
  keywords?: string[];

  /** Canonical URL override */
  canonical?: string;

  /** Current locale */
  locale: Locale;

  /** Current pathname */
  pathname: string;

  /** CMS SEO data */
  seo?: SeoMeta | null;

  /** Article metadata */
  article?: ArticleMeta;

  /** Product metadata */
  product?: ProductMeta;
}

export interface ResolvedMetadata {
  /** Formatted title with site name */
  title: string;

  /** Meta description */
  description: string;

  /** Canonical URL */
  canonical: string;

  /** OG image URL */
  ogImage: string;

  /** OG type */
  ogType: OgType;

  /** Robots meta string */
  robots: string;

  /** Keywords string */
  keywords: string | undefined;

  /** Author */
  author: string | undefined;

  /** Hreflang links */
  hreflangs: HreflangLink[];

  /** Schema type */
  schemaType: SchemaType;

  /** Article metadata */
  article?: ArticleMeta;

  /** Product metadata */
  product?: ProductMeta;
}

// ─── Title Formatting ──────────────────────────────────────────────

/**
 * Format page title with site name suffix.
 *
 * Rules:
 * - Appends "| iStock Express" unless title already contains site name
 * - Do not manually duplicate the brand suffix in CMS titles
 *
 * @param title - Page title
 * @returns Formatted title with site name
 */
export function formatTitle(title: string): string {
  // Check if title already contains site name
  if (title.includes(siteConfig.brandName)) {
    return title;
  }
  return `${title} ${siteConfig.titleSuffix}`;
}

// ─── Robots Meta Generation ────────────────────────────────────────

/**
 * Build robots meta string from SEO flags.
 *
 * Rules:
 * - noindex=false renders "index"; true renders "noindex"
 * - nofollow=false renders "follow"; true renders "nofollow"
 * - noarchive=true adds "noarchive"
 * - nosnippet=true adds "nosnippet" and suppresses max preview directives
 * - If snippets allowed, add max-image-preview, max-snippet, max-video-preview
 *
 * Default: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
 *
 * @param seo - SEO metadata from CMS
 * @returns Robots meta string
 */
export function generateRobots(seo?: SeoMeta | null): string {
  const parts: string[] = [];

  // Index/Follow
  parts.push(seo?.noindex ? "noindex" : "index");
  parts.push(seo?.nofollow ? "nofollow" : "follow");

  // Noarchive
  if (seo?.noarchive) {
    parts.push("noarchive");
  }

  // Nosnippet (suppresses max preview directives)
  if (seo?.nosnippet) {
    parts.push("nosnippet");
  } else {
    // Max image preview
    const maxImagePreview = seo?.maxImagePreview || "large";
    parts.push(`max-image-preview:${maxImagePreview}`);

    // Max snippet
    const maxSnippet = seo?.maxSnippet ?? -1;
    parts.push(`max-snippet:${maxSnippet}`);

    // Max video preview
    const maxVideoPreview = seo?.maxVideoPreview ?? -1;
    parts.push(`max-video-preview:${maxVideoPreview}`);
  }

  return parts.join(", ");
}

// ─── Description Fallback ──────────────────────────────────────────

/**
 * Get description with locale-aware fallback.
 *
 * Rules:
 * - Thai pages use seoConfig.defaultDescription
 * - English pages use seoConfig.defaultDescriptionEn
 *
 * @param description - Page description
 * @param locale - Current locale
 * @returns Description string
 */
export function getDescription(
  description: string | undefined,
  locale: Locale,
): string {
  if (description) return description;

  return locale === "en"
    ? siteConfig.defaultDescriptionEn
    : siteConfig.defaultDescription;
}

// ─── Main Metadata Generator ───────────────────────────────────────

/**
 * Generate resolved metadata for a page.
 *
 * Priority:
 * 1. Explicit page props
 * 2. CMS seo component values
 * 3. Frontend defaults
 *
 * @param input - Metadata input
 * @returns Resolved metadata object
 */
export function generateMetadata(input: MetadataInput): ResolvedMetadata {
  const {
    title,
    description,
    ogImage,
    ogImageAlt,
    ogType = "website",
    robots,
    author,
    keywords = [],
    canonical,
    locale,
    pathname,
    seo,
    article,
    product,
  } = input;

  // ── Title ──────────────────────────────────────────────────────
  const rawTitle = title || seo?.metaTitle || siteConfig.siteName;
  const resolvedTitle = formatTitle(rawTitle);

  // ── Description ────────────────────────────────────────────────
  const rawDescription = description || seo?.metaDescription;
  const resolvedDescription = getDescription(rawDescription, locale);

  // ── Canonical URL ──────────────────────────────────────────────
  const resolvedCanonical = canonical
    ? generateCanonicalUrl(canonical, locale)
    : generateCanonicalUrl(pathname, locale);

  // ── OG Image ───────────────────────────────────────────────────
  const resolvedOgImage = ogImage || seo?.ogImage?.url || "";

  // ── OG Type ────────────────────────────────────────────────────
  const resolvedOgType: OgType = seo?.ogType || ogType;

  // ── Robots ─────────────────────────────────────────────────────
  const resolvedRobots = robots || generateRobots(seo);

  // ── Keywords ───────────────────────────────────────────────────
  const resolvedKeywords = keywords.length > 0
    ? keywords.join(", ")
    : seo?.keywords;

  // ── Schema Type ────────────────────────────────────────────────
  const resolvedSchemaType: SchemaType = (seo?.schemaType as SchemaType) || "WebPage";

  // ── Hreflangs ──────────────────────────────────────────────────
  const resolvedHreflangs = generateHreflangs(pathname);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    canonical: resolvedCanonical,
    ogImage: resolvedOgImage,
    ogType: resolvedOgType,
    robots: resolvedRobots,
    keywords: resolvedKeywords,
    author,
    hreflangs: resolvedHreflangs,
    schemaType: resolvedSchemaType,
    article,
    product,
  };
}

// ─── Quick Helpers ─────────────────────────────────────────────────

/**
 * Generate metadata for a simple page (no CMS data).
 */
export function generateSimpleMetadata(
  title: string,
  description: string,
  pathname: string,
  locale: Locale,
  ogImage?: string,
): ResolvedMetadata {
  return generateMetadata({
    title,
    description,
    pathname,
    locale,
    ogImage,
  });
}

/**
 * Generate metadata with CMS SEO data.
 */
export function generateCmsMetadata(
  pageTitle: string,
  pageDescription: string,
  pathname: string,
  locale: Locale,
  seo?: SeoMeta | null,
  ogImage?: string,
): ResolvedMetadata {
  return generateMetadata({
    title: pageTitle,
    description: pageDescription,
    pathname,
    locale,
    seo,
    ogImage: ogImage || seo?.ogImage?.url,
  });
}
