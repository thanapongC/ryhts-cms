/**
 * Mock/Fallback Data for Strapi CMS
 *
 * Used when the CMS is offline, unreachable, or returns empty data.
 * This ensures the frontend always has content to display.
 *
 * Rules: integate-rule.md §6
 */

import type {
  SiteSetting,
  GlobalSetting,
  FooterSetting,
  Product,
  Category,
  Brand,
  Article,
  CompanyInfo,
  AboutPage,
  ContactPage,
  PrivacyPolicy,
  PdpaSetting,
  TermsOfService,
  CookiePolicy,
  CookieCategory,
  CookieSetting,
  ContactFloating,
  Navigation,
} from "./strapi";


// ─── Branded placeholder image URLs ────────────────────────────────

const IMG = {
  productWax: "https://placehold.co/800x600/fef3c7/b45309?text=Ribbon+Wax",
  productWaxResin:
    "https://placehold.co/800x600/dbafe/1e40af?text=Wax-Resin",
  productResin:
    "https://placehold.co/800x600/dcfce7/166534?text=Resin+Ribbon",
  article: "https://placehold.co/1200x630/017fe4/ffffff?text=Ryhts+Article",
  category: "https://placehold.co/400x300/f0f4ff/017fe4?text=Category",
  logo: "https://placehold.co/200x80/017fe4/ffffff?text=RYHTS",
  og: "https://placehold.co/1200x630/017fe4/ffffff?text=Ryhts+Ribbon",
};

// ─── Mock Brands ───────────────────────────────────────────────────

export const mockBrands: Brand[] = [
  {
    id: 1,
    documentId: "mock-brand-1",
    name: "Ricoh",
    slug: "ricoh",
    logo: { id: 101, name: "ricoh-logo.png", url: IMG.logo, alternativeText: "Ricoh" },
    description: "High-quality thermal transfer ribbons from Ricoh.",
    products: [],
  },
  {
    id: 2,
    documentId: "mock-brand-2",
    name: "CSoft",
    slug: "csoft",
    logo: { id: 102, name: "csoft-logo.png", url: IMG.logo, alternativeText: "CSoft" },
    description: "CSoft ribbons offer premium printing solutions.",
    products: [],
  },
  {
    id: 3,
    documentId: "mock-brand-3",
    name: "Armor",
    slug: "armor",
    logo: { id: 103, name: "armor-logo.png", url: IMG.logo, alternativeText: "Armor" },
    description: "ARMOR AXR thermal transfer ribbons — European quality.",
    products: [],
  },
];

// ─── Mock Categories ───────────────────────────────────────────────

export const mockCategories: Category[] = [
  {
    id: 1,
    documentId: "mock-cat-1",
    name: "Ribbon Wax",
    slug: "ribbon-wax",
    description: "ริบบอนแบบ Wax เหมาะสำหรับการพิมพ์บาร์โค้ดทั่วไป",
    image: { id: 201, name: "wax.png", url: IMG.category, alternativeText: "Ribbon Wax" },
    products: [],
  },
  {
    id: 2,
    documentId: "mock-cat-2",
    name: "Ribbon Wax-Resin",
    slug: "ribbon-wax-resin",
    description: "ริบบอนแบบ Wax-Resin ผสมผสานความคุ้มค่าของ Wax กับความทนทานของ Resin",
    image: { id: 202, name: "wax-resin.png", url: IMG.category, alternativeText: "Ribbon Wax-Resin" },
    products: [],
  },
  {
    id: 3,
    documentId: "mock-cat-3",
    name: "Ribbon Resin",
    slug: "ribbon-resin",
    description: "ริบบอนแบบ Resin ทนทานสูงสุด",
    image: { id: 203, name: "resin.png", url: IMG.category, alternativeText: "Ribbon Resin" },
    products: [],
  },
];

// ─── Mock Products ─────────────────────────────────────────────────

