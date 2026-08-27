/**
 * Seed fake Support page data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-support-page.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const SUPPORT_UID = "api::support-page.support-page";
const FAQ_UID = "api::faq.faq";
const HELP_ITEM_UID = "api::help-item.help-item";
const GLOBAL_SETTING_UID = "api::global-setting.global-setting";

const supportPages = {
  th: {
    heroSection: {
      badge: "ศูนย์ช่วยเหลือ",
      title: "ช่วยเลือกและแก้ปัญหาริบบอนสำหรับงานพิมพ์ของคุณ",
      subtitle:
        "รวมคำถามที่พบบ่อย คู่มือการเลือกริบบอน และช่องทางติดต่อทีม Ryhts สำหรับเครื่องพิมพ์บาร์โค้ดทุกประเภท",
      faqCtaLabel: "ดูคำถามที่พบบ่อย",
      manualCtaLabel: "ดูคู่มือ",
      contactCtaLabel: "ติดต่อฝ่ายสนับสนุน",
    },
    statusCard: {
      kicker: "สถานะทีมสนับสนุน",
      title: "พร้อมให้คำแนะนำ",
      hours: "จันทร์ - ศุกร์, 08:30 - 17:30 น.",
      statusLabel: "เปิดให้บริการ",
    },
    faqSection: {
      badge: "FAQ",
      title: "คำถามที่พบบ่อย",
      subtitle: "คำตอบสั้น กระชับ สำหรับการเลือกริบบอน การสั่งซื้อ และการใช้งานกับเครื่องพิมพ์",
      emptyPrompt: "ยังไม่มีคำถามที่พบบ่อย",
      contactCtaLabel: "ถามทีม Ryhts",
    },
    helpCenterSection: {
      badge: "แหล่งข้อมูล",
      title: "คู่มือและข้อมูลช่วยตัดสินใจ",
      subtitle: "เริ่มจากข้อมูลสำคัญก่อนคุยกับฝ่ายขาย เพื่อให้เลือกสินค้าได้ตรงกับงานจริง",
    },
    contactSection: {
      badge: "ติดต่อ",
      title: "ติดต่อทีม Ryhts",
      addressLabel: "ที่อยู่",
      businessHoursLabel: "เวลาทำการ",
      phoneLabel: "โทรศัพท์",
      emailLabel: "อีเมล",
    },
    seo: {
      metaTitle: "ศูนย์ช่วยเหลือ | Ryhts",
      metaDescription: "คำถามที่พบบ่อย คู่มือ และช่องทางติดต่อทีม Ryhts สำหรับงานพิมพ์บาร์โค้ด",
      ogType: "website",
      schemaType: "FAQPage",
    },
  },
  en: {
    heroSection: {
      badge: "Support",
      title: "Get help choosing and troubleshooting your ribbon setup",
      subtitle:
        "Find practical answers, buying guides, and direct Ryhts support for barcode printer ribbons.",
      faqCtaLabel: "Browse FAQ",
      manualCtaLabel: "View guides",
      contactCtaLabel: "Contact support",
    },
    statusCard: {
      kicker: "Support Status",
      title: "Ready to help",
      hours: "Mon - Fri, 8:30 AM - 5:30 PM",
      statusLabel: "Available",
    },
    faqSection: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Quick answers for ribbon selection, ordering, and printer compatibility.",
      emptyPrompt: "No FAQs available yet.",
      contactCtaLabel: "Ask Ryhts",
    },
    helpCenterSection: {
      badge: "Resources",
      title: "Guides and buying resources",
      subtitle: "Start with the essentials so our team can recommend the right ribbon faster.",
    },
    contactSection: {
      badge: "Contact",
      title: "Contact Ryhts",
      addressLabel: "Address",
      businessHoursLabel: "Business Hours",
      phoneLabel: "Phone",
      emailLabel: "Email",
    },
    seo: {
      metaTitle: "Support | Ryhts",
      metaDescription: "FAQ, guides, and contact options for Ryhts barcode ribbon support.",
      ogType: "website",
      schemaType: "FAQPage",
    },
  },
};

const faqs = {
  th: [
    {
      question: "ควรเลือก Ribbon Wax, Wax-Resin หรือ Resin อย่างไร?",
      answer:
        "<p>หากพิมพ์ฉลากกระดาษทั่วไปให้เริ่มที่ Wax หากต้องการความทนขูดขีดเพิ่มขึ้นให้ใช้ Wax-Resin และหากเป็นฉลากฟิล์มหรืองานอุตสาหกรรมให้เลือก Resin</p>",
      category: "การเลือกสินค้า",
      sortOrder: 1,
      isActive: true,
    },
    {
      question: "ริบบอน Ryhts ใช้กับเครื่องพิมพ์ยี่ห้อใดได้บ้าง?",
      answer:
        "<p>ใช้งานได้กับเครื่องพิมพ์บาร์โค้ดหลายแบรนด์ เช่น Zebra, TSC, SATO, Honeywell และ Argox โดยทีมงานช่วยตรวจสอบรุ่นเครื่องก่อนสั่งซื้อได้</p>",
      category: "ความเข้ากันได้",
      sortOrder: 2,
      isActive: true,
    },
    {
      question: "ต้องแจ้งข้อมูลอะไรเพื่อให้ทีมงานแนะนำสินค้าได้เร็วขึ้น?",
      answer:
        "<p>แจ้งรุ่นเครื่องพิมพ์ ขนาดริบบอน วัสดุฉลาก และลักษณะการใช้งาน เช่น โดนความร้อน โดนสารเคมี หรือใช้งานกลางแจ้ง</p>",
      category: "การขอคำแนะนำ",
      sortOrder: 3,
      isActive: true,
    },
    {
      question: "สามารถขอตัวอย่างริบบอนเพื่อทดลองพิมพ์ได้หรือไม่?",
      answer:
        "<p>สามารถสอบถามทีมฝ่ายขายเพื่อประเมินรุ่นและขนาดที่เหมาะสมก่อนทดสอบกับเครื่องพิมพ์ของคุณ</p>",
      category: "การสั่งซื้อ",
      sortOrder: 4,
      isActive: true,
    },
  ],
  en: [
    {
      question: "How do I choose between Wax, Wax-Resin, and Resin ribbon?",
      answer:
        "<p>Use Wax for standard paper labels, Wax-Resin when you need better scratch resistance, and Resin for film labels or demanding industrial use.</p>",
      category: "Product selection",
      sortOrder: 1,
      isActive: true,
    },
    {
      question: "Which printer brands work with Ryhts ribbons?",
      answer:
        "<p>Ryhts ribbons work with many barcode printer brands including Zebra, TSC, SATO, Honeywell, and Argox. Our team can check your printer model before you order.</p>",
      category: "Compatibility",
      sortOrder: 2,
      isActive: true,
    },
    {
      question: "What information should I prepare before contacting sales?",
      answer:
        "<p>Please share your printer model, ribbon size, label material, and usage conditions such as heat, chemicals, or outdoor exposure.</p>",
      category: "Consulting",
      sortOrder: 3,
      isActive: true,
    },
    {
      question: "Can I request ribbon samples for print testing?",
      answer:
        "<p>Contact our sales team so we can check the right grade and size before testing it with your printer.</p>",
      category: "Ordering",
      sortOrder: 4,
      isActive: true,
    },
  ],
};

const helpItems = {
  th: [
    {
      title: "คู่มือเลือกริบบอนตามวัสดุฉลาก",
      description: "สรุปการเลือกริบบอนตามชนิดฉลาก กระดาษ ฟิล์ม และฉลากพิเศษ",
      linkText: "อ่านคู่มือ",
      url: "/support/#faq-section",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "เช็กลิสต์ก่อนสั่งซื้อ",
      description: "ข้อมูลที่ควรเตรียมก่อนสอบถามราคา เช่น รุ่นเครื่อง ขนาดแกน และหน้ากว้างริบบอน",
      linkText: "ดูเช็กลิสต์",
      url: "/support/#contact-section",
      sortOrder: 2,
      isActive: true,
    },
    {
      title: "ปรึกษารุ่นเครื่องพิมพ์",
      description: "ส่งรุ่นเครื่องพิมพ์และรูปฉลากให้ทีมงานช่วยตรวจสอบความเข้ากันได้",
      linkText: "ติดต่อทีมงาน",
      url: "/contact/",
      sortOrder: 3,
      isActive: true,
    },
  ],
  en: [
    {
      title: "Ribbon selection by label material",
      description: "A quick guide to matching ribbon type with paper, film, and specialty labels.",
      linkText: "Read guide",
      url: "/support/#faq-section",
      sortOrder: 1,
      isActive: true,
    },
    {
      title: "Pre-order checklist",
      description: "Prepare printer model, ribbon width, core size, and label material before requesting a quote.",
      linkText: "View checklist",
      url: "/support/#contact-section",
      sortOrder: 2,
      isActive: true,
    },
    {
      title: "Printer model consultation",
      description: "Send your printer model and label details so our team can check compatibility.",
      linkText: "Contact our team",
      url: "/contact/",
      sortOrder: 3,
      isActive: true,
    },
  ],
};

async function upsertCollectionByText(uid, locale, textField, textValue, data, shouldPublish = false) {
  const documents = strapi.documents(uid);
  const existing = await documents.findFirst({
    locale,
    filters: { [textField]: { $eq: textValue } },
  });

  let documentId = existing?.documentId;
  if (documentId) {
    await documents.update({ documentId, locale, data });
  } else {
    const created = await documents.create({ locale, data });
    documentId = created.documentId;
  }

  if (shouldPublish && documentId) {
    await documents.publish({ documentId, locale });
  }

  return documentId;
}

async function upsertSupportPage(locale, data, faqDocumentIds, helpDocumentIds) {
  const documents = strapi.documents(SUPPORT_UID);
  const existing = await documents.findFirst({ locale });
  const globalSetting = await strapi.documents(GLOBAL_SETTING_UID).findFirst({ locale });

  const payload = {
    isPageEnabled: true,
    ...data,
    faqs: {
      set: faqDocumentIds.map((documentId) => ({ documentId })),
    },
    helpResources: {
      set: helpDocumentIds.map((documentId) => ({ documentId })),
    },
  };

  if (globalSetting?.documentId) {
    payload.contactSettings = {
      set: [{ documentId: globalSetting.documentId }],
    };
  }

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

  console.log(`Seeded support-page (${locale})`);
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    const faqDocumentIds = [];
    const helpDocumentIds = [];

    for (const faq of faqs[locale]) {
      faqDocumentIds.push(
        await upsertCollectionByText(FAQ_UID, locale, "question", faq.question, faq),
      );
    }

    for (const helpItem of helpItems[locale]) {
      helpDocumentIds.push(
        await upsertCollectionByText(HELP_ITEM_UID, locale, "title", helpItem.title, helpItem, true),
      );
    }

    await upsertSupportPage(locale, supportPages[locale], faqDocumentIds, helpDocumentIds);
  }
} finally {
  await app.destroy();
}
