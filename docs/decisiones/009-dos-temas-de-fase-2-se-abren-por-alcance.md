# ADR 009 — Dos temas de fase 2 se abren por alcance del servicio, no por tracción

**Fecha:** 2026-09-23
**Estado:** aceptada
**Etapa:** 1, revisada
**Decide:** Damian
**Revisa parcialmente:** la secuencia de fases de la Etapa 1

## Contexto

La Etapa 1 definió seis páginas de tema y decidió lanzar con tres. El argumento era de autoridad de dominio: tres páginas con contenido serio superan a seis delgadas, y las tres de fase 1 eran las de mejor relación volumen-dificultad. Las de fase 2 se abrirían cuando las primeras mostraran tracción medible en Search Console.

En su primera revisión, Alina señaló que la parte de temas se sentía limitada y pidió incluir relaciones, hábitos de vida, propósito y metas, y procesos de cambio. Las cuatro ya estaban en su guía de contenido y ya estaban mapeadas a URLs en la Etapa 1.

El primer intento de resolverlo fue mostrar las cinco áreas de la guía en la portada y nombrar en texto las que no tenían página. Eso corrigió la percepción de alcance estrecho, pero dejó dos áreas sin destino: quien se reconoce en "relaciones" o en "decisiones y cambios" no tiene dónde leer más.

El disparador que fijó la Etapa 1 tampoco se puede evaluar todavía. El sitio no está indexado y no existe Search Console, así que esperar tracción equivale a esperar sin fecha.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Mantener las tres y nombrar el resto en texto | Respeta la decisión original y no diluye autoridad | Dos de las cinco áreas quedan sin destino. La condición para abrirlas no se puede medir todavía |
| Abrir las tres de fase 2 | Cierra el mapa completo de una vez | `regulacion-emocional` solapa con `sobrepensar-y-rumiacion`, que ya cubre buena parte del término |
| **Abrir dos: límites y relaciones, decisiones y cambios** | Cubre las dos áreas que quedaban sin destino, sin solapar con lo existente | Se adelanta a los datos que pedía la Etapa 1 |

## Decisión

Se construyen `/temas/limites-y-relaciones/` y `/temas/decisiones-y-cambios/`, escritas a la misma profundidad que las de fase 1: los ocho bloques de la plantilla de la Etapa 2, con mecanismo propio y situaciones concretas.

`/temas/regulacion-emocional/` **sigue sin construirse**. Su contenido se solapa con `sobrepensar-y-rumiacion`, y dos páginas que compiten por el mismo campo semántico se restan entre sí.

El índice de temas deja de filtrar por fase y muestra las páginas que existen.

## Motivo

Lo que cambió no es el criterio de SEO, es el problema que se está resolviendo. La decisión original protegía la autoridad del dominio frente a páginas delgadas. Esa protección sigue teniendo sentido y por eso la condición se mantiene: no se abre una página que no se pueda escribir con la misma seriedad que las demás.

Lo que la Etapa 1 no previó es que el sitio pudiera comunicar un alcance menor que el del servicio. Un visitante que se reconoce en "digo que sí cuando quería decir que no" y no encuentra dónde leer sobre eso no es un problema de posicionamiento: es alguien que se fue.

La condición de tracción tampoco es aplicable hoy. Pedir datos de Search Console a un sitio que todavía no se publica convierte una regla útil en un bloqueo indefinido.

## Consecuencias

- **El sitio lanza con cinco páginas de tema.** El presupuesto de calidad no baja: si una página no se puede escribir con mecanismo propio y situaciones concretas, no se abre.
- **La medición cambia de forma.** La Etapa 9 ya no puede comparar tres páginas de fase 1 contra tres de fase 2 abiertas después. La línea base se toma con las cinco publicadas a la vez.
- **`decisiones-y-cambios` no tiene término de cabeza claro**, como ya anotaba la Etapa 1. Se publica por cobertura de alcance, no por volumen, y su rendimiento se juzga con ese criterio.
- **`regulacion-emocional` queda como la única de fase 2 pendiente.** Antes de abrirla hay que resolver el solapamiento con `sobrepensar-y-rumiacion`, probablemente decidiendo cuál de las dos se queda con el campo semántico.
- El copy de las dos páginas nuevas **está pendiente de revisión de Alina**, como el resto.
