/**
 * Seed fake Downloads page data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-downloads-page.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const PAGE_UID = "api::downloads-page.downloads-page";
const DOWNLOAD_UID = "api::download-item.download-item";
const RELEASE_UID = "api::software-release.software-release";

const fileUrls = {
  guide: "/downloads/ryhts-ribbon-guide.pdf",
  catalog: "/downloads/ryhts-product-catalog.pdf",
  spec: "/downloads/ryhts-ribbon-specification.pdf",
  installer: "/downloads/istock-express-installer.zip",
};

const downloadsData = {
  th: {
    page: {
      heroBadge: "ดาวน์โหลด",
      heroTitle: "ศูนย์ดาวน์โหลด Ryhts",
      heroSubtitle: "รวมเอกสาร คู่มือ สเปกสินค้า และไฟล์ติดตั้งตัวอย่างสำหรับทีมที่ใช้งานสินค้า Ryhts",
      documentsTitle: "เอกสารและไฟล์ที่พร้อมดาวน์โหลด",
      seo: {
        metaTitle: "ดาวน์โหลด | Ryhts",
        metaDescription: "ดาวน์โหลดคู่มือ แคตตาล็อก สเปกสินค้า และไฟล์ติดตั้งจาก Ryhts",
        ogType: "website",
        schemaType: "CollectionPage",
      },
    },
    documents: [
      {
        title: "คู่มือเลือกริบบอน Ryhts",
        description: "เอกสารแนะนำการเลือก Wax, Wax-Resin และ Resin ให้เหมาะกับฉลากและเครื่องพิมพ์",
        previewUrl: fileUrls.guide,
        fileSize: "2.4 MB",
        releaseDate: "2026-08-01",
        sortOrder: 1,
        isActive: true,
      },
      {
        title: "แคตตาล็อกสินค้า Ryhts Ribbon",
        description: "รายการสินค้าและขนาดริบบอนตัวอย่างสำหรับเครื่องพิมพ์บาร์โค้ดหลายแบรนด์",
        previewUrl: fileUrls.catalog,
        fileSize: "5.8 MB",
        releaseDate: "2026-08-05",
        sortOrder: 2,
        isActive: true,
      },
      {
        title: "ตารางสเปกริบบอนสำหรับงานอุตสาหกรรม",
        description: "ข้อมูลเปรียบเทียบความทนความร้อน สารเคมี และวัสดุฉลากที่แนะนำ",
        previewUrl: fileUrls.spec,
        fileSize: "1.9 MB",
        releaseDate: "2026-08-10",
        sortOrder: 3,
        isActive: true,
      },
    ],
    releases: [
      {
        name: "iStock Express Installer",
        version: "2026.8",
        releaseDate: "2026-08-15",
        summary: "เวอร์ชันตัวอย่างสำหรับหน้าดาวน์โหลด พร้อมปรับปรุงความเสถียรและเอกสารช่วยเริ่มต้น",
        changes: [
          { text: "ปรับปรุงขั้นตอนติดตั้งให้ชัดเจนขึ้น", sortOrder: 1 },
          { text: "เพิ่มเอกสารตั้งค่าระบบสำหรับทีมคลังสินค้า", sortOrder: 2 },
          { text: "ปรับข้อความแจ้งเตือนในหน้าดาวน์โหลด", sortOrder: 3 },
        ],
        downloadUrl: fileUrls.installer,
        isLatest: true,
        sortOrder: 1,
        isActive: true,
      },
      {
        name: "iStock Express Installer",
        version: "2026.7",
        releaseDate: "2026-07-18",
        summary: "เวอร์ชันก่อนหน้าสำหรับอ้างอิงรายการเปลี่ยนแปลง",
        changes: [
          { text: "ปรับปรุงประสิทธิภาพการโหลดข้อมูล", sortOrder: 1 },
          { text: "แก้ไขข้อความในรายงานบางส่วน", sortOrder: 2 },
        ],
        downloadUrl: fileUrls.installer,
        isLatest: false,
        sortOrder: 2,
        isActive: true,
      },
    ],
  },
  en: {
    page: {
      heroBadge: "Downloads",
      heroTitle: "Ryhts Download Center",
      heroSubtitle: "Documents, guides, product specifications, and sample installer files for Ryhts customers.",
      documentsTitle: "Documents and files ready to download",
      seo: {
        metaTitle: "Downloads | Ryhts",
        metaDescription: "Download Ryhts guides, catalogs, product specifications, and installer files.",
        ogType: "website",
        schemaType: "CollectionPage",
      },
    },
    documents: [
      {
        title: "Ryhts ribbon selection guide",
        description: "A practical guide to choosing Wax, Wax-Resin, and Resin ribbons for your labels and printer.",
        previewUrl: fileUrls.guide,
        fileSize: "2.4 MB",
        releaseDate: "2026-08-01",
        sortOrder: 1,
        isActive: true,
      },
      {
        title: "Ryhts Ribbon product catalog",
        description: "Product list and sample ribbon sizes for common barcode printer brands.",
        previewUrl: fileUrls.catalog,
        fileSize: "5.8 MB",
        releaseDate: "2026-08-05",
        sortOrder: 2,
        isActive: true,
      },
      {
        title: "Industrial ribbon specification table",
        description: "Comparison data for heat resistance, chemical resistance, and recommended label materials.",
        previewUrl: fileUrls.spec,
        fileSize: "1.9 MB",
        releaseDate: "2026-08-10",
        sortOrder: 3,
        isActive: true,
      },
    ],
    releases: [
      {
        name: "iStock Express Installer",
        version: "2026.8",
        releaseDate: "2026-08-15",
        summary: "Sample download-center release with stability updates and improved onboarding documents.",
        changes: [
          { text: "Improved installer steps for clearer setup.", sortOrder: 1 },
          { text: "Added warehouse team configuration notes.", sortOrder: 2 },
          { text: "Updated download center helper messages.", sortOrder: 3 },
        ],
        downloadUrl: fileUrls.installer,
        isLatest: true,
        sortOrder: 1,
        isActive: true,
      },
      {
        name: "iStock Express Installer",
        version: "2026.7",
        releaseDate: "2026-07-18",
        summary: "Previous sample release for changelog reference.",
        changes: [
          { text: "Improved data loading performance.", sortOrder: 1 },
          { text: "Corrected several report labels.", sortOrder: 2 },
        ],
        downloadUrl: fileUrls.installer,
        isLatest: false,
        sortOrder: 2,
        isActive: true,
      },
    ],
  },
};

async function upsertByFilters(uid, locale, filters, data, publish = true) {
  const documents = strapi.documents(uid);
  const existing = await documents.findFirst({ locale, filters });

  let documentId = existing?.documentId;
  if (documentId) {
    await documents.update({ documentId, locale, data });
  } else {
    const created = await documents.create({ locale, data });
    documentId = created.documentId;
  }

  if (publish && documentId) {
    await documents.publish({ documentId, locale });
  }

  return documentId;
}

async function upsertDownload(locale, data) {
  return upsertByFilters(
    DOWNLOAD_UID,
    locale,
    { title: { $eq: data.title } },
    data,
  );
}

async function upsertRelease(locale, data) {
  return upsertByFilters(
    RELEASE_UID,
    locale,
    {
      version: { $eq: data.version },
      name: { $eq: data.name },
    },
    data,
  );
}

async function upsertDownloadsPage(locale, data, documentIds, releaseIds) {
  const documents = strapi.documents(PAGE_UID);
  const existing = await documents.findFirst({ locale });
  const payload = {
    isPageEnabled: true,
    ...data,
    documents: { set: documentIds.map((documentId) => ({ documentId })) },
    latestVersion: releaseIds[0] ? { set: [{ documentId: releaseIds[0] }] } : undefined,
    releaseNotes: { set: releaseIds.map((documentId) => ({ documentId })) },
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
    const data = downloadsData[locale];
    const documentIds = [];
    const releaseIds = [];

    for (const document of data.documents) {
      documentIds.push(await upsertDownload(locale, document));
    }

    for (const release of data.releases) {
      releaseIds.push(await upsertRelease(locale, release));
    }

    await upsertDownloadsPage(locale, data.page, documentIds, releaseIds);
    console.log(`Seeded downloads-page (${locale})`);
  }
} finally {
  await app.destroy();
}
