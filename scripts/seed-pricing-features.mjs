/**
 * Seed fake Pricing Feature records for TH and EN.
 *
 * Usage:
 *   node scripts/seed-pricing-features.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const UID = "api::pricing-feature.pricing-feature";

const features = {
  th: [
    {
      name: "ตรวจสอบรุ่นเครื่องพิมพ์",
      description: "ทีมงานช่วยตรวจสอบรุ่นเครื่องพิมพ์และสเปกริบบอนที่รองรับก่อนเสนอราคา",
      category: "คำปรึกษา",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "แนะนำชนิดริบบอน",
      description: "ช่วยเลือก Wax, Wax-Resin หรือ Resin ให้เหมาะกับวัสดุฉลากและสภาพแวดล้อม",
      category: "คำปรึกษา",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "เทียบขนาดและแกนม้วน",
      description: "ตรวจหน้ากว้าง ความยาว และขนาดแกนเพื่อให้ใช้งานกับเครื่องพิมพ์ได้ถูกต้อง",
      category: "สเปกสินค้า",
      sortOrder: 3,
      isActive: true,
    },
    {
      name: "ใบเสนอราคาตามจำนวนใช้งาน",
      description: "ประเมินราคาตามเกรดริบบอน ขนาด จำนวน และเงื่อนไขจัดส่ง",
      category: "ใบเสนอราคา",
      sortOrder: 4,
      isActive: true,
    },
  ],
  en: [
    {
      name: "Printer model check",
      description: "Our team checks printer model and supported ribbon specifications before quoting.",
      category: "Consultation",
      sortOrder: 1,
      isActive: true,
    },
    {
      name: "Ribbon type recommendation",
      description: "Match Wax, Wax-Resin, or Resin with label material and working conditions.",
      category: "Consultation",
      sortOrder: 2,
      isActive: true,
    },
    {
      name: "Size and core comparison",
      description: "Confirm width, roll length, and core size for correct printer compatibility.",
      category: "Specification",
      sortOrder: 3,
      isActive: true,
    },
    {
      name: "Usage-based quotation",
      description: "Estimate pricing based on ribbon grade, size, quantity, and delivery conditions.",
      category: "Quotation",
      sortOrder: 4,
      isActive: true,
    },
  ],
};

async function upsertFeature(locale, data) {
  const documents = strapi.documents(UID);
  const existing = await documents.findFirst({
    locale,
    filters: { name: { $eq: data.name } },
  });

  if (existing?.documentId) {
    await documents.update({ documentId: existing.documentId, locale, data });
  } else {
    await documents.create({ locale, data });
  }
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    for (const feature of features[locale]) {
      await upsertFeature(locale, feature);
    }
    console.log(`Seeded pricing-features (${locale})`);
  }
} finally {
  try {
    await app.destroy();
  } catch (error) {
    if (error?.message !== "aborted") throw error;
  }
}
