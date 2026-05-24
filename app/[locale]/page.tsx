import {ContactForm} from '@/components/ContactForm';
import {CTA} from '@/components/CTA';
import {Hero} from '@/components/Hero';
import {SectionIntro} from '@/components/SectionIntro';
import {ServiceCard} from '@/components/ServiceCard';
import {TrustBar} from '@/components/TrustBar';
import {getDictionary} from '@/lib/dictionaries';
import {isLocale, type Locale} from '@/lib/navigation';
import {Check, Mail, MapPin} from 'lucide-react';
import {notFound} from 'next/navigation';

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);
  const formLabels = {...dict.form, send: dict.cta.send};

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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionIntro title={dict.home.introTitle} text={dict.home.introText} />
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <SectionIntro title={dict.home.processTitle} text={dict.home.processText} />
          <ol className="grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 md:grid-cols-2">
            {dict.home.process.map((step, index) => (
              <li key={step.title} className="bg-paper p-6">
                <span className="text-sm font-semibold text-copper">0{index + 1}</span>
                <h3 className="mt-5 font-serif text-3xl text-petroleum">{step.title}</h3>
                <p className="mt-3 leading-7 text-ink/68">{step.text}</p>
              </li>
            ))}
          </ol>
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
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="rounded-[2rem] bg-petroleum p-8 text-white md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sand">{dict.home.qualityTitle}</p>
          <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">{dict.home.fitTitle}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/76">{dict.home.fitText}</p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {dict.home.quality.map((item) => (
              <li key={item} className="flex items-start gap-3 border-t border-white/14 pt-4 text-white/82">
                <Check className="mt-1 h-4 w-4 shrink-0 text-sand" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-5">
          <article className="rounded-[2rem] border border-ink/10 bg-white p-7 shadow-soft">
            <h3 className="font-serif text-3xl text-petroleum">{dict.home.pricingTitle}</h3>
            <p className="mt-4 leading-7 text-ink/68">{dict.home.pricingText}</p>
          </article>
          <article className="rounded-[2rem] border border-ink/10 bg-white p-7">
            <h3 className="font-serif text-3xl text-petroleum">{dict.home.qualityTitle}</h3>
            <p className="mt-4 leading-7 text-ink/68">{dict.home.qualityText}</p>
          </article>
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
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <SectionIntro title={dict.faq.title} centered />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {dict.faq.items.map((item) => (
            <article key={item.question} className="rounded-3xl border border-ink/10 bg-white p-6">
              <h3 className="font-serif text-2xl text-petroleum">{item.question}</h3>
              <p className="mt-3 leading-7 text-ink/68">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <SectionIntro title={dict.contact.title} text={dict.contact.text} />
          <div className="mt-8 space-y-3 rounded-3xl border border-ink/10 bg-white p-6">
            <p className="font-semibold text-petroleum">Taxbusiness Stockholm AB</p>
            <p className="flex items-start gap-3 text-ink/68">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
              {dict.contact.location}
            </p>
            <a className="flex items-start gap-3 text-petroleum" href={`mailto:${dict.footer.contact}`}>
              <Mail className="mt-1 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
              {dict.footer.contact}
            </a>
            <p className="pt-3 text-sm leading-6 text-ink/58">{dict.contact.response}</p>
          </div>
        </div>
        <ContactForm locale={locale} labels={formLabels} options={dict.form.options} />
      </section>
    </main>
  );
}
