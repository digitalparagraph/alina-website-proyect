import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * El dominio no está decidido (Etapa 3, sección 6). Hasta entonces la URL del
 * despliegue viaja en PUBLIC_SITE_URL: la fija el workflow de deploy desde las
 * variables del repositorio y de ahí salen el sitemap y los canonical de golpe.
 *
 * Sin la variable, el respaldo es localhost. Es lo único honesto en local, y el
 * CI de los PR compila así a propósito, porque valida el sitio y no lo publica.
 * Quien exige la variable es el workflow de deploy, que se detiene antes de
 * compilar si no está: un build con canonical a localhost subido al servidor es
 * peor que un deploy que no corre.
 */
export const SITIO = process.env.PUBLIC_SITE_URL?.trim() || 'http://localhost:4321';

export default defineConfig({
  site: SITIO,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ changefreq: 'monthly' })],
  compressHTML: true,
});
