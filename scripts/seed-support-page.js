/**
 * Seed Support Page — CMS Data (TH/EN)
 *
 * Creates:
 *   - FAQ entries (collection type) for the support page
 *   - Support page single type with components + relations
 *
 * Usage: node scripts/seed-support-page.js
 *
 * Requires Strapi running on http://localhost:1337
 */

const BASE_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN || '1497a3c21f04e5c08642d485ced653cde09cb85abd2da0b07ea7abb6df04ddec1a3008e996f1ce5b7439c13aaf329a4a3b4edb4c3667244e7af2e133d276ed512edd0df0dbece237558f71419624ddaf9b3e1a54ba1c84a6171573fdaca4f634a599394100e63f9106376b85dbfd81a66feba2057d8669cd01234bb0ea3ff228';

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  };
}

async function seedSingleType(uid, data, locale = 'th') {
  const headers = authHeaders();
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
  console.log(`  ✅ ${uid} (${locale}): PUT — "${(data.title || uid).slice(0, 50)}"`);
  return true;
}

async function createCollectionEntry(uid, data, locale = 'th') {
  const headers = authHeaders();
  const res = await fetch(`${BASE_URL}/api/${uid}?locale=${locale}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  const result = await res.json();
  if (!res.ok) {
    console.error(`  ❌ ${uid} (${locale}): ${res.status}`, (result.error?.message || '').slice(0, 200));
    return null;
  }
  console.log(`  ✅ ${uid} (${locale}): created "${(data.title || '').slice(0, 50)}"`);
  return result.data;
}

// ═══════════════════════════════════════════════════════════════════════════
// FAQ DATA
// ═══════════════════════════════════════════════════════════════════════════

const faqDataTh = [
  {
    title: 'คำถามทั่วไป',
    slug: 'support-general',
    description: 'คำถามที่พบบ่อยเกี่ยวกับสินค้าและบริการ',
    sort_order: 0,
    is_active: true,
    items: [
      { question: 'Ryhts จำหน่ายสินค้าอะไรบ้าง?', answer: '<p>Ryhts เป็นผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ดทุกประเภท ได้แก่ Wax Ribbon, Wax-Resin Ribbon และ Resin Ribbon จากแบรนด์ชั้นนำ เช่น Ricoh, CSoft และ ARMOR</p>', sort_order: 0, is_active: true },
      { question: 'สินค้ามีรับประกันหรือไม่?', answer: '<p>สินค้าทุกชิ้นมีรับประกันคุณภาพ หากพบปัญหาสามารถติดต่อทีมขายเพื่อเปลี่ยนหรือคืนสินค้าได้ภายใน 7 วันหลังรับสินค้า</p>', sort_order: 1, is_active: true },
      { question: 'มีบริการจัดส่งหรือไม่?', answer: '<p>เรามีบริการจัดส่งทั่วประเทศ โดยจัดส่งฟรีสำหรับคำสั่งซื้อที่มีมูลค่าเกิน 1,000 บาท จัดส่งภายใน 1-3 วันทำการ</p>', sort_order: 2, is_active: true },
      { question: 'สามารถสั่งซื้อสินค้าได้อย่างไร?', answer: '<p>สามารถสั่งซื้อได้หลายช่องทาง: ผ่านเว็บไซต์, โทรศัพท์, Line, หรืออีเมล ทีมขายจะติดต่อกลับภายใน 1 วันทำการ</p>', sort_order: 3, is_active: true },
    ],
  },
  {
    title: 'ข้อมูลสินค้า',
    slug: 'support-products',
    description: 'ข้อมูลเกี่ยวกับประเภทสินค้าและการเลือกใช้งาน',
    sort_order: 1,
    is_active: true,
    items: [
      { question: 'Wax, Wax-Resin และ Resin ต่างกันอย่างไร?', answer: '<p><strong>Wax</strong> — ราคาประหยัด เหมาะสำหรับบาร์โค้ดทั่วไป ฉลากสินค้า ป้ายราคา</p><p><strong>Wax-Resin</strong> — ผสมผสานความคุ้มค่าของ Wax กับความทนทานของ Resin เหมาะสำหรับฉลากที่ต้องการความทนทานปานกลาง</p><p><strong>Resin</strong> — ทนทานสูงสุด ทนสารเคมี ความร้อน และแสง UV เหมาะสำหรับงานอุตสาหกรรม</p>', sort_order: 0, is_active: true },
      { question: 'ริบบอนของ Ryhts ใช้กับเครื่องพิมพ์รุ่นไหนได้บ้าง?', answer: '<p>ริบบอนของเรา Compatible กับเครื่องพิมพ์บาร์โค้ดจากหลายแบรนด์ชั้นนำ ได้แก่ Zebra, TSC, SATO, Honeywell, ARGOX และอื่นๆ สามารถสอบถามรุ่นที่ต้องการได้ที่ทีมขาย</p>', sort_order: 1, is_active: true },
      { question: 'มีขนาดริบบอนอะไรบ้าง?', answer: '<p>เรามีริบบอนหลายขนาด ได้แก่ 宽度 60mm, 80mm, 110mm โดยความยาวมีตั้งแต่ 300m ถึง 450m ขึ้นอยู่กับรุ่นสินค้า</p>', sort_order: 2, is_active: true },
      { question: 'วิธีเลือกริบบอนให้เหมาะกับการใช้งาน?', answer: '<p>พิจารณาจาก: 1) ประเภทการใช้งาน (ฉลากทั่วไป vs ฉลากอุตสาหกรรม) 2) สภาพแวดล้อม (อุณหภูมิ, สารเคมี, แสง UV) 3) งบประมาณ ทีมขายสามารถให้คำแนะนำได้</p>', sort_order: 3, is_active: true },
    ],
  },
  {
    title: 'การสั่งซื้อและการชำระเงิน',
    slug: 'support-ordering',
    description: 'ข้อมูลเกี่ยวกับการสั่งซื้อและชำระเงิน',
    sort_order: 2,
    is_active: true,
    items: [
      { question: 'สามารถชำระเงินได้อย่างไร?', answer: '<p>รับชำระเงินผ่าน: โอนผ่านธนาคาร, บัตรเครดิต/เดบิต, และ PromptPay สามารถออกใบกำกับภาษีได้</p>', sort_order: 0, is_active: true },
      { question: 'มีนโยบายคืนสินค้าอย่างไร?', answer: '<p>สามารถคืนสินค้าได้ภายใน 7 วันหลังรับสินค้าหากสินค้ามีปัญหาหรือเสียหายจากการจัดส่ง กรุณาติดต่อทีมขายก่อนดำเนินการคืน</p>', sort_order: 1, is_active: true },
      { question: 'ใช้เวลาจัดส่งนานแค่ไหน?', answer: '<p>จัดส่งภายใน 1-3 วันทำการ สำหรับกรุงเทพฯ และปริมณฑล 3-5 วันทำการ สำหรับต่างจังหวัด</p>', sort_order: 2, is_active: true },
    ],
  },
];

const faqDataEn = [
  {
    title: 'General Questions',
    slug: 'support-general-en',
    description: 'Frequently asked questions about our products and services',
    sort_order: 0,
    is_active: true,
    items: [
      { question: 'What products does Ryhts sell?', answer: '<p>Ryhts is a distributor of thermal transfer ribbons for all types of barcode printers, including Wax Ribbon, Wax-Resin Ribbon, and Resin Ribbon from leading brands such as Ricoh, CSoft, and ARMOR.</p>', sort_order: 0, is_active: true },
      { question: 'Do your products come with a warranty?', answer: '<p>All products come with a quality warranty. If you encounter any issues, you can contact our sales team for a replacement or return within 7 days of receiving the product.</p>', sort_order: 1, is_active: true },
      { question: 'Do you offer delivery service?', answer: '<p>We offer nationwide delivery. Free shipping is available for orders over 1,000 THB. Delivery typically takes 1-3 business days.</p>', sort_order: 2, is_active: true },
      { question: 'How can I place an order?', answer: '<p>You can place orders through multiple channels: website, phone, Line, or email. Our sales team will respond within 1 business day.</p>', sort_order: 3, is_active: true },
    ],
  },
  {
    title: 'Product Information',
    slug: 'support-products-en',
    description: 'Information about product types and usage',
    sort_order: 1,
    is_active: true,
    items: [
      { question: 'What is the difference between Wax, Wax-Resin, and Resin?', answer: '<p><strong>Wax</strong> — Affordable, suitable for general barcodes, product labels, price tags.</p><p><strong>Wax-Resin</strong> — Combines the cost-effectiveness of Wax with the durability of Resin. Suitable for labels requiring moderate durability.</p><p><strong>Resin</strong> — Maximum durability, resistant to chemicals, heat, and UV light. Suitable for industrial applications.</p>', sort_order: 0, is_active: true },
      { question: 'Which printer models are compatible with Ryhts ribbons?', answer: '<p>Our ribbons are compatible with barcode printers from major brands including Zebra, TSC, SATO, Honeywell, ARGOX, and more. Contact our sales team for specific model compatibility.</p>', sort_order: 1, is_active: true },
      { question: 'What ribbon sizes are available?', answer: '<p>We offer multiple widths: 60mm, 80mm, and 110mm. Lengths range from 300m to 450m depending on the product model.</p>', sort_order: 2, is_active: true },
      { question: 'How do I choose the right ribbon for my needs?', answer: '<p>Consider: 1) Type of use (general labels vs industrial labels) 2) Environment (temperature, chemicals, UV light) 3) Budget. Our sales team can provide personalized recommendations.</p>', sort_order: 3, is_active: true },
    ],
  },
  {
    title: 'Ordering & Payment',
    slug: 'support-ordering-en',
    description: 'Information about ordering and payment',
    sort_order: 2,
    is_active: true,
    items: [
      { question: 'What payment methods are accepted?', answer: '<p>We accept: bank transfer, credit/debit cards, and PromptPay. Tax invoices are available upon request.</p>', sort_order: 0, is_active: true },
      { question: 'What is your return policy?', answer: '<p>Products can be returned within 7 days of receipt if they are defective or damaged during shipping. Please contact our sales team before proceeding with a return.</p>', sort_order: 1, is_active: true },
      { question: 'How long does delivery take?', answer: '<p>Delivery takes 1-3 business days for Bangkok and metropolitan areas, and 3-5 business days for other provinces.</p>', sort_order: 2, is_active: true },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// SUPPORT PAGE DATA
// ═══════════════════════════════════════════════════════════════════════════

const supportPageTh = {
  hero_section: {
    badge: 'ศูนย์ช่วยเหลือ',
    title: 'เราช่วยคุณได้อย่างไร?',
    subtitle: 'ค้นหาคำตอบสำหรับคำถามที่พบบ่อย หรือติดต่อทีมสนับสนุนของเรา',
    faq_cta_label: 'ดูคำถามที่พบบ่อย',
    manual_cta_label: 'อ่านคู่มือ',
    contact_cta_label: 'ติดต่อฝ่ายสนับสนุน',
  },
  status_card: {
    kicker: 'สถานะทีมสนับสนุน',
    title: 'พร้อมให้บริการ',
    hours: 'จันทร์ - ศุกร์, 08:30 - 17:30 น.',
    status_label: 'ออนไลน์',
  },
  faq_section: {
    badge: 'คำถามที่พบบ่อย',
    title: 'คำถามที่พบบ่อย',
    subtitle: 'คำตอบรวดเร็วสำหรับคำถามที่พบบ่อยที่สุด',
    empty_prompt: 'ยังไม่มีคำถามที่พบบ่อย',
    contact_cta_label: 'ถามคำถาม',
  },
  help_center_section: {
    badge: 'แหล่งข้อมูล',
    title: 'ศูนย์ช่วยเหลือ',
    subtitle: 'คู่มือ แนวทางการแก้ปัญหา และข้อมูลที่เป็นประโยชน์',
  },
  contact_section: {
    badge: 'ติดต่อ',
    title: 'ติดต่อเรา',
    address_label: 'ที่อยู่',
    business_hours_label: 'เวลาทำการ',
    phone_label: 'โทรศัพท์',
    email_label: 'อีเมล',
  },
  seo: {
    meta_title: 'ศูนย์ช่วยเหลือ | Ryhts Ribbon',
    meta_description: 'ค้นหาคำตอบสำหรับคำถามที่พบบ่อย หรือติดต่อทีมสนับสนุนของเรา',
  },
};

const supportPageEn = {
  hero_section: {
    badge: 'Support',
    title: 'How Can We Help?',
    subtitle: 'Find answers to common questions or reach out to our support team',
    faq_cta_label: 'Browse FAQ',
    manual_cta_label: 'Read Manuals',
    contact_cta_label: 'Contact Support',
  },
  status_card: {
    kicker: 'Support Team Status',
    title: 'Available Now',
    hours: 'Mon - Fri, 8:30 AM - 5:30 PM',
    status_label: 'Online',
  },
  faq_section: {
    badge: 'FAQ',
    title: 'Frequently Asked Questions',
    subtitle: 'Quick answers to the most common questions',
    empty_prompt: 'No FAQs available yet.',
    contact_cta_label: 'Ask a Question',
  },
  help_center_section: {
    badge: 'Resources',
    title: 'Help Center',
    subtitle: 'Manuals, guides, and troubleshooting information',
  },
  contact_section: {
    badge: 'Contact',
    title: 'Get in Touch',
    address_label: 'Address',
    business_hours_label: 'Business Hours',
    phone_label: 'Phone',
    email_label: 'Email',
  },
  seo: {
    meta_title: 'Support | Ryhts Ribbon',
    meta_description: 'Find answers to common questions or reach out to our support team',
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════

async function main() {
  console.log('🚀 Seeding support page data...\n');

  let ok = 0;
  let fail = 0;

  // 1. Create FAQ entries (TH)
  console.log('📋 Creating FAQ entries (TH)...');
  const faqIdsTh = [];
  for (const faq of faqDataTh) {
    const result = await createCollectionEntry('faqs', faq, 'th');
    if (result) {
      faqIdsTh.push(result.documentId);
      ok++;
    } else {
      fail++;
    }
  }

  // 2. Create FAQ entries (EN)
  console.log('\n📋 Creating FAQ entries (EN)...');
  const faqIdsEn = [];
  for (const faq of faqDataEn) {
    const result = await createCollectionEntry('faqs', faq, 'en');
    if (result) {
      faqIdsEn.push(result.documentId);
      ok++;
    } else {
      fail++;
    }
  }

  // 3. Create Support Page (TH) with FAQ relations
  console.log('\n📄 Support Page (TH)...');
  const supportPageThData = {
    ...supportPageTh,
    // Link FAQ entries as relations
    faqs: faqIdsTh,
    help_resources: faqIdsTh.slice(0, 2), // Use first 2 FAQs as help resources
  };
  (await seedSingleType('support-page', supportPageThData, 'th')) ? ok++ : fail++;

  // 4. Create Support Page (EN) with FAQ relations
  console.log('\n📄 Support Page (EN)...');
  const supportPageEnData = {
    ...supportPageEn,
    faqs: faqIdsEn,
    help_resources: faqIdsEn.slice(0, 2),
  };
  (await seedSingleType('support-page', supportPageEnData, 'en')) ? ok++ : fail++;

  // 5. Publish support page
  console.log('\n📤 Publishing support page...');
  const publishHeaders = authHeaders();
  try {
    // Publish TH
    const pubResTh = await fetch(`${BASE_URL}/api/support-page?locale=th`, { headers: publishHeaders });
    const pubDataTh = await pubResTh.json();
    if (pubDataTh.data?.documentId) {
      await fetch(`${BASE_URL}/api/support-page/${pubDataTh.data.documentId}/actions/publish?locale=th`, {
        method: 'POST',
        headers: publishHeaders,
      });
      console.log('  ✅ support-page (th): published');
    }

    // Publish EN
    const pubResEn = await fetch(`${BASE_URL}/api/support-page?locale=en`, { headers: publishHeaders });
    const pubDataEn = await pubResEn.json();
    if (pubDataEn.data?.documentId) {
      await fetch(`${BASE_URL}/api/support-page/${pubDataEn.data.documentId}/actions/publish?locale=en`, {
        method: 'POST',
        headers: publishHeaders,
      });
      console.log('  ✅ support-page (en): published');
    }

    // Publish FAQs
    for (const docId of faqIdsTh) {
      await fetch(`${BASE_URL}/api/faqs/${docId}/actions/publish?locale=th`, {
        method: 'POST',
        headers: publishHeaders,
      });
    }
    for (const docId of faqIdsEn) {
      await fetch(`${BASE_URL}/api/faqs/${docId}/actions/publish?locale=en`, {
        method: 'POST',
        headers: publishHeaders,
      });
    }
    console.log('  ✅ FAQ entries published');
  } catch (err) {
    console.warn('  ⚠️  Publish step failed (non-fatal):', err.message);
  }

  console.log(`\n✨ Done: ${ok} succeeded, ${fail} failed`);
  console.log(`\n🔗 Verify: curl http://localhost:1337/api/support-page?locale=th&populate=*`);
}

main().catch(console.error);