export const mockProducts: Product[] = [
  {
    id: 1,
    documentId: "mock-prod-1",
    title: "Ribbon Wax Premium 110x300",
    slug: "ribbon-wax-premium-110x300",
    description: "<p>ริบบอน Wax คุณภาพสูง ขนาด 110mm x 300m</p>",
    short_description: "ริบบอน Wax คุณภาพสูง ขนาด 110x300mm",
    price: 350,
    ribbon_type: "wax",
    sizes: ["110mm x 300m", "80mm x 300m"],
    compatibility: "Zebra, TSC, SATO, Honeywell",
    is_featured: true,
    images: [{ id: 301, name: "wax.jpg", url: IMG.productWax, alternativeText: "Ribbon Wax Premium" }],
    brand: mockBrands[0],
    categories: [mockCategories[0]],
    publishedAt: "2025-01-15T10:00:00.000Z",
  },
  {
    id: 2,
    documentId: "mock-prod-2",
    title: "Ribbon Wax-Resin Premium 110x300",
    slug: "ribbon-wax-resin-premium-110x300",
    description: "<p>ริบบอน Wax-Resin คุณภาพสูง</p>",
    short_description: "ริบบอน Wax-Resin คุณภาพสูง ทนทานต่อแสง UV",
    price: 550,
    ribbon_type: "wax_resin",
    sizes: ["110mm x 300m"],
    compatibility: "Zebra, TSC, SATO",
    is_featured: true,
    images: [{ id: 302, name: "wax-resin.jpg", url: IMG.productWaxResin, alternativeText: "Ribbon Wax-Resin" }],
    brand: mockBrands[1],
    categories: [mockCategories[1]],
    publishedAt: "2025-01-20T10:00:00.000Z",
  },
  {
    id: 3,
    documentId: "mock-prod-3",
    title: "Ribbon Resin Premium 110x300",
    slug: "ribbon-resin-premium-110x300",
    description: "<p>ริบบอน Resin คุณภาพสูงสุด</p>",
    short_description: "ริบบอน Resin ทนทานสูงสุด สำหรับงานอุตสาหกรรม",
    price: 850,
    ribbon_type: "resin",
    sizes: ["110mm x 300m"],
    compatibility: "Zebra, TSC, SATO, Honeywell",
    is_featured: true,
    images: [{ id: 303, name: "resin.jpg", url: IMG.productResin, alternativeText: "Ribbon Resin" }],
    brand: mockBrands[2],
    categories: [mockCategories[2]],
    publishedAt: "2025-02-01T10:00:00.000Z",
  },
  {
    id: 4,
    documentId: "mock-prod-4",
    title: "Ribbon Wax Economy 80x300",
    slug: "ribbon-wax-economy-80x300",
    description: "<p>ริบบอน Wax ราคาประหยัด</p>",
    short_description: "ริบบอน Wax ราคาประหยัด ขนาด 80x300mm",
    price: 250,
    ribbon_type: "wax",
    sizes: ["80mm x 300m"],
    compatibility: "Zebra, TSC",
    is_featured: false,
    images: [{ id: 304, name: "wax-econ.jpg", url: IMG.productWax, alternativeText: "Ribbon Wax Economy" }],
    brand: mockBrands[0],
    categories: [mockCategories[0]],
    publishedAt: "2025-02-10T10:00:00.000Z",
  },
  {
    id: 5,
    documentId: "mock-prod-5",
    title: "Ribbon Wax-Resin Industrial 110x450",
    slug: "ribbon-wax-resin-industrial-110x450",
    description: "<p>ริบบอน Wax-Resin อุตสาหกรรม</p>",
    short_description: "ริบบอน Wax-Resin อุตสาหกรรม ขนาด 110x450mm",
    price: 750,
    ribbon_type: "wax_resin",
    sizes: ["110mm x 450m"],
    compatibility: "Zebra ZT series",
    is_featured: false,
    images: [{ id: 305, name: "wax-resin-ind.jpg", url: IMG.productWaxResin, alternativeText: "Ribbon Wax-Resin Industrial" }],
    brand: mockBrands[1],
    categories: [mockCategories[1]],
    publishedAt: "2025-02-15T10:00:00.000Z",
  },
  {
    id: 6,
    documentId: "mock-prod-6",
    title: "Ribbon Resin Chemical Resistant 110x300",
    slug: "ribbon-resin-chemical-resistant-110x300",
    description: "<p>ริบบอน Resin ทนสารเคมี</p>",
    short_description: "ริบบอน Resin ทนสารเคมี สำหรับงานโรงงาน",
    price: 950,
    ribbon_type: "resin",
    sizes: ["110mm x 300m"],
    compatibility: "Zebra ZT series, Honeywell PM series",
    is_featured: false,
    images: [{ id: 306, name: "resin-chem.jpg", url: IMG.productResin, alternativeText: "Ribbon Resin Chemical" }],
    brand: mockBrands[2],
    categories: [mockCategories[2]],
    publishedAt: "2025-03-01T10:00:00.000Z",
  },
];

