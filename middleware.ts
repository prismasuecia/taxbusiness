import createMiddleware from 'next-intl/middleware';
import {locales} from './lib/navigation';

export default createMiddleware({
  locales,
  defaultLocale: 'sv',
  localePrefix: 'always'
});

export const config = {
  matcher: ['/', '/(sv|es|en)/:path*']
};
