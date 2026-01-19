import { defineMiddleware } from 'astro:middleware';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './i18n/config';
import { ROUTES, type TranslationKey } from './i18n/routes';

function isLocale(value: string | undefined): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

function translationKeyFromSlug(locale: Locale, slug: string | undefined): TranslationKey {
  if (!slug) return 'home';
  for (const key of Object.keys(ROUTES) as TranslationKey[]) {
    if (key === 'home') continue;
    if (ROUTES[key]?.[locale] === slug) return key;
  }
  // Fallback so the app still renders even if the slug is unknown.
  return 'home';
}

export const onRequest = defineMiddleware((context, next) => {
  const params = context.params as Partial<Record<string, string>>;

  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const translationKey = translationKeyFromSlug(locale, params.slug);

  context.locals.locale = locale;
  context.locals.translationKey = translationKey;

  return next();
});

