/**
 * SEO Configuration
 *
 * Site-wide SEO defaults and page definitions.
 * Source: rules/seo-rule.md
 */

// ─── Site Defaults ─────────────────────────────────────────────────

export const siteConfig = {
  /** Site URL (no trailing slash) */
  siteUrl: import.meta.env.PUBLIC_SITE_URL || "https://istockexpress.com",

  /** Site name for og:site_name */
  siteName: "iStock Express",

  /** Brand name */
  brandName: "iStock Express",

  /** Default meta title suffix */
  titleSuffix: "| iStock Express",

  /** Default meta description (Thai) */
  defaultDescription:
    "ซอฟต์แวร์จัดการริบบอนครบวงจร สำหรับธุรกิจพิมพ์ในประเทศไทย",

  /** Default meta description (English) */
  defaultDescriptionEn:
    "Complete ribbon management software for printing businesses in Thailand",

  /** Default OG image dimensions */
  ogImageWidth: 1200,
  ogImageHeight: 630,

  /** Default robots meta */
  defaultRobots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",

  /** Supported locales */
  supportedLocales: ["th", "en"] as const,

  /** Default locale (x-default) */
  defaultLocale: "th" as const,
} as const;

// ─── Page Definitions ──────────────────────────────────────────────

export interface SitePage {
  /** Route path (without locale prefix) */
  path: string;

  /** Change frequency for sitemap */
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

  /** Priority for sitemap (0.0 - 1.0) */
  priority: number;

  /** Whether page is public */
  isPublic: boolean;
}

/**
 * Site pages for sitemap generation.
 * Add new public routes here.
 */
export const sitePages: SitePage[] = [
  { path: "/", changefreq: "daily", priority: 1.0, isPublic: true },
  { path: "/about", changefreq: "monthly", priority: 0.8, isPublic: true },
  { path: "/products", changefreq: "weekly", priority: 0.9, isPublic: true },
  { path: "/articles", changefreq: "weekly", priority: 0.7, isPublic: true },
  { path: "/contact", changefreq: "monthly", priority: 0.6, isPublic: true },
  { path: "/support", changefreq: "monthly", priority: 0.7, isPublic: true },
  { path: "/free-trial", changefreq: "monthly", priority: 0.8, isPublic: true },
  { path: "/privacy", changefreq: "yearly", priority: 0.3, isPublic: true },
  { path: "/terms-of-service", changefreq: "yearly", priority: 0.3, isPublic: true },
  { path: "/cookie-policy", changefreq: "yearly", priority: 0.3, isPublic: true },
  { path: "/pdpa", changefreq: "yearly", priority: 0.3, isPublic: true },
  { path: "/downloads", changefreq: "monthly", priority: 0.5, isPublic: true },
];

// ─── Robots.txt Configuration ──────────────────────────────────────

export const robotsConfig = {
  /** Allow all crawlers by default */
  allowAll: true,

  /** Disallowed paths */
  disallow: [
    "/api/",
    "/admin/",
    "/dashboard/",
    "/account/",
    "/login/",
    "/register/",
    "/*.json$",
  ],

  /** Allowed paths */
  allow: ["/_astro/"],

  /** Sitemap URL */
  sitemap: "https://istockexpress.com/sitemap.xml",

  /** Crawl delay (seconds) */
  crawlDelay: 1,
} as const;

// ─── Type Definitions ──────────────────────────────────────────────

export type Locale = "th" | "en";
export type OgType = "website" | "article" | "product";
export type SchemaType =
  | "WebPage"
  | "AboutPage"
  | "ProductPage"
  | "CollectionPage"
  | "FAQPage"
  | "ContactPage"
  | "Article"
  | "SoftwareApplication";
