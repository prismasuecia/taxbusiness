import type {Locale} from '@/lib/navigation';
import {LocaleLink} from './LocaleLink';

export function CTA({locale, title, text, label}: {locale: Locale; title: string; text: string; label: string}) {
  return (
    <section className="rounded-[2rem] bg-petroleum px-6 py-12 text-white md:px-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl leading-tight md:text-5xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-white/76">{text}</p>
        </div>
        <LocaleLink
          locale={locale}
          page="contact"
          className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-petroleum transition hover:bg-linen focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
        >
          {label}
        </LocaleLink>
      </div>
    </section>
  );
}
