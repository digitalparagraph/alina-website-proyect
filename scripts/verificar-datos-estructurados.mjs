/**
 * Validación de los datos estructurados del sitio compilado.
 *
 * Tercer control del CI que pide la Etapa 3, después del build y de los
 * enlaces. Corre sobre `dist/` sin salir a la red: el presupuesto de la Etapa 3
 * es cero peticiones a terceros y eso también aplica al CI, que si no depende
 * de que el validador de Google esté en pie.
 *
 * No valida el vocabulario de schema.org completo. Valida lo que este proyecto
 * decidió y no quiere perder por descuido:
 *
 *  - Que el JSON-LD sea JSON válido y declare @context y @type. Un bloque roto
 *    no da error en el navegador: simplemente deja de existir para el buscador.
 *  - Que Person esté en todas las páginas con sus dos credenciales. Es la
 *    entidad de la que depende el E-E-A-T del sitio.
 *  - Que Person nunca se declare terapeuta, psicóloga ni psicoterapeuta. Es el
 *    ADR 001, comprobado en el HTML emitido y no solo en el código fuente.
 *  - Que las referencias por @id resuelvan dentro de la misma página.
 *  - Que las URLs absolutas del grafo apunten al dominio del despliegue. Es lo
 *    que delata un build hecho sin PUBLIC_SITE_URL.
 *  - Que las preguntas y respuestas del FAQPage estén visibles en la página.
 *    Google pide que el marcado corresponda al contenido que ve una persona.
 *
 * Uso: node scripts/verificar-datos-estructurados.mjs [directorio]
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const RAIZ = process.argv[2] ?? 'dist';

/** ADR 001: títulos que Alina no puede reclamar. */
const TITULOS_PROHIBIDOS = /\b(terapeuta|psicoterapeuta|psic[oó]log[oa])\b/i;

/** Campos de Person donde un título prohibido sería una afirmación de rol.
 *  El nombre de la especialización sí dice "Psicoterapia": es el nombre real
 *  del programa que cursó y vive en hasCredential, no en el rol. */
const CAMPOS_DE_ROL = ['name', 'jobTitle', 'description', 'alternateName'];

const fallas = [];
const avisos = [];
let paginas = 0;
let bloques = 0;

function htmlsDe(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const ruta = join(dir, e.name);
    if (e.isDirectory()) return htmlsDe(ruta);
    return e.name.endsWith('.html') ? [ruta] : [];
  });
}

