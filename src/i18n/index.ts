import { en } from './en';
import { ar } from './ar';
import type { Content } from './types';

export const languages = ['en', 'ar'] as const;
export type Lang = (typeof languages)[number];
/** Arabic is the site's primary language */
export const defaultLang: Lang = 'ar';

export const pages = ['home', 'services', 'projects', 'about', 'contact'] as const;
export type Page = (typeof pages)[number];

const dictionaries: Record<Lang, Content> = { en, ar };

export const getContent = (lang: Lang): Content => dictionaries[lang];
export const getDir = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'ar' : 'en');

/** Trailing-slash URL for a page in a language, e.g. pagePath('ar', 'about') -> "/ar/about/" */
export const pagePath = (lang: Lang, page: Page) =>
  page === 'home' ? `/${lang}/` : `/${lang}/${page}/`;

export const isLang = (value: string): value is Lang =>
  (languages as readonly string[]).includes(value);

/** Used by every page's getStaticPaths so both languages are always generated. */
export const staticLangPaths = () => languages.map((lang) => ({ params: { lang } }));
