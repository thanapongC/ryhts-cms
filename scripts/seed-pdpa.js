/**
 * PDPA & Cookie Management Seed Data
 *
 * Usage:
 *   node scripts/seed-pdpa.js
 *
 * Requires Strapi to be running on http://localhost:1337
 * Requires admin API token in env: STRAPI_ADMIN_TOKEN
 *
 * Content based on:
 * - ryhts.com website content
 * - Thai PDPA (พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562) requirements
 * - CP ALL privacy policy structure
 * - Standard cookie consent best practices
 */

const ADMIN_TOKEN = process.env.STRAPI_ADMIN_TOKEN || 'your-admin-token-here';
const BASE_URL = process.env.STRAPI_URL || 'http://localhost:1337';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ADMIN_TOKEN}`,
};

async function createOrUpdate(uid, data, locale = 'th') {
  // For single types, try to get existing first
  const res = await fetch(`${BASE_URL}/api/${uid}?locale=${locale}`, { headers });
  const existing = await res.json();

  let method, url;
  if (existing.data && existing.data.documentId) {
    method = 'PUT';
    url = `${BASE_URL}/api/${uid}/${existing.data.documentId}?locale=${locale}`;
  } else {
    method = 'POST';
    url = `${BASE_URL}/api/${uid}?locale=${locale}`;
  }

  const result = await fetch(url, {
    method,
    headers,
    body: JSON.stringify({ data }),
  });

  if (!result.ok) {
    const err = await result.text();
    console.error(`❌ Failed ${uid} (${locale}): ${result.status}`, err);
    return null;
  }

  const json = await result.json();
  console.log(`✅ ${uid} (${locale}): ${method} success`);
  return json;
}

async function createCollectionEntry(uid, data, locale = 'th') {
  const result = await fetch(`${BASE_URL}/api/${uid}?locale=${locale}`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });

  if (!result.ok) {
    const err = await result.text();
    console.error(`❌ Failed ${uid} (${locale}): ${result.status}`, err);
    return null;
  }

  const json = await result.json();
  console.log(`✅ ${uid} (${locale}): created "${data.name || data.title}"`);
  return json;
}

// ============================================================
// PDPA Setting - Thai
// ============================================================
const pdpaSettingTh = {
  company_name: 'บริษัท ไรต์ส จำกัด',
  dpo_name: 'เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล',
  dpo_email: 'dpo@ryhts.com',
  dpo_phone: '094-624-6649',
  dpo_position: 'เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (Data Protection Officer)',
  data_retention_days: 365,
  data_retention_description:
    'บริษัทจัดเก็บข้อมูลส่วนบุคคลของท่านไว้เป็นระยะเวลาไม่เกิน 1 ปี นับจากวันที่ได้รับข้อมูล หรือจนกว่าจะมีการร้องขอให้ลบข้อมูล เว้นแต่กฎหมายกำหนดให้จัดเก็บนานกว่านั้น',
  consent_banner_title: 'เราใช้คุกกี้',
  consent_banner_description:
    'เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของท่าน วิเคราะห์การเข้าชมเว็บไซต์ และแสดงเนื้อหาที่เหมาะสมกับความสนใจของท่าน ท่านสามารถเลือกยอมรับหรือปฏิเสธคุกกี้ได้ตามต้องการ',
  consent_accept_all_text: 'ยอมรับทั้งหมด',
  consent_reject_all_text: 'ปฏิเสธทั้งหมด',
  consent_manage_text: 'ตั้งค่าคุกกี้',
  consent_save_text: 'บันทึกการตั้งค่า',
  privacy_policy_url: '/privacy-policy',
  cookie_policy_url: '/cookie-policy',
  rights_text: `<h3>สิทธิของเจ้าของข้อมูลส่วนบุคคล</h3>
