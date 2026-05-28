import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import '../../styles/globals.css';
import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';
import {StructuredData} from '@/components/StructuredData';
import {getDictionary} from '@/lib/dictionaries';
import {hrefFor, isLocale, locales, type Locale, type PageKey} from '@/lib/navigation';
import {absoluteUrl, businessJsonLd, languageAlternates, pageSeo, websiteJsonLd} from '@/lib/seo';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale: rawLocale} = await params;
  if (!isLocale(rawLocale)) return {};
  const seo = pageSeo[rawLocale].home;

  return {
    metadataBase: new URL('https://taxbusiness.se'),
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: absoluteUrl(hrefFor(rawLocale, 'home')),
      languages: languageAlternates('home')
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: absoluteUrl(hrefFor(rawLocale, 'home')),
      siteName: 'Tax Business Stockholm AB',
      locale: rawLocale,
      type: 'website',
      images: [{url: '/brand/tax-business-logo-cropped.jpg', width: 1600, height: 1200, alt: 'Tax Business Stockholm AB'}]
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/brand/tax-business-logo-cropped.jpg']
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
        <StructuredData data={businessJsonLd(locale)} />
        <StructuredData data={websiteJsonLd(locale)} />
        <Header locale={locale} page="home" nav={nav} contactLabel={dict.cta.book} />
        {children}
        <Footer
          locale={locale}
          page="home"
          nav={nav}
          privacyLabel={dict.nav.privacy}
          menuHeading={dict.footer.menuHeading}
          contactHeading={dict.footer.contactHeading}
          languageHeading={dict.footer.languageHeading}
          summary={dict.footer.summary}
          org={dict.footer.org}
          email={dict.footer.contact}
        />
      </body>
    </html>
  );
}
