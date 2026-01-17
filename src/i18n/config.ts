/**
 * Project-level i18n configuration.
 *
 * Rule of thumb for our projects:
 * - Always: nl, fr
 * - Often: de
 * - Rarely: en
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

