/**
 * Seed fake About Us data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-about-us.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const ABOUT_UID = "api::about-us.about-us";
const TEAM_UID = "api::team-member.team-member";
const PARTNER_UID = "api::partner.partner";
const MILESTONE_UID = "api::timeline-milestone.timeline-milestone";

function paragraph(text) {
  return [{ type: "paragraph", children: [{ type: "text", text }] }];
}

const content = {
  th: {
    page: {
      pageTitle: "เกี่ยวกับ Ryhts",
      pageDescription:
        "ผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ดที่ช่วยให้ธุรกิจไทยพิมพ์ฉลากได้คมชัดและต่อเนื่อง",
      companyIntro: paragraph(
        "Ryhts คัดสรร Ribbon Wax, Wax-Resin และ Resin สำหรับเครื่องพิมพ์บาร์โค้ดหลากหลายรุ่น พร้อมให้คำแนะนำตามวัสดุฉลากและสภาพแวดล้อมการใช้งานจริง",
      ),
      mission: paragraph(
        "เราตั้งใจช่วยให้โรงงาน คลังสินค้า และร้านค้าปลีกเลือกริบบอนได้ตรงรุ่น ลดของเสีย และควบคุมต้นทุนงานพิมพ์ได้ดีขึ้น",
      ),
      vision: paragraph(
        "เป็นทีมที่ลูกค้าไว้วางใจเมื่อต้องการงานพิมพ์บาร์โค้ดที่อ่านง่าย ทนทาน และพร้อมใช้งานในทุกวันทำงาน",
      ),
      teamTitle: "ทีมงาน Ryhts",
      teamSubtitle: "ทีมฝ่ายขายและซัพพอร์ตที่เข้าใจงานพิมพ์บาร์โค้ดในหน้างานจริง",
      partnerTitle: "เครือข่ายสินค้าและบริการ",
      partnerSubtitle: "ทำงานร่วมกับผู้ผลิตและคู่ค้าด้านเครื่องพิมพ์ ฉลาก และระบบคลังสินค้า",
      timelineTitle: "เส้นทางของเรา",
      timelineSubtitle: "พัฒนาสินค้าและบริการอย่างต่อเนื่องเพื่อรองรับธุรกิจที่ต้องพิมพ์ฉลากทุกวัน",
      contactInfo: {
        companyName: "Ryhts",
        phone: "094-624-6649",
        email: "sales@ryhts.com",
        businessHours: "จันทร์-ศุกร์ 09:00-18:00",
      },
      seo: {
        metaTitle: "เกี่ยวกับ Ryhts | ริบบอนเครื่องพิมพ์บาร์โค้ด",
        metaDescription:
          "รู้จัก Ryhts ผู้จำหน่ายริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด พร้อมคำแนะนำสินค้าและบริการสำหรับธุรกิจไทย",
        ogType: "website",
        schemaType: "AboutPage",
      },
    },
    team: [
      {
        name: "Ryhts Sales Team",
        position: "ที่ปรึกษาสินค้าริบบอน",
        bio: "ช่วยตรวจรุ่นเครื่องพิมพ์ วัสดุฉลาก และปริมาณงานก่อนแนะนำริบบอนที่เหมาะสม",
        sortOrder: 1,
        isActive: true,
      },
      {
        name: "Ryhts Support Team",
        position: "ทีมซัพพอร์ตงานพิมพ์",
        bio: "ให้คำแนะนำเมื่อพบปัญหางานพิมพ์ไม่คมชัด หมึกติดไม่สม่ำเสมอ หรือบาร์โค้ดอ่านยาก",
        sortOrder: 2,
        isActive: true,
      },
      {
        name: "Ryhts Operations",
        position: "ทีมจัดหาและประสานงาน",
        bio: "ประสานขนาดริบบอนและรอบจัดส่งให้เหมาะกับแผนการใช้งานของลูกค้า",
        sortOrder: 3,
        isActive: true,
      },
    ],
    partners: [
      { name: "Barcode Printer Network", websiteUrl: "https://ryhts.com", sortOrder: 1, isActive: true },
      { name: "Label Supply Partner", websiteUrl: "https://ryhts.com", sortOrder: 2, isActive: true },
      { name: "Warehouse Solution Partner", websiteUrl: "https://ryhts.com", sortOrder: 3, isActive: true },
    ],
    milestones: [
      {
        year: 2015,
        title: "เริ่มให้บริการริบบอนสำหรับงานพิมพ์บาร์โค้ด",
        description: "เริ่มคัดสรรริบบอนสำหรับลูกค้ากลุ่มโรงงาน คลังสินค้า และร้านค้าปลีก",
        sortOrder: 1,
      },
      {
        year: 2020,
        title: "ขยายสินค้า Wax, Wax-Resin และ Resin",
        description: "เพิ่มตัวเลือกริบบอนหลายเกรดเพื่อรองรับฉลากกระดาษ ฉลากกึ่งมัน และฉลากฟิล์ม",
        sortOrder: 2,
      },
      {
        year: 2026,
        title: "พัฒนาบริการให้คำปรึกษาออนไลน์",
        description: "ช่วยลูกค้าเช็กสเปกและขอใบเสนอราคาได้สะดวกขึ้นผ่านเว็บไซต์และช่องทางดิจิทัล",
        sortOrder: 3,
      },
    ],
  },
  en: {
    page: {
      pageTitle: "About Ryhts",
      pageDescription:
        "A barcode printer ribbon supplier helping businesses keep label printing sharp, stable, and cost controlled.",
      companyIntro: paragraph(
        "Ryhts supplies Wax, Wax-Resin, and Resin ribbons for a wide range of barcode printers, with practical guidance based on label materials and real operating conditions.",
      ),
      mission: paragraph(
        "Our mission is to help factories, warehouses, and retail teams select the right ribbon grade, reduce reprints, and control printing cost.",
      ),
      vision: paragraph(
        "We aim to be the trusted team for readable, durable barcode labels that are ready for daily business operations.",
      ),
      teamTitle: "Ryhts Team",
      teamSubtitle: "Sales and support specialists who understand barcode printing workflows.",
      partnerTitle: "Product and service network",
      partnerSubtitle: "Working with printer, label, and warehouse system partners.",
      timelineTitle: "Our Journey",
      timelineSubtitle: "Continuous product and service improvement for teams that print labels every day.",
      contactInfo: {
        companyName: "Ryhts",
        phone: "094-624-6649",
        email: "sales@ryhts.com",
        businessHours: "Monday-Friday 09:00-18:00",
      },
      seo: {
        metaTitle: "About Ryhts | Barcode Printer Ribbons",
        metaDescription:
          "Learn about Ryhts, a barcode printer ribbon supplier with product guidance and service support for business printing workflows.",
        ogType: "website",
        schemaType: "AboutPage",
      },
    },
    team: [
      {
        name: "Ryhts Sales Team",
        position: "Ribbon product consultants",
        bio: "Helping customers check printer models, label materials, and usage volume before recommending the right ribbon.",
        sortOrder: 1,
        isActive: true,
      },
      {
        name: "Ryhts Support Team",
        position: "Printing support team",
        bio: "Supporting customers when output is unclear, ink transfer is inconsistent, or barcodes are difficult to scan.",
        sortOrder: 2,
        isActive: true,
      },
      {
        name: "Ryhts Operations",
        position: "Sourcing and coordination team",
        bio: "Coordinating ribbon sizes and delivery schedules around customer usage plans.",
        sortOrder: 3,
        isActive: true,
      },
    ],
    partners: [
      { name: "Barcode Printer Network", websiteUrl: "https://ryhts.com", sortOrder: 1, isActive: true },
      { name: "Label Supply Partner", websiteUrl: "https://ryhts.com", sortOrder: 2, isActive: true },
      { name: "Warehouse Solution Partner", websiteUrl: "https://ryhts.com", sortOrder: 3, isActive: true },
    ],
    milestones: [
      {
        year: 2015,
        title: "Started barcode ribbon services",
        description: "Started supplying ribbons for factories, warehouses, and retail teams.",
        sortOrder: 1,
      },
      {
        year: 2020,
        title: "Expanded Wax, Wax-Resin, and Resin options",
        description: "Added ribbon grades for paper labels, coated labels, and film labels.",
        sortOrder: 2,
      },
      {
        year: 2026,
        title: "Improved online consultation",
        description: "Made it easier for customers to check specifications and request quotes through digital channels.",
        sortOrder: 3,
      },
    ],
  },
};

async function upsertCollection(uid, locale, uniqueField, data) {
  const documents = strapi.documents(uid);
  const existing = await documents.findFirst({
    locale,
    filters: { [uniqueField]: { $eq: data[uniqueField] } },
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

async function upsertAbout(locale, pageData, relationIds) {
  const documents = strapi.documents(ABOUT_UID);
  const existing = await documents.findFirst({ locale });
  const payload = {
    isPageEnabled: true,
    ...pageData,
    teamMembers: { set: relationIds.team.map((documentId) => ({ documentId })) },
    partners: { set: relationIds.partners.map((documentId) => ({ documentId })) },
    milestones: { set: relationIds.milestones.map((documentId) => ({ documentId })) },
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

  console.log(`Seeded about-us (${locale})`);
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    const relationIds = {
      team: [],
      partners: [],
      milestones: [],
    };

    for (const member of content[locale].team) {
      relationIds.team.push(await upsertCollection(TEAM_UID, locale, "name", member));
    }

    for (const partner of content[locale].partners) {
      relationIds.partners.push(await upsertCollection(PARTNER_UID, locale, "name", partner));
    }

    for (const milestone of content[locale].milestones) {
      relationIds.milestones.push(await upsertCollection(MILESTONE_UID, locale, "title", milestone));
    }

    await upsertAbout(locale, content[locale].page, relationIds);
  }
} finally {
  await app.destroy();
}
