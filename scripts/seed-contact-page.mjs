/**
 * Seed fake Contact page data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-contact-page.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const PAGE_UID = "api::contact-page.contact-page";

const pages = {
  th: {
    title: "ติดต่อ Ryhts",
    subtitle: "สอบถามสินค้า ขอใบเสนอราคา หรือให้ทีมงานช่วยเลือกริบบอนให้เหมาะกับเครื่องพิมพ์ของคุณ",
    content:
      "<p>ทีม Ryhts พร้อมให้คำแนะนำเกี่ยวกับริบบอน Wax, Wax-Resin และ Resin สำหรับงานพิมพ์บาร์โค้ดทุกประเภท แจ้งรุ่นเครื่องพิมพ์ ขนาดริบบอน และวัสดุฉลากที่ใช้ เพื่อให้ทีมงานแนะนำสินค้าได้ตรงกับหน้างานมากขึ้น</p>",
    seo: {
      metaTitle: "ติดต่อ Ryhts | ริบบอนเครื่องพิมพ์บาร์โค้ด",
      metaDescription: "ติดต่อฝ่ายขาย Ryhts เพื่อสอบถามสินค้า ขอใบเสนอราคา หรือรับคำแนะนำการเลือกริบบอน",
      ogType: "website",
      schemaType: "ContactPage",
    },
  },
  en: {
    title: "Contact Ryhts",
    subtitle: "Ask about products, request a quote, or let our team recommend the right ribbon for your printer.",
    content:
      "<p>The Ryhts team can help you choose Wax, Wax-Resin, and Resin ribbons for barcode printing workflows. Share your printer model, ribbon size, and label material so our team can recommend the best fit for your production needs.</p>",
    seo: {
      metaTitle: "Contact Ryhts | Barcode Printer Ribbons",
      metaDescription: "Contact Ryhts sales to ask about products, request a quote, or get ribbon selection guidance.",
      ogType: "website",
      schemaType: "ContactPage",
    },
  },
};

async function upsertContactPage(locale, data) {
  const documents = strapi.documents(PAGE_UID);
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
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    await upsertContactPage(locale, pages[locale]);
    console.log(`Seeded contact-page (${locale})`);
  }
} finally {
  await app.destroy();
}
