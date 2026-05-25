import {CTA} from '@/components/CTA';
import {Hero} from '@/components/Hero';
import {LocaleLink} from '@/components/LocaleLink';
import {SectionIntro} from '@/components/SectionIntro';
import {TrustBar} from '@/components/TrustBar';
import {getDictionary} from '@/lib/dictionaries';
import {isLocale, type Locale} from '@/lib/navigation';
import {ArrowUpRight, CheckCircle2} from 'lucide-react';
import Image from 'next/image';
import {notFound} from 'next/navigation';

const anaMariaPortrait = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/ana-maria-alvarez.jpg`;

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
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <TrustBar items={dict.home.trust} />
      </div>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionIntro title={dict.home.bridgeTitle} text={dict.home.bridgeText} />
        <div className="grid gap-3 sm:grid-cols-2">
          {dict.home.bridgeItems.map((item) => (
            <div key={item} className="flex items-center gap-3 border-b border-ink/10 py-4">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
              <span className="font-serif text-2xl text-petroleum">{item}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro title={dict.home.servicesTitle} text={dict.home.servicesText} />
        </div>
        <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {dict.services.items.map((item) => (
            <article key={item.key} className="bg-white p-6">
              <h3 className="font-serif text-2xl leading-tight text-petroleum">{item.title}</h3>
              <p className="mt-3 leading-7 text-ink/68">{item.description}</p>
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
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionIntro title={dict.home.languageTitle} text={dict.home.languageText} />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <SectionIntro title={dict.home.processTitle} text={dict.home.processText} />
        <div className="grid gap-4 md:grid-cols-3">
          {dict.home.process.map((step) => (
            <article key={step.title} className="rounded-[1.25rem] border border-ink/10 bg-white p-6">
              <h3 className="font-serif text-2xl leading-tight text-petroleum">{step.title}</h3>
              <p className="mt-3 leading-7 text-ink/68">{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
        <div className="grid gap-8 border-y border-ink/10 py-8 md:grid-cols-[0.35fr_1fr] md:items-center">
          <figure>
            <Image
              src={anaMariaPortrait}
              alt={dict.about.person}
              width={420}
              height={560}
              className="aspect-[4/5] w-full max-w-xs rounded-[1.25rem] object-cover"
              priority={false}
            />
            <figcaption className="mt-3 text-sm leading-6 text-ink/58">{dict.about.caption}</figcaption>
          </figure>
          <div>
            <h2 className="font-serif text-3xl leading-tight text-petroleum md:text-4xl">{dict.home.personTitle}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-ink/72">{dict.home.personText}</p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
        <div className="grid gap-8 rounded-[1.5rem] border border-ink/10 bg-white p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h2 className="font-serif text-3xl leading-tight text-petroleum md:text-4xl">{dict.home.aboutTitle}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-ink/68">{dict.home.aboutText}</p>
          </div>
          <LocaleLink
            locale={locale}
            page="about"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-petroleum hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          >
            {dict.nav.about}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </LocaleLink>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
        <CTA locale={locale} title={dict.home.ctaTitle} text={dict.home.ctaText} label={dict.cta.contact} />
      </section>
    </main>
  );
}
