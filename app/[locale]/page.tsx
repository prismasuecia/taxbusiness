import {CTA} from '@/components/CTA';
import {Hero} from '@/components/Hero';
import {SectionIntro} from '@/components/SectionIntro';
import {ServiceCard} from '@/components/ServiceCard';
import {TrustBar} from '@/components/TrustBar';
import {getDictionary} from '@/lib/dictionaries';
import {isLocale, type Locale} from '@/lib/navigation';
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
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <SectionIntro title={dict.home.bridgeTitle} text={dict.home.bridgeText} />
        <div className="border-y border-ink/10 py-2">
          <div className="border-b border-ink/10 px-2 py-5">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-copper">Suecia · Sverige</p>
          </div>
          <ul className="divide-y divide-ink/10">
            {dict.home.bridgeItems.map((item, index) => (
              <li key={item} className="grid grid-cols-[3.5rem_1fr] items-center px-2 py-5">
                <span className="text-sm text-ink/38">0{index + 1}</span>
                <span className="font-serif text-3xl text-petroleum">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro title={dict.home.servicesTitle} text={dict.home.servicesText} />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {dict.services.items.map((item) => (
            <ServiceCard key={item.key} item={item} locale={locale} hrefPage="services" readMore={dict.cta.readMore} />
          ))}
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionIntro title={dict.home.languageTitle} text={dict.home.languageText} />
          <div className="grid gap-4 md:grid-cols-[1.35fr_0.8fr]">
            <div className="rounded-[2rem] bg-petroleum p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sand">Especialidad</p>
              <p className="mt-5 font-serif text-5xl">{dict.home.languagePrimary}</p>
              <p className="mt-5 max-w-md leading-7 text-white/76">{dict.home.languagePrimaryText}</p>
            </div>
            <div className="border-y border-ink/10">
              {dict.home.languageSecondary.map((language) => (
                <div key={language} className="border-b border-ink/10 p-6 last:border-b-0">
                  <p className="font-serif text-3xl text-petroleum">{language}</p>
                  <div className="mt-8 h-px bg-copper/45" />
                </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <SectionIntro title={dict.home.aboutTitle} text={dict.home.aboutText} />
        <div className="rounded-[2rem] border border-ink/10 bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-copper">Ana Maria Alvarez</p>
          <h2 className="mt-5 font-serif text-4xl text-petroleum">{dict.about.person}</h2>
          <p className="mt-4 text-lg text-ink/72">{dict.about.role}</p>
          <p className="mt-2 text-ink/60">{dict.about.area}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <CTA locale={locale} title={dict.home.ctaTitle} text={dict.home.ctaText} label={dict.cta.contact} />
      </section>
    </main>
  );
}
