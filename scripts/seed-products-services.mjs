/**
 * Seed fake Products & Services page data for TH and EN.
 *
 * Usage:
 *   node scripts/seed-products-services.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const PAGE_UID = "api::products-services.products-services";
const PRODUCT_UID = "api::product-page.product-page";

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
      heroTitle: "Ribbon Wax สำหรับฉลากกระดาษ",
      heroSubtitle: "เหมาะกับงานพิมพ์บาร์โค้ดทั่วไปที่ต้องการความคุ้มค่าและความคมชัด",
      heroCtaText: "ปรึกษาการเลือกริบบอน",
      heroCtaUrl: "/contact/",
      featuresTitle: "จุดเด่นของ Ribbon Wax",
      featuresSubtitle: "เหมาะกับธุรกิจที่พิมพ์ฉลากจำนวนมากและต้องการต้นทุนต่อดวงที่เหมาะสม",
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
      heroTitle: "Ribbon Wax-Resin สำหรับงานที่ต้องการความทนทาน",
      heroSubtitle: "เหมาะกับฉลากสินค้า ฉลากขนส่ง และงานที่ต้องสัมผัสบ่อย",
      heroCtaText: "สอบถามสินค้า",
      heroCtaUrl: "/contact/",
      featuresTitle: "จุดเด่นของ Ribbon Wax-Resin",
      featuresSubtitle: "สมดุลระหว่างความคมชัด ความทนทาน และต้นทุน",
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
      heroTitle: "Ribbon Resin สำหรับงานพิมพ์ที่ต้องทนทานสูง",
      heroSubtitle: "เหมาะกับงานอุตสาหกรรม ฉลากฟิล์ม และสภาพแวดล้อมที่ต้องการความทนทานเป็นพิเศษ",
      heroCtaText: "ติดต่อฝ่ายขาย",
      heroCtaUrl: "/contact/",
      featuresTitle: "จุดเด่นของ Ribbon Resin",
      featuresSubtitle: "ให้ความทนทานสูงสำหรับงานเฉพาะทาง",
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
      heroTitle: "Ribbon Wax for paper labels",
      heroSubtitle: "Best for general barcode printing that needs practical cost control and clean output.",
      heroCtaText: "Ask our team",
      heroCtaUrl: "/contact/",
      featuresTitle: "Ribbon Wax highlights",
      featuresSubtitle: "A practical option for high-volume label printing on standard paper labels.",
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
      heroTitle: "Ribbon Wax-Resin for tougher label jobs",
      heroSubtitle: "Suitable for product labels, shipping labels, and labels that are handled frequently.",
      heroCtaText: "Contact sales",
      heroCtaUrl: "/contact/",
      featuresTitle: "Ribbon Wax-Resin highlights",
      featuresSubtitle: "A balanced choice for print clarity, durability, and cost.",
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
      heroTitle: "Ribbon Resin for high-durability printing",
      heroSubtitle: "Built for industrial labels, film labels, and demanding environments.",
      heroCtaText: "Talk to sales",
      heroCtaUrl: "/contact/",
      featuresTitle: "Ribbon Resin highlights",
      featuresSubtitle: "High durability for specialized barcode printing requirements.",
      seo: {
        metaTitle: "Ribbon Resin | Ryhts",
        metaDescription: "Resin ribbon for film labels, industrial labels, heat resistance, and chemical exposure.",
        ogType: "product",
        schemaType: "ProductPage",
      },
    },
  ],
};

const productsServices = {
  th: {
    heroBadge: "สินค้าและบริการ",
    heroTitle: "ริบบอนคุณภาพสำหรับงานพิมพ์บาร์โค้ดทุกประเภท",
    heroDescription:
      "Ryhts คัดสรรริบบอน Wax, Wax-Resin และ Resin สำหรับเครื่องพิมพ์บาร์โค้ดทุกขนาด พร้อมคำแนะนำเพื่อให้เหมาะกับหน้างานจริงของคุณ",
    heroPrimaryCtaText: "ปรึกษาฝ่ายขาย",
    heroPrimaryCtaUrl: "/contact/",
    heroSecondaryCtaText: "ดูสินค้า",
    heroStats: [
      { value: "3", label: "ประเภทริบบอนหลัก", sortOrder: 1 },
      { value: "100+", label: "ขนาดสินค้า", sortOrder: 2 },
      { value: "พร้อมส่ง", label: "ให้คำปรึกษาและจัดหา", sortOrder: 3 },
    ],
    productsBadge: "ผลิตภัณฑ์ Ryhts",
    productsTitle: "เลือกริบบอนให้เหมาะกับงานพิมพ์ของคุณ",
    productsSubtitle:
      "ตัวอย่างสินค้าและบริการสำหรับธุรกิจที่ต้องการงานพิมพ์คมชัด ทนทาน และควบคุมต้นทุนได้ดี",
    whyBadge: "ทำไมต้อง Ryhts",
    whyTitle: "พร้อมช่วยเลือกริบบอนที่เหมาะกับเครื่องพิมพ์และฉลากของคุณ",
    whySubtitle:
      "ทีมของเราช่วยดูรุ่นเครื่องพิมพ์ ประเภทฉลาก และสภาพแวดล้อมการใช้งาน เพื่อแนะนำริบบอนที่เหมาะกับต้นทุนและคุณภาพงานพิมพ์",
    whyStats: [
      { value: "Wax", label: "สำหรับฉลากกระดาษ", sortOrder: 1 },
      { value: "Wax-Resin", label: "สำหรับงานทนขูดขีด", sortOrder: 2 },
      { value: "Resin", label: "สำหรับงานอุตสาหกรรม", sortOrder: 3 },
    ],
    seo: {
      metaTitle: "สินค้าและบริการ | Ryhts",
      metaDescription: "ริบบอน Wax, Wax-Resin และ Resin สำหรับเครื่องพิมพ์บาร์โค้ดทุกขนาดจาก Ryhts",
      ogType: "website",
      schemaType: "CollectionPage",
    },
  },
  en: {
    heroBadge: "Products & Services",
    heroTitle: "Quality ribbons for every barcode printing workflow",
    heroDescription:
      "Ryhts supplies Wax, Wax-Resin, and Resin ribbons for barcode printers of all sizes, with practical guidance for real production use.",
    heroPrimaryCtaText: "Contact sales",
    heroPrimaryCtaUrl: "/contact/",
    heroSecondaryCtaText: "View products",
    heroStats: [
      { value: "3", label: "Core ribbon types", sortOrder: 1 },
      { value: "100+", label: "Product sizes", sortOrder: 2 },
      { value: "Ready", label: "Consulting and supply", sortOrder: 3 },
    ],
    productsBadge: "Ryhts Products",
    productsTitle: "Choose the right ribbon for your labels",
    productsSubtitle:
      "Sample products and services for businesses that need sharp print quality, durable labels, and controlled operating costs.",
    whyBadge: "Why Ryhts",
    whyTitle: "Get the right ribbon for your printer, label, and working conditions",
    whySubtitle:
      "Our team checks your printer model, label material, and usage environment to recommend ribbons that fit both cost and print quality.",
    whyStats: [
      { value: "Wax", label: "For paper labels", sortOrder: 1 },
      { value: "Wax-Resin", label: "For scratch resistance", sortOrder: 2 },
      { value: "Resin", label: "For industrial use", sortOrder: 3 },
    ],
    seo: {
      metaTitle: "Products & Services | Ryhts",
      metaDescription: "Wax, Wax-Resin, and Resin ribbons for barcode printers of every size from Ryhts.",
      ogType: "website",
      schemaType: "CollectionPage",
    },
  },
};

function paragraph(text) {
  return {
    type: "paragraph",
    children: [{ type: "text", text }],
  };
}

function productDetailFields(locale, product) {
  const isThai = locale === "th";
  const contactInfo = {
    companyName: "Ryhts",
    phone: "094-624-6649",
    email: "sales@ryhts.com",
    businessHours: isThai ? "จันทร์ - ศุกร์ 08:30 - 17:30 น." : "Monday - Friday, 8:30 AM - 5:30 PM",
  };

  if (product.slug === "ribbon-wax") {
    return {
      features: isThai
        ? ["เหมาะกับฉลากกระดาษทั่วไป", "ให้บาร์โค้ดคมชัดในต้นทุนที่คุมได้", "เหมาะกับงานพิมพ์จำนวนมาก"]
        : ["Best for standard paper labels", "Sharp barcode output with controlled cost", "Suitable for high-volume printing"],
      benefits: isThai
        ? ["ลดต้นทุนต่อดวงฉลาก", "ตั้งค่าเครื่องพิมพ์ง่าย", "เหมาะกับคลังสินค้าและร้านค้าปลีก"]
        : ["Lower cost per label", "Easy printer setup", "Suitable for warehouses and retail operations"],
      problems: isThai
        ? ["งานพิมพ์ทั่วไปที่ไม่ต้องทนสารเคมีสูง", "ฉลากขนส่งที่ต้องการความเร็ว", "ป้ายราคาที่ต้องการความคุ้มค่า"]
        : ["General printing without high chemical exposure", "Shipping labels that need speed", "Price tags that need practical cost control"],
      pcFeatures: isThai
        ? ["รองรับเครื่องพิมพ์ตั้งโต๊ะและอุตสาหกรรม", "เหมาะกับงานพิมพ์ต่อเนื่องผ่านระบบคลังสินค้า"]
        : ["Works with desktop and industrial printers", "Suitable for continuous warehouse label printing"],
      mobileFeatures: isThai
        ? ["เหมาะกับฉลากกระดาษสำหรับงานตรวจนับ", "เลือกขนาดม้วนให้เข้ากับเครื่องพิมพ์พกพาได้"]
        : ["Works for paper labels in stock-count workflows", "Roll sizes can be matched with handheld printers"],
      sections: [
        {
          title: isThai ? "เหมาะกับงานแบบไหน" : "Best-fit use cases",
          content: [paragraph(isThai ? "Ribbon Wax เหมาะกับงานพิมพ์บาร์โค้ดบนฉลากกระดาษทั่วไป เช่น ฉลากสินค้า ฉลากขนส่ง และป้ายราคา" : "Ribbon Wax is ideal for barcode printing on standard paper labels such as product labels, shipping labels, and price tags.")],
          sortOrder: 1,
        },
        {
          title: isThai ? "ข้อมูลที่ควรแจ้งก่อนสั่งซื้อ" : "Information to prepare before ordering",
          content: [paragraph(isThai ? "แจ้งรุ่นเครื่องพิมพ์ ความกว้างริบบอน ความยาวม้วน แกนริบบอน และวัสดุฉลาก เพื่อให้ทีมงานแนะนำรุ่นที่เหมาะสม" : "Share printer model, ribbon width, roll length, core size, and label material so our team can recommend the right specification.")],
          sortOrder: 2,
        },
      ],
      ctaTitle: isThai ? "ต้องการเลือก Ribbon Wax ให้ตรงรุ่น?" : "Need help choosing Ribbon Wax?",
      ctaSubtitle: isThai ? "ส่งข้อมูลเครื่องพิมพ์และฉลากให้ทีม Ryhts ช่วยตรวจสอบได้ทันที" : "Send printer and label details to the Ryhts team for a quick recommendation.",
      ctaButtonText: isThai ? "ติดต่อฝ่ายขาย" : "Contact sales",
      ctaButtonUrl: "/contact/",
      contactInfo,
    };
  }

  if (product.slug === "ribbon-wax-resin") {
    return {
      features: isThai
        ? ["ทนการขูดขีดได้ดีกว่า Wax", "พิมพ์คมชัดบนวัสดุหลายประเภท", "สมดุลระหว่างราคาและความทนทาน"]
        : ["Better scratch resistance than Wax", "Sharp output on multiple label materials", "Balanced cost and durability"],
      benefits: isThai
        ? ["ลดปัญหาหมึกเลือนจากการหยิบจับ", "เหมาะกับฉลากสินค้าและฉลากขนส่ง", "ใช้งานได้กับหลายสภาพแวดล้อม"]
        : ["Reduces smudging from frequent handling", "Suitable for product and shipping labels", "Works across many environments"],
      problems: isThai
        ? ["ฉลากโดนสัมผัสบ่อย", "งานพิมพ์ที่ต้องการความทนทานปานกลาง", "ฉลากที่ต้องดูสะอาดเป็นเวลานาน"]
        : ["Labels handled frequently", "Print jobs needing medium durability", "Labels that need to stay clean longer"],
      pcFeatures: isThai
        ? ["เหมาะกับเครื่องพิมพ์อุตสาหกรรมในคลังสินค้า", "รองรับงานพิมพ์ล็อตใหญ่ที่ต้องการความสม่ำเสมอ"]
        : ["Suitable for industrial warehouse printers", "Supports larger print runs with consistent output"],
      mobileFeatures: isThai
        ? ["เหมาะกับงานภาคสนามที่ฉลากถูกสัมผัสบ่อย", "ช่วยให้ข้อมูลบนฉลากอ่านได้ชัดเจนขึ้น"]
        : ["Useful for field labels that are handled often", "Keeps label information clearer during use"],
      sections: [
        {
          title: isThai ? "เมื่อไรควรเลือก Wax-Resin" : "When to choose Wax-Resin",
          content: [paragraph(isThai ? "เลือก Wax-Resin เมื่องานของคุณต้องการความทนการขูดขีดมากกว่า Wax แต่ยังต้องควบคุมต้นทุนให้เหมาะสม" : "Choose Wax-Resin when your job needs better scratch resistance than Wax while still keeping cost practical.")],
          sortOrder: 1,
        },
        {
          title: isThai ? "การใช้งานที่แนะนำ" : "Recommended applications",
          content: [paragraph(isThai ? "เหมาะกับฉลากสินค้า ฉลากขนส่ง ฉลากคลังสินค้า และงานที่มีการสัมผัสระหว่างจัดเก็บหรือเคลื่อนย้าย" : "Recommended for product labels, shipping labels, warehouse labels, and labels handled during storage or movement.")],
          sortOrder: 2,
        },
      ],
      ctaTitle: isThai ? "ต้องการความคมชัดและความทนทานเพิ่มขึ้น?" : "Need sharper, more durable output?",
      ctaSubtitle: isThai ? "ทีม Ryhts ช่วยเทียบวัสดุฉลากและสภาพแวดล้อมเพื่อแนะนำ Wax-Resin ที่เหมาะสม" : "Ryhts can compare your label material and environment to recommend the right Wax-Resin ribbon.",
      ctaButtonText: isThai ? "สอบถามสินค้า" : "Ask about this product",
      ctaButtonUrl: "/contact/",
      contactInfo,
    };
  }

  return {
    features: isThai
      ? ["ทนความร้อนและสารเคมี", "เหมาะกับฉลากฟิล์มและงานอุตสาหกรรม", "ให้ความทนทานสูงสุดในกลุ่มริบบอน"]
      : ["Heat and chemical resistant", "Ideal for film labels and industrial use", "Highest durability among ribbon grades"],
    benefits: isThai
      ? ["เหมาะกับฉลากที่ต้องใช้งานระยะยาว", "ลดความเสี่ยงข้อมูลเลือนในสภาพแวดล้อมหนัก", "รองรับงานเฉพาะทางที่ต้องการความทนทาน"]
      : ["Suitable for long-life labels", "Reduces fading risk in demanding environments", "Supports specialized durable labeling"],
    problems: isThai
      ? ["ฉลากโดนความร้อน", "ฉลากโดนสารเคมี", "ฉลากฟิล์มหรือวัสดุสังเคราะห์"]
      : ["Labels exposed to heat", "Labels exposed to chemicals", "Film or synthetic label materials"],
    pcFeatures: isThai
      ? ["รองรับเครื่องพิมพ์อุตสาหกรรมสำหรับฉลากฟิล์ม", "เหมาะกับงานผลิตที่ต้องการความทนทานของข้อมูล"]
      : ["Supports industrial printers for film labels", "Suitable for production labels that need durable data"],
    mobileFeatures: isThai
      ? ["ใช้กับงานติดตามทรัพย์สินหรืออุปกรณ์ภาคสนาม", "เหมาะกับฉลากที่ต้องเจอสภาพแวดล้อมหนัก"]
      : ["Useful for asset and field-equipment labels", "Works for labels exposed to demanding conditions"],
    sections: [
      {
        title: isThai ? "เหมาะกับงานอุตสาหกรรม" : "Built for industrial labels",
        content: [paragraph(isThai ? "Ribbon Resin เหมาะกับฉลากฟิล์ม ฉลากอุปกรณ์ ฉลากเครื่องจักร และงานที่ต้องทนความร้อนหรือสารเคมี" : "Ribbon Resin is suited to film labels, equipment labels, machine labels, and jobs exposed to heat or chemicals.")],
        sortOrder: 1,
      },
      {
        title: isThai ? "ตรวจสอบวัสดุก่อนเลือกใช้" : "Check material compatibility first",
        content: [paragraph(isThai ? "ควรแจ้งวัสดุฉลากและสภาพแวดล้อมใช้งาน เพื่อให้ทีมงานเลือกสูตร Resin ที่เหมาะสมกับงานจริง" : "Share label material and operating conditions so our team can match the Resin formula to the real job.")],
        sortOrder: 2,
      },
    ],
    ctaTitle: isThai ? "ต้องการริบบอนสำหรับงานหนัก?" : "Need ribbon for demanding labels?",
    ctaSubtitle: isThai ? "ส่งตัวอย่างฉลากหรือรายละเอียดหน้างานให้ทีม Ryhts ช่วยตรวจสอบความเหมาะสม" : "Send sample label details or operating conditions and Ryhts will check the right fit.",
    ctaButtonText: isThai ? "ติดต่อฝ่ายขาย" : "Contact sales",
    ctaButtonUrl: "/contact/",
    contactInfo,
  };
}

async function upsertProductPage(locale, data) {
  const documents = strapi.documents(PRODUCT_UID);
  const payload = {
    isPageEnabled: true,
    ...data,
    ...productDetailFields(locale, data),
  };
  const existing = await documents.findFirst({
    locale,
    filters: { slug: { $eq: payload.slug } },
  });

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

async function upsertProductsServices(locale, data, productDocumentIds) {
  const documents = strapi.documents(PAGE_UID);
  const existing = await documents.findFirst({
    locale,
    populate: ["products"],
  });

  const payload = {
    ...data,
    products: {
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

  console.log(`Seeded products-services (${locale})`);
}

const app = await createStrapi().load();

try {
  for (const locale of ["th", "en"]) {
    const productDocumentIds = [];
    for (const product of productPages[locale]) {
      productDocumentIds.push(await upsertProductPage(locale, product));
    }
    await upsertProductsServices(locale, productsServices[locale], productDocumentIds);
  }
} finally {
  await app.destroy();
}
