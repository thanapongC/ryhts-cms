/**
 * Seed fake Privacy Settings and Terms Service data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-legal-pages.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const PRIVACY_UID = "api::privacy-setting.privacy-setting";
const TERMS_UID = "api::terms-service.terms-service";
const PRODUCT_PAGE_UID = "api::product-page.product-page";

const contactInfo = {
  th: {
    companyName: "Ryhts",
    phone: "094-624-6649",
    email: "sales@ryhts.com",
    businessHours: "จันทร์-ศุกร์ 09:00-18:00",
  },
  en: {
    companyName: "Ryhts",
    phone: "094-624-6649",
    email: "sales@ryhts.com",
    businessHours: "Monday-Friday 09:00-18:00",
  },
};

const privacyPages = {
  th: {
    heroBadge: "นโยบาย",
    heroTitle: "นโยบายความเป็นส่วนตัว",
    heroSubtitle: "แนวทางการเก็บ ใช้ และดูแลข้อมูลส่วนบุคคลของลูกค้า Ryhts",
    lastUpdated: "27 สิงหาคม 2569",
    effectiveDate: "2026-08-27",
    tocTitle: "สารบัญ",
    appliesToTitle: "มีผลกับสินค้าและบริการ",
    sections: [
      {
        title: "ข้อมูลที่เราเก็บรวบรวม",
        slug: "collected-data",
        summary: "ข้อมูลที่จำเป็นต่อการให้บริการและติดต่อกลับ",
        icon: "database",
        sortOrder: 1,
        content:
          "<p>เราเก็บข้อมูลติดต่อ ข้อมูลบริษัท รายละเอียดคำขอใบเสนอราคา และข้อมูลการใช้งานเว็บไซต์เท่าที่จำเป็นต่อการให้บริการ</p>",
      },
      {
        title: "การใช้ข้อมูล",
        slug: "data-usage",
        summary: "ใช้ข้อมูลเพื่อแนะนำสินค้า เสนอราคา และดูแลบริการ",
        icon: "users",
        sortOrder: 2,
        content:
          "<p>ข้อมูลถูกใช้เพื่อติดต่อกลับ แนะนำสินค้า จัดทำใบเสนอราคา ปรับปรุงบริการ และดูแลความปลอดภัยของระบบ</p>",
      },
      {
        title: "สิทธิของเจ้าของข้อมูล",
        slug: "data-rights",
        summary: "ช่องทางขอใช้สิทธิตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล",
        icon: "shield",
        sortOrder: 3,
        content:
          "<p>ท่านสามารถขอเข้าถึง แก้ไข ลบ จำกัดการใช้ คัดค้าน หรือถอนความยินยอมได้ผ่านแบบฟอร์มคำขอข้อมูลส่วนบุคคล</p>",
      },
    ],
    legalContactTitle: "ติดต่อเรื่องข้อมูลส่วนบุคคล",
    legalContactDescription: "หากมีคำถามเกี่ยวกับนโยบายนี้ กรุณาติดต่อทีม Ryhts",
    legalContactInfo: contactInfo.th,
    relatedLinksTitle: "ลิงก์ที่เกี่ยวข้อง",
    relatedLinks: [
      { label: "คำขอข้อมูลส่วนบุคคล", url: "/privacy-request/", sortOrder: 1, isActive: true },
      { label: "นโยบายคุกกี้", url: "/cookie-policy/", sortOrder: 2, isActive: true },
      { label: "ข้อกำหนดการใช้บริการ", url: "/terms-of-service/", sortOrder: 3, isActive: true },
    ],
    backToTopLabel: "กลับขึ้นด้านบน",
    seo: {
      metaTitle: "นโยบายความเป็นส่วนตัว | Ryhts",
      metaDescription: "นโยบายความเป็นส่วนตัวของ Ryhts สำหรับการเก็บ ใช้ และดูแลข้อมูลส่วนบุคคล",
      ogType: "website",
      schemaType: "WebPage",
    },
  },
  en: {
    heroBadge: "Policy",
    heroTitle: "Privacy Policy",
    heroSubtitle: "How Ryhts collects, uses, and protects customer personal data.",
    lastUpdated: "August 27, 2026",
    effectiveDate: "2026-08-27",
    tocTitle: "Contents",
    appliesToTitle: "Applies to products and services",
    sections: [
      {
        title: "Information we collect",
        slug: "collected-data",
        summary: "Information needed to provide service and respond to requests.",
        icon: "database",
        sortOrder: 1,
        content:
          "<p>We collect contact details, company information, quote request details, and website usage information needed to provide our services.</p>",
      },
      {
        title: "How we use information",
        slug: "data-usage",
        summary: "Information is used for recommendations, quotations, and service support.",
        icon: "users",
        sortOrder: 2,
        content:
          "<p>Information is used to contact you, recommend products, prepare quotations, improve service quality, and protect our systems.</p>",
      },
      {
        title: "Your data rights",
        slug: "data-rights",
        summary: "How to request personal data rights under applicable law.",
        icon: "shield",
        sortOrder: 3,
        content:
          "<p>You may request access, correction, deletion, restriction, objection, or consent withdrawal through our personal data request form.</p>",
      },
    ],
    legalContactTitle: "Personal data contact",
    legalContactDescription: "If you have questions about this policy, please contact Ryhts.",
    legalContactInfo: contactInfo.en,
    relatedLinksTitle: "Related links",
    relatedLinks: [
      { label: "Personal data request", url: "/privacy-request/", sortOrder: 1, isActive: true },
      { label: "Cookie Policy", url: "/cookie-policy/", sortOrder: 2, isActive: true },
      { label: "Terms of Service", url: "/terms-of-service/", sortOrder: 3, isActive: true },
    ],
    backToTopLabel: "Back to top",
    seo: {
      metaTitle: "Privacy Policy | Ryhts",
      metaDescription: "Ryhts privacy policy for collecting, using, and protecting personal data.",
      ogType: "website",
      schemaType: "WebPage",
    },
  },
};

const termsPages = {
  th: {
    heroBadge: "ข้อกำหนด",
    heroTitle: "ข้อกำหนดการใช้บริการ",
    heroSubtitle: "เงื่อนไขการใช้งานเว็บไซต์ การขอใบเสนอราคา และการติดต่อซื้อสินค้ากับ Ryhts",
    lastUpdated: "27 สิงหาคม 2569",
    effectiveDate: "2026-08-27",
    tocTitle: "สารบัญ",
    appliesToTitle: "ใช้กับบริการ",
    sections: [
      {
        title: "การใช้งานเว็บไซต์",
        slug: "website-usage",
        summary: "การใช้ข้อมูลเว็บไซต์เพื่อประกอบการพิจารณาสินค้า",
        icon: "file",
        sortOrder: 1,
        content:
          "<p>ผู้ใช้งานควรใช้ข้อมูลบนเว็บไซต์เพื่อประกอบการพิจารณาสินค้า และติดต่อทีมงานเมื่อต้องการยืนยันสเปก ราคา หรือเงื่อนไขจัดส่ง</p>",
      },
      {
        title: "ข้อมูลสินค้าและใบเสนอราคา",
        slug: "quotation",
        summary: "รายละเอียดสินค้าและราคาอาจเปลี่ยนตามสเปกและจำนวน",
        icon: "database",
        sortOrder: 2,
        content:
          "<p>รายละเอียดสินค้า ราคา และระยะเวลาจัดส่งอาจเปลี่ยนแปลงตามรุ่น ขนาด จำนวน และสถานะสินค้าในช่วงเวลาที่ขอใบเสนอราคา</p>",
      },
      {
        title: "การติดต่อและการให้บริการ",
        slug: "service-contact",
        summary: "เงื่อนไขการติดต่อกลับและการขอข้อมูลเพิ่มเติม",
        icon: "mail",
        sortOrder: 3,
        content:
          "<p>Ryhts จะติดต่อกลับตามข้อมูลที่ลูกค้าให้ไว้ และอาจขอรายละเอียดเพิ่มเติมเพื่อแนะนำริบบอนให้เหมาะกับเครื่องพิมพ์และฉลาก</p>",
      },
    ],
    legalContactTitle: "ติดต่อเกี่ยวกับข้อกำหนด",
    legalContactDescription: "สอบถามเงื่อนไขการใช้บริการหรือการสั่งซื้อสินค้าได้ที่ทีม Ryhts",
    legalContactInfo: contactInfo.th,
    relatedLinksTitle: "ลิงก์ที่เกี่ยวข้อง",
    relatedLinks: [
      { label: "นโยบายความเป็นส่วนตัว", url: "/privacy-policy/", sortOrder: 1, isActive: true },
      { label: "นโยบายคุกกี้", url: "/cookie-policy/", sortOrder: 2, isActive: true },
      { label: "ติดต่อเรา", url: "/contact/", sortOrder: 3, isActive: true },
    ],
    backToTopLabel: "กลับขึ้นด้านบน",
    seo: {
      metaTitle: "ข้อกำหนดการใช้บริการ | Ryhts",
      metaDescription: "ข้อกำหนดการใช้เว็บไซต์และบริการของ Ryhts สำหรับการติดต่อ ขอใบเสนอราคา และสั่งซื้อริบบอน",
      ogType: "website",
      schemaType: "WebPage",
    },
  },
  en: {
    heroBadge: "Terms",
    heroTitle: "Terms of Service",
    heroSubtitle: "Terms for using the website, requesting quotations, and contacting Ryhts for products.",
    lastUpdated: "August 27, 2026",
    effectiveDate: "2026-08-27",
    tocTitle: "Contents",
    appliesToTitle: "Applies to services",
    sections: [
      {
        title: "Website usage",
        slug: "website-usage",
        summary: "Using website information for product consideration.",
        icon: "file",
        sortOrder: 1,
        content:
          "<p>Website information should be used for product consideration. Please contact our team to confirm specifications, pricing, and delivery conditions.</p>",
      },
      {
        title: "Product information and quotations",
        slug: "quotation",
        summary: "Product details and pricing may vary by specification and quantity.",
        icon: "database",
        sortOrder: 2,
        content:
          "<p>Product details, pricing, and delivery timelines may vary by model, size, quantity, and product availability at the time of quotation.</p>",
      },
      {
        title: "Contact and service",
        slug: "service-contact",
        summary: "Contact response and requests for additional information.",
        icon: "mail",
        sortOrder: 3,
        content:
          "<p>Ryhts will respond using the information you provide and may request additional details to recommend the right ribbon for your printer and labels.</p>",
      },
    ],
    legalContactTitle: "Terms contact",
    legalContactDescription: "Ask Ryhts about service terms or product ordering conditions.",
    legalContactInfo: contactInfo.en,
    relatedLinksTitle: "Related links",
    relatedLinks: [
      { label: "Privacy Policy", url: "/privacy-policy/", sortOrder: 1, isActive: true },
      { label: "Cookie Policy", url: "/cookie-policy/", sortOrder: 2, isActive: true },
      { label: "Contact Us", url: "/contact/", sortOrder: 3, isActive: true },
    ],
    backToTopLabel: "Back to top",
    seo: {
      metaTitle: "Terms of Service | Ryhts",
      metaDescription: "Ryhts website and service terms for contact, quotation requests, and barcode ribbon ordering.",
      ogType: "website",
      schemaType: "WebPage",
    },
  },
};

async function getProductDocumentIds(locale) {
  const products = await strapi.documents(PRODUCT_PAGE_UID).findMany({
    locale,
    fields: ["documentId", "slug"],
    filters: { isActive: { $eq: true } },
    pagination: { page: 1, pageSize: 10 },
  });
  return products.map((product) => product.documentId);
}

async function upsertSingle(uid, locale, data, productDocumentIds) {
  const documents = strapi.documents(uid);
  const existing = await documents.findFirst({ locale, populate: ["appliesToProducts"] });
  const payload = {
    isPageEnabled: true,
    ...data,
    appliesToProducts: {
      set: productDocumentIds.map((documentId) => ({ documentId })),
    },
  };

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
    const productDocumentIds = await getProductDocumentIds(locale);
    await upsertSingle(PRIVACY_UID, locale, privacyPages[locale], productDocumentIds);
    console.log(`Seeded privacy-setting (${locale})`);
    await upsertSingle(TERMS_UID, locale, termsPages[locale], productDocumentIds);
    console.log(`Seeded terms-service (${locale})`);
  }
} finally {
  await app.destroy();
}
