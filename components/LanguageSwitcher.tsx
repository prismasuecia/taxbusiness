import {hrefFor, locales, type Locale, type PageKey} from '@/lib/navigation';
import Link from 'next/link';

const labels: Record<Locale, string> = {sv: 'På svenska', es: 'En español', en: 'In English'};

export function LanguageSwitcher({locale, page}: {locale: Locale; page: PageKey}) {
  return (
    <nav aria-label="Language" className="flex flex-wrap items-center gap-1 text-xs font-semibold">
      {locales.map((item) => (
        <Link
          key={item}
          href={hrefFor(item, page)}
          aria-current={item === locale ? 'true' : undefined}
          className={`rounded-full px-3 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper ${
            item === locale ? 'bg-petroleum text-white' : 'text-ink/65 hover:bg-linen hover:text-petroleum'
          }`}
        >
          {labels[item]}
        </Link>
      ))}
    </nav>
  );
}