<p>ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ท่านมีสิทธิดังต่อไปนี้</p>
<ul>
  <li><strong>สิทธิในการเข้าถึง</strong> - ท่านมีสิทธิขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของท่านที่บริษัทจัดเก็บไว้</li>
  <li><strong>สิทธิในการแก้ไข</strong> - ท่านมีสิทธิขอให้แก้ไขข้อมูลส่วนบุคคลของท่านให้ถูกต้องและเป็นปัจจุบัน</li>
  <li><strong>สิทธิในการลบ</strong> - ท่านมีสิทธิขอให้ลบข้อมูลส่วนบุคคลของท่าน เว้นแต่บริษัทจำเป็นต้องเก็บตามกฎหมาย</li>
  <li><strong>สิทธิในการระงับ</strong> - ท่านมีสิทธิขอให้ระงับการใช้ข้อมูลส่วนบุคคลของท่าน</li>
  <li><strong>สิทธิในการคัดค้าน</strong> - ท่านมีสิทธิคัดค้านการเก็บรวบรวมและใช้ข้อมูลส่วนบุคคลของท่าน</li>
  <li><strong>สิทธิในการโอนย้าย</strong> - ท่านมีสิทธิขอรับข้อมูลส่วนบุคคลของท่านในรูปแบบที่สามารถโอนย้ายได้</li>
  <li><strong>สิทธิในการถอนความยินยอม</strong> - ท่านมีสิทธิถอนความยินยอมที่เคยให้ไว้ได้ทุกเมื่อ</li>
</ul>`,
  third_parties_text: `<h3>การเปิดเผยข้อมูลแก่บุคคลที่สาม</h3>
<p>บริษัทอาจเปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สามในกรณีดังต่อไปนี้</p>
<ul>
  <li><strong>ผู้ให้บริการวิเคราะห์</strong> - Google Analytics สำหรับการวิเคราะห์การเข้าชมเว็บไซต์</li>
  <li><strong>ผู้ให้บริการโฆษณา</strong> - Facebook Pixel สำหรับการโฆษณาที่ตรงกับกลุ่มเป้าหมาย</li>
  <li><strong>ผู้ให้บริการชำระเงิน</strong> - กรณีมีการทำธุรกรรมออนไลน์</li>
  <li><strong>หน่วยงานราชการ</strong> - เมื่อกฎหมายกำหนดหรือมีคำสั่งจากหน่วยงานที่มีอำนาจ</li>
</ul>
<p>บริษัทรับรองว่าบุคคลที่สามเหล่านี้จะรักษาความลับและคุ้มครองข้อมูลส่วนบุคคลของท่านตามมาตรฐานที่กฎหมายกำหนด</p>`,
  contact_text:
    'หากท่านมีคำถามหรือประสงค์จะใช้สิทธิตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล โปรดติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของเราได้ที่ dpo@ryhts.com หรือโทร 094-624-6649',
  is_active: true,
};

// ============================================================
// PDPA Setting - English
// ============================================================
const pdpaSettingEn = {
  company_name: 'Ryhts Co., Ltd.',
  dpo_name: 'Data Protection Officer',
  dpo_email: 'dpo@ryhts.com',
  dpo_phone: '094-624-6649',
  dpo_position: 'Data Protection Officer',
  data_retention_days: 365,
  data_retention_description:
    'We retain your personal data for up to 1 year from the date of collection, or until you request deletion, unless a longer retention period is required by law.',
  consent_banner_title: 'We use cookies',
  consent_banner_description:
    'This website uses cookies to enhance your experience, analyze site traffic, and display content relevant to your interests. You may accept or reject cookies as you prefer.',
  consent_accept_all_text: 'Accept All',
  consent_reject_all_text: 'Reject All',
  consent_manage_text: 'Manage Preferences',
  consent_save_text: 'Save Preferences',
  privacy_policy_url: '/privacy-policy',
  cookie_policy_url: '/cookie-policy',
  rights_text: `<h3>Data Subject Rights</h3>
<p>Under the Personal Data Protection Act B.E. 2562 (2019), you have the following rights:</p>
<ul>
  <li><strong>Right of Access</strong> - You may request access to and a copy of your personal data held by us.</li>
  <li><strong>Right to Rectification</strong> - You may request correction of your personal data to ensure it is accurate and up-to-date.</li>
  <li><strong>Right to Erasure</strong> - You may request deletion of your personal data, unless we are required by law to retain it.</li>
  <li><strong>Right to Restriction</strong> - You may request restriction of processing of your personal data.</li>
  <li><strong>Right to Object</strong> - You may object to the collection and use of your personal data.</li>
  <li><strong>Right to Data Portability</strong> - You may request your personal data in a portable format.</li>
  <li><strong>Right to Withdraw Consent</strong> - You may withdraw your consent at any time.</li>
</ul>`,
  third_parties_text: `<h3>Third-Party Data Sharing</h3>
<p>We may disclose your personal data to third parties in the following circumstances:</p>
<ul>
  <li><strong>Analytics Providers</strong> - Google Analytics for website traffic analysis</li>
  <li><strong>Advertising Partners</strong> - Facebook Pixel for targeted advertising</li>
  <li><strong>Payment Processors</strong> - For online transactions (when applicable)</li>
  <li><strong>Government Authorities</strong> - When required by law or regulatory order</li>
