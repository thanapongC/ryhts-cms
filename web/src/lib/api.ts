/**
 * API Functions — Frontend integration layer
 *
 * All CMS fetching goes through strapi.ts.
 * This file provides page-level fetch functions with proper populate lists
 * and fallback mock data.
 *
 * Rules: integate-rule.md §2–§8
 */

import type { Locale } from "./i18n";
import {
  fetchStrapiSingle,
  fetchStrapiCollection,
  safeFetch,
  getStrapiMedia,
  getStrapiAbsoluteImageUrl,
  normalizeInternalUrl,
  getLinkUrl,
  filterAndSort,
  type StrapiMedia,
  type ApiResult,
  // Content types
  type AboutPage,
  type Article,
  type Brand,
  type Category,
  type CompanyInfo,
  type ContactPage,
  type CookieCategory,
  type CookiePolicy,
  type Faq,
  type FooterSetting,
  type FreeTrial,
  type GlobalSetting,
  type Partner,
  type PdpaSetting,
  type PrivacyPolicy,
  type Product,
  type SiteSetting,
  type TeamMember,
  type TermsOfService,
  type Testimonial,
  type TimelineMilestone,
  // Components
  type SeoMeta,
  type SeoConfig,
  type StatItem,
  type ContactInfo,
  type FooterSection,
  type FooterLink,
  type LegalLink,
  type PolicySection,
  type RelatedLink,
  type TrustItem,
  type FormLabel,
  type TrialFeature,
  type FaqItem,
} from "./strapi";

import {
  mockSiteSetting,
  mockGlobalSetting,
  mockFooterSetting,
  mockCompanyInfo,
  mockProducts,
  mockCategories,
  mockArticles,
  mockPages,
  mockAboutPage,
  mockContactPage,
  mockPrivacyPolicy,
  mockPdpaSetting,
  mockTermsOfService,
  mockCookiePolicy,
  mockCookieCategories,
} from "./mock-data";

// ─── Re-export helpers for backward compat ──────────────────────────

export {
  getStrapiMedia,
  getStrapiAbsoluteImageUrl,
  normalizeInternalUrl,
  getLinkUrl,
  filterAndSort,
  type StrapiMedia,
  type ApiResult,
  type AboutPage,
  type Article,
  type Brand,
  type Category,
  type CompanyInfo,
  type ContactPage,
  type CookieCategory,
  type CookiePolicy,
  type Faq,
  type FooterSetting,
  type FreeTrial,
  type GlobalSetting,
  type Partner,
  type PdpaSetting,
  type PrivacyPolicy,
  type Product,
  type SiteSetting,
  type TeamMember,
  type TermsOfService,
  type Testimonial,
  type TimelineMilestone,
  type SeoMeta,
  type SeoConfig,
  type StatItem,
  type ContactInfo,
  type FooterSection,
  type FooterLink,
  type LegalLink,
  type PolicySection,
  type RelatedLink,
  type TrustItem,
  type FormLabel,
  type TrialFeature,
  type FaqItem,
};

// ─── Populate Lists (integate-rule.md §3) ───────────────────────────
//
// Every rendered field must be in the populate list.
// Nested components use dot notation: footerSections.links

const POPULATE = {
  siteSetting: ["site_logo", "site_favicon", "stats"],
  globalSetting: ["seoConfig", "seoConfig.default_og_image"],
  footerSetting: [
    "footer_sections",
    "footer_sections.links",
    "footer_sections.links.product",
    "legal_links",
  ],
  companyInfo: ["contact_info"],
  aboutPage: [
    "featured_image",
    "stats",
    "team_members",
    "team_members.avatar",
    "partners",
    "partners.logo",
    "timeline_milestones",
    "timeline_milestones.image",
    "seo",
    "seo.og_image",
    "seo.twitter_image",
  ],
  contactPage: ["featured_image", "seo", "seo.og_image"],
  freeTrial: [
    "featured_image",
    "trust_items",
    "trial_features",
    "form_labels",
    "testimonials",
    "testimonials.avatar",
    "seo",
    "seo.og_image",
  ],
  privacyPolicy: [
    "featured_image",
    "policy_sections",
    "applies_to_products",
    "related_links",
    "related_links.product",
    "contact_info",
    "seo",
    "seo.og_image",
  ],
  termsOfService: ["featured_image", "seo", "seo.og_image"],
  cookiePolicy: ["featured_image", "seo", "seo.og_image"],
  pdpaSetting: [
    "contact_info",
    "applies_to_products",
    "seo",
    "seo.og_image",
  ],
  product: [
    "images",
    "brand",
    "brand.logo",
    "categories",
    "categories.image",
    "seo",
    "seo.og_image",
  ],
  article: ["featured_image", "category", "seo", "seo.og_image"],
  category: ["image", "products", "seo", "seo.og_image"],
  brand: ["logo", "products", "seo", "seo.og_image"],
  cookieCategory: [],
  faq: ["items", "seo", "seo.og_image"],
  testimonial: ["avatar", "free_trial_pages"],
  teamMember: ["avatar", "about_page"],
  partner: ["logo", "about_page"],
  timelineMilestone: ["image", "about_page"],
} as const;

