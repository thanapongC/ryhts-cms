/**
 * Seed fake Free Trial page content for TH and EN.
 *
 * Usage:
 *   node scripts/seed-free-trial-page.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const FREE_TRIAL_UID = "api::free-trial.free-trial";
const TESTIMONIAL_UID = "api::testimonial.testimonial";

const testimonialData = {
  th: [
    {
      customerName: "คุณณัฐพล ว.",
      position: "ผู้จัดการคลังสินค้า",
      company: "บริษัทจัดจำหน่ายสินค้าอุตสาหกรรม",
      quote:
        "ทีม Ryhts ช่วยตรวจรุ่นเครื่องพิมพ์และแนะนำริบบอนที่เหมาะกับฉลากของเรา ทำให้ทดสอบงานพิมพ์ได้เร็วขึ้นมาก",
      rating: 5,
      sortOrder: 1,
      isActive: true,
    },
    {
      customerName: "คุณศิริพร ก.",
      position: "ฝ่ายจัดซื้อ",
      company: "โรงงานอาหารแช่เย็น",
      quote:
        "ได้รับคำแนะนำเรื่อง Wax-Resin ที่เหมาะกับงานฉลากในคลังเย็น พร้อมข้อมูลขนาดริบบอนที่ต้องใช้กับเครื่องเดิม",
      rating: 5,
      sortOrder: 2,
      isActive: true,
    },
  ],
  en: [
    {
      customerName: "Nattapol W.",
      position: "Warehouse Manager",
      company: "Industrial Distribution Company",
      quote:
        "The Ryhts team checked our printer model and recommended the right ribbon for our labels, which helped us test print quality much faster.",
      rating: 5,
      sortOrder: 1,
      isActive: true,
    },
    {
      customerName: "Siriporn K.",
      position: "Purchasing Officer",
      company: "Chilled Food Factory",
      quote:
        "We received practical Wax-Resin guidance for cold-chain labels, including the ribbon size required for our existing printer.",
      rating: 5,
      sortOrder: 2,
      isActive: true,
    },
  ],
};

const pageData = {
  th: {
    heroBadge: "ทดลองใช้ฟรี",
    heroTitle: "ทดลองใช้บริการแนะนำริบบอน Ryhts ฟรี",
    heroSubtitle:
      "ส่งรายละเอียดเครื่องพิมพ์และฉลากของคุณ ทีม Ryhts จะช่วยประเมินชนิดริบบอน ขนาด และแนวทางทดสอบให้เหมาะกับหน้างานจริง",
    trustItems: [
      { label: "ไม่มีค่าใช้จ่ายเริ่มต้น", sortOrder: 1, isActive: true },
      { label: "ทีมงานช่วยตรวจสเปก", sortOrder: 2, isActive: true },
      { label: "เหมาะกับเครื่องพิมพ์หลายแบรนด์", sortOrder: 3, isActive: true },
    ],
    formBadge: "แบบฟอร์มทดลองใช้",
    formTitle: "ขอคำแนะนำและตัวอย่างทดสอบ",
    formDescription:
      "กรอกข้อมูลเบื้องต้นเพื่อให้ทีมฝ่ายขายติดต่อกลับพร้อมคำแนะนำที่เหมาะกับงานพิมพ์ของคุณ",
    formLabels: {
      fullNameLabel: "ชื่อ-นามสกุล",
      fullNamePlaceholder: "กรอกชื่อผู้ติดต่อ",
      positionLabel: "ตำแหน่ง",
      positionPlaceholder: "เช่น จัดซื้อ คลังสินค้า ฝ่ายผลิต",
      emailLabel: "อีเมล",
      emailPlaceholder: "name@company.com",
      phoneLabel: "โทรศัพท์",
      phonePlaceholder: "กรอกเบอร์โทรศัพท์",
      addressLabel: "ที่อยู่",
      addressPlaceholder: "จังหวัดหรือที่อยู่จัดส่ง",
      companyLabel: "บริษัท",
      companyPlaceholder: "ชื่อบริษัทของคุณ",
      businessDetailsLabel: "รายละเอียดงานพิมพ์",
      businessDetailsPlaceholder:
        "แจ้งรุ่นเครื่องพิมพ์ ขนาดริบบอน วัสดุฉลาก และปัญหาที่พบ",
      privacyConsentPrefix: "ฉันยอมรับ",
      privacyPolicyLabel: "นโยบายความเป็นส่วนตัว",
      privacyPolicyUrl: "/privacy-policy/",
      marketingConsentLabel: "ยินยอมรับข่าวสารและข้อเสนอจาก Ryhts",
      marketingConsentDescription:
        "เราจะใช้ข้อมูลติดต่อเพื่อส่งข่าวสารสินค้าและโปรโมชันที่เกี่ยวข้องเท่านั้น",
      submitLabel: "ส่งคำขอทดลองใช้",
      successTitle: "ส่งคำขอสำเร็จ",
      successMessage: "ทีม Ryhts จะติดต่อกลับโดยเร็วที่สุด",
    },
    ctaTitle: "ไม่แน่ใจว่าควรใช้ริบบอนรุ่นไหน?",
    ctaSubtitle: "ส่งข้อมูลมาให้ทีม Ryhts ตรวจสอบก่อนสั่งซื้อจริงได้",
    featuresTitle: "สิ่งที่คุณจะได้รับ",
    features: [
      {
        title: "คำแนะนำชนิดริบบอน",
        description: "ช่วยเลือก Wax, Wax-Resin หรือ Resin ให้เหมาะกับวัสดุฉลาก",
        sortOrder: 1,
        isActive: true,
      },
      {
        title: "ตรวจสอบขนาดและแกนม้วน",
        description: "ลดความเสี่ยงการสั่งซื้อขนาดที่ไม่เข้ากับเครื่องพิมพ์",
        sortOrder: 2,
        isActive: true,
      },
      {
        title: "แนวทางทดสอบก่อนใช้งานจริง",
        description: "แนะนำการทดสอบความคมชัด ความทนขูดขีด และสภาพแวดล้อม",
        sortOrder: 3,
        isActive: true,
      },
    ],
    testimonialsTitle: "เสียงจากลูกค้า",
    seo: {
      metaTitle: "ทดลองใช้ฟรีและขอคำแนะนำริบบอน | Ryhts",
      metaDescription:
        "ขอคำแนะนำริบบอน Wax, Wax-Resin และ Resin สำหรับเครื่องพิมพ์บาร์โค้ดจากทีม Ryhts",
      ogType: "website",
      schemaType: "WebPage",
    },
  },
  en: {
    heroBadge: "Free Trial",
    heroTitle: "Request a free Ryhts ribbon recommendation",
    heroSubtitle:
      "Share your printer and label details so the Ryhts team can recommend the right ribbon type, size, and testing approach for your workflow.",
    trustItems: [
      { label: "No starting cost", sortOrder: 1, isActive: true },
      { label: "Specification support", sortOrder: 2, isActive: true },
      { label: "Compatible with many printer brands", sortOrder: 3, isActive: true },
    ],
    formBadge: "Trial request",
    formTitle: "Request guidance and sample testing",
    formDescription:
      "Send your basic requirements and our sales team will respond with recommendations for your barcode printing needs.",
    formLabels: {
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Enter contact name",
      positionLabel: "Position",
      positionPlaceholder: "Purchasing, warehouse, production",
      emailLabel: "Email",
      emailPlaceholder: "name@company.com",
      phoneLabel: "Phone",
      phonePlaceholder: "Enter phone number",
      addressLabel: "Address",
      addressPlaceholder: "Province or delivery address",
      companyLabel: "Company",
      companyPlaceholder: "Your company name",
      businessDetailsLabel: "Printing requirements",
      businessDetailsPlaceholder:
        "Share printer model, ribbon size, label material, and current issues",
      privacyConsentPrefix: "I agree to the ",
      privacyPolicyLabel: "Privacy Policy",
      privacyPolicyUrl: "/privacy-policy/",
      marketingConsentLabel: "I agree to receive Ryhts news and offers",
      marketingConsentDescription:
        "We will only use your contact details for relevant product news and offers.",
      submitLabel: "Submit trial request",
      successTitle: "Request submitted",
      successMessage: "The Ryhts team will contact you shortly.",
    },
    ctaTitle: "Not sure which ribbon to use?",
    ctaSubtitle: "Send your details and the Ryhts team can check before you place an order.",
    featuresTitle: "What you get",
    features: [
      {
        title: "Ribbon type recommendation",
        description: "Match Wax, Wax-Resin, or Resin to your label material.",
        sortOrder: 1,
        isActive: true,
      },
      {
        title: "Size and core check",
        description: "Reduce the risk of ordering ribbon sizes that do not fit your printer.",
        sortOrder: 2,
        isActive: true,
      },
      {
        title: "Practical testing guidance",
        description: "Plan tests for print clarity, scratch resistance, and working conditions.",
        sortOrder: 3,
        isActive: true,
      },
    ],
    testimonialsTitle: "Customer feedback",
    seo: {
      metaTitle: "Free Trial and Ribbon Recommendation | Ryhts",
      metaDescription:
        "Request guidance for Wax, Wax-Resin, and Resin ribbons for barcode printers from the Ryhts team.",
      ogType: "website",
      schemaType: "WebPage",
    },
  },
};

async function upsertTestimonial(locale, data) {
  const documents = strapi.documents(TESTIMONIAL_UID);
  const existing = await documents.findFirst({
    locale,
    filters: { customerName: { $eq: data.customerName } },
  });

  let documentId = existing?.documentId;
  if (documentId) {
    await documents.update({ documentId, locale, data });
  } else {
    const created = await documents.create({ locale, data });
    documentId = created.documentId;
  }

  return documentId;
}

async function upsertFreeTrial(locale, data, testimonialDocumentIds) {
  const documents = strapi.documents(FREE_TRIAL_UID);
  const existing = await documents.findFirst({ locale, populate: ["testimonials"] });
  const payload = {
    isPageEnabled: true,
    ...data,
    testimonials: {
      set: testimonialDocumentIds.map((documentId) => ({ documentId })),
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

  console.log(`Seeded free-trial (${locale})`);
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    const testimonialDocumentIds = [];
    for (const testimonial of testimonialData[locale]) {
      testimonialDocumentIds.push(await upsertTestimonial(locale, testimonial));
    }

    await upsertFreeTrial(locale, pageData[locale], testimonialDocumentIds);
  }
} finally {
  try {
    await app.destroy();
  } catch (error) {
    if (error?.message !== "aborted") throw error;
  }
}
