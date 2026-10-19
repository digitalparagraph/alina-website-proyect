# ADR 015 — GA4 se carga directo, en modo avanzado, al margen de Tag Manager

**Fecha:** 2026-10-19
**Estado:** aceptada
**Etapa:** 5
**Decide:** Damian
**Convive con:** el ADR 014, que deja Tag Manager en modo básico

## Contexto

El ADR 014 instaló `GTM-WC58FXFZ` con el consentimiento por delante. El contenedor sí trae una etiqueta de GA4 para `G-4WGKK3R9SG`, pero **no dispara**: sus reglas cuelgan todas del evento `gtm.init`, que no se genera. Se descartó que fuera cosa del consentimiento —se probó aceptando todo, repitiendo el `consent update` con el contenedor ya cargado y empujando `gtm.init` a mano— y también de la forma de insertar el script. Sin acceso a la configuración del contenedor no se puede ir más lejos.

Mientras eso se resuelve, el sitio no mide nada.

## Decisión

GA4 se carga directamente con `gtag.js`, sin pasar por Tag Manager y **sin esperar a la banda de consentimiento**.

Eso no significa medir sin permiso. El script del modo de consentimiento sigue declarando sus valores por defecto antes, en el `<head>`, y gtag.js los respeta:

| Estado | Qué hace GA4 | Cookies |
|---|---|---|
| Antes de decidir | Mide, señal `gcs=G100` | Ninguna |
| Tras rechazar | Sigue midiendo, señal `gcs=G100` | Ninguna |
| Tras aceptar medición | Medición completa | `_ga`, `_ga_4WGKK3R9SG` |

Cargar siempre y guardar solo con permiso es el **modo avanzado** de Google. Tag Manager se queda en el básico, que es lo que decidió el ADR 014. Son dos piezas con dos tratos distintos, a propósito, y el aviso de privacidad lo explica.

### El orden en el `<head>` es parte de la decisión

`GoogleTag.astro` va **después** de `ConsentimientoModo.astro`. Invertirlo convierte esto en medición sin consentimiento, porque gtag.js solo respeta unos valores por defecto que ya estén puestos cuando arranca. No es una preferencia de orden: es lo que hace que la tabla de arriba sea cierta.

### Qué se verificó en producción

Contra `alinamartinez.mx`, no en local: sin decidir, `gtag/js` y `/g/collect` salen y `document.cookie` está vacío; tras rechazar, igual; tras aceptar, aparecen `_ga` y `_ga_4WGKK3R9SG`.

## Motivo

La alternativa era esperar a destrabar el contenedor sin medir nada mientras tanto. El modo avanzado da el dato desde ya y sigue respetando la decisión del visitante en lo que de verdad importa: lo que se guarda en su equipo.

## Consecuencias

- **Si la etiqueta de GA4 del contenedor llega a dispararse, habrá medición duplicada.** Cada visita contaría dos veces en la misma propiedad. Al destrabar el contenedor hay que quitar una de las dos, y lo que sobra es la de dentro de Tag Manager.
- **Alguien que rechaza sigue siendo contado**, sin identificadores y sin poder reconocerlo entre visitas. Es la diferencia entre el modo avanzado y el básico, y está dicha en el aviso de privacidad.
- **La recolección automática de datos del usuario hay que revisarla en la propiedad de GA4.** El contenedor de Tag Manager la trae activada, con correo, teléfono y dirección y sin selectores de exclusión. En gtag.js directo esa opción vive en la interfaz de GA4, no en el código del sitio. Si queda encendida, GA4 leería el correo que alguien escribe en `/agendar/` y lo mandaría a Google, contra el ADR 003 y contra lo que el propio aviso de privacidad promete.
- **La banda ya no depende solo de Tag Manager.** Aparece en cuanto haya `PUBLIC_GTM_ID` o `PUBLIC_GA4_ID`: sin ella no habría forma de aceptar ni rechazar la medición.
- Vaciar `PUBLIC_GA4_ID` apaga esto por completo.
