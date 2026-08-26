# Strapi CMS Schema Rules

This project uses Strapi as the source of editable website content and Astro as the frontend. Follow these rules when creating or changing schemas.

## 1. Naming and grouping

- Site-wide single types must start with `Site -`.
  - Example: `Site - Footer Settings`, `Site - Global Settings`.
- Page single types must start with `Page -`.
  - Example: `Page - Free Trial`, `Page - Privacy Settings`, `Page - About Us`.
- Collection types should not be grouped by prefix, except Blog.
  - Good: `Testimonial`, `Team Member`, `Product Page`.
  - Blog exception: `Blog - Post`, `Blog - Category`.
- Use clear singular/plural API names.
  - `free-trial` / `free-trials`
  - `privacy-setting` / `privacy-settings`
  - `footer-setting` / `footer-settings`

## 2. Single type vs collection type

- Use `singleType` for one editable page or site setting.
  - Homepage
  - About Us
  - Free Trial
  - Privacy Setting
  - Footer Setting
  - Global Setting
- Use `collectionType` for repeatable reusable records.
  - Product Page
  - Testimonial
  - Team Member
  - Partner
  - FAQ
  - Blog Post

## 3. Localization

- Page and site setting schemas should enable i18n.
- Text intended for users must be localized.
  - `title`, `subtitle`, `description`, `label`, `content`, `summary`, `badge`.
- Technical values usually should not be localized.
  - `url`
  - `slug`
  - `sortOrder`
  - `isActive`
  - `target`
  - dates, unless the exact displayed text is stored as string.

## 4. Reusable component pattern

Use components for repeatable or grouped page content.

Use grouped section components when several fields are edited together and rendered together. This keeps page single types readable and prevents long flat forms.

Good grouped section component fields:

- `badge`
- `title`
- `subtitle`
- section-specific CTA labels such as `primaryCtaLabel`, `contactCtaLabel`, or `emptyPrompt`
- display state fields only when the frontend actually changes presentation from them

Common component fields:

- `title` or `label`
- `description` or `content`
- `sortOrder`
- `isActive`

If a component appears in a list on the frontend, include:

- `sortOrder`: lower number appears first.
- `isActive`: allows hiding without deleting.

Examples:

- `free-trial.trust-item`
- `free-trial.trial-feature`
- `privacy.policy-section`
- `privacy.related-link`
- `footer.footer-section`
- `footer.footer-link`
- `support.hero-section`
- `support.status-card`
- `support.faq-section`
- `support.help-center-section`
- `support.contact-section`

Component namespace rules:

- Use a feature namespace when the component is only meaningful inside one page or feature.
  - Example: `support.status-card`
- Use `shared.*` only when the component is intentionally reused across unrelated schemas.
  - Example: `shared.contact-info`, `shared.seo-meta`
- Do not place page-only labels in `shared.*`; this makes later editor changes harder to reason about.

## 5. Relation pattern

Use relations when editors should connect real CMS records instead of typing URLs manually.

Examples:

- Footer link can relate to `Product Page`.
- Privacy Setting can relate to `Product Page` via `appliesToProducts`.
- About Us relates to Team Members, Partners, and Timeline Milestones.
- Free Trial relates to Testimonials.

Preferred relation rules:

- Keep manual `url` as fallback when relation is optional.
- If both relation and URL exist, frontend should prefer the relation.
- Relation fields must be populated in `web/src/lib/strapi.ts`.
- Relation display should use a useful main field such as `name`, `title`, or `pageTitle`.

## 6. SEO component rule

Every public page schema should include one page-level SEO component.

Page schemas should use:

```json
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
```

Use `shared.seo-meta` only for page-specific SEO metadata.

Page-level SEO fields:

- `metaTitle`: localized, max 70 characters.
- `metaDescription`: localized, max 160 characters.
- `ogTitle`: localized Open Graph title.
- `ogDescription`: localized Open Graph description.
- `ogImage`: single image media field.
- `ogType`: `website`, `article`, or `product`.
- `canonicalUrl`: manual override only when needed.
- `noindex`, `nofollow`, `noarchive`, `nosnippet`: robot directives.
- `maxSnippet`, `maxImagePreview`, `maxVideoPreview`: robot preview settings.
- `schemaType`: structured data intent such as `WebPage`, `AboutPage`, `FAQPage`, `ProductPage`, or `Article`.
- `keywords`: localized keyword text.
- `alternateLanguages`: JSON only for exceptional hreflang overrides.

Site-wide SEO defaults belong in `global-setting.seoConfig`, not in page schemas.

Global Setting should use:

```json
"seoConfig": {
  "type": "component",
  "repeatable": false,
  "component": "shared.seo-config"
}
```

Use `shared.seo-config` for:

- `siteUrl`
- `siteName`
- `defaultTitle`
- `defaultDescription`
- `defaultOgImage`
- `brandName`
- social profile URLs
- analytics and pixel IDs

Schema rules:

