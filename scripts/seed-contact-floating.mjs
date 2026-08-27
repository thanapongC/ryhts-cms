/**
 * Seed fake floating contact widget data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-contact-floating.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const UID = "api::contact-floating.contact-floating";

const contactFloating = {
  th: {
    isEnabled: true,
    buttonLabel: "ติดต่อเรา",
    panelTitle: "ติดต่อฝ่ายขาย Ryhts",
    panelDescription:
      "สอบถามสินค้า ขอใบเสนอราคา หรือให้ทีมงานช่วยเลือกรุ่นริบบอนที่เหมาะกับเครื่องพิมพ์ของคุณ",
    closeLabel: "ปิด",
    actions: [
      {
        type: "phone",
        label: "โทรฝ่ายขาย",
        description: "094-624-6649",
        url: "tel:0946246649",
        ariaLabel: "โทรหา Ryhts ที่เบอร์ 094-624-6649",
        sortOrder: 1,
        isActive: true,
      },
      {
        type: "line",
        label: "แชทผ่าน LINE",
        description: "ตอบกลับเร็วในเวลาทำการ",
        url: "https://lin.ee/xnw0e2Y",
        ariaLabel: "ติดต่อ Ryhts ผ่าน LINE",
        openInNewTab: true,
        sortOrder: 2,
        isActive: true,
      },
      {
        type: "facebook",
        label: "Facebook",
        description: "ติดตามข่าวสารและสินค้าใหม่",
        url: "https://www.facebook.com/RyhtsRibbon",
        ariaLabel: "เปิด Facebook Ryhts Ribbon",
        openInNewTab: true,
        sortOrder: 3,
        isActive: true,
      },
      {
        type: "email",
        label: "ส่งอีเมล",
        description: "sales@ryhts.com",
        url: "mailto:sales@ryhts.com",
        ariaLabel: "ส่งอีเมลหา Ryhts",
        sortOrder: 4,
        isActive: true,
      },
    ],
  },
  en: {
    isEnabled: true,
    buttonLabel: "Contact us",
    panelTitle: "Contact Ryhts Sales",
    panelDescription:
      "Ask about products, request a quote, or let our team recommend the right ribbon for your printer.",
    closeLabel: "Close",
    actions: [
      {
        type: "phone",
        label: "Call sales",
        description: "094-624-6649",
        url: "tel:0946246649",
        ariaLabel: "Call Ryhts at 094-624-6649",
        sortOrder: 1,
        isActive: true,
      },
      {
        type: "line",
        label: "Chat on LINE",
        description: "Fast replies during business hours",
        url: "https://lin.ee/xnw0e2Y",
        ariaLabel: "Contact Ryhts on LINE",
        openInNewTab: true,
        sortOrder: 2,
        isActive: true,
      },
      {
        type: "facebook",
        label: "Facebook",
        description: "Follow news and product updates",
        url: "https://www.facebook.com/RyhtsRibbon",
        ariaLabel: "Open Ryhts Ribbon Facebook",
        openInNewTab: true,
        sortOrder: 3,
        isActive: true,
      },
      {
        type: "email",
        label: "Email us",
        description: "sales@ryhts.com",
        url: "mailto:sales@ryhts.com",
        ariaLabel: "Email Ryhts",
        sortOrder: 4,
        isActive: true,
      },
    ],
  },
};

async function upsertContactFloating(locale, data) {
  const documents = strapi.documents(UID);
  const existing = await documents.findFirst({
    locale,
    populate: ["actions"],
  });

  let documentId = existing?.documentId;
  if (documentId) {
    await documents.update({ documentId, locale, data });
  } else {
    const created = await documents.create({ locale, data });
    documentId = created.documentId;
  }

  if (documentId) {
    await documents.publish({ documentId, locale });
  }

  console.log(`Seeded contact-floating (${locale})`);
}

const app = await createStrapi().load();

try {
  await upsertContactFloating("th", contactFloating.th);
  await upsertContactFloating("en", contactFloating.en);
} finally {
  await app.destroy();
}
