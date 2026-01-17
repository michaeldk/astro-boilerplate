import { LOCALES } from './config';
import type { Locale } from './config';

export { DEFAULT_LOCALE, LOCALES } from './config';
export type { Locale } from './config';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