function decodificar(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

/** Texto que efectivamente lee una persona, normalizado a un solo espacio. */
function textoVisible(html) {
  return decodificar(
    html
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
  )
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizar(s) {
  return decodificar(String(s)).replace(/\s+/g, ' ').trim();
}

/** Recorre el objeto entero: los nodos del grafo pueden venir anidados. */
function* nodos(valor) {
  if (Array.isArray(valor)) {
    for (const v of valor) yield* nodos(v);
  } else if (valor && typeof valor === 'object') {
    yield valor;
    for (const v of Object.values(valor)) yield* nodos(v);
  }
}

function tipos(nodo) {
  const t = nodo['@type'];
  return (Array.isArray(t) ? t : [t]).filter(Boolean).map(String);
}

try {
  statSync(RAIZ);
} catch {
  console.error(`No existe ${RAIZ}/. Compila antes de validar: npm run build`);
  process.exit(1);
}

/** Origen del despliegue, tomado del canonical de la portada. */
let origenEsperado = null;
try {
  const portada = readFileSync(join(RAIZ, 'index.html'), 'utf8');
  const canonical = portada.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  if (canonical) origenEsperado = new URL(canonical[1]).origin;
} catch {
  /* sin portada legible se omite la comprobación de origen */
}

for (const archivo of htmlsDe(RAIZ)) {
  const pagina = '/' + relative(RAIZ, archivo).split(sep).join('/');
  const html = readFileSync(archivo, 'utf8');
  const visible = textoVisible(html);
  paginas++;

  const crudos = [
    ...html.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi
    ),
  ].map((m) => m[1]);

  const falla = (mensaje) => fallas.push(`${pagina}: ${mensaje}`);

  if (crudos.length === 0) {
    falla('sin datos estructurados');
    continue;
  }

  const grafos = [];
  for (const [i, crudo] of crudos.entries()) {
    bloques++;
    try {
      grafos.push(JSON.parse(decodificar(crudo)));
    } catch (e) {
      falla(`bloque JSON-LD ${i + 1} no es JSON válido — ${e.message}`);
    }
  }

  const todos = grafos.flatMap((g) => [...nodos(g)]);
  const identificados = new Set(
    todos.map((n) => n['@id']).filter((v) => typeof v === 'string')
  );

  for (const grafo of grafos) {
    for (const nodo of Array.isArray(grafo) ? grafo : [grafo]) {
      if (nodo?.['@context'] !== 'https://schema.org') {
        falla('un bloque no declara @context https://schema.org');
      }
      if (!nodo || tipos(nodo).length === 0) falla('un bloque no declara @type');
    }
  }

  // --- Person: la entidad que ancla el grafo ---
  const personas = todos.filter((n) => tipos(n).includes('Person'));
  if (personas.length === 0) falla('sin Person');

  for (const persona of personas) {
    if (!persona['@id']) falla('Person sin @id: nada puede referenciarla');
    if (!persona.jobTitle) falla('Person sin jobTitle');

    const credenciales = [persona.hasCredential]
      .flat()
      .filter((c) => c && typeof c === 'object');
    if (credenciales.length < 2) {
      falla(
        `Person declara ${credenciales.length} credencial(es); el sitio sostiene dos`
      );
    }

    for (const campo of CAMPOS_DE_ROL) {
      const valor = persona[campo];
      if (typeof valor === 'string' && TITULOS_PROHIBIDOS.test(valor)) {
        falla(
          `ADR 001: Person.${campo} reclama un título que no le corresponde — "${valor}"`
        );
      }
    }
  }

  // --- Referencias por @id y URLs del grafo ---
  for (const nodo of todos) {
    const ref = nodo['@id'];
    const esSoloReferencia = ref && Object.keys(nodo).length === 1;
    if (esSoloReferencia && !identificados.has(ref)) {
      falla(`referencia @id sin destino en la página — ${ref}`);
    }
    if (!origenEsperado) continue;
    for (const valor of Object.values(nodo)) {
      if (typeof valor !== 'string' || !/^https?:\/\//.test(valor)) continue;
      if (valor.startsWith('https://schema.org')) continue;
      if (new URL(valor).origin !== origenEsperado) {
        falla(`URL fuera del dominio del despliegue — ${valor}`);
      }
    }
  }

  // --- FAQPage: el marcado tiene que corresponder a lo visible ---
  for (const faq of todos.filter((n) => tipos(n).includes('FAQPage'))) {
    const preguntas = [faq.mainEntity].flat().filter(Boolean);
    if (preguntas.length === 0) falla('FAQPage sin preguntas');
    for (const p of preguntas) {
      const pregunta = normalizar(p?.name ?? '');
      const respuesta = normalizar(p?.acceptedAnswer?.text ?? '');
      if (!pregunta) falla('Question sin name');
      if (!respuesta) {
        falla(`Question sin respuesta — "${pregunta}"`);
        continue;
      }
      if (pregunta && !visible.includes(pregunta)) {
        falla(`pregunta marcada que no aparece en la página — "${pregunta}"`);
      }
      if (!visible.includes(respuesta)) {
        falla(`respuesta marcada que no aparece en la página — "${pregunta}"`);
      }
    }
  }

  // --- Article: las páginas de tema ---
  for (const art of todos.filter((n) => tipos(n).includes('Article'))) {
    if (!art.headline) falla('Article sin headline');
    if (!art.author?.['@id'] && !art.author?.name) falla('Article sin autoría');
    const fecha = art.dateModified ?? art.datePublished;
    if (!fecha) {
      falla('Article sin fecha de revisión: el contenido YMYL la necesita');
    } else if (!/^\d{4}-\d{2}-\d{2}/.test(String(fecha))) {
      falla(`fecha de Article que no es ISO 8601 — ${fecha}`);
    }
  }
}

if (!origenEsperado) {
  avisos.push(
    'No se pudo leer el canonical de la portada: no se comprobó el dominio de las URLs.'
  );
}

console.log(`Datos estructurados: ${bloques} bloque(s) en ${paginas} página(s).`);
for (const a of avisos) console.log(`aviso — ${a}`);

if (fallas.length > 0) {
  console.error(`\n${fallas.length} problema(s):`);
  for (const f of fallas) console.error(`  · ${f}`);
  process.exit(1);
}
console.log('Sin problemas.');
