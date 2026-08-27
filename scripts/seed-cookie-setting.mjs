/**
 * Seed fake Cookie Settings data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-cookie-setting.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const COOKIE_SETTING_UID = "api::cookie-setting.cookie-setting";

const data = {
  th: {
    settings: {
      title: "เราใช้คุกกี้",
      description: "เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ วิเคราะห์การใช้งานเว็บไซต์ และนำเสนอเนื้อหาที่เหมาะสม",
      necessaryLabel: "คุกกี้จำเป็น",
      necessaryDesc: "จำเป็นต่อการทำงานพื้นฐานของเว็บไซต์",
      functionalLabel: "คุกกี้ฟังก์ชัน",
      functionalDesc: "ช่วยจดจำการตั้งค่าและปรับปรุงประสบการณ์การใช้งาน",
      analyticsLabel: "คุกกี้วิเคราะห์",
      analyticsDesc: "ช่วยให้เราเข้าใจวิธีที่ผู้เยี่ยมชมใช้งานเว็บไซต์",
      marketingLabel: "คุกกี้การตลาด",
      marketingDesc: "ใช้เพื่อแสดงเนื้อหาและโฆษณาที่เกี่ยวข้อง",
      acceptAllLabel: "ยอมรับทั้งหมด",
      rejectAllLabel: "ปฏิเสธคุกกี้เสริม",
      savePreferencesLabel: "บันทึกการตั้งค่า",
      manageLabel: "ตั้งค่าคุกกี้",
      closeLabel: "ปิด",
      cookiePolicyLabel: "นโยบายคุกกี้",
      privacyPolicyLabel: "นโยบายความเป็นส่วนตัว",
      alwaysOnLabel: "จำเป็น",
      learnMoreLabel: "เรียนรู้เพิ่มเติม",
    },
  },
  en: {
    settings: {
      title: "We use cookies",
      description: "We use cookies to improve your experience, analyze site traffic, and serve relevant content.",
      necessaryLabel: "Necessary",
      necessaryDesc: "Essential cookies for the site to function properly.",
      functionalLabel: "Functional",
      functionalDesc: "Remember preferences and improve the browsing experience.",
      analyticsLabel: "Analytics",
      analyticsDesc: "Help us understand how visitors interact with the site.",
      marketingLabel: "Marketing",
      marketingDesc: "Used to deliver relevant content and advertising.",
      acceptAllLabel: "Accept All",
      rejectAllLabel: "Reject Optional",
      savePreferencesLabel: "Save Preferences",
      manageLabel: "Cookie Preferences",
      closeLabel: "Close",
      cookiePolicyLabel: "Cookie Policy",
      privacyPolicyLabel: "Privacy Policy",
      alwaysOnLabel: "Required",
      learnMoreLabel: "Learn more",
    },
  },
};

async function upsertCookieSetting(locale, payload) {
  const documents = strapi.documents(COOKIE_SETTING_UID);
  const existing = await documents.findFirst({ locale });

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

  console.log(`Seeded cookie-setting (${locale})`);
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    await upsertCookieSetting(locale, data[locale]);
  }
} finally {
  await app.destroy();
}
