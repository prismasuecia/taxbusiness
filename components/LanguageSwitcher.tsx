import {hrefFor, locales, type Locale, type PageKey} from '@/lib/navigation';
import Link from 'next/link';

const labels: Record<Locale, string> = {sv: 'SV', es: 'ES', en: 'EN'};

export function LanguageSwitcher({locale, page}: {locale: Locale; page: PageKey}) {
  return (
    <nav aria-label="Language" className="flex items-center gap-1 text-xs font-semibold tracking-[0.18em]">
      {locales.map((item) => (
        <Link
          key={item}
          href={hrefFor(item, page)}
          aria-current={item === locale ? 'true' : undefined}
          className={`rounded-full px-2.5 py-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper ${
            item === locale ? 'bg-petroleum text-white' : 'text-ink/65 hover:bg-linen'
          }`}
        >
          {labels[item]}
        </Link>
      ))}
    </nav>
  );
}
