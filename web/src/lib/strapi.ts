/**
 * Strapi CMS Integration Layer
 *
 * All frontend CMS fetching goes through this file.
 * Rules: integate-rule.md §2–§9
 */

import type { Locale } from "./i18n";
// Cache disabled — every request goes to Strapi API directly

// ─── Constants ──────────────────────────────────────────────────────

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
const MAX_RETRIES = 2;
const TIMEOUT_MS = 8000;

// ─── Errors ─────────────────────────────────────────────────────────

export class StrapiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public path?: string,
  ) {
    super(message);
    this.name = "StrapiError";
  }
}

// ─── Strapi Response Types ──────────────────────────────────────────

export interface StrapiResponse<T> {
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

export interface StrapiSingleResponse<T> {
  data: T;
}

// ─── Media Type ─────────────────────────────────────────────────────

export interface StrapiMedia {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

// ─── Component Interfaces ───────────────────────────────────────────

/** shared.seo-meta */
export interface SeoMeta {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: StrapiMedia | null;
  ogType?: "website" | "article" | "product";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: StrapiMedia | null;
  noindex?: boolean;
  nofollow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  maxSnippet?: number;
  maxImagePreview?: "none" | "standard" | "large";
  maxVideoPreview?: number;
  schemaType?: string;
  alternateLanguages?: Record<string, string> | null;
  /** @deprecated Use individual boolean fields instead */
  robots?: string;
}

/** shared.seo-config */
export interface SeoConfig {
  siteUrl?: string;
  siteName?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultOgImage?: StrapiMedia | null;
  brandName?: string;
  facebookUrl?: string;
  lineUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  twitterUrl?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  twitterHandle?: string;
  robotsUserAgent?: string;
  robotsAllowPaths?: unknown;
  robotsDisallowPaths?: unknown;
  robotsSitemapUrl?: string;
  robotsCrawlDelay?: number;
}

/** shared.contact-info */
export interface ContactInfo {
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
  businessHours?: string;
  mapUrl?: string;
  socialLinks?: Record<string, string> | null;
}

/** privacy.request-tip */
export interface PrivacyRequestTip {
  text?: string;
  accent?: "red" | "orange";
  sortOrder?: number;
  isActive?: boolean;
}

/** privacy.request-type-option */
export interface PrivacyRequestTypeOption {
  value?: "access" | "correction" | "deletion" | "restriction" | "objection" | "withdrawal";
  label?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** shared.pdpa-settings */
export interface PdpaSettings {
  heroBadge?: string;
  privacyRequestTitle?: string;
  privacyRequestDesc?: string;
  responseTimeLabel?: string;
  responseTimeDescription?: string;
  secureNoteLabel?: string;
  secureNoteDescription?: string;
  dpoContactLabel?: string;
  phoneLabel?: string;
  emailLabel?: string;
  businessHoursLabel?: string;
  beforeSubmitTitle?: string;
  beforeSubmitDescription?: string;
  beforeSubmitTips?: PrivacyRequestTip[];
  formBadge?: string;
  formTitle?: string;
  requiredFieldsNote?: string;
  formNameLabel?: string;
  formNamePlaceholder?: string;
  formEmailLabel?: string;
  formEmailPlaceholder?: string;
  formPhoneLabel?: string;
  formPhonePlaceholder?: string;
  formCompanyLabel?: string;
  formCompanyPlaceholder?: string;
  formRequestTypeLabel?: string;
  formRequestTypePlaceholder?: string;
  requestTypes?: PrivacyRequestTypeOption[];
  formMessageLabel?: string;
  formMessagePlaceholder?: string;
  formAdditionalInfoLabel?: string;
  formAdditionalInfoPlaceholder?: string;
  formNote?: string;
  formSubmitLabel?: string;
  formSubmittingLabel?: string;
  formSuccessTitle?: string;
  formSuccessMessage?: string;
  dpoEmail?: string;
  dpoPhone?: string;
  legalContactInfo?: ContactInfo | null;
}

/** shared.stat-item */
export interface StatItem {
  label: string;
  value: string;
  icon?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** footer.footer-section */
export interface FooterSection {
  title: string;
  links?: FooterLink[];
  sortOrder?: number;
  isActive?: boolean;
}

/** footer.footer-link */
export interface FooterLink {
  label: string;
  productPage?: { slug?: string; name?: string; pageTitle?: string } | null;
  url?: string;
  target?: "_self" | "_blank";
  sortOrder?: number;
  isActive?: boolean;
}

/** footer.legal-link */
export interface LegalLink {
  label: string;
  url: string;
  target?: "_self" | "_blank";
  sortOrder?: number;
  isActive?: boolean;
}

/** shared.cookie-consent-settings */
export interface CookieConsentSettings {
  title?: string;
  description?: string;
  necessaryLabel?: string;
  necessaryDesc?: string;
  analyticsLabel?: string;
  analyticsDesc?: string;
  functionalLabel?: string;
  functionalDesc?: string;
  marketingLabel?: string;
  marketingDesc?: string;
  acceptAllLabel?: string;
  rejectAllLabel?: string;
  manageLabel?: string;
  savePreferencesLabel?: string;
  closeLabel?: string;
  privacyPolicyLabel?: string;
  cookiePolicyLabel?: string;
  alwaysOnLabel?: string;
  learnMoreLabel?: string;
}

/** contact-floating.contact-action */
export interface ContactAction {
  type: "phone" | "line" | "email" | "facebook" | "map" | "custom";
  label: string;
  description?: string;
  url: string;
  ariaLabel?: string;
  openInNewTab?: boolean;
  sortOrder?: number;
  isActive?: boolean;
}

/** navigation.nav-child-item */
export interface NavChildItem {
  label: string;
  url?: string;
  productPage?: Product | null;
  target?: "_self" | "_blank";
}

/** navigation.nav-item */
export interface NavItem {
  label: string;
  url?: string;
  target?: "_self" | "_blank";
  children?: NavChildItem[];
}

/** navigation.footer-section */
export interface NavigationFooterSection {
  title: string;
  links?: NavChildItem[];
  sortOrder?: number;
  isActive?: boolean;
}

/** navigation.product-name */
export interface ProductName {
  name: string;
  url?: string;
  sortOrder?: number;
}

/** shared.footer-labels */
export interface FooterLabels {
  contactHeading?: string;
  linksHeading?: string;
  aboutHeading?: string;
  newsletterHeading?: string;
  newsletterPlaceholder?: string;
  newsletterButton?: string;
}

/** shared.button-labels */
export interface ButtonLabels {
  contactUs?: string;
  learnMore?: string;
  viewAll?: string;
  readMore?: string;
  backToHome?: string;
  callNow?: string;
  requestQuote?: string;
  download?: string;
}

/** privacy.policy-section */
export interface PolicySection {
  title: string;
  content: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** privacy.related-link */
export interface RelatedLink {
  label: string;
  product?: Product | null;
  url?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** free-trial.trust-item */
export interface TrustItem {
  label: string;
  icon?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** free-trial.form-labels */
export interface FormLabel {
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  positionLabel?: string;
  positionPlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  addressLabel?: string;
  addressPlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  businessDetailsLabel?: string;
  businessDetailsPlaceholder?: string;
  privacyConsentPrefix?: string;
  privacyPolicyLabel?: string;
  privacyPolicyUrl?: string;
  privacyConsentSuffix?: string;
  marketingConsentLabel?: string;
  marketingConsentDescription?: string;
  submitLabel?: string;
  successTitle?: string;
  successMessage?: string;
}

/** free-trial.trial-feature */
export interface TrialFeature {
  title: string;
  icon?: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** faq.faq-item */
export interface FaqItem {
  question: string;
  answer: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** support.hero-section */
export interface SupportHeroSection {
  badge?: string;
  title: string;
  subtitle?: string;
  faqCtaLabel?: string;
  manualCtaLabel?: string;
  contactCtaLabel?: string;
}

/** support.status-card */
export interface SupportStatusCard {
  kicker?: string;
  title?: string;
  hours?: string;
  statusLabel?: string;
}

/** support.faq-section */
export interface SupportFaqSection {
  badge?: string;
  title: string;
  subtitle?: string;
  emptyPrompt?: string;
  contactCtaLabel?: string;
}

/** support.help-center-section */
export interface SupportHelpCenterSection {
  badge?: string;
  title: string;
  subtitle?: string;
}

/** support.contact-section */
export interface SupportContactSection {
  badge?: string;
  title: string;
  addressLabel?: string;
  businessHoursLabel?: string;
  phoneLabel?: string;
  emailLabel?: string;
}

/** blog.hero-section */
export interface BlogHeroSection {
  badge?: string;
  title: string;
  description?: string;
}

/** blog.listing-section */
export interface BlogListingSection {
  breadcrumbLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  offlineTitle?: string;
  offlineMessage?: string;
}

// ─── Content Type Interfaces ────────────────────────────────────────

/** api::about-page.about-page */
export interface AboutPage {
  isPageEnabled?: boolean;
  title?: string;
  subtitle?: string;
  pageTitle?: string;
  pageDescription?: string;
  featuredImage?: StrapiMedia | null;
  stats?: StatItem[];
  content?: string;
  companyIntro?: string | unknown[];
  mission?: string | unknown[];
  vision?: string | unknown[];
  teamTitle?: string;
  teamSubtitle?: string;
  teamMembers?: TeamMember[];
  partnerTitle?: string;
  partnerSubtitle?: string;
  partners?: Partner[];
  timelineTitle?: string;
  timelineSubtitle?: string;
  milestones?: TimelineMilestone[];
  timelineMilestones?: TimelineMilestone[];
  contactInfo?: ContactInfo | null;
  seo?: SeoMeta | null;
}

/** api::article.article */
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string | unknown[];
  featuredImage?: StrapiMedia | null;
  author?: string;
  articleDate?: string;
  tags?: string[];
  views?: number;
  category?: BlogCategory | Category | null;
  isActive?: boolean;
  seo?: SeoMeta | null;
  publishedAt?: string;
}

/** api::blog-category.blog-category */
export interface BlogCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  icon?: StrapiMedia | null;
}

/** api::blog-page.blog-page */
export interface BlogPage {
  isPageEnabled?: boolean;
  heroSection?: BlogHeroSection;
  listingSection?: BlogListingSection;
  featuredPosts?: Article[];
  seo?: SeoMeta | null;
}

/** api::feature.feature */
export interface Feature {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  icon?: StrapiMedia | null;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::benefit.benefit */
export interface Benefit {
  id: number;
  documentId: string;
  title: string;
  description: string;
  icon?: StrapiMedia | null;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::video.video */
export interface Video {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: StrapiMedia | null;
  sortOrder?: number;
  isActive?: boolean;
}

/** pricing.plan-feature */
export interface PricingPlanFeature {
  included?: boolean;
  note?: string;
  feature?: PricingFeature | null;
}

/** api::pricing-feature.pricing-feature */
export interface PricingFeature {
  id: number;
  documentId: string;
  name: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::pricing-plan.pricing-plan */
export interface PricingPlan {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  price: string;
  period?: string;
  ctaText?: string;
  ctaUrl?: string;
  icon?: StrapiMedia | null;
  isPopular?: boolean;
  features?: PricingPlanFeature[];
  sortOrder?: number;
  isActive?: boolean;
  publishedAt?: string;
}

/** api::homepage.homepage */
export interface Homepage {
  isPageEnabled?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  heroCta2Text?: string;
  heroCta2Url?: string;
  heroBackground?: StrapiMedia | null;
  heroStats?: StatItem[];
  featuresTitle?: string;
  featuresSubtitle?: string;
  features?: Feature[];
  productsTitle?: string;
  productsSubtitle?: string;
  products?: ProductPage[];
  benefitsTitle?: string;
  benefitsSubtitle?: string;
  benefits?: Benefit[];
  videoTitle?: string;
  videoSubtitle?: string;
  video?: Video | null;
  testimonialTitle?: string;
  testimonialSubtitle?: string;
  testimonials?: Testimonial[];
  blogTitle?: string;
  blogSubtitle?: string;
  pricingTitle?: string;
  pricingSubtitle?: string;
  pricingPlans?: PricingPlan[];
  seo?: SeoMeta | null;
}

/** shared.page-section-item */
export interface PageSectionItem {
  title: string;
  content?: unknown;
  image?: StrapiMedia | null;
  sortOrder?: number;
  isActive?: boolean;
}

/** downloads.release-change */
export interface ReleaseChange {
  text: string;
  sortOrder?: number;
}

/** api::download-item.download-item */
export interface DownloadItem {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  file?: StrapiMedia | null;
  previewUrl?: string;
  fileSize?: string;
  releaseDate?: string;
  sortOrder?: number;
  isActive?: boolean;
  publishedAt?: string;
}

/** api::software-release.software-release */
export interface SoftwareRelease {
  id: number;
  documentId: string;
  name: string;
  version: string;
  releaseDate: string;
  summary?: string;
  changes?: ReleaseChange[];
  downloadFile?: StrapiMedia | null;
  downloadUrl?: string;
  isLatest?: boolean;
  sortOrder?: number;
  isActive?: boolean;
  publishedAt?: string;
}

/** api::downloads-page.downloads-page */
export interface DownloadsPage {
  isPageEnabled?: boolean;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  documentsTitle?: string;
  documents?: DownloadItem[];
  latestVersion?: SoftwareRelease | null;
  releaseNotes?: SoftwareRelease[];
  seo?: SeoMeta | null;
}

/** api::brand.brand */
export interface Brand {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  logo?: StrapiMedia | null;
  description?: string;
  products?: Product[];
  seo?: SeoMeta | null;
}

/** api::category.category */
export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  image?: StrapiMedia | null;
  products?: Product[];
  articles?: Article[];
  seo?: SeoMeta | null;
}

/** api::contact-page.contact-page */
export interface ContactPage {
  isPageEnabled?: boolean;
  title: string;
  subtitle?: string;
  featuredImage?: StrapiMedia | null;
  content?: string;
  seo?: SeoMeta | null;
}

/** api::cookie-category.cookie-category */
export interface CookieCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
  isRequired?: boolean;
  isDefaultEnabled?: boolean;
  cookies?: CookieEntry[] | null;
  privacyPolicyUrl?: string;
}

export interface CookieEntry {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  type: string;
}

/** cookie.policy-category */
export interface CookiePolicyCategory {
  title?: string;
  description?: string;
  icon?: "shield" | "settings" | "analytics" | "marketing";
  accent?: "red" | "orange";
  sortOrder?: number;
  isActive?: boolean;
}

/** api::cookie-policy.cookie-policy */
export interface CookiePolicy {
  isPageEnabled?: boolean;
  title?: string;
  description?: string;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  featuredImage?: StrapiMedia | null;
  content?: string;
  lastUpdated?: string;
  categoriesBadge?: string;
  categoriesTitle?: string;
  categoriesDescription?: string;
  categories?: CookiePolicyCategory[];
  sections?: PolicySection[];
  manageTitle?: string;
  manageDescription?: string;
  manageButtonLabel?: string;
  backToTopLabel?: string;
  seo?: SeoMeta | null;
}

/** api::faq.faq */
export interface Faq {
  id: number;
  documentId: string;
  question: string;
  answer: string;
  category?: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::help-item.help-item */
export interface HelpItem {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  linkText?: string;
  url: string;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::footer-setting.footer-setting */
export interface FooterSetting {
  ctaBadge?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaUrl?: string;
  stats?: StatItem[];
  companyDescription?: string;
  footerSections?: FooterSection[];
  legalLinks?: LegalLink[];
  copyright?: string;
}

/** api::free-trial.free-trial */
export interface FreeTrial {
  isPageEnabled?: boolean;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  trustItems?: TrustItem[];
  formBadge?: string;
  formTitle?: string;
  formDescription?: string;
  formLabels?: FormLabel | null;
  ctaTitle?: string;
  ctaSubtitle?: string;
  featuresTitle?: string;
  features?: TrialFeature[];
  testimonialsTitle?: string;
  testimonials?: Testimonial[];
  seo?: SeoMeta | null;
}

/** api::global-setting.global-setting */
export interface GlobalSetting {
  siteName?: string;
  siteLogo?: StrapiMedia | null;
  contactInfo?: ContactInfo | null;
  stats?: StatItem[];
  seoConfig?: SeoConfig | null;
}

/** api::cookie-setting.cookie-setting */
export interface CookieSetting {
  settings?: CookieConsentSettings | null;
}

/** api::contact-floating.contact-floating */
export interface ContactFloating {
  isEnabled?: boolean;
  buttonLabel?: string;
  panelTitle?: string;
  panelDescription?: string;
  closeLabel?: string;
  actions?: ContactAction[];
}

/** api::navigation.navigation */
export interface Navigation {
  name: string;
  headerItems?: NavItem[];
  footerSections?: NavigationFooterSection[];
  footerLabels?: FooterLabels | null;
  productNames?: ProductName[];
  buttonLabels?: ButtonLabels | null;
}

/** api::partner.partner */
export interface Partner {
  id: number;
  documentId: string;
  name: string;
  websiteUrl?: string;
  description?: string;
  logo?: StrapiMedia | null;
  aboutPage?: AboutPage | null;
  sortOrder?: number;
  isActive?: boolean;
}

/** api::pdpa-setting.pdpa-setting */
export interface PdpaSetting {
  companyName: string;
  dpoName?: string;
  dpoPosition?: string;
  dpoEmail?: string;
  dpoPhone?: string;
  contactInfo?: ContactInfo[];
  dataRetentionDays?: number;
  dataRetentionDescription?: string;
  rightsText?: string;
  thirdPartiesText?: string;
  consentBanner?: CookieConsentSettings | null;
  privacyPolicyUrl?: string;
  cookiePolicyUrl?: string;
  contactText?: string;
  appliesToProducts?: Product[];
  isActive?: boolean;
  seo?: SeoMeta | null;
}

/** api::privacy-policy.privacy-policy */
export interface PrivacyPolicy {
  isPageEnabled?: boolean;
  title?: string;
  description?: string;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  featuredImage?: StrapiMedia | null;
  content?: string;
  sections?: PolicySection[];
  policySections?: PolicySection[];
  effectiveDate?: string;
  lastUpdated?: string;
  tocTitle?: string;
  appliesToTitle?: string;
  appliesToProducts?: ProductPage[];
  legalContactTitle?: string;
  legalContactDescription?: string;
  legalContactInfo?: ContactInfo | null;
  relatedLinksTitle?: string;
  relatedLinks?: RelatedLink[];
  contactInfo?: ContactInfo[];
  backToTopLabel?: string;
  seo?: SeoMeta | null;
}

/** api::privacy-request.privacy-request */
export interface PrivacyRequest {
  isPageEnabled?: boolean;
  settings?: PdpaSettings | null;
  seo?: SeoMeta | null;
}

/** api::product.product */
export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price?: number;
  ribbonType: "wax" | "wax_resin" | "resin";
  sizes?: unknown;
  compatibility?: string;
  isFeatured?: boolean;
  images?: StrapiMedia[];
  brand?: Brand | null;
  categories?: Category[];
  privacyAppliedIn?: PrivacyPolicy[];
  pdpaAppliedIn?: PdpaSetting[];
  seo?: SeoMeta | null;
  publishedAt?: string;
}

/** api::product-page.product-page */
export interface ProductPage {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  pageTitle?: string;
  pageDescription?: string;
  shortDesc?: string;
  thumbnail?: StrapiMedia | null;
  cardFeatures?: string[] | Record<string, unknown> | null;
  platform?: "windows_pc" | "handheld_mobile" | "web" | "both";
  sortOrder?: number;
  isActive?: boolean;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  heroCtaUrl?: string;
  heroBackground?: StrapiMedia | null;
  sections?: PageSectionItem[];
  featuresTitle?: string;
  featuresSubtitle?: string;
  features?: unknown;
  benefitsTitle?: string;
  benefits?: unknown;
  problems?: unknown;
  pcFeatures?: unknown;
  mobileFeatures?: unknown;
  testimonialsTitle?: string;
  testimonials?: Testimonial[];
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonUrl?: string;
  contactInfo?: ContactInfo | null;
  seo?: SeoMeta | null;
  publishedAt?: string;
}

/** api::products-services.products-services */
export interface ProductsServices {
  isPageEnabled?: boolean;
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaUrl?: string;
  heroSecondaryCtaText?: string;
  heroStats?: StatItem[];
  productsBadge?: string;
  productsTitle?: string;
  productsSubtitle?: string;
  products?: ProductPage[];
  whyBadge?: string;
  whyTitle?: string;
  whySubtitle?: string;
  whyStats?: StatItem[];
  seo?: SeoMeta | null;
}

/** api::team-member.team-member */
export interface TeamMember {
  id: number;
  documentId: string;
  name: string;
  position?: string;
  bio?: string;
  avatar?: StrapiMedia | null;
  photo?: StrapiMedia | null;
  aboutPage?: AboutPage | null;
  aboutPages?: AboutPage[];
  sortOrder?: number;
  isActive?: boolean;
}

/** api::terms-service.terms-service */
export interface TermsOfService {
  isPageEnabled?: boolean;
  title?: string;
  description?: string;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  featuredImage?: StrapiMedia | null;
  content?: string;
  sections?: PolicySection[];
  policySections?: PolicySection[];
  effectiveDate?: string;
  lastUpdated?: string;
  tocTitle?: string;
  appliesToTitle?: string;
  appliesToProducts?: ProductPage[];
  legalContactTitle?: string;
  legalContactDescription?: string;
  legalContactInfo?: ContactInfo | null;
  relatedLinksTitle?: string;
  relatedLinks?: RelatedLink[];
  contactInfo?: ContactInfo[];
  backToTopLabel?: string;
  seo?: SeoMeta | null;
}

/** api::testimonial.testimonial */
export interface Testimonial {
  id: number;
  documentId: string;
  name?: string;
  customerName?: string;
  position?: string;
  company?: string;
  quote: string;
  rating?: number;
  avatar?: StrapiMedia | null;
  freeTrialPages?: FreeTrial[];
  sortOrder?: number;
  isActive?: boolean;
}

/** api::timeline-milestone.timeline-milestone */
export interface TimelineMilestone {
  id: number;
  documentId: string;
  title: string;
  milestoneDate?: string;
  year?: number;
  date?: string;
  description?: string;
  image?: StrapiMedia | null;
  aboutPage?: AboutPage | null;
  aboutPages?: AboutPage[];
  sortOrder?: number;
  isActive?: boolean;
}

/** api::support-page.support-page */
export interface SupportPage {
  isPageEnabled?: boolean;
  heroSection?: SupportHeroSection;
  statusCard?: SupportStatusCard;
  faqSection?: SupportFaqSection;
  faqs?: Faq[];
  helpCenterSection?: SupportHelpCenterSection;
  helpResources?: HelpItem[];
  contactSection?: SupportContactSection;
  contactSettings?: GlobalSetting | null;
  seo?: SeoMeta | null;
}

// ─── Fetch Engine ───────────────────────────────────────────────────

async function fetchAPI<T>(
  path: string,
  params: Record<string, string> = {},
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
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        throw new StrapiError(
          `Strapi API error: ${res.status} ${res.statusText}`,
          res.status,
          path,
        );
      }

