/**
 * Configure Strapi Content Manager editor layouts.
 *
 * Keeps visibility and ordering controls easy for editors to find:
 * - Page single types show the website visibility switch first.
 * - Collection types show active/order fields in list and edit views.
 * - People/testimonial records expose position/role in list views.
 */

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { createStrapi } = require("@strapi/strapi");

const PAGE_UIDS = [
  "api::homepage.homepage",
  "api::about-us.about-us",
  "api::blog-page.blog-page",
  "api::contact-page.contact-page",
  "api::free-trial.free-trial",
  "api::privacy-setting.privacy-setting",
  "api::privacy-request.privacy-request",
  "api::terms-service.terms-service",
  "api::cookie-policy.cookie-policy",
  "api::downloads-page.downloads-page",
  "api::products-services.products-services",
  "api::support-page.support-page",
];

const COLLECTION_LAYOUTS = {
  "api::product-page.product-page": {
    list: ["name", "slug", "isActive", "sortOrder", "platform"],
    editFirst: ["name", "slug", "isActive", "sortOrder", "platform"],
    mainField: "name",
    defaultSortBy: "sortOrder",
  },
  "api::blog-post.blog-post": {
    list: ["title", "slug", "isActive", "category", "updatedAt"],
    editFirst: ["title", "slug", "isActive", "category", "author"],
    mainField: "title",
    defaultSortBy: "updatedAt",
    defaultSortOrder: "DESC",
  },
  "api::team-member.team-member": {
    list: ["name", "position", "isActive", "sortOrder"],
    editFirst: ["name", "position", "isActive", "sortOrder"],
    mainField: "name",
    defaultSortBy: "sortOrder",
  },
  "api::testimonial.testimonial": {
    list: ["customerName", "position", "company", "isActive", "sortOrder"],
    editFirst: ["customerName", "position", "company", "isActive", "sortOrder"],
    mainField: "customerName",
    defaultSortBy: "sortOrder",
  },
  "api::feature.feature": {
    list: ["title", "isActive", "sortOrder"],
    editFirst: ["title", "isActive", "sortOrder"],
    mainField: "title",
    defaultSortBy: "sortOrder",
  },
  "api::benefit.benefit": {
    list: ["title", "isActive", "sortOrder"],
    editFirst: ["title", "isActive", "sortOrder"],
    mainField: "title",
    defaultSortBy: "sortOrder",
  },
  "api::video.video": {
    list: ["title", "isActive", "sortOrder", "videoUrl"],
    editFirst: ["title", "isActive", "sortOrder", "videoUrl"],
    mainField: "title",
    defaultSortBy: "sortOrder",
  },
  "api::pricing-feature.pricing-feature": {
    list: ["name", "isActive", "sortOrder"],
    editFirst: ["name", "isActive", "sortOrder"],
    mainField: "name",
    defaultSortBy: "sortOrder",
  },
  "api::pricing-plan.pricing-plan": {
    list: ["name", "slug", "isActive", "isPopular", "sortOrder"],
    editFirst: ["name", "slug", "isActive", "isPopular", "sortOrder"],
    mainField: "name",
    defaultSortBy: "sortOrder",
  },
  "api::download-item.download-item": {
    list: ["title", "isActive", "sortOrder", "releaseDate"],
    editFirst: ["title", "isActive", "sortOrder", "releaseDate"],
    mainField: "title",
    defaultSortBy: "sortOrder",
  },
  "api::software-release.software-release": {
    list: ["name", "version", "isLatest", "isActive", "releaseDate"],
    editFirst: ["name", "version", "isLatest", "isActive", "sortOrder"],
    mainField: "name",
    defaultSortBy: "releaseDate",
    defaultSortOrder: "DESC",
  },
  "api::faq.faq": {
    list: ["question", "category", "isActive", "sortOrder"],
    editFirst: ["question", "category", "isActive", "sortOrder"],
    mainField: "question",
    defaultSortBy: "sortOrder",
  },
  "api::help-item.help-item": {
    list: ["title", "isActive", "sortOrder", "url"],
    editFirst: ["title", "isActive", "sortOrder", "url"],
    mainField: "title",
    defaultSortBy: "sortOrder",
  },
  "api::partner.partner": {
    list: ["name", "isActive", "sortOrder", "websiteUrl"],
    editFirst: ["name", "isActive", "sortOrder", "websiteUrl"],
    mainField: "name",
    defaultSortBy: "sortOrder",
  },
  "api::timeline-milestone.timeline-milestone": {
    list: ["title", "year", "isActive", "sortOrder"],
    editFirst: ["title", "year", "isActive", "sortOrder"],
    mainField: "title",
    defaultSortBy: "sortOrder",
  },
};

const COMPONENT_LAYOUTS = {
  "shared.stat-item": ["label", "value", "isActive", "sortOrder"],
  "shared.page-section-item": ["title", "isActive", "sortOrder"],
  "footer.footer-section": ["title", "isActive", "sortOrder"],
  "footer.footer-link": ["label", "isActive", "sortOrder"],
  "footer.legal-link": ["label", "isActive", "sortOrder"],
  "free-trial.trust-item": ["label", "isActive", "sortOrder"],
  "free-trial.trial-feature": ["title", "isActive", "sortOrder"],
  "privacy.policy-section": ["title", "isActive", "sortOrder"],
  "privacy.related-link": ["label", "isActive", "sortOrder"],
  "privacy.request-tip": ["text", "isActive", "sortOrder"],
  "privacy.request-type-option": ["label", "value", "isActive", "sortOrder"],
  "cookie.policy-category": ["title", "isActive", "sortOrder"],
  "contact-floating.contact-action": ["label", "type", "isActive", "sortOrder"],
  "faq.faq-item": ["question", "isActive", "sortOrder"],
};

