import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

// Un archivo de configuración de Astro no ve el .env por su cuenta, así que sin
// esto quien llenara PUBLIC_SITE_URL en el .env la vería ignorada justo aquí,
// donde se decide el dominio y la subcarpeta. La variable de entorno del
// proceso gana, que es como la pasa el workflow de deploy.
const ENV = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '');

/**
 * `PUBLIC_SITE_URL` es la única variable que fija dónde vive el sitio, y de
 * ella salen las tres cosas que dependen de la ubicación: el `site` de Astro
 * —que gobierna sitemap y canonical—, el `base` que prefija cada ruta interna,
 * y la raíz absoluta que usan los `@id` del JSON-LD.
 *
 * Ejemplos:
 *   https://dev.paragraph.mx/alina   → origen dev.paragraph.mx, base /alina
 *   https://alinamartinez.mx         → origen alinamartinez.mx, base /
 *
 * Sin la variable, el respaldo es localhost en la raíz. Es lo único honesto en
 * local, y el CI de los pull request compila así a propósito, porque valida el
 * sitio y no lo publica. Quien exige la variable es el workflow de deploy, que
 * se detiene antes de compilar si no está cargada: un build con canonical a
 * localhost subido al servidor es peor que un deploy que no corre.
 */
const URL_DESPLIEGUE = new URL(
  process.env.PUBLIC_SITE_URL?.trim() ||
    ENV.PUBLIC_SITE_URL?.trim() ||
    'http://localhost:4321'
);

export const SITIO = URL_DESPLIEGUE.origin;
export const BASE = URL_DESPLIEGUE.pathname.replace(/\/+$/, '') || '/';

export default defineConfig({
  site: SITIO,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [sitemap({ changefreq: 'monthly' })],
  compressHTML: true,
});
