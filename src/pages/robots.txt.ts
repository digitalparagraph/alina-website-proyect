import type { APIRoute } from 'astro';

/**
 * Mientras el despliegue sea de staging, el sitio se cierra por completo a los
 * rastreadores. Al pasar a producción con dominio propio se define
 * PUBLIC_STAGING=false y robots pasa a permitir todo, sin bloquear a los
 * rastreadores de modelos de lenguaje: la estrategia GEO depende de que puedan
 * leer el sitio.
 */
export const GET: APIRoute = ({ site }) => {
  const staging = import.meta.env.PUBLIC_STAGING !== 'false';
  const cuerpo = staging
    ? `User-agent: *\nDisallow: /\n\n# Despliegue de revisión. Sin indexar hasta el lanzamiento.\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`;
  return new Response(cuerpo, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
