/**
 * Internationalization (i18n) Utilities
 * Manages language preference persistence via cookies
 */

export const COOKIE_NAME = "ryhts-locale";
export const DEFAULT_LOCALE = "th";
export const SUPPORTED_LOCALES = ["th", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Get locale from cookie string (server-side)
 */
export function getLocaleFromCookie(cookieHeader: string | undefined): Locale {
  if (!cookieHeader) return DEFAULT_LOCALE;
  
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const localeCookie = cookies.find((c) => c.startsWith(`${COOKIE_NAME}=`));
  
  if (localeCookie) {
    const value = localeCookie.split("=")[1] as Locale;
    if (SUPPORTED_LOCALES.includes(value)) {
      return value;
    }
  }
  
  return DEFAULT_LOCALE;
}

/**
 * Get locale from document.cookie (client-side)
 */
export function getLocaleFromClientCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const localeCookie = cookies.find((c) => c.startsWith(`${COOKIE_NAME}=`));
  
  if (localeCookie) {
    const value = localeCookie.split("=")[1] as Locale;
    if (SUPPORTED_LOCALES.includes(value)) {
      return value;
    }
  }
  
  return DEFAULT_LOCALE;
}

/**
 * Set locale cookie (client-side)
 */
export function setLocaleCookie(locale: Locale): void {
  if (typeof document === "undefined") return;
  
  // Set cookie with 1 year expiry
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  
  document.cookie = `${COOKIE_NAME}=${locale}; expires=${expires.toUTCString()}; path=/; SameSite=Lax;`;
}

/**
 * Get the URL for a specific locale
 */
export function getLocaleUrl(locale: Locale, currentPath: string): string {
  // Remove any existing locale prefix
  let path = currentPath;
  
  // Check if path already has a locale prefix
  for (const loc of SUPPORTED_LOCALES) {
    if (path.startsWith(`/${loc}/`) || path === `/${loc}`) {
      path = path.slice(loc.length + 1) || "/";
      break;
    }
  }
  
  // Add the new locale prefix (except for default locale if using prefix-free URLs)
  if (locale === DEFAULT_LOCALE) {
    return path;
  }
  
  return `/${locale}${path}`;
}

/**
 * Get display name for a locale
 */
export function getLocaleDisplayName(locale: Locale): string {
  const names: Record<Locale, string> = {
    th: "ไทย",
    en: "English",
  };
  return names[locale] || locale;
}

/**
 * Get flag emoji for a locale
 */
export function getLocaleFlag(locale: Locale): string {
  const flags: Record<Locale, string> = {
    th: "🇹🇭",
    en: "🇬🇧",
  };
  return flags[locale] || "🌐";
}

/**
 * Check if a locale is supported
 */
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

/**
 * Parse Accept-Language header and return best matching locale
 * Example header: "en-US,en;q=0.9,th;q=0.8"
 */
export function getLocaleFromAcceptLanguage(acceptLanguage: string | undefined): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";");
      const q = qValue ? parseFloat(qValue.split("=")[1]) : 1;
      return { code: code.trim().toLowerCase(), q };
    })
    .sort((a, b) => b.q - a.q);

  // Match against supported locales
  for (const { code } of languages) {
    // Exact match (e.g., "th")
    if (isValidLocale(code)) {
      return code;
    }

    // Language-only match (e.g., "en-US" -> "en")
    const langOnly = code.split("-")[0];
    if (isValidLocale(langOnly)) {
      return langOnly;
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * Detect locale from request (cookie > Accept-Language > default)
 * Priority order:
 * 1. Cookie (user's explicit choice)
 * 2. Accept-Language header (browser preference)
 * 3. Default locale (th)
 */
export function detectLocale(
  cookieHeader: string | undefined,
  acceptLanguage: string | undefined
): Locale {
  // 1. Check cookie first (highest priority)
  const cookieLocale = getLocaleFromCookie(cookieHeader);
  if (cookieLocale !== DEFAULT_LOCALE) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const headerLocale = getLocaleFromAcceptLanguage(acceptLanguage);
  if (headerLocale !== DEFAULT_LOCALE) {
    return headerLocale;
  }

  // 3. Fallback to default
  return DEFAULT_LOCALE;
}
