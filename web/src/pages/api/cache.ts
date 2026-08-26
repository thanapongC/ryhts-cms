/**
 * API Endpoint for SSR Cache Management
 *
 * GET  /api/cache              — return cache stats (size, hit rate, keys)
 * DELETE /api/cache              — clear all cached Strapi responses
 * DELETE /api/cache?key=strapi:… — invalidate a specific cache key
 *
 * Requires the `x-cache-secret` header to match the CACHE_SECRET env var.
 */

import type { APIRoute } from "astro";
import { cacheInvalidate, cacheStats } from "../../lib/cache";

const CACHE_SECRET = process.env.CACHE_SECRET;

// ── GET /api/cache — stats ─────────────────────────────────────────

export const GET: APIRoute = async ({ request }) => {
  if (!CACHE_SECRET) {
    return new Response(
      JSON.stringify({ error: "CACHE_SECRET env var is not set" }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const provided = request.headers.get("x-cache-secret");
  if (provided !== CACHE_SECRET) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({ ok: true, ...cacheStats() }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};

// ── DELETE /api/cache — invalidation ────────────────────────────────

export const DELETE: APIRoute = async ({ request }) => {
  // ── Auth check ────────────────────────────────────────────────────
  if (!CACHE_SECRET) {
    return new Response(
      JSON.stringify({ error: "CACHE_SECRET env var is not set" }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  const provided = request.headers.get("x-cache-secret");
  if (provided !== CACHE_SECRET) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  // ── Invalidate ────────────────────────────────────────────────────
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (key) {
    cacheInvalidate(key);
    return new Response(
      JSON.stringify({ ok: true, invalidated: key }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }

  // Clear entire cache
  cacheInvalidate();
  return new Response(
    JSON.stringify({ ok: true, message: "Cache cleared" }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
