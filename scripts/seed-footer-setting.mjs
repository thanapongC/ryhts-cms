/**
 * Seed footer-setting content from the current Ryhts website footer for TH and EN.
 *
 * Usage:
 *   node scripts/seed-footer-setting.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const UID = "api::footer-setting.footer-setting";

const companyDescriptionTh =
  "จำหน่ายริบบอนหรือผ้าหมึกพิมพ์สำหรับใช้กับเครื่องพิมพ์บาร์โค้ดทุกขนาด มีให้ท่านเลือกใช้หลายชนิด\nไรต์ส (ryhts) เรามุ่งมั่นที่จะพัฒนาสินค้านำเข้าที่ได้มาตรฐาน และให้บริการที่ตอบโจทย์ ช่วยให้การทำงานของท่านได้สะดวกรวดเร็วและมีประสิทธิภาพที่ดีขึ้น";

const footerTh = {
  ctaBadge: "รับข่าวสาร",
  ctaTitle: "กดรับสมัครข่าวสารจากเรา",
  ctaDescription: "สมัครรับข่าวสารและติดตามสินค้าออกใหม่",
  primaryCtaLabel: "สมัครรับข่าวสาร",
  primaryCtaUrl: "#",
  secondaryCtaLabel: "ติดต่อฝ่ายขาย Ryhts",
  secondaryCtaUrl: "https://lin.ee/xnw0e2Y",
  stats: [],
  companyDescription: companyDescriptionTh,
  footerSections: [
    {
      title: "Links",
      sortOrder: 1,
      isActive: true,
      links: [
        { label: "Our company", url: "/about/", sortOrder: 1, isActive: true },
        { label: "News", url: "/articles/", sortOrder: 2, isActive: true },
        { label: "Contact Ryhts", url: "/contact/", sortOrder: 3, isActive: true },
      ],
    },
  ],
  legalLinks: [],
  copyright: "All Rights Reserved ©2026 | RYHTS | ryhts.com",
};

const footerEn = {
  ctaBadge: "Newsletter",
  ctaTitle: "Subscribe to our newsletter",
  ctaDescription: "Subscribe for news and new product updates",
  primaryCtaLabel: "Subscribe",
  primaryCtaUrl: "#",
  secondaryCtaLabel: "Contact Ryhts Sales",
  secondaryCtaUrl: "https://lin.ee/xnw0e2Y",
  stats: [],
  companyDescription:
    "Supplier of ribbons and ink ribbons for barcode printers in every size, with many types to choose from. Ryhts develops imported products to a reliable standard and provides service that helps your work run faster and more efficiently.",
  footerSections: [
    {
      title: "Links",
      sortOrder: 1,
      isActive: true,
      links: [
        { label: "Our company", url: "/about/", sortOrder: 1, isActive: true },
        { label: "News", url: "/articles/", sortOrder: 2, isActive: true },
        { label: "Contact Ryhts", url: "/contact/", sortOrder: 3, isActive: true },
      ],
    },
  ],
  legalLinks: [],
  copyright: "All Rights Reserved ©2026 | RYHTS | ryhts.com",
};

async function upsertFooterSetting(locale, data) {
  const documents = strapi.documents(UID);
  const existing = await documents.findFirst({
    locale,
    populate: ["stats", "footerSections", "footerSections.links", "legalLinks"],
  });

  let documentId = existing?.documentId;

  if (documentId) {
    await documents.update({
      documentId: existing.documentId,
      locale,
      data,
    });
  } else {
    const created = await documents.create({
      locale,
      data,
    });
    documentId = created.documentId;
  }

  if (documentId) {
    await documents.publish({
      documentId,
      locale,
    });
  }

  console.log(`Seeded footer-setting (${locale})`);
}

const app = await createStrapi().load();

try {
  await upsertFooterSetting("th", footerTh);
  await upsertFooterSetting("en", footerEn);
} finally {
  await app.destroy();
}
