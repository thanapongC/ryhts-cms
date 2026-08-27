/**
 * Seed fake Homepage data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-homepage.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const HOMEPAGE_UID = "api::homepage.homepage";
const FEATURE_UID = "api::feature.feature";
const BENEFIT_UID = "api::benefit.benefit";
const VIDEO_UID = "api::video.video";
const PRICING_PLAN_UID = "api::pricing-plan.pricing-plan";
const PRODUCT_PAGE_UID = "api::product-page.product-page";
const TESTIMONIAL_UID = "api::testimonial.testimonial";

const productPages = {
  th: [
    {
      name: "Ribbon Wax",
      slug: "ribbon-wax",
      pageTitle: "Ribbon Wax",
      pageDescription: "ริบบอน Wax สำหรับงานพิมพ์บาร์โค้ดทั่วไป",
      shortDesc: "ริบบอน Wax สำหรับงานพิมพ์บาร์โค้ดทั่วไปบนกระดาษและฉลากมาตรฐาน",
      cardFeatures: ["พิมพ์คมชัด", "เหมาะกับฉลากกระดาษ", "ควบคุมต้นทุนได้ดี"],
      platform: "both",
      sortOrder: 1,
      isActive: true,
      seo: {
        metaTitle: "Ribbon Wax | Ryhts",
        metaDescription: "ริบบอน Wax สำหรับเครื่องพิมพ์บาร์โค้ดและฉลากกระดาษ",
        ogType: "product",
        schemaType: "ProductPage",
      },
    },
    {
      name: "Ribbon Wax-Resin",
      slug: "ribbon-wax-resin",
      pageTitle: "Ribbon Wax-Resin",
      pageDescription: "ริบบอน Wax-Resin สำหรับงานพิมพ์ที่ต้องการความทนทานมากขึ้น",
      shortDesc: "ริบบอน Wax-Resin สำหรับฉลากที่ต้องการความคมชัดและทนการขูดขีดมากขึ้น",
      cardFeatures: ["ทนการขูดขีด", "พิมพ์ได้คม", "ใช้งานได้หลายวัสดุ"],
      platform: "both",
      sortOrder: 2,
      isActive: true,
      seo: {
        metaTitle: "Ribbon Wax-Resin | Ryhts",
        metaDescription: "ริบบอน Wax-Resin สำหรับงานพิมพ์บาร์โค้ดที่ต้องการความคมชัดและทนทาน",
        ogType: "product",
        schemaType: "ProductPage",
      },
    },
    {
      name: "Ribbon Resin",
      slug: "ribbon-resin",
      pageTitle: "Ribbon Resin",
      pageDescription: "ริบบอน Resin สำหรับงานอุตสาหกรรมและฉลากฟิล์ม",
      shortDesc: "ริบบอน Resin สำหรับงานอุตสาหกรรม ฉลากฟิล์ม และงานที่ต้องทนความร้อนหรือสารเคมี",
      cardFeatures: ["ทนความร้อน", "ทนสารเคมี", "เหมาะกับฉลากฟิล์ม"],
      platform: "both",
      sortOrder: 3,
      isActive: true,
      seo: {
        metaTitle: "Ribbon Resin | Ryhts",
        metaDescription: "ริบบอน Resin สำหรับฉลากฟิล์ม งานอุตสาหกรรม และงานที่ต้องทนความร้อนหรือสารเคมี",
        ogType: "product",
        schemaType: "ProductPage",
      },
    },
  ],
  en: [
    {
      name: "Ribbon Wax",
      slug: "ribbon-wax",
      pageTitle: "Ribbon Wax",
      pageDescription: "Wax ribbon for general barcode printing.",
      shortDesc: "Wax ribbon for standard barcode printing on paper labels and general-purpose tags.",
      cardFeatures: ["Sharp print", "Paper label ready", "Cost efficient"],
      platform: "both",
      sortOrder: 1,
      isActive: true,
      seo: {
        metaTitle: "Ribbon Wax | Ryhts",
        metaDescription: "Wax ribbon for barcode printers and paper label printing.",
        ogType: "product",
        schemaType: "ProductPage",
      },
    },
    {
      name: "Ribbon Wax-Resin",
      slug: "ribbon-wax-resin",
      pageTitle: "Ribbon Wax-Resin",
      pageDescription: "Wax-Resin ribbon for more durable barcode printing.",
      shortDesc: "Wax-Resin ribbon for clearer output and stronger scratch resistance.",
      cardFeatures: ["Scratch resistant", "Sharp barcode output", "Works with many materials"],
      platform: "both",
      sortOrder: 2,
      isActive: true,
      seo: {
        metaTitle: "Ribbon Wax-Resin | Ryhts",
        metaDescription: "Wax-Resin ribbon for sharp and durable barcode printing.",
        ogType: "product",
        schemaType: "ProductPage",
      },
    },
    {
      name: "Ribbon Resin",
      slug: "ribbon-resin",
      pageTitle: "Ribbon Resin",
      pageDescription: "Resin ribbon for industrial labels and film labels.",
      shortDesc: "Resin ribbon for industrial labels, film labels, heat resistance, and chemical exposure.",
      cardFeatures: ["Heat resistant", "Chemical resistant", "Film label ready"],
      platform: "both",
      sortOrder: 3,
      isActive: true,
      seo: {
        metaTitle: "Ribbon Resin | Ryhts",
        metaDescription: "Resin ribbon for film labels, industrial labels, heat resistance, and chemical exposure.",
        ogType: "product",
        schemaType: "ProductPage",
      },
    },
  ],
};

const homepageData = {
  th: {
    page: {
      heroTitle: "Premier Ribbon for Premier Printing",
      heroSubtitle: "ริบบอนคุณภาพสำหรับเครื่องพิมพ์บาร์โค้ด",
      heroDescription:
        "Ryhts จำหน่ายริบบอนหรือผ้าหมึกพิมพ์สำหรับเครื่องพิมพ์บาร์โค้ดทุกขนาด พร้อมทีมงานที่ช่วยแนะนำชนิดริบบอนให้เหมาะกับฉลาก เครื่องพิมพ์ และสภาพแวดล้อมการใช้งานจริง",
      heroCtaText: "ดูสินค้าทั้งหมด",
      heroCtaUrl: "/products/",
      heroCta2Text: "รู้จัก Ryhts",
      heroCta2Url: "/about/",
      heroStats: [
        { value: "15+", label: "ปีประสบการณ์", sortOrder: 1 },
        { value: "500+", label: "ลูกค้าที่ไว้วางใจ", sortOrder: 2 },
        { value: "100+", label: "ขนาดริบบอนพร้อมจัดหา", sortOrder: 3 },
      ],
      featuresTitle: "ทำไมต้องเลือก Ryhts",
      featuresSubtitle: "มุ่งมั่นพัฒนาสินค้านำเข้าที่ได้มาตรฐาน และให้บริการที่ตอบโจทย์หน้างานจริง",
      productsTitle: "รายการสินค้าขายดีของ Ryhts Ribbon",
      productsSubtitle: "สินค้าริบบอนคุณภาพสูง นำเข้ามาตรฐาน พร้อมให้บริการ",
      benefitsTitle: "เลือกริบบอนให้ตรงงาน ลดต้นทุนระยะยาว",
      benefitsSubtitle: "Ryhts ช่วยให้ธุรกิจเลือกสเปกได้เหมาะสมตั้งแต่ต้น ลดปัญหางานพิมพ์และเวลาหยุดเครื่อง",
      videoTitle: "ดูภาพรวมการเลือกริบบอน",
      videoSubtitle: "เริ่มจากรุ่นเครื่องพิมพ์ วัสดุฉลาก และความทนทานที่ต้องการ",
      pricingTitle: "ต้องการใบเสนอราคา?",
      pricingSubtitle: "ติดต่อทีม Ryhts เพื่อรับคำแนะนำและราคาตามขนาดริบบอนที่ต้องการ",
      blogTitle: "อ่านบทความและข่าวสารจาก Ryhts",
      blogSubtitle: "คู่มือและคำแนะนำสำหรับการเลือกริบบอนและงานพิมพ์บาร์โค้ด",
      seo: {
        metaTitle: "Ryhts Ribbon | ริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด",
        metaDescription: "Ryhts จำหน่ายริบบอน Wax, Wax-Resin และ Resin สำหรับเครื่องพิมพ์บาร์โค้ดทุกขนาด",
        ogType: "website",
        schemaType: "WebPage",
      },
    },
    features: [
      ["คุณภาพมาตรฐาน", "คัดสรรริบบอนนำเข้าที่ให้บาร์โค้ดคมชัดและอ่านค่าได้เสถียร"],
      ["ช่วยเลือกสินค้า", "ทีมงานช่วยตรวจรุ่นเครื่องพิมพ์ วัสดุฉลาก และลักษณะการใช้งานก่อนเสนอสินค้า"],
      ["จัดหาได้หลายขนาด", "รองรับริบบอน Wax, Wax-Resin และ Resin สำหรับงานทั่วไปจนถึงอุตสาหกรรม"],
      ["บริการต่อเนื่อง", "ดูแลหลังการขายและช่วยแก้ปัญหาคุณภาพงานพิมพ์ให้ธุรกิจทำงานได้ต่อเนื่อง"],
    ],
    benefits: [
      ["ลดงานพิมพ์เสีย", "เลือกเกรดริบบอนให้ตรงกับวัสดุฉลากเพื่อให้บาร์โค้ดอ่านง่ายและติดทน"],
      ["ควบคุมต้นทุนต่อม้วน", "แนะนำขนาดและชนิดริบบอนให้พอดีกับปริมาณงาน ลดการใช้เกินจำเป็น"],
      ["รองรับงานเร่งด่วน", "มีทีมงานประสานการจัดหาและให้คำแนะนำเพื่อให้ไลน์งานไม่สะดุด"],
    ],
    video: {
      title: "แนวทางเลือกริบบอน Ryhts",
      description: "วิดีโอแนะนำปัจจัยหลักก่อนเลือกริบบอนสำหรับเครื่องพิมพ์บาร์โค้ด",
      videoUrl: "https://www.youtube.com/",
      sortOrder: 1,
      isActive: true,
    },
    pricingPlan: {
      name: "ปรึกษาและขอใบเสนอราคา",
      slug: "consultation-quote",
      description: "เหมาะสำหรับธุรกิจที่ต้องการเทียบชนิดริบบอนและขนาดก่อนสั่งซื้อ",
      price: "ติดต่อฝ่ายขาย",
      period: "ตามสเปกงาน",
      ctaText: "ติดต่อเรา",
      ctaUrl: "/contact/",
      sortOrder: 1,
      isActive: true,
    },
    testimonial: {
      customerName: "ฝ่ายคลังสินค้า",
      position: "Operations Team",
      company: "ลูกค้าอุตสาหกรรม",
      quote: "ทีม Ryhts ช่วยเลือกชนิดริบบอนให้เหมาะกับฉลาก ทำให้งานพิมพ์บาร์โค้ดอ่านง่ายและลดของเสียได้จริง",
      rating: 5,
      sortOrder: 1,
      isActive: true,
    },
  },
  en: {
    page: {
      heroTitle: "Premier Ribbon for Premier Printing",
      heroSubtitle: "Quality ribbons for barcode printers",
      heroDescription:
        "Ryhts supplies thermal transfer ribbons for barcode printers of every size, with practical guidance to match ribbon grade with your labels, printer model, and working conditions.",
      heroCtaText: "View products",
      heroCtaUrl: "/products/",
      heroCta2Text: "About Ryhts",
      heroCta2Url: "/about/",
      heroStats: [
        { value: "15+", label: "Years experience", sortOrder: 1 },
        { value: "500+", label: "Trusted customers", sortOrder: 2 },
        { value: "100+", label: "Ribbon sizes supplied", sortOrder: 3 },
      ],
      featuresTitle: "Why choose Ryhts",
      featuresSubtitle: "Reliable imported ribbon products with support that fits real production needs.",
      productsTitle: "Best-selling Ryhts Ribbon products",
      productsSubtitle: "Imported ribbon products with reliable quality and practical support.",
      benefitsTitle: "Match the ribbon to the job and reduce long-term cost",
      benefitsSubtitle: "Ryhts helps teams choose the right specification early, reducing print problems and downtime.",
      videoTitle: "See how to choose a ribbon",
      videoSubtitle: "Start with printer model, label material, and required durability.",
      pricingTitle: "Need a quotation?",
      pricingSubtitle: "Contact Ryhts for product guidance and pricing based on your ribbon size and use case.",
      blogTitle: "Read Ryhts articles and updates",
      blogSubtitle: "Practical guides for ribbon selection and barcode printing.",
      seo: {
        metaTitle: "Ryhts Ribbon | Barcode Printer Ribbons",
        metaDescription: "Ryhts supplies Wax, Wax-Resin, and Resin ribbons for barcode printers of every size.",
        ogType: "website",
        schemaType: "WebPage",
      },
    },
    features: [
      ["Consistent quality", "Selected ribbon grades for sharp barcode output and stable scanning performance."],
      ["Product guidance", "Our team checks printer model, label material, and use case before recommending a ribbon."],
      ["Multiple sizes", "Wax, Wax-Resin, and Resin options for general barcode printing through industrial labels."],
      ["Ongoing support", "After-sales help for print quality issues so your operation keeps moving."],
    ],
    benefits: [
      ["Reduce failed prints", "Match ribbon grade with label material so barcodes scan cleanly and stay readable."],
      ["Control roll cost", "Choose suitable ribbon size and grade for actual usage volume."],
      ["Support urgent jobs", "Our team helps coordinate supply and advice when production timelines are tight."],
    ],
    video: {
      title: "Ryhts ribbon selection guide",
      description: "A quick guide to the main factors before choosing a barcode printer ribbon.",
      videoUrl: "https://www.youtube.com/",
      sortOrder: 1,
      isActive: true,
    },
    pricingPlan: {
      name: "Consultation and quote",
      slug: "consultation-quote",
      description: "For teams comparing ribbon type, roll size, and material compatibility before ordering.",
      price: "Contact sales",
      period: "Based on specification",
      ctaText: "Contact us",
      ctaUrl: "/contact/",
      sortOrder: 1,
      isActive: true,
    },
    testimonial: {
      customerName: "Warehouse Operations",
      position: "Operations Team",
      company: "Industrial customer",
      quote: "Ryhts helped us match ribbon grade with our labels, improving barcode readability and reducing failed prints.",
      rating: 5,
      sortOrder: 1,
      isActive: true,
    },
  },
};

async function upsertByUnique(uid, locale, uniqueField, data, publish = false) {
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

  if (publish && documentId) {
    await documents.publish({ documentId, locale });
  }

  return documentId;
}

async function upsertByTitle(uid, locale, title, data) {
  return upsertByUnique(uid, locale, "title", { title, ...data });
}

async function upsertHomepage(locale, data, relationIds) {
  const documents = strapi.documents(HOMEPAGE_UID);
  const existing = await documents.findFirst({ locale });
  const payload = {
    isPageEnabled: true,
    ...data,
    features: { set: relationIds.features.map((documentId) => ({ documentId })) },
    products: { set: relationIds.products.map((documentId) => ({ documentId })) },
    benefits: { set: relationIds.benefits.map((documentId) => ({ documentId })) },
    video: relationIds.video ? { set: [{ documentId: relationIds.video }] } : undefined,
    pricingPlans: { set: relationIds.pricingPlans.map((documentId) => ({ documentId })) },
    testimonials: { set: relationIds.testimonials.map((documentId) => ({ documentId })) },
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
    const data = homepageData[locale];

    const features = [];
    for (const [index, [title, description]] of data.features.entries()) {
      features.push(await upsertByTitle(FEATURE_UID, locale, title, {
        description,
        sortOrder: index + 1,
        isActive: true,
      }));
    }

    const benefits = [];
    for (const [index, [title, description]] of data.benefits.entries()) {
      benefits.push(await upsertByTitle(BENEFIT_UID, locale, title, {
        description,
        sortOrder: index + 1,
        isActive: true,
      }));
    }

    const products = [];
    for (const product of productPages[locale]) {
      products.push(await upsertByUnique(PRODUCT_PAGE_UID, locale, "slug", product, true));
    }

    const video = await upsertByTitle(VIDEO_UID, locale, data.video.title, data.video);
    const pricingPlan = await upsertByUnique(PRICING_PLAN_UID, locale, "slug", data.pricingPlan, true);
    const testimonial = await upsertByUnique(
      TESTIMONIAL_UID,
      locale,
      "customerName",
      data.testimonial,
    );

    await upsertHomepage(locale, data.page, {
      features,
      benefits,
      products,
      video,
      pricingPlans: [pricingPlan],
      testimonials: [testimonial],
    });

    console.log(`Seeded homepage (${locale})`);
  }
} finally {
  await app.destroy();
}