</ul>
<p>We ensure that these third parties maintain the confidentiality and protection of your personal data as required by law.</p>`,
  contact_text:
    'If you have questions or wish to exercise your rights under the PDPA, please contact our Data Protection Officer at dpo@ryhts.com or call 094-624-6649.',
  is_active: true,
};

// ============================================================
// Cookie Categories - Thai
// ============================================================
const cookieCategoriesTh = [
  {
    name: 'คุกกี้ที่จำเป็น',
    slug: 'necessary',
    description:
      'คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้ โดยปกติจะถูกตั้งค่าเพื่อตอบสนองต่อการกระทำของท่าน เช่น การตั้งค่าความเป็นส่วนตัว การเข้าสู่ระบบ หรือการกรอกแบบฟอร์ม',
    is_required: true,
    is_default_enabled: true,
    sort_order: 0,
    cookies: JSON.stringify([
      {
        name: 'session_id',
        provider: 'Ryhts',
        purpose: 'รักษาสถานะการเข้าสู่ระบบ',
        duration: 'Session',
        type: 'HTTP',
      },
      {
        name: 'csrf_token',
        provider: 'Ryhts',
        purpose: 'ป้องกันการโจมตี CSRF',
        duration: 'Session',
        type: 'HTTP',
      },
      {
        name: 'cookie_consent',
        provider: 'Ryhts',
        purpose: 'จัดเก็บการตั้งค่าคุกกี้ของผู้ใช้',
        duration: '1 ปี',
        type: 'HTTP',
      },
      {
        name: 'lang',
        provider: 'Ryhts',
        purpose: 'จัดเก็บภาษากลาง',
        duration: '1 ปี',
        type: 'HTTP',
      },
    ]),
    privacy_policy_url: '',
  },
  {
    name: 'คุกกี้เพื่อการทำงาน',
    slug: 'functional',
    description:
      'คุกกี้เหล่านี้ใช้เพื่อปรับปรุงการทำงานของเว็บไซต์ เช่น การจดจำการตั้งค่าของท่าน การแสดงเนื้อหาที่เหมาะสมกับพื้นที่ และการให้บริการที่ตรงกับความต้องการของท่าน',
    is_required: false,
    is_default_enabled: false,
    sort_order: 1,
    cookies: JSON.stringify([
      {
        name: 'last_viewed',
        provider: 'Ryhts',
        purpose: 'จดจำสินค้าที่เพิ่งดูล่าสุด',
        duration: '30 วัน',
        type: 'HTTP',
      },
      {
        name: 'currency_pref',
        provider: 'Ryhts',
        purpose: 'จดจำสกุลเงินที่เลือก',
        duration: '1 ปี',
        type: 'HTTP',
      },
      {
        name: 'region',
        provider: 'Ryhts',
        purpose: 'จดจำภูมิภาคของผู้ใช้',
        duration: '1 ปี',
        type: 'HTTP',
      },
    ]),
    privacy_policy_url: '',
  },
  {
    name: 'คุกกี้วิเคราะห์',
    slug: 'analytics',
    description:
      'คุกกี้เหล่านี้ใช้สำหรับวิเคราะห์การเข้าชมเว็บไซต์ เพื่อเข้าใจว่าผู้เข้าชมใช้เว็บไซต์อย่างไร ข้อมูลที่เก็บรวบรวมจะถูกนำมาใช้ในการปรับปรุงเว็บไซต์',
    is_required: false,
    is_default_enabled: false,
    sort_order: 2,
    cookies: JSON.stringify([
      {
        name: '_ga',
        provider: 'Google Analytics',
        purpose: 'วิเคราะห์การเข้าชมเว็บไซต์',
        duration: '2 ปี',
        type: 'HTTP',
      },
      {
        name: '_ga_*',
        provider: 'Google Analytics',
        purpose: 'วิเคราะห์การเข้าชมเว็บไซต์',
        duration: '2 ปี',
        type: 'HTTP',
      },
      {
        name: '_gid',
        provider: 'Google Analytics',
        purpose: 'แยกแยะผู้ใช้',
        duration: '24 ชั่วโมง',
        type: 'HTTP',
      },
      {
        name: '_gat',
        provider: 'Google Analytics',
        purpose: 'จำกัดอัตราการร้องขอ',
        duration: '1 นาที',
        type: 'HTTP',
      },
    ]),
    privacy_policy_url: 'https://policies.google.com/privacy',
  },
  {
    name: 'คุกกี้โฆษณา',
    slug: 'marketing',
    description:
      'คุกกี้เหล่านี้ใช้สำหรับการแสดงโฆษณาที่ตรงกับความสนใจของท่าน โดยอาจถูกตั้งค่าโดยพันธมิตรโฆษณาของเรา เพื่อสร้างโปรไฟล์ความสนใจและแสดงโฆษณาที่เหมาะสมบนเว็บไซต์อื่น',
    is_required: false,
    is_default_enabled: false,
    sort_order: 3,
    cookies: JSON.stringify([
      {
        name: '_fbp',
        provider: 'Facebook',
        purpose: 'แสดงโฆษณาที่ตรงกับกลุ่มเป้าหมาย',
        duration: '3 เดือน',
        type: 'HTTP',
      },
      {
        name: '_fbc',
        provider: 'Facebook',
        purpose: 'ติดตามแคมเปญโฆษณา',
        duration: '2 ปี',
        type: 'HTTP',
      },
      {
        name: 'fr',
        provider: 'Facebook',
        purpose: 'แสดงโฆษณาที่ตรงกับกลุ่มเป้าหมาย',
        duration: '3 เดือน',
        type: 'HTTP',
      },
    ]),
    privacy_policy_url: 'https://www.facebook.com/privacy/policy/',
  },
];

// ============================================================
// Cookie Categories - English
// ============================================================
const cookieCategoriesEn = [
  {
    name: 'Necessary',
    slug: 'necessary',
    description:
      'These cookies are essential for the website to function and cannot be disabled. They are typically set in response to actions such as setting privacy preferences, logging in, or filling in forms.',
    is_required: true,
    is_default_enabled: true,
    sort_order: 0,
    cookies: JSON.stringify([
      {
        name: 'session_id',
        provider: 'Ryhts',
        purpose: 'Maintains login session',
        duration: 'Session',
        type: 'HTTP',
      },
      {
        name: 'csrf_token',
        provider: 'Ryhts',
        purpose: 'Prevents CSRF attacks',
        duration: 'Session',
        type: 'HTTP',
      },
      {
        name: 'cookie_consent',
        provider: 'Ryhts',
        purpose: 'Stores user cookie preferences',
        duration: '1 year',
        type: 'HTTP',
      },
      {
        name: 'lang',
        provider: 'Ryhts',
        purpose: 'Stores language preference',
        duration: '1 year',
        type: 'HTTP',
      },
    ]),
    privacy_policy_url: '',
  },
  {
    name: 'Functional',
    slug: 'functional',
    description:
      'These cookies enhance website functionality by remembering your preferences, showing content relevant to your region, and providing services tailored to your needs.',
    is_required: false,
    is_default_enabled: false,
    sort_order: 1,
    cookies: JSON.stringify([
      {
        name: 'last_viewed',
        provider: 'Ryhts',
        purpose: 'Remembers recently viewed products',
        duration: '30 days',
        type: 'HTTP',
      },
      {
        name: 'currency_pref',
        provider: 'Ryhts',
        purpose: 'Remembers selected currency',
        duration: '1 year',
        type: 'HTTP',
      },
      {
        name: 'region',
        provider: 'Ryhts',
        purpose: 'Remembers user region',
        duration: '1 year',
        type: 'HTTP',
      },
    ]),
    privacy_policy_url: '',
  },
  {
    name: 'Analytics',
    slug: 'analytics',
    description:
      'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the website.',
    is_required: false,
    is_default_enabled: false,
    sort_order: 2,
    cookies: JSON.stringify([
      {
        name: '_ga',
        provider: 'Google Analytics',
        purpose: 'Website analytics',
        duration: '2 years',
        type: 'HTTP',
      },
      {
        name: '_ga_*',
        provider: 'Google Analytics',
        purpose: 'Website analytics',
        duration: '2 years',
        type: 'HTTP',
      },
      {
        name: '_gid',
        provider: 'Google Analytics',
        purpose: 'Distinguishes users',
        duration: '24 hours',
        type: 'HTTP',
      },
      {
        name: '_gat',
        provider: 'Google Analytics',
        purpose: 'Throttles request rate',
        duration: '1 minute',
        type: 'HTTP',
      },
    ]),
    privacy_policy_url: 'https://policies.google.com/privacy',
  },
  {
    name: 'Marketing',
    slug: 'marketing',
    description:
      'These cookies are used to display ads relevant to your interests. They may be set by our advertising partners to build a profile of your interests and show relevant ads on other sites.',
    is_required: false,
    is_default_enabled: false,
    sort_order: 3,
    cookies: JSON.stringify([
      {
        name: '_fbp',
        provider: 'Facebook',
        purpose: 'Targeted advertising',
        duration: '3 months',
        type: 'HTTP',
      },
      {
        name: '_fbc',
        provider: 'Facebook',
        purpose: 'Tracks ad campaigns',
        duration: '2 years',
        type: 'HTTP',
      },
      {
        name: 'fr',
        provider: 'Facebook',
        purpose: 'Targeted advertising',
        duration: '3 months',
        type: 'HTTP',
      },
    ]),
    privacy_policy_url: 'https://www.facebook.com/privacy/policy/',
  },
];

// ============================================================
// Cookie Policy - Thai
// ============================================================
const cookiePolicyTh = {
  title: 'นโยบายคุกกี้',
  description: 'นโยบายนี้อธิบายว่าบริษัท ไรต์ส จำกัด ใช้คุกกี้บนเว็บไซต์นี้อย่างไร',
  content: `<h2>นโยบายคุกกี้ (Cookie Policy)</h2>
