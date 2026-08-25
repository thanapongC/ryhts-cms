# Frontend and Strapi CMS Integration Rules

This document defines how to integrate Strapi CMS schemas with the Astro frontend in this project.

Note: the filename intentionally follows the requested spelling: `integate-rule.md`.

## 1. Integration workflow

For every CMS schema used by the frontend:

1. Add or update the Strapi schema.
2. Add TypeScript interfaces in `web/src/lib/strapi.ts`.
3. Update the relevant fetch function and `populate` list.
4. Update the Astro component to render CMS data.
5. Keep i18n/static fallback content.
6. Seed mock TH/EN content if the page should display from CMS.
7. Verify API response.
8. Run frontend build.
9. Inspect generated HTML for real CMS content.

Do not consider integration complete until both API verification and frontend build pass.

## 2. Strapi fetch rules

All frontend CMS fetching should go through `web/src/lib/strapi.ts`.

Rules:

- Add an interface for each schema/component.
- Add every rendered relation/component/media field to `populate`.
- Use `fetchStrapiSingle` for single types.
- Use `fetchStrapiCollection` for collection types.
- Catch errors and return `null` or `[]` so static fallback still works.

Example:

```ts
export async function getFreeTrial(locale: 'th' | 'en' = 'th'): Promise<FreeTrial | null> {
  try {
    const response = await fetchStrapiSingle<FreeTrial>('free-trial', {
      locale,
      populate: [
        'trustItems',
        'formLabels',
        'features',
        'testimonials',
        'testimonials.avatar',
        'seo',
        'seo.ogImage',
      ],
    });
    return response.data;
  } catch {
    return null;
  }
}
```

## 3. Populate rule

If a field is displayed on the frontend, it must be populated.

Common populate examples:

- Component:
  - `sections`
  - `formLabels`
  - `trustItems`
- Nested component:
  - `footerSections`
  - `footerSections.links`
- Relation:
  - `testimonials`
  - `appliesToProducts`
  - `footerSections.links.productPage`
- Media:
  - `seo.ogImage`
  - `testimonials.avatar`
  - `siteLogo`

If data renders as missing but exists in CMS, check `populate` first.

## 4. Component should be rule

CMS components should match how the frontend component reads and renders data.

A component should be:

- grouped by one visible frontend section, such as `heroSection`, `faqSection`, `contactSection`, or `ctaSection`
- used when several fields are edited together and rendered together
- repeatable only when the frontend renders a sortable list
- named by purpose, not by layout decoration
- small enough that editors can understand the form without scrolling through unrelated content
- localized when the text, labels, links, or SEO values differ between TH and EN
- populated explicitly in the frontend fetch function
- represented by a matching TypeScript interface in `web/src/lib/strapi.ts`
- seeded with realistic TH and EN mock data before testing the frontend

Use a component for grouped page content:

```json
{
  "heroSection": "support.hero-section",
  "faqSection": "support.faq-section",
  "contactSection": "support.contact-section"
}
```

Use a relation instead of a component when the content is shared, reusable, filterable, or managed as its own record:

```json
{
  "faqs": "api::faq.faq",
  "helpResources": "api::help-item.help-item",
  "contactSettings": "api::global-setting.global-setting"
}
```

Do not create flat page fields when the frontend treats them as one section:

```text
Avoid: heroBadge, heroTitle, heroSubtitle, heroPrimaryButtonText, heroPrimaryButtonUrl
Use:   heroSection.badge, heroSection.title, heroSection.subtitle, heroSection.primaryButton
```

Do not create component fields just because the CMS page needs more fields. Components should improve editor UX and match the frontend data shape.

## 5. Locale rule

Every page integration must pass the current locale:

```ts
const { lang = "th" } = Astro.props;
const cmsData = await getSomePage(lang);
```

Do not hardcode only Thai or only English fetches.

For links, use the locale home prefix from i18n:

```ts
const t = getLocale(lang);
```

Then build internal links using `t.home`.

## 6. Internal URL normalization

CMS editors may enter:

- `/privacy/`
- `/th/privacy/`
- `/en/privacy/`
- `privacy/`

