/**
 * Seed fake Blog page, blog categories, and blog posts for TH and EN.
 *
 * Usage:
 *   node scripts/seed-blog-page.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const BLOG_PAGE_UID = "api::blog-page.blog-page";
const BLOG_POST_UID = "api::blog-post.blog-post";
const BLOG_CATEGORY_UID = "api::blog-category.blog-category";

const categories = {
  th: [
    {
      name: "คู่มือการเลือกริบบอน",
      slug: "ribbon-guides",
      description: "คำแนะนำสำหรับเลือกริบบอนให้เหมาะกับเครื่องพิมพ์ วัสดุฉลาก และสภาพแวดล้อมการใช้งาน",
    },
    {
      name: "เทคนิคงานพิมพ์",
      slug: "printing-tips",
      description: "เทคนิคการดูแลเครื่องพิมพ์และริบบอนเพื่อให้งานพิมพ์คมชัดสม่ำเสมอ",
    },
    {
      name: "ข่าวสาร Ryhts",
      slug: "ryhts-updates",
      description: "ข่าวสารสินค้าใหม่ บริการ และข้อมูลอัปเดตจาก Ryhts",
    },
  ],
  en: [
    {
      name: "Ribbon Guides",
      slug: "ribbon-guides",
      description: "Practical guides for matching ribbons with printer models, label materials, and working conditions.",
    },
    {
      name: "Printing Tips",
      slug: "printing-tips",
      description: "Tips for maintaining printers and ribbons so barcode output stays sharp and consistent.",
    },
    {
      name: "Ryhts Updates",
      slug: "ryhts-updates",
      description: "Product news, services, and updates from Ryhts.",
    },
  ],
};

const posts = {
  th: [
    {
      title: "วิธีเลือกริบบอนให้เหมาะกับเครื่องพิมพ์บาร์โค้ดของคุณ",
      slug: "how-to-choose-ribbon-for-your-printer",
      excerpt: "เรียนรู้ความแตกต่างของ Wax, Wax-Resin และ Resin เพื่อเลือกริบบอนให้เหมาะกับฉลากและหน้างานจริง",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "ริบบอนแต่ละประเภทเหมาะกับวัสดุฉลากและสภาพแวดล้อมต่างกัน งานฉลากกระดาษทั่วไปมักเริ่มจาก Wax ส่วนงานที่ต้องทนขูดขีดหรือสารเคมีควรพิจารณา Wax-Resin หรือ Resin",
            },
          ],
        },
      ],
      author: "Ryhts Team",
      tags: ["ริบบอน", "บาร์โค้ด", "คู่มือ"],
      categorySlug: "ribbon-guides",
      seoTitle: "วิธีเลือกริบบอนให้เหมาะกับเครื่องพิมพ์ | Ryhts",
      seoDescription: "คู่มือเลือกริบบอน Wax, Wax-Resin และ Resin สำหรับเครื่องพิมพ์บาร์โค้ด",
    },
    {
      title: "เช็กลิสต์ก่อนสั่งซื้อริบบอนสำหรับโรงงานและคลังสินค้า",
      slug: "barcode-ribbon-ordering-checklist",
      excerpt: "เตรียมรุ่นเครื่องพิมพ์ ขนาดริบบอน ขนาดแกน และวัสดุฉลากให้พร้อมก่อนขอใบเสนอราคา",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "การแจ้งรุ่นเครื่องพิมพ์ หน้ากว้างริบบอน ความยาว แกนม้วน และชนิดฉลาก ช่วยให้ทีมงานแนะนำสินค้าและเสนอราคาได้เร็วขึ้น",
            },
          ],
        },
      ],
      author: "Ryhts Team",
      tags: ["สั่งซื้อ", "คลังสินค้า", "โรงงาน"],
      categorySlug: "ribbon-guides",
      seoTitle: "เช็กลิสต์ก่อนสั่งซื้อริบบอน | Ryhts",
      seoDescription: "ข้อมูลที่ควรเตรียมก่อนสั่งซื้อริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด",
    },
    {
      title: "เทคนิคการเก็บรักษาริบบอนให้พิมพ์คมชัดนานขึ้น",
      slug: "tips-for-ribbon-maintenance",
      excerpt: "วิธีเก็บริบบอนให้ห่างจากความชื้น ความร้อน และแสงแดดเพื่อรักษาคุณภาพงานพิมพ์",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "ควรเก็บริบบอนในที่แห้ง อุณหภูมิคงที่ และหลีกเลี่ยงแสงแดดโดยตรง เพื่อลดโอกาสหมึกเสื่อมสภาพก่อนใช้งาน",
            },
          ],
        },
      ],
      author: "Ryhts Team",
      tags: ["เทคนิค", "การดูแล", "คุณภาพงานพิมพ์"],
      categorySlug: "printing-tips",
      seoTitle: "เทคนิคการเก็บรักษาริบบอน | Ryhts",
      seoDescription: "วิธีเก็บรักษาริบบอนให้พร้อมใช้งานและคงคุณภาพงานพิมพ์",
    },
  ],
  en: [
    {
      title: "How to choose the right ribbon for your barcode printer",
      slug: "how-to-choose-ribbon-for-your-printer",
      excerpt: "Understand Wax, Wax-Resin, and Resin ribbons so you can match the right grade to your labels and work environment.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Each ribbon grade fits different label materials and working conditions. Standard paper labels often start with Wax, while scratch resistance, chemicals, or film labels may require Wax-Resin or Resin.",
            },
          ],
        },
      ],
      author: "Ryhts Team",
      tags: ["ribbon", "barcode", "guide"],
      categorySlug: "ribbon-guides",
      seoTitle: "How to choose barcode printer ribbon | Ryhts",
      seoDescription: "A practical guide to Wax, Wax-Resin, and Resin ribbons for barcode printers.",
    },
    {
      title: "Pre-order checklist for factory and warehouse ribbons",
      slug: "barcode-ribbon-ordering-checklist",
      excerpt: "Prepare printer model, ribbon width, core size, and label material before requesting a quote.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Printer model, ribbon width, roll length, core size, and label material help our team recommend the right product and quote faster.",
            },
          ],
        },
      ],
      author: "Ryhts Team",
      tags: ["ordering", "warehouse", "factory"],
      categorySlug: "ribbon-guides",
      seoTitle: "Barcode ribbon pre-order checklist | Ryhts",
      seoDescription: "What to prepare before ordering ribbons for barcode printers.",
    },
    {
      title: "Storage tips for sharper thermal transfer printing",
      slug: "tips-for-ribbon-maintenance",
      excerpt: "Keep ribbons away from humidity, heat, and direct sunlight to preserve print quality.",
      content: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Store ribbons in a dry area with stable temperature and avoid direct sunlight to reduce the risk of print quality issues.",
            },
          ],
        },
      ],
      author: "Ryhts Team",
      tags: ["tips", "maintenance", "print quality"],
      categorySlug: "printing-tips",
      seoTitle: "Thermal transfer ribbon storage tips | Ryhts",
      seoDescription: "How to store ribbons so they stay ready for sharp barcode printing.",
    },
  ],
};

const blogPages = {
  th: {
    heroSection: {
      badge: "บทความ",
      title: "บทความและข่าวสารจาก Ryhts",
      description:
        "ติดตามคำแนะนำการเลือกริบบอน เทคนิคงานพิมพ์บาร์โค้ด และข่าวสารสินค้าสำหรับธุรกิจที่ต้องการงานพิมพ์คมชัดและเชื่อถือได้",
    },
    listingSection: {
      breadcrumbLabel: "บทความ",
      emptyTitle: "ยังไม่มีบทความในขณะนี้",
      emptyDescription: "กลับมาใหม่อีกครั้งเพื่ออ่านข่าวสารและคู่มือจาก Ryhts",
      offlineTitle: "ไม่สามารถโหลดบทความได้",
      offlineMessage: "กรุณาตรวจสอบการเชื่อมต่อและลองอีกครั้ง",
    },
    seo: {
      metaTitle: "บทความและข่าวสาร | Ryhts",
      metaDescription: "บทความ คู่มือ และข่าวสารเกี่ยวกับริบบอนและงานพิมพ์บาร์โค้ดจาก Ryhts",
      ogType: "website",
      schemaType: "CollectionPage",
    },
  },
  en: {
    heroSection: {
      badge: "Articles",
      title: "Ryhts articles and updates",
      description:
        "Read practical ribbon selection guides, barcode printing tips, and product updates for reliable label production.",
    },
    listingSection: {
      breadcrumbLabel: "Articles",
      emptyTitle: "No articles available yet",
      emptyDescription: "Check back later for Ryhts news, guides, and product updates.",
      offlineTitle: "Unable to load articles",
      offlineMessage: "Please check your connection and try again.",
    },
    seo: {
      metaTitle: "Articles & Updates | Ryhts",
      metaDescription: "Articles, guides, and updates about thermal transfer ribbons and barcode printing from Ryhts.",
      ogType: "website",
      schemaType: "CollectionPage",
    },
  },
};

async function upsertCategory(locale, data) {
  const documents = strapi.documents(BLOG_CATEGORY_UID);
  const existing = await documents.findFirst({
    locale,
    filters: { slug: { $eq: data.slug } },
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

async function upsertPost(locale, data, categoryDocumentId) {
  const documents = strapi.documents(BLOG_POST_UID);
  const existing = await documents.findFirst({
    locale,
    filters: { slug: { $eq: data.slug } },
  });

  const { categorySlug, seoTitle, seoDescription, ...postData } = data;
  const payload = {
    isActive: true,
    ...postData,
    category: categoryDocumentId ? { set: [{ documentId: categoryDocumentId }] } : undefined,
    seo: {
      metaTitle: seoTitle,
      metaDescription: seoDescription,
      ogType: "article",
      schemaType: "Article",
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

  return documentId;
}

async function upsertBlogPage(locale, data, postDocumentIds) {
  const documents = strapi.documents(BLOG_PAGE_UID);
  const existing = await documents.findFirst({
    locale,
    populate: ["featuredPosts"],
  });

  const payload = {
    isPageEnabled: true,
    ...data,
    featuredPosts: {
      set: postDocumentIds.map((documentId) => ({ documentId })),
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

  console.log(`Seeded blog-page (${locale})`);
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    const categoryDocumentIdsBySlug = new Map();
    const postDocumentIds = [];

    for (const category of categories[locale]) {
      const documentId = await upsertCategory(locale, category);
      categoryDocumentIdsBySlug.set(category.slug, documentId);
    }

    for (const post of posts[locale]) {
      const documentId = await upsertPost(
        locale,
        post,
        categoryDocumentIdsBySlug.get(post.categorySlug),
      );
      postDocumentIds.push(documentId);
    }

    await upsertBlogPage(locale, blogPages[locale], postDocumentIds);
  }
} finally {
  await app.destroy();
}
