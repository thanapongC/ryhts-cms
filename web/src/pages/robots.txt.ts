/**
 * Robots.txt Generator
 *
 * Generates robots.txt dynamically from SEO configuration.
 * Source: rules/seo-rule.md §Robots.txt Rules
 *
 * Rules:
 * - Allow all crawlers by default
 * - Disallow /api/, /admin/, /dashboard/, /account/, /login/, /register/, and /*.json$
 * - Allow /_astro/ assets
 * - Advertise sitemap at https://istockexpress.com/sitemap.xml
 * - Set crawl delay to 1
 */

import type { APIRoute } from "astro";
import { siteConfig, robotsConfig } from "../lib/seo/config";

// ─── Robots.txt Generation ─────────────────────────────────────────

/**
 * Build robots.txt content from config.
 */
function buildRobotsTxt(): string {
  const lines: string[] = [];

  // Header comment
  lines.push(`# robots.txt for ${siteConfig.siteName}`);
  lines.push(`# ${siteConfig.siteUrl}`);
  lines.push("");

  // Default: Allow all crawlers
  lines.push("# Allow all crawlers");
  lines.push("User-agent: *");
  lines.push("Allow: /");
  lines.push("");

  // Disallowed paths
  if (robotsConfig.disallow.length > 0) {
    lines.push("# Disallow admin and API routes");
    for (const path of robotsConfig.disallow) {
      lines.push(`Disallow: ${path}`);
    }
    lines.push("");
  }

  // Allowed paths (explicit)
  if (robotsConfig.allow.length > 0) {
    lines.push("# Allow specific paths");
    for (const path of robotsConfig.allow) {
      lines.push(`Allow: ${path}`);
    }
    lines.push("");
  }

  // Sitemap location
  if (robotsConfig.sitemap) {
    lines.push("# Sitemap location");
    lines.push(`Sitemap: ${robotsConfig.sitemap}`);
    lines.push("");
  }

  // Crawl delay
  if (robotsConfig.crawlDelay) {
    lines.push("# Crawl-delay for polite bots");
    lines.push(`# Crawl-delay: ${robotsConfig.crawlDelay}`);
    lines.push("");
  }

  // Block AI crawlers (common practice)
  lines.push("# Block AI crawlers");
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "CCBot",
    "Google-Extended",
    "anthropic-ai",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "YouBot",
  ];

  for (const bot of aiBots) {
    lines.push(`User-agent: ${bot}`);
    lines.push("Disallow: /");
    lines.push("");
  }

  return lines.join("\n");
}

// ─── API Route ─────────────────────────────────────────────────────

/**
 * GET /robots.txt
 *
 * Returns robots.txt generated from SEO config.
 * Cache header: no-store
 */
export const GET: APIRoute = async () => {
  const content = buildRobotsTxt();

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
};
