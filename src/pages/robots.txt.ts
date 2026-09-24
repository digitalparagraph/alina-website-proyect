import type { APIRoute } from 'astro';
import { ruta } from '../lib/rutas';

/**
 * Mientras el despliegue sea de staging, el sitio se cierra por completo a los
 * rastreadores. Al pasar a producción con dominio propio se define
 * PUBLIC_STAGING=false y robots pasa a permitir todo, sin bloquear a los
 * rastreadores de modelos de lenguaje: la estrategia GEO depende de que puedan
 * leer el sitio.
 *
 * Ojo con la ubicación: un robots.txt solo se obedece en la raíz del dominio.
 * Mientras el sitio viva en `dev.paragraph.mx/alina`, este archivo sale en
 * `/alina/robots.txt` y ningún rastreador lo lee. Ahí quien bloquea de verdad
 * es el `noindex` de cada página y la cabecera `X-Robots-Tag` que pone el
 * `.htaccess`. Se emite igual porque en producción, en la raíz, sí manda.
 */
export const GET: APIRoute = ({ site }) => {
  const staging = import.meta.env.PUBLIC_STAGING !== 'false';
  const sitemap = site ? new URL(ruta('/sitemap-index.xml'), site).href : '';
  const cuerpo = staging
    ? `User-agent: *\nDisallow: /\n\n# Despliegue de revisión. Sin indexar hasta el lanzamiento.\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;
  return new Response(cuerpo, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
