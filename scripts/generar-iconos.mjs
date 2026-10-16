/**
 * Genera el og:image y los favicon a partir de los assets de marca.
 *
 * Se guardan en `public/` y se versionan: son piezas estables que no cambian
 * con cada build, y regenerarlas en cada compilación sería gastar tiempo en
 * producir siempre lo mismo. Este script se corre a mano cuando cambie la
 * marca.
 *
 * Uso: node scripts/generar-iconos.mjs
 */
import sharp from 'sharp';
import { mkdirSync, copyFileSync } from 'node:fs';

const MARCA = 'Design System/assets';
const SALIDA = 'public';
mkdirSync(SALIDA, { recursive: true });

// El campo de marca. Mismo valor que --butter-400 en los tokens.
const BUTTER = { r: 255, g: 220, b: 151, alpha: 1 };

/* --- og:image, 1200x630 --------------------------------------------------
   Logo centrado sobre el campo butter, con aire. Sin texto añadido: el
   título y la descripción los pone cada red desde las etiquetas og. */
const LOGO_ANCHO = 520;
const logo = await sharp(`${MARCA}/logos/logo-primary.png`)
  .resize({ width: LOGO_ANCHO, withoutEnlargement: true })
  .toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: BUTTER },
})
  .composite([{ input: logo, gravity: 'centre' }])
  .png({ compressionLevel: 9 })
  .toFile(`${SALIDA}/og.png`);

/* --- favicon -------------------------------------------------------------
   El isotipo, que es lo único que se lee a 32 px. El SVG se sirve tal cual a
   los navegadores modernos; el PNG queda de respaldo y para iOS. */
copyFileSync(`${MARCA}/logos/alina-iso-morado.svg`, `${SALIDA}/favicon.svg`);

// El SVG trae el disco inscrito con mucho aire alrededor: a 32 px eso deja la
// marca en un tercio del cuadro y no se distingue. Se recorta al disco, con un
// margen mínimo, para que el isotipo llegue a los bordes.
const LIENZO = 512;
const RECORTE = Math.round(LIENZO * 0.78);
const MARGEN = Math.round(LIENZO * 0.11);

const iso = await sharp(`${MARCA}/logos/alina-iso-morado.svg`, { density: 384 })
  .resize(LIENZO, LIENZO)
  .flatten({ background: BUTTER })
  .extract({ left: MARGEN, top: MARGEN, width: RECORTE, height: RECORTE })
  .toBuffer();

for (const [nombre, lado] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
  await sharp(iso)
    .resize(lado, lado)
    .png({ compressionLevel: 9 })
    .toFile(`${SALIDA}/${nombre}`);
}

console.log('Generados en public/: og.png, favicon.svg, favicon-32.png, apple-touch-icon.png');
