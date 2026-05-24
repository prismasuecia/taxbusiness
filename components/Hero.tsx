import type {Locale} from '@/lib/navigation';
import {DecorativeGrid} from './DecorativeGrid';
import {LocaleLink} from './LocaleLink';

export function Hero({
  locale,
  eyebrow,
  title,
  text,
  primary,
  secondary,
  labels
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary: string;
  labels: string[];
}) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 md:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
      <div>
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-copper">{eyebrow}</p>
        <h1 className="max-w-4xl font-serif text-5xl leading-[1.04] text-petroleum md:text-7xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/72 md:text-xl md:leading-9">{text}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <LocaleLink
            locale={locale}
            page="contact"
            className="inline-flex justify-center rounded-full bg-petroleum px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          >
            {primary}
          </LocaleLink>
          <LocaleLink
            locale={locale}
            page="services"
            className="inline-flex justify-center rounded-full border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-petroleum transition hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          >
            {secondary}
          </LocaleLink>
        </div>
      </div>
      <DecorativeGrid labels={labels} />
    </section>
  );
}
