# CMS Schema Export

Generated from Strapi schema JSON files on 2026-08-26.

## Summary

- Content types: 31
- Components: 32
- Source paths: `src/api/**/content-types/**/schema.json`, `src/components/**/*.json`

## Content Types

### Page - About Us

- UID: `api::about-us.about-us`
- Kind: `singleType`
- Collection: `about_u_s`
- API names: `about-us` / `about-us-pages`
- Description: About Us page content: company intro, mission, vision, team, partners, timeline
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/about-us/content-types/about-us/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `seo` | component: shared.seo-meta |  |  |  |  |
| `pageTitle` | string | yes |  |  |  |
| `pageDescription` | text | yes |  |  |  |
| `companyIntro` | blocks | yes |  |  |  |
| `mission` | blocks | yes |  |  |  |
| `vision` | blocks | yes |  |  |  |
| `teamTitle` | string | yes |  |  |  |
| `teamSubtitle` | text | yes |  |  |  |
| `teamMembers` | relation: manyToMany -> api::team-member.team-member |  |  |  |  |
| `partnerTitle` | string | yes |  |  |  |
| `partnerSubtitle` | text | yes |  |  |  |
| `partners` | relation: manyToMany -> api::partner.partner |  |  |  |  |
| `timelineTitle` | string | yes |  |  |  |
| `timelineSubtitle` | text | yes |  |  |  |
| `milestones` | relation: manyToMany -> api::timeline-milestone.timeline-milestone |  |  |  |  |
| `contactInfo` | component: shared.contact-info |  |  |  |  |

### Benefit

- UID: `api::benefit.benefit`
- Kind: `collectionType`
- Collection: `benefits`
- API names: `benefit` / `benefits`
- Description: Benefits for the Why Choose Us section
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/benefit/content-types/benefit/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `description` | text | yes | yes |  |  |
| `icon` | media: images |  |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |

### Blog - Category

- UID: `api::blog-category.blog-category`
- Kind: `collectionType`
- Collection: `blog_categories`
- API names: `blog-category` / `blog-categories`
- Description: Categories for organizing blog posts
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/blog-category/content-types/blog-category/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | yes |  |  |
| `slug` | uid |  | yes |  |  |
| `description` | text | yes |  |  |  |
| `icon` | media: images |  |  |  |  |
| `blogPosts` | relation: oneToMany -> api::blog-post.blog-post |  |  |  |  |

### Blog - Post

- UID: `api::blog-post.blog-post`
- Kind: `collectionType`
- Collection: `blog_posts`
- API names: `blog-post` / `blog-posts`
- Description: Articles, news, and updates for the blog
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/blog-post/content-types/blog-post/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `seo` | component: shared.seo-meta |  |  |  |  |
| `title` | string | yes | yes |  |  |
| `slug` | uid |  | yes |  |  |
| `excerpt` | text | yes |  |  |  |
| `content` | blocks | yes |  |  |  |
| `featuredImage` | media: images |  |  |  |  |
| `category` | relation: manyToOne -> api::blog-category.blog-category |  |  |  |  |
| `author` | string |  |  |  |  |
| `tags` | json |  |  |  |  |
| `seoTitle` | string | yes |  |  |  |
| `seoDescription` | text | yes |  |  |  |

### Site - Contact Floating

- UID: `api::contact-floating.contact-floating`
- Kind: `singleType`
- Collection: `contact_floatings`
- API names: `contact-floating` / `contact-floatings`
- Description: Floating contact widget settings
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/contact-floating/content-types/contact-floating/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `isEnabled` | boolean |  |  | `true` |  |
| `buttonLabel` | string | yes |  |  |  |
| `panelTitle` | string | yes |  |  |  |
| `panelDescription` | text | yes |  |  |  |
| `closeLabel` | string | yes |  |  |  |
| `actions` | component: contact-floating.contact-action[] |  |  |  |  |

### Page - Cookie Policy

- UID: `api::cookie-policy.cookie-policy`
- Kind: `singleType`
- Collection: `cookie_policies`
- API names: `cookie-policy` / `cookie-policies`
- Description: Cookie Policy page content, category cards, CTA labels, and SEO
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/cookie-policy/content-types/cookie-policy/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `heroBadge` | string | yes |  |  |  |
| `heroTitle` | string | yes |  |  |  |
| `heroSubtitle` | text | yes |  |  |  |
| `lastUpdated` | string | yes |  |  |  |
| `categoriesBadge` | string | yes |  |  |  |
| `categoriesTitle` | string | yes |  |  |  |
| `categoriesDescription` | text | yes |  |  |  |
| `categories` | component: cookie.policy-category[] |  |  |  |  |
| `sections` | component: privacy.policy-section[] |  |  |  |  |
| `manageTitle` | string | yes |  |  |  |
| `manageDescription` | text | yes |  |  |  |
| `manageButtonLabel` | string | yes |  |  |  |
| `backToTopLabel` | string | yes |  |  |  |
| `seo` | component: shared.seo-meta |  |  |  |  |

### Site - Cookie Settings

- UID: `api::cookie-setting.cookie-setting`
- Kind: `singleType`
- Collection: `cookie_settings`
- API names: `cookie-setting` / `cookie-settings`
- Description: Cookie consent banner labels and preference copy
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/cookie-setting/content-types/cookie-setting/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `settings` | component: shared.cookie-consent-settings |  |  |  |  |

### Download Item

- UID: `api::download-item.download-item`
- Kind: `collectionType`
- Collection: `download_items`
- API names: `download-item` / `download-items`
- Description: A downloadable document, installer, or resource
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/download-item/content-types/download-item/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `description` | text | yes |  |  |  |
| `file` | media: files |  |  |  |  |
| `previewUrl` | string |  |  |  |  |
| `fileSize` | string |  |  |  |  |
| `releaseDate` | date |  |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |

