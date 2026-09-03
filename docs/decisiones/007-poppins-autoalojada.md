# ADR 007 — Poppins autoalojada como tipografía del sitio

**Fecha:** 2026-09-03
**Estado:** aceptada
**Etapa:** 4
**Decide:** Damian

## Contexto

La tipografía de la marca es Acumin Variable Concept, licenciada a través de Adobe Fonts. El sistema de diseño incluye el OTF variable extraído de los archivos de Illustrator, y su propio readme marca como pendiente confirmar si puede enviarse a producción.

No puede. Un OTF de Adobe Fonts sirve para comping interno; servirlo desde un sitio público requiere licencia web, que se sirve como proyecto de Adobe Fonts desde `use.typekit.net`.

El sistema ya declara Poppins como fallback.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Licencia web de Adobe Fonts | La tipografía real de la marca | Petición a un tercero en la carga inicial, contra el presupuesto de la Etapa 3; script bloqueante de Typekit; costo recurrente |
| **Poppins autoalojada** | Licencia OFL, se sirve legalmente; cero peticiones externas; ya es el fallback del sistema | No es la tipografía de la marca. Geométrica como Acumin, pero no idéntica |
| Fuente de sistema | Máximo rendimiento | Rompe la identidad sin necesidad |

## Decisión

Poppins, autoalojada en `public/fonts/` como woff2 subsetado a latín y latín extendido, con `font-display: swap`.

Pesos: 300 para cuerpo y citas, 700 para titulares. Son los dos que usa el sistema.

No se carga desde Google Fonts: se sirve desde el propio dominio.

## Motivo

Es la única opción que respeta la licencia y el presupuesto de rendimiento a la vez. El sistema de diseño ya la había elegido como sustituto, así que la decisión visual estaba tomada; esta la formaliza.

Autoalojarla en lugar de tomarla de Google Fonts elimina una petición externa y evita depender de un tercero para renderizar texto.

## Consecuencias

- El sitio no usa la tipografía exacta de las piezas de redes. Habrá una diferencia visible al comparar un post con el sitio.
- El OTF de Acumin queda fuera del control de versiones y no se despliega.
- Si Alina adquiere licencia web de Acumin, se reabre esta decisión y hay que reevaluar el presupuesto de rendimiento.
- Los subsets se generan en el build y se versionan; hay que anotar el origen del archivo.
