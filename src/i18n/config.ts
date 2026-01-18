/**
 * Project-level i18n configuration.
 *
 * Update this file per project.
 */
export const LOCALES = ['nl', 'fr', 'de', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

/**
 * Used as fallback when a translation is missing.
 * Pick whichever locale you consider the primary authoring language.
 */
export const DEFAULT_LOCALE: Locale = 'nl';