      const data: T = await res.json();
      return data;
    } catch (err) {
      lastError = err as Error;

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

      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 300 * (attempt + 1)));
      }
    }
  }

  throw new StrapiError(
    `Failed to fetch ${path} after ${MAX_RETRIES + 1} attempts: ${lastError?.message || "Unknown error"}`,
    undefined,
    path,
  );
}

// ─── Public Fetch Helpers (integate-rule.md §2) ────────────────────

/**
 * Fetch a single type from Strapi.
 * Use for: about-page, contact-page, free-trial, privacy-policy, etc.
 */
export async function fetchStrapiSingle<T>(
  slug: string,
  options: { locale?: Locale; populate?: string[] } = {},
): Promise<StrapiSingleResponse<T>> {
  const { locale = "th", populate = ["*"] } = options;
  return fetchAPI<StrapiSingleResponse<T>>(`/${slug}`, {
    locale,
    populate: populate.join(","),
  });
}

/**
 * Fetch a collection type from Strapi.
 * Use for: products, articles, categories, brands, etc.
 */
export async function fetchStrapiCollection<T>(
  slug: string,
  options: {
    locale?: Locale;
    populate?: string[];
    sort?: string;
    filters?: Record<string, string>;
    pagination?: { page: number; pageSize: number };
  } = {},
): Promise<StrapiResponse<T[]>> {
  const {
    locale = "th",
    populate = ["*"],
    sort,
    filters,
    pagination,
  } = options;

  const params: Record<string, string> = {
    locale,
    populate: populate.join(","),
  };

  if (sort) params.sort = sort;
  if (pagination) {
    params["pagination[page]"] = String(pagination.page);
    params["pagination[pageSize]"] = String(pagination.pageSize);
  }
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      params[key] = value;
    });
  }

