import {ArrowUpRight, Building2, Calculator, Landmark, UsersRound} from 'lucide-react';
import type {Locale, PageKey} from '@/lib/navigation';
import {LocaleLink} from './LocaleLink';

const icons = {
  company: Building2,
  accounting: Calculator,
  payroll: UsersRound,
  taxes: Landmark
};

export function ServiceCard({
  item,
  locale,
  hrefPage,
  readMore
}: {
  item: {key: string; title: string; description: string};
  locale: Locale;
  hrefPage: PageKey;
  readMore: string;
}) {
  const Icon = icons[item.key as keyof typeof icons] ?? Calculator;
  return (
    <article className="group flex min-h-[260px] flex-col rounded-3xl border border-ink/10 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linen text-petroleum">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <h3 className="mt-6 font-serif text-2xl text-petroleum">{item.title}</h3>
      <p className="mt-3 flex-1 leading-7 text-ink/68">{item.description}</p>
      <LocaleLink
        locale={locale}
        page={hrefPage}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-petroleum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
      >
        {readMore}
        <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </LocaleLink>
    </article>
  );
}