// ─── Page Fetch Functions ───────────────────────────────────────────

export async function getSiteSetting(locale: Locale = "th") {
  const res = await fetchStrapiSingle<SiteSetting>("site-setting", {
    locale,
    populate: [...POPULATE.siteSetting],
  });
  return res.data;
}

export async function getGlobalSetting(locale: Locale = "th") {
  const res = await fetchStrapiSingle<GlobalSetting>("global-setting", {
    locale,
    populate: [...POPULATE.globalSetting],
  });
  return res.data;
}

export async function getFooterSetting(locale: Locale = "th") {
  const res = await fetchStrapiSingle<FooterSetting>("footer-setting", {
    locale,
    populate: [...POPULATE.footerSetting],
  });
  return res.data;
}

export async function getCompanyInfo(locale: Locale = "th") {
  const res = await fetchStrapiSingle<CompanyInfo>("company-info", {
    locale,
    populate: [...POPULATE.companyInfo],
  });
  return res.data;
}

export async function getAboutPage(locale: Locale = "th") {
  const res = await fetchStrapiSingle<AboutPage>("about-page", {
    locale,
    populate: [...POPULATE.aboutPage],
  });
  return res.data;
}

export async function getContactPage(locale: Locale = "th") {
  const res = await fetchStrapiSingle<ContactPage>("contact-page", {
    locale,
    populate: [...POPULATE.contactPage],
  });
  return res.data;
}

export async function getFreeTrial(locale: Locale = "th") {
  const res = await fetchStrapiSingle<FreeTrial>("free-trial", {
    locale,
    populate: [...POPULATE.freeTrial],
  });
  return res.data;
}

export async function getPrivacyPolicy(locale: Locale = "th") {
  const res = await fetchStrapiSingle<PrivacyPolicy>("privacy-policy", {
    locale,
    populate: [...POPULATE.privacyPolicy],
  });
  return res.data;
}

export async function getTermsOfService(locale: Locale = "th") {
  const res = await fetchStrapiSingle<TermsOfService>("terms-of-service", {
    locale,
    populate: [...POPULATE.termsOfService],
  });
  return res.data;
}

export async function getCookiePolicy(locale: Locale = "th") {
  const res = await fetchStrapiSingle<CookiePolicy>("cookie-policy", {
    locale,
    populate: [...POPULATE.cookiePolicy],
  });
  return res.data;
}

export async function getPdpaSetting(locale: Locale = "th") {
  const res = await fetchStrapiSingle<PdpaSetting>("pdpa-setting", {
    locale,
    populate: [...POPULATE.pdpaSetting],
  });
  return res.data;
}

// ─── Collection Fetch Functions ─────────────────────────────────────

export async function getProducts(
  locale: Locale = "th",
  page = 1,
  pageSize = 12,
) {
  return fetchStrapiCollection<Product>("products", {
    locale,
    populate: [...POPULATE.product],
    sort: "publishedAt:desc",
    pagination: { page, pageSize },
  });
}

export async function getFeaturedProducts(locale: Locale = "th") {
  const res = await fetchStrapiCollection<Product>("products", {
    locale,
    populate: [...POPULATE.product],
    filters: { "filters[is_featured][$eq]": "true" },
    sort: "publishedAt:desc",
  });
  return res.data;
}

export async function getProductBySlug(slug: string, locale: Locale = "th") {
  const res = await fetchStrapiCollection<Product>("products", {
    locale,
    populate: [...POPULATE.product],
    filters: { "filters[slug][$eq]": slug },
  });
  return res.data?.[0] || null;
}

export async function getCategories(locale: Locale = "th") {
  const res = await fetchStrapiCollection<Category>("categories", {
    locale,
    populate: [...POPULATE.category],
  });
  return res.data;
}

export async function getCategoryBySlug(slug: string, locale: Locale = "th") {
  const res = await fetchStrapiCollection<Category>("categories", {
    locale,
    populate: [...POPULATE.category],
    filters: { "filters[slug][$eq]": slug },
  });
  return res.data?.[0] || null;
}

export async function getBrands(locale: Locale = "th") {
  const res = await fetchStrapiCollection<Brand>("brands", {
    locale,
    populate: [...POPULATE.brand],
  });
  return res.data;
}

export async function getArticles(
  locale: Locale = "th",
  page = 1,
  pageSize = 12,
) {
  return fetchStrapiCollection<Article>("articles", {
    locale,
    populate: [...POPULATE.article],
    sort: "publishedAt:desc",
    pagination: { page, pageSize },
  });
}

export async function getArticleBySlug(slug: string, locale: Locale = "th") {
  const res = await fetchStrapiCollection<Article>("articles", {
    locale,
    populate: [...POPULATE.article],
    filters: { "filters[slug][$eq]": slug },
  });
  return res.data?.[0] || null;
}

