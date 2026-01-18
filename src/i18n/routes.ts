import type { Locale } from './locales';

/**
 * Stable identifier for “the same page” across locales.
 * These keys should never be derived from locale-specific slugs.
 */
export const ROUTES = {
  home: {
    nl: null,
    fr: null,
    de: null,
    en: null,
  },
  accessibilityStatement: {
    nl: 'toegankelijkheidsverklaring',
    fr: 'declaration-accessibilite',
    de: 'erklarung-zur-barrierefreiheit',
    en: 'accessibility-statement',
  },
  reuse: {
    nl: 'reuse',
    fr: 'reuse',
    de: 'reuse',
    en: 'reuse',
  },
  cookies: {
    nl: 'cookies',
    fr: 'cookies',
    de: 'cookies',
    en: 'cookies',
  },
  simplifiedAuditReport: {
    nl: 'rapport-van-vereenvoudigde-audit',
    fr: 'rapport-audit-simplifie',
    de: 'vereinfachter-prufbericht',
    en: 'report-on-the-simplified-audit',
  },
} as const satisfies Record<string, Record<Locale, string | null>>;

export type TranslationKey = keyof typeof ROUTES;

/**
 * Compute the canonical route for a (locale, translationKey) pair.
 *
 * Clean URLs + no trailing slash:
 * - home: `/en`
 * - others: `/en/reuse`
 */
export function routeFor(locale: Locale, translationKey: TranslationKey): string {
  const slug = ROUTES[translationKey]?.[locale] ?? null;
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

