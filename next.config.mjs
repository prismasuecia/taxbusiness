import createNextIntlPlugin from 'next-intl/plugin';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    formats: ['image/avif', 'image/webp']
  }
};

export default withNextIntl(nextConfig);