// ─── Mock Articles ─────────────────────────────────────────────────

export const mockArticles: Article[] = [
  {
    id: 1,
    documentId: "mock-art-1",
    title: "วิธีเลือกริบบอนให้เหมาะกับเครื่องพิมพ์ของคุณ",
    slug: "how-to-choose-ribbon-for-your-printer",
    content: "<h2>ริบบอนมีกี่แบบ?</h2><p>ริบบอนมี 3 ประเภท: Wax, Wax-Resin, Resin</p>",
    excerpt: "เรียนรู้วิธีเลือกริบบอนให้เหมาะสม",
    featured_image: { id: 401, name: "choose-ribbon.jpg", url: IMG.article, alternativeText: "วิธีเลือกริบบอน" },
    author: "Ryhts Team",
    article_date: "2025-03-10",
    tags: ["ริบบอน", "บาร์โค้ด"],
    views: 156,
    category: mockCategories[0],
    publishedAt: "2025-03-10T10:00:00.000Z",
  },
  {
    id: 2,
    documentId: "mock-art-2",
    title: "สินค้าใหม่: Ribbon Wax Premium Series 2025",
    slug: "new-product-ribbon-wax-premium-2025",
    content: "<p>แนะนำสินค้าใหม่ Ribbon Wax Premium Series 2025</p>",
    excerpt: "แนะนำสินค้าใหม่ Ribbon Wax Premium Series 2025",
    featured_image: { id: 402, name: "new-2025.jpg", url: IMG.article, alternativeText: "สินค้าใหม่ 2025" },
    author: "Ryhts Team",
    article_date: "2025-02-20",
    tags: ["สินค้าใหม่", "ริบบอน"],
    views: 89,
    category: mockCategories[0],
    publishedAt: "2025-02-20T10:00:00.000Z",
  },
  {
    id: 3,
    documentId: "mock-art-3",
    title: "เทคนิคการดูแลริบบอนให้ใช้งานได้นาน",
    slug: "tips-for-ribbon-maintenance",
    content: "<p>เทคนิคดูแลริบบอนให้ใช้งานได้นาน</p>",
    excerpt: "เทคนิคดูแลริบบอนให้ใช้งานได้นาน",
    featured_image: { id: 403, name: "maintenance.jpg", url: IMG.article, alternativeText: "เทคนิคดูแลริบบอน" },
    author: "Ryhts Team",
    article_date: "2025-01-25",
    tags: ["เทคนิค", "การดูแล"],
    views: 67,
    publishedAt: "2025-01-25T10:00:00.000Z",
  },
];

// ─── Mock Pages (legacy) ───────────────────────────────────────────

export const mockPages: Record<string, { title: string; slug: string; content: string }> = {
  "about-ryhts": { title: "เกี่ยวกับ Ryhts", slug: "about-ryhts", content: "" },
  "contact-us": { title: "ติดต่อเรา", slug: "contact-us", content: "" },
};

// ─── Mock Single Types ─────────────────────────────────────────────

export const mockSiteSetting: SiteSetting = {
  site_name: "RYHTS",
  site_logo: { id: 501, name: "logo.png", url: IMG.logo, alternativeText: "Ryhts Ribbon" },
  site_favicon: null,
  site_description: "Premier Ribbons for Premier Printing",
  currency: "THB",
  phone: "094-624-6649",
  email: "info@ryhts.com",
};

export const mockGlobalSetting: GlobalSetting = {
  site_name: "RYHTS",
  site_logo: { id: 501, name: "logo.png", url: IMG.logo, alternativeText: "Ryhts Ribbon" },
  contact_info: [
    { label: "Phone", value: "094-624-6649", icon: "fa-phone", url: "tel:0946246649" },
    { label: "Email", value: "info@ryhts.com", icon: "fa-envelope", url: "mailto:info@ryhts.com" },
  ],
  stats: [
    { label: "Customers", value: "257+", icon: "fa-users" },
    { label: "Products", value: "100+", icon: "fa-box" },
  ],
  seoConfig: {
    site_url: "https://ryhts.com",
    site_name: "Ryhts Ribbon",
    default_title: "RYHTS - Premier Ribbons for Premier Printing",
    default_description: "Premier Ribbons for Premier Printing",
    brand_name: "Ryhts Ribbon",
    google_analytics_id: "",
    facebook_pixel_id: "",
    twitter_handle: "",
  },
};

