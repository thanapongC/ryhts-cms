const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";

// ─── Custom Error ──────────────────────────────────────────────────

export class StrapiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public path?: string
  ) {
    super(message);
    this.name = "StrapiError";
  }
}

// ─── Types ───────────────────────────────────────────────────────────

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiSingleResponse<T> {
  data: T;
}

function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// ─── Fetch with retry + timeout ──────────────────────────────────────

const MAX_RETRIES = 2;
const TIMEOUT_MS = 8000;

async function fetchAPI<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const res = await fetch(url.toString(), {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new StrapiError(
          `Strapi API error: ${res.status} ${res.statusText}`,
          res.status,
          path
        );
      }

      return res.json();
    } catch (err) {
      lastError = err as Error;

      // Don't retry client errors (4xx) except 408/429
      if (
        err instanceof StrapiError &&
        err.status &&
        err.status >= 400 &&
        err.status < 500 &&
        err.status !== 408 &&
        err.status !== 429
      ) {
        throw err;
      }

      // Wait before retry (exponential backoff)
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      }
    }
  }

  // All retries failed
  throw new StrapiError(
    `Failed to fetch ${path} after ${MAX_RETRIES + 1} attempts: ${lastError?.message || "Unknown error"}`,
    undefined,
    path
  );
}

// ─── Types ───────────────────────────────────────────────────────────

export interface SiteSetting {
  site_name: string;
  site_logo: StrapiMedia | null;
  site_favicon: StrapiMedia | null;
  site_description: string;
  currency: string;
  phone: string;
  email: string;
  og_image: StrapiMedia | null;
}

export interface StrapiMedia {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface GlobalSetting {
  meta_title: string;
  meta_description: string;
  og_image: StrapiMedia | null;
  google_analytics_id: string;
  facebook_pixel_id: string;
  twitter_handle: string;
}

export interface FooterSetting {
  copyright_text: string;
  social_links: Record<string, string> | null;
  footer_links: FooterLink[] | null;
  newsletter_text: string;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  meta_title: string;
  meta_description: string;
  featured_image: StrapiMedia | null;
  og_image: StrapiMedia | null;
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  ribbon_type: "wax" | "wax_resin" | "resin";
  sizes: unknown;
  compatibility: string;
  is_featured: boolean;
  images: StrapiMedia[];
  meta_title: string;
  meta_description: string;
  og_image: StrapiMedia | null;
  brand: Brand | null;
  categories: Category[];
  publishedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  image: StrapiMedia | null;
  products: Product[];
}

export interface Brand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  logo: StrapiMedia | null;
  description: string;
  products: Product[];
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: StrapiMedia | null;
  author: string;
  article_date: string;
  tags: string[];
  views: number;
  meta_title: string;
  meta_description: string;
  og_image: StrapiMedia | null;
  publishedAt: string;
}

export interface CompanyInfo {
  company_name: string;
  company_name_en: string;
  address: string;
  phone: string;
  email: string;
  map_link: string;
  business_hours: string;
  customer_count: number;
  contact_form_title: string;
}

export interface PrivacyPolicy {
  title: string;
  content: string;
  last_updated: string;
  meta_title: string;
  meta_description: string;
}

export interface PdpaSetting {
  title: string;
  content: string;
  last_updated: string;
  meta_title: string;
  meta_description: string;
}

export interface TermsOfService {
  title: string;
  description: string;
  content: string;
  last_updated: string;
  meta_title: string;
  meta_description: string;
}

export interface CookiePolicy {
  title: string;
  description: string;
  content: string;
  last_updated: string;
  meta_title: string;
  meta_description: string;
}

export interface CookieCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  is_required: boolean;
  is_default_enabled: boolean;
  sort_order: number;
  cookies: CookieEntry[] | null;
  privacy_policy_url: string;
}

export interface CookieEntry {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: string;
}

// ─── Result wrapper ──────────────────────────────────────────────────

export type ApiResult<T> =
  | { ok: true; data: T; isOffline: false }
  | { ok: false; data: null; isOffline: true; error: StrapiError };

async function safeFetch<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<ApiResult<T>> {
  try {
    const data = await fn();
    return { ok: true, data, isOffline: false };
  } catch (err) {
    const isOffline =
      err instanceof StrapiError &&
      (err.message.includes("fetch") ||
        err.message.includes("abort") ||
        err.message.includes("Failed to fetch"));
    return {
      ok: false,
      data: fallback,
      isOffline,
      error: err as StrapiError,
    };
  }
}

// ─── API Functions ───────────────────────────────────────────────────

export async function getSiteSetting(locale = "th") {
  const res = await fetchAPI<StrapiSingleResponse<SiteSetting>>(
    "/site-setting",
    { locale, populate: "*" }
  );
  return res.data;
}

export async function getGlobalSetting(locale = "th") {
  const res = await fetchAPI<StrapiSingleResponse<GlobalSetting>>(
    "/global-setting",
    { locale, populate: "*" }
  );
  return res.data;
}

export async function getFooterSetting(locale = "th") {
  const res = await fetchAPI<StrapiSingleResponse<FooterSetting>>(
    "/footer-setting",
    { locale, populate: "*" }
  );
  return res.data;
}

export async function getPages(locale = "th") {
  const res = await fetchAPI<StrapiResponse<Page[]>>("/pages", {
    locale,
    populate: "*",
  });
  return res.data;
}

export async function getPageBySlug(slug: string, locale = "th") {
  const res = await fetchAPI<StrapiResponse<Page[]>>("/pages", {
    locale,
    populate: "*",
    "filters[slug][$eq]": slug,
  });
  return res.data?.[0] || null;
}

