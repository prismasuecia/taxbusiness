import {ContactForm} from '@/components/ContactForm';
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
  const formLabels = {...dict.form, send: dict.cta.send};

  return (
    <main>
      <Hero
        locale={locale}
        eyebrow={dict.home.heroEyebrow}
        title={dict.home.heroTitle}
        text={dict.home.heroText}
        primary={dict.cta.contact}
        secondary={dict.cta.services}
        labels={dict.home.visualLabels}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <TrustBar items={dict.home.trust} />
      </div>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionIntro title={dict.home.introTitle} text={dict.home.introText} />
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
          <div className="grid gap-4 md:grid-cols-3">
            {['Svenska', 'Español', 'English'].map((language) => (
              <div key={language} className="rounded-3xl border border-ink/10 bg-paper p-6">
                <p className="font-serif text-3xl text-petroleum">{language}</p>
                <div className="mt-8 h-px bg-ink/10" />
              </div>
            ))}
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
      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <SectionIntro title={dict.contact.title} text={dict.contact.text} />
        <ContactForm locale={locale} labels={formLabels} options={dict.form.options} />
      </section>
    </main>
  );
}