- Do not add flat SEO fields such as `seoTitle`, `seoDescription`, `ogImage`, or `canonicalUrl` directly on a page when `shared.seo-meta` exists.
- Do not duplicate global fields such as `siteUrl`, `siteName`, `defaultTitle`, or tracking IDs on page schemas.
- SEO text must be localized for TH and EN.
- SEO media fields should be single image media fields, not repeatable media.
- `canonicalUrl` should not be required; most pages should use frontend-generated canonical URLs.
- `noindex` and other robot fields should default to search-friendly values unless the page is intentionally private or utility-only.
- `schemaType` should match the frontend page intent.
- Keep SEO at the end of the Content Manager layout so editors finish page content before metadata.

The frontend layout supports:

- meta title
- meta description
- keywords
- canonical
- OG title/description/image
- Twitter title/description/image
- robots directives

Canonical URLs are guarded in frontend code so CMS mistakes do not create wrong-locale canonical output.

## 7. Editor UX / field position

Field order should match how the frontend page is read.

Recommended page order:

1. Hero fields
2. Status, trust, or summary fields
3. Main body section components
4. Relations used by those sections
5. CTA/form fields
6. Legal/contact fields
7. Related links
8. Legacy fallback fields, if retained for backward compatibility
9. SEO

Recommended component order:

1. Human-readable identifier: `title`, `label`, `name`
2. Display controls: `sortOrder`, `isActive`
3. Relation fields
4. Manual fallback fields such as `url`
5. Long content fields

For section components, use this order instead:

1. `badge`
2. `title`
3. `subtitle` or `description`
4. CTA labels
5. display/tone fields

Use `scripts/configure-cms-editor-layouts.mjs` after schema changes to apply Content Manager positions.

## 8. Frontend integration rule

Every schema field rendered on the website must be represented in:

- TypeScript interface in `web/src/lib/strapi.ts`
- `populate` list in the relevant fetch function
- Astro component rendering logic
- Fallback behavior if CMS data is missing

Grouped component integration must:

- expose a typed interface for the component shape
- populate the component field directly
- keep backward-compatible fallback to legacy flat fields when those fields still exist
- keep all hardcoded labels as final fallback only

Frontend list rendering must:

- filter `isActive !== false`
- sort by `sortOrder`
- fallback to static/i18n content when CMS is missing

Frontend relation rendering must:

- prefer relation-derived URL when available
- normalize locale URLs for TH/EN
- avoid duplicating `/th/` or `/en/`

## 9. Seed data rule

If a schema is used by a page, provide a seed script when possible.

Seed scripts should:

- create TH and EN data
- publish single types
- include realistic mock content
- create or link relations
- avoid stale duplicate single-type records
- seed grouped section components with complete labels, not only heading text
- keep relation data realistic enough to test frontend cards, FAQs, and JSON-LD output

Current seed scripts include:

- `scripts/seed-about-us.mjs`
- `scripts/seed-footer-setting.mjs`
- `scripts/seed-privacy-setting.mjs`
- `scripts/seed-free-trial-page.mjs`
- `scripts/seed-support-page.mjs`

## 10. Verification checklist

After every schema/frontend integration:

1. Validate JSON schemas.
2. Run `node --check` on changed scripts.
3. Run `node scripts/configure-cms-editor-layouts.mjs`.
4. Seed or update mock data.
5. Verify API response with populated relations/components.
6. Run `npm --prefix web run build`.
7. Inspect generated HTML for real CMS text and relation URLs.

Minimum API verification should confirm:

- HTTP status `200`
- expected component counts
- expected relation counts
- localized TH and EN records are populated

## 11. Exported site setting schemas

This section exports current non-page setting schemas only. It intentionally excludes all `Page - ...` single types and page-specific schemas.

### Site - Global Settings

Schema:

- API: `global-setting`
- Kind: `singleType`
- File: `src/api/global-setting/content-types/global-setting/schema.json`
- Purpose: website header, footer, contact blocks, and SEO defaults

Fields:

- `siteName`: localized string
- `siteLogo`: single image media
- `contactInfo`: component `shared.contact-info`
- `stats`: repeatable component `shared.stat-item`
- `seoConfig`: component `shared.seo-config`

Related components:

- `shared.contact-info`: `companyName`, `address`, `phone`, `email`, `businessHours`, `mapUrl`, `socialLinks`
- `shared.stat-item`: `value`, `label`, `sortOrder`
- `shared.seo-config`: `siteUrl`, `siteName`, `defaultTitle`, `defaultDescription`, `defaultOgImage`, `brandName`, social URLs, analytics IDs

Rules:

- Keep only site-wide fields here.
- Do not add page copy, page hero fields, or page-specific SEO here.
- Use `seoConfig` for global defaults only; page metadata belongs in `shared.seo-meta` on each page.

### Site - Footer Settings

Schema:

- API: `footer-setting`
- Kind: `singleType`
- File: `src/api/footer-setting/content-types/footer-setting/schema.json`
- Purpose: footer CTA, statistics, company text, footer navigation, legal links, and copyright