### Page - Downloads

- UID: `api::downloads-page.downloads-page`
- Kind: `singleType`
- Collection: `downloads_pages`
- API names: `downloads-page` / `downloads-pages`
- Description: CMS settings and selected downloads for the Download Center
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/downloads-page/content-types/downloads-page/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `heroBadge` | string | yes |  |  |  |
| `heroTitle` | string | yes |  |  |  |
| `heroSubtitle` | text | yes |  |  |  |
| `documentsTitle` | string | yes |  |  |  |
| `documents` | relation: manyToMany -> api::download-item.download-item |  |  |  |  |
| `latestVersion` | relation: oneToOne -> api::software-release.software-release |  |  |  |  |
| `releaseNotes` | relation: manyToMany -> api::software-release.software-release |  |  |  |  |
| `seo` | component: shared.seo-meta |  |  |  |  |

### FAQ

- UID: `api::faq.faq`
- Kind: `collectionType`
- Collection: `faqs`
- API names: `faq` / `faqs`
- Description: Frequently Asked Questions
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/faq/content-types/faq/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `question` | string | yes | yes |  |  |
| `answer` | text | yes | yes |  |  |
| `category` | string | yes |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |

### Feature

- UID: `api::feature.feature`
- Kind: `collectionType`
- Collection: `features`
- API names: `feature` / `features`
- Description: Key features of iStock Express
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/feature/content-types/feature/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `description` | text | yes |  |  |  |
| `icon` | media: images |  |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |

### Site - Footer Settings

- UID: `api::footer-setting.footer-setting`
- Kind: `singleType`
- Collection: `footer_settings`
- API names: `footer-setting` / `footer-settings`
- Description: Footer call-to-action, statistics, company text, legal links, and copyright
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/footer-setting/content-types/footer-setting/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `ctaBadge` | string | yes |  |  |  |
| `ctaTitle` | string | yes |  |  |  |
| `ctaDescription` | text | yes |  |  |  |
| `primaryCtaLabel` | string | yes |  |  |  |
| `primaryCtaUrl` | string |  |  |  |  |
| `secondaryCtaLabel` | string | yes |  |  |  |
| `secondaryCtaUrl` | string |  |  |  |  |
| `stats` | component: shared.stat-item[] |  |  |  |  |
| `companyDescription` | text | yes |  |  |  |
| `footerSections` | component: footer.footer-section[] |  |  |  |  |
| `legalLinks` | component: footer.legal-link[] |  |  |  |  |
| `copyright` | text | yes |  |  |  |

### Page - Free Trial

- UID: `api::free-trial.free-trial`
- Kind: `singleType`
- Collection: `free_trials`
- API names: `free-trial` / `free-trials`
- Description: Free trial page settings and form configuration
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/free-trial/content-types/free-trial/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `heroBadge` | string | yes |  |  |  |
| `heroTitle` | string | yes |  |  |  |
| `heroSubtitle` | text | yes |  |  |  |
| `trustItems` | component: free-trial.trust-item[] |  |  |  |  |
| `formBadge` | string | yes |  |  |  |
| `formTitle` | string | yes |  |  |  |
| `formDescription` | text | yes |  |  |  |
| `formLabels` | component: free-trial.form-labels |  |  |  |  |
| `ctaTitle` | string | yes |  |  |  |
| `ctaSubtitle` | text | yes |  |  |  |
| `featuresTitle` | string | yes |  |  |  |
| `features` | component: free-trial.trial-feature[] |  |  |  |  |
| `testimonialsTitle` | string | yes |  |  |  |
| `testimonials` | relation: manyToMany -> api::testimonial.testimonial |  |  |  |  |
| `seo` | component: shared.seo-meta |  |  |  |  |

### Site - Global Settings

- UID: `api::global-setting.global-setting`
- Kind: `singleType`
- Collection: `global_settings`
- API names: `global-setting` / `global-settings`
- Description: Site-wide settings used by the website header, footer, contact blocks, and SEO defaults
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/global-setting/content-types/global-setting/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `siteName` | string | yes |  |  |  |
| `siteLogo` | media: images |  |  |  |  |
| `contactInfo` | component: shared.contact-info |  |  |  |  |
| `stats` | component: shared.stat-item[] |  |  |  |  |
| `seoConfig` | component: shared.seo-config |  |  |  |  |
| `headScript` | text |  |  |  |  |
| `bodyScript` | text |  |  |  |  |
| `footerScript` | text |  |  |  |  |

### Help Item

- UID: `api::help-item.help-item`
- Kind: `collectionType`
- Collection: `help_items`
- API names: `help-item` / `help-items`
- Description: Selectable Help Center card
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/help-item/content-types/help-item/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `description` | text | yes |  |  |  |
| `linkText` | string | yes |  |  |  |
| `url` | string |  | yes |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |

### Page - Homepage

