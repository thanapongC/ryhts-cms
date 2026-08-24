/**
 * Seed component data for pages using Strapi 5 correct single-type API.
 *
 * Strapi 5 single types:
 *   - GET  /api/{uid}?locale=xx
 *   - PUT  /api/{uid}?locale=xx       (upsert, NO documentId in URL)
 *
 * Usage: node scripts/seed-components.js
 */

const BASE_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const API_TOKEN = '1497a3c21f04e5c08642d485ced653cde09cb85abd2da0b07ea7abb6df04ddec1a3008e996f1ce5b7439c13aaf329a4a3b4edb4c3667244e7af2e133d276ed512edd0df0dbece237558f71419624ddaf9b3e1a54ba1c84a6171573fdaca4f634a599394100e63f9106376b85dbfd81a66feba2057d8669cd01234bb0ea3ff228';

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  };
}

async function seedSingleType(uid, data, locale = 'th') {
  const headers = authHeaders();
  // Strapi 5 single types: PUT on /api/{uid}?locale=xx (no documentId)
  const url = `${BASE_URL}/api/${uid}?locale=${locale}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data }),
  });

  const result = await res.json();
  if (!res.ok) {
    console.error(`  ❌ ${uid} (${locale}): ${res.status}`, (result.error?.message || '').slice(0, 200));
    return false;
  }
  const label = data.title || data.company_name || data.copyright_text || uid;
  console.log(`  ✅ ${uid} (${locale}): PUT — "${String(label).slice(0, 50)}"`);
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const aboutPageTh = {
  title: 'เกี่ยวกับ Ryhts',
  subtitle: 'ผู้เชี่ยวชาญด้านริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด',
  stats: [
    { label: 'ปีประสบการณ์', value: '15+', icon: 'fa-calendar', sort_order: 0, is_active: true },
    { label: 'ลูกค้าที่ไว้วางใจ', value: '500+', icon: 'fa-users', sort_order: 1, is_active: true },
    { label: 'สินค้า', value: '100+', icon: 'fa-box', sort_order: 2, is_active: true },
  ],
  content: '<h2>เกี่ยวกับ Ryhts</h2><p>Ryhts เป็นผู้เชี่ยวชาญด้านริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด ให้บริการลูกค้ามากกว่า 15 ปี ด้วยสินค้าคุณภาพสูงและบริการหลังการขายที่ดีเยี่ยม</p><p>เราเป็นตัวแทนจำหน่ายริบบอนจากแบรนด์ชั้นนำ เช่น Ricoh, CSoft, และ ARMOR ทำให้ลูกค้ามั่นใจได้ว่าจะได้รับสินค้าคุณภาพมาตรฐาน</p>',
};

const aboutPageEn = {
  title: 'About Ryhts',
  subtitle: 'Thermal Transfer Ribbon Experts',
  stats: [
    { label: 'Years Experience', value: '15+', icon: 'fa-calendar', sort_order: 0, is_active: true },
    { label: 'Trusted Clients', value: '500+', icon: 'fa-users', sort_order: 1, is_active: true },
    { label: 'Products', value: '100+', icon: 'fa-box', sort_order: 2, is_active: true },
  ],
  content: '<h2>About Ryhts</h2><p>Ryhts is a leading distributor of thermal transfer ribbons with over 15 years of experience serving clients with high-quality products and excellent after-sales service.</p><p>We are authorized distributors for premium brands including Ricoh, CSoft, and ARMOR.</p>',
};

const footerTh = {
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

const footerEn = {
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

const freeTrialTh = {
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
};

const freeTrialEn = {
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
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('🌱 Seeding component data...\n');

  let ok = 0;
  let fail = 0;

  console.log('📄 About Page...');
  (await seedSingleType('about-page', aboutPageTh, 'th')) ? ok++ : fail++;
  (await seedSingleType('about-page', aboutPageEn, 'en')) ? ok++ : fail++;

  console.log('\n📎 Footer Settings...');
  (await seedSingleType('footer-setting', footerTh, 'th')) ? ok++ : fail++;
  (await seedSingleType('footer-setting', footerEn, 'en')) ? ok++ : fail++;

  console.log('\n🆓 Free Trial...');
  (await seedSingleType('free-trial', freeTrialTh, 'th')) ? ok++ : fail++;
  (await seedSingleType('free-trial', freeTrialEn, 'en')) ? ok++ : fail++;

  console.log(`\n✨ Done: ${ok} succeeded, ${fail} failed`);
}

main().catch(console.error);