export async function getCookieCategories(locale: Locale = "th") {
  const res = await fetchStrapiCollection<CookieCategory>(
    "cookie-categories",
    {
      locale,
      populate: [...POPULATE.cookieCategory],
      sort: "sort_order:asc",
    },
  );
  return res.data;
}

export async function getFaq(locale: Locale = "th") {
  const res = await fetchStrapiCollection<Faq>("faqs", {
    locale,
    populate: [...POPULATE.faq],
    sort: "sort_order:asc",
  });
  return res.data;
}

// ─── Safe Wrappers (integate-rule.md §6 — fallback hierarchy) ──────
//
// CMS value → i18n/static value → safe default

export async function safeGetSiteSetting(locale: Locale = "th") {
  return safeFetch(() => getSiteSetting(locale), mockSiteSetting);
}

export async function safeGetGlobalSetting(locale: Locale = "th") {
  return safeFetch(() => getGlobalSetting(locale), mockGlobalSetting);
}

export async function safeGetFooterSetting(locale: Locale = "th") {
  return safeFetch(() => getFooterSetting(locale), mockFooterSetting);
}

export async function safeGetCompanyInfo(locale: Locale = "th") {
  return safeFetch(() => getCompanyInfo(locale), mockCompanyInfo);
}

export async function safeGetAboutPage(locale: Locale = "th") {
  return safeFetch(() => getAboutPage(locale), mockAboutPage);
}

export async function safeGetContactPage(locale: Locale = "th") {
  return safeFetch(() => getContactPage(locale), mockContactPage);
}

export async function safeGetFreeTrial(locale: Locale = "th") {
  return safeFetch(
    () => getFreeTrial(locale),
    null as FreeTrial | null,
  );
}

export async function safeGetPrivacyPolicy(locale: Locale = "th") {
  return safeFetch(() => getPrivacyPolicy(locale), mockPrivacyPolicy);
}

export async function safeGetTermsOfService(locale: Locale = "th") {
  return safeFetch(() => getTermsOfService(locale), mockTermsOfService);
}

export async function safeGetCookiePolicy(locale: Locale = "th") {
  return safeFetch(() => getCookiePolicy(locale), mockCookiePolicy);
}

export async function safeGetPdpaSetting(locale: Locale = "th") {
  return safeFetch(() => getPdpaSetting(locale), mockPdpaSetting);
}

export async function safeGetFeaturedProducts(locale: Locale = "th") {
  return safeFetch(
    async () => {
      const data = await getFeaturedProducts(locale);
      if (!data || data.length === 0) {
        return mockProducts.filter((p) => p.is_featured);
      }
      return data;
    },
    mockProducts.filter((p) => p.is_featured),
  );
}

export async function safeGetProducts(
  locale: Locale = "th",
  page = 1,
  pageSize = 12,
) {
  return safeFetch(
    async () => {
      const result = await getProducts(locale, page, pageSize);
      if (!result.data || result.data.length === 0) {
        return {
          data: mockProducts,
          meta: {
            pagination: {
              page: 1,
              pageSize,
              pageCount: 1,
              total: mockProducts.length,
            },
          },
        };
      }
      return result;
    },
    {
      data: mockProducts,
      meta: {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 1,
          total: mockProducts.length,
        },
      },
    },
  );
}

export async function safeGetCategories(locale: Locale = "th") {
  return safeFetch(
    async () => {
      const data = await getCategories(locale);
      if (!data || data.length === 0) return mockCategories;
      return data;
    },
    mockCategories,
  );
}

export async function safeGetArticles(
  locale: Locale = "th",
  page = 1,
  pageSize = 12,
) {
  return safeFetch(
    async () => {
      const result = await getArticles(locale, page, pageSize);
      if (!result.data || result.data.length === 0) {
        return {
          data: mockArticles,
          meta: {
            pagination: {
              page: 1,
              pageSize,
              pageCount: 1,
              total: mockArticles.length,
            },
          },
        };
      }
      return result;
    },
    {
      data: mockArticles,
      meta: {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 1,
          total: mockArticles.length,
        },
      },
    },
  );
}

export async function safeGetProductBySlug(
  slug: string,
  locale: Locale = "th",
) {
  return safeFetch(
    async () => {
      const data = await getProductBySlug(slug, locale);
      if (!data) return mockProducts.find((p) => p.slug === slug) || null;
      return data;
    },
    mockProducts.find((p) => p.slug === slug) || null,
  );
}

export async function safeGetArticleBySlug(
  slug: string,
  locale: Locale = "th",
) {
  return safeFetch(
    async () => {
      const data = await getArticleBySlug(slug, locale);
      if (!data) return mockArticles.find((a) => a.slug === slug) || null;
      return data;
    },
    mockArticles.find((a) => a.slug === slug) || null,
  );
}

export async function safeGetCookieCategories(locale: Locale = "th") {
  return safeFetch(
    async () => {
      const data = await getCookieCategories(locale);
      if (!data || data.length === 0) return mockCookieCategories;
      return data;
    },
    mockCookieCategories,
  );
}

export async function safeGetFaq(locale: Locale = "th") {
  return safeFetch(
    () => getFaq(locale),
    [] as Faq[],
  );
}
