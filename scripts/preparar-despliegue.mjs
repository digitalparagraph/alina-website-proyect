/**
 * Ajusta `dist/` a la ubicación real del despliegue, después del build.
 *
 * Casi todo lo que depende de la ubicación lo resuelve Astro con `base`, que
 * sale de `PUBLIC_SITE_URL`. Lo que no puede resolver es el `.htaccess`, porque
 * es un archivo estático que se copia tal cual y Apache pide rutas absolutas
 * desde la raíz del dominio en dos directivas.
 *
 * Este script hace tres cosas y las anuncia:
 *
 *  1. Prefija `ErrorDocument` con la subcarpeta. Sin esto, un 404 dentro de
 *     /alina va a buscar la página de error a la raíz del dominio, que no es
 *     nuestra, y el visitante ve el 404 genérico del servidor.
 *
 *     La ruta es `404.html` y no `404/index.html`: Astro emite esa página en la
 *     raíz del dist aunque el resto vaya en carpetas.
 *
 *  2. En staging añade `X-Robots-Tag: noindex, nofollow` para toda la carpeta.
 *     Hace falta porque un robots.txt solo se obedece en la raíz del dominio:
 *     en una subcarpeta nadie lee /alina/robots.txt. La cabecera cubre además
 *     el sitemap y los XML, que no tienen dónde llevar una etiqueta meta.
 *
 *  3. Copia el PHP solo si se pide con --con-php: el endpoint del formulario,
 *     el panel del CRM y el cron de retención. Requiere que exista un
 *     config.php un nivel arriba del docroot: sin él, el require falla y tanto
 *     el formulario como el panel devuelven un error 500.
 *
 * Uso: node scripts/preparar-despliegue.mjs [--con-php]
 */
import { copyFileSync, cpSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PREFIJO, STAGING, SUBCARPETA, URL_DESPLIEGUE } from './entorno.mjs';

const RAIZ = 'dist';
const conPhp = process.argv.includes('--con-php');

const htaccess = join(RAIZ, '.htaccess');
if (!existsSync(htaccess)) {
  console.error(`No existe ${htaccess}. Compila antes de preparar: npm run build`);
  process.exit(1);
}

let contenido = readFileSync(htaccess, 'utf8');
const hechos = [];

// --- 1. ErrorDocument con la subcarpeta ---
const errorEsperado = `ErrorDocument 404 ${PREFIJO}/404.html`;
const antes = contenido;
contenido = contenido.replace(/^ErrorDocument 404 .*$/m, errorEsperado);
if (contenido === antes && !contenido.includes(errorEsperado)) {
  console.error('No se encontró la directiva ErrorDocument en el .htaccess.');
  process.exit(1);
}
// Que el destino exista se comprueba, no se supone. Un ErrorDocument que
// apunta a un archivo inexistente no da error en el deploy: simplemente deja
// al visitante con la página de error genérica del servidor, y eso solo se
// descubre cuando alguien escribe mal una URL.
const destino404 = join(RAIZ, '404.html');
if (!existsSync(destino404)) {
  console.error(`El ErrorDocument apunta a 404.html y ese archivo no está en ${RAIZ}/.`);
  process.exit(1);
}
hechos.push(`ErrorDocument → ${PREFIJO}/404.html`);

// --- 2. Cabecera de no indexado mientras sea staging ---
const MARCA = '# --- staging: sin indexar ---';
if (STAGING && !contenido.includes(MARCA)) {
  contenido += `
${MARCA}
# Un robots.txt solo se obedece en la raíz del dominio, así que en subcarpeta
# quien bloquea de verdad es esta cabecera, junto al noindex de cada página.
# Se quita al lanzar, con PUBLIC_STAGING=false.
<IfModule mod_headers.c>
  Header set X-Robots-Tag "noindex, nofollow"
</IfModule>
`;
  hechos.push('X-Robots-Tag: noindex, nofollow para toda la carpeta');
} else if (!STAGING) {
  hechos.push('sin cabecera de no indexado (PUBLIC_STAGING=false)');
}

// --- 3. Host canonico (ADR 010) ---
// Cualquier host que no sea el del despliegue redirige a el con 301,
// conservando la ruta. Eso cubre de una vez el www y el dominio alterno
// .com.mx, que existe para proteger la marca y no para servir contenido.
//
// Se inserta ANTES de la regla de HTTPS, no al final: puesto despues, una
// peticion a http://www.dominio daria dos saltos, uno para el protocolo y otro
// para el host. Delante, resuelve las dos cosas en uno.
//
// No se aplica en local ni en el despliegue de revision en subcarpeta: ahi el
// sitio convive con otros proyectos bajo el mismo host y redirigir por host
// se llevaria por delante a los vecinos.
const host = URL_DESPLIEGUE.hostname;
const esLocal = host === 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(host);
const MARCA_HOST = '# --- host canonico ---';
const ANCLA_HTTPS = '# HTTPS obligatorio';

if (!esLocal && !SUBCARPETA && !contenido.includes(MARCA_HOST)) {
  // El punto se escapa para que el patron no acepte cualquier caracter ahi.
  const patron = host.replace(/\./g, '\\.');
  const bloque = `${MARCA_HOST}
# Un solo dominio sirve el sitio. El resto redirige con 301 para que la
# autoridad se consolide en uno y no se reparta entre varios (ADR 010).
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} !^${patron}$ [NC]
  RewriteRule ^(.*)$ https://${host}/$1 [L,R=301]
</IfModule>

`;
  if (!contenido.includes(ANCLA_HTTPS)) {
    console.error('No se encontro el bloque de HTTPS del .htaccess.');
    process.exit(1);
  }
  contenido = contenido.replace(ANCLA_HTTPS, bloque + ANCLA_HTTPS);
  hechos.push(`host canonico ${host}: cualquier otro redirige con 301`);
} else if (SUBCARPETA) {
  hechos.push('sin redireccion de host: el sitio va en subcarpeta y comparte dominio');
}

writeFileSync(htaccess, contenido, 'utf8');

// --- 4. PHP: formulario, panel y cron ---
// Van dentro del despliegue, no subidos a mano. Si vivieran fuera, el primer
// `npm run subir --reemplazar` se los llevaría, que es exactamente el error que
// ya cometimos con config.php. Lo único que queda fuera es config.php, que vive
// un nivel arriba del docroot justo por eso.
if (conPhp) {
  copyFileSync('php/contacto.php', join(RAIZ, 'contacto.php'));
  cpSync('php/panel', join(RAIZ, 'panel'), { recursive: true });
  cpSync('php/cron', join(RAIZ, 'cron'), { recursive: true });
  hechos.push('contacto.php, panel/ y cron/ copiados');
  hechos.push('config.php NO se copia: vive arriba del docroot y se sube una sola vez');
} else {
  hechos.push('sin PHP: el formulario mostrará error y el panel no existirá');
}

console.log(`Despliegue preparado para ${URL_DESPLIEGUE.href}`);
for (const h of hechos) console.log(`  · ${h}`);