export const mockFooterSetting: FooterSetting = {
  cta_badge: "ติดต่อเรา",
  cta_title: "พร้อมให้บริการ",
  cta_description: "สอบถามข้อมูลสินค้าและบริการจากทีมงาน Ryhts",
  primary_cta_label: "ติดต่อฝ่ายขาย",
  primary_cta_url: "/contact",
  secondary_cta_label: "โทรเลย",
  secondary_cta_url: "tel:0946246649",
  stats: [
    { label: "Customers", value: "257+" },
    { label: "Products", value: "100+" },
  ],
  company_description: "Ryhts Ribbon ผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ดชั้นนำ",
  social_links: {
    facebook: "https://facebook.com/ryhts",
    line: "https://line.me/ti/p/@ryhts",
  },
  footer_sections: [],
  legal_links: [
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms of Service", url: "/terms-of-service" },
    { label: "Cookie Policy", url: "/cookie-policy" },
  ],
  copyright: `© ${new Date().getFullYear()} Ryhts Ribbon. All rights reserved.`,
};

export const mockCompanyInfo: CompanyInfo = {
  company_name: "บริษัท ไรต์ส จำกัด",
  company_name_en: "Ryhts Co., Ltd.",
  address: "เลขที่ 2 ซอยโพธิ์แก้ว 3 แยก 27, แขวงคลองจั่น, เขตบางกะปิ, กรุงเทพมหานคร 10240",
  phone: "094-624-6649",
  email: "info@ryhts.com",
  map_link: "https://maps.app.goo.gl/CrSyTzvsdBBkzxhf8",
  business_hours: "เวลา 8:30 - 17:30 น. วันจันทร์ - วันศุกร์",
  customer_count: 257,
};

export const mockAboutPage: AboutPage = {
  title: "เกี่ยวกับ Ryhts",
  subtitle: "ผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ดชั้นนำ",
  content: "",
  stats: [
    { label: "ลูกค้า", value: "257+", icon: "fa-users" },
    { label: "สินค้า", value: "100+", icon: "fa-box" },
    { label: "ปีประสบการณ์", value: "15+", icon: "fa-calendar" },
  ],
};

export const mockContactPage: ContactPage = {
  title: "ติดต่อเรา",
  subtitle: "ติดต่อเราได้ทุกช่องทาง",
  content: "",
};

export const mockPrivacyPolicy: PrivacyPolicy = {
  title: "Privacy Policy",
  description: "นโยบายความเป็นส่วนตัวของ Ryhts Ribbon",
  content: "<h2>1. การเก็บรวบรวมข้อมูล</h2><p>เราเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน</p>",
  policy_sections: [
    { title: "การเก็บรวบรวมข้อมูล", content: "<p>เราเก็บรวบรวมข้อมูลส่วนบุคคลของท่าน</p>" },
    { title: "การใช้ข้อมูล", content: "<p>เราใช้ข้อมูลของท่านเพื่อดำเนินการสั่งซื้อ</p>" },
  ],
};

export const mockPdpaSetting: PdpaSetting = {
  company_name: "บริษัท ไรต์ส จำกัด",
  dpo_name: "Data Protection Officer",
  dpo_email: "dpo@ryhts.com",
  is_active: true,
};

export const mockTermsOfService: TermsOfService = {
  title: "Terms of Service",
  description: "ข้อกำหนดและเงื่อนไขการใช้บริการของ Ryhts Ribbon",
  content: "<h2>ข้อกำหนดทั่วไป</h2><p>การใช้งานเว็บไซต์นี้ถือว่าท่านยอมรับข้อกำหนด</p>",
};

export const mockCookiePolicy: CookiePolicy = {
  title: "Cookie Policy",
  description: "นโยบายคุกกี้ของ Ryhts Ribbon",
  content: "<h2>คุกกี้คืออะไร?</h2><p>คุกกี้คือไฟล์ข้อความขนาดเล็ก</p>",
};