<p><strong>บริษัท ไรต์ส จำกัด</strong> ("บริษัท") ตระหนักถึงความสำคัญของคุ้มครองข้อมูลส่วนบุคคลของผู้เข้าชมเว็บไซต์ นโยบายนี้จะอธิบายว่าบริษัทใช้คุกกี้และเทคโนโลยีที่คล้ายคลึงกันอย่างไรบนเว็บไซต์ <strong>ryhts.com</strong></p>

<h3>คุกกี้คืออะไร</h3>
<p>คุกกี้ (Cookie) คือไฟล์ข้อมูลขนาดเล็กที่ถูกจัดเก็บไว้ในอุปกรณ์ของท่านเมื่อท่านเข้าเยี่ยมชมเว็บไซต์ คุกกี้ช่วยให้เว็บไซต์จดจำการตั้งค่าและการเข้าชมครั้งก่อนๆ ของท่าน</p>

<h3>ประเภทของคุกกี้ที่เราใช้</h3>

<h4>1. คุกกี้ที่จำเป็น (Necessary Cookies)</h4>
<p>คุกกี้เหล่านี้จำเป็นสำหรับการทำงานของเว็บไซต์ ไม่สามารถปิดการใช้งานได้ โดยปกติจะถูกตั้งค่าเฉพาะเมื่อท่านดำเนินการบางอย่าง เช่น การตั้งค่าความเป็นส่วนตัว การเข้าสู่ระบบ หรือการกรอกแบบฟอร์ม</p>