const METADATA = {
  isPageEnabled: {
    edit: {
      label: "Page visible on website",
      description: "Turn off to make this public page return 404 immediately.",
      placeholder: "",
      visible: true,
      editable: true,
    },
    list: { label: "Visible", searchable: false, sortable: true },
  },
  isActive: {
    edit: {
      label: "Visible on website",
      description: "Turn off to hide this item from lists and direct access.",
      placeholder: "",
      visible: true,
      editable: true,
    },
    list: { label: "Visible", searchable: false, sortable: true },
  },
  sortOrder: {
    edit: {
      label: "Display order",
      description: "Lower numbers appear first.",
      placeholder: "0",
      visible: true,
      editable: true,
    },
    list: { label: "Order", searchable: false, sortable: true },
  },
  position: {
    edit: {
      label: "Position / role",
      description: "Job title, role, or customer position shown on the website.",
      placeholder: "Sales Manager",
      visible: true,
      editable: true,
    },
    list: { label: "Position", searchable: true, sortable: true },
  },
};

function uniq(items) {
  return [...new Set(items.filter(Boolean))];
}

function hasAttribute(schema, name) {
  return Boolean(schema?.attributes?.[name]);
}

function listable(schema, names) {
  return names.filter((name) => hasAttribute(schema, name));
}

function editable(schema, names) {
  return names.filter((name) => hasAttribute(schema, name));
}

function fieldSize(schema, name) {
  const type = schema.attributes[name]?.type;
  if (type === "boolean" || type === "integer" || type === "enumeration") return 4;
  if (type === "media" || type === "relation" || type === "component") return 12;
  if (type === "text" || type === "richtext" || type === "blocks" || type === "json") return 12;
  return 6;
}

function makeRows(schema, preferredNames, existingRows = []) {
  const preferred = editable(schema, preferredNames);
  const used = new Set(preferred);
  const rest = existingRows
    .flat()
    .map((field) => field.name)
    .filter((name) => hasAttribute(schema, name) && !used.has(name));
  const names = [...preferred, ...rest];

  const rows = [];
  let row = [];
  let size = 0;

  for (const name of names) {
    const nextSize = fieldSize(schema, name);
    if (row.length > 0 && size + nextSize > 12) {
      rows.push(row);
      row = [];
      size = 0;
    }
    row.push({ name, size: nextSize });
    size += nextSize;
  }

  if (row.length > 0) rows.push(row);
  return rows;
}

function mergeMetadata(schema, currentMetadatas) {
  const metadatas = { ...currentMetadatas };

  for (const [name, metadata] of Object.entries(METADATA)) {
    if (!hasAttribute(schema, name)) continue;
    metadatas[name] = {
      edit: { ...(metadatas[name]?.edit || {}), ...metadata.edit },
      list: { ...(metadatas[name]?.list || {}), ...metadata.list },
    };
  }

  return metadatas;
}

async function updateContentType(contentTypeService, uid, options) {
  const schema = strapi.contentTypes[uid];
  if (!schema) {
    strapi.log.warn(`Skipping missing content type ${uid}`);
    return;
  }

  const current = await contentTypeService.findConfiguration(schema);
  const preferredEdit = options.editFirst || [];
  const preferredList = options.list || [];
  const defaultSortBy = hasAttribute(schema, options.defaultSortBy)
    ? options.defaultSortBy
    : current.settings?.defaultSortBy;

  await contentTypeService.updateConfiguration(schema, {
    settings: {
      ...(current.settings || {}),
      mainField: hasAttribute(schema, options.mainField) ? options.mainField : current.settings?.mainField,
      defaultSortBy,
      defaultSortOrder: options.defaultSortOrder || current.settings?.defaultSortOrder || "ASC",
      pageSize: current.settings?.pageSize || 10,
    },
    metadatas: mergeMetadata(schema, current.metadatas || {}),
    layouts: {
      ...(current.layouts || {}),
      list: uniq([...listable(schema, preferredList), ...(current.layouts?.list || [])]).slice(0, 6),
      edit: makeRows(schema, preferredEdit, current.layouts?.edit || []),
    },
  });

  strapi.log.info(`Configured admin layout for ${uid}`);
}

async function updateComponent(componentService, uid, preferredFields) {
  const schema = strapi.components[uid];
  if (!schema) {
    strapi.log.warn(`Skipping missing component ${uid}`);
    return;
  }

  const current = await componentService.findConfiguration(schema);

  await componentService.updateConfiguration(schema, {
    settings: current.settings || {},
    metadatas: mergeMetadata(schema, current.metadatas || {}),
    layouts: {
      ...(current.layouts || {}),
      edit: makeRows(schema, preferredFields, current.layouts?.edit || []),
    },
  });

  strapi.log.info(`Configured admin layout for component ${uid}`);
}

const app = await createStrapi().load();

try {
  const contentTypeService = strapi.plugin("content-manager").service("content-types");
  const componentService = strapi.plugin("content-manager").service("components");

  for (const uid of PAGE_UIDS) {
    await updateContentType(contentTypeService, uid, {
      list: ["isPageEnabled"],
      editFirst: ["isPageEnabled"],
      defaultSortBy: "updatedAt",
      defaultSortOrder: "DESC",
    });
  }

  for (const [uid, config] of Object.entries(COLLECTION_LAYOUTS)) {
    await updateContentType(contentTypeService, uid, config);
  }

  for (const [uid, fields] of Object.entries(COMPONENT_LAYOUTS)) {
    await updateComponent(componentService, uid, fields);
  }
} finally {
  await app.destroy();
}
