/**
 * Seed realistic Site - Navigation content for TH and EN.
 *
 * Usage:
 *   node scripts/seed-navigation.mjs
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const UID = "api::navigation.navigation";

const navigationTh = {
  name: "เมนูหลัก",
  headerItems: [
    { label: "หน้าแรก", url: "/", target: "_self", children: [] },
    { label: "เกี่ยวกับเรา", url: "/about/", target: "_self", children: [] },
    {
      label: "สินค้า",
      url: "/products/",
      target: "_self",
      children: [
        { label: "iStock Express", url: "/products/istock-express/", target: "_self" },
        { label: "iStock Express Pro", url: "/products/istock-express-pro/", target: "_self" },
        { label: "iStock WMS", url: "/products/istock-wms/", target: "_self" },
        { label: "iStock Sales Order", url: "/products/istock-sales-order/", target: "_self" },
        { label: "iStock TMS", url: "/products/istock-tms/", target: "_self" },
        { label: "RFID System", url: "/products/rfid-system/", target: "_self" },
      ],
    },
    { label: "ซัพพอร์ต", url: "/support/", target: "_self", children: [] },
    { label: "บทความ", url: "/articles/", target: "_self", children: [] },
    { label: "ติดต่อเรา", url: "/contact/", target: "_self", children: [] },
  ],
};

const navigationEn = {
  name: "Main Navigation",
  headerItems: [
    { label: "Home", url: "/", target: "_self", children: [] },
    { label: "About Us", url: "/about/", target: "_self", children: [] },
    {
      label: "Products",
      url: "/products/",
      target: "_self",
      children: [
        { label: "iStock Express", url: "/products/istock-express/", target: "_self" },
        { label: "iStock Express Pro", url: "/products/istock-express-pro/", target: "_self" },
        { label: "iStock WMS", url: "/products/istock-wms/", target: "_self" },
        { label: "iStock Sales Order", url: "/products/istock-sales-order/", target: "_self" },
        { label: "iStock TMS", url: "/products/istock-tms/", target: "_self" },
        { label: "RFID System", url: "/products/rfid-system/", target: "_self" },
      ],
    },
    { label: "Support", url: "/support/", target: "_self", children: [] },
    { label: "Articles", url: "/articles/", target: "_self", children: [] },
    { label: "Contact Us", url: "/contact/", target: "_self", children: [] },
  ],
};

async function upsertNavigation(locale, data) {
  const documents = strapi.documents(UID);
  const existing = await documents.findFirst({
    locale,
    populate: ["headerItems", "headerItems.children"],
  });

  if (existing?.documentId) {
    await documents.update({
      documentId: existing.documentId,
      locale,
      data,
    });
  } else {
    await documents.create({
      locale,
      data,
    });
  }

  console.log(`Seeded navigation (${locale})`);
}

const app = await createStrapi().load();

try {
  await upsertNavigation("th", navigationTh);
  await upsertNavigation("en", navigationEn);
} finally {
  await app.destroy();
}
