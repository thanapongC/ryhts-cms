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
  type BlogPage,
  type Brand,
  type Category,
  type ContactPage,
  type ContactFloating,
  type CookieCategory,
  type CookiePolicy,
  type CookiePolicyCategory,
  type CookieSetting,
  type DownloadItem,
  type DownloadsPage,
  type Faq,
  type HelpItem,
  type FooterSetting,
  type FreeTrial,
  type GlobalSetting,
  type Homepage,
  type Navigation,
  type Partner,
  type PdpaSetting,
  type PdpaSettings,
  type PrivacyPolicy,
  type PrivacyRequest,
  type PrivacyRequestTip,
  type PrivacyRequestTypeOption,
  type Product,
  type ProductPage,
  type ProductsServices,
  type Feature,
  type Benefit,
  type Video,
  type PricingFeature,
  type PricingPlan,
  type PageSectionItem,
  type ReleaseChange,
  type SoftwareRelease,
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
  type BlogHeroSection,
  type BlogListingSection,
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
  mockFreeTrial,
  mockArticles,
  mockArticlesByLocale,
  mockBlogPage,
  mockAboutPage,
  mockContactPage,
  mockPrivacyPolicy,
  mockPrivacyRequest,
  mockTermsOfService,
  mockCookiePolicy,
  mockCookieSetting,
  mockDownloadItemsByLocale,
  mockDownloadsPage,
  mockSoftwareReleasesByLocale,
  mockContactFloating,
  mockHomepage,
  mockNavigation,
  mockProductsServices,
  mockSupportPage,
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
  type BlogPage,
  type Brand,
  type Category,
  type ContactPage,
  type CookieCategory,
  type CookiePolicy,
  type CookiePolicyCategory,
  type DownloadItem,
  type DownloadsPage,
  type Faq,
  type HelpItem,
  type FooterSetting,
  type FreeTrial,
  type GlobalSetting,
  type Homepage,
  type Partner,
  type PdpaSetting,
  type PdpaSettings,
  type PrivacyPolicy,
  type PrivacyRequest,
  type PrivacyRequestTip,
  type PrivacyRequestTypeOption,
  type Product,
  type ProductPage,
  type ProductsServices,
  type Feature,
  type Benefit,
  type Video,
  type PricingFeature,
  type PricingPlan,
  type PageSectionItem,
  type ReleaseChange,
  type SoftwareRelease,
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
  type BlogHeroSection,
  type BlogListingSection,
};

