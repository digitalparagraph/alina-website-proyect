/**
 * Las cinco áreas de "¿Qué puedes trabajar?" de la guía de contenido, en su
 * orden y con las palabras de Alina.
 *
 * `tema` apunta a la página de la colección. Las cinco la tienen desde que se
 * abrieron las dos de fase 2 (ADR 009), así que hoy las cinco van en tarjeta.
 * El mecanismo de las que no tienen página se conserva: si mañana se añade un
 * área antes que su página, se nombra en texto y no queda una tarjeta con el
 * hueco del enlace vacío.
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
    tema: 'decisiones-y-cambios',
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
    tema: 'limites-y-relaciones',
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