<h4>2. คุกกี้เพื่อการทำงาน (Functional Cookies)</h4>
<p>คุกกี้เหล่านี้ใช้เพื่อปรับปรุงการทำงานของเว็บไซต์ เช่น การจดจำการตั้งค่าของท่าน การแสดงเนื้อหาที่เหมาะสมกับพื้นที่</p>

<h4>3. คุกกี้วิเคราะห์ (Analytics Cookies)</h4>
<p>คุกกี้เหล่านี้ใช้สำหรับวิเคราะห์การเข้าชมเว็บไซต์ เพื่อเข้าใจว่าผู้เข้าชมใช้เว็บไซต์อย่างไร ข้อมูลที่เก็บรวบรวมจะถูกนำมาใช้ในการปรับปรุงเว็บไซต์</p>

<h4>4. คุกกี้โฆษณา (Marketing Cookies)</h4>
<p>คุกกี้เหล่านี้ใช้สำหรับการแสดงโฆษณาที่ตรงกับความสนใจของท่าน โดยอาจถูกตั้งค่าโดยพันธมิตรโฆษณาของเรา</p>

<h3>วิธีจัดการคุกกี้</h3>
<p>ท่านสามารถจัดการคุกกี้ได้ผ่านการตั้งค่าคุกกี้บนเว็บไซต์ของเรา โดยคลิกที่ปุ่ม "ตั้งค่าคุกกี้" ที่มุมล่างซ้ายของหน้าจอ</p>
<p>นอกจากนี้ ท่านยังสามารถจัดการคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของท่านได้ดังนี้</p>
<ul>
  <li><strong>Google Chrome:</strong> การตั้งค่า > ความเป็นส่วนตัวและความปลอดภัย > คุกกี้</li>
  <li><strong>Mozilla Firefox:</strong> การตั้งค่า > ความเป็นส่วนตัว > คุกกี้</li>
  <li><strong>Safari:</strong> การตั้งค่า > ความเป็นส่วนตัว > คุกกี้</li>
  <li><strong>Microsoft Edge:</strong> การตั้งค่า > ความเป็นส่วนตูล > คุกกี้</li>
