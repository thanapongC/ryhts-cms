/**
 * Seed fake Site - Global Settings content for TH and EN.
 *
 * Usage:
 *   node scripts/seed-global-setting.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const UID = "api::global-setting.global-setting";

const settings = {
  th: {
    siteName: "RYHTS",
    contactInfo: {
      companyName: "บริษัท ไรต์ส จำกัด",
      address: "กรุงเทพมหานคร ประเทศไทย",
      phone: "094-624-6649",
      email: "sales@ryhts.com",
      businessHours: "จันทร์-ศุกร์ 09:00-18:00 น.",
      mapUrl: "",
      socialLinks: {
        facebook: "https://www.facebook.com/RyhtsRibbon",
        line: "https://lin.ee/xnw0e2Y",
      },
    },
    stats: [
      { value: "257+", label: "ลูกค้าที่ไว้วางใจ", sortOrder: 1 },
      { value: "100+", label: "ขนาดสินค้า", sortOrder: 2 },
      { value: "24/7", label: "ช่องทางติดต่อ", sortOrder: 3 },
    ],
    seoConfig: {
      siteUrl: "https://ryhts.com",
      siteName: "Ryhts Ribbon",
      defaultTitle: "RYHTS - ริบบอนคุณภาพสำหรับเครื่องพิมพ์บาร์โค้ด",
      defaultDescription:
        "Ryhts จำหน่ายริบบอน Wax, Wax-Resin และ Resin สำหรับเครื่องพิมพ์บาร์โค้ด พร้อมคำแนะนำจากทีมงาน",
      brandName: "Ryhts Ribbon",
      facebookUrl: "https://www.facebook.com/RyhtsRibbon",
      lineUrl: "https://lin.ee/xnw0e2Y",
      linkedinUrl: "",
      youtubeUrl: "",
      twitterHandle: "",
      googleAnalyticsId: "",
      facebookPixelId: "",
      robotsUserAgent: "*",
      robotsAllowPaths: ["/"],
      robotsDisallowPaths: ["/api/", "/admin/"],
      robotsSitemapUrl: "https://ryhts.com/sitemap-index.xml",
      robotsCrawlDelay: 1,
    },
    headScript: "",
    bodyScript: "",
    footerScript: "",
  },
  en: {
    siteName: "RYHTS",
    contactInfo: {
      companyName: "Ryhts Co., Ltd.",
      address: "Bangkok, Thailand",
      phone: "094-624-6649",
      email: "sales@ryhts.com",
      businessHours: "Monday-Friday 09:00-18:00",
      mapUrl: "",
      socialLinks: {
        facebook: "https://www.facebook.com/RyhtsRibbon",
        line: "https://lin.ee/xnw0e2Y",
      },
    },
    stats: [
      { value: "257+", label: "Trusted clients", sortOrder: 1 },
      { value: "100+", label: "Product sizes", sortOrder: 2 },
      { value: "24/7", label: "Contact channels", sortOrder: 3 },
    ],
    seoConfig: {
      siteUrl: "https://ryhts.com",
      siteName: "Ryhts Ribbon",
      defaultTitle: "RYHTS - Premier Ribbons for Barcode Printers",
      defaultDescription:
        "Ryhts supplies Wax, Wax-Resin, and Resin ribbons for barcode printers with practical support from our team.",
      brandName: "Ryhts Ribbon",
      facebookUrl: "https://www.facebook.com/RyhtsRibbon",
      lineUrl: "https://lin.ee/xnw0e2Y",
      linkedinUrl: "",
      youtubeUrl: "",
      twitterHandle: "",
      googleAnalyticsId: "",
      facebookPixelId: "",
      robotsUserAgent: "*",
      robotsAllowPaths: ["/"],
      robotsDisallowPaths: ["/api/", "/admin/"],
      robotsSitemapUrl: "https://ryhts.com/sitemap-index.xml",
      robotsCrawlDelay: 1,
    },
    headScript: "",
    bodyScript: "",
    footerScript: "",
  },
};

async function upsertGlobalSetting(locale, data) {
  const documents = strapi.documents(UID);
  const existing = await documents.findFirst({ locale });

  if (existing?.documentId) {
    await documents.update({ documentId: existing.documentId, locale, data });
  } else {
    await documents.create({ locale, data });
  }

  console.log(`Seeded global-setting (${locale})`);
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    await upsertGlobalSetting(locale, settings[locale]);
  }
} finally {
  try {
    await app.destroy();
  } catch (error) {
    if (error?.message !== "aborted") throw error;
  }
}
