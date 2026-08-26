/**
 * Canonical URL Generation
 *
 * Rules:
 * - Thai canonical URL has no locale prefix: https://istockexpress.com/path/
 * - English canonical URL uses /en: https://istockexpress.com/en/path/
 * - x-default points to the Thai URL
 * - Route paths are normalized to start and end with /
 * - Locale prefixes are stripped before canonical and hreflang generation
 *
 * Source: rules/seo-rule.md §Canonical And Locale Rules
 */

import { siteConfig, type Locale } from "./config";

// ─── Helpers ───────────────────────────────────────────────────────

/**
 * Strip locale prefix from a path.
 * /th/about → /about
 * /en/products/foo → /products/foo
 * /about → /about
 */
export function stripLocalePrefix(path: string): string {
  return path.replace(/^\/(th|en)(\/|$)/, "/");
}

/**
 * Normalize path to start and end with /.
 * /about → /about/
 * /products/foo/ → /products/foo/
 * / → /
 */
export function normalizePath(path: string): string {
  // Ensure starts with /
  let normalized = path.startsWith("/") ? path : `/${path}`;

  // Ensure ends with / (except root)
  if (normalized !== "/" && !normalized.endsWith("/")) {
    normalized += "/";
  }

  return normalized;
}

// ─── Canonical URL Generation ──────────────────────────────────────

/**
 * Generate canonical URL for a page.
 *
 * Rules:
 * - Thai: https://istockexpress.com/path/
 * - English: https://istockexpress.com/en/path/
 *
 * @param pathname - Current URL pathname (e.g., /th/about, /en/products/foo)
 * @param locale - Current locale
 * @returns Canonical URL string
 */
export function generateCanonicalUrl(pathname: string, locale: Locale): string {
  const siteUrl = siteConfig.siteUrl;

  // Strip locale prefix for canonical path
  const canonicalPath = stripLocalePrefix(pathname);
  const normalizedPath = normalizePath(canonicalPath);

  // Thai: no locale prefix
  if (locale === "th") {
    return `${siteUrl}${normalizedPath}`;
  }

  // English: /en prefix
  return `${siteUrl}/en${normalizedPath === "/" ? "/" : normalizedPath}`;
}

/**
 * Generate x-default canonical URL (Thai version).
 *
 * @param pathname - Current URL pathname
 * @returns x-default canonical URL
 */
export function generateXDefaultUrl(pathname: string): string {
  return generateCanonicalUrl(pathname, "th");
}

// ─── Hreflang Generation ──────────────────────────────────────────

export interface HreflangLink {
  lang: string;
  href: string;
}

/**
 * Generate hreflang links for a page.
 *
 * Rules:
 * - Generate hreflang links for all supported locales
 * - x-default points to Thai URL
 * - Thai URLs have no locale prefix
 * - English URLs have /en prefix
 *
 * @param pathname - Current URL pathname
 * @returns Array of hreflang link objects
 */
export function generateHreflangs(pathname: string): HreflangLink[] {
  const siteUrl = siteConfig.siteUrl;
  const canonicalPath = stripLocalePrefix(pathname);
  const normalizedPath = normalizePath(canonicalPath);

  const hreflangs: HreflangLink[] = [];

  // Thai (no locale prefix)
  hreflangs.push({
    lang: "th",
    href: `${siteUrl}${normalizedPath}`,
  });

  // English (/en prefix)
  hreflangs.push({
    lang: "en",
    href: `${siteUrl}/en${normalizedPath}`,
  });

  // x-default (Thai)
  hreflangs.push({
    lang: "x-default",
    href: `${siteUrl}${normalizedPath}`,
  });

  return hreflangs;
}

// ─── URL Validation ────────────────────────────────────────────────

/**
 * Validate if a URL is a valid canonical URL.
 */
export function isValidCanonicalUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Must be HTTPS
    if (parsed.protocol !== "https:") return false;
    // Must match site URL domain
    if (!parsed.hostname.includes("istockexpress.com")) return false;
    // Must start with /
    if (!parsed.pathname.startsWith("/")) return false;
    return true;
  } catch {
    return false;
  }
}

/**
 * Clean and normalize a canonical URL.
 * - Remove query parameters
 * - Remove hash
 * - Ensure trailing slash
 */
export function cleanCanonicalUrl(url: string): string {
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname;

    // Ensure trailing slash (except root)
    if (pathname !== "/" && !pathname.endsWith("/")) {
      pathname += "/";
    }

    return `${parsed.origin}${pathname}`;
  } catch {
    return url;
  }
}