</ul>

<h3>การอัปเดตนโยบาย</h3>
<p>บริษัทอาจอัปเดตนโยบายนี้เป็นครั้งคราว โปรดตรวจสอบนโยบายนี้เป็นระยะเพื่อรับทราบการเปลี่ยนแปลง</p>`,
  last_updated: '2024-08-15T00:00:00.000Z',
  meta_title: 'นโยบายคุกกี้ | Ryhts',
  meta_description: 'เรียนรู้เกี่ยวกับคุกกี้ที่เราใช้บนเว็บไซต์ ryhts.com',
};

// ============================================================
// Cookie Policy - English
// ============================================================
const cookiePolicyEn = {
  title: 'Cookie Policy',
  description: 'This policy explains how Ryhts Co., Ltd. uses cookies on this website.',
  content: `<h2>Cookie Policy</h2>
<p><strong>Ryhts Co., Ltd.</strong> ("we", "us", or "our") is committed to protecting the privacy of website visitors. This policy explains how we use cookies and similar technologies on our website <strong>ryhts.com</strong>.</p>

<h3>What Are Cookies</h3>
<p>Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and previous visits.</p>

<h3>Types of Cookies We Use</h3>

<h4>1. Necessary Cookies</h4>
<p>These cookies are essential for the website to function and cannot be disabled. They are typically set only in response to actions you take, such as setting privacy preferences, logging in, or filling in forms.</p>

<h4>2. Functional Cookies</h4>
<p>These cookies enhance website functionality by remembering your preferences and showing content relevant to your region.</p>

<h4>3. Analytics Cookies</h4>
<p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the website.</p>

<h4>4. Marketing Cookies</h4>
<p>These cookies are used to display ads relevant to your interests. They may be set by our advertising partners.</p>

<h3>How to Manage Cookies</h3>
<p>You can manage cookies through our cookie settings by clicking the "Manage Cookies" button at the bottom left of the screen.</p>
<p>Additionally, you can manage cookies through your browser settings as follows:</p>
<ul>
  <li><strong>Google Chrome:</strong> Settings > Privacy and Security > Cookies</li>
  <li><strong>Mozilla Firefox:</strong> Settings > Privacy > Cookies</li>
  <li><strong>Safari:</strong> Settings > Privacy > Cookies</li>
  <li><strong>Microsoft Edge:</strong> Settings > Privacy > Cookies</li>
</ul>

<h3>Updates to This Policy</h3>
<p>We may update this policy from time to time. Please check this policy periodically for changes.</p>`,
  last_updated: '2024-08-15T00:00:00.000Z',
  meta_title: 'Cookie Policy | Ryhts',
  meta_description: 'Learn about the cookies we use on the ryhts.com website',
};

// ============================================================
// Privacy Policy - Thai
// ============================================================
const privacyPolicyTh = {
  title: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล',
  description:
    'นโยบายนี้อธิบายว่าบริษัท ไรต์ส จำกัด จัดเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคลของท่านอย่างไร ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562',
  content: `<h2>นโยบายคุ้มครองข้อมูลส่วนบุคคล (Privacy Policy)</h2>
<p><strong>บริษัท ไรต์ส จำกัด</strong> ("บริษัท") ตระหนักถึงความสำคัญของคุ้มครองข้อมูลส่วนบุคคลของลูกค้า คู่ค้า และผู้เข้าชมเว็บไซต์ นโยบายนี้จัดทำขึ้นตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 ("พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล")</p>

<h3>1. ข้อมูลส่วนบุคคลที่บริษัทจัดเก็บ</h3>
<p>บริษัทจัดเก็บข้อมูลส่วนบุคคลของท่านในกรณีดังต่อไปนี้</p>
<ul>
  <li><strong>ข้อมูลที่ท่านให้ไว้โดยตรง:</strong> ชื่อ-นามสกุล อีเมล เบอร์โทรศัพท์ ที่อยู่ รายละเอียดการติดต่อ</li>
  <li><strong>ข้อมูลจากการใช้งานเว็บไซต์:</strong> ข้อมูลการเข้าชม ประวัติการค้นหา ข้อมูลอุปกรณ์</li>
  <li><strong>ข้อมูลจากคุกกี้:</strong> ข้อมูลการตั้งค่า ข้อมูลการวิเคราะห์การเข้าชม</li>
