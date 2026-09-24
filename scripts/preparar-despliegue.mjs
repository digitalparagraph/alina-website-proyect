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
 *  3. Copia el endpoint del formulario solo si se pide con --con-php. Requiere
 *     que exista un config.php en el servidor: sin él, el require falla y
 *     enviar el formulario devuelve un error 500.
 *
 * Uso: node scripts/preparar-despliegue.mjs [--con-php]
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PREFIJO, STAGING, URL_DESPLIEGUE } from './entorno.mjs';

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

writeFileSync(htaccess, contenido, 'utf8');

// --- 3. Endpoint del formulario ---
if (conPhp) {
  copyFileSync('php/contacto.php', join(RAIZ, 'contacto.php'));
  hechos.push('contacto.php copiado — recuerda subir config.php al servidor');
} else {
  hechos.push('sin contacto.php: el formulario mostrará error al enviar');
}

console.log(`Despliegue preparado para ${URL_DESPLIEGUE.href}`);
for (const h of hechos) console.log(`  · ${h}`);