- UID: `api::homepage.homepage`
- Kind: `singleType`
- Collection: `homepages`
- API names: `homepage` / `homepages`
- Description: Homepage content: hero, features, products, benefits, video, testimonials, pricing, blog preview
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/homepage/content-types/homepage/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `seo` | component: shared.seo-meta |  |  |  |  |
| `heroTitle` | string | yes |  |  |  |
| `heroSubtitle` | text | yes |  |  |  |
| `heroDescription` | text | yes |  |  |  |
| `heroCtaText` | string | yes |  |  |  |
| `heroCtaUrl` | string |  |  |  |  |
| `heroCta2Text` | string | yes |  |  |  |
| `heroCta2Url` | string |  |  |  |  |
| `heroBackground` | media: images, videos |  |  |  |  |
| `heroStats` | component: shared.stat-item[] |  |  |  |  |
| `featuresTitle` | string | yes |  |  |  |
| `featuresSubtitle` | text | yes |  |  |  |
| `features` | relation: manyToMany -> api::feature.feature |  |  |  |  |
| `productsTitle` | string | yes |  |  |  |
| `productsSubtitle` | text | yes |  |  |  |
| `products` | relation: manyToMany -> api::product-page.product-page |  |  |  |  |
| `benefitsTitle` | string | yes |  |  |  |
| `benefitsSubtitle` | text | yes |  |  |  |
| `benefits` | relation: manyToMany -> api::benefit.benefit |  |  |  |  |
| `videoTitle` | string | yes |  |  |  |
| `videoSubtitle` | text | yes |  |  |  |
| `video` | relation: manyToOne -> api::video.video |  |  |  |  |
| `testimonialTitle` | string | yes |  |  |  |
| `testimonialSubtitle` | text | yes |  |  |  |
| `testimonials` | relation: manyToMany -> api::testimonial.testimonial |  |  |  |  |
| `blogTitle` | string | yes |  |  |  |
| `blogSubtitle` | text | yes |  |  |  |
| `pricingTitle` | string | yes |  |  |  |
| `pricingSubtitle` | text | yes |  |  |  |
| `pricingPlans` | relation: manyToMany -> api::pricing-plan.pricing-plan |  |  |  |  |

### Site - Navigation

- UID: `api::navigation.navigation`
- Kind: `singleType`
- Collection: `navigations`
- API names: `navigation` / `navigations`
- Description: Site navigation menus (header, footer, etc.)
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/navigation/content-types/navigation/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | yes |  |  |
| `headerItems` | component: navigation.nav-item[] |  |  |  |  |
| `footerSections` | component: navigation.footer-section[] |  |  |  |  |
| `footerLabels` | component: shared.footer-labels |  |  |  |  |
| `productNames` | component: navigation.product-name[] |  |  |  |  |
| `buttonLabels` | component: shared.button-labels |  |  |  |  |

### Partner

- UID: `api::partner.partner`
- Kind: `collectionType`
- Collection: `partners`
- API names: `partner` / `partners`
- Description: Business partners and client logos
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/partner/content-types/partner/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | yes |  |  |
| `logo` | media: images |  |  |  |  |
| `websiteUrl` | string |  |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |
| `aboutPages` | relation: manyToMany -> api::about-us.about-us |  |  |  |  |

### Pricing Feature

- UID: `api::pricing-feature.pricing-feature`
- Kind: `collectionType`
- Collection: `pricing_features`
- API names: `pricing-feature` / `pricing-features`
- Description: Individual features for the pricing comparison table
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/pricing-feature/content-types/pricing-feature/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | yes |  |  |
| `description` | text | yes |  |  |  |
| `category` | string | yes |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |

### Pricing Plan

- UID: `api::pricing-plan.pricing-plan`
- Kind: `collectionType`
- Collection: `pricing_plans`
- API names: `pricing-plan` / `pricing-plans`
- Description: Pricing tiers and plans for the product
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/pricing-plan/content-types/pricing-plan/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | yes |  |  |
| `slug` | uid |  | yes |  |  |
| `description` | text | yes |  |  |  |
| `price` | string | yes | yes |  |  |
| `period` | string | yes |  |  |  |
| `ctaText` | string | yes |  |  |  |
| `ctaUrl` | string |  |  |  |  |
| `icon` | media: images |  |  |  |  |
| `isPopular` | boolean |  |  | `false` |  |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |
| `features` | component: pricing.plan-feature[] |  |  |  |  |

### Page - Privacy Request

- UID: `api::privacy-request.privacy-request`
- Kind: `singleType`
- Collection: `privacy_requests`
- API names: `privacy-request` / `privacy-requests`
- Description: Personal data request page labels, messages, contact information, and SEO
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/privacy-request/content-types/privacy-request/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `settings` | component: shared.pdpa-settings |  |  |  |  |
| `seo` | component: shared.seo-meta |  |  |  |  |

### Page - Privacy Settings

- UID: `api::privacy-setting.privacy-setting`
- Kind: `singleType`
- Collection: `privacy_settings`
- API names: `privacy-setting` / `privacy-settings`
- Description: Privacy Policy page content and SEO
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/privacy-setting/content-types/privacy-setting/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `heroBadge` | string | yes |  |  |  |
| `heroTitle` | string | yes |  |  |  |
| `heroSubtitle` | text | yes |  |  |  |
| `lastUpdated` | string | yes |  |  |  |
| `effectiveDate` | date |  |  |  |  |
| `tocTitle` | string | yes |  |  |  |
| `appliesToTitle` | string | yes |  |  |  |
| `appliesToProducts` | relation: manyToMany -> api::product-page.product-page |  |  |  |  |
| `sections` | component: privacy.policy-section[] |  |  |  |  |
| `legalContactTitle` | string | yes |  |  |  |
| `legalContactDescription` | text | yes |  |  |  |
| `legalContactInfo` | component: shared.contact-info |  |  |  |  |
| `relatedLinksTitle` | string | yes |  |  |  |
| `relatedLinks` | component: privacy.related-link[] |  |  |  |  |
| `backToTopLabel` | string | yes |  |  |  |
| `seo` | component: shared.seo-meta |  |  |  |  |

### Product Detail

