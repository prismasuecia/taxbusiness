'use client';

import {Menu, X} from 'lucide-react';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {pageFromSlug, type Locale, type PageKey} from '@/lib/navigation';
import {LocaleLink} from './LocaleLink';
import {LanguageSwitcher} from './LanguageSwitcher';

type NavItem = {page: PageKey; label: string};

export function Header({
  locale,
  page,
  nav,
  contactLabel
}: {
  locale: Locale;
  page: PageKey;
  nav: NavItem[];
  contactLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const slug = pathname.split('/').filter(Boolean)[1];
  const currentPage = pageFromSlug(locale, slug) ?? page;

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <LocaleLink locale={locale} page="home" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-petroleum/20 bg-white font-serif text-lg text-petroleum">
            TB
          </span>
          <span className="leading-none">
            <span className="block font-serif text-xl text-petroleum">Taxbusiness</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.26em] text-ink/55">Stockholm</span>
          </span>
        </LocaleLink>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <LocaleLink
              key={item.page}
              locale={locale}
              page={item.page}
              aria-current={item.page === currentPage ? 'page' : undefined}
              className={`text-sm font-medium transition hover:text-petroleum ${
                item.page === currentPage ? 'text-petroleum' : 'text-ink/68'
              }`}
            >
              {item.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher locale={locale} page={currentPage} />
          <LocaleLink
            locale={locale}
            page="contact"
            className="rounded-full bg-petroleum px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
          >
            {contactLabel}
          </LocaleLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-petroleum lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink/10 bg-paper px-4 pb-5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2 py-4" aria-label="Mobile navigation">
            {nav.map((item) => (
              <LocaleLink
                key={item.page}
                locale={locale}
                page={item.page}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-medium text-ink/75 hover:bg-linen"
              >
                {item.label}
              </LocaleLink>
            ))}
          </nav>
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <LanguageSwitcher locale={locale} page={currentPage} />
            <LocaleLink
              locale={locale}
              page="contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-petroleum px-5 py-2.5 text-sm font-semibold text-white"
            >
              {contactLabel}
            </LocaleLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
