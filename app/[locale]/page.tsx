import {CTA} from '@/components/CTA';
import {Hero} from '@/components/Hero';
import {LocaleLink} from '@/components/LocaleLink';
import {SectionIntro} from '@/components/SectionIntro';
import {TrustBar} from '@/components/TrustBar';
import {getDictionary} from '@/lib/dictionaries';
import {isLocale, type Locale} from '@/lib/navigation';
import {ArrowUpRight} from 'lucide-react';
import {notFound} from 'next/navigation';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <main>
      <Hero
        locale={locale}
        eyebrow={dict.home.heroEyebrow}
        title={dict.home.heroTitle}
        text={dict.home.heroText}
        primary={dict.cta.send}
        secondary={dict.cta.services}
        niche={dict.home.heroNiche}
        languageLine={dict.home.heroLanguages}
        labels={dict.home.visualLabels}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <TrustBar items={dict.home.trust} />
      </div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionIntro title={dict.home.bridgeTitle} text={dict.home.bridgeText} />
        <div className="border-y border-ink/10 py-2">
          <div className="border-b border-ink/10 px-2 py-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-copper">Suecia · Sverige</p>
          </div>
          <ul className="grid grid-cols-2 gap-px bg-ink/10 md:block md:bg-transparent md:divide-y md:divide-ink/10">
            {dict.home.bridgeItems.map((item, index) => (
              <li key={item} className="grid grid-cols-[2.25rem_1fr] items-center bg-paper px-3 py-4 md:grid-cols-[3.5rem_1fr] md:bg-transparent md:px-2 md:py-5">
                <span className="text-xs text-ink/38 md:text-sm">0{index + 1}</span>
                <span className="font-serif text-2xl text-petroleum md:text-3xl">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro title={dict.home.servicesTitle} text={dict.home.servicesText} />
        </div>
        <div className="grid border-y border-ink/10 md:grid-cols-2">
          {dict.services.items.map((item, index) => (
            <article
              key={item.key}
              className={`border-b border-ink/10 py-6 md:px-6 ${
                index % 2 === 0 ? 'md:border-r' : ''
              } ${index > 1 ? 'md:border-b-0' : ''}`}
            >
              <h3 className="font-serif text-3xl leading-tight text-petroleum">{item.title}</h3>
              <p className="mt-3 max-w-lg leading-7 text-ink/68">{item.description}</p>
              <LocaleLink
                locale={locale}
                page="services"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-petroleum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
              >
                {dict.cta.readMore}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </LocaleLink>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
        <CTA locale={locale} title={dict.home.ctaTitle} text={dict.home.ctaText} label={dict.cta.contact} />
      </section>
    </main>
  );
}
