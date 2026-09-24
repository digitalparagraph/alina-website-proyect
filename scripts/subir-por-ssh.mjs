/**
 * Sube `dist/` al servidor por SSH.
 *
 * Va en un solo transferido y no archivo por archivo: el sitio son ~37 archivos
 * pequeños y sobre una conexión con latencia cada uno cuesta más en ida y
 * vuelta que en bytes. Se empaqueta, se copia el paquete y se extrae allá.
 *
 * Antes de escribir, mira. Si el directorio de destino ya tiene algo, el script
 * lo enseña y se detiene: hace falta `--reemplazar` para borrarlo. Un deploy
 * que pisa en silencio lo que hay en un servidor compartido es la clase de
 * cosa que se descubre tarde.
 *
 * La autenticación es por clave. Este script no pide ni recibe contraseñas: si
 * la clave no basta, falla y lo dice.
 *
 * Los nombres de las variables son los mismos que usa `deploy-ssh.sh` del
 * proyecto App Paragraph, que despliega en la misma cuenta de hosting. Un solo
 * juego de nombres para toda la agencia:
 *
 *   SSH_HOST      46.202.197.103
 *   SSH_USER      el usuario del hosting
 *   SSH_PORT      65002 en Hostinger; 22 por defecto
 *   SSH_DESTINO   directorio remoto, absoluto
 *   SSH_CLAVE     ruta a la clave; por defecto ~/.ssh/paragraph_hostinger
 *
 * Uso: node scripts/subir-por-ssh.mjs [--reemplazar]
 */
import { spawnSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { homedir } from 'node:os';
import { join as unir } from 'node:path';
import { loadEnv } from 'vite';

const ENV = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), '');
const cfg = (nombre, porDefecto) =>
  process.env[nombre]?.trim() || ENV[nombre]?.trim() || porDefecto;

const HOST = cfg('SSH_HOST');
const USUARIO = cfg('SSH_USER');
const PUERTO = cfg('SSH_PORT', '22');
const CLAVE = cfg('SSH_CLAVE', unir(homedir(), '.ssh', 'paragraph_hostinger'));
const DESTINO = cfg('SSH_DESTINO');
const reemplazar = process.argv.includes('--reemplazar');

const faltan = Object.entries({ SSH_HOST: HOST, SSH_USER: USUARIO, SSH_DESTINO: DESTINO })
  .filter(([, v]) => !v)
  .map(([k]) => k);
if (faltan.length) {
  console.error(`Faltan variables: ${faltan.join(', ')}. Ver la cabecera de este script.`);
  process.exit(1);
}
if (!existsSync(CLAVE)) {
  console.error(`No existe la clave ${CLAVE}. Pásala en SSH_CLAVE.`);
  process.exit(1);
}
if (!existsSync('dist/index.html')) {
  console.error('No hay dist/ compilado. Corre: npm run verificar && npm run preparar');
  process.exit(1);
}

const PAQUETE = 'sitio-alina.tgz';
const opcionesSsh = [
  '-p', PUERTO,
  '-o', 'BatchMode=yes',
  '-o', 'StrictHostKeyChecking=accept-new',
  '-i', CLAVE,
];
const opcionesScp = opcionesSsh.map((o) => (o === '-p' ? '-P' : o));

function correr(programa, argumentos, { silencioso = false } = {}) {
  const r = spawnSync(programa, argumentos, {
    stdio: silencioso ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    encoding: 'utf8',
  });
  if (r.error) {
    console.error(`No se pudo ejecutar ${programa}: ${r.error.message}`);
    process.exit(1);
  }
  return r;
}

const remoto = (orden) =>
  correr('ssh', [...opcionesSsh, `${USUARIO}@${HOST}`, orden], { silencioso: true });

// --- 1. Mirar antes de escribir ---
const listado = remoto(
  `if [ -d '${DESTINO}' ]; then ls -A '${DESTINO}' | head -20; else echo '__NO_EXISTE__'; fi`
);
if (listado.status !== 0) {
  console.error('No se pudo conectar por SSH:');
  console.error((listado.stderr || '').trim() || 'sin detalle');
  process.exit(1);
}
const contenido = (listado.stdout || '').trim();
const existe = contenido !== '__NO_EXISTE__';

if (existe && contenido !== '' && !reemplazar) {
  console.error(`El destino ${DESTINO} ya tiene contenido:`);
  for (const l of contenido.split('\n')) console.error(`  ${l}`);
  console.error('\nRepite con --reemplazar si quieres borrarlo y subir encima.');
  process.exit(1);
}

// --- 2. Empaquetar ---
console.log('Empaquetando dist/…');
rmSync(PAQUETE, { force: true });
const tar = correr('tar', ['czf', PAQUETE, '-C', 'dist', '.']);
if (tar.status !== 0) process.exit(tar.status ?? 1);

// --- 3. Copiar ---
console.log(`Copiando a ${USUARIO}@${HOST}:${PUERTO}…`);
const copia = correr('scp', [...opcionesScp, PAQUETE, `${USUARIO}@${HOST}:${PAQUETE}`]);
if (copia.status !== 0) {
  rmSync(PAQUETE, { force: true });
  process.exit(copia.status ?? 1);
}

// --- 4. Extraer allá ---
console.log(`Extrayendo en ${DESTINO}…`);
const ordenes = [
  `set -e`,
  reemplazar ? `rm -rf '${DESTINO}'` : `true`,
  `mkdir -p '${DESTINO}'`,
  `tar xzf '${PAQUETE}' -C '${DESTINO}'`,
  `rm -f '${PAQUETE}'`,
  `find '${DESTINO}' -type f | wc -l`,
].join(' && ');
const extraccion = remoto(ordenes);
rmSync(PAQUETE, { force: true });

if (extraccion.status !== 0) {
  console.error('Falló la extracción en el servidor:');
  console.error((extraccion.stderr || '').trim() || 'sin detalle');
  process.exit(1);
}

console.log(`Subido: ${(extraccion.stdout || '').trim()} archivos en ${DESTINO}`);