- UID: `api::product-page.product-page`
- Kind: `collectionType`
- Collection: `product_pages`
- API names: `product-page` / `product-pages`
- Description: SEO-managed content for every public product URL
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/product-page/content-types/product-page/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | yes |  |  |
| `slug` | uid | yes | yes |  |  |
| `seo` | component: shared.seo-meta |  |  |  |  |
| `pageTitle` | string | yes |  |  |  |
| `pageDescription` | text | yes |  |  |  |
| `shortDesc` | text | yes |  |  |  |
| `thumbnail` | media: images |  |  |  |  |
| `cardFeatures` | json | yes |  |  |  |
| `platform` | enum: windows_pc, handheld_mobile, web, both |  |  | `both` |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |
| `heroTitle` | string | yes |  |  |  |
| `heroSubtitle` | text | yes |  |  |  |
| `heroCtaText` | string | yes |  |  |  |
| `heroCtaUrl` | string |  |  |  |  |
| `heroBackground` | media: images, videos |  |  |  |  |
| `sections` | component: shared.page-section-item[] |  |  |  |  |
| `featuresTitle` | string | yes |  |  |  |
| `featuresSubtitle` | text | yes |  |  |  |
| `features` | json | yes |  |  |  |
| `benefitsTitle` | string | yes |  |  |  |
| `benefits` | json | yes |  |  |  |
| `problems` | json | yes |  |  |  |
| `pcFeatures` | json | yes |  |  |  |
| `mobileFeatures` | json | yes |  |  |  |
| `testimonialsTitle` | string | yes |  |  |  |
| `testimonials` | relation: manyToMany -> api::testimonial.testimonial |  |  |  |  |
| `ctaTitle` | string | yes |  |  |  |
| `ctaSubtitle` | text | yes |  |  |  |
| `ctaButtonText` | string | yes |  |  |  |
| `ctaButtonUrl` | string |  |  |  |  |
| `contactInfo` | component: shared.contact-info |  |  |  |  |

### Page - Products & Services

- UID: `api::products-services.products-services`
- Kind: `singleType`
- Collection: `products_services_pages`
- API names: `products-services` / `products-services-pages`
- Description: CMS settings for the Products & Services landing page
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/products-services/content-types/products-services/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `heroBadge` | string | yes |  |  |  |
| `heroTitle` | string | yes |  |  |  |
| `heroDescription` | text | yes |  |  |  |
| `heroPrimaryCtaText` | string | yes |  |  |  |
| `heroPrimaryCtaUrl` | string |  |  |  |  |
| `heroSecondaryCtaText` | string | yes |  |  |  |
| `heroStats` | component: shared.stat-item[] |  |  |  |  |
| `productsBadge` | string | yes |  |  |  |
| `productsTitle` | string | yes |  |  |  |
| `productsSubtitle` | text | yes |  |  |  |
| `products` | relation: manyToMany -> api::product-page.product-page |  |  |  |  |
| `whyBadge` | string | yes |  |  |  |
| `whyTitle` | string | yes |  |  |  |
| `whySubtitle` | text | yes |  |  |  |
| `whyStats` | component: shared.stat-item[] |  |  |  |  |
| `seo` | component: shared.seo-meta |  |  |  |  |

### Software Release

- UID: `api::software-release.software-release`
- Kind: `collectionType`
- Collection: `software_releases`
- API names: `software-release` / `software-releases`
- Description: Version releases and their change notes
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/software-release/content-types/software-release/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | yes |  |  |
| `version` | string |  | yes |  |  |
| `releaseDate` | date |  | yes |  |  |
| `summary` | text | yes |  |  |  |
| `changes` | component: downloads.release-change[] |  |  |  |  |
| `downloadFile` | media: files |  |  |  |  |
| `downloadUrl` | string |  |  |  |  |
| `isLatest` | boolean |  |  | `false` |  |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |

### Page - Support

- UID: `api::support-page.support-page`
- Kind: `singleType`
- Collection: `support_pages`
- API names: `support-page` / `support-pages`
- Description: Customer support landing page with hero, FAQ, help resources, contact information, and SEO
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/support-page/content-types/support-page/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `heroSection` | component: support.hero-section | yes |  |  |  |
| `statusCard` | component: support.status-card | yes |  |  |  |
| `faqSection` | component: support.faq-section | yes |  |  |  |
| `faqs` | relation: manyToMany -> api::faq.faq |  |  |  |  |
| `helpCenterSection` | component: support.help-center-section | yes |  |  |  |
| `helpResources` | relation: manyToMany -> api::help-item.help-item |  |  |  |  |
| `contactSection` | component: support.contact-section | yes |  |  |  |
| `contactSettings` | relation: oneToOne -> api::global-setting.global-setting |  |  |  |  |
| `seo` | component: shared.seo-meta | yes |  |  |  |

### Team Member

- UID: `api::team-member.team-member`
- Kind: `collectionType`
- Collection: `team_members`
- API names: `team-member` / `team-members`
- Description: Company team members and staff
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/team-member/content-types/team-member/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string |  | yes |  |  |
| `position` | string | yes | yes |  |  |
| `bio` | text | yes |  |  |  |
| `photo` | media: images |  |  |  |  |
| `socialLinks` | json |  |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |
| `aboutPages` | relation: manyToMany -> api::about-us.about-us |  |  |  |  |

### Page - Terms of Service

