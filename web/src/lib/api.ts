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
  type ContactPage,
  type ContactFloating,
  type CookieCategory,
  type CookiePolicy,
  type CookieSetting,
  type Faq,
  type FooterSetting,
  type FreeTrial,
  type GlobalSetting,
  type Navigation,
  type Partner,
  type PdpaSetting,
  type PrivacyPolicy,
  type Product,
  type SupportPage,
  type TeamMember,
  type TermsOfService,
  type Testimonial,
  type TimelineMilestone,
  type SupportHeroSection,
  type SupportStatusCard,
  type SupportFaqSection,
  type SupportHelpCenterSection,
  type SupportContactSection,
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
  type CookieConsentSettings,
  type ContactAction,
  type NavItem,
  type NavChildItem,
  type FooterLabels,
  type ButtonLabels,
} from "./strapi";

import {
  mockGlobalSetting,
  mockFooterSetting,
  mockProducts,
  mockCategories,
  mockArticles,
  mockAboutPage,
  mockContactPage,
  mockPrivacyPolicy,
  mockPdpaSetting,
  mockTermsOfService,
  mockCookiePolicy,
  mockCookieCategories,
  mockCookieSetting,
  mockContactFloating,
  mockNavigation,
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
  type CookieConsentSettings,
  type ContactAction,
  type NavItem,
  type NavChildItem,
  type FooterLabels,
  type ButtonLabels,
  type CookieSetting,
  type ContactFloating,
  type Navigation,
  type SupportPage,
  type SupportHeroSection,
  type SupportStatusCard,
  type SupportFaqSection,
  type SupportHelpCenterSection,
  type SupportContactSection,
};

// ─── Populate Lists (integate-rule.md §3) ───────────────────────────
//
// Every rendered field must be in the populate list.
// Nested components use dot notation: footerSections.links
// Field names use camelCase matching the Strapi schemas.

const POPULATE = {
  globalSetting: [
    "siteLogo",
    "contactInfo",
    "stats",
    "seoConfig",
    "seoConfig.defaultOgImage",
  ],
  footerSetting: [
    "stats",
    "footerSections",
    "footerSections.links",
    "footerSections.links.productPage",
    "legalLinks",
  ],
  aboutPage: [
    "featuredImage",
    "stats",
    "teamMembers",
    "teamMembers.avatar",
    "partners",
    "partners.logo",
    "timelineMilestones",
    "timelineMilestones.image",
    "seo",
    "seo.ogImage",
    "seo.twitterImage",
  ],
  contactPage: ["featuredImage", "seo", "seo.ogImage"],
  freeTrial: [
    "featuredImage",
    "trustItems",
    "trialFeatures",
    "formLabels",
    "testimonials",
    "testimonials.avatar",
    "seo",
    "seo.ogImage",
  ],
  privacyPolicy: [
    "featuredImage",
    "policySections",
    "appliesToProducts",
    "relatedLinks",
    "relatedLinks.product",
    "contactInfo",
    "seo",
    "seo.ogImage",
  ],
  termsOfService: ["featuredImage", "seo", "seo.ogImage"],
  cookiePolicy: ["featuredImage", "seo", "seo.ogImage"],
  pdpaSetting: [
    "contactInfo",
    "consentBanner",
    "appliesToProducts",
    "seo",
    "seo.ogImage",
  ],
  product: [
    "images",
    "brand",
    "brand.logo",
    "categories",
    "categories.image",
    "seo",
    "seo.ogImage",
  ],
  article: ["featuredImage", "category", "seo", "seo.ogImage"],
  category: ["image", "products", "seo", "seo.ogImage"],
  brand: ["logo", "products", "seo", "seo.ogImage"],
  cookieCategory: [],
  faq: ["items", "seo", "seo.ogImage"],
  testimonial: ["avatar", "freeTrialPages"],
  teamMember: ["avatar", "aboutPage"],
  partner: ["logo", "aboutPage"],
  timelineMilestone: ["image", "aboutPage"],
  supportPage: [
    "heroSection",
    "statusCard",
    "faqSection",
    "faqs",
    "faqs.items",
    "helpCenterSection",
    "helpResources",
    "contactSection",
    "contactSettings",
    "contactSettings.contactInfo",
    "seo",
    "seo.ogImage",
  ],
} as const;

// ─── Page Fetch Functions ───────────────────────────────────────────

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

export async function getCookieSetting(locale: Locale = "th") {
  const res = await fetchStrapiSingle<CookieSetting>("cookie-setting", {
    locale,
    populate: ["settings"],
  });
  return res.data;
}

export async function getContactFloating(locale: Locale = "th") {
  const res = await fetchStrapiSingle<ContactFloating>("contact-floating", {
    locale,
    populate: ["actions"],
  });
  return res.data;
}

export async function getSupportPage(locale: Locale = "th") {
  const res = await fetchStrapiSingle<SupportPage>("support-page", {
    locale,
    populate: [...POPULATE.supportPage],
  });
  return res.data;
}

export async function getNavigation(locale: Locale = "th") {
  const res = await fetchStrapiSingle<Navigation>("navigation", {
    locale,
    populate: [
      "headerItems",
      "headerItems.children",
      "headerItems.children.productPage",
      "footerSections",
      "footerSections.links",
      "footerSections.links.productPage",
      "footerLabels",
      "productNames",
      "buttonLabels",
    ],
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
    filters: { "filters[isFeatured][$eq]": "true" },
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
      sort: "sortOrder:asc",
    },
  );
  return res.data;
}

export async function getFaq(locale: Locale = "th") {
  const res = await fetchStrapiCollection<Faq>("faqs", {
    locale,
    populate: [...POPULATE.faq],
    sort: "sortOrder:asc",
  });
  return res.data;
}

// ─── Safe Wrappers (integate-rule.md §6 — fallback hierarchy) ──────
//
// CMS value → i18n/static value → safe default

export async function safeGetGlobalSetting(locale: Locale = "th") {
  return safeFetch(() => getGlobalSetting(locale), mockGlobalSetting);
}

export async function safeGetFooterSetting(locale: Locale = "th") {
  return safeFetch(() => getFooterSetting(locale), mockFooterSetting);
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
        return mockProducts.filter((p) => p.isFeatured);
      }
      return data;
    },
    mockProducts.filter((p) => p.isFeatured),
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

export async function safeGetCookieSetting(locale: Locale = "th") {
  return safeFetch(() => getCookieSetting(locale), mockCookieSetting);
}

export async function safeGetContactFloating(locale: Locale = "th") {
  return safeFetch(() => getContactFloating(locale), mockContactFloating);
}

export async function safeGetSupportPage(locale: Locale = "th") {
  return safeFetch(() => getSupportPage(locale), null as SupportPage | null);
}

export async function safeGetNavigation(locale: Locale = "th") {
  return safeFetch(() => getNavigation(locale), mockNavigation);
}
