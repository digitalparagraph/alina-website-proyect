import { defineCollection, z } from 'astro:content';

/**
 * El esquema no es documentación: es la plantilla de ocho bloques de la Etapa 2
 * convertida en condición de compilación.
 *
 * Una página de tema sin delimitación de alcance rompe el build. Es requisito
 * del ADR 001 y no puede depender de que alguien lo recuerde al redactar.
 */
const temas = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string().max(70),
    descripcion: z.string().min(70).max(160),

    // Bloque 1 — reconocimiento. Dos o tres frases, no más:
    // si crece, entierra la respuesta que los modelos necesitan extraer.
    reconocimiento: z.string().min(80).max(420),

    // Bloque 2 — la pregunta de búsqueda y su respuesta directa.
    preguntaBusqueda: z.string().min(10),
    respuestaCorta: z.string().min(120),

    // Bloque 6 — obligatorio por el ADR 001. Sin esto no compila.
    delimitacionAlcance: z.string().min(80),

    // Bloque 7 — dos hermanos. Los patrones aparecen combinados.
    temasHermanos: z.array(z.string()).length(2),

    keywordPrincipal: z.string(),
    keywordsSecundarias: z.array(z.string()).default([]),

    // E-E-A-T: contenido YMYL necesita fecha de revisión visible.
    fechaRevision: z.date(),
    fase: z.union([z.literal(1), z.literal(2)]),

    // Marca el contenido provisional de la Etapa 5. La Etapa 6 lo pone en false.
    borrador: z.boolean().default(true),
  }),
});

export const collections = { temas };
