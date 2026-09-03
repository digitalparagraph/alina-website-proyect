# ADR 002 — Astro con el contenido en el repositorio

**Fecha:** 2026-09-03
**Estado:** aceptada
**Etapa:** 3

## Contexto

Quince páginas de contenido en fase 1, casi todo texto. La estrategia GEO depende de que los modelos de lenguaje puedan leer el sitio, lo que exige HTML semántico servido sin depender de JavaScript. El proyecto ya opera con el contenido versionado en Git y revisado por PR.

Damian decidió que Paragraph edita el contenido después del lanzamiento; Alina no necesita panel de administración.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| **Astro con contenido en el repo** | HTML estático sin JavaScript por default; el contenido sigue el mismo flujo de PR que la documentación; sin superficie de mantenimiento | Alina no puede cambiar un texto sin pedirlo |
| Astro con CMS ligero | Alina edita sola | Una pieza más que mantener, y una decisión extra que hoy no aporta |
| WordPress | Autonomía total para Alina, plugins de SEO conocidos | Rendimiento peor de arranque, actualizaciones permanentes, riesgo de que el tema inyecte JavaScript que estorbe al contenido |
| Next.js | Ecosistema amplio | Sobredimensionado para un sitio de texto; obliga a decisiones de renderizado que aquí no existen |

## Decisión

Astro con salida estática. Contenido en Markdown dentro del repositorio, gestionado con Content Collections y validado por esquema en tiempo de build.

Sin framework de componentes. CSS propio con custom properties; los tokens salen de la Etapa 4.

## Motivo

Es el único de los cuatro que hace del requisito GEO el comportamiento por default en lugar de algo que hay que defender contra el framework.

La validación por esquema aporta algo que no estaba en la lista de requisitos y resulta valioso: la estructura de bloques que fija la Etapa 2 se puede declarar como esquema, de modo que una página de tema sin bloque de delimitación de alcance rompe el build. La regla deja de depender de que alguien la recuerde.

## Consecuencias

- Todo cambio de contenido pasa por un PR. Es coherente con el marco de trabajo, y es más lento para correcciones triviales.
- Se renuncia a la autonomía de Alina sobre el texto. Si eso cambia, la migración natural es añadir un CMS headless sobre las mismas colecciones, no rehacer el sitio.
- Sin framework de componentes, la interactividad se resuelve con JavaScript propio y mínimo. No hay ninguna necesitada en fase 1.
- Abrir `/articulos/` en fase 3 no requiere decisiones nuevas: es otra colección.
