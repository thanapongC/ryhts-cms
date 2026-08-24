'use strict';

/**
 * Locale middleware
 *
 * Automatically reads the `Accept-Language` header and injects
 * the `locale` query parameter for content API requests.
 *
 * Supported values: "th", "en", "*"
 * Falls back to the default locale ("th") when missing or unsupported.
 */

const SUPPORTED_LOCALES = ['th', 'en'];
const DEFAULT_LOCALE = 'th';

module.exports = (config) => {
  const validLocales = config?.locales || SUPPORTED_LOCALES;
  const defaultLocale = config?.defaultLocale || DEFAULT_LOCALE;

  return async (ctx, next) => {
    // Only apply to content API routes (skip admin, uploads, etc.)
    const path = ctx.request?.path || '';
    if (!path.startsWith('/api/')) {
      return next();
    }

    // Read Accept-Language header
    const acceptLanguage = ctx.request?.headers?.['accept-language'] || '';

    let locale = defaultLocale;

    if (acceptLanguage) {
      // Parse Accept-Language: "en-US,en;q=0.9,th;q=0.8" → pick first supported
      const preferred = acceptLanguage
        .split(',')
        .map((lang) => lang.trim().split(';')[0].split('-')[0].toLowerCase())
        .find((lang) => validLocales.includes(lang) || lang === '*');

      if (preferred && preferred !== '*') {
        locale = preferred;
      }
    }

    // Inject locale into query if not already set by the client
    if (!ctx.query?.locale) {
      ctx.query = { ...ctx.query, locale };
    }

    await next();
  };
};
