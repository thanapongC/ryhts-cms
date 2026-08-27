/**
 * Middleware — validates locale URL prefix and disables page caching.
 *
 * /th/about  → OK, continue
 * /en/about  → OK, continue
 * /about     → redirect to /th/about (default locale)
 * /xx/about  → redirect to /th/about (invalid locale)
 */

import { defineMiddleware } from "astro:middleware";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./lib/i18n";

const locales = SUPPORTED_LOCALES as readonly string[];

const NO_STORE = "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0";

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
    response.headers.set("Cache-Control", NO_STORE);
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Vary", "Accept-Language");
    return response;
  }

  // Otherwise redirect to default locale
  const target = `/${DEFAULT_LOCALE}${pathname === "/" ? "/" : pathname}`;
  return context.redirect(target, 302);
});
