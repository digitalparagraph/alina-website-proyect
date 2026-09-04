# ADR 006 — Signal integrado, desactivado al lanzar y sin destino publicitario

**Fecha:** 2026-09-03
**Estado:** aceptada
**Etapa:** 3

## Contexto

Paragraph desarrolló Signal, su sistema de medición server-side, y quiere usar este proyecto como caso de prueba. La revisión técnica está en `revision-tracker-paragraph.md`.

Tres hechos de esa revisión gobiernan esta decisión:

1. Signal escribe cuatro cookies de primera parte. Con Signal activo hace falta consentimiento.
2. El SDK no autocaptura formularios. El riesgo mayor para este sitio no existe.
3. El collector no está corriendo. Hoy ningún sitio puede enviar, pero el contrato es estable y con la variable del endpoint vacía el SDK no se inicializa.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| No integrar Signal | Cero superficie | Desperdicia el caso de prueba y obliga a reabrir el sitio después |
| Integrar y activar completo con Meta CAPI | Prueba el producto entero, incluido su punto más fuerte | Comunica a Meta que una persona contactó un servicio de salud mental; banner obligatorio antes de tener pauta |
| **Integrar, dejar desactivado, sin destino publicitario** | La integración queda escrita y no cambia; el sitio lanza sin cookies ni banner; se prueba todo menos el destino que carga riesgo | Se deja sin probar el match de Meta, que es lo que Signal hace mejor |

## Decisión

**Se integra el SDK ahora**, como parte del desarrollo normal: `init`, `identify` en el envío del formulario, `track` con `form_submit`, y `consent` conectado a la capa de consentimiento cuando exista.

**Se lanza desactivado.** El endpoint va en variable de entorno, vacía en local, en preview y en producción hasta que el collector exista. Sin endpoint no se inicializa, no escribe cookies y el sitio lanza sin banner, tal como decidió el ADR 004.

**El destino de Meta CAPI no se habilita para este tenant.** El consentimiento se fija en `{ analytics: true, advertising: false }`.

**IP y user-agent se quedan apagados.** Son el default de Signal y aquí no se cambia.

**El campo abierto del formulario nunca se pasa como propiedad de un evento.** Las propiedades de `form_submit` se limitan a identificar de qué formulario y de qué página vino.

## Motivo

Lo de Meta es lo que decide esta decisión. Enviar un evento `Lead` desde este sitio comunica a Meta que una persona determinada —hasheada, pero identificable para ellos si ya la conocen— contactó un servicio de coaching terapéutico. Eso permite inferir una condición de salud mental, que es categoría sensible. Las condiciones de las herramientas de negocio de Meta restringen el envío de datos que revelen información de salud, y bajo LFPDPPP y GDPR ese tipo de dato exige consentimiento expreso, no la casilla genérica de un banner.

El costo es real y hay que decirlo claro: se deja sin probar justo lo que Signal hace mejor. Ese conector conviene estrenarlo en un cliente donde un evento de conversión no revele nada sobre la salud de nadie. Aquí se prueba todo lo demás, que es la mayor parte: SDK, contrato, sesión, identidad, atribución de primer y último toque, y el enlace con el CRM.

*Esto no es asesoría legal. Antes de habilitar cualquier destino publicitario en este sitio conviene revisión legal.*

## Consecuencias

- El sitio lanza sin cookies, sin banner y sin enviar nada. La integración está escrita y probada contra el contrato.
- Cuando el collector esté en pie: se llena la variable del endpoint, se añade la capa de consentimiento, y las cuatro cookies `_pgh_*` se declaran en el aviso de privacidad. Se reabre este ADR entonces.
- **Depende del dominio.** El endpoint tiene que ser `tracking.<dominio>` apuntado por CNAME, con su certificado. Sin dominio no hay endpoint.
- Hace falta pedir a Paragraph el slug de `tenant` y registrar los orígenes de producción y de preview en la allowlist.
- El `dist/` del SDK se copia al proyecto mientras no esté en npm, y se versiona anotando el commit del que salió.
- Habilitar Meta CAPI en este sitio requiere reabrir este ADR y revisión legal previa.
