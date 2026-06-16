import {CTA} from '@/components/CTA';
import {Hero} from '@/components/Hero';
import {LocaleLink} from '@/components/LocaleLink';
import {SectionIntro} from '@/components/SectionIntro';
import {StructuredData} from '@/components/StructuredData';
import {TrustBar} from '@/components/TrustBar';
import {getDictionary} from '@/lib/dictionaries';
import {isLocale, type Locale} from '@/lib/navigation';
import {breadcrumbJsonLd} from '@/lib/seo';
import {ArrowUpRight, Bell, CheckCircle2, FileCheck2, FolderLock, Upload} from 'lucide-react';
import Image from 'next/image';
import {notFound} from 'next/navigation';

const anaMariaPortrait = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/ana-maria-alvarez.jpg`;
const ucGoldLogo = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/brand/uc-guld.jpeg`;

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const {locale: rawLocale} = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale as Locale;
  const dict = getDictionary(locale);

  return (
    <main>
      <StructuredData data={breadcrumbJsonLd(locale, 'home', dict.nav.home)} />
      <Hero
        locale={locale}
        eyebrow={dict.home.heroEyebrow}
        title={dict.home.heroTitle}
        text={dict.home.heroText}
        primary={dict.cta.book}
        secondary={dict.cta.services}
        niche={dict.home.heroNiche}
        languageLine={dict.home.heroLanguages}
      />
      <div className="px-4 sm:px-6 lg:px-8">
        <TrustBar items={dict.home.trust} />
      </div>
      <section className="mt-6 bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionIntro title={dict.home.bridgeTitle} text={dict.home.bridgeText} />
            <p className="mt-6 border-l-2 border-copper pl-5 text-lg leading-8 text-petroleum">{dict.home.bridgeClosing}</p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {dict.home.bridgeItems.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-paper p-5">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-copper" aria-hidden="true" />
                <span className="font-semibold leading-7 text-petroleum">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionIntro title={dict.home.servicesTitle} text={dict.home.servicesText} />
        </div>
        <div className="grid gap-px overflow-hidden rounded-[1.5rem] border border-ink/10 bg-ink/10 md:grid-cols-2">
          {dict.services.items.slice(0, 4).map((item) => (
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
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
        <SectionIntro title={dict.home.processTitle} text={dict.home.processText} />
        <div className="grid gap-4 md:grid-cols-3">
          {dict.home.process.map((step) => (
            <article key={step.title} className="rounded-[1.25rem] border border-ink/10 bg-white p-6">
              <h3 className="font-serif text-2xl leading-tight text-petroleum">{step.title}</h3>
              <p className="mt-3 leading-7 text-ink/68">{step.text}</p>
            </article>
          ))}
        </div>
        </div>
      </section>
      <section id="client-portal" className="mx-auto max-w-7xl scroll-mt-28 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 rounded-[1.5rem] border border-petroleum/15 bg-petroleum px-6 py-10 text-white md:grid-cols-[1fr_0.8fr] md:px-10">
          <div>
            <FolderLock className="h-8 w-8 text-sand" aria-hidden="true" />
            <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">{dict.home.portalTitle}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{dict.home.portalText}</p>
            <LocaleLink
              locale={locale}
              page="portal"
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-petroleum transition hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
            >
              {dict.home.portalCta}
            </LocaleLink>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/58">{dict.home.portalNote}</p>
          </div>
          <div className="grid content-center gap-3">
            {[Upload, FileCheck2, Bell].map((Icon, index) => (
              <div key={index} className="flex items-center gap-4 border-b border-white/15 py-4">
                <Icon className="h-5 w-5 shrink-0 text-sand" aria-hidden="true" />
                <span className="text-sm font-semibold text-white/82">
                  {[dict.home.portalFeatureUpload, dict.home.portalFeatureOverview, dict.home.portalFeatureNotice][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[0.38fr_1fr] md:items-center">
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
            <blockquote className="mt-6 max-w-2xl border-l-2 border-copper pl-5 font-serif text-2xl leading-8 text-petroleum">
              “{dict.home.personQuote}”
            </blockquote>
          </div>
        </div>
        </div>
      </section>
      {locale === 'sv' ? (
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-y border-ink/10 bg-white/60 px-5 py-5 sm:flex-row sm:items-center">
            <Image src={ucGoldLogo} alt="UC Guld" width={70} height={66} className="h-14 w-auto shrink-0 object-contain" />
            <div>
              <h2 className="text-sm font-semibold text-petroleum">UC Guld – högsta kreditvärdighet</h2>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-ink/68">
                Tax Business Stockholm AB är klassat i UC Riskklass 5, den högsta riskklassen. Det är ett externt kreditbetyg som visar mycket god kreditvärdighet.
              </p>
            </div>
          </div>
        </section>
      ) : null}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <SectionIntro title={dict.faq.title} />
          <div className="border-t border-ink/10">
            {dict.faq.items.map((item) => (
              <details key={item.question} className="group border-b border-ink/10 py-5">
                <summary className="cursor-pointer list-none font-semibold text-petroleum">{item.question}</summary>
                <p className="mt-3 max-w-2xl leading-7 text-ink/68">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20 lg:px-8">
        <CTA locale={locale} title={dict.home.ctaTitle} text={dict.home.ctaText} label={dict.cta.contact} />
      </section>
    </main>
  );
}
