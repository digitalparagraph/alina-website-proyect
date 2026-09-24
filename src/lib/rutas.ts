/**
 * El sitio puede vivir en la raíz de un dominio o dentro de una subcarpeta.
 * Hoy el staging está en `dev.paragraph.mx/alina` y la producción irá a la raíz
 * de su propio dominio, así que la ubicación tiene que ser una variable y no
 * una decisión repartida en dieciséis páginas.
 *
 * Todas las rutas internas del sitio pasan por aquí. `PUBLIC_SITE_URL` gobierna
 * el resto: de su origen sale el `site` de Astro y de su ruta, el `base`.
 */

/** '/' cuando el sitio va en la raíz; '/alina/' cuando va en subcarpeta. */
const BASE = import.meta.env.BASE_URL;

/**
 * Prefija una ruta interna con la base del despliegue.
 * `ruta('/agendar/')` devuelve '/agendar/' en la raíz y '/alina/agendar/' en
 * subcarpeta.
 */
export function ruta(destino: string): string {
  const limpio = destino.replace(/^\/+/, '');
  return `${BASE}/${limpio}`.replace(/\/{2,}/g, '/');
}

/**
 * Raíz absoluta del sitio, con la subcarpeta si la hay y sin barra final.
 *
 * Es lo que tienen que llevar los `@id` y las URLs del JSON-LD: `Astro.site`
 * por sí solo trae el origen sin la subcarpeta, y un `@id` sin ella apunta a
 * una página que no existe.
 */
export function raizAbsoluta(site: URL | undefined): string {
  if (!site) return '';
  return new URL(ruta('/'), site).href.replace(/\/$/, '');
}