  return fetchAPI<StrapiResponse<T[]>>(`/${slug}`, params);
}

// ─── Media Helpers (integate-rule.md §9) ────────────────────────────

/**
 * Get absolute URL for a Strapi media asset.
 * Supports optional format (small, medium, thumbnail, etc.)
 */
export function getStrapiAbsoluteImageUrl(
  media: StrapiMedia | null | undefined,
  format?: string,
): string {
  if (!media) return "";

  // Try requested format first
  if (format && media.formats?.[format]) {
    const fmtUrl = media.formats[format].url;
    if (fmtUrl.startsWith("http")) return fmtUrl;
    return `${STRAPI_URL}${fmtUrl}`;
  }

  // Fall back to original URL
  if (media.url.startsWith("http")) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

/**
 * Get absolute URL for a Strapi media asset (alias for backward compat).
 */
export function getStrapiMedia(
  url: string | null | undefined,
): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

// ─── URL Normalization (integate-rule.md §5) ────────────────────────

/**
 * Normalize internal CMS URLs to the current locale.
 * Handles: /privacy/, /th/privacy/, /en/privacy/, privacy/
 */
export function normalizeInternalUrl(
  url: string | undefined,
  homePrefix: string,
): string {
  if (!url) return "#";
  if (/^(https?:|mailto:|tel:|#)/.test(url)) return url;

  // Strip existing locale prefix
  const path = url.replace(/^\/(th|en)\//, "/");

  // Add current locale prefix
  if (path.startsWith("/")) {
    return `${homePrefix}${path.replace(/^\//, "")}`;
  }
  return path;
}

/**
 * Get the URL for a footer/link item, preferring relation over manual URL.
 * (integate-rule.md §8)
 */
export function getLinkUrl(
  link: { productPage?: { slug?: string } | null; url?: string },
  homePrefix: string,
): string {
  if (link.productPage?.slug) return `${homePrefix}${link.productPage.slug}/`;
  return normalizeInternalUrl(link.url, homePrefix);
}

// ─── List Helpers (integate-rule.md §7) ─────────────────────────────

/**
 * Filter active items and sort by sortOrder.
 * Works for any component with sortOrder and isActive fields.
 */
export function filterAndSort<T extends { sortOrder?: number; isActive?: boolean }>(
  items: T[] | undefined,
): T[] {
  if (!items) return [];
  return items
    .filter((item) => item.isActive !== false)
    .slice()
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

// ─── API Result Wrapper ─────────────────────────────────────────────

export type ApiResult<T> =
  | { ok: true; data: T; isOffline: false }
  | { ok: false; data: T; isOffline: boolean; error: StrapiError };

/**
 * Safe fetch wrapper that never throws.
 * Returns ApiResult with fallback data on error.
 */
export async function safeFetch<T>(
  fn: () => Promise<T>,
  fallback: T,
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
