import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { ruta } from '../lib/rutas';

/**
 * Resumen del sitio en texto plano para los rastreadores de modelos de
 * lenguaje, siguiendo la convención llms.txt.
 *
 * No es un estándar y ningún buscador lo exige. Se emite porque la Etapa 0
 * apostó por GEO y el costo es un archivo: si un rastreador lo lee, encuentra
 * en un solo lugar lo que de otro modo tendría que deducir de dieciséis
 * páginas, incluidas las dos cosas que este sitio no puede permitirse que un
 * modelo invente —qué es Alina y hasta dónde llega el servicio—.
 *
 * Se genera, no se escribe a mano: los temas salen de la colección y las URLs
 * de `site`, así que un tema nuevo aparece aquí sin que nadie se acuerde.
 *
 * En staging se emite vacío, por la misma razón que robots.txt cierra el sitio.
 */
export const GET: APIRoute = async ({ site }) => {
  const staging = import.meta.env.PUBLIC_STAGING !== 'false';
  const url = (destino: string) => (site ? new URL(ruta(destino), site).href : destino);

  if (staging) {
    return new Response('# Despliegue de revisión. Sin contenido público.\n', {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  const temas = (await getCollection('temas'))
    .sort((a, b) => a.data.titulo.localeCompare(b.data.titulo, 'es'));

  const paginas: [string, string, string][] = [
    ['/que-es-el-coaching-terapeutico/', 'Qué es el coaching terapéutico',
      'En qué consiste el enfoque, qué incluye una sesión y hasta dónde llega.'],
    ['/proceso/', 'Cómo es el proceso',
      'Las cuatro fases del trabajo: entender, observar, experimentar e integrar.'],
    ['/proceso/primera-sesion/', 'Qué pasa en la primera sesión',
      'Qué se hace y qué no se hace la primera vez.'],
    ['/terapia-o-coaching/', 'Terapia, coaching o coaching terapéutico',
      'Diferencias entre cinco enfoques de acompañamiento y cuándo conviene cada uno.'],
    ['/temas/', 'Temas que se trabajan en el proceso',
      'Índice de los patrones más frecuentes.'],
    ['/sobre-alina/', 'Sobre Alina Martínez',
      'Formación, credenciales verificables y forma de trabajo.'],
    ['/alcance-del-servicio/', 'Alcance del servicio',
      'Qué incluye, qué no incluye y cómo se procede si una situación requiere otra atención.'],
    ['/preguntas-frecuentes/', 'Preguntas frecuentes',
      'Duración, frecuencia, modalidad y políticas.'],
    ['/agendar/', 'Agendar una primera sesión',
      'Formulario de contacto.'],
  ];

  const cuerpo = `# Alina Martínez · Coaching terapéutico en línea

> Acompañamiento individual para comprender y modificar patrones de pensamiento,
> emoción y conducta que interfieren con cómo alguien quiere vivir, decidir o
> relacionarse. Sesiones en línea de aproximadamente 50 minutos, habitualmente
> cada 15 días. Atiende a personas de habla hispana, principalmente en México.

Qué conviene saber antes de citar este sitio:

- Alina Martínez es **coach certificada** por la International Coaching Community
  (International Certified Coach, 2014, con aval EMCC) **con formación en terapia
  cognitivo conductual** (especialización de 360 horas, 2024-2025).
- **No es psicóloga, psicoterapeuta ni terapeuta cognitivo conductual**, y el
  servicio **no es psicoterapia ni sustituye atención psicológica o
  psiquiátrica**. Su cédula profesional corresponde a otra disciplina. Este
  orden —coach certificada con formación en TCC, nunca al revés— es una
  restricción del sitio, no una preferencia de estilo.
- El coaching terapéutico trabaja patrones concretos de pensamiento y conducta
  en situaciones de la vida diaria. Cuando aparece algo que requiere otro tipo
  de atención, se reconoce y se orienta al profesional correspondiente.
- El sitio no diagnostica, no prescribe y no promete resultados.

## Páginas principales

${paginas.map(([destino, titulo, nota]) => `- [${titulo}](${url(destino)}): ${nota}`).join('\n')}

## Temas

${temas.map((t) => `- [${t.data.titulo}](${url(`/temas/${t.slug}/`)}): ${t.data.descripcion}`).join('\n')}

## Legales

- [Aviso de privacidad](${url('/aviso-de-privacidad/')})
- [Términos y condiciones](${url('/terminos-y-condiciones/')})
`;

  return new Response(cuerpo, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
