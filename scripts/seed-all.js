/**
 * Comprehensive Seed Script — All CMS Content
 *
 * Usage:
 *   node scripts/seed-all.js
 *
 * Requires Strapi running on http://localhost:1337
 * Requires admin JWT token (auto-login with credentials below)
 */

const BASE_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '1497a3c21f04e5c08642d485ced653cde09cb85abd2da0b07ea7abb6df04ddec1a3008e996f1ce5b7439c13aaf329a4a3b4edb4c3667244e7af2e133d276ed512edd0df0dbece237558f71419624ddaf9b3e1a54ba1c84a6171573fdaca4f634a599394100e63f9106376b85dbfd81a66feba2057d8669cd01234bb0ea3ff228';

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  };
}

// ─── Helpers ────────────────────────────────────────────────────────────────

async function createOrUpdate(uid, data, locale = 'th') {
  const headers = authHeaders();
  const res = await fetch(`${BASE_URL}/api/${uid}?locale=${locale}`, { headers });
  const existing = await res.json();

  let method, url;
  if (existing.data && existing.data.documentId) {
    method = 'PUT';
    url = `${BASE_URL}/api/${uid}/${existing.data.documentId}?locale=${locale}`;
  } else {
    // Strapi 5 single types: use PUT on the endpoint directly (no documentId needed)
    method = 'PUT';
    url = `${BASE_URL}/api/${uid}?locale=${locale}`;
  }

  const result = await fetch(url, {
    method,
    headers,
    body: JSON.stringify({ data }),
  });

  if (!result.ok) {
    const err = await result.text();
    console.error(`  ❌ ${uid} (${locale}): ${result.status}`, err.slice(0, 200));
    return null;
  }

  const json = await result.json();
  console.log(`  ✅ ${uid} (${locale}): ${method} — "${data.site_name || data.company_name || data.name || data.title || 'ok'}"`);
  return json;
}

