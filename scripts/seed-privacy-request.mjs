/**
 * Seed fake Privacy Request page data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-privacy-request.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const PAGE_UID = "api::privacy-request.privacy-request";

const pages = {
  th: {
    settings: {
      heroBadge: "คำขอข้อมูลส่วนบุคคล",
      privacyRequestTitle: "ใช้สิทธิด้านข้อมูลส่วนบุคคลของคุณ",
      privacyRequestDesc:
        "ส่งคำขอเข้าถึง แก้ไข ลบ ระงับการใช้ คัดค้าน หรือถอนความยินยอมเกี่ยวกับข้อมูลส่วนบุคคลที่ Ryhts ดูแลตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล",
      responseTimeLabel: "ระยะเวลาดำเนินการ",
      responseTimeDescription: "ทีมงานจะตรวจสอบและตอบกลับภายใน 30 วันหลังได้รับข้อมูลครบถ้วน",
      secureNoteLabel: "ข้อมูลของคุณปลอดภัย",
      secureNoteDescription: "ข้อมูลในแบบฟอร์มนี้ใช้เพื่อยืนยันตัวตนและดำเนินการตามคำขอเท่านั้น",
      dpoContactLabel: "ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล",
      phoneLabel: "โทรศัพท์",
      emailLabel: "อีเมล",
      businessHoursLabel: "เวลาทำการ",
      beforeSubmitTitle: "ก่อนส่งคำขอ",
      beforeSubmitDescription: "เตรียมข้อมูลให้ครบเพื่อให้ทีมงานตรวจสอบตัวตนและดำเนินการได้รวดเร็ว",
      beforeSubmitTips: [
        { text: "ใช้ชื่อและอีเมลเดียวกับที่เคยติดต่อ Ryhts", accent: "red", sortOrder: 1, isActive: true },
        { text: "ระบุประเภทคำขอและรายละเอียดข้อมูลที่เกี่ยวข้องให้ชัดเจน", accent: "orange", sortOrder: 2, isActive: true },
        { text: "อย่าส่งเลขบัตรประชาชนหรือเอกสารสำคัญผ่านแบบฟอร์มนี้จนกว่าเจ้าหน้าที่ร้องขอ", accent: "red", sortOrder: 3, isActive: true },
      ],
      formBadge: "แบบฟอร์ม",
      formTitle: "ส่งคำขอข้อมูลส่วนบุคคล",
      requiredFieldsNote: "ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก",
      formNameLabel: "ชื่อ-นามสกุล *",
      formNamePlaceholder: "ระบุชื่อของคุณ",
      formEmailLabel: "อีเมล *",
      formEmailPlaceholder: "name@example.com",
      formPhoneLabel: "เบอร์โทรศัพท์",
      formPhonePlaceholder: "094-624-6649",
      formCompanyLabel: "บริษัท",
      formCompanyPlaceholder: "ชื่อบริษัทหรือหน่วยงาน",
      formRequestTypeLabel: "ประเภทคำขอ *",
      formRequestTypePlaceholder: "เลือกประเภทคำขอ",
      requestTypes: [
        { value: "access", label: "ขอเข้าถึงข้อมูล", sortOrder: 1, isActive: true },
        { value: "correction", label: "ขอแก้ไขข้อมูล", sortOrder: 2, isActive: true },
        { value: "deletion", label: "ขอลบข้อมูล", sortOrder: 3, isActive: true },
        { value: "restriction", label: "ขอระงับการใช้ข้อมูล", sortOrder: 4, isActive: true },
        { value: "objection", label: "คัดค้านการใช้ข้อมูล", sortOrder: 5, isActive: true },
        { value: "withdrawal", label: "ถอนความยินยอม", sortOrder: 6, isActive: true },
      ],
      formMessageLabel: "รายละเอียดคำขอ *",
      formMessagePlaceholder: "อธิบายข้อมูลหรือการดำเนินการที่ต้องการให้ทีมงานช่วยตรวจสอบ",
      formAdditionalInfoLabel: "ข้อมูลเพิ่มเติม",
      formAdditionalInfoPlaceholder: "ระบุเลขที่ใบเสนอราคา วันที่ติดต่อ หรือข้อมูลอ้างอิงอื่น ๆ ถ้ามี",
      formNote: "หลังส่งแบบฟอร์ม ทีมงานอาจติดต่อกลับเพื่อยืนยันตัวตนก่อนดำเนินการ",
      formSubmitLabel: "ส่งคำขอ",
      formSubmittingLabel: "กำลังส่ง...",
      formSuccessTitle: "ได้รับคำขอแล้ว",
      formSuccessMessage: "ทีมงาน Ryhts จะตรวจสอบและติดต่อกลับตามข้อมูลที่คุณให้ไว้",
      dpoEmail: "dpo@ryhts.com",
      dpoPhone: "094-624-6649",
      legalContactInfo: {
        companyName: "Ryhts",
        address: "ประเทศไทย",
        phone: "094-624-6649",
        email: "dpo@ryhts.com",
        businessHours: "จันทร์ - ศุกร์ 08:30 - 17:30 น.",
      },
    },
    seo: {
      metaTitle: "คำขอข้อมูลส่วนบุคคล | Ryhts",
      metaDescription: "ส่งคำขอใช้สิทธิด้านข้อมูลส่วนบุคคลกับ Ryhts ตามกฎหมาย PDPA",
      ogType: "website",
      schemaType: "ContactPage",
    },
  },
  en: {
    settings: {
      heroBadge: "Personal Data Request",
      privacyRequestTitle: "Exercise your personal data rights",
      privacyRequestDesc:
        "Submit a request to access, correct, delete, restrict, object to, or withdraw consent for personal data handled by Ryhts under privacy law.",
      responseTimeLabel: "Response time",
      responseTimeDescription: "Our team will review and respond within 30 days after receiving complete information.",
      secureNoteLabel: "Your information is protected",
      secureNoteDescription: "Information in this form is used only to verify your identity and process your request.",
      dpoContactLabel: "Contact the Data Protection Officer",
      phoneLabel: "Phone",
      emailLabel: "Email",
      businessHoursLabel: "Business hours",
      beforeSubmitTitle: "Before submitting",
      beforeSubmitDescription: "Prepare enough detail so our team can verify your identity and handle the request efficiently.",
      beforeSubmitTips: [
        { text: "Use the same name and email address you used when contacting Ryhts.", accent: "red", sortOrder: 1, isActive: true },
        { text: "Select the request type and describe the relevant personal data clearly.", accent: "orange", sortOrder: 2, isActive: true },
        { text: "Do not send ID numbers or sensitive documents through this form unless requested by our officer.", accent: "red", sortOrder: 3, isActive: true },
      ],
      formBadge: "Request form",
      formTitle: "Submit a personal data request",
      requiredFieldsNote: "Fields marked with * are required.",
      formNameLabel: "Full name *",
      formNamePlaceholder: "Enter your name",
      formEmailLabel: "Email *",
      formEmailPlaceholder: "name@example.com",
      formPhoneLabel: "Phone",
      formPhonePlaceholder: "094-624-6649",
      formCompanyLabel: "Company",
      formCompanyPlaceholder: "Company or organization name",
      formRequestTypeLabel: "Request type *",
      formRequestTypePlaceholder: "Select request type",
      requestTypes: [
        { value: "access", label: "Access my data", sortOrder: 1, isActive: true },
        { value: "correction", label: "Correct my data", sortOrder: 2, isActive: true },
        { value: "deletion", label: "Delete my data", sortOrder: 3, isActive: true },
        { value: "restriction", label: "Restrict processing", sortOrder: 4, isActive: true },
        { value: "objection", label: "Object to processing", sortOrder: 5, isActive: true },
        { value: "withdrawal", label: "Withdraw consent", sortOrder: 6, isActive: true },
      ],
      formMessageLabel: "Request details *",
      formMessagePlaceholder: "Describe the personal data or action you would like our team to review.",
      formAdditionalInfoLabel: "Additional information",
      formAdditionalInfoPlaceholder: "Add quote number, contact date, or other reference information if available.",
      formNote: "After submission, our team may contact you to verify your identity before processing the request.",
      formSubmitLabel: "Submit request",
      formSubmittingLabel: "Submitting...",
      formSuccessTitle: "Request received",
      formSuccessMessage: "Ryhts will review your request and contact you using the details provided.",
      dpoEmail: "dpo@ryhts.com",
      dpoPhone: "094-624-6649",
      legalContactInfo: {
        companyName: "Ryhts",
        address: "Thailand",
        phone: "094-624-6649",
        email: "dpo@ryhts.com",
        businessHours: "Monday - Friday, 8:30 AM - 5:30 PM",
      },
    },
    seo: {
      metaTitle: "Personal Data Request | Ryhts",
      metaDescription: "Submit a personal data rights request to Ryhts under privacy law.",
      ogType: "website",
      schemaType: "ContactPage",
    },
  },
};

async function upsertPrivacyRequest(locale, data) {
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
    await upsertPrivacyRequest(locale, pages[locale]);
    console.log(`Seeded privacy-request (${locale})`);
  }
} finally {
  await app.destroy();
}
