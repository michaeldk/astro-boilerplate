import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';
import { load } from 'js-yaml';

type Dict = Record<string, unknown>;

const RAW_DICTIONARY_LOADERS = import.meta.glob('./dictionaries/*.yml', {
  as: 'raw',
}) as Record<string, () => Promise<string>>;

async function loadDictionary(locale: Locale): Promise<Dict> {
  // Vite glob keys are relative to this module
  const key = `./dictionaries/${locale}.yml`;
  const loader = RAW_DICTIONARY_LOADERS[key];
  if (!loader) return {};
  try {
    const raw = await loader();
    return (load(raw) ?? {}) as Dict;
  } catch {
    return {};
  }
}

// Load only the enabled locale files. Keep `t()` sync by doing this once up-front.
const DICTIONARIES: Partial<Record<Locale, Dict>> = {};
await Promise.all(
  LOCALES.map(async (locale) => {
    DICTIONARIES[locale] = await loadDictionary(locale);
  }),
);

function getByPath(obj: unknown, keyPath: string): unknown {
  if (!obj || typeof obj !== 'object') return undefined;
  return keyPath.split('.').reduce<unknown>((acc, part) => {
    if (!acc || typeof acc !== 'object') return undefined;
    return (acc as Record<string, unknown>)[part];
  }, obj);
}

/**
 * `t(locale, keyPath)` → shared UI string from `src/i18n/dictionaries/{locale}.yml`.
 *
 * Example keyPath (nested YAML): `cookieBanner.intro`
 *
 * Fallback order:
 * 1) requested locale
 * 2) DEFAULT_LOCALE
 * 3) return keyPath (so missing strings are obvious)
 */
export function t(locale: Locale, keyPath: string): string {
  const dict = DICTIONARIES[locale];
  const fallback = DICTIONARIES[DEFAULT_LOCALE];
  const value = getByPath(dict, keyPath) ?? getByPath(fallback, keyPath);
  return typeof value === 'string' ? value : keyPath;
}

