import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El dominio aún no se decide (Etapa 3). Hasta entonces, la URL temporal de
// Cloudflare Pages. Cambiar aquí actualiza sitemap y canonical de golpe.
export const SITIO = process.env.PUBLIC_SITE_URL ?? 'https://alina-website.pages.dev';

export default defineConfig({
  site: SITIO,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ changefreq: 'monthly' })],
  compressHTML: true,
});
