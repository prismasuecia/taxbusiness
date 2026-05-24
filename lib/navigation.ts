export const locales = ['sv', 'es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'sv';

export const pageKeys = ['home', 'services', 'startCompany', 'about', 'contact', 'privacy'] as const;
export type PageKey = (typeof pageKeys)[number];

export const localizedSlugs: Record<Locale, Record<Exclude<PageKey, 'home'>, string>> = {
  sv: {
    services: 'tjanster',
    startCompany: 'starta-foretag',
    about: 'om-oss',
    contact: 'kontakt',
    privacy: 'integritet'
  },
  es: {
    services: 'servicios',
    startCompany: 'crear-empresa',
    about: 'sobre-nosotros',
    contact: 'contacto',
    privacy: 'privacidad'
  },
  en: {
    services: 'services',
    startCompany: 'start-company',
    about: 'about',
    contact: 'contact',
    privacy: 'privacy'
  }
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function hrefFor(locale: Locale, page: PageKey) {
  if (page === 'home') return `/${locale}`;
  return `/${locale}/${localizedSlugs[locale][page]}`;
}

export function pageFromSlug(locale: Locale, slug?: string): PageKey | null {
  if (!slug) return 'home';
  const match = Object.entries(localizedSlugs[locale]).find(([, value]) => value === slug);
  return (match?.[0] as PageKey | undefined) ?? null;
}

export function allLocalizedPaths() {
  return locales.flatMap((locale) =>
    Object.values(localizedSlugs[locale]).map((slug) => ({locale, slug}))
  );
}
