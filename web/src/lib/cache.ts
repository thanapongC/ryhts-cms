/**
 * Disabled SSR cache.
 *
 * CMS content must update on every request, so these helpers are kept as
 * compatibility no-ops for older imports and the cache API endpoint.
 */

// ─── Stats ─────────────────────────────────────────────────────────

const stats = { hits: 0, misses: 0, sets: 0, invalidations: 0 };

export interface CacheStats {
  entries: number;
  hits: number;
  misses: number;
  sets: number;
  invalidations: number;
  hitRate: string;
  keys: string[];
}

/**
 * Get a cached value by key. Returns `undefined` on miss or expiry.
 */
export function cacheGet<T>(key: string): T | undefined {
  void key;
  stats.misses++;
  return undefined;
}

/**
 * Store a value in the cache.
 * @param key  Cache key
 * @param value  Value to store
 * @param ttlMs  Time-to-live in milliseconds (default 60s)
 */
export function cacheSet<T>(key: string, value: T, ttlMs = 0): void {
  void key;
  void value;
  void ttlMs;
}

/**
 * Remove a specific key or clear the entire cache.
 */
export function cacheInvalidate(key?: string): void {
  void key;
  stats.invalidations++;
}

/**
 * Return a snapshot of current cache stats.
 */
export function cacheStats(): CacheStats {
  const total = stats.hits + stats.misses;
  return {
    entries: 0,
    hits: stats.hits,
    misses: stats.misses,
    sets: 0,
    invalidations: stats.invalidations,
    hitRate: total === 0 ? "0%" : `${((stats.hits / total) * 100).toFixed(1)}%`,
    keys: [],
  };
}

/**
 * Build a deterministic cache key from a path and params object.
 */
export function buildCacheKey(path: string, params: Record<string, string>): string {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return `strapi:${path}?${sorted}`;
}
