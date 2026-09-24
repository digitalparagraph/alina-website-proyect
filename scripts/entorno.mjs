/**
 * Resuelve la configuración del despliegue igual que lo hace `astro.config.mjs`.
 *
 * Existe para que no haya dos verdades. El build lee `PUBLIC_SITE_URL` del
 * entorno o del `.env`; si los scripts que preparan y verifican el `dist`
 * leyeran solo el entorno, un `npm run preparar` tras un build hecho con `.env`
 * ajustaría el `.htaccess` para una ubicación distinta a la que el HTML ya trae
 * cocida, y nadie se daría cuenta hasta ver 404 en el servidor.
 */
import { loadEnv } from 'vite';

const ENV = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '');

const bruto =
  process.env.PUBLIC_SITE_URL?.trim() ||
  ENV.PUBLIC_SITE_URL?.trim() ||
  'http://localhost:4321';

const url = new URL(bruto);

/** URL completa del despliegue. */
export const URL_DESPLIEGUE = url;

/** Subcarpeta sin barras en los extremos: 'alina' en subcarpeta, '' en la raíz. */
export const SUBCARPETA = url.pathname.replace(/^\/+|\/+$/g, '');

/** Prefijo de rutas absolutas: '/alina' en subcarpeta, '' en la raíz. */
export const PREFIJO = SUBCARPETA ? `/${SUBCARPETA}` : '';

/** El despliegue es de revisión mientras no se diga lo contrario. */
export const STAGING =
  (process.env.PUBLIC_STAGING ?? ENV.PUBLIC_STAGING ?? 'true') !== 'false';