async function createCollectionEntry(uid, data, locale = 'th') {
  const headers = authHeaders();
  const result = await fetch(`${BASE_URL}/api/${uid}?locale=${locale}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });

  if (!result.ok) {
    const err = await result.text();
    console.error(`  ❌ ${uid} (${locale}): ${result.status}`, err.slice(0, 200));
    return null;
  }

  const json = await result.json();
  console.log(`  ✅ ${uid} (${locale}): created "${data.name || data.title}"`);
  return json;
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Brands ─────────────────────────────────────────────────────────────────

const brands = [
  { name: 'Ricoh', slug: 'ricoh', description: 'High-quality thermal transfer ribbons from Ricoh, known for reliability and performance across industrial and commercial printing.' },
  { name: 'CSoft', slug: 'csoft', description: 'CSoft ribbons offer premium printing solutions for industrial barcode printers with excellent durability.' },
  { name: 'ARMOR', slug: 'armor', description: 'ARMOR AXR thermal transfer ribbons — European quality, global trust. Leading manufacturer of thermal transfer ribbons.' },
];

// ─── Categories ─────────────────────────────────────────────────────────────

const categories = [
  { name: 'Ribbon Wax', slug: 'ribbon-wax', description: 'ริบบอนแบบ Wax เหมาะสำหรับการพิมพ์บาร์โค้ดทั่วไป ราคาประหยัด คุณภาพดี เป็นที่นิยมใช้มากที่สุด' },
  { name: 'Ribbon Wax-Resin', slug: 'ribbon-wax-resin', description: 'ริบบอนแบบ Wax-Resin ผสมผสานความคุ้มค่าของ Wax กับความทนทานของ Resin เหมาะสำหรับฉลากที่ต้องการความทนทานปานกลาง' },
  { name: 'Ribbon Resin', slug: 'ribbon-resin', description: 'ริบบอนแบบ Resin ทนทานสูงสุด ทนสารเคมี ความร้อน และแสง UV เหมาะสำหรับงานอุตสาหกรรม' },
];

// ─── Products ───────────────────────────────────────────────────────────────

const products = [
  {
    title: 'Ribbon Wax Premium 110x300',
    slug: 'ribbon-wax-premium-110x300',
    description: '<p>ริบบอน Wax คุณภาพสูง สำหรับเครื่องพิมพ์บาร์โค้ด ขนาด 110mm x 300m</p><p>เหมาะสำหรับการพิมพ์บาร์โค้ดทั่วไป ฉลากสินค้า ป้ายราคา ฯลฯ พิมพ์คมชัด หมึกไม่เลือนง่าย</p><ul><li>ขนาด: 110mm x 300m</li><li>เหมาะสำหรับ: Zebra, TSC, SATO, Honeywell</li><li>การใช้งาน: ฉลากสินค้า, บาร์โค้ด, ป้ายราคา</li></ul>',
    short_description: 'ริบบอน Wax คุณภาพสูง ขนาด 110x300mm เหมาะสำหรับเครื่องพิมพ์บาร์โค้ดทั่วไป',
    price: 350,
    ribbon_type: 'wax',
    sizes: ['110mm x 300m', '80mm x 300m', '60mm x 300m'],
    compatibility: 'Zebra, TSC, SATO, Honeywell, ARGOX',
    is_featured: true,
    brand_slug: 'ricoh',
    category_slugs: ['ribbon-wax'],
  },
  {
    title: 'Ribbon Wax-Resin Premium 110x300',
    slug: 'ribbon-wax-resin-premium-110x300',
    description: '<p>ริบบอน Wax-Resin คุณภาพสูง ผสมผสานความคุ้มค่าของ Wax กับความทนทานของ Resin</p><p>เหมาะสำหรับการพิมพ์บาร์โค้ดที่ต้องการความทนทานมากขึ้น หมึกไม่เลือนง่ายเมื่อถูกแสง UV</p><ul><li>ขนาด: 110mm x 300m</li><li>เหมาะสำหรับ: Zebra, TSC, SATO</li><li>การใช้งาน: ฉลากสินค้าพรีเมียม, บาร์โค้ดที่ต้องการความทนทาน</li></ul>',
    short_description: 'ริบบอน Wax-Resin คุณภาพสูง ทนทานต่อแสง UV เหมาะสำหรับฉลากพรีเมียม',
    price: 550,
    ribbon_type: 'wax_resin',
    sizes: ['110mm x 300m', '80mm x 300m'],
    compatibility: 'Zebra, TSC, SATO, Honeywell',
    is_featured: true,
    brand_slug: 'csoft',
    category_slugs: ['ribbon-wax-resin'],
  },
  {
    title: 'Ribbon Resin Premium 110x300',
    slug: 'ribbon-resin-premium-110x300',
    description: '<p>ริบบอน Resin คุณภาพสูงสุด ทนทานต่อสารเคมี ความร้อน และแสง UV</p><p>เหมาะสำหรับงานที่ต้องการความทนทานสูงสุด เช่น ฉลากเครื่องจักร ฉลากในโรงงานอุตสาหกรรม</p><ul><li>ขนาด: 110mm x 300m</li><li>เหมาะสำหรับ: Zebra, TSC, SATO, Honeywell</li><li>การใช้งาน: ฉลากอุตสาหกรรม, ฉลากที่ต้องทนสารเคมี</li></ul>',
    short_description: 'ริบบอน Resin ทนทานสูงสุด ทนสารเคมีและความร้อน เหมาะสำหรับงานอุตสาหกรรม',
    price: 850,
    ribbon_type: 'resin',
    sizes: ['110mm x 300m', '80mm x 300m', '60mm x 300m'],
    compatibility: 'Zebra, TSC, SATO, Honeywell, ARGOX',
    is_featured: true,
    brand_slug: 'armor',
    category_slugs: ['ribbon-resin'],
  },
  {
    title: 'Ribbon Wax Economy 80x300',
    slug: 'ribbon-wax-economy-80x300',
    description: '<p>ริบบอน Wax ราคาประหยัด ขนาด 80mm x 300m เหมาะสำหรับการพิมพ์จำนวนมาก คุ้มค่า ราคาถูก</p>',
    short_description: 'ริบบอน Wax ราคาประหยัด ขนาด 80x300mm เหมาะสำหรับการพิมพ์จำนวนมาก',
    price: 250,
    ribbon_type: 'wax',
    sizes: ['80mm x 300m', '60mm x 300m'],
    compatibility: 'Zebra, TSC, SATO',
    is_featured: false,
    brand_slug: 'ricoh',
    category_slugs: ['ribbon-wax'],
  },
  {
    title: 'Ribbon Wax-Resin Industrial 110x450',
    slug: 'ribbon-wax-resin-industrial-110x450',
    description: '<p>ริบบอน Wax-Resin ขนาดใหญ่ 110mm x 450m เหมาะสำหรับเครื่องพิมพ์อุตสาหกรรม ทนทาน ใช้งานได้ยาวนาน</p>',
    short_description: 'ริบบอน Wax-Resin อุตสาหกรรม ขนาด 110x450mm สำหรับงานพิมพ์จำนวนมาก',
    price: 750,
    ribbon_type: 'wax_resin',
    sizes: ['110mm x 450m'],
    compatibility: 'Zebra ZT series, Honeywell PM series',
    is_featured: false,
    brand_slug: 'csoft',
    category_slugs: ['ribbon-wax-resin'],
  },
  {
    title: 'Ribbon Resin Chemical Resistant 110x300',
    slug: 'ribbon-resin-chemical-resistant-110x300',
    description: '<p>ริบบอน Resin พิเศษ ทนทานสารเคมีได้ดีเยี่ยม เหมาะสำหรับงานในโรงงานเคมี อุตสาหกรรมหนัก</p>',
    short_description: 'ริบบอน Resin ทนสารเคมี สำหรับงานโรงงานเคมีและอุตสาหกรรมหนัก',
    price: 950,
    ribbon_type: 'resin',
    sizes: ['110mm x 300m'],
    compatibility: 'Zebra ZT series, Honeywell PM series, SATO CL4/CL6',
    is_featured: false,
    brand_slug: 'armor',
    category_slugs: ['ribbon-resin'],
  },
];

// ─── Articles ───────────────────────────────────────────────────────────────

const articles = [
  {
    title: 'วิธีเลือกริบบอนให้เหมาะกับเครื่องพิมพ์ของคุณ',
    slug: 'how-to-choose-ribbon-for-your-printer',
    content: '<h2>ริบบอนมีกี่แบบ?</h2><p>ริบบอนสำหรับเครื่องพิมพ์บาร์โค้ดมี 3 ประเภทหลัก ได้แก่ Wax, Wax-Resin และ Resin แต่ละแบบมีข้อดีข้อเสียที่แตกต่างกัน</p><h3>1. Ribbon Wax</h3><p>เป็นริบบอนที่นิยมใช้มากที่สุด ราคาประหยัด เหมาะสำหรับการพิมพ์บาร์โค้ดทั่วไป ฉลากสินค้า ป้ายราคา</p><h3>2. Ribbon Wax-Resin</h3><p>ผสมผสานข้อดีของ Wax และ Resin ทนทานกว่า Wax แต่ราคาถูกกว่า Resin เหมาะสำหรับฉลากที่ต้องการความทนทานปานกลาง</p><h3>3. Ribbon Resin</h3><p>ทนทานที่สุด ทนสารเคมี ความร้อน และแสง UV เหมาะสำหรับงานอุตสาหกรรมที่ต้องการความทนทานสูงสุด</p>',
    excerpt: 'เรียนรู้วิธีเลือกริบบอนให้เหมาะสมกับเครื่องพิมพ์บาร์โค้ดของคุณ เพื่อให้ได้ผลลัพธ์ที่ดีที่สุด',
    author: 'Ryhts Team',
    tags: ['ริบบอน', 'บาร์โค้ด', 'เครื่องพิมพ์', 'คู่มือ'],
  },
  {
    title: 'สินค้าใหม่: Ribbon Wax Premium Series 2025',
    slug: 'new-product-ribbon-wax-premium-2025',
    content: '<p>ไรต์ส ยินดีนำเสนอสินค้าใหม่ในปี 2025 — Ribbon Wax Premium Series ที่ได้รับการพัฒนาคุณภาพให้ดียิ่งขึ้น</p><p>ด้วยเทคโนโลยีการผลิตใหม่ ริบบอน Wax Premium Series ให้ความคมชัดสูง หมึกติดทนนาน และCompatible กับเครื่องพิมพ์หลากหลายรุ่น</p><h3>จุดเด่นของสินค้า</h3><ul><li>คมชัดสูง พิมพ์บาร์โค้ดได้อ่านง่าย</li><li>หมึกติดทนนาน ไม่เลือนง่าย</li><li>Compatible กับเครื่องพิมพ์ Zebra, TSC, SATO, Honeywell</li><li>มีหลายขนาดให้เลือก</li></ul>',
    excerpt: 'แนะนำสินค้าใหม่ Ribbon Wax Premium Series 2025 คุณภาพสูง ราคาคุ้มค่า',
    author: 'Ryhts Team',
    tags: ['สินค้าใหม่', 'ริบบอน', 'Wax', '2025'],
  },
  {
    title: 'เทคนิคการดูแลริบบอนให้ใช้งานได้นาน',
    slug: 'tips-for-ribbon-maintenance',
    content: '<p>การดูแลริบบอนอย่างถูกวิธีจะช่วยยืดอายุการใช้งานและรักษาคุณภาพการพิมพ์ให้ดีอยู่เสมอ</p><h3>1. เก็บริบบอนในที่แห้ง</h3><p>ความชื้นส่งผลต่อคุณภาพของหมึก ควรเก็บริบบอนในที่แห้งและมีอุณหภูมิเหมาะสม</p><h3>2. หลีกเลี่ยงแสงแดดโดยตรง</h3><p>แสง UV อาจทำให้หมึกเสื่อมสภาพก่อนเวลาอันควร</p><h3>3. ติดตั้งให้ถูกวิธี</h3><p>การติดตั้งริบบอนที่ถูกวิธีจะช่วยป้องกันปัญหาการพิมพ์และยืดอายุการใช้งาน</p>',
    excerpt: 'เทคนิคดูแลริบบอนให้ใช้งานได้นาน รักษาคุณภาพการพิมพ์',
    author: 'Ryhts Team',
    tags: ['เทคนิค', 'การดูแล', 'ริบบอน', 'คู่มือ'],
  },
];

// ─── Pages ──────────────────────────────────────────────────────────────────

const pages = [
  {
    title: 'เกี่ยวกับ Ryhts',
    slug: 'about-ryhts',
    content: '',
    meta_title: 'เกี่ยวกับ Ryhts | Ryhts Ribbon',
    meta_description: 'เรียนรู้เกี่ยวกับ Ryhts ผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ดชั้นนำ',
  },
  {
    title: 'ติดต่อเรา',
    slug: 'contact-us',
    content: '',
    meta_title: 'ติดต่อเรา | Ryhts Ribbon',
    meta_description: 'ติดต่อ Ryhts Ribbon ผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด',
  },
];

// ─── Single Types ───────────────────────────────────────────────────────────

const siteSettingTh = {
  site_name: 'RYHTS',
  site_description: 'Premier Ribbons for Premier Printing',
  currency: 'THB',
  phone: '094-624-6649',
  email: 'info@ryhts.com',
};

const siteSettingEn = {
  site_name: 'RYHTS',
  site_description: 'Premier Ribbons for Premier Printing',
  currency: 'THB',
  phone: '094-624-6649',
  email: 'info@ryhts.com',
};

const globalSettingTh = {
  meta_title: 'Ryhts Ribbon - ริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด',
  meta_description: 'ผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ดทุกขนาด คุณภาพมาตรฐาน ราคาคุ้มค่า',
  google_analytics_id: '',
  facebook_pixel_id: '',
  twitter_handle: '',
};

const globalSettingEn = {
  meta_title: 'Ryhts Ribbon - Thermal Transfer Ribbons',
  meta_description: 'Premium thermal transfer ribbons for barcode printers of all sizes. Quality standards, competitive prices.',
  google_analytics_id: '',
  facebook_pixel_id: '',
  twitter_handle: '',
};

const footerSettingTh = {
  copyright_text: '© 2026 Ryhts Ribbon. All rights reserved.',
  social_links: JSON.stringify({ facebook: 'https://facebook.com/ryhts', line: 'https://line.me/ti/p/@ryhts' }),
  newsletter_text: 'สมัครรับข่าวสารจาก Ryhts Ribbon',
  footer_sections: [
    {
      title: 'สินค้า',
      sort_order: 0,
      is_active: true,
      links: [
        { label: 'ริบบอน Wax', url: '/products/', sort_order: 0, is_active: true },
        { label: 'ริบบอน Wax-Resin', url: '/products/', sort_order: 1, is_active: true },
        { label: 'ริบบอน Resin', url: '/products/', sort_order: 2, is_active: true },
      ],
    },
    {
      title: 'บริษัท',
      sort_order: 1,
      is_active: true,
      links: [
        { label: 'เกี่ยวกับเรา', url: '/about/', sort_order: 0, is_active: true },
        { label: 'ติดต่อเรา', url: '/contact/', sort_order: 1, is_active: true },
        { label: 'ทดลองใช้ฟรี', url: '/free-trial/', sort_order: 2, is_active: true },
      ],
    },
  ],
  legal_links: [
    { label: 'นโยบายความเป็นส่วนตัว', url: '/privacy-policy/', sort_order: 0, is_active: true },
    { label: 'ข้อกำหนดการใช้งาน', url: '/terms-of-service/', sort_order: 1, is_active: true },
  ],
};

const footerSettingEn = {
  copyright_text: '© 2026 Ryhts Ribbon. All rights reserved.',
  social_links: JSON.stringify({ facebook: 'https://facebook.com/ryhts', line: 'https://line.me/ti/p/@ryhts' }),
  newsletter_text: 'Subscribe to Ryhts Ribbon newsletter',
  footer_sections: [
    {
      title: 'Products',
      sort_order: 0,
      is_active: true,
      links: [
        { label: 'Wax Ribbon', url: '/products/', sort_order: 0, is_active: true },
        { label: 'Wax-Resin Ribbon', url: '/products/', sort_order: 1, is_active: true },
        { label: 'Resin Ribbon', url: '/products/', sort_order: 2, is_active: true },
      ],
    },
    {
      title: 'Company',
      sort_order: 1,
      is_active: true,
      links: [
        { label: 'About Us', url: '/about/', sort_order: 0, is_active: true },
        { label: 'Contact', url: '/contact/', sort_order: 1, is_active: true },
        { label: 'Free Trial', url: '/free-trial/', sort_order: 2, is_active: true },
      ],
    },
  ],
  legal_links: [
    { label: 'Privacy Policy', url: '/privacy-policy/', sort_order: 0, is_active: true },
    { label: 'Terms of Service', url: '/terms-of-service/', sort_order: 1, is_active: true },
  ],
};

const companyInfoTh = {
  company_name: 'บริษัท ไรต์ส จำกัด',
  company_name_en: 'Ryhts Co., Ltd.',
  address: 'เลขที่ 2 ซอยโพธิ์แก้ว 3 แยก 27, แขวงคลองจั่น, เขตบางกะปิ, กรุงเทพมหานคร 10240',
  phone: '094-624-6649',
  email: 'info@ryhts.com',
  map_link: 'https://maps.app.goo.gl/CrSyTzvsdBBkzxhf8',
  business_hours: 'เวลา 8:30 - 17:30 น. วันจันทร์ - วันศุกร์',
  customer_count: 257,
  contact_form_title: 'Write a message',
};

const companyInfoEn = {
  company_name: 'Ryhts Co., Ltd.',
  company_name_en: 'Ryhts Co., Ltd.',
  address: '2 Soi PhoKaew 3 Yak 27, Khlong Chan, Bangkapi, Bangkok 10240',
  phone: '094-624-6649',
  email: 'info@ryhts.com',
  map_link: 'https://maps.app.goo.gl/CrSyTzvsdBBkzxhf8',
  business_hours: 'Mon-Fri 8:30 AM - 5:30 PM',
  customer_count: 257,
  contact_form_title: 'Write a message',
};

const privacyPolicyTh = {
  title: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล',
  description: 'นโยบายนี้อธิบายว่าบริษัท ไรต์ส จำกัด จัดเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคลของท่านอย่างไร',
  content: '<h2>นโยบายคุ้มครองข้อมูลส่วนบุคคล</h2><p>บริษัท ไรต์ส จำกัด ตระหนักถึงความสำคัญของคุ้มครองข้อมูลส่วนบุคคลของลูกค้า คู่ค้า และผู้เข้าชมเว็บไซต์</p><h3>1. ข้อมูลส่วนบุคคลที่บริษัทจัดเก็บ</h3><ul><li>ข้อมูลที่ท่านให้ไว้โดยตรง: ชื่อ-นามสกุล อีเมล เบอร์โทรศัพท์ ที่อยู่</li><li>ข้อมูลจากการใช้งานเว็บไซต์: ข้อมูลการเข้าชม ประวัติการค้นหา</li><li>ข้อมูลจากคุกกี้: ข้อมูลการตั้งค่า ข้อมูลการวิเคราะห์</li></ul><h3>2. วัตถุประสงค์ในการจัดเก็บข้อมูล</h3><ul><li>เพื่อให้บริการและอำนวยความสะดวกในการใช้งานเว็บไซต์</li><li>เพื่อติดต่อสื่อสารและตอบคำถามของท่าน</li><li>เพื่อพัฒนาและปรับปรุงสินค้าและบริการ</li></ul><h3>3. สิทธิของเจ้าของข้อมูลส่วนบุคคล</h3><ul><li>สิทธิในการเข้าถึงข้อมูล</li><li>สิทธิในการแก้ไขข้อมูล</li><li>สิทธิในการลบข้อมูล</li><li>สิทธิในการถอนความยินยอม</li></ul>',
  last_updated: '2025-01-01T00:00:00.000Z',
  meta_title: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล | Ryhts',
  meta_description: 'นโยบายคุ้มครองข้อมูลส่วนบุคคลของบริษัท ไรต์ส จำกัด',
};

const termsOfServiceTh = {
  title: 'ข้อกำหนดและเงื่อนไขการใช้บริการ',
  description: 'ข้อกำหนดและเงื่อนไขการใช้บริการของ Ryhts Ribbon',
  content: '<h2>ข้อกำหนดทั่วไป</h2><p>การใช้งานเว็บไซต์นี้ถือว่าท่านยอมรับข้อกำหนดและเงื่อนไขที่กำหนดไว้</p><h2>การสั่งซื้อสินค้า</h2><p>การสั่งซื้อสินค้าผ่านเว็บไซต์ถือเป็นข้อตกลงซื้อขายระหว่างท่านกับบริษัท</p><h2>การชำระเงิน</h2><p>บริษัทสงวนสิทธิ์ในการเปลี่ยนแปลงราคาสินค้าโดยไม่ต้องแจ้งให้ทราบล่วงหน้า</p>',
  last_updated: '2025-01-01T00:00:00.000Z',
  meta_title: 'ข้อกำหนดและเงื่อนไข | Ryhts Ribbon',
  meta_description: 'ข้อกำหนดและเงื่อนไขการใช้บริการ Ryhts Ribbon',
};

const termsOfServiceEn = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Ryhts Ribbon services',
  content: '<h2>General Terms</h2><p>By using this website, you agree to the terms and conditions set forth herein.</p><h2>Product Orders</h2><p>Placing an order through this website constitutes a sales agreement between you and the company.</p><h2>Payment</h2><p>The company reserves the right to change product prices without prior notice.</p>',
  last_updated: '2025-01-01T00:00:00.000Z',
  meta_title: 'Terms of Service | Ryhts Ribbon',
  meta_description: 'Terms and conditions for using Ryhts Ribbon services',
};

const privacyPolicyEn = {
  title: 'Privacy Policy',
  description: 'This policy explains how Ryhts Co., Ltd. collects, uses, and protects your personal data.',
  content: '<h2>Privacy Policy</h2><p>Ryhts Co., Ltd. is committed to protecting the personal data of our customers, partners, and website visitors.</p><h3>1. Personal Data We Collect</h3><ul><li>Data you provide directly: Name, email, phone number, address</li><li>Data from website usage: Browsing history, search history</li><li>Data from cookies: Preference settings, analytics data</li></ul><h3>2. Purpose of Data Collection</h3><ul><li>To provide services and facilitate website usage</li><li>To communicate with you and respond to your inquiries</li><li>To develop and improve our products and services</li></ul><h3>3. Data Subject Rights</h3><ul><li>Right of Access</li><li>Right to Rectification</li><li>Right to Erasure</li><li>Right to Withdraw Consent</li></ul>',
  last_updated: '2025-01-01T00:00:00.000Z',
  meta_title: 'Privacy Policy | Ryhts Ribbon',
  meta_description: 'Ryhts privacy policy - how we collect, use, and protect your personal data',
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('🚀 Starting comprehensive CMS seed...\n');

  console.log('✅ Using API token\n');

  // 1. Site Settings
  console.log('📋 Site Settings...');
  await createOrUpdate('site-setting', siteSettingTh, 'th');
  await createOrUpdate('site-setting', siteSettingEn, 'en');

  // 2. Global Settings
  console.log('\n🌍 Global Settings...');
  await createOrUpdate('global-setting', globalSettingTh, 'th');
  await createOrUpdate('global-setting', globalSettingEn, 'en');

  // 3. Footer Settings
  console.log('\n📎 Footer Settings...');
  await createOrUpdate('footer-setting', footerSettingTh, 'th');
  await createOrUpdate('footer-setting', footerSettingEn, 'en');

  // 4. Company Info
  console.log('\n🏢 Company Info...');
  await createOrUpdate('company-info', companyInfoTh, 'th');
  await createOrUpdate('company-info', companyInfoEn, 'en');

  // 5. Brands
  console.log('\n🏷️  Brands...');
  for (const brand of brands) {
    await createCollectionEntry('brands', brand, 'th');
  }

  // 6. Categories
  console.log('\n📂 Categories...');
  for (const cat of categories) {
    await createCollectionEntry('categories', cat, 'th');
  }

  // 7. Products (need to resolve brand & category relations)
  console.log('\n📦 Products...');

  // Fetch created brands and categories for relation linking
  const brandRes = await fetch(`${BASE_URL}/api/brands?locale=th`, { headers: authHeaders() });
  const brandData = await brandRes.json();
  const brandMap = {};
  (brandData.data || []).forEach((b) => { brandMap[b.slug] = b.documentId; });

  const catRes = await fetch(`${BASE_URL}/api/categories?locale=th`, { headers: authHeaders() });
  const catData = await catRes.json();
  const catMap = {};
  (catData.data || []).forEach((c) => { catMap[c.slug] = c.documentId; });

  for (const product of products) {
    const data = {
      title: product.title,
      slug: product.slug,
      description: product.description,
      short_description: product.short_description,
      price: product.price,
      ribbon_type: product.ribbon_type,
      sizes: JSON.stringify(product.sizes),
      compatibility: product.compatibility,
      is_featured: product.is_featured,
      meta_title: `${product.title} | Ryhts Ribbon`,
      meta_description: product.short_description,
    };

    // Add relations
    if (product.brand_slug && brandMap[product.brand_slug]) {
      data.brand = brandMap[product.brand_slug];
    }
    if (product.category_slugs) {
      data.categories = product.category_slugs
        .filter((s) => catMap[s])
        .map((s) => catMap[s]);
    }

    await createCollectionEntry('products', data, 'th');
  }

  // 8. Articles
  console.log('\n📰 Articles...');
  for (const article of articles) {
    const data = {
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      author: article.author,
      tags: JSON.stringify(article.tags),
      views: 0,
      meta_title: `${article.title} | Ryhts Ribbon`,
      meta_description: article.excerpt,
    };
    await createCollectionEntry('articles', data, 'th');
  }

  // 9. About Page (single type)
  console.log('\n📄 About Page...');
  await createOrUpdate('about-page', {
    title: 'เกี่ยวกับ Ryhts',
    subtitle: 'ผู้เชี่ยวชาญด้านริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด',
    stats: [
      { label: 'ปีประสบการณ์', value: '15+', icon: 'fa-calendar', sort_order: 0, is_active: true },
      { label: 'ลูกค้าที่ไว้วางใจ', value: '500+', icon: 'fa-users', sort_order: 1, is_active: true },
      { label: 'สินค้า', value: '100+', icon: 'fa-box', sort_order: 2, is_active: true },
    ],
    content: '<h2>เกี่ยวกับ Ryhts</h2><p>Ryhts เป็นผู้เชี่ยวชาญด้านริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด ให้บริการลูกค้ามากกว่า 15 ปี ด้วยสินค้าคุณภาพสูงและบริการหลังการขายที่ดีเยี่ยม</p>',
  }, 'th');
  await createOrUpdate('about-page', {
    title: 'About Ryhts',
    subtitle: 'Thermal Transfer Ribbon Experts',
    stats: [
      { label: 'Years Experience', value: '15+', icon: 'fa-calendar', sort_order: 0, is_active: true },
      { label: 'Trusted Clients', value: '500+', icon: 'fa-users', sort_order: 1, is_active: true },
      { label: 'Products', value: '100+', icon: 'fa-box', sort_order: 2, is_active: true },
    ],
    content: '<h2>About Ryhts</h2><p>Ryhts is a leading distributor of thermal transfer ribbons with over 15 years of experience serving clients with high-quality products and excellent after-sales service.</p>',
  }, 'en');

  // 10. Contact Page (single type)
  console.log('\n📄 Contact Page...');
  await createOrUpdate('contact-page', {
    title: 'ติดต่อเรา',
    content: '',
    meta_title: 'ติดต่อเรา | Ryhts Ribbon',
    meta_description: 'ติดต่อ Ryhts Ribbon ผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด',
  }, 'th');
  await createOrUpdate('contact-page', {
    title: 'Contact Us',
    content: '',
    meta_title: 'Contact Us | Ryhts Ribbon',
    meta_description: 'Contact Ryhts Ribbon - thermal transfer ribbon distributor',
  }, 'en');

  // 10. Privacy Policy
  console.log('\n🔒 Privacy Policy...');
  await createOrUpdate('privacy-policy', privacyPolicyTh, 'th');
  await createOrUpdate('privacy-policy', privacyPolicyEn, 'en');

  // 11. Terms of Service
  console.log('\n📜 Terms of Service...');
  await createOrUpdate('terms-of-service', termsOfServiceTh, 'th');
  await createOrUpdate('terms-of-service', termsOfServiceEn, 'en');

  // 12. Free Trial (single type)
  console.log('\n🆓 Free Trial...');
  await createOrUpdate('free-trial', {
    title: 'ทดลองใช้ฟรี',
    subtitle: 'ทดลองใช้ iStock Express โดยไม่เสียค่าใช้จ่าย',
    trust_items: [
      { label: 'ไม่ต้องใช้บัตรเครดิต', icon: 'fa-credit-card', sort_order: 0, is_active: true },
      { label: 'ทดลองใช้ฟรี 30 วัน', icon: 'fa-clock', sort_order: 1, is_active: true },
      { label: 'ยกเลิกเมื่อไหร่ก็ได้', icon: 'fa-times-circle', sort_order: 2, is_active: true },
    ],
    trial_features: [
      { title: 'พิมพ์บาร์โค้ดไม่จำกัด', description: 'พิมพ์บาร์โค้ดได้ไม่จำกัดจำนวนตลอดระยะเวลาทดลองใช้', icon: 'fa-print', sort_order: 0, is_active: true },
      { title: 'รองรับหลายแบรนด์', description: 'รองรับเครื่องพิมพ์จากหลายแบรนด์ชั้นนำ', icon: 'fa-check', sort_order: 1, is_active: true },
      { title: 'รายงานแบบ Real-time', description: 'ดูรายงานการพิมพ์แบบเรียลไทม์', icon: 'fa-chart-line', sort_order: 2, is_active: true },
    ],
    form_labels: [
      { label: 'ชื่อ', placeholder: 'กรอกชื่อของคุณ', sort_order: 0, is_active: true },
      { label: 'อีเมล', placeholder: 'กรอกอีเมลของคุณ', sort_order: 1, is_active: true },
      { label: 'เบอร์โทรศัพท์', placeholder: 'กรอกเบอร์โทรศัพท์', sort_order: 2, is_active: true },
    ],
  }, 'th');
  await createOrUpdate('free-trial', {
    title: 'Try for Free',
    subtitle: 'Try iStock Express with no commitment',
    trust_items: [
      { label: 'No credit card required', icon: 'fa-credit-card', sort_order: 0, is_active: true },
      { label: 'Free 30-day trial', icon: 'fa-clock', sort_order: 1, is_active: true },
      { label: 'Cancel anytime', icon: 'fa-times-circle', sort_order: 2, is_active: true },
    ],
    trial_features: [
      { title: 'Unlimited barcode printing', description: 'Print unlimited barcodes during the trial period', icon: 'fa-print', sort_order: 0, is_active: true },
      { title: 'Multi-brand support', description: 'Support for printers from leading brands', icon: 'fa-check', sort_order: 1, is_active: true },
      { title: 'Real-time reports', description: 'View printing reports in real-time', icon: 'fa-chart-line', sort_order: 2, is_active: true },
    ],
    form_labels: [
      { label: 'Name', placeholder: 'Enter your name', sort_order: 0, is_active: true },
      { label: 'Email', placeholder: 'Enter your email', sort_order: 1, is_active: true },
      { label: 'Phone', placeholder: 'Enter your phone number', sort_order: 2, is_active: true },
    ],
  }, 'en');

  console.log('\n✨ Seed complete!');
  console.log('🌐 Visit http://localhost:4321 to see the frontend with real CMS data');
}

main().catch(console.error);
