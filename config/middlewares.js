module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'global::locale',
    config: {
      locales: ['th', 'en'],
      defaultLocale: 'th',
    },
  },
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
