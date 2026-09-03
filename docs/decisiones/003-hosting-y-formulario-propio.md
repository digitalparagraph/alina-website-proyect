# ADR 003 — Hosting en Cloudflare Pages y formulario propio

**Fecha:** 2026-09-03
**Estado:** aceptada
**Etapa:** 3

## Contexto

La conversión definida para el sitio es **contacto previo**, no agendado: la persona escribe, Alina responde y acuerdan horario. No hay herramienta de agendado ni de cobro; hoy se resuelve manualmente.

Eso significa que el formulario del sitio va a recibir descripciones de problemas personales. Alguien va a escribir por qué está buscando ayuda. En un sitio de salud mental adyacente, ese texto es dato sensible.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Servicio de formularios de terceros (Formspree, Web3Forms y similares) | Cinco minutos de integración, cero backend | El contenido de cada mensaje queda almacenado en un panel de un tercero por tiempo indefinido, bajo su política y no la nuestra. Para este tipo de dato es inaceptable |
| Formulario del hosting (Netlify Forms y equivalentes) | Integrado, sin backend propio | Mismo problema: los envíos se almacenan en el panel del proveedor |
| **Función serverless propia que solo reenvía por correo** | El mensaje llega al correo de Alina y no se almacena en ningún panel intermedio; la retención queda bajo su control | Hay que escribirla y mantenerla, y depende de un proveedor de envío de correo |
| Solo WhatsApp, sin formulario | Cero superficie de datos | Excluye a quien no quiere dar su teléfono de entrada, y no permite escribir con calma |

## Decisión

Hosting en **Cloudflare Pages**, con salida estática y despliegue automático desde `main`.

El formulario se resuelve con una **Cloudflare Pages Function propia** que valida, aplica límite de tasa y **reenvía el mensaje por correo sin persistirlo**. Sin base de datos, sin panel de administración, sin servicio de formularios de terceros.

Además, **enlace directo de WhatsApp** para quien prefiera ese canal. Enlace, no widget: los widgets cargan scripts de terceros que pesan y filtran datos de navegación.

## Motivo

La decisión de conversión de la Etapa 3 convirtió el formulario en el punto donde entra la información más sensible del sitio. Un servicio de terceros lo resolvería en minutos y dejaría esos textos almacenados fuera de nuestro control, sin que nadie lo hubiera decidido explícitamente. La función propia cuesta unas horas y mantiene una sola copia, en el correo de Alina.

Cloudflare Pages porque sirve estáticos con buena latencia hacia México, y porque tener las funciones en la misma plataforma evita añadir un proveedor solo para el formulario.

## Consecuencias

- Hay código propio que mantener, aunque poco y estable.
- El envío de correo depende de un proveedor externo; se elige en la implementación y se documenta.
- No queda registro histórico de contactos en el sitio. Si más adelante se quiere CRM, se decide entonces y con consentimiento explícito en el formulario.
- El aviso de privacidad debe declarar exactamente esto: el mensaje se reenvía por correo y no se almacena en el sitio.
- Sin widgets de terceros ni cookies de terceros, el sitio no necesita banner de cookies. Ver ADR 004.
