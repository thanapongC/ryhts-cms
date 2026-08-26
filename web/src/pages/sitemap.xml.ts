/**
 * Sitemap Generator
 *
 * Generates XML sitemap for Thai and English URLs.
 * Source: rules/seo-rule.md §Sitemap Rules
 *
 * Rules:
 * - Sitemap includes Thai and English URLs for each `sitePages` entry
 * - Thai sitemap URLs use `/th` prefix
 * - English sitemap URLs use `/en` prefix
 * - Each URL includes `lastmod`, `changefreq`, `priority`, and hreflang alternates
 * - `lastmod` is generated from the current build/request date
 * - English priority is `0.1` lower than Thai, with minimum `0.1`
 * - Sitemap response cache header is `public, max-age=3600`
 */

import type { APIRoute } from "astro";
import { siteConfig, sitePages, type Locale } from "../lib/seo/config";
import { generateHreflangs } from "../lib/seo/canonical";

// ─── Types ─────────────────────────────────────────────────────────

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  hreflangs: { lang: string; href: string }[];
}

// ─── Sitemap Generation ────────────────────────────────────────────

/**
 * Generate sitemap URLs for a specific locale.
 */
function generateLocaleUrls(locale: Locale): SitemapUrl[] {
  const siteUrl = siteConfig.siteUrl;
  const now = new Date().toISOString();
  const isEnglish = locale === "en";

  return sitePages
    .filter((page) => page.isPublic)
    .map((page) => {
      // Build locale-prefixed path
      const localePath = page.path === "/" ? `/${locale}/` : `/${locale}${page.path}/`;
      const fullUrl = `${siteUrl}${localePath}`;

      // English priority is 0.1 lower than Thai, with minimum 0.1
      const priority = isEnglish
        ? Math.max(0.1, page.priority - 0.1)
        : page.priority;

      // Generate hreflangs for this page
      const hreflangs = generateHreflangs(page.path);

      return {
        loc: fullUrl,
        lastmod: now,
        changefreq: page.changefreq,
        priority,
        hreflangs,
      };
    });
}

/**
 * Convert changefreq to valid sitemap value.
 */
function normalizeChangefreq(value: string): string {
  const valid = ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"];
  return valid.includes(value) ? value : "weekly";
}

/**
 * Format priority to 1 decimal place.
 */
function formatPriority(value: number): string {
  return value.toFixed(1);
}

/**
 * Build XML sitemap string.
 */
function buildSitemapXml(urls: SitemapUrl[]): string {
  const lines: string[] = [];

  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>');
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  lines.push('        xmlns:xhtml="http://www.w3.org/1999/xhtml">');

  for (const url of urls) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(url.loc)}</loc>`);
    lines.push(`    <lastmod>${url.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${normalizeChangefreq(url.changefreq)}</changefreq>`);
    lines.push(`    <priority>${formatPriority(url.priority)}</priority>`);

    // Hreflang alternates
    for (const hreflang of url.hreflangs) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${hreflang.lang}" href="${escapeXml(hreflang.href)}" />`
      );
    }

    lines.push("  </url>");
  }

  lines.push("</urlset>");

  return lines.join("\n");
}

/**
 * Escape special XML characters.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ─── API Route ─────────────────────────────────────────────────────

/**
 * GET /sitemap.xml
 *
 * Returns XML sitemap with Thai and English URLs.
 * Cache header: public, max-age=3600
 */
export const GET: APIRoute = async () => {
  // Generate URLs for both locales
  const thaiUrls = generateLocaleUrls("th");
  const englishUrls = generateLocaleUrls("en");

  // Combine all URLs
  const allUrls = [...thaiUrls, ...englishUrls];

  // Build XML
  const xml = buildSitemapXml(allUrls);

  // Return with cache header
  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
