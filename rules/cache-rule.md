# Cache System Rules

This document describes the multi-layer caching architecture used in the i-Stock Express project, covering Strapi CMS backend and Astro frontend.

## 1. Architecture Overview

The caching system uses a **three-layer architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN Layer                            │
│   (nginx/Cloudflare) — Cache-Control headers               │
│   s-maxage + stale-while-revalidate                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     SSR Cache Layer                         │
│   (In-memory Map) — Strapi API responses                   │
│   TTL-based expiration with stats tracking                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Strapi CMS Layer                        │
│   (Source of Truth) — Content Management                   │
│   Lifecycle hooks trigger cache invalidation               │
└─────────────────────────────────────────────────────────────┘
```

## 2. SSR In-Memory Cache

### Location
- File: `web/src/lib/cache.ts`
- Type: Server-side only (Node.js Map)

### Features
- TTL-based expiration (default: 60 seconds)
- Hit/miss/set/invalidation statistics
- Deterministic cache key generation
- Automatic expired entry cleanup

### Functions

```typescript
// Get cached value
cacheGet<T>(key: string): T | undefined

// Set cached value with TTL
cacheSet<T>(key: string, value: T, ttlMs?: number): void

// Invalidate specific key or clear all
cacheInvalidate(key?: string): void

// Get cache statistics
cacheStats(): CacheStats

