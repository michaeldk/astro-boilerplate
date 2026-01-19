/// <reference types="astro/client" />

export {};

declare global {
  namespace App {
    interface Locals {
      locale: import('./i18n/config').Locale;
      translationKey: import('./i18n/routes').TranslationKey;
    }
  }
}

