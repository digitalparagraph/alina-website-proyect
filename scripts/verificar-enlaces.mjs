/**
 * Verificación de enlaces internos, consciente de la subcarpeta.
 *
 * `linkinator` sirve un directorio como si fuera la raíz de un dominio. Cuando
 * el sitio va en subcarpeta, sus enlaces apuntan a `/alina/...` y contra un
 * `dist/` servido en la raíz todos darían 404: el verificador reportaría el
 * sitio entero como roto y, peor, en la variante contraria —saltando esas
 * rutas— no comprobaría nada.
 *
 * Así que si hay subcarpeta, se espeja `dist/` dentro de ella y se verifica
 * sobre ese árbol, que es la forma que tendrá el servidor.
 *
 * Uso: node scripts/verificar-enlaces.mjs
 */
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { SUBCARPETA as base } from './entorno.mjs';

const DIST = 'dist';
const ESPEJO = '.verificacion';

if (!existsSync(DIST)) {
  console.error(`No existe ${DIST}/. Compila antes de verificar: npm run build`);
  process.exit(1);
}

// Sin subcarpeta se verifica el dist tal cual. Con subcarpeta se espeja dentro
// de ella y se le dice a linkinator dónde está la raíz del servidor, para que
// /alina/... resuelva igual que resolverá en el servidor.
let argumentos = [DIST];
if (base) {
  rmSync(ESPEJO, { recursive: true, force: true });
  mkdirSync(join(ESPEJO, base), { recursive: true });
  cpSync(DIST, join(ESPEJO, base), { recursive: true });
  argumentos = [`${base}/`, '--server-root', ESPEJO];
  console.log(`Sitio en subcarpeta /${base}: se verifica sobre el árbol espejado.`);
}

// shell en Windows: desde Node 20 no se lanza un .cmd sin shell, y sin esto el
// verificador no corre y no dice por qué. Un control que falla en silencio es
// peor que no tenerlo.
const resultado = spawnSync(
  'npx',
  ['--yes', 'linkinator', ...argumentos, '--config', 'linkinator.config.json'],
  { stdio: 'inherit', shell: process.platform === 'win32' }
);

if (base) rmSync(ESPEJO, { recursive: true, force: true });

if (resultado.error) {
  console.error(`No se pudo ejecutar linkinator: ${resultado.error.message}`);
  process.exit(1);
}

process.exit(resultado.status ?? 1);