- UID: `api::terms-service.terms-service`
- Kind: `singleType`
- Collection: `terms_services`
- API names: `terms-service` / `terms-services`
- Description: Terms of Service page content, product relations, and SEO
- Draft and publish: yes
- Localized content type: yes
- Schema file: `src/api/terms-service/content-types/terms-service/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `heroBadge` | string | yes |  |  |  |
| `heroTitle` | string | yes |  |  |  |
| `heroSubtitle` | text | yes |  |  |  |
| `lastUpdated` | string | yes |  |  |  |
| `effectiveDate` | date |  |  |  |  |
| `tocTitle` | string | yes |  |  |  |
| `appliesToTitle` | string | yes |  |  |  |
| `appliesToProducts` | relation: manyToMany -> api::product-page.product-page |  |  |  |  |
| `sections` | component: privacy.policy-section[] |  |  |  |  |
| `legalContactTitle` | string | yes |  |  |  |
| `legalContactDescription` | text | yes |  |  |  |
| `legalContactInfo` | component: shared.contact-info |  |  |  |  |
| `relatedLinksTitle` | string | yes |  |  |  |
| `relatedLinks` | component: privacy.related-link[] |  |  |  |  |
| `backToTopLabel` | string | yes |  |  |  |
| `seo` | component: shared.seo-meta |  |  |  |  |

### Testimonial

- UID: `api::testimonial.testimonial`
- Kind: `collectionType`
- Collection: `testimonials`
- API names: `testimonial` / `testimonials`
- Description: Customer testimonials and reviews
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/testimonial/content-types/testimonial/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `customerName` | string |  | yes |  |  |
| `position` | string | yes |  |  |  |
| `company` | string | yes |  |  |  |
| `quote` | text | yes | yes |  |  |
| `avatar` | media: images |  |  |  |  |
| `rating` | integer |  |  |  | min 1, max 5 |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |

### Timeline Milestone

- UID: `api::timeline-milestone.timeline-milestone`
- Kind: `collectionType`
- Collection: `timeline_milestones`
- API names: `timeline-milestone` / `timeline-milestones`
- Description: Company history timeline entries
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/timeline-milestone/content-types/timeline-milestone/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `year` | integer |  | yes |  |  |
| `title` | string | yes | yes |  |  |
| `description` | text | yes | yes |  |  |
| `date` | date |  |  |  |  |
| `image` | media: images |  |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `aboutPages` | relation: manyToMany -> api::about-us.about-us |  |  |  |  |

### Video

- UID: `api::video.video`
- Kind: `collectionType`
- Collection: `videos`
- API names: `video` / `videos`
- Description: Product demo and tutorial videos
- Draft and publish: no
- Localized content type: yes
- Schema file: `src/api/video/content-types/video/schema.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `description` | text | yes |  |  |  |
| `videoUrl` | string |  | yes |  |  |
| `thumbnail` | media: images |  |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |

## Components

### contact-floating.contact-action

- Display name: Contact Action
- Icon: `phone`
- Collection: `components_contact_floating_contact_actions`
- Localized component: no
- Schema file: `src/components/contact-floating/contact-action.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `type` | enum: phone, line, email, facebook, map, custom |  | yes | `custom` |  |
| `label` | string | yes | yes |  |  |
| `description` | string | yes |  |  |  |
| `url` | string |  | yes |  |  |
| `ariaLabel` | string | yes |  |  |  |
| `openInNewTab` | boolean |  |  | `false` |  |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |

### cookie.policy-category

- Display name: Cookie Policy Category
- Icon: `cookie`
- Description: Cookie category card for the Cookie Policy page
- Collection: `components_cookie_policy_categories`
- Localized component: yes
- Schema file: `src/components/cookie/policy-category.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes |  |  |  |
| `description` | text | yes |  |  |  |
| `icon` | enum: shield, settings, analytics, marketing |  |  | `shield` |  |
| `accent` | enum: red, orange |  |  | `red` |  |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |

### downloads.release-change

- Display name: Release Change
- Icon: `check`
- Collection: `components_downloads_release_changes`
- Localized component: yes
- Schema file: `src/components/downloads/release-change.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `text` | string | yes | yes |  |  |
| `sortOrder` | integer |  |  | `0` |  |

### footer.footer-link

- Display name: Footer Link
- Icon: `link`
- Description: A footer navigation link. Use either URL or Product Page relation.
- Collection: `components_footer_footer_links`
- Localized component: yes
- Schema file: `src/components/footer/footer-link.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `label` | string | yes | yes |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |
| `productPage` | relation: manyToOne -> api::product-page.product-page |  |  |  |  |
| `url` | string |  |  |  |  |
| `target` | enum: _self, _blank |  |  | `_self` |  |

### footer.footer-section

- Display name: Footer Section
- Icon: `list`
- Description: A footer column with ordered links
- Collection: `components_footer_footer_sections`
- Localized component: yes
- Schema file: `src/components/footer/footer-section.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |
| `links` | component: footer.footer-link[] |  |  |  |  |

### footer.legal-link

- Display name: Legal Link
- Icon: `link`
- Collection: `components_footer_legal_links`
- Localized component: yes
- Schema file: `src/components/footer/legal-link.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `label` | string | yes | yes |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |
| `url` | string |  | yes |  |  |
| `target` | enum: _self, _blank |  |  | `_self` |  |

### free-trial.form-labels

- Display name: Form Labels
- Icon: `write`
- Collection: `components_free_trial_form_labels`
- Localized component: no
- Schema file: `src/components/free-trial/form-labels.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `fullNameLabel` | string | yes |  |  |  |
| `fullNamePlaceholder` | string | yes |  |  |  |
| `positionLabel` | string | yes |  |  |  |
| `positionPlaceholder` | string | yes |  |  |  |
| `emailLabel` | string | yes |  |  |  |
| `emailPlaceholder` | string | yes |  |  |  |
| `phoneLabel` | string | yes |  |  |  |
| `phonePlaceholder` | string | yes |  |  |  |
| `addressLabel` | string | yes |  |  |  |
| `addressPlaceholder` | string | yes |  |  |  |
| `companyLabel` | string | yes |  |  |  |
| `companyPlaceholder` | string | yes |  |  |  |
| `businessDetailsLabel` | string | yes |  |  |  |
| `businessDetailsPlaceholder` | string | yes |  |  |  |
| `privacyConsentPrefix` | string | yes |  |  |  |
| `privacyPolicyLabel` | string | yes |  |  |  |
| `privacyPolicyUrl` | string |  |  |  |  |
| `privacyConsentSuffix` | string | yes |  |  |  |
| `marketingConsentLabel` | string | yes |  |  |  |
| `marketingConsentDescription` | text | yes |  |  |  |
| `submitLabel` | string | yes |  |  |  |
| `successTitle` | string | yes |  |  |  |
| `successMessage` | text | yes |  |  |  |

### free-trial.trial-feature

- Display name: Trial Feature
- Icon: `star`
- Collection: `components_free_trial_trial_features`
- Localized component: no
- Schema file: `src/components/free-trial/trial-feature.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `description` | text | yes |  |  |  |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |

