import type {Locale, PageKey} from '@/lib/navigation';
import {LanguageSwitcher} from './LanguageSwitcher';
import {LocaleLink} from './LocaleLink';

export function Footer({
  locale,
  page,
  nav,
  privacyLabel,
  summary,
  org,
  email
}: {
  locale: Locale;
  page: PageKey;
  nav: {page: PageKey; label: string}[];
  privacyLabel: string;
  summary: string;
  org: string;
  email: string;
}) {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <LocaleLink locale={locale} page="home" className="font-serif text-3xl text-petroleum">
            Taxbusiness Stockholm
          </LocaleLink>
          <p className="mt-4 max-w-md leading-7 text-ink/68">{summary}</p>
          <p className="mt-5 text-sm text-ink/55">{org}</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-petroleum">Menu</h2>
          <nav className="mt-4 flex flex-col gap-3">
            {nav.map((item) => (
              <LocaleLink key={item.page} locale={locale} page={item.page} className="text-ink/68 hover:text-petroleum">
                {item.label}
              </LocaleLink>
            ))}
            <LocaleLink locale={locale} page="privacy" className="text-ink/68 hover:text-petroleum">
              {privacyLabel}
            </LocaleLink>
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-petroleum">Contact</h2>
          <p className="mt-4 text-ink/68">Solna / Stockholm</p>
          <a className="mt-2 block text-ink/68 hover:text-petroleum" href={`mailto:${email}`}>
            {email}
          </a>
          <div className="mt-5">
            <LanguageSwitcher locale={locale} page={page} />
          </div>
        </div>
      </div>
    </footer>
  );
}
