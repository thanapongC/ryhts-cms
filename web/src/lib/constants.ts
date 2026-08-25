/**
 * Ribbon type display labels and badge CSS classes
 * Used across product card, product list, and product detail pages
 */

export const RIBBON_TYPE_LABELS: Record<string, string> = {
  wax: "Ribbon Wax",
  wax_resin: "Ribbon Wax-Resin",
  resin: "Ribbon Resin",
};

export const RIBBON_TYPE_BADGE_CLASS: Record<string, string> = {
  wax: "badge-wax",
  wax_resin: "badge-wax-resin",
  resin: "badge-resin",
};

export function formatDate(dateStr: string, locale = "th-TH"): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
