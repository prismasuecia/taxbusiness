import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Check} from 'lucide-react';
import {ContactForm} from '@/components/ContactForm';
import {CTA} from '@/components/CTA';
import {SectionIntro} from '@/components/SectionIntro';
import {ServiceCard} from '@/components/ServiceCard';
import {getDictionary} from '@/lib/dictionaries';
import {allLocalizedPaths, hrefFor, isLocale, pageFromSlug, type Locale, type PageKey} from '@/lib/navigation';

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
  const dict = getDictionary(rawLocale);
  const titles: Record<PageKey, string> = {
    home: dict.meta.title,
    services: dict.services.pageTitle,
    startCompany: dict.startCompany.title,
    about: dict.about.title,
    contact: dict.contact.title,
    privacy: dict.privacy.title
  };

  return {
    title: `${titles[page]} | Taxbusiness Stockholm`,
    description: dict.meta.description,
    alternates: {
      canonical: hrefFor(rawLocale, page)
    },
    openGraph: {
      title: `${titles[page]} | Taxbusiness Stockholm`,
      description: dict.meta.description,
      url: hrefFor(rawLocale, page),
      type: 'website'
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
        <div>
          <SectionIntro title={dict.contact.title} text={dict.contact.text} />
          <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-6">
            <p className="font-semibold text-petroleum">Taxbusiness Stockholm AB</p>
            <p className="mt-3 text-ink/68">{dict.footer.org}</p>
            <p className="mt-2 text-ink/68">{dict.contact.location}</p>
            <a href={`mailto:${dict.footer.contact}`} className="mt-2 block text-petroleum">
              {dict.footer.contact}
            </a>
            <p className="mt-5 text-sm text-ink/55">{dict.contact.languages}</p>
          </div>
        </div>
        <ContactForm locale={locale} labels={formLabels} options={dict.form.options} />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionIntro title={dict.privacy.title} />
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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionIntro title={dict.services.pageTitle} text={dict.services.pageText} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {dict.services.items.map((item) => (
            <ServiceCard key={item.key} item={item} locale={locale} hrefPage="contact" readMore={dict.cta.book} />
          ))}
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <CTA locale={locale} title={dict.home.ctaTitle} text={dict.home.ctaText} label={dict.cta.contact} />
      </section>
    </main>
  );
}

function StartCompanyPage({locale, dict}: {locale: Locale; dict: ReturnType<typeof getDictionary>}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionIntro title={dict.startCompany.title} text={dict.startCompany.text} />
        <div className="rounded-[2rem] border border-ink/10 bg-white p-6 shadow-soft">
          <ol className="grid gap-3">
            {dict.startCompany.items.map((item, index) => (
              <li key={item} className="flex items-center gap-4 rounded-2xl bg-paper px-4 py-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-petroleum text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span className="font-medium text-ink/75">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="mt-16">
        <CTA locale={locale} title={dict.startCompany.cta} text={dict.home.languageText} label={dict.cta.contact} />
      </div>
    </main>
  );
}

function AboutPage({locale, dict}: {locale: Locale; dict: ReturnType<typeof getDictionary>}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr]">
        <div>
          <SectionIntro title={dict.about.title} />
          <div className="mt-8 space-y-5 text-lg leading-8 text-ink/72">
            {dict.about.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <aside className="h-fit rounded-[2rem] border border-ink/10 bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-copper">{dict.about.area}</p>
          <h2 className="mt-5 font-serif text-4xl text-petroleum">{dict.about.person}</h2>
          <p className="mt-4 text-lg text-ink/72">{dict.about.role}</p>
        </aside>
      </div>
      <div className="mt-16">
        <CTA locale={locale} title={dict.home.ctaTitle} text={dict.home.ctaText} label={dict.cta.contact} />
      </div>
    </main>
  );
}