### free-trial.trust-item

- Display name: Trust Item
- Icon: `check`
- Collection: `components_free_trial_trust_items`
- Localized component: no
- Schema file: `src/components/free-trial/trust-item.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `label` | string | yes | yes |  |  |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |

### navigation.footer-section

- Display name: Footer Section
- Icon: `list`
- Description: A footer column grouping navigation links under a title
- Collection: `components_navigation_footer_sections`
- Localized component: yes
- Schema file: `src/components/navigation/footer-section.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `links` | component: navigation.nav-item[] |  |  |  |  |

### navigation.nav-child-item

- Display name: Nav Child Item
- Icon: `caretRight`
- Description: A second-level navigation link
- Collection: `components_navigation_nav_child_items`
- Localized component: yes
- Schema file: `src/components/navigation/nav-child-item.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `label` | string | yes | yes |  |  |
| `url` | string |  |  |  |  |
| `productPage` | relation: manyToOne -> api::product-page.product-page |  |  |  |  |
| `target` | enum: _self, _blank |  |  | `_self` |  |

### navigation.nav-item

- Display name: Nav Item
- Icon: `caretRight`
- Description: A single navigation link with optional nested children
- Collection: `components_navigation_nav_items`
- Localized component: yes
- Schema file: `src/components/navigation/nav-item.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `label` | string | yes | yes |  |  |
| `url` | string |  | yes |  |  |
| `target` | enum: _self, _blank |  |  | `_self` |  |
| `children` | component: navigation.nav-child-item[] |  |  |  |  |

### navigation.product-name

- Display name: Product Name
- Icon: `cube`
- Description: A product name and URL for navigation
- Collection: `components_navigation_product_names`
- Localized component: yes
- Schema file: `src/components/navigation/product-name.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `name` | string | yes | yes |  |  |
| `url` | string |  | yes |  |  |
| `sortOrder` | integer |  |  | `0` |  |

### pricing.plan-feature

- Display name: Plan Feature
- Icon: `check`
- Description: Links a pricing feature to a plan with an included/not-included status
- Collection: `components_pricing_plan_features`
- Localized component: yes
- Schema file: `src/components/pricing/plan-feature.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `feature` | relation: manyToOne -> api::pricing-feature.pricing-feature |  |  |  |  |
| `included` | boolean |  |  | `true` |  |
| `note` | string | yes |  |  |  |

### privacy.policy-section

- Display name: Policy Section
- Icon: `file`
- Collection: `components_privacy_policy_sections`
- Localized component: yes
- Schema file: `src/components/privacy/policy-section.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `slug` | uid |  |  |  |  |
| `summary` | text | yes |  |  |  |
| `icon` | enum: shield, database, users, cookie, lock, mail, file |  |  | `file` |  |
| `isHighlighted` | boolean |  |  | `false` |  |
| `sortOrder` | integer |  |  | `0` |  |
| `content` | text | yes | yes |  |  |

### privacy.related-link

- Display name: Related Link
- Icon: `link`
- Description: A related legal or privacy page link
- Collection: `components_privacy_related_links`
- Localized component: yes
- Schema file: `src/components/privacy/related-link.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `label` | string | yes | yes |  |  |
| `url` | string |  | yes |  |  |
| `sortOrder` | integer |  |  | `0` |  |
| `isActive` | boolean |  |  | `true` |  |

### privacy.request-tip

- Display name: Privacy Request Tip
- Icon: `checkCircle`
- Description: Before-submit checklist item for the Privacy Request page
- Collection: `components_privacy_request_tips`
- Localized component: yes
- Schema file: `src/components/privacy/request-tip.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `text` | text | yes |  |  |  |
| `accent` | enum: red, orange |  |  | `red` |  |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |

### privacy.request-type-option

- Display name: Privacy Request Type Option
- Icon: `bulletList`
- Description: Selectable request type option for the Privacy Request form
- Collection: `components_privacy_request_type_options`
- Localized component: yes
- Schema file: `src/components/privacy/request-type-option.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `value` | enum: access, correction, deletion, restriction, objection, withdrawal |  |  | `access` |  |
| `label` | string | yes |  |  |  |
| `isActive` | boolean |  |  | `true` |  |
| `sortOrder` | integer |  |  | `0` |  |

### shared.button-labels

- Display name: Button Labels
- Icon: `cursor`
- Description: Global button and CTA labels
- Collection: `components_shared_button_labels`
- Localized component: yes
- Schema file: `src/components/shared/button-labels.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `freeTrialLabel` | string | yes |  |  |  |
| `viewDetailsLabel` | string | yes |  |  |  |
| `readMoreLabel` | string | yes |  |  |  |
| `contactOrderLabel` | string | yes |  |  |  |
| `tryFreeLabel` | string | yes |  |  |  |
| `viewAllLabel` | string | yes |  |  |  |
| `subscribeLabel` | string | yes |  |  |  |

### shared.contact-info

- Display name: Contact Info
- Icon: `phone`
- Description: Company contact information block
- Collection: `components_shared_contact_infos`
- Localized component: yes
- Schema file: `src/components/shared/contact-info.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `companyName` | string | yes |  |  |  |
| `address` | text | yes |  |  |  |
| `phone` | string |  |  |  |  |
| `email` | email |  |  |  |  |
| `businessHours` | string | yes |  |  |  |
| `mapUrl` | string |  |  |  |  |
| `socialLinks` | json |  |  |  |  |

