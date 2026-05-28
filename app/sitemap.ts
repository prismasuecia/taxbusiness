import type {MetadataRoute} from 'next';
import {hrefFor, locales, pageKeys} from '@/lib/navigation';
import {absoluteUrl, languageAlternates} from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    pageKeys.map((page) => ({
      url: absoluteUrl(hrefFor(locale, page)),
      lastModified: new Date('2026-05-28'),
      changeFrequency: page === 'home' ? 'weekly' : 'monthly',
      priority: page === 'home' ? 1 : page === 'contact' ? 0.9 : 0.8,
      alternates: {
        languages: languageAlternates(page)
      }
    }))
  );
}
