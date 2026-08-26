# Project Rules and Guidelines

This document provides comprehensive rules and guidelines for the i-Stock Express project, covering UI/UX design, CMS schema design, frontend integration, and SEO.

## Rule Files

All project rules are located in the `rules/` directory:

1. **[Design Rule](rules/design-rule.md)** - UI/UX design guidelines and brand color system
2. **[Integration Rule](rules/integate-rule.md)** - Frontend and Strapi CMS integration rules
3. **[Schema Rule](rules/schema-rule.md)** - Strapi CMS schema design rules
4. **[SEO Rule](rules/seo-rule.md)** - SEO implementation rules for CMS and frontend
5. **[Cache Rule](rules/cache-rule.md)** - Caching architecture and rules

---

## Design Rule (rules/design-rule.md)

### Website UI Modernization Prompt

You are an expert UI/UX designer and frontend developer. Your task is to **redesign and modernize the existing website at `http://localhost:4323/th`**.

The goal is to create a clean, modern, professional, premium, and visually balanced website using the new brand color system based primarily on:

* **Primary Blue:** `#017FE4`
* **White:** `#FFFFFF`

You may introduce supporting neutral colors where necessary to improve readability, hierarchy, accessibility, and overall visual quality.

### Primary Objective

Improve the website's:

* Color system
* UI components
* Typography
* Spacing
* Visual hierarchy
* Buttons
* Cards
* Navigation
* Hero section
* Forms
* Footer
* Responsive behavior
* Micro-interactions

The final design should feel:

* Modern
* Clean
* Professional
* Premium
* Trustworthy
* Minimal
* Technology-oriented
* Easy to navigate
* Visually consistent

**Do not simply replace the existing colors. Redesign the UI where necessary so the new blue-and-white visual identity feels intentional and cohesive.**

### Brand Color System

#### Primary Brand Color - Blue
`#017FE4`

This is the **main brand color** and should be the strongest visual accent throughout the website.

Use it for:
* Primary CTA buttons
* Active navigation
* Important links
* Key icons
* Highlights
* Selected states
* Important badges
* Brand accents
* Form focus states
* Interactive elements

Do not use blue excessively. Large areas of saturated blue should be used strategically.

#### Primary Background - White
`#FFFFFF`

Use white as the primary background color.

White should dominate the interface to create:
* Cleanliness
* Spaciousness
* Professionalism
* Premium appearance
* Strong contrast with the blue brand color

### Supporting Color Palette

You may introduce neutral colors to prevent the interface from becoming visually flat.

#### Background Colors
```text
Primary Background:      #FFFFFF
Soft Background:         #F8FAFC
Blue Tint Background:    #EFF8FF
Light Blue Background:   #EAF5FF
Section Background:      #F5F9FC
```

Use these backgrounds subtly. Do not turn the entire website light blue.

### Text Color System

Text colors are extremely important. Always choose text colors according to the background to maintain excellent readability and accessibility.

#### Primary Text - `#111827`
Use for:
* H1, H2, H3
* Important headings
* Main content
* Strong labels

#### Secondary Text - `#374151`
Use for:
* Paragraphs
* Descriptions
* Supporting content

#### Muted Text - `#6B7280`
Use for:
* Metadata
* Helper text
* Secondary information
* Placeholder-like content

#### Text on Blue Background - `#FFFFFF`
Use white text when the background is `#017FE4`. Do not use dark text on the primary blue background.

### Border Colors

Use subtle borders:
```text
Default Border:       #E5E7EB
Light Border:         #F1F5F9
Blue Border:          #93C5FD
Strong Blue Border:   #017FE4
```

Avoid thick or overly visible borders.

### Brand Gradient

You may use a subtle blue gradient when it improves the visual design:
```css
linear-gradient(135deg, #017FE4 0%, #005CB8 100%)
```

Use gradients selectively for:
* Hero sections
* CTA sections
* Decorative elements
* Feature highlights
* Important visual areas

Do **not** apply gradients to every button or card. The website should remain clean and premium.

### Overall Color Distribution

Use the following approximate visual balance:
```text
70–80%  White / Neutral surfaces
15–20%  Dark text / structural elements
5–10%   Blue brand accents
```

The goal is to make `#017FE4` feel like a strong brand accent rather than overwhelming the interface.

### Header / Navigation

Modernize the existing header while preserving all existing navigation functionality.

