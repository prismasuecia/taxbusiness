import type {Locale} from '@/lib/navigation';
import {LocaleLink} from './LocaleLink';

export function Hero({
  locale,
  eyebrow,
  title,
  text,
  primary,
  secondary,
  niche,
  languageLine,
  visualEyebrow,
  visualTitle,
  visualText,
  labels
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary: string;
  niche: string;
  languageLine: string;
  visualEyebrow: string;
  visualTitle: string;
  visualText: string;
  labels: string[];
}) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 pb-12 pt-12 sm:px-6 md:pt-16 lg:grid-cols-[0.95fr_0.85fr] lg:px-8">
      <div>
        <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-copper">{eyebrow}</p>
        <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] text-petroleum sm:text-5xl md:text-6xl xl:text-[4.25rem]">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-ink/72 md:text-lg">{text}</p>
        <div className="mt-5 max-w-xl border-y border-ink/10 py-3">
          <p className="font-serif text-lg leading-tight text-petroleum md:text-2xl">{niche}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-ink/52">{languageLine}</p>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
      <div className="hidden lg:block">
        <div className="rounded-[1.5rem] border border-ink/10 bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-copper">{visualEyebrow}</p>
          <h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight text-petroleum">{visualTitle}</h2>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {labels.map((label) => (
              <div key={label} className="rounded-2xl border border-ink/10 bg-paper px-4 py-4 text-sm font-medium text-petroleum">
                {label}
              </div>
            ))}
          </div>
          <p className="mt-8 border-t border-ink/10 pt-5 text-sm leading-6 text-ink/62">{visualText}</p>
        </div>
      </div>
    </section>
  );
}