Frontend should normalize internal URLs to the current locale and avoid duplicate locale prefixes.

Use this pattern inside Astro components:

```ts
function normalizeInternalUrl(url?: string) {
  if (!url) return "#";
  if (/^(https?:|mailto:|tel:|#)/.test(url)) return url;
  const path = url.replace(/^\/(th|en)\//, "/");
  return path.startsWith("/") ? `${t.home}${path.replace(/^\//, "")}` : path;
}
```

Relation-derived URLs should also use `t.home`:

```ts
if (link.productPage?.slug) return `${t.home}${link.productPage.slug}/`;
```

## 7. Fallback rule

Frontend must not break when CMS is unavailable, missing, unpublished, or partially empty.

Use fallback hierarchy:

1. CMS value
2. i18n/static value
3. safe default

Example:

```ts
const heroTitle = cmsData?.heroTitle || t.freeTrial.heroTitle;
```

For sections/lists:

```ts
const sections = cmsData?.sections?.length
  ? cmsData.sections
  : fallbackSections;
```

## 8. List rendering rule

Every repeatable CMS list must:

- filter inactive items
- sort by `sortOrder`
- handle empty arrays

Use this pattern:

```ts
const features = cmsData?.features
  ?.filter((item) => item.isActive !== false)
  .slice()
  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) || [];
```

Do not render unsorted CMS arrays directly if order matters.

## 9. Relation rendering rule

When a CMS component has both relation and manual URL:

1. Prefer relation.
2. Fall back to manual URL.
3. Normalize manual URL.

Example:

```ts
function getFooterLinkUrl(link) {
  if (link.productPage?.slug) return `${t.home}${link.productPage.slug}/`;
  return normalizeInternalUrl(link.url);
}
```

## 10. Media rendering rule

Use Strapi media helpers for CMS media:

```ts
import { getStrapiAbsoluteImageUrl } from "../lib/strapi";
```

Example:

```astro
{testimonial.avatar && (
  <img
    src={getStrapiAbsoluteImageUrl(testimonial.avatar, "small")}
    alt={testimonial.customerName}
  />
)}
```

Always provide a fallback if image is optional.

## 11. SEO integration rule

Every public CMS page should expose a localized `seo` component using `shared.seo-meta`.

Page schemas should use:

```json
{
  "seo": {
    "type": "component",
    "repeatable": false,
    "component": "shared.seo-meta",
    "pluginOptions": {
      "i18n": {
        "localized": true
      }
    }
  }
}
```

Global SEO defaults should live only in `global-setting.seoConfig` using `shared.seo-config`.
Do not duplicate global SEO fields on every page schema.

Page-level SEO should control page-specific metadata:

- `metaTitle`
- `metaDescription`
- `ogTitle`
- `ogDescription`
- `ogImage`
- `ogType`
- `canonicalUrl`
- robot settings: `noindex`, `nofollow`, `noarchive`, `nosnippet`
- preview settings: `maxSnippet`, `maxImagePreview`, `maxVideoPreview`
- `schemaType`
- `keywords`
- `alternateLanguages`

Global SEO config should control site-wide defaults and tracking:

- `siteUrl`
- `siteName`
- `defaultTitle`
- `defaultDescription`
- `defaultOgImage`
- `brandName`
- social URLs
- analytics and pixel IDs

Fetch functions must populate both the SEO component and its media:

```ts
populate: [
  'seo',
  'seo.ogImage',
]
```

Global settings fetch must populate the default OG image:

```ts
populate: [
  'seoConfig',
  'seoConfig.defaultOgImage',
]
```

Page layouts should receive raw CMS `seo` plus explicit fallback props.

Example page:

```astro
---
const seo = (await getFreeTrial("th"))?.seo;
---

<Layout
  title="Fallback title"
  description="Fallback description"
  lang="th"
  seo={seo}
  ogImage={seo?.ogImage ? getStrapiAbsoluteImageUrl(seo.ogImage) : "/og-free-trial.jpg"}
>
  <FreeTrialContent lang="th" />