export const mockCookieCategories: CookieCategory[] = [
  {
    id: 1,
    documentId: "mock-cc-1",
    name: "Necessary",
    slug: "necessary",
    description: "คุกกี้จำเป็นสำหรับการทำงานของเว็บไซต์",
    sort_order: 0,
    is_active: true,
    is_required: true,
    is_default_enabled: true,
    cookies: [
      { name: "session_id", provider: "Ryhts", purpose: "Session management", duration: "Session", type: "HTTP" },
    ],
    privacy_policy_url: "/privacy-policy",
  },
  {
    id: 2,
    documentId: "mock-cc-2",
    name: "Analytics",
    slug: "analytics",
    description: "ช่วยให้เราเข้าใจวิธีการใช้งานเว็บไซต์",
    sort_order: 1,
    is_active: true,
    is_required: false,
    is_default_enabled: false,
    cookies: [
      { name: "_ga", provider: "Google", purpose: "Analytics", duration: "2 years", type: "HTTP" },
    ],
    privacy_policy_url: "/privacy-policy",
  },
  {
    id: 3,
    documentId: "mock-cc-3",
    name: "Marketing",
    slug: "marketing",
    description: "ใช้ในการโฆษณาที่ตรงกับความสนใจ",
    sort_order: 2,
    is_active: true,
    is_required: false,
    is_default_enabled: false,
    cookies: [
      { name: "_fbp", provider: "Facebook", purpose: "Advertising", duration: "3 months", type: "HTTP" },
    ],
    privacy_policy_url: "/privacy-policy",
  },
];

// ─── Mock Cookie Setting ───────────────────────────────────────────

export const mockCookieSetting: CookieSetting = {
  settings: {
    title: "เราใช้คุกกี้",
    description: "เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์ของคุณ",
    necessary_label: "คุกกี้จำเป็น",
    necessary_description: "คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์",
    analytics_label: "คุกกี้วิเคราะห์",
    analytics_description: "ช่วยให้เราเข้าใจวิธีการใช้งานเว็บไซต์",
    marketing_label: "คุกกี้โฆษณา",
    marketing_description: "ใช้ในการโฆษณาที่ตรงกับความสนใจ",
    accept_all_label: "ยอมรับทั้งหมด",
    reject_all_label: "ปฏิเสธทั้งหมด",
    manage_label: "จัดการ偏好",
    save_label: "บันทึก偏好",
    privacy_policy_label: "นโยบายความเป็นส่วนตัว",
    cookie_policy_label: "นโยบายคุกกี้",
    always_on_label: "เปิดอยู่เสมอ",
    learn_more_label: "เรียนรู้เพิ่มเติม",
  },
};

// ─── Mock Contact Floating ─────────────────────────────────────────

export const mockContactFloating: ContactFloating = {
  is_enabled: true,
  button_label: "ติดต่อเรา",
  panel_title: "ติดต่อฝ่ายขาย",
  panel_description: "สอบถามข้อมูลสินค้าและบริการ",
  close_label: "ปิด",
  actions: [
    { type: "phone", label: "โทรเลย", url: "tel:0946246649", description: "094-624-6649" },
    { type: "line", label: "Line", url: "https://line.me/ti/p/@ryhts", open_in_new_tab: true },
    { type: "email", label: "Email", url: "mailto:info@ryhts.com" },
  ],
};

// ─── Mock Navigation ───────────────────────────────────────────────

export const mockNavigation: Navigation = {
  name: "Main Navigation",
  header_items: [
    { label: "Home", url: "/" },
    { label: "About us", url: "/about" },
    { label: "Products", url: "/products" },
    { label: "Articles", url: "/articles" },
    { label: "Contact us", url: "/contact" },
  ],
  footer_sections: [],
  footer_labels: {
    contact_heading: "ติดต่อฝ่ายขาย Ryhts",
    links_heading: "Links",
    about_heading: "เกี่ยวกับเรา",
    newsletter_heading: "สมัครรับข่าวสาร",
    newsletter_placeholder: "อีเมลของคุณ",
    newsletter_button: "สมัคร",
  },
  product_names: [],
  button_labels: {
    contact_us: "ติดต่อเรา",
    learn_more: "เรียนรู้เพิ่มเติม",
    view_all: "ดูทั้งหมด",
    read_more: "อ่านต่อ",
    back_to_home: "กลับหน้าแรก",
    call_now: "โทรเลย",
    request_quote: "ขอใบเสนอราคา",
    download: "ดาวน์โหลด",
  },
};