Recommended design:
* White background
* Clean spacing
* Subtle bottom border
* Optional very subtle shadow
* Dark text
* Blue active state
* Blue CTA

Navigation:
- Default: `#111827`
- Hover: `#017FE4`
- Active: `#017FE4` (may also use `#EFF8FF` background)

CTA:
- Background: `#017FE4`
- Text: `#FFFFFF`
- Hover: `#006CC2`

Keep the header compact and professional.

### Hero Section

Redesign the hero section as the main visual focal point.

The hero should contain:
* Strong headline
* Supporting description
* Primary CTA
* Optional secondary CTA
* Strong visual element
* Generous whitespace
* Subtle blue branding

Preferred approach:
* White or very light background
* Blue typography accents
* Blue CTA
* Subtle blue decorative shapes
* Clean visual composition

### Primary Button

- Background: `#017FE4`
- Text: `#FFFFFF`
- Hover: `#006CC2`
- Active: `#005BA8`
- Focus: `box-shadow: 0 0 0 4px rgba(1, 127, 228, 0.15);`

Buttons should have:
* Comfortable height
* Clear typography
* Appropriate padding
* Medium border radius
* Smooth hover transition
* Clear focus state

### Secondary Button

- Background: `#EFF8FF`
- Text: `#017FE4`
- Border: `#BFDBFE`
- Hover: `#E0F2FE`

### Cards

Modernize cards throughout the website:
```text
Background:       #FFFFFF
Border:           #E5E7EB
Border Radius:    12px–20px
Shadow:           Very subtle
```

Cards should have:
* Good internal spacing
* Strong heading hierarchy
* Clear descriptions
* Consistent icon positioning

Hover State:
* Slight elevation
* Subtle blue border
* Small transform if appropriate
* Smooth transition

### Typography

Use a modern sans-serif typeface with excellent Thai language support:
* `Noto Sans Thai`
* `IBM Plex Sans Thai`
* `LINE Seed Sans TH`
* Another high-quality Thai-compatible sans-serif

Typography should have a clear hierarchy:
- H1: Large, bold, `#111827`
- H2: Strong section headings, `#111827`
- H3: Card and subsection headings, `#111827`
- Body: `#374151`
- Supporting Text: `#6B7280`

### Link Styling

- Default links: `#017FE4`
- Hover: `#006CC2`

### Forms and Inputs

#### Default
```text
Background: #FFFFFF
Text:       #111827
Border:     #E5E7EB
Radius:     8px–12px
```

#### Focus
```text
Border: #017FE4
```

#### Placeholder: `#9CA3AF`
#### Error: `#DC2626`
#### Success: `#16A34A`

### Badges and Tags

- Primary Badge: Background `#EFF8FF`, Text `#017FE4`
- Neutral Badge: Background `#F3F4F6`, Text `#374151`

### Footer

#### Dark Footer
- Background: `#111827`
- Text: `#FFFFFF`
- Secondary text: `#D1D5DB`
- Muted text: `#9CA3AF`
- Links: `#FFFFFF`
- Hover: `#017FE4`

### Section Backgrounds

Create visual separation between sections:
```text
Hero                  #FFFFFF
Feature Section       #F8FAFC
Services              #FFFFFF
Highlight Section     #EFF8FF
Content Section       #FFFFFF
CTA Section           #017FE4
Footer                #111827
```

### CTA Section

- Background: `#017FE4`
- Heading: `#FFFFFF`
- Description: `#E0F2FE`
- Primary button: `#FFFFFF`
- Button text: `#017FE4`
- Hover: `#EFF8FF`

### Shadows

Keep shadows subtle:
```css
box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
```

For elevated cards:
```css
box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
```

### Border Radius

```text
Small:   8px
Medium:  12px
Large:   16px
XL:      20px
```

### Micro-interactions

Add subtle animations where they improve the UX:
* Button hover
* Card hover
* Navigation hover
* Image transitions
* Fade-in
* Small elevation changes
* Smooth scrolling

Animations should be:
* Fast
* Subtle
* Professional

Respect `prefers-reduced-motion`.

### Responsive Design

The redesigned website must work perfectly across:
* Desktop
* Laptop
* Tablet
* Mobile

There must be **no horizontal scrolling on mobile**.

### Accessibility

Ensure good contrast:
- White Background: Use `#111827` for primary text
- Blue Background: Use `#FFFFFF` for text
- Light Blue Background: Use `#111827` for primary text
- Blue Links: Use `#017FE4` only where sufficient contrast is maintained

