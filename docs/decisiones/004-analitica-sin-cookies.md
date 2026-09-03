# ADR 004 — Analítica sin cookies y sin banner

**Fecha:** 2026-09-03
**Estado:** aceptada
**Etapa:** 3

## Contexto

El sitio necesita medición para cerrar la Etapa 10. La opción por default de la industria es Google Analytics 4, que instala cookies y obliga a pedir consentimiento.

Un banner de consentimiento tiene tres costos concretos aquí: degrada las métricas de rendimiento que la Etapa 9 va a exigir, es lo primero que ve alguien que llegó buscando ayuda con un problema personal, y contradice la dirección visual sobria que establece la guía de contenido.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Google Analytics 4 | Estándar, gratuito, integrable con el resto del stack de Paragraph | Cookies, banner obligatorio, y un volumen de datos personales que este sitio no necesita recolectar |
| **Analítica sin cookies** | Sin banner; suficiente para lo que este sitio mide; menos datos personales en custodia | Sin cohortes ni atribución multisesión |
| Solo Search Console | Cero recolección | Insuficiente: no mide conversión ni comportamiento en el sitio |

## Decisión

Analítica sin cookies, con Search Console como fuente de datos de búsqueda. La herramienta concreta se fija en la implementación; el requisito es que no use cookies ni identificadores persistentes.

Sin banner de cookies, porque no hay cookies que consentir.

## Motivo

Lo que este sitio necesita medir es corto: qué páginas de tema traen tráfico, cuántos visitantes llegan al formulario y cuántos lo envían. Eso no requiere identificar a nadie entre sesiones.

Renunciar a la atribución multisesión sí tiene un costo real: el perfil de cliente investiga bastante antes de contactar, así que habrá conversiones cuyo origen no vamos a poder reconstruir con precisión. Se acepta a cambio de no poner un banner delante de alguien que llegó buscando ayuda.

## Consecuencias

- No habrá atribución exacta del primer punto de contacto. Search Console cubre la parte de búsqueda.
- Si Paragraph necesita después integrar el sitio con HubSpot para atribución de campañas, hay que reabrir esta decisión y añadir el consentimiento correspondiente.
- Toda dependencia futura que instale cookies obliga a revisar este ADR. No se añade ninguna sin hacerlo.
- El objetivo de conversión se mide como evento de envío de formulario y clic al enlace de WhatsApp.
