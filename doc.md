# Ryhts CMS API Documentation

> **Base URL:** `https://your-domain.com`
>
> **Strapi version:** 5.52.1 | **Locales:** `th` (default), `en`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Localization (i18n)](#localization)
3. [Collection Types (List)](#collection-types)
   - [Products](#products)
   - [Categories](#categories)
   - [Brands](#brands)
   - [Articles](#articles)
   - [Pages](#pages)
4. [Single Types (Settings)](#single-types)
   - [Site Setting](#site-setting)
   - [Footer Setting](#footer-setting)
   - [Global Setting](#global-setting)
   - [Company Info](#company-info)
   - [PDPA Setting](#pdpa-setting)
   - [Cookie Policy](#cookie-policy)
   - [Privacy Policy](#privacy-policy)
5. [PDPA & Cookie Consent](#pdpa--cookie-consent)
   - [Cookie Categories](#cookie-categories)
6. [Filtering & Sorting](#filtering--sorting)
6. [Pagination](#pagination)
7. [Populate (Relations & Media)](#populate)
8. [Field Selection](#field-selection)
9. [Response Format](#response-format)
10. [Error Handling](#error-handling)

---

## Authentication

All collection and single type endpoints are **public** (read-only). No authentication token is required for GET requests.

```
GET /api/products
```

> Write operations (POST, PUT, DELETE) require admin authentication.

---

## Localization

Every content entry supports **Thai (th)** and **English (en)** locales.

### Method 1: Accept-Language Header (Recommended)

The API automatically reads the `Accept-Language` header and returns the matching locale.

```bash
# Get Thai content
curl -H "Accept-Language: th" https://your-domain.com/api/products

# Get English content
curl -H "Accept-Language: en" https://your-domain.com/api/products
```

### Method 2: Query Parameter

Explicitly pass `?locale=` to override the header.

```
GET /api/products?locale=th
GET /api/products?locale=en
```

### Method 3: Get All Locales

```
GET /api/products?locale=*
```

### Behavior

| Scenario | Result |
|---|---|
| `Accept-Language: th` | Returns Thai content |
| `Accept-Language: en` | Returns English content |
| `Accept-Language: en-US,en;q=0.9` | Returns English (picks first match) |
| No header | Defaults to `th` |
| `?locale=en` + `Accept-Language: th` | Returns English (?locale wins) |

---

## Collection Types

Collection types return a **list** of entries with pagination.

### Products

Product catalog for thermal transfer ribbons.

```
GET /api/products
GET /api/products/:documentId
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Product name (required) |
| `slug` | uid | SEO-friendly URL (auto-generated from title) |
| `description` | richtext | Full product description |
| `short_description` | text | Brief summary (max 500 chars) |
| `price` | decimal | Product price |
| `ribbon_type` | enum | `wax` \| `wax_resin` \| `resin` |
| `sizes` | json | Available sizes |
| `compatibility` | text | Compatible printer models |
| `is_featured` | boolean | Featured product flag |
| `images` | media (multiple) | Product images |
| `brand` | relation | Brand (manyToOne) |
| `categories` | relation | Categories (manyToMany) |
| `meta_title` | string | SEO title |
| `meta_description` | text | SEO description (max 160) |
| `og_image` | media | Open Graph image |

#### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "Ribbon Wax",
      "slug": "ribbon-wax",
      "description": "...",
      "short_description": "Product for general use...",
      "price": 150.00,
      "ribbon_type": "wax",
      "sizes": ["110mm x 300m", "60mm x 300m"],
      "compatibility": "Zebra, TSC, SATO",
      "is_featured": true,
      "images": [
        {
          "id": 1,
          "name": "ribbon-wax.jpg",
          "url": "/uploads/ribbon-wax.jpg",
          "width": 800,
          "height": 600
        }
      ],
      "brand": {
        "id": 1,
        "name": "Brand A",
        "slug": "brand-a",
        "logo": { ... }
      },
      "categories": [
        { "id": 1, "name": "Wax", "slug": "wax" }
      ],
      "meta_title": "Ribbon Wax - Ryhts",
      "meta_description": "Best wax ribbon for barcode printers",
      "og_image": { ... }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

---

### Categories

Product categories (Wax, Wax Resin, Resin).

```
GET /api/categories
GET /api/categories/:documentId
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Category name (required) |
| `slug` | uid | SEO-friendly URL |
| `description` | text | Category description |
| `image` | media | Category image |
| `meta_title` | string | SEO title |
| `meta_description` | text | SEO description (max 160) |
| `og_image` | media | Open Graph image |
| `products` | relation | Products in this category (oneToMany) |

---

### Brands

Ribbon brands carried by Ryhts.

```
GET /api/brands
GET /api/brands/:documentId
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Brand name (required) |
| `slug` | uid | SEO-friendly URL |
| `logo` | media | Brand logo |
| `description` | text | Brand description |
| `meta_title` | string | SEO title |
| `meta_description` | text | SEO description (max 160) |
| `og_image` | media | Open Graph image |
| `products` | relation | Products by this brand (oneToMany) |

---

### Articles

Blog posts, news, and product announcements.

```
GET /api/articles
GET /api/articles/:documentId
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Article title (required) |
| `slug` | uid | SEO-friendly URL |
| `content` | richtext | Full article body |
| `excerpt` | text | Short summary (max 500 chars) |
| `featured_image` | media | Cover image |
| `author` | string | Author name |
| `article_date` | datetime | Publication date |
| `tags` | json | Array of tag strings |
| `views` | integer | View counter (default: 0) |
| `meta_title` | string | SEO title |
| `meta_description` | text | SEO description (max 160) |
| `og_image` | media | Open Graph image |

#### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "xyz789",
      "title": "New Ribbon Product Launch",
      "slug": "new-ribbon-product-launch",
      "content": "...",
      "excerpt": "We are excited to announce...",
      "featured_image": { ... },
      "author": "Admin",
      "article_date": "2024-08-15T00:00:00.000Z",
      "tags": ["product", "new", "ribbon"],
      "views": 89,
      "meta_title": "New Ribbon Launch | Ryhts",
      "meta_description": "Check out our latest ribbon product",
      "og_image": { ... }
    }
  ],
  "meta": {
    "pagination": { ... }
  }
}
```

---

### Pages

Static pages (About, Contact, etc.).

```
GET /api/pages
GET /api/pages/:documentId
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Page title (required) |
| `slug` | uid | SEO-friendly URL |
| `content` | richtext | Page body |
| `meta_title` | string | SEO title |
| `meta_description` | text | SEO description |
| `featured_image` | media | Header/cover image |
| `og_image` | media | Open Graph image |

---

## PDPA & Cookie Consent

### Cookie Categories

Cookie consent categories for the consent popup (Necessary, Analytics, Marketing, etc.).

```
GET /api/cookie-categories
GET /api/cookie-categories/:documentId
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Category name (required) |
| `slug` | uid | SEO-friendly URL |
| `description` | text | What this category is for |
| `is_required` | boolean | Cannot be disabled by user (default: `false`) |
| `is_default_enabled` | boolean | Toggled on by default (default: `false`) |
| `sort_order` | integer | Display order in consent popup (default: 0) |
| `cookies` | json | Array of cookies in this category |
| `privacy_policy_url` | string | Link to more info |

#### Example `cookies` JSON

```json
[
  {
    "name": "_ga",
    "provider": "Google",
    "purpose": "Analytics",
    "duration": "2 years",
    "type": "HTTP"
  },
  {
    "name": "_gid",
    "provider": "Google",
    "purpose": "Analytics",
    "duration": "24 hours",
    "type": "HTTP"
  }
]
```

#### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "name": "Necessary",
      "slug": "necessary",
      "description": "Essential cookies for the website to function",
      "is_required": true,
      "is_default_enabled": true,
      "sort_order": 0,
      "cookies": [
        { "name": "session_id", "provider": "Ryhts", "purpose": "Session", "duration": "Session", "type": "HTTP" }
      ],
      "locale": "th"
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 4 }
  }
}
```

---

## Single Types

Single types return **one object** directly (not wrapped in an array).

### Site Setting

General site configuration.

```
GET /api/site-setting
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `site_name` | string | Company/site name (required) |
| `site_logo` | media | Main logo |
| `site_favicon` | media | Browser favicon |
| `site_description` | text | Site tagline/description |
| `currency` | string | Currency code (default: `THB`) |
| `phone` | string | Contact phone |
| `email` | email | Contact email |

#### Example Response

```json
{
  "data": {
    "id": 1,
    "site_name": "Ryhts Ribbon",
    "site_logo": {
      "id": 1,
      "name": "logo.png",
      "url": "/uploads/logo.png"
    },
    "site_favicon": { ... },
    "site_description": "Premier Ribbon for Premier Printing",
    "currency": "THB",
    "phone": "094-624-6649",
    "email": "info@ryhts.com"
  }
}
```

---

### Footer Setting

Footer content configuration.

```
GET /api/footer-setting
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `copyright_text` | string | Copyright notice |
| `social_links` | json | Social media links object |
| `footer_links` | json | Footer navigation links |
| `newsletter_text` | text | Newsletter signup text |

#### Example `social_links` structure

```json
{
  "facebook": "https://facebook.com/ryhts",
  "line": "https://line.me/ti/p/@ryhts",
  "instagram": "https://instagram.com/ryhts"
}
```

#### Example `footer_links` structure

```json
[
  { "label": "About Us", "url": "/about" },
  { "label": "Products", "url": "/products" },
  { "label": "Contact", "url": "/contact" }
]
```

---

### Global Setting

Global SEO and analytics configuration.

```
GET /api/global-setting
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `meta_title` | string | Default site title |
| `meta_description` | text | Default meta description |
| `og_image` | media | Default Open Graph image |
| `google_analytics_id` | string | GA measurement ID (e.g. `G-XXXXXXXXXX`) |
| `facebook_pixel_id` | string | Facebook Pixel ID |
| `twitter_handle` | string | Twitter/X handle |

---

### Company Info

Company contact and business information.

```
GET /api/company-info
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `company_name` | string | Company name in Thai (required) |
| `company_name_en` | string | Company name in English |
| `address` | text | Full address |
| `phone` | string | Phone number |
| `email` | email | Contact email |
| `map_link` | string | Google Maps link |
| `business_hours` | text | Working hours |
| `customer_count` | integer | Customer count badge (default: 0) |
| `contact_form_title` | string | Contact form heading |

#### Example Response

```json
{
  "data": {
    "id": 1,
    "company_name": "บริษัท ไรต์ส จำกัด",
    "company_name_en": "Ryhts Co., Ltd.",
    "address": "เลขที่ 2 ซอยโพธิ์แก้ว 3 แยก 27, แขวงคลองจั่น, เขตบางกะปิ, กรุงเทพมหานคร 10240",
    "phone": "094-624-6649",
    "email": "info@ryhts.com",
    "map_link": "https://maps.app.goo.gl/CrSyTzvsdBBkzxhf8",
    "business_hours": "เวลา 8:30 - 17:30 น. วันจันทร์ - วันศุกร์",
    "customer_count": 257,
    "contact_form_title": "Write a message"
  }
}
```

---

### PDPA Setting

PDPA compliance configuration — DPO info, consent banner, data retention.

```
GET /api/pdpa-setting
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `company_name` | string | Company name registered under PDPA (required) |
| `dpo_name` | string | Data Protection Officer name |
| `dpo_email` | email | DPO contact email |
| `dpo_phone` | string | DPO contact phone |
| `dpo_position` | string | DPO job title |
| `data_retention_days` | integer | Default retention period in days (default: 365) |
| `data_retention_description` | text | Retention policy explanation |
| `consent_banner_title` | string | Cookie consent banner heading |
| `consent_banner_description` | text | Consent banner description |
| `consent_accept_all_text` | string | "Accept All" button text (default: "Accept All") |
| `consent_reject_all_text` | string | "Reject All" button text (default: "Reject All") |
| `consent_manage_text` | string | "Manage Preferences" button text |
| `consent_save_text` | string | "Save Preferences" button text |
| `privacy_policy_url` | string | Link to full privacy policy page |
| `cookie_policy_url` | string | Link to full cookie policy page |
| `rights_text` | richtext | Data subject rights (access, rectify, erase, etc.) |
| `third_parties_text` | richtext | Third-party data sharing disclosure |
| `contact_text` | text | Instructions for contacting DPO |
| `is_active` | boolean | Enable/disable PDPA features (default: `true`) |

#### Example Response

```json
{
  "data": {
    "id": 1,
    "company_name": "บริษัท ไรต์ส จำกัด",
    "dpo_name": "Data Protection Officer",
    "dpo_email": "dpo@ryhts.com",
    "dpo_phone": "094-624-6649",
    "dpo_position": "Compliance Officer",
    "data_retention_days": 365,
    "data_retention_description": "We retain your personal data for up to 1 year...",
    "consent_banner_title": "We use cookies",
    "consent_banner_description": "This website uses cookies to enhance your experience.",
    "consent_accept_all_text": "Accept All",
    "consent_reject_all_text": "Reject All",
    "consent_manage_text": "Manage Preferences",
    "consent_save_text": "Save Preferences",
    "privacy_policy_url": "/privacy-policy",
    "cookie_policy_url": "/cookie-policy",
    "rights_text": "...",
    "third_parties_text": "...",
    "contact_text": "Contact our DPO at dpo@ryhts.com",
    "is_active": true,
    "locale": "th"
  }
}
```

---

### Cookie Policy

Cookie policy page content.

```
GET /api/cookie-policy
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Page title (default: "Cookie Policy") (required) |
| `description` | text | Short summary |
| `content` | richtext | Full cookie policy body |
| `last_updated` | datetime | Last update date |
| `meta_title` | string | SEO title |
| `meta_description` | text | SEO description (max 160) |

#### Example Response

```json
{
  "data": {
    "id": 1,
    "title": "Cookie Policy",
    "description": "How we use cookies on this website",
    "content": "...",
    "last_updated": "2024-08-15T00:00:00.000Z",
    "meta_title": "Cookie Policy | Ryhts",
    "meta_description": "Learn about the cookies we use on our website",
    "locale": "th"
  }
}
```

---

### Privacy Policy

Privacy policy page content (PDPA-compliant).

```
GET /api/privacy-policy
```

#### Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Page title (default: "Privacy Policy") (required) |
| `description` | text | Short summary |
| `content` | richtext | Full privacy policy body |
| `effective_date` | datetime | Date policy took effect |
| `last_updated` | datetime | Last update date |
| `meta_title` | string | SEO title |
| `meta_description` | text | SEO description (max 160) |
| `og_image` | media | Open Graph image |

#### Example Response

```json
{
  "data": {
    "id": 1,
    "title": "Privacy Policy",
    "description": "How we collect, use, and protect your personal data",
    "content": "...",
    "effective_date": "2024-06-01T00:00:00.000Z",
    "last_updated": "2024-08-15T00:00:00.000Z",
    "meta_title": "Privacy Policy | Ryhts",
    "meta_description": "Ryhts privacy policy - how we handle your data under PDPA",
    "og_image": { ... },
    "locale": "th"
  }
}
```

---

## Filtering & Sorting

### Basic Filtering

```
GET /api/products?filters[ribbon_type][$eq]=wax
GET /api/products?filters[price][$lte]=200
GET /api/products?filters[is_featured][$eq]=true
```

### Common Filter Operators

| Operator | Example | Description |
|---|---|---|
| `$eq` | `filters[name][$eq]=Wax` | Equals |
| `$ne` | `filters[name][$ne]=Resin` | Not equals |
| `$lt` | `filters[price][$lt]=200` | Less than |
| `$lte` | `filters[price][$lte]=200` | Less than or equal |
| `$gt` | `filters[price][$gt]=100` | Greater than |
| `$gte` | `filters[price][$gte]=100` | Greater than or equal |
| `$in` | `filters[ribbon_type][$in]=wax,resin` | In array |
| `$notIn` | `filters[ribbon_type][$notIn]=resin` | Not in array |
| `$contains` | `filters[title][$contains]=Ribbon` | Contains (case-sensitive) |
| `$containsi` | `filters[title][$containsi]=ribbon` | Contains (case-insensitive) |
| `$startsWith` | `filters[title][$startsWith]=Ribbon` | Starts with |
| `$endsWith` | `filters[title][$endsWith]=Wax` | Ends with |
| `$null` | `filters[description][$null]=true` | Is null |
| `$notNull` | `filters[description][$notNull]=true` | Is not null |

### Filtering on Relations

```
GET /api/products?filters[brand][name][$eq]=BrandA
GET /api/products?filters[categories][name][$eq]=Wax
```

### Sorting

```
GET /api/products?sort=title:asc
GET /api/products?sort=price:desc
GET /api/products?sort=createdAt:desc
GET /api/products?sort=article_date:desc
```

Multiple sorts:

```
GET /api/articles?sort[0]=article_date:desc&sort[1]=title:asc
```

---

## Pagination

```
GET /api/products?page=1&pageSize=10
```

| Parameter | Default | Description |
|---|---|---|
| `page` | 1 | Page number |
| `pageSize` | 25 | Items per page (max 100) |

### Response

```json
{
  "data": [...],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

---

## Populate

By default, relations and media are **not populated**. Use `populate` to include them.

### Populate All

```
GET /api/products?populate=*
```

### Populate Specific Fields

```
GET /api/products?populate[brand]=true&populate[categories]=true&populate[images]=true
```

### Deeply Populate (Nested Relations)

```
GET /api/products?populate[brand][populate][logo]=true&populate[categories][populate][image]=true
```

### Populate Media with Dimensions

```
GET /api/products?populate[images][populate][formats]=true
```

This returns thumbnail, small, medium, and large versions:

```json
{
  "images": [
    {
      "id": 1,
      "name": "ribbon-wax.jpg",
      "url": "/uploads/ribbon-wax.jpg",
      "width": 1200,
      "height": 800,
      "formats": {
        "thumbnail": { "url": "/uploads/thumbnail_ribbon-wax.jpg", "width": 234, "height": 156 },
        "small": { "url": "/uploads/small_ribbon-wax.jpg", "width": 500, "height": 333 },
        "medium": { "url": "/uploads/medium_ribbon-wax.jpg", "width": 750, "height": 500 }
      }
    }
  ]
}
```

### Common Populate Combinations

```bash
# Product with all relations
GET /api/products?populate[brand]=true&populate[categories]=true&populate[images]=true&populate[og_image]=true

# Category with products
GET /api/categories?populate[products][populate][images]=true

# Article with featured image
GET /api/articles?populate[featured_image]=true&populate[og_image]=true

# All content with everything
GET /api/products?populate=*
```

---

## Field Selection

Only return specific fields to reduce payload size.

```
GET /api/products?fields[0]=title&fields[1]=slug&fields[2]=price
```

---

## Response Format

### Collection Types

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "title": "...",
      "createdAt": "2024-08-15T10:00:00.000Z",
      "updatedAt": "2024-08-15T10:00:00.000Z",
      "publishedAt": "2024-08-15T10:00:00.000Z",
      "locale": "th"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 1
    }
  }
}
```

### Single Types

```json
{
  "data": {
    "id": 1,
    "documentId": "xyz789",
    "site_name": "...",
    "createdAt": "2024-08-15T10:00:00.000Z",
    "updatedAt": "2024-08-15T10:00:00.000Z",
    "publishedAt": "2024-08-15T10:00:00.000Z",
    "locale": "th"
  }
}
```

### Common Fields (All Entries)

| Field | Type | Description |
|---|---|---|
| `id` | integer | Database ID |
| `documentId` | string | Document identifier (use this for updates) |
| `createdAt` | datetime | Creation timestamp |
| `updatedAt` | datetime | Last update timestamp |
| `publishedAt` | datetime | Publication timestamp |
| `locale` | string | Locale code (`th` or `en`) |

---

## Error Handling

### HTTP Status Codes

| Code | Meaning |
|---|---|
| `200` | Success |
| `400` | Bad Request (invalid query) |
| `403` | Forbidden (no permission) |
| `404` | Not Found |
| `500` | Server Error |

### Error Response Format

```json
{
  "data": null,
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Not Found",
    "details": {}
  }
}
```

---

## Quick Reference — All Endpoints

| Endpoint | Type | Description |
|---|---|---|
| `GET /api/products` | Collection | List products |
| `GET /api/products/:documentId` | Collection | Get single product |
| `GET /api/categories` | Collection | List categories |
| `GET /api/categories/:documentId` | Collection | Get single category |
| `GET /api/brands` | Collection | List brands |
| `GET /api/brands/:documentId` | Collection | Get single brand |
| `GET /api/articles` | Collection | List articles |
| `GET /api/articles/:documentId` | Collection | Get single article |
| `GET /api/pages` | Collection | List pages |
| `GET /api/pages/:documentId` | Collection | Get single page |
| `GET /api/cookie-categories` | Collection | List cookie consent categories |
| `GET /api/cookie-categories/:documentId` | Collection | Get single cookie category |
| `GET /api/site-setting` | Single | Get site settings |
| `GET /api/footer-setting` | Single | Get footer settings |
| `GET /api/global-setting` | Single | Get global/SEO settings |
| `GET /api/company-info` | Single | Get company information |
| `GET /api/pdpa-setting` | Single | Get PDPA compliance settings |
| `GET /api/cookie-policy` | Single | Get cookie policy content |
| `GET /api/privacy-policy` | Single | Get privacy policy content |

---

## Common Usage Examples

### Homepage

```bash
# Featured products (Thai)
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/products?filters[is_featured][$eq]=true&populate=*"

# Site settings
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/site-setting"

# Company info
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/company-info"

# Global SEO
curl "https://your-domain.com/api/global-setting"
```

### Product Listing Page

```bash
# All wax products, sorted by price
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/products?filters[ribbon_type][$eq]=wax&sort=price:asc&populate[brand]=true&populate[categories]=true&populate[images]=true"
```

### Product Detail Page

```bash
# Get product by slug
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/products?filters[slug][$eq]=ribbon-wax&populate=*"
```

### Blog Listing

```bash
# Latest articles, page 2
curl -H "Accept-Language: en" \
  "https://your-domain.com/api/articles?sort=article_date:desc&page=2&pageSize=10&populate[featured_image]=true"
```

### Category with Products

```bash
# Wax category with its products
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/categories?filters[slug][$eq]=wax&populate[products][populate][images]=true&populate[products][populate][brand]=true"
```

### Static Page (About, Contact)

```bash
# Get page by slug
curl -H "Accept-Language: en" \
  "https://your-domain.com/api/pages?filters[slug][$eq]=about-ryhts&populate=*"
```

### Footer Data

```bash
# Footer settings + company info
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/footer-setting"

curl -H "Accept-Language: th" \
  "https://your-domain.com/api/company-info"
```

### PDPA & Cookie Consent

```bash
# PDPA settings (for consent banner)
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/pdpa-setting"

# Cookie categories (for consent popup)
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/cookie-categories?sort=sort_order:asc"

# Cookie policy page
curl -H "Accept-Language: th" \
  "https://your-domain.com/api/cookie-policy"

# Privacy policy page
curl -H "Accept-Language: en" \
  "https://your-domain.com/api/privacy-policy"
```

---

## Front-end Integration Tips

### JavaScript / Fetch

```javascript
const BASE_URL = 'https://your-domain.com';

async function getProducts(locale = 'th') {
  const res = await fetch(`${BASE_URL}/api/products?populate=*`, {
    headers: { 'Accept-Language': locale }
  });
  return res.json();
}

async function getSiteSettings(locale = 'th') {
  const res = await fetch(`${BASE_URL}/api/site-setting`, {
    headers: { 'Accept-Language': locale }
  });
  return res.json();
}

// PDPA settings + cookie categories for consent banner
async function getPdpaSettings(locale = 'th') {
  const [pdpa, categories] = await Promise.all([
    fetch(`${BASE_URL}/api/pdpa-setting`, {
      headers: { 'Accept-Language': locale }
    }).then(r => r.json()),
    fetch(`${BASE_URL}/api/cookie-categories?sort=sort_order:asc`, {
      headers: { 'Accept-Language': locale }
    }).then(r => r.json())
  ]);
  return { pdpaSettings: pdpa.data, cookieCategories: categories.data };
}
```

### Next.js

```javascript
// app/[locale]/products/page.js
async function getProducts(locale) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?populate=*`, {
    headers: { 'Accept-Language': locale },
    next: { revalidate: 60 }
  });
  return res.json();
}
```

### Nuxt.js

```javascript
// composables/useProducts.js
export const useProducts = async (locale = 'th') => {
  const { data } = await useFetch('/api/products', {
    baseURL: 'https://your-domain.com',
    headers: { 'Accept-Language': locale },
    query: { populate: '*' }
  });
  return data;
};
```

### React / Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-domain.com',
});

export const getProducts = async (locale = 'th') => {
  const { data } = await api.get('/api/products', {
    headers: { 'Accept-Language': locale },
    params: { populate: '*' }
  });
  return data;
};
```