Ensure:
* Keyboard focus states
* Accessible buttons
* Accessible form labels
* Semantic HTML
* Sufficient contrast
* Visible hover/focus states

### Design Tokens

Create a centralized design token system:
```css
:root {
  --color-primary: #017FE4;
  --color-primary-hover: #006CC2;
  --color-primary-dark: #005BA8;

  --color-background: #FFFFFF;
  --color-background-soft: #F8FAFC;
  --color-background-blue: #EFF8FF;
  --color-background-blue-light: #EAF5FF;

  --color-text-primary: #111827;
  --color-text-secondary: #374151;
  --color-text-muted: #6B7280;

  --color-border: #E5E7EB;
  --color-border-light: #F1F5F9;
  --color-border-blue: #93C5FD;

  --color-success: #16A34A;
  --color-error: #DC2626;
}
```

### Existing Functionality

**Do not break existing functionality.** Preserve:
* Existing content
* Existing routes
* Existing navigation
* Existing links
* Existing forms
* Existing API integrations
* Existing business logic
* Existing responsive behavior
* Existing components where appropriate

This task is primarily a **UI/UX modernization**, not a backend rewrite.

---

## Integration Rule (rules/integate-rule.md)

### Frontend and Strapi CMS Integration Rules

### Integration workflow

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

### Strapi fetch rules

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

### Populate rule

If a field is displayed on the frontend, it must be populated.

Common populate examples:
- Component: `sections`, `formLabels`, `trustItems`
- Nested component: `footerSections`, `footerSections.links`
- Relation: `testimonials`, `appliesToProducts`, `footerSections.links.productPage`
- Media: `seo.ogImage`, `testimonials.avatar`, `siteLogo`

If data renders as missing but exists in CMS, check `populate` first.

### Component should be rule

CMS components should match how the frontend component reads and renders data.

A component should be:
- grouped by one visible frontend section
- used when several fields are edited together and rendered together
- repeatable only when the frontend renders a sortable list
- named by purpose, not by layout decoration
- small enough that editors can understand the form
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

### Locale rule

Every page integration must pass the current locale:
```ts
const { lang = "th" } = Astro.props;
const cmsData = await getSomePage(lang);
```

Do not hardcode only Thai or only English fetches.

### Internal URL normalization

CMS editors may enter:
- `/privacy/`
- `/th/privacy/`
- `/en/privacy/`
- `privacy/`

Frontend should normalize internal URLs to the current locale:
```ts
function normalizeInternalUrl(url?: string) {
  if (!url) return "#";
  if (/^(https?:|mailto:|tel:|#)/.test(url)) return url;
  const path = url.replace(/^\/(th|en)\//, "/");
  return path.startsWith("/") ? `${t.home}${path.replace(/^\//, "")}` : path;
}
```

### Fallback rule

Frontend must not break when CMS is unavailable, missing, unpublished, or partially empty.

Use fallback hierarchy:
1. CMS value
2. i18n/static value
3. safe default

Example:
```ts
const heroTitle = cmsData?.heroTitle || t.freeTrial.heroTitle;
```

### List rendering rule

Every repeatable CMS list must:
- filter inactive items
- sort by `sortOrder`
- handle empty arrays

```ts
const features = cmsData?.features
  ?.filter((item) => item.isActive !== false)
  .slice()
  .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0)) || [];