</ul>

<h3>2. วัตถุประสงค์ในการจัดเก็บข้อมูล</h3>
<p>บริษัทจัดเก็บข้อมูลส่วนบุคคลของท่านเพื่อวัตถุประสงค์ดังต่อไปนี้</p>
<ul>
  <li>เพื่อให้บริการและอำนวยความสะดวกในการใช้งานเว็บไซต์</li>
  <li>เพื่อติดต่อสื่อสารและตอบคำถามของท่าน</li>
  <li>เพื่อพัฒนาและปรับปรุงสินค้าและบริการ</li>
  <li>เพื่อวิเคราะห์ข้อมูลการใช้งานเว็บไซต์</li>
  <li>เพื่อปฏิบัติตามกฎหมายและกฎระเบียบที่เกี่ยวข้อง</li>
  <li>เพื่อส่งเสริมการขายและการตลาด (เฉพาะกรณีที่ได้รับความยินยอม)</li>
</ul>

<h3>3. การเปิดเผยข้อมูลส่วนบุคคล</h3>
<p>บริษัทอาจเปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลที่สามในกรณีดังต่อไปนี้</p>
<ul>
  <li>ผู้ให้บริการที่บริษัทว่าจ้างเพื่อสนับสนุนการดำเนินงาน</li>
  <li>พันธมิตรทางธุรกิจของบริษัท</li>
  <li>หน่วยงานราชการ เมื่อกฎหมายกำหนด</li>
</ul>

<h3>4. การรักษาความปลอดภัยของข้อมูล</h3>
<p>บริษัทใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อป้องกันการเข้าถึง การใช้ หรือการเปิดเผยข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต</p>

<h3>5. สิทธิของเจ้าของข้อมูลส่วนบุคคล</h3>
<p>ท่านมีสิทธิดังต่อไปนี้ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล</p>
<ul>
  <li><strong>สิทธิในการเข้าถึง</strong> - ท่านมีสิทธิขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคลของท่าน</li>
  <li><strong>สิทธิในการแก้ไข</strong> - ท่านมีสิทธิขอให้แก้ไขข้อมูลส่วนบุคคลให้ถูกต้อง</li>
  <li><strong>สิทธิในการลบ</strong> - ท่านมีสิทธิขอให้ลบข้อมูลส่วนบุคคล เว้นแต่บริษัทจำเป็นต้องเก็บตามกฎหมาย</li>
  <li><strong>สิทธิในการระงับ</strong> - ท่านมีสิทธิขอให้ระงับการใช้ข้อมูลส่วนบุคคล</li>
  <li><strong>สิทธิในการคัดค้าน</strong> - ท่านมีสิทธิคัดค้านการเก็บรวบรวมและใช้ข้อมูล</li>
  <li><strong>สิทธิในการโอนย้าย</strong> - ท่านมีสิทธิขอรับข้อมูลในรูปแบบที่สามารถโอนย้ายได้</li>
  <li><strong>สิทธิในการถอนความยินยอม</strong> - ท่านสามารถถอนความยินยอมได้ทุกเมื่อ</li>
</ul>

<h3>6. การเก็บรักษาข้อมูล</h3>
<p>บริษัทจัดเก็บข้อมูลส่วนบุคคลของท่านเป็นระยะเวลาไม่เกิน 1 ปี นับจากวันที่ได้รับข้อมูล หรือจนกว่าจะมีการร้องขอให้ลบข้อมูล</p>

<h3>7. การติดต่อบริษัท</h3>
<p>หากท่านมีคำถามหรือประสงค์จะใช้สิทธิตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล โปรดติดต่อ</p>
<ul>
  <li><strong>เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)</strong></li>
  <li><strong>อีเมล:</strong> dpo@ryhts.com</li>
  <li><strong>โทรศัพท์:</strong> 094-624-6649</li>
</ul>`,
  effective_date: '2024-06-01T00:00:00.000Z',
  last_updated: '2024-08-15T00:00:00.000Z',
  meta_title: 'นโยบายคุ้มครองข้อมูลส่วนบุคคล | Ryhts',
  meta_description:
    'นโยบายคุ้มครองข้อมูลส่วนบุคคลของบริษัท ไรต์ส จำกัด ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562',
};

// ============================================================
// Privacy Policy - English
// ============================================================
const privacyPolicyEn = {
  title: 'Privacy Policy',
  description:
    'This policy explains how Ryhts Co., Ltd. collects, uses, and protects your personal data under the Personal Data Protection Act B.E. 2562.',
  content: `<h2>Privacy Policy</h2>
