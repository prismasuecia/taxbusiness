import type {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {Check} from 'lucide-react';
import {ContactForm} from '@/components/ContactForm';
import {CTA} from '@/components/CTA';
import {SectionIntro} from '@/components/SectionIntro';
import {StructuredData} from '@/components/StructuredData';
import {getDictionary} from '@/lib/dictionaries';
import {allLocalizedPaths, hrefFor, isLocale, pageFromSlug, type Locale} from '@/lib/navigation';
import {absoluteUrl, breadcrumbJsonLd, languageAlternates, pageSeo} from '@/lib/seo';

const anaMariaPortrait = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/ana-maria-alvarez.jpg`;

export function generateStaticParams() {
  return allLocalizedPaths();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale: rawLocale, slug} = await params;
  if (!isLocale(rawLocale)) return {};
  const page = pageFromSlug(rawLocale, slug);
  if (!page) return {};
  const seo = pageSeo[rawLocale][page];
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: absoluteUrl(hrefFor(rawLocale, page)),
      languages: languageAlternates(page)
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
      url: absoluteUrl(hrefFor(rawLocale, page)),
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

export default async function LocalizedPage({params}: {params: Promise<{locale: string; slug: string}>}) {
  const {locale: rawLocale, slug} = await params;
  if (!isLocale(rawLocale)) notFound();
  const page = pageFromSlug(rawLocale, slug);
  if (!page || page === 'home') notFound();

  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const formLabels = {...dict.form, send: dict.cta.send};

  if (page === 'services') return <ServicesPage locale={locale} dict={dict} />;
  if (page === 'startCompany') return <StartCompanyPage locale={locale} dict={dict} />;
  if (page === 'about') return <AboutPage locale={locale} dict={dict} />;
  if (page === 'contact') {
    return (
      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <StructuredData data={breadcrumbJsonLd(locale, page, dict.contact.title)} />
        <div>
          <SectionIntro title={dict.contact.title} text={dict.contact.text} headingLevel={1} />
          <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-6">
            <p className="font-semibold text-petroleum">Tax Business Stockholm AB</p>
            <p className="mt-3 text-ink/68">{dict.footer.org}</p>
            <p className="mt-2 text-ink/68">{dict.contact.location}</p>
            <a href={`mailto:${dict.footer.contact}`} className="mt-2 block text-petroleum">
              {dict.footer.contact}
            </a>
            <p className="mt-5 text-sm text-ink/55">{dict.contact.languages}</p>
            <p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-6 text-ink/62">{dict.contact.response}</p>
            <p className="mt-3 text-sm leading-6 text-ink/62">{dict.contact.reassurance}</p>
          </div>
        </div>
        <ContactForm locale={locale} labels={formLabels} options={dict.form.options} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <StructuredData data={breadcrumbJsonLd(locale, page, dict.privacy.title)} />
      <SectionIntro title={dict.privacy.title} headingLevel={1} />
      <div className="mt-8 space-y-5 text-lg leading-8 text-ink/72">
        {dict.privacy.text.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}

function ServicesPage({locale, dict}: {locale: Locale; dict: ReturnType<typeof getDictionary>}) {
  return (
    <main>
      <StructuredData data={breadcrumbJsonLd(locale, 'services', dict.services.pageTitle)} />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionIntro title={dict.services.pageTitle} text={dict.services.pageText} headingLevel={1} />
        {locale === 'sv' ? <h2 className="mt-12 font-serif text-3xl text-petroleum">Översikt</h2> : null}
        <div className="mt-6 grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {dict.services.items.map((item) => (
            <article key={item.key} className="bg-white p-6">
              <h2 className="font-serif text-2xl leading-tight text-petroleum">{item.title}</h2>
              <p className="mt-3 leading-7 text-ink/68">{item.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
          {locale === 'sv' ? <h2 className="font-serif text-3xl text-petroleum">Vad ingår?</h2> : null}
          {dict.services.items.map((item) => (
            <article key={item.key} className="grid gap-8 border-b border-ink/10 py-10 last:border-0 lg:grid-cols-[0.55fr_1fr]">
              <div>
                <h2 className="font-serif text-4xl text-petroleum">{item.title}</h2>
                <p className="mt-4 leading-7 text-ink/68">{item.details}</p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3 rounded-2xl bg-paper px-4 py-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
                    <span className="text-ink/72">{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <SectionIntro title={locale === 'sv' ? 'Så börjar samarbetet' : dict.home.processTitle} text={dict.home.processText} />
        <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 md:grid-cols-3">
          {dict.home.process.map((step) => (
            <article key={step.title} className="bg-white p-6">
              <h2 className="font-serif text-3xl text-petroleum">{step.title}</h2>
              <p className="mt-3 leading-7 text-ink/68">{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTA locale={locale} title={dict.home.ctaTitle} text={dict.home.ctaText} label={dict.cta.contact} />
      </section>
    </main>
  );
}

function StartCompanyPage({locale, dict}: {locale: Locale; dict: ReturnType<typeof getDictionary>}) {
  const sections =
    'sections' in dict.startCompany
      ? dict.startCompany.sections
      : dict.startCompany.items.map((item) => ({title: item, text: ''}));
  const ctaText = 'ctaText' in dict.startCompany ? dict.startCompany.ctaText : dict.home.languageText;

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <StructuredData data={breadcrumbJsonLd(locale, 'startCompany', dict.startCompany.title)} />
      <SectionIntro title={dict.startCompany.title} text={dict.startCompany.text} headingLevel={1} />
      <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((item) => (
          <section key={item.title} className="bg-white p-6">
            <h2 className="font-serif text-2xl leading-tight text-petroleum">{item.title}</h2>
            {item.text ? <p className="mt-3 leading-7 text-ink/68">{item.text}</p> : null}
          </section>
        ))}
      </div>
      <div className="mt-16">
        <CTA locale={locale} title={dict.startCompany.cta} text={ctaText} label={dict.cta.contact} />
      </div>
    </main>
  );
}

function AboutPage({locale, dict}: {locale: Locale; dict: ReturnType<typeof getDictionary>}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <StructuredData data={breadcrumbJsonLd(locale, 'about', dict.about.title)} />
      <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <SectionIntro title={dict.about.title} headingLevel={1} />
          <div className="mt-8 space-y-5 text-lg leading-8 text-ink/72">
            {dict.about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-[2rem] border border-ink/10 bg-white p-8 shadow-soft">
          <Image
            src={anaMariaPortrait}
            alt={dict.about.person}
            width={700}
            height={900}
            className="mb-6 aspect-[4/5] w-full rounded-[1.5rem] object-cover"
            priority={false}
          />
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-copper">{dict.about.area}</p>
          <h2 className="mt-5 font-serif text-4xl text-petroleum">{dict.about.person}</h2>
          <p className="mt-4 text-lg text-ink/72">{dict.about.role}</p>
          <p className="mt-2 text-sm leading-6 text-ink/58">{dict.about.caption}</p>
        </aside>
      </div>
      <div className="mt-16">
        <CTA locale={locale} title={dict.home.ctaTitle} text={dict.home.ctaText} label={dict.cta.contact} />
      </div>
    </main>
  );
}
