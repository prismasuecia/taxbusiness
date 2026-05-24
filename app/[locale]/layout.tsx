import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import '../../styles/globals.css';
import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';
import {getDictionary} from '@/lib/dictionaries';
import {hrefFor, isLocale, locales, pageFromSlug, type Locale, type PageKey} from '@/lib/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  if (!isLocale(rawLocale)) return {};
  const dict = getDictionary(rawLocale);

  return {
    metadataBase: new URL('https://taxbusiness.se'),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: hrefFor(rawLocale, 'home'),
      languages: {
        sv: '/sv',
        es: '/es',
        en: '/en'
      }
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: hrefFor(rawLocale, 'home'),
      siteName: 'Taxbusiness Stockholm',
      locale: rawLocale,
      type: 'website'
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale: rawLocale} = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const nav: {page: PageKey; label: string}[] = [
    {page: 'services', label: dict.nav.services},
    {page: 'startCompany', label: dict.nav.startCompany},
    {page: 'about', label: dict.nav.about},
    {page: 'contact', label: dict.nav.contact}
  ];

  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} page="home" nav={nav} contactLabel={dict.cta.book} />
        {children}
        <Footer
          locale={locale}
          page="home"
          nav={nav}
          privacyLabel={dict.nav.privacy}
          summary={dict.footer.summary}
          org={dict.footer.org}
          email={dict.footer.contact}
        />
      </body>
    </html>
  );
}
