import { defineCollection, z } from 'astro:content';
import { LOCALES } from '../i18n/config';
import { ROUTES } from '../i18n/routes';

// Zod's enum helper needs a tuple type.
const localeEnum = z.enum(LOCALES as unknown as [string, ...string[]]);
const translationKeyEnum = z.enum(Object.keys(ROUTES) as [string, ...string[]]);

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    locale: localeEnum,
    translationKey: translationKeyEnum,

    // SEO/page chrome
    title: z.string().optional(),
    description: z.string().optional(),

    layout: z.enum(['home', 'basic']).default('basic'),

    menuCurrent: z.string().optional(),
  }),
});

export const collections = { pages };