### shared.cookie-consent-settings

- Display name: Cookie Consent Settings
- Icon: `shield`
- Description: PDPA cookie consent banner configuration
- Collection: `components_shared_cookie_consent_settings`
- Localized component: yes
- Schema file: `src/components/shared/cookie-consent-settings.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes |  |  |  |
| `description` | text | yes |  |  |  |
| `necessaryLabel` | string | yes |  |  |  |
| `necessaryDesc` | text | yes |  |  |  |
| `functionalLabel` | string | yes |  |  |  |
| `functionalDesc` | text | yes |  |  |  |
| `analyticsLabel` | string | yes |  |  |  |
| `analyticsDesc` | text | yes |  |  |  |
| `marketingLabel` | string | yes |  |  |  |
| `marketingDesc` | text | yes |  |  |  |
| `acceptAllLabel` | string | yes |  |  |  |
| `rejectAllLabel` | string | yes |  |  |  |
| `savePreferencesLabel` | string | yes |  |  |  |
| `manageLabel` | string | yes |  |  |  |
| `closeLabel` | string | yes |  |  |  |
| `cookiePolicyLabel` | string | yes |  |  |  |
| `privacyPolicyLabel` | string | yes |  |  |  |
| `alwaysOnLabel` | string | yes |  |  |  |
| `learnMoreLabel` | string | yes |  |  |  |

### shared.footer-labels

- Display name: Footer Labels
- Icon: `tag`
- Description: Footer section labels and headings
- Collection: `components_shared_footer_labels`
- Localized component: yes
- Schema file: `src/components/shared/footer-labels.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `helpTitle` | string | yes |  |  |  |
| `manualLabel` | string | yes |  |  |  |
| `contactUsLabel` | string | yes |  |  |  |
| `helpCenterLabel` | string | yes |  |  |  |
| `privacyTitle` | string | yes |  |  |  |
| `privacyPolicyLabel` | string | yes |  |  |  |
| `cookiePolicyLabel` | string | yes |  |  |  |
| `cookieSettingsLabel` | string | yes |  |  |  |
| `dataRequestLabel` | string | yes |  |  |  |
| `contactInfoTitle` | string | yes |  |  |  |
| `copyright` | string | yes |  |  |  |

### shared.page-section-item

- Display name: Page Section Item
- Icon: `alignLeft`
- Description: A single section with title, content, and optional image for product pages
- Collection: `components_shared_page_section_items`
- Localized component: yes
- Schema file: `src/components/shared/page-section-item.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `title` | string | yes | yes |  |  |
| `content` | blocks | yes |  |  |  |
| `image` | media: images |  |  |  |  |
| `sortOrder` | integer |  |  | `0` |  |

### shared.pdpa-settings

- Display name: PDPA Settings
- Icon: `fileText`
- Description: PDPA compliance settings: privacy request form labels, legal contact info
- Collection: `components_shared_pdpa_settings`
- Localized component: yes
- Schema file: `src/components/shared/pdpa-settings.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `heroBadge` | string | yes |  |  |  |
| `privacyRequestTitle` | string | yes |  |  |  |
| `privacyRequestDesc` | text | yes |  |  |  |
| `responseTimeLabel` | string | yes |  |  |  |
| `responseTimeDescription` | text | yes |  |  |  |
| `secureNoteLabel` | string | yes |  |  |  |
| `secureNoteDescription` | text | yes |  |  |  |
| `dpoContactLabel` | string | yes |  |  |  |
| `phoneLabel` | string | yes |  |  |  |
| `emailLabel` | string | yes |  |  |  |
| `businessHoursLabel` | string | yes |  |  |  |
| `beforeSubmitTitle` | string | yes |  |  |  |
| `beforeSubmitDescription` | text | yes |  |  |  |
| `beforeSubmitTips` | component: privacy.request-tip[] |  |  |  |  |
| `formBadge` | string | yes |  |  |  |
| `formTitle` | string | yes |  |  |  |
| `requiredFieldsNote` | string | yes |  |  |  |
| `formNameLabel` | string | yes |  |  |  |
| `formNamePlaceholder` | string | yes |  |  |  |
| `formEmailLabel` | string | yes |  |  |  |
| `formEmailPlaceholder` | string | yes |  |  |  |
| `formPhoneLabel` | string | yes |  |  |  |
| `formPhonePlaceholder` | string | yes |  |  |  |
| `formCompanyLabel` | string | yes |  |  |  |
| `formCompanyPlaceholder` | string | yes |  |  |  |
| `formRequestTypeLabel` | string | yes |  |  |  |
| `formRequestTypePlaceholder` | string | yes |  |  |  |
| `requestTypes` | component: privacy.request-type-option[] |  |  |  |  |
| `formMessageLabel` | string | yes |  |  |  |
| `formMessagePlaceholder` | text | yes |  |  |  |
| `formAdditionalInfoLabel` | string | yes |  |  |  |
| `formAdditionalInfoPlaceholder` | text | yes |  |  |  |
| `formNote` | text | yes |  |  |  |
| `formSubmitLabel` | string | yes |  |  |  |
| `formSubmittingLabel` | string | yes |  |  |  |
| `formSuccessTitle` | string | yes |  |  |  |
| `formSuccessMessage` | text | yes |  |  |  |
| `dpoEmail` | email |  |  |  |  |
| `dpoPhone` | string |  |  |  |  |
| `legalContactInfo` | component: shared.contact-info |  |  |  |  |

