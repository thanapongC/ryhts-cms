/**
 * Middleware — validates locale URL prefix and sets Cache-Control headers.
 *
 * /th/about  → OK, continue
 * /en/about  → OK, continue
 * /about     → redirect to /th/about (default locale)
 * /xx/about  → redirect to /th/about (invalid locale)
 */

import { defineMiddleware } from "astro:middleware";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./lib/i18n";

const locales = SUPPORTED_LOCALES as readonly string[];

// ─── CDN cache TTLs (seconds) — configurable via env vars ─────────
const CACHE_STATIC_MAX_AGE = Number(process.env.SSR_CACHE_STATIC_MAX_AGE) || 3600;   // 1 h
const CACHE_LISTING_MAX_AGE = Number(process.env.SSR_CACHE_LISTING_MAX_AGE) || 600;  // 10 min
const CACHE_DETAIL_MAX_AGE = Number(process.env.SSR_CACHE_DETAIL_MAX_AGE) || 1800;  // 30 min
const CACHE_DEFAULT_MAX_AGE = Number(process.env.SSR_CACHE_DEFAULT_MAX_AGE) || 300;  // 5 min
const CACHE_SWR = Number(process.env.SSR_CACHE_STALE_REVALIDATE) || 60;             // 1 min

/**
 * Return Cache-Control header for a page pathname.
 * Different page types get different TTLs based on how often their
 * underlying Strapi content changes.
 */
function cacheControl(pathname: string): string {
  // Strip locale prefix for pattern matching, e.g. /th/products/foo → /products/foo
  const path = pathname.replace(/^\/\w{2}(?:\/|$)/, "/");

  // Static / rarely-changing pages
  if (
    path === "/" ||
    path.startsWith("/about") ||
    path.startsWith("/contact") ||
    path.startsWith("/privacy") ||
    path.startsWith("/terms") ||
    path.startsWith("/pdpa") ||
    path.startsWith("/cookie") ||
    path.startsWith("/support") ||
    path.startsWith("/free-trial")
  ) {
    return `public, s-maxage=${CACHE_STATIC_MAX_AGE}, max-age=0, stale-while-revalidate=${CACHE_SWR}`;
  }

  // Product listing & article listing
  if (path === "/products" || path === "/articles") {
    return `public, s-maxage=${CACHE_LISTING_MAX_AGE}, max-age=0, stale-while-revalidate=${CACHE_SWR}`;
  }

  // Individual product / article detail
  if (path.startsWith("/products/") || path.startsWith("/articles/")) {
    return `public, s-maxage=${CACHE_DETAIL_MAX_AGE}, max-age=0, stale-while-revalidate=${CACHE_SWR}`;
  }

  // Default
  return `public, s-maxage=${CACHE_DEFAULT_MAX_AGE}, max-age=0, stale-while-revalidate=${CACHE_SWR}`;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;

  // Skip API routes, assets, and special files
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_") ||
    pathname.includes(".")
  ) {
    return next();
  }

  // Extract first path segment
  const firstSegment = pathname.split("/").filter(Boolean)[0];

  // If first segment is a valid locale, continue
  if (firstSegment && locales.includes(firstSegment)) {
    const response = await next();
    response.headers.set("Cache-Control", cacheControl(pathname));
    response.headers.set("Vary", "Accept-Language");
    return response;
  }

  // Otherwise redirect to default locale
  const target = `/${DEFAULT_LOCALE}${pathname === "/" ? "/" : pathname}`;
  return context.redirect(target, 302);
});
