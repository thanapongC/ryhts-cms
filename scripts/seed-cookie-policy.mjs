/**
 * Seed fake Cookie Policy page data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-cookie-policy.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const COOKIE_POLICY_UID = "api::cookie-policy.cookie-policy";

const pages = {
  th: {
    heroBadge: "นโยบายคุกกี้",
    heroTitle: "นโยบายคุกกี้",
    heroSubtitle: "รายละเอียดประเภทคุกกี้ที่ Ryhts ใช้เพื่อให้เว็บไซต์ทำงานได้ดีและปลอดภัย",
    lastUpdated: "27 สิงหาคม 2569",
    categoriesBadge: "ประเภทคุกกี้",
    categoriesTitle: "คุกกี้ที่เราใช้",
    categoriesDescription: "คุณสามารถจัดการความยินยอมคุกกี้ได้จากแบนเนอร์หรือปุ่มตั้งค่าด้านล่าง",
    categories: [
      {
        title: "คุกกี้จำเป็น",
        description: "ใช้เพื่อให้เว็บไซต์ทำงาน เช่น การจดจำสถานะความยินยอมและความปลอดภัยพื้นฐาน",
        icon: "shield",
        accent: "red",
        sortOrder: 1,
        isActive: true,
      },
      {
        title: "คุกกี้ฟังก์ชัน",
        description: "ช่วยจดจำการตั้งค่าภาษาและประสบการณ์การใช้งานที่เหมาะกับผู้ใช้",
        icon: "settings",
        accent: "orange",
        sortOrder: 2,
        isActive: true,
      },
      {
        title: "คุกกี้วิเคราะห์",
        description: "ช่วยให้เราเข้าใจการใช้งานเว็บไซต์เพื่อนำไปปรับปรุงเนื้อหาและบริการ",
        icon: "analytics",
        accent: "orange",
        sortOrder: 3,
        isActive: true,
      },
      {
        title: "คุกกี้การตลาด",
        description: "ใช้เพื่อวัดผลแคมเปญและนำเสนอข้อมูลสินค้าที่เกี่ยวข้องกับความสนใจ",
        icon: "marketing",
        accent: "red",
        sortOrder: 4,
        isActive: true,
      },
    ],
    sections: [
      {
        title: "คุกกี้คืออะไร",
        slug: "what-are-cookies",
        summary: "ไฟล์ขนาดเล็กที่ช่วยให้เว็บไซต์จดจำการตั้งค่าและทำงานได้ต่อเนื่อง",
        icon: "cookie",
        sortOrder: 1,
        content:
          "<p>คุกกี้คือไฟล์ขนาดเล็กที่เว็บไซต์บันทึกไว้บนอุปกรณ์ของผู้ใช้งาน เพื่อช่วยให้ระบบจดจำการตั้งค่าและให้บริการได้ต่อเนื่อง</p>",
      },
      {
        title: "การจัดการคุกกี้",
        slug: "manage-cookies",
        summary: "ผู้ใช้งานสามารถปรับความยินยอมคุกกี้เสริมได้ทุกเมื่อ",
        icon: "cookie",
        sortOrder: 2,
        content:
          "<p>ผู้ใช้งานสามารถยอมรับ ปฏิเสธ หรือปรับแต่งคุกกี้เสริมได้ทุกเมื่อผ่านปุ่มจัดการคุกกี้ของเว็บไซต์</p>",
      },
    ],
    manageTitle: "จัดการคุกกี้ของคุณ",
    manageDescription: "เปิดหน้าต่างตั้งค่าเพื่อเลือกประเภทคุกกี้ที่อนุญาตให้ Ryhts ใช้งาน",
    manageButtonLabel: "ตั้งค่าคุกกี้",
    backToTopLabel: "กลับขึ้นด้านบน",
    seo: {
      metaTitle: "นโยบายคุกกี้ | Ryhts",
      metaDescription: "นโยบายคุกกี้ของ Ryhts อธิบายประเภทคุกกี้ วัตถุประสงค์ และวิธีจัดการความยินยอม",
      ogType: "website",
      schemaType: "WebPage",
    },
  },
  en: {
    heroBadge: "Cookie Policy",
    heroTitle: "Cookie Policy",
    heroSubtitle: "Details about the cookies Ryhts uses to keep the website useful, reliable, and secure.",
    lastUpdated: "August 27, 2026",
    categoriesBadge: "Cookie Types",
    categoriesTitle: "Cookies We Use",
    categoriesDescription: "You can manage your cookie consent from the banner or the preference button below.",
    categories: [
      {
        title: "Necessary Cookies",
        description: "Used for core website operation, such as consent status and basic security.",
        icon: "shield",
        accent: "red",
        sortOrder: 1,
        isActive: true,
      },
      {
        title: "Functional Cookies",
        description: "Remember language preferences and improve the browsing experience.",
        icon: "settings",
        accent: "orange",
        sortOrder: 2,
        isActive: true,
      },
      {
        title: "Analytics Cookies",
        description: "Help us understand website usage so we can improve content and services.",
        icon: "analytics",
        accent: "orange",
        sortOrder: 3,
        isActive: true,
      },
      {
        title: "Marketing Cookies",
        description: "Used to measure campaigns and provide product information relevant to your interests.",
        icon: "marketing",
        accent: "red",
        sortOrder: 4,
        isActive: true,
      },
    ],
    sections: [
      {
        title: "What cookies are",
        slug: "what-are-cookies",
        summary: "Small files that help websites remember preferences and provide consistent service.",
        icon: "cookie",
        sortOrder: 1,
        content:
          "<p>Cookies are small files saved on your device by a website. They help the system remember preferences and provide a consistent service.</p>",
      },
      {
        title: "Managing cookies",
        slug: "manage-cookies",
        summary: "You can adjust optional cookie consent at any time.",
        icon: "cookie",
        sortOrder: 2,
        content:
          "<p>You can accept, reject, or customize optional cookies at any time through the website cookie preference controls.</p>",
      },
    ],
    manageTitle: "Manage your cookies",
    manageDescription: "Open preferences to choose which cookie categories Ryhts may use.",
    manageButtonLabel: "Cookie Preferences",
    backToTopLabel: "Back to top",
    seo: {
      metaTitle: "Cookie Policy | Ryhts",
      metaDescription: "Ryhts cookie policy explains cookie categories, purposes, and how to manage consent.",
      ogType: "website",
      schemaType: "WebPage",
    },
  },
};

async function upsertCookiePolicy(locale, data) {
  const documents = strapi.documents(COOKIE_POLICY_UID);
  const existing = await documents.findFirst({ locale });
  const payload = { isPageEnabled: true, ...data };

  let documentId = existing?.documentId;
  if (documentId) {
    await documents.update({ documentId, locale, data: payload });
  } else {
    const created = await documents.create({ locale, data: payload });
    documentId = created.documentId;
  }

  if (documentId) {
    await documents.publish({ documentId, locale });
  }

  console.log(`Seeded cookie-policy (${locale})`);
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    await upsertCookiePolicy(locale, pages[locale]);
  }
} finally {
  await app.destroy();
}
