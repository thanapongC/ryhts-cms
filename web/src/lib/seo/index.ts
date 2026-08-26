/**
 * SEO Module Index
 *
 * Re-exports all SEO utilities for easy importing.
 */

// Configuration
export {
  siteConfig,
  sitePages,
  robotsConfig,
  type Locale,
  type OgType,
  type SchemaType,
  type SitePage,
} from "./config";

// Canonical URL Generation
export {
  generateCanonicalUrl,
  generateXDefaultUrl,
  generateHreflangs,
  stripLocalePrefix,
  normalizePath,
  cleanCanonicalUrl,
  isValidCanonicalUrl,
  type HreflangLink,
} from "./canonical";

// Metadata Generation
export {
  formatTitle,
  generateRobots,
  getDescription,
  generateMetadata,
  generateSimpleMetadata,
  generateCmsMetadata,
  type SeoMeta,
  type ArticleMeta,
  type ProductMeta,
  type MetadataInput,
  type ResolvedMetadata,
} from "./metadata";
