module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'global::disable-admin-registration',
    config: {
      allowRegistration: env.bool('ADMIN_REGISTRATION_ENABLED', false),
    },
  },
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