```

### Relation rendering rule

When a CMS component has both relation and manual URL:
1. Prefer relation.
2. Fall back to manual URL.
3. Normalize manual URL.

```ts
function getFooterLinkUrl(link) {
  if (link.productPage?.slug) return `${t.home}${link.productPage.slug}/`;
  return normalizeInternalUrl(link.url);
}
```

### Media rendering rule

Use Strapi media helpers for CMS media:
```ts
import { getStrapiAbsoluteImageUrl } from "../lib/strapi";
```

```astro
{testimonial.avatar && (
  <img
    src={getStrapiAbsoluteImageUrl(testimonial.avatar, "small")}
    alt={testimonial.customerName}
  />
)}
```

### SEO integration rule

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

Page-level SEO should control:
- `metaTitle`, `metaDescription`
- `ogTitle`, `ogDescription`, `ogImage`, `ogType`
- `canonicalUrl`
- robot settings: `noindex`, `nofollow`, `noarchive`, `nosnippet`
- preview settings: `maxSnippet`, `maxImagePreview`, `maxVideoPreview`
- `schemaType`, `keywords`, `alternateLanguages`

Global SEO config should control:
- `siteUrl`, `siteName`, `defaultTitle`, `defaultDescription`, `defaultOgImage`
- `brandName`, social URLs, analytics and pixel IDs

Fetch functions must populate both the SEO component and its media:
```ts
populate: [
  'seo',
  'seo.ogImage',
]
```

### Single-type duplicate rule

Strapi single types can become duplicated after schema changes or manual DB work.

If API data looks wrong:
- inspect all locale records for that single type
- keep the correct populated document
- remove stale duplicate locale records carefully

### Seed data rule

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

### API verification rule

After seeding or integration, verify the API directly.

Check:
- status is `200`
- components have expected counts
- relations have expected counts
- TH and EN both return populated data

### Build verification rule

Always run:
```bash
npm --prefix web run build
```

Build must complete with all pages generated.

### Generated HTML verification rule

After build, inspect generated HTML for the exact CMS data:
```bash
rg "Try iStock Express for Free|Request Your Free Trial Account" web/dist/en/free-trial/index.html
rg "ทดลองใช้ iStock Express ฟรี|กรอกข้อมูลเพื่อรับบัญชีทดลองใช้ฟรี" web/dist/th/free-trial/index.html
```

### Definition of done

CMS/frontend integration is done only when:
- schema is valid JSON
- TypeScript interfaces match schema
- fetch function populates all displayed fields
- Astro component renders CMS data and fallback
- TH and EN seed data exist
- relation counts are verified
- live CMS build passes
- generated HTML contains expected CMS content

---

## Schema Rule (rules/schema-rule.md)

### Strapi CMS Schema Rules

### 1. Naming and grouping

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

### 2. Single type vs collection type

- Use `singleType` for one editable page or site setting.
  - Homepage, About Us, Free Trial, Privacy Setting, Footer Setting, Global Setting
- Use `collectionType` for repeatable reusable records.
  - Product Page, Testimonial, Team Member, Partner, FAQ, Blog Post

### 3. Localization

- Page and site setting schemas should enable i18n.
- Text intended for users must be localized.
  - `title`, `subtitle`, `description`, `label`, `content`, `summary`, `badge`
- Technical values usually should not be localized.
  - `url`, `slug`, `sortOrder`, `isActive`, `target`, dates

### 4. Reusable component pattern

Use components for repeatable or grouped page content.

Good grouped section component fields:
- `badge`, `title`, `subtitle`
- section-specific CTA labels
- display state fields only when the frontend actually changes presentation

Common component fields:
- `title` or `label`
- `description` or `content`
- `sortOrder`, `isActive`

If a component appears in a list on the frontend, include:
- `sortOrder`: lower number appears first.
- `isActive`: allows hiding without deleting.

Component namespace rules:
- Use a feature namespace when the component is only meaningful inside one page or feature.
  - Example: `support.status-card`
- Use `shared.*` only when the component is intentionally reused across unrelated schemas.
  - Example: `shared.contact-info`, `shared.seo-meta`

### 5. Relation pattern

Use relations when editors should connect real CMS records instead of typing URLs manually.

Preferred relation rules:
- Keep manual `url` as fallback when relation is optional.
- If both relation and URL exist, frontend should prefer the relation.
- Relation fields must be populated in `web/src/lib/strapi.ts`.
- Relation display should use a useful main field such as `name`, `title`, or `pageTitle`.

### 6. SEO component rule

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
- `ogTitle`, `ogDescription`: localized Open Graph fields.
- `ogImage`: single image media field.
- `ogType`: `website`, `article`, or `product`.
- `canonicalUrl`: manual override only when needed.
- `noindex`, `nofollow`, `noarchive`, `nosnippet`: robot directives.
- `maxSnippet`, `maxImagePreview`, `maxVideoPreview`: robot preview settings.
- `schemaType`: structured data intent.
- `keywords`: localized keyword text.
- `alternateLanguages`: JSON only for exceptional hreflang overrides.

Site-wide SEO defaults belong in `global-setting.seoConfig`, not in page schemas.

Schema rules:
- Do not add flat SEO fields when `shared.seo-meta` exists.
- Do not duplicate global fields on page schemas.
- SEO text must be localized for TH and EN.
- `canonicalUrl` should not be required.
- Keep SEO at the end of the Content Manager layout.

### 7. Editor UX / field position

Field order should match how the frontend page is read.

Recommended page order:
1. Hero fields
2. Status, trust, or summary fields
3. Main body section components
4. Relations used by those sections
5. CTA/form fields
6. Legal/contact fields
7. Related links
8. Legacy fallback fields
9. SEO

Recommended component order:
1. Human-readable identifier: `title`, `label`, `name`
2. Display controls: `sortOrder`, `isActive`
3. Relation fields
4. Manual fallback fields such as `url`
5. Long content fields

For section components:
1. `badge`
2. `title`
3. `subtitle` or `description`
4. CTA labels
5. display/tone fields

Use `scripts/configure-cms-editor-layouts.mjs` after schema changes.

### 8. Frontend integration rule

Every schema field rendered on the website must be represented in:
- TypeScript interface in `web/src/lib/strapi.ts`
- `populate` list in the relevant fetch function
- Astro component rendering logic
- Fallback behavior if CMS data is missing

Frontend list rendering must:
- filter `isActive !== false`
- sort by `sortOrder`
- fallback to static/i18n content when CMS is missing

Frontend relation rendering must:
- prefer relation-derived URL when available
- normalize locale URLs for TH/EN
- avoid duplicating `/th/` or `/en/`

### 9. Seed data rule

If a schema is used by a page, provide a seed script when possible.

Seed scripts should:
- create TH and EN data
- publish single types
- include realistic mock content
- create or link relations
- avoid stale duplicate single-type records
- seed grouped section components with complete labels

Current seed scripts:
- `scripts/seed-about-us.mjs`
- `scripts/seed-footer-setting.mjs`
- `scripts/seed-privacy-setting.mjs`
- `scripts/seed-free-trial-page.mjs`
- `scripts/seed-support-page.mjs`

### 10. Verification checklist

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

---

## SEO Rule (rules/seo-rule.md)

### SEO Rule: CMS + Frontend

### System Roles

- CMS owns editable SEO content: titles, descriptions, social metadata, crawl directives, canonical input, schema type, keywords, and global tracking IDs.
- Frontend owns SEO rendering: HTML meta tags, canonical URL generation, hreflang links, robots meta format, sitemap, robots.txt, JSON-LD, and fallback defaults.

### CMS SEO Components

#### `shared.seo-meta`

Used for page-specific SEO metadata.

Source: `src/components/shared/seo-meta.json`

Fields:
- `metaTitle`: localized string, max `70` characters.
- `metaDescription`: localized text, max `160` characters.
- `ogTitle`: localized Open Graph title override.
- `ogDescription`: localized Open Graph description override.
- `ogImage`: single image media field.
- `ogType`: `website`, `article`, or `product`; default `website`.
- `canonicalUrl`: string field for canonical input.
- `noindex`: boolean; default `false`.
- `nofollow`: boolean; default `false`.
- `noarchive`: boolean; default `false`.
- `nosnippet`: boolean; default `false`.
- `maxSnippet`: integer; default `-1`.
- `maxImagePreview`: `none`, `standard`, or `large`; default `large`.
- `maxVideoPreview`: integer; default `-1`.
- `schemaType`: `WebPage`, `AboutPage`, `ProductPage`, `CollectionPage`, `FAQPage`, `ContactPage`, `Article`, or `SoftwareApplication`; default `WebPage`.
- `keywords`: localized text.
- `alternateLanguages`: JSON.

#### `shared.seo-config`

Used for site-wide SEO configuration through Global Settings.

Source: `src/components/shared/seo-config.json`

Fields:
- `siteUrl`: required string.
- `siteName`: required localized string.
- `defaultTitle`: localized string.
- `defaultDescription`: localized text.
- `defaultOgImage`: single image media field.
- `brandName`: localized string.
- `facebookUrl`, `lineUrl`, `linkedinUrl`, `youtubeUrl`: social profile URLs.
- `twitterHandle`: Twitter handle.
- `googleAnalyticsId`, `facebookPixelId`: tracking IDs.

### Frontend SEO Implementation

#### Meta Tags

The shared layout handles:
- title
- description
- keywords
- canonical
- OG/Twitter metadata
- robots
- hreflang

#### Canonical URL Generation

- Use CMS `canonicalUrl` only when explicitly set.
- Otherwise, generate canonical based on current page URL.
- Ensure TH pages point to TH canonical, EN pages point to EN canonical.

#### Hreflang Implementation

- Generate hreflang links for all supported locales.
- Use `alternateLanguages` JSON for exceptional overrides.

#### JSON-LD Structured Data

- Use `schemaType` from SEO component to determine structured data type.
- Generate appropriate JSON-LD for each page type.

### SEO Rules Summary

1. **Page-level SEO**: Use `shared.seo-meta` on every public page.
2. **Site-wide defaults**: Use `shared.seo-config` in Global Settings.
3. **Localization**: All SEO text must be localized for TH and EN.
4. **Frontend rendering**: Frontend handles HTML meta tags, canonical, hreflang, robots, JSON-LD.
5. **CMS content**: CMS owns editable SEO content and metadata.
6. **Verification**: Check generated HTML for correct meta tags and structured data.

---

## Cache Rule (rules/cache-rule.md)

### Cache System Architecture

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

### SSR In-Memory Cache

Location: `web/src/lib/cache.ts`

Functions:
- `cacheGet<T>(key)` - Get cached value
- `cacheSet<T>(key, value, ttlMs)` - Set cached value with TTL
- `cacheInvalidate(key?)` - Invalidate specific key or clear all
- `cacheStats()` - Get cache statistics
- `buildCacheKey(path, params)` - Build deterministic cache key

Default TTL: 60 seconds

### CDN Cache Headers

Location: `web/src/middleware.ts`

| Page Type | s-maxage | Example Pages |
|-----------|----------|---------------|
| Static | 3600s (1h) | `/about`, `/privacy`, `/terms` |
| Listing | 600s (10m) | `/products`, `/articles` |
| Detail | 1800s (30m) | `/products/*`, `/articles/*` |
| Default | 300s (5m) | All other pages |

Header format:
```
public, s-maxage={TTL}, max-age=0, stale-while-revalidate={SWR}
```

### Cache Invalidation

**Automatic (Strapi → Frontend):**
- Lifecycle hooks: `afterCreate`, `afterUpdate`, `afterDelete`, `afterBulkDelete`
- 500ms debounce window
- Calls `DELETE /api/cache` on frontend

**Manual (API):**
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
  "hitRate": "68.5%",
  "keys": ["strapi:free-trial?locale=th"]
}
```

### Environment Variables

```bash
CACHE_SECRET=your-secret-key          # Cache API authentication
FRONTEND_URL=http://localhost:4321    # Frontend URL for invalidation
SSR_CACHE_STATIC_MAX_AGE=3600        # Static pages (1 hour)
SSR_CACHE_LISTING_MAX_AGE=600        # Listing pages (10 minutes)
SSR_CACHE_DETAIL_MAX_AGE=1800        # Detail pages (30 minutes)
SSR_CACHE_DEFAULT_MAX_AGE=300        # Default pages (5 minutes)
SSR_CACHE_STALE_REVALIDATE=60        # Stale-while-revalidate (1 minute)
```

### Cache Rules

1. **Cache Key Determinism**: Always use `buildCacheKey()` to generate cache keys
2. **TTL Guidelines**: Static pages 1h, Listings 10m, Details 30m, User-specific 0s
3. **Invalidation Triggers**: Content create/update/delete, media changes, relation changes
4. **Error Handling**: Cache operations must not break the application
5. **Security**: Cache API requires `x-cache-secret` header
6. **Monitoring**: Hit rate should be > 60% for stable content

---

## Quick Reference

### Brand Colors
- Primary Blue: `#017FE4`
- White: `#FFFFFF`

### Project Stack
- **CMS**: Strapi
- **Frontend**: Astro
- **Languages**: Thai (TH) and English (EN)

### File Structure

```
rules/
├── cache-rule.md       # Caching architecture and rules
├── design-rule.md      # UI/UX design guidelines
├── integate-rule.md    # Frontend-CMS integration rules
├── schema-rule.md      # Strapi schema design rules
└── seo-rule.md         # SEO implementation rules
```

### Usage

When working on this project:
1. Read the relevant rule file before making changes
2. Follow the naming conventions and patterns defined
3. Test changes against the verification checklists
4. Ensure both TH and EN locales are considered

### Verification Checklist

After any schema/frontend integration:
1. Validate JSON schemas
2. Run `node --check` on changed scripts
3. Run `node scripts/configure-cms-editor-layouts.mjs`
4. Seed or update mock data
5. Verify API response with populated relations/components
6. Run `npm --prefix web run build`
7. Inspect generated HTML for real CMS text and relation URLs