export function isPageDisabled(page: { isPageEnabled?: boolean } | null | undefined): boolean {
  return page?.isPageEnabled === false;
}

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
    "teamMembers",
    "teamMembers.photo",
    "partners",
    "partners.logo",
    "milestones",
    "milestones.image",
    "contactInfo",
    "seo",
    "seo.ogImage",
  ],
  homepage: [
    "heroBackground",
    "heroStats",
    "features",
    "features.icon",
    "products",
    "products.thumbnail",
    "products.seo",
    "benefits",
    "benefits.icon",
    "video",
    "video.thumbnail",
    "testimonials",
    "testimonials.avatar",
    "pricingPlans",
    "pricingPlans.icon",
    "pricingPlans.features",
    "pricingPlans.features.feature",
    "seo",
    "seo.ogImage",
  ],
  blogPage: [
    "heroSection",
    "listingSection",
    "featuredPosts",
    "featuredPosts.featuredImage",
    "featuredPosts.category",
    "featuredPosts.seo",
    "seo",
    "seo.ogImage",
  ],
  contactPage: ["featuredImage", "seo", "seo.ogImage"],
  freeTrial: [
    "trustItems",
    "features",
    "formLabels",
    "testimonials",
    "testimonials.avatar",
    "seo",
    "seo.ogImage",
  ],
  privacyPolicy: [
    "sections",
    "appliesToProducts",
    "appliesToProducts.thumbnail",
    "relatedLinks",
    "legalContactInfo",
    "seo",
    "seo.ogImage",
  ],
  privacyRequest: [
    "settings",
    "settings.beforeSubmitTips",
    "settings.requestTypes",
    "settings.legalContactInfo",
    "seo",
    "seo.ogImage",
  ],
  termsOfService: [
    "sections",
    "appliesToProducts",
    "appliesToProducts.thumbnail",
    "relatedLinks",
    "legalContactInfo",
    "seo",
    "seo.ogImage",
  ],
  cookiePolicy: ["categories", "sections", "seo", "seo.ogImage"],
  downloadsPage: [
    "documents",
    "documents.file",
    "latestVersion",
    "latestVersion.downloadFile",
    "latestVersion.changes",
    "releaseNotes",
    "releaseNotes.downloadFile",
    "releaseNotes.changes",
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
  productsServices: [
    "heroStats",
    "products",
    "products.thumbnail",
    "products.seo",
    "whyStats",
    "seo",
    "seo.ogImage",
  ],
  productPage: [
    "thumbnail",
    "heroBackground",
    "sections",
    "sections.image",
    "testimonials",
    "testimonials.avatar",
    "contactInfo",
    "seo",
    "seo.ogImage",
  ],
  article: ["featuredImage", "category", "seo", "seo.ogImage"],
  downloadItem: ["file"],
  softwareRelease: ["downloadFile", "changes"],
  faq: [],
  testimonial: ["avatar", "freeTrialPages"],
  teamMember: ["avatar", "aboutPage"],
  partner: ["logo", "aboutPage"],
  timelineMilestone: ["image", "aboutPage"],
  supportPage: [
    "heroSection",
    "statusCard",
    "faqSection",
    "faqs",
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
  const res = await fetchStrapiSingle<AboutPage>("about-us", {
    locale,
    populate: [...POPULATE.aboutPage],
  });
  return res.data;
}

export async function getHomepage(locale: Locale = "th") {
  const res = await fetchStrapiSingle<Homepage>("homepage", {
    locale,
    populate: [...POPULATE.homepage],
  });
  return res.data;
}

export async function getBlogPage(locale: Locale = "th") {
  const res = await fetchStrapiSingle<BlogPage>("blog-page", {
    locale,
    populate: [...POPULATE.blogPage],
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
  const res = await fetchStrapiSingle<PrivacyPolicy>("privacy-setting", {
    locale,
    populate: [...POPULATE.privacyPolicy],
  });
  return res.data;
}

export async function getPrivacyRequest(locale: Locale = "th") {
  const res = await fetchStrapiSingle<PrivacyRequest>("privacy-request", {
    locale,
    populate: [...POPULATE.privacyRequest],
  });
  return res.data;
}

export async function getTermsOfService(locale: Locale = "th") {
  const res = await fetchStrapiSingle<TermsOfService>("terms-service", {
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

export async function getDownloadsPage(locale: Locale = "th") {
  const res = await fetchStrapiSingle<DownloadsPage>("downloads-page", {
    locale,
    populate: [...POPULATE.downloadsPage],
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

export async function getProductsServices(locale: Locale = "th") {
  const res = await fetchStrapiSingle<ProductsServices>("products-services", {
    locale,
    populate: [...POPULATE.productsServices],
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
  return fetchStrapiCollection<ProductPage>("product-pages", {
    locale,
    populate: [...POPULATE.productPage],
    filters: { "filters[isActive][$ne]": "false" },
    sort: "sortOrder:asc",
    pagination: { page, pageSize },
  });
}

export async function getFeaturedProducts(locale: Locale = "th") {
  const res = await fetchStrapiCollection<ProductPage>("product-pages", {
    locale,
    populate: [...POPULATE.productPage],
    filters: { "filters[isActive][$ne]": "false" },
    sort: "sortOrder:asc",
  });
  return res.data;
}

export async function getProductBySlug(slug: string, locale: Locale = "th") {
  const res = await fetchStrapiCollection<ProductPage>("product-pages", {
    locale,
    populate: [...POPULATE.productPage],
    filters: { "filters[slug][$eq]": slug, "filters[isActive][$ne]": "false" },
  });
  return res.data?.[0] || null;
}

export async function getProductPageBySlug(slug: string, locale: Locale = "th") {
  const res = await fetchStrapiCollection<ProductPage>("product-pages", {
    locale,
    populate: [...POPULATE.productPage],
    filters: { "filters[slug][$eq]": slug, "filters[isActive][$ne]": "false" },
  });
  return res.data?.[0] || null;
}

export async function getArticles(
  locale: Locale = "th",
  page = 1,
  pageSize = 12,
) {
  return fetchStrapiCollection<Article>("blog-posts", {
    locale,
    populate: [...POPULATE.article],
    filters: { "filters[isActive][$ne]": "false" },
    sort: "publishedAt:desc",
    pagination: { page, pageSize },
  });
}

export async function getArticleBySlug(slug: string, locale: Locale = "th") {
  const res = await fetchStrapiCollection<Article>("blog-posts", {
    locale,
    populate: [...POPULATE.article],
    filters: { "filters[slug][$eq]": slug, "filters[isActive][$ne]": "false" },
  });
  return res.data?.[0] || null;
}

export async function getDownloadItems(locale: Locale = "th") {
  const res = await fetchStrapiCollection<DownloadItem>("download-items", {
    locale,
    populate: [...POPULATE.downloadItem],
    sort: "sortOrder:asc",
  });
  return res.data;
}

export async function getSoftwareReleases(locale: Locale = "th") {
  const res = await fetchStrapiCollection<SoftwareRelease>("software-releases", {
    locale,
    populate: [...POPULATE.softwareRelease],
    sort: "releaseDate:desc",
  });
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
  return safeFetch(() => getGlobalSetting(locale), mockGlobalSetting[locale]);
}

export async function safeGetFooterSetting(locale: Locale = "th") {
  return safeFetch(() => getFooterSetting(locale), mockFooterSetting);
}

export async function safeGetAboutPage(locale: Locale = "th") {
  return safeFetch(() => getAboutPage(locale), mockAboutPage[locale]);
}

export async function safeGetHomepage(locale: Locale = "th") {
  return safeFetch(() => getHomepage(locale), mockHomepage[locale]);
}

export async function safeGetBlogPage(locale: Locale = "th") {
  return safeFetch(() => getBlogPage(locale), mockBlogPage[locale]);
}

export async function safeGetContactPage(locale: Locale = "th") {
  return safeFetch(() => getContactPage(locale), mockContactPage[locale]);
}

export async function safeGetFreeTrial(locale: Locale = "th") {
  return safeFetch(() => getFreeTrial(locale), mockFreeTrial[locale]);
}

export async function safeGetPrivacyPolicy(locale: Locale = "th") {
  return safeFetch(() => getPrivacyPolicy(locale), mockPrivacyPolicy[locale]);
}

export async function safeGetPrivacyRequest(locale: Locale = "th") {
  return safeFetch(() => getPrivacyRequest(locale), mockPrivacyRequest[locale]);
}

export async function safeGetTermsOfService(locale: Locale = "th") {
  return safeFetch(() => getTermsOfService(locale), mockTermsOfService[locale]);
}

export async function safeGetCookiePolicy(locale: Locale = "th") {
  return safeFetch(() => getCookiePolicy(locale), mockCookiePolicy[locale]);
}

export async function safeGetDownloadsPage(locale: Locale = "th") {
  return safeFetch(() => getDownloadsPage(locale), mockDownloadsPage[locale]);
}

export async function safeGetFeaturedProducts(locale: Locale = "th") {
  return safeFetch(
    () => getFeaturedProducts(locale),
    filterAndSort(mockProductsServices[locale].products || []),
  );
}

export async function safeGetProducts(
  locale: Locale = "th",
  page = 1,
  pageSize = 12,
) {
  const fallbackProducts = filterAndSort(mockProductsServices[locale].products || []);
  return safeFetch(
    async () => {
      return getProducts(locale, page, pageSize);
    },
    {
      data: fallbackProducts,
      meta: {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 1,
          total: fallbackProducts.length,
        },
      },
    },
  );
}

export async function safeGetCategories(locale: Locale = "th") {
  return safeFetch(async () => [], []);
}

export async function safeGetArticles(
  locale: Locale = "th",
  page = 1,
  pageSize = 12,
) {
  const fallbackArticles = mockArticlesByLocale[locale];
  return safeFetch(
    async () => {
      return getArticles(locale, page, pageSize);
    },
    {
      data: fallbackArticles,
      meta: {
        pagination: {
          page: 1,
          pageSize,
          pageCount: 1,
          total: fallbackArticles.length,
        },
      },
    },
  );
}

export async function safeGetProductBySlug(
  slug: string,
  locale: Locale = "th",
) {
  const fallbackProducts = mockProductsServices[locale].products || [];
  return safeFetch(
    async () => {
      const data = await getProductBySlug(slug, locale);
      return data || null;
    },
    fallbackProducts.find((p) => p.slug === slug) || null,
  );
}

export async function safeGetProductPageBySlug(
  slug: string,
  locale: Locale = "th",
) {
  const fallbackProducts = mockProductsServices[locale].products || [];
  return safeFetch(
    async () => {
      const data = await getProductPageBySlug(slug, locale);
      return data || null;
    },
    fallbackProducts.find((p) => p.slug === slug) || null,
  );
}

export async function safeGetArticleBySlug(
  slug: string,
  locale: Locale = "th",
) {
  const fallbackArticles = mockArticlesByLocale[locale];
  return safeFetch(
    async () => {
      const data = await getArticleBySlug(slug, locale);
      return data || null;
    },
    fallbackArticles.find((a) => a.slug === slug) || null,
  );
}

export async function safeGetCookieCategories(locale: Locale = "th") {
  return safeFetch(async () => [], []);
}

export async function safeGetDownloadItems(locale: Locale = "th") {
  return safeFetch(
    async () => {
      const data = await getDownloadItems(locale);
      if (!data || data.length === 0) return mockDownloadItemsByLocale[locale];
      return data;
    },
    mockDownloadItemsByLocale[locale],
  );
}

export async function safeGetSoftwareReleases(locale: Locale = "th") {
  return safeFetch(
    async () => {
      const data = await getSoftwareReleases(locale);
      if (!data || data.length === 0) return mockSoftwareReleasesByLocale[locale];
      return data;
    },
    mockSoftwareReleasesByLocale[locale],
  );
}

export async function safeGetFaq(locale: Locale = "th") {
  return safeFetch(
    () => getFaq(locale),
    [] as Faq[],
  );
}

export async function safeGetCookieSetting(locale: Locale = "th") {
  return safeFetch(() => getCookieSetting(locale), mockCookieSetting[locale]);
}

export async function safeGetContactFloating(locale: Locale = "th") {
  return safeFetch(() => getContactFloating(locale), mockContactFloating[locale]);
}

export async function safeGetSupportPage(locale: Locale = "th") {
  return safeFetch(() => getSupportPage(locale), mockSupportPage[locale]);
}

export async function safeGetProductsServices(locale: Locale = "th") {
  return safeFetch(() => getProductsServices(locale), mockProductsServices[locale]);
}

export async function safeGetNavigation(locale: Locale = "th") {
  return safeFetch(() => getNavigation(locale), mockNavigation);
}
