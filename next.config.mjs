import createNextIntlPlugin from 'next-intl/plugin';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');
const __dirname = dirname(fileURLToPath(import.meta.url));
const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGithubPages ? 'export' : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: isGithubPages,
    formats: ['image/avif', 'image/webp']
  }
};

export default withNextIntl(nextConfig);