<p><strong>Ryhts Co., Ltd.</strong> ("we", "us", or our") is committed to protecting the personal data of our customers, partners, and website visitors. This policy is issued in accordance with the Personal Data Protection Act B.E. 2562 (2019) ("PDPA").</p>

<h3>1. Personal Data We Collect</h3>
<p>We collect your personal data in the following circumstances:</p>
<ul>
  <li><strong>Data you provide directly:</strong> Name, email, phone number, address, contact details</li>
  <li><strong>Data from website usage:</strong> Browsing history, search history, device information</li>
  <li><strong>Data from cookies:</strong> Preference settings, analytics data</li>
</ul>

<h3>2. Purpose of Data Collection</h3>
<p>We collect your personal data for the following purposes:</p>
<ul>
  <li>To provide services and facilitate website usage</li>
  <li>To communicate with you and respond to your inquiries</li>
  <li>To develop and improve our products and services</li>
  <li>To analyze website usage data</li>
  <li>To comply with applicable laws and regulations</li>
  <li>For sales and marketing promotion (only with your consent)</li>
</ul>

<h3>3. Disclosure of Personal Data</h3>
<p>We may disclose your personal data to third parties in the following circumstances:</p>
<ul>
  <li>Service providers hired to support our operations</li>
  <li>Our business partners</li>
  <li>Government authorities, when required by law</li>
</ul>

<h3>4. Data Security</h3>
<p>We employ appropriate security measures to prevent unauthorized access, use, or disclosure of your personal data.</p>

<h3>5. Data Subject Rights</h3>
<p>Under the PDPA, you have the following rights:</p>
<ul>
  <li><strong>Right of Access</strong> - You may request access to and a copy of your personal data</li>
  <li><strong>Right to Rectification</strong> - You may request correction of your personal data</li>
  <li><strong>Right to Erasure</strong> - You may request deletion of your personal data, unless we are required by law to retain it</li>
  <li><strong>Right to Restriction</strong> - You may request restriction of processing of your personal data</li>
  <li><strong>Right to Object</strong> - You may object to the collection and use of your personal data</li>
  <li><strong>Right to Data Portability</strong> - You may request your personal data in a portable format</li>
  <li><strong>Right to Withdraw Consent</strong> - You may withdraw your consent at any time</li>
</ul>

<h3>6. Data Retention</h3>
<p>We retain your personal data for up to 1 year from the date of collection, or until you request deletion, unless a longer retention period is required by law.</p>

<h3>7. Contact Us</h3>
<p>If you have questions or wish to exercise your rights under the PDPA, please contact:</p>
<ul>
  <li><strong>Data Protection Officer (DPO)</strong></li>
  <li><strong>Email:</strong> dpo@ryhts.com</li>
  <li><strong>Phone:</strong> 094-624-6649</li>
</ul>`,
  effective_date: '2024-06-01T00:00:00.000Z',
  last_updated: '2024-08-15T00:00:00.000Z',
  meta_title: 'Privacy Policy | Ryhts',
  meta_description:
    'Ryhts privacy policy - how we collect, use, and protect your personal data under PDPA',
};

// ============================================================
// Main
// ============================================================
async function main() {
  console.log('🚀 Starting PDPA & Cookie seed...\n');

  // 1. PDPA Setting
  console.log('--- PDPA Setting ---');
  await createOrUpdate('pdpa-setting', pdpaSettingTh, 'th');
  await createOrUpdate('pdpa-setting', pdpaSettingEn, 'en');

  // 2. Cookie Categories
  console.log('\n--- Cookie Categories ---');
  for (const cat of cookieCategoriesTh) {
    await createCollectionEntry('cookie-categories', cat, 'th');
  }
  for (const cat of cookieCategoriesEn) {
    await createCollectionEntry('cookie-categories', cat, 'en');
  }

  // 3. Cookie Policy
  console.log('\n--- Cookie Policy ---');
  await createOrUpdate('cookie-policy', cookiePolicyTh, 'th');
  await createOrUpdate('cookie-policy', cookiePolicyEn, 'en');

  // 4. Privacy Policy
  console.log('\n--- Privacy Policy ---');
  await createOrUpdate('privacy-policy', privacyPolicyTh, 'th');
  await createOrUpdate('privacy-policy', privacyPolicyEn, 'en');

  console.log('\n✨ Seed complete!');
}

main().catch(console.error);