### shared.seo-config

- Display name: SEO Config
- Icon: `globe`
- Description: Site-wide SEO configuration: site name, defaults, social links
- Collection: `components_shared_seo_configs`
- Localized component: yes
- Schema file: `src/components/shared/seo-config.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `siteUrl` | string |  | yes |  |  |
| `siteName` | string | yes | yes |  |  |
| `defaultTitle` | string | yes |  |  |  |
| `defaultDescription` | text | yes |  |  |  |
| `defaultOgImage` | media: images |  |  |  |  |
| `brandName` | string | yes |  |  |  |
| `facebookUrl` | string |  |  |  |  |
| `lineUrl` | string |  |  |  |  |
| `linkedinUrl` | string |  |  |  |  |
| `youtubeUrl` | string |  |  |  |  |
| `twitterHandle` | string |  |  |  |  |
| `googleAnalyticsId` | string |  |  |  |  |
| `facebookPixelId` | string |  |  |  |  |
| `robotsUserAgent` | string |  |  | `*` |  |
| `robotsAllowPaths` | json |  |  |  |  |
| `robotsDisallowPaths` | json |  |  |  |  |
| `robotsSitemapUrl` | string |  |  |  |  |
| `robotsCrawlDelay` | integer |  |  | `1` |  |

### shared.seo-meta

- Display name: SEO Meta
- Icon: `search`
- Description: Reusable SEO metadata: title, description, OG image, schema type
- Collection: `components_shared_seo_metas`
- Localized component: yes
- Schema file: `src/components/shared/seo-meta.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `metaTitle` | string | yes |  |  | maxLength 70 |
| `metaDescription` | text | yes |  |  | maxLength 160 |
| `ogTitle` | string | yes |  |  |  |
| `ogDescription` | text | yes |  |  |  |
| `ogImage` | media: images |  |  |  |  |
| `ogType` | enum: website, article, product |  |  | `website` |  |
| `canonicalUrl` | string |  |  |  |  |
| `noindex` | boolean |  |  | `false` |  |
| `nofollow` | boolean |  |  | `false` |  |
| `noarchive` | boolean |  |  | `false` |  |
| `nosnippet` | boolean |  |  | `false` |  |
| `maxSnippet` | integer |  |  | `-1` |  |
| `maxImagePreview` | enum: none, standard, large |  |  | `large` |  |
| `maxVideoPreview` | integer |  |  | `-1` |  |
| `schemaType` | enum: WebPage, AboutPage, ProductPage, CollectionPage, FAQPage, ContactPage, Article, SoftwareApplication |  |  | `WebPage` |  |
| `keywords` | text | yes |  |  |  |
| `alternateLanguages` | json |  |  |  |  |

### shared.stat-item

- Display name: Stat Item
- Icon: `chartCircle`
- Description: A single statistic entry with a value and label
- Collection: `components_shared_stat_items`
- Localized component: yes
- Schema file: `src/components/shared/stat-item.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `value` | string |  | yes |  |  |
| `label` | string | yes | yes |  |  |
| `sortOrder` | integer |  |  | `0` |  |

### support.contact-section

- Display name: Support Contact Section
- Icon: `phone`
- Description: Contact section heading and field labels
- Collection: `components_support_contact_sections`
- Localized component: yes
- Schema file: `src/components/support/contact-section.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `badge` | string | yes |  |  |  |
| `title` | string | yes | yes |  |  |
| `addressLabel` | string | yes |  |  |  |
| `businessHoursLabel` | string | yes |  |  |  |
| `phoneLabel` | string | yes |  |  |  |
| `emailLabel` | string | yes |  |  |  |

### support.faq-section

- Display name: Support FAQ Section
- Icon: `question`
- Description: FAQ section headings and fallback CTA copy
- Collection: `components_support_faq_sections`
- Localized component: yes
- Schema file: `src/components/support/faq-section.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `badge` | string | yes |  |  |  |
| `title` | string | yes | yes |  |  |
| `subtitle` | text | yes |  |  |  |
| `emptyPrompt` | string | yes |  |  |  |
| `contactCtaLabel` | string | yes |  |  |  |

### support.help-center-section

- Display name: Support Help Center Section
- Icon: `book`
- Description: Help Center heading copy for support resource cards
- Collection: `components_support_help_center_sections`
- Localized component: yes
- Schema file: `src/components/support/help-center-section.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `badge` | string | yes |  |  |  |
| `title` | string | yes | yes |  |  |
| `subtitle` | text | yes |  |  |  |

### support.hero-section

- Display name: Support Hero Section
- Icon: `life-ring`
- Description: Hero copy and navigation CTA labels for the support page
- Collection: `components_support_hero_sections`
- Localized component: yes
- Schema file: `src/components/support/hero-section.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `badge` | string | yes |  |  |  |
| `title` | string | yes | yes |  |  |
| `subtitle` | text | yes |  |  |  |
| `faqCtaLabel` | string | yes |  |  |  |
| `manualCtaLabel` | string | yes |  |  |  |
| `contactCtaLabel` | string | yes |  |  |  |

### support.status-card

- Display name: Support Status Card
- Icon: `headset`
- Description: Support team availability card shown beside the hero
- Collection: `components_support_status_cards`
- Localized component: yes
- Schema file: `src/components/support/status-card.json`

| Field | Type | Localized | Required | Default | Details |
| --- | --- | --- | --- | --- | --- |
| `kicker` | string | yes |  |  |  |
| `title` | string | yes |  |  |  |
| `hours` | string | yes |  |  |  |
| `statusLabel` | string | yes |  |  |  |

