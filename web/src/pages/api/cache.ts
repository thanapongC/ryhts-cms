/**
 * API Endpoint for disabled SSR cache compatibility.
 *
 * CMS content is fetched in real time, so this endpoint reports disabled
 * cache status and accepts invalidation requests as harmless no-ops.
 */

import type { APIRoute } from "astro";
import { cacheInvalidate, cacheStats } from "../../lib/cache";

const HEADERS = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

function disabledCacheResponse(extra: Record<string, unknown> = {}) {
  return new Response(
    JSON.stringify({ ok: true, cacheEnabled: false, ...cacheStats(), ...extra }),
    { status: 200, headers: HEADERS },
  );
}

// ── GET /api/cache — stats ─────────────────────────────────────────

export const GET: APIRoute = async () => {
  return disabledCacheResponse();
};

// ── DELETE /api/cache — invalidation ────────────────────────────────

export const DELETE: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (key) {
    cacheInvalidate(key);
    return disabledCacheResponse({ invalidated: key });
  }

  cacheInvalidate();
  return disabledCacheResponse({ message: "Cache disabled; no entries stored" });
};
