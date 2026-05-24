import Link from 'next/link';
import type {AnchorHTMLAttributes, ReactNode} from 'react';
import {hrefFor, type Locale, type PageKey} from '@/lib/navigation';

type LocaleLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  locale: Locale;
  page: PageKey;
  children: ReactNode;
  className?: string;
};

export function LocaleLink({locale, page, children, className, ...props}: LocaleLinkProps) {
  return (
    <Link href={hrefFor(locale, page)} className={className} {...props}>
      {children}
    </Link>
  );
}