Fields:

- `ctaBadge`: localized string
- `ctaTitle`: localized string
- `ctaDescription`: localized text
- `primaryCtaLabel`: localized string
- `primaryCtaUrl`: string
- `secondaryCtaLabel`: localized string
- `secondaryCtaUrl`: string
- `stats`: repeatable component `shared.stat-item`
- `companyDescription`: localized text
- `footerSections`: repeatable component `footer.footer-section`
- `legalLinks`: repeatable component `footer.legal-link`
- `copyright`: localized text

Related components:

- `footer.footer-section`: `title`, `sortOrder`, `isActive`, repeatable `links`
- `footer.footer-link`: `label`, `sortOrder`, `isActive`, `productPage` relation, `url`, `target`
- `footer.legal-link`: `label`, `sortOrder`, `isActive`, `url`, `target`
- `shared.stat-item`: `value`, `label`, `sortOrder`

Rules:

- Use relation `productPage` for footer links when linking to product pages.
- Keep manual `url` as fallback for external or non-product links.
- Sort and filter footer sections, links, legal links, and stats in the frontend.

### Site - Cookie Settings

Schema:

- API: `cookie-setting`
- Kind: `singleType`
- File: `src/api/cookie-setting/content-types/cookie-setting/schema.json`
- Purpose: cookie consent banner labels and preference copy

Fields:

- `settings`: component `shared.cookie-consent-settings`

Related component:

- `shared.cookie-consent-settings`: `title`, `description`, category labels/descriptions, action labels, policy labels, `alwaysOnLabel`, `learnMoreLabel`

Rules:

- Store consent UI labels and descriptions here, not in page schemas.
- Keep legal policy page URLs in frontend logic or navigation settings unless editors must control them.
- Localize all user-facing consent labels.

### Site - Contact Floating

Schema:

- API: `contact-floating`
- Kind: `singleType`
- File: `src/api/contact-floating/content-types/contact-floating/schema.json`
- Purpose: floating contact widget settings

Fields:

- `isEnabled`: boolean, defaults to `true`
- `buttonLabel`: localized string
- `panelTitle`: localized string
- `panelDescription`: localized text
- `closeLabel`: localized string
- `actions`: repeatable component `contact-floating.contact-action`

Related component:

- `contact-floating.contact-action`: `type`, `label`, `description`, `url`, `ariaLabel`, `openInNewTab`, `isActive`, `sortOrder`

Rules:

- Use `isEnabled` to hide the widget without deleting content.
- Filter inactive actions and sort by `sortOrder`.
- Use `openInNewTab` only for external destinations.

### Site - Navigation

Schema:

- API: `navigation`
- Kind: `singleType`
- File: `src/api/navigation/content-types/navigation/schema.json`
- Purpose: site navigation menus and shared navigation labels

Fields:

- `name`: localized required string
- `headerItems`: repeatable component `navigation.nav-item`
- `footerSections`: repeatable component `navigation.footer-section`
- `footerLabels`: component `shared.footer-labels`
- `productNames`: repeatable component `navigation.product-name`
- `buttonLabels`: component `shared.button-labels`

Related components:

- `navigation.nav-item`: `label`, `url`, `target`, repeatable `children`
- `navigation.nav-child-item`: `label`, `url`, `productPage` relation, `target`
- `navigation.footer-section`: `title`, repeatable `links`
- `navigation.product-name`: `name`, `url`, `sortOrder`
- `shared.footer-labels`: footer heading and link labels
- `shared.button-labels`: shared CTA and action labels

Rules:

- Prefer relation-derived URLs for product links when `productPage` is available.
- Normalize manual URLs for TH/EN in the frontend.
- Keep navigation labels here only when they are shared across the site; page-specific CTA labels belong on the relevant page schema.

## 12. Current design patterns by page

### Free Trial

- Single type: `Page - Free Trial`
- Components:
  - `free-trial.trust-item`
  - `free-trial.form-labels`
  - `free-trial.trial-feature`
- Relations:
  - many-to-many testimonials
- Frontend:
  - `web/src/components/FreeTrialContent.astro`

### Privacy

- Single type: `Page - Privacy Settings`
- Components:
  - `privacy.policy-section`
  - `privacy.related-link`
  - `shared.contact-info`
- Relations:
  - many-to-many product pages via `appliesToProducts`
- Frontend:
  - `web/src/components/PrivacyPolicyContent.astro`

### Footer

- Single type: `Site - Footer Settings`
- Components:
  - `shared.stat-item`
  - `footer.footer-section`
  - `footer.footer-link`
  - `footer.legal-link`
- Relations:
  - footer links can relate to Product Page
- Frontend:
  - `web/src/components/Footer.astro`

### About Us

- Single type: `Page - About Us`
- Relations:
  - Team Members
  - Partners
  - Timeline Milestones
- Frontend:
  - `web/src/components/AboutContent.astro`