// Build deterministic cache key
buildCacheKey(path: string, params: Record<string, string>): string
```

### Cache Key Format
```
strapi:{path}?{param1}={value1}&{param2}={value2}
```

Parameters are sorted alphabetically to ensure deterministic keys.

### Stats Tracking
```typescript
interface CacheStats {
  entries: number;      // Current cache size
  hits: number;         // Cache hits
  misses: number;       // Cache misses
  sets: number;         // Total sets
  invalidations: number; // Total invalidations
  hitRate: string;      // Hit rate percentage
  keys: string[];       // Current cache keys
}
```

## 3. CDN Cache Headers

### Location
- File: `web/src/middleware.ts`
- Applies to all page responses (non-API, non-asset)

### Cache-Control Strategy

Pages are categorized by content freshness requirements:

| Page Type | s-maxage | Example Pages |
|-----------|----------|---------------|
| Static | 3600s (1h) | `/about`, `/privacy`, `/terms`, `/support` |
| Listing | 600s (10m) | `/products`, `/articles` |
| Detail | 1800s (30m) | `/products/*`, `/articles/*` |
| Default | 300s (5m) | All other pages |

### Header Format
```
public, s-maxage={TTL}, max-age=0, stale-while-revalidate={SWR}
```

- `s-maxage`: CDN cache duration
- `max-age=0`: Browser always revalidates
- `stale-while-revalidate`: Serve stale while fetching fresh (default: 60s)

### Environment Variables
```bash
SSR_CACHE_STATIC_MAX_AGE=3600    # Static pages (1 hour)
SSR_CACHE_LISTING_MAX_AGE=600    # Listing pages (10 minutes)
SSR_CACHE_DETAIL_MAX_AGE=1800    # Detail pages (30 minutes)
SSR_CACHE_DEFAULT_MAX_AGE=300    # Default pages (5 minutes)
SSR_CACHE_STALE_REVALIDATE=60    # Stale-while-revalidate (1 minute)
```

### Special Cases

**Excluded from cache headers:**
- API routes (`/api/*`)
- Internal routes (`/_*`)
- Static assets (files with extensions)

**Asset caching:**
```typescript
// Fingerprinted assets (Astro handles this)
Cache-Control: public, immutable
```

## 4. Cache Invalidation

### Automatic Invalidation (Strapi → Frontend)

Location: `src/index.js` (Strapi bootstrap)

When content changes in Strapi (create/update/delete), the system automatically invalidates the frontend cache:

```javascript
// Lifecycle hooks subscribed
strapi.db.lifecycles.subscribe({
  afterCreate: scheduleInvalidation,
  afterUpdate: scheduleInvalidation,
  afterDelete: scheduleInvalidation,
  afterBulkDelete: scheduleInvalidation,
});
```

**Debounce mechanism:**
- Rapid changes are batched into a single invalidation
- 500ms debounce window
- Prevents excessive invalidation calls

**Invalidation request:**
```javascript
fetch(`${FRONTEND_URL}/api/cache`, {
  method: 'DELETE',
  headers: { 'x-cache-secret': CACHE_SECRET },
});
```

### Manual Invalidation (API)

Location: `web/src/pages/api/cache.ts`

```bash
# Clear entire cache
curl -X DELETE http://localhost:4321/api/cache \
  -H "x-cache-secret: ${CACHE_SECRET}"

# Invalidate specific key
curl -X DELETE "http://localhost:4321/api/cache?key=strapi:free-trial?locale=th" \
  -H "x-cache-secret: ${CACHE_SECRET}"
```

### Cache Stats API

```bash
# Get cache statistics
curl http://localhost:4321/api/cache \
  -H "x-cache-secret: ${CACHE_SECRET}"
```

Response:
```json
{
  "ok": true,
  "entries": 15,
  "hits": 1234,
  "misses": 567,
  "sets": 1290,
  "invalidations": 42,
  "hitRate": "68.5%",
  "keys": ["strapi:free-trial?locale=th", "strapi:about-us?locale=en"]
}
```

## 5. Configuration

### Required Environment Variables

```bash
# Cache secret for API authentication
CACHE_SECRET=your-secret-key

# Frontend URL for invalidation callbacks
FRONTEND_URL=http://localhost:4321

# CDN cache TTLs (optional, defaults shown)
SSR_CACHE_STATIC_MAX_AGE=3600
SSR_CACHE_LISTING_MAX_AGE=600
SSR_CACHE_DETAIL_MAX_AGE=1800
SSR_CACHE_DEFAULT_MAX_AGE=300
SSR_CACHE_STALE_REVALIDATE=60
```

### Docker Compose Configuration

```yaml
environment:
  - CACHE_SECRET=${CACHE_SECRET:-}
  - SSR_CACHE_TTL_MS=${SSR_CACHE_TTL_MS:-60}
  - SSR_CACHE_STATIC_MAX_AGE=${SSR_CACHE_STATIC_MAX_AGE:-3600}
  - SSR_CACHE_LISTING_MAX_AGE=${SSR_CACHE_LISTING_MAX_AGE:-600}
  - SSR_CACHE_DETAIL_MAX_AGE=${SSR_CACHE_DETAIL_MAX_AGE:-1800}
  - SSR_CACHE_DEFAULT_MAX_AGE=${SSR_CACHE_DEFAULT_MAX_AGE:-300}
  - SSR_CACHE_STALE_REVALIDATE=${SSR_CACHE_STALE_REVALIDATE:-60}
```

## 6. Cache Rules

### Rule 1: Cache Key Determinism

Always use `buildCacheKey()` to generate cache keys:
```typescript
import { buildCacheKey } from "../lib/cache";

const key = buildCacheKey("free-trial", { locale: "th" });
// → "strapi:free-trial?locale=th"
```

Do not hardcode cache keys.

### Rule 2: TTL Guidelines

| Content Type | SSR TTL | CDN TTL | Rationale |
|--------------|---------|---------|-----------|
| Static pages | 60s | 1h | Rarely changes |
| Product listings | 60s | 10m | Moderately dynamic |
| Product details | 60s | 30m | Individual items |
| User-specific | 0s | 0s | Never cache |
| API responses | 0s | 0s | Direct to Strapi |

### Rule 3: Invalidation Triggers

Invalidation must occur when:
- Content is created, updated, or deleted in Strapi
- Media files are uploaded or changed
- Relations are modified
- SEO settings are updated
- Manual invalidation via API

### Rule 4: Error Handling

Cache operations must not break the application:
```typescript
// Always handle cache misses gracefully
const cached = cacheGet<FreeTrial>(key);
if (cached) return cached;

// Fall through to Strapi fetch
const data = await fetchStrapiSingle(...);
if (data) cacheSet(key, data, ttlMs);
return data;
```

### Rule 5: Security

- Cache API requires `x-cache-secret` header
- Never expose cache stats in production without authentication
- Use environment variables for secrets
- Do not cache authenticated/user-specific content

### Rule 6: Monitoring

Monitor cache performance:
- Hit rate should be > 60% for stable content
- Track invalidation frequency
- Alert on excessive misses (indicates stale content)
- Review stats periodically

## 7. Integration with Strapi Fetch

### Current Implementation

Location: `web/src/lib/strapi.ts`

```typescript
// Cache is currently disabled — every request goes to Strapi API directly
```

### Enabling Cache

To enable SSR caching:

```typescript
import { cacheGet, cacheSet, buildCacheKey } from "./cache";

const CACHE_TTL_MS = 60_000; // 1 minute

export async function getFreeTrial(locale: 'th' | 'en' = 'th') {
  const key = buildCacheKey('free-trial', { locale });

  // Check cache first
  const cached = cacheGet<FreeTrial>(key);
  if (cached) return cached;

  try {
    const response = await fetchStrapiSingle<FreeTrial>('free-trial', {
      locale,
      populate: ['trustItems', 'formLabels', 'features', 'seo', 'seo.ogImage'],
    });

    // Store in cache
    if (response.data) {
      cacheSet(key, response.data, CACHE_TTL_MS);
    }

    return response.data;
  } catch {
    return null;
  }
}
```

## 8. Nginx Configuration

Location: `nginx/ryhts-web.conf`

```nginx
# API routes — no caching at nginx level
location /api/ {
    proxy_no_cache 1;
    proxy_cache_bypass 1;
}

# Static assets — long cache (Astro fingerprints them)
location /assets/ {
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, immutable";
}
```

## 9. Verification

### Check Cache Stats
```bash
curl http://localhost:4321/api/cache \
  -H "x-cache-secret: ${CACHE_SECRET}"
```

### Test Invalidation
```bash
# Make content change in Strapi admin
# Then check stats — invalidations count should increase
curl http://localhost:4321/api/cache \
  -H "x-cache-secret: ${CACHE_SECRET}"
```

### Verify CDN Headers
```bash
curl -I http://localhost:4321/th/about
# Should show: Cache-Control: public, s-maxage=3600, max-age=0, stale-while-revalidate=60
```

## 10. Troubleshooting

### Stale Content
1. Check CDN cache headers
2. Verify invalidation is firing (check Strapi logs)
3. Check SSR cache stats
4. Manual invalidation if needed

### High Miss Rate
1. Review TTL settings
2. Check cache key determinism
3. Verify cache is not being cleared excessively

### Cache Not Working
1. Verify `CACHE_SECRET` is set
2. Check middleware is running
3. Verify lifecycle hooks are registered
4. Check for errors in Strapi logs