export async function getProducts(locale = "th", page = 1, pageSize = 12) {
  const res = await fetchAPI<StrapiResponse<Product[]>>("/products", {
    locale,
    populate: "*",
    sort: "publishedAt:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });
  return res;
}

export async function getFeaturedProducts(locale = "th") {
  const res = await fetchAPI<StrapiResponse<Product[]>>("/products", {
    locale,
    populate: "*",
    "filters[is_featured][$eq]": "true",
    sort: "publishedAt:desc",
  });
  return res.data;
}

export async function getProductBySlug(slug: string, locale = "th") {
  const res = await fetchAPI<StrapiResponse<Product[]>>("/products", {
    locale,
    populate: "*",
    "filters[slug][$eq]": slug,
  });
  return res.data?.[0] || null;
}

export async function getCategories(locale = "th") {
  const res = await fetchAPI<StrapiResponse<Category[]>>("/categories", {
    locale,
    populate: "*",
  });
  return res.data;
}

export async function getCategoryBySlug(slug: string, locale = "th") {
  const res = await fetchAPI<StrapiResponse<Category[]>>("/categories", {
    locale,
    populate: "*",
    "filters[slug][$eq]": slug,
  });
  return res.data?.[0] || null;
}

export async function getBrands(locale = "th") {
  const res = await fetchAPI<StrapiResponse<Brand[]>>("/brands", {
    locale,
    populate: "*",
  });
  return res.data;
}

export async function getArticles(locale = "th", page = 1, pageSize = 12) {
  const res = await fetchAPI<StrapiResponse<Article[]>>("/articles", {
    locale,
    populate: "*",
    sort: "publishedAt:desc",
    "pagination[page]": String(page),
    "pagination[pageSize]": String(pageSize),
  });
  return res;
}

export async function getArticleBySlug(slug: string, locale = "th") {
  const res = await fetchAPI<StrapiResponse<Article[]>>("/articles", {
    locale,
    populate: "*",
    "filters[slug][$eq]": slug,
  });
  return res.data?.[0] || null;
}

export async function getCompanyInfo(locale = "th") {
  const res = await fetchAPI<StrapiSingleResponse<CompanyInfo>>(
    "/company-info",
    { locale, populate: "*" }
  );
  return res.data;
}

export async function getPrivacyPolicy(locale = "th") {
  const res = await fetchAPI<StrapiSingleResponse<PrivacyPolicy>>(
    "/privacy-policy",
    { locale, populate: "*" }
  );
  return res.data;
}

export async function getPdpaSetting(locale = "th") {
  const res = await fetchAPI<StrapiSingleResponse<PdpaSetting>>(
    "/pdpa-setting",
    { locale, populate: "*" }
  );
  return res.data;
}

// ─── Safe wrappers (return ApiResult with fallback) ──────────────────

export async function safeGetSiteSetting(locale = "th") {
  return safeFetch(() => getSiteSetting(locale), null);
}

export async function safeGetGlobalSetting(locale = "th") {
  return safeFetch(() => getGlobalSetting(locale), null);
}

export async function safeGetFooterSetting(locale = "th") {
  return safeFetch(() => getFooterSetting(locale), null);
}

export async function safeGetFeaturedProducts(locale = "th") {
  return safeFetch(() => getFeaturedProducts(locale), [] as Product[]);
}

export async function safeGetCompanyInfo(locale = "th") {
  return safeFetch(() => getCompanyInfo(locale), null);
}

export async function safeGetProducts(locale = "th", page = 1, pageSize = 12) {
  return safeFetch(
    () => getProducts(locale, page, pageSize),
    { data: [] as Product[], meta: null }
  );
}

export async function safeGetCategories(locale = "th") {
  return safeFetch(() => getCategories(locale), [] as Category[]);
}

export async function safeGetArticles(locale = "th", page = 1, pageSize = 12) {
  return safeFetch(
    () => getArticles(locale, page, pageSize),
    { data: [] as Article[], meta: null }
  );
}

export async function safeGetProductBySlug(slug: string, locale = "th") {
  return safeFetch(() => getProductBySlug(slug, locale), null);
}

export async function safeGetArticleBySlug(slug: string, locale = "th") {
  return safeFetch(() => getArticleBySlug(slug, locale), null);
}

export async function safeGetPageBySlug(slug: string, locale = "th") {
  return safeFetch(() => getPageBySlug(slug, locale), null);
}

export async function safeGetPrivacyPolicy(locale = "th") {
  return safeFetch(() => getPrivacyPolicy(locale), null);
}

export async function safeGetPdpaSetting(locale = "th") {
  return safeFetch(() => getPdpaSetting(locale), null);
}

export async function getTermsOfService(locale = "th") {
  const res = await fetchAPI<StrapiSingleResponse<TermsOfService>>(
    "/terms-of-service",
    { locale, populate: "*" }
  );
  return res.data;
}

export async function safeGetTermsOfService(locale = "th") {
  return safeFetch(() => getTermsOfService(locale), null);
}

export async function getCookiePolicy(locale = "th") {
  const res = await fetchAPI<StrapiSingleResponse<CookiePolicy>>(
    "/cookie-policy",
    { locale, populate: "*" }
  );
  return res.data;
}

export async function getCookieCategories(locale = "th") {
  const res = await fetchAPI<StrapiResponse<CookieCategory[]>>(
    "/cookie-categories",
    { locale, populate: "*", sort: "sort_order:asc" }
  );
  return res.data;
}

export async function safeGetCookieCategories(locale = "th") {
  return safeFetch(() => getCookieCategories(locale), [] as CookieCategory[]);
}

export { getStrapiMedia, STRAPI_URL };