</Layout>
```

Fallback priority must be:

1. explicit `Layout` props
2. page-level CMS `seo`
3. global CMS `seoConfig`
4. static i18n fallback
5. safe hardcoded default

The shared layout handles:

- title
- description
- keywords
- canonical
- OG/Twitter metadata
- robots
- hreflang

Rules:

- `metaTitle` should be concise and stay within the schema limit of 70 characters.
- `metaDescription` should stay within the schema limit of 160 characters.
- `ogImage` should use Strapi media and be resolved with `getStrapiAbsoluteImageUrl`.
- `canonicalUrl` should be used only for the same page URL; do not point TH pages to EN pages or EN pages to TH pages.
- `schemaType` should match the page intent, for example `FAQPage` for support FAQ pages, `AboutPage` for about pages, and `ProductPage` for product pages.
- SEO text fields should be localized for TH and EN.
- Seed scripts should create realistic TH and EN SEO values for every CMS-integrated page.
- If a page intentionally should not appear in search results, set `noindex`; do not hardcode robots behavior in Astro.
- Do not render SEO from stale flat fields such as `seoTitle` or `seoDescription` when a page already has the shared `seo` component.

## 12. Single-type duplicate rule

Strapi single types can become duplicated after schema changes or manual DB work. Duplicates can cause the API to return stale or empty data.

If API data looks wrong:

- inspect all locale records for that single type
- keep the correct populated document
- remove stale duplicate locale records carefully

Known symptom:

- TH page shows mixed EN form labels.
- EN page returns empty data even after seed script ran.

## 13. Seed data rule

Every CMS-integrated page should have a seed script when practical.

Seed scripts should:

- create TH and EN records
- publish single types
- include realistic mock data
- include required relations
- create fallback relation records if needed
- avoid or clean stale duplicate single-type records

Current examples:

- `scripts/seed-free-trial-page.mjs`
- `scripts/seed-privacy-setting.mjs`
- `scripts/seed-footer-setting.mjs`
- `scripts/seed-about-us.mjs`
- `scripts/seed-support-page.mjs`

## 14. API verification rule

After seeding or integration, verify the API directly.

Check:

- status is `200`
- components have expected counts
- relations have expected counts
- TH and EN both return populated data

Example expected Free Trial verification:

```text
th:200:trust=4:features=6:testimonials=6:formLabels=true
en:200:trust=4:features=6:testimonials=3:formLabels=true
```

## 15. Build verification rule

Always run:

```bash
npm --prefix web run build
```

Build must complete with all pages generated.

Expected current output:

```text
31 page(s) built
```

If sandbox blocks CMS fetches, rerun with network/DB permission so the build uses real CMS data.

## 16. Generated HTML verification rule

After build, inspect generated HTML for the exact CMS data.

Example:

```bash
rg "Try iStock Express for Free|Request Your Free Trial Account" web/dist/en/free-trial/index.html
rg "ทดลองใช้ iStock Express ฟรี|กรอกข้อมูลเพื่อรับบัญชีทดลองใช้ฟรี" web/dist/th/free-trial/index.html
```

Confirm:

- CMS title appears
- CMS form labels appear
- relation URLs appear
- locale URLs are correct
- fallback content is not accidentally showing when CMS data should exist

## 17. Exported component schema details

This section exports all current Strapi component schemas from `src/components`.

### contact-floating.contact-action

- File: `src/components/contact-floating/contact-action.json`
- Display: `Contact Action`
- Fields:
  - `type`: enumeration `phone`, `line`, `email`, `facebook`, `map`, `custom`, required
  - `label`: string, required, localized
  - `description`: string, localized
  - `url`: string, required
  - `ariaLabel`: string, localized
  - `openInNewTab`: boolean
  - `isActive`: boolean
  - `sortOrder`: integer

### cookie.policy-category

- File: `src/components/cookie/policy-category.json`
- Display: `Cookie Policy Category`
- Description: Cookie category card for the Cookie Policy page
- Fields:
  - `title`: string, localized
  - `description`: text, localized
  - `icon`: enumeration `shield`, `settings`, `analytics`, `marketing`
  - `accent`: enumeration `red`, `orange`
  - `isActive`: boolean
  - `sortOrder`: integer

### downloads.release-change

- File: `src/components/downloads/release-change.json`
- Display: `Release Change`
- Fields:
  - `text`: string, required, localized
  - `sortOrder`: integer

### footer.footer-link

- File: `src/components/footer/footer-link.json`
- Display: `Footer Link`
- Description: A footer navigation link. Use either URL or Product Page relation.
- Fields:
  - `label`: string, required, localized
  - `sortOrder`: integer
  - `isActive`: boolean
  - `productPage`: relation `manyToOne` -> `api::product-page.product-page`
  - `url`: string
  - `target`: enumeration `_self`, `_blank`

### footer.footer-section

- File: `src/components/footer/footer-section.json`
- Display: `Footer Section`
- Description: A footer column with ordered links
- Fields:
  - `title`: string, required, localized
  - `sortOrder`: integer
  - `isActive`: boolean
  - `links`: repeatable component `footer.footer-link`

### footer.legal-link

- File: `src/components/footer/legal-link.json`
- Display: `Legal Link`
- Fields:
  - `label`: string, required, localized
  - `sortOrder`: integer
  - `isActive`: boolean
  - `url`: string, required
  - `target`: enumeration `_self`, `_blank`

### free-trial.form-labels

- File: `src/components/free-trial/form-labels.json`
- Display: `Form Labels`
- Fields:
  - `fullNameLabel`: string, localized
  - `fullNamePlaceholder`: string, localized
  - `positionLabel`: string, localized
  - `positionPlaceholder`: string, localized
  - `emailLabel`: string, localized
  - `emailPlaceholder`: string, localized
  - `phoneLabel`: string, localized
  - `phonePlaceholder`: string, localized
  - `addressLabel`: string, localized
  - `addressPlaceholder`: string, localized
  - `companyLabel`: string, localized
  - `companyPlaceholder`: string, localized
  - `businessDetailsLabel`: string, localized
  - `businessDetailsPlaceholder`: string, localized
  - `privacyConsentPrefix`: string, localized
  - `privacyPolicyLabel`: string, localized
  - `privacyPolicyUrl`: string
  - `privacyConsentSuffix`: string, localized
  - `marketingConsentLabel`: string, localized
  - `marketingConsentDescription`: text, localized
  - `submitLabel`: string, localized
  - `successTitle`: string, localized
  - `successMessage`: text, localized

### free-trial.trial-feature

- File: `src/components/free-trial/trial-feature.json`
- Display: `Trial Feature`
- Fields:
  - `title`: string, required, localized
  - `description`: text, localized
  - `isActive`: boolean
  - `sortOrder`: integer

### free-trial.trust-item

- File: `src/components/free-trial/trust-item.json`
- Display: `Trust Item`
- Fields:
  - `label`: string, required, localized
  - `isActive`: boolean
  - `sortOrder`: integer

### navigation.footer-section

- File: `src/components/navigation/footer-section.json`
- Display: `Footer Section`
- Description: A footer column grouping navigation links under a title
- Fields:
  - `title`: string, required, localized
  - `links`: repeatable component `navigation.nav-item`

### navigation.nav-child-item

- File: `src/components/navigation/nav-child-item.json`
- Display: `Nav Child Item`
- Description: A second-level navigation link
- Fields:
  - `label`: string, required, localized
  - `url`: string
  - `productPage`: relation `manyToOne` -> `api::product-page.product-page`
  - `target`: enumeration `_self`, `_blank`

### navigation.nav-item

- File: `src/components/navigation/nav-item.json`
- Display: `Nav Item`
- Description: A single navigation link with optional nested children
- Fields:
  - `label`: string, required, localized
  - `url`: string, required
  - `target`: enumeration `_self`, `_blank`
  - `children`: repeatable component `navigation.nav-child-item`

### navigation.product-name

- File: `src/components/navigation/product-name.json`
- Display: `Product Name`
- Description: A product name and URL for navigation
- Fields:
  - `name`: string, required, localized
  - `url`: string, required
  - `sortOrder`: integer

### pricing.plan-feature

- File: `src/components/pricing/plan-feature.json`
- Display: `Plan Feature`
- Description: Links a pricing feature to a plan with an included/not-included status
- Fields:
  - `feature`: relation `manyToOne` -> `api::pricing-feature.pricing-feature`
  - `included`: boolean
  - `note`: string, localized

### privacy.policy-section

- File: `src/components/privacy/policy-section.json`
- Display: `Policy Section`
- Fields:
  - `title`: string, required, localized
  - `slug`: uid
  - `summary`: text, localized
  - `icon`: enumeration `shield`, `database`, `users`, `cookie`, `lock`, `mail`, `file`
  - `isHighlighted`: boolean
  - `sortOrder`: integer
  - `content`: text, required, localized

### privacy.related-link

- File: `src/components/privacy/related-link.json`
- Display: `Related Link`
- Description: A related legal or privacy page link
- Fields:
  - `label`: string, required, localized
  - `url`: string, required
  - `sortOrder`: integer
  - `isActive`: boolean

### privacy.request-tip

- File: `src/components/privacy/request-tip.json`
- Display: `Privacy Request Tip`
- Description: Before-submit checklist item for the Privacy Request page
- Fields:
  - `text`: text, localized
  - `accent`: enumeration `red`, `orange`
  - `isActive`: boolean
  - `sortOrder`: integer

### privacy.request-type-option

- File: `src/components/privacy/request-type-option.json`
- Display: `Privacy Request Type Option`
- Description: Selectable request type option for the Privacy Request form
- Fields:
  - `value`: enumeration `access`, `correction`, `deletion`, `restriction`, `objection`, `withdrawal`
  - `label`: string, localized
  - `isActive`: boolean
  - `sortOrder`: integer

### shared.button-labels

- File: `src/components/shared/button-labels.json`
- Display: `Button Labels`
- Description: Global button and CTA labels
- Fields:
  - `freeTrialLabel`: string, localized
  - `viewDetailsLabel`: string, localized
  - `readMoreLabel`: string, localized
  - `contactOrderLabel`: string, localized
  - `tryFreeLabel`: string, localized
  - `viewAllLabel`: string, localized
  - `subscribeLabel`: string, localized

### shared.contact-info

- File: `src/components/shared/contact-info.json`
- Display: `Contact Info`
- Description: Company contact information block
- Fields:
  - `companyName`: string, localized
  - `address`: text, localized
  - `phone`: string
  - `email`: email
  - `businessHours`: string, localized
  - `mapUrl`: string
  - `socialLinks`: json

### shared.cookie-consent-settings

- File: `src/components/shared/cookie-consent-settings.json`
- Display: `Cookie Consent Settings`
- Description: PDPA cookie consent banner configuration
- Fields:
  - `title`: string, localized
  - `description`: text, localized
  - `necessaryLabel`: string, localized
  - `necessaryDesc`: text, localized
  - `functionalLabel`: string, localized
  - `functionalDesc`: text, localized
  - `analyticsLabel`: string, localized
  - `analyticsDesc`: text, localized
  - `marketingLabel`: string, localized
  - `marketingDesc`: text, localized
  - `acceptAllLabel`: string, localized
  - `rejectAllLabel`: string, localized
  - `savePreferencesLabel`: string, localized
  - `manageLabel`: string, localized
  - `closeLabel`: string, localized
  - `cookiePolicyLabel`: string, localized
  - `privacyPolicyLabel`: string, localized
  - `alwaysOnLabel`: string, localized
  - `learnMoreLabel`: string, localized

### shared.footer-labels

- File: `src/components/shared/footer-labels.json`
- Display: `Footer Labels`
- Description: Footer section labels and headings
- Fields:
  - `helpTitle`: string, localized
  - `manualLabel`: string, localized
  - `contactUsLabel`: string, localized
  - `helpCenterLabel`: string, localized
  - `privacyTitle`: string, localized
  - `privacyPolicyLabel`: string, localized
  - `cookiePolicyLabel`: string, localized
  - `cookieSettingsLabel`: string, localized
  - `dataRequestLabel`: string, localized
  - `contactInfoTitle`: string, localized
  - `copyright`: string, localized

### shared.page-section-item

- File: `src/components/shared/page-section-item.json`
- Display: `Page Section Item`
- Description: A single section with title, content, and optional image for product pages
- Fields:
  - `title`: string, required, localized
  - `content`: blocks, localized
  - `image`: media
  - `sortOrder`: integer

### shared.pdpa-settings

- File: `src/components/shared/pdpa-settings.json`
- Display: `PDPA Settings`
- Description: PDPA compliance settings: privacy request form labels, legal contact info
- Fields:
  - `heroBadge`: string, localized
  - `privacyRequestTitle`: string, localized
  - `privacyRequestDesc`: text, localized
  - `responseTimeLabel`: string, localized
  - `responseTimeDescription`: text, localized
  - `secureNoteLabel`: string, localized
  - `secureNoteDescription`: text, localized
  - `dpoContactLabel`: string, localized
  - `phoneLabel`: string, localized
  - `emailLabel`: string, localized
  - `businessHoursLabel`: string, localized
  - `beforeSubmitTitle`: string, localized
  - `beforeSubmitDescription`: text, localized
  - `beforeSubmitTips`: repeatable component `privacy.request-tip`
  - `formBadge`: string, localized
  - `formTitle`: string, localized
  - `requiredFieldsNote`: string, localized
  - `formNameLabel`: string, localized
  - `formNamePlaceholder`: string, localized
  - `formEmailLabel`: string, localized
  - `formEmailPlaceholder`: string, localized
  - `formPhoneLabel`: string, localized
  - `formPhonePlaceholder`: string, localized
  - `formCompanyLabel`: string, localized
  - `formCompanyPlaceholder`: string, localized
  - `formRequestTypeLabel`: string, localized
  - `formRequestTypePlaceholder`: string, localized
  - `requestTypes`: repeatable component `privacy.request-type-option`
  - `formMessageLabel`: string, localized
  - `formMessagePlaceholder`: text, localized
  - `formAdditionalInfoLabel`: string, localized
  - `formAdditionalInfoPlaceholder`: text, localized
  - `formNote`: text, localized
  - `formSubmitLabel`: string, localized
  - `formSubmittingLabel`: string, localized
  - `formSuccessTitle`: string, localized
  - `formSuccessMessage`: text, localized
  - `dpoEmail`: email
  - `dpoPhone`: string
  - `legalContactInfo`: component `shared.contact-info`

### shared.seo-config

- File: `src/components/shared/seo-config.json`
- Display: `SEO Config`
- Description: Site-wide SEO configuration: site name, defaults, social links
- Fields:
  - `siteUrl`: string, required
  - `siteName`: string, required, localized
  - `defaultTitle`: string, localized
  - `defaultDescription`: text, localized
  - `defaultOgImage`: media
  - `brandName`: string, localized
  - `facebookUrl`: string
  - `lineUrl`: string
  - `linkedinUrl`: string
  - `youtubeUrl`: string
  - `twitterHandle`: string
  - `googleAnalyticsId`: string
  - `facebookPixelId`: string

### shared.seo-meta

- File: `src/components/shared/seo-meta.json`
- Display: `SEO Meta`
- Description: Reusable SEO metadata: title, description, OG image, schema type
- Fields:
  - `metaTitle`: string, localized
  - `metaDescription`: text, localized
  - `ogTitle`: string, localized
  - `ogDescription`: text, localized
  - `ogImage`: media
  - `ogType`: enumeration `website`, `article`, `product`
  - `canonicalUrl`: string
  - `noindex`: boolean
  - `nofollow`: boolean
  - `noarchive`: boolean
  - `nosnippet`: boolean
  - `maxSnippet`: integer
  - `maxImagePreview`: enumeration `none`, `standard`, `large`
  - `maxVideoPreview`: integer
  - `schemaType`: enumeration `WebPage`, `AboutPage`, `ProductPage`, `CollectionPage`, `FAQPage`, `ContactPage`, `Article`, `SoftwareApplication`
  - `keywords`: text, localized
  - `alternateLanguages`: json

### shared.stat-item

- File: `src/components/shared/stat-item.json`
- Display: `Stat Item`
- Description: A single statistic entry with a value and label
- Fields:
  - `value`: string, required
  - `label`: string, required, localized
  - `sortOrder`: integer

### support.contact-section

- File: `src/components/support/contact-section.json`
- Display: `Support Contact Section`
- Description: Contact section heading and field labels
- Fields:
  - `badge`: string, localized
  - `title`: string, required, localized
  - `addressLabel`: string, localized
  - `businessHoursLabel`: string, localized
  - `phoneLabel`: string, localized
  - `emailLabel`: string, localized

### support.faq-section

- File: `src/components/support/faq-section.json`
- Display: `Support FAQ Section`
- Description: FAQ section headings and fallback CTA copy
- Fields:
  - `badge`: string, localized
  - `title`: string, required, localized
  - `subtitle`: text, localized
  - `emptyPrompt`: string, localized
  - `contactCtaLabel`: string, localized

### support.help-center-section

- File: `src/components/support/help-center-section.json`
- Display: `Support Help Center Section`
- Description: Help Center heading copy for support resource cards
- Fields:
  - `badge`: string, localized
  - `title`: string, required, localized
  - `subtitle`: text, localized

### support.hero-section

- File: `src/components/support/hero-section.json`
- Display: `Support Hero Section`
- Description: Hero copy and navigation CTA labels for the support page
- Fields:
  - `badge`: string, localized
  - `title`: string, required, localized
  - `subtitle`: text, localized
  - `faqCtaLabel`: string, localized
  - `manualCtaLabel`: string, localized
  - `contactCtaLabel`: string, localized

### support.status-card

- File: `src/components/support/status-card.json`
- Display: `Support Status Card`
- Description: Support team availability card shown beside the hero
- Fields:
  - `kicker`: string, localized
  - `title`: string, localized
  - `hours`: string, localized
  - `statusLabel`: string, localized

## 18. Component-specific rules

### Free Trial

Frontend:

- `web/src/components/FreeTrialContent.astro`

CMS data:

- hero
- trust items
- form labels
- trial features
- testimonials relation
- CTA text
- SEO

Rules:

- Always render hero with fallback.
- Sort/filter trust items and features.
- Sort/filter testimonials.
- Normalize privacy policy URL.
- Seed testimonials if a locale has none.

### Privacy

Frontend:

- `web/src/components/PrivacyPolicyContent.astro`

CMS data:

- hero
- applies-to product relations
- policy sections
- legal contact info
- related links
- SEO

Rules:

- Product relation chips should use `product.slug`.
- Section anchors should use stable `slug`.
- Related links should normalize locale URLs.

### Footer

Frontend:

- `web/src/components/Footer.astro`

CMS data:

- CTA
- stats
- footer sections
- footer links
- product page relation
- legal links
- copyright

Rules:

- Prefer product relation URL over manual URL.
- Render all active footer sections.
- Sort links and sections.
- Normalize CTA and legal URLs.

### About Us

Frontend:

- `web/src/components/AboutContent.astro`

CMS data:

- page copy
- team member relations
- partner relations
- timeline milestone relations
- contact info
- SEO

Rules:

- Sort relation collections by `sortOrder`.
- Hide inactive collection records.
- Use fallback copy when CMS is missing.

### Support

Frontend:

- `web/src/components/SupportContent.astro`

CMS data:

- hero section component
- status card component
- FAQ section component
- FAQ relations
- help center section component
- help resource relations
- contact section component
- global contact settings relation
- SEO

Rules:

- Use section components for editor-owned page copy.
- Use FAQ and help item relations for reusable support content.
- Use global setting relation for shared contact data.
- Localize section components for TH and EN.
- Populate every section component and relation before rendering.

## 19. Definition of done

CMS/frontend integration is done only when:

- schema is valid JSON
- TypeScript interfaces match schema
- fetch function populates all displayed fields
- Astro component renders CMS data and fallback
- TH and EN seed data exist
- relation counts are verified
- live CMS build passes
- generated HTML contains expected CMS content
