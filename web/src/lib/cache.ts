/**
 * In-memory SSR cache for Strapi API responses.
 *
 * Uses a Map with TTL-based expiration. Only available server-side.
 * Call `cache.get(key)` to retrieve or `cache.set(key, value, ttlMs)` to store.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const store = new Map<string, CacheEntry<unknown>>();

/** Default TTL: 60 seconds */
const DEFAULT_TTL_MS = 60_000;

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
  const entry = store.get(key);
  if (!entry) {
    stats.misses++;
    return undefined;
  }
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    stats.misses++;
    return undefined;
  }
  stats.hits++;
  return entry.value as T;
}

/**
 * Store a value in the cache.
 * @param key  Cache key
 * @param value  Value to store
 * @param ttlMs  Time-to-live in milliseconds (default 60s)
 */
export function cacheSet<T>(key: string, value: T, ttlMs: number = DEFAULT_TTL_MS): void {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
  stats.sets++;
}

/**
 * Remove a specific key or clear the entire cache.
 */
export function cacheInvalidate(key?: string): void {
  if (key) {
    store.delete(key);
    stats.invalidations++;
  } else {
    store.clear();
    stats.invalidations++;
  }
}

/**
 * Return a snapshot of current cache stats.
 */
export function cacheStats(): CacheStats {
  // Purge expired entries before counting
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.expiresAt) store.delete(key);
  }

  const total = stats.hits + stats.misses;
  return {
    entries: store.size,
    hits: stats.hits,
    misses: stats.misses,
    sets: stats.sets,
    invalidations: stats.invalidations,
    hitRate: total === 0 ? "0%" : `${((stats.hits / total) * 100).toFixed(1)}%`,
    keys: Array.from(store.keys()),
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
