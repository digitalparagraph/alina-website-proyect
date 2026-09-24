/**
 * Las cinco áreas de "¿Qué puedes trabajar?" de la guía de contenido, en su
 * orden y con las palabras de Alina. Son la respuesta a la observación de que
 * el sitio se sentía limitado a tres temas: el servicio siempre cubrió cinco
 * áreas, pero la portada solo mostraba las tres que tienen página propia.
 *
 * `tema` apunta a la página de la colección cuando existe. Las áreas de fase 2
 * se nombran sin enlace: la Etapa 1 decidió lanzar con tres páginas serias en
 * lugar de seis delgadas, y esa decisión sigue en pie. Lo que cambia es que
 * ahora se ve el alcance completo del trabajo, no solo la parte construida.
 */
export type Area = {
  nombre: string;
  cubre: string;
  tema: string | null;
};

export const AREAS: Area[] = [
  {
    nombre: 'Decisiones y cambios',
    cubre: 'Claridad, toma de decisiones y transiciones personales o profesionales.',
    tema: null,
  },
  {
    nombre: 'Pensamiento y emociones',
    cubre:
      'Rumiación, autocrítica, preocupación, regulación emocional y patrones de pensamiento.',
    tema: 'sobrepensar-y-rumiacion',
  },
  {
    nombre: 'Relaciones',
    cubre:
      'Límites, comunicación, conflictos, patrones relacionales y formas de responder ante los demás.',
    tema: null,
  },
  {
    nombre: 'Autoexigencia',
    cubre: 'Perfeccionismo, expectativas personales, culpa y relación con el desempeño.',
    tema: 'autoexigencia-y-perfeccionismo',
  },
  {
    nombre: 'Hábitos y conducta',
    cubre:
      'Identificación de patrones, procrastinación, evitación y construcción de nuevas conductas.',
    tema: 'procrastinacion-y-evitacion',
  },
];

/** Las áreas con página propia. Se muestran como tarjeta, que promete destino. */
export const AREAS_CON_PAGINA = AREAS.filter((a) => a.tema !== null);

/** Las que todavía no la tienen. Se nombran en texto: una tarjeta sin enlace
 *  deja un hueco donde debería ir el destino y se lee como algo que falló al
 *  cargar, no como un área que sí se trabaja. */
export const AREAS_SIN_PAGINA = AREAS.filter((a) => a.tema === null);
