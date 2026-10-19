# ADR 014 — Tag Manager con modo de consentimiento básico

**Fecha:** 2026-10-19
**Estado:** aceptada
**Etapa:** 5
**Decide:** Damian
**Reabre:** el ADR 004, que dejó escrito que *"cualquier dependencia futura que instale identificadores obliga a reabrir este ADR"*

## Contexto

El ADR 004 decidió lanzar sin identificadores y sin banner, y dejó dicho cómo se añadiría la medición cuando hiciera falta: *"se añade medición server-side con su capa de consentimiento, diseñada como parte del sitio y no como parche"*. Este es ese momento.

Lo que cambia respecto de aquel escenario es que la pieza que entra es Google Tag Manager, no el tracker propio de Paragraph que `revision-tracker-paragraph.md` dejaba como candidato. Tag Manager no mide por sí mismo: es el contenedor desde el que se configuran las etiquetas. La decisión de qué etiquetas van dentro no la cierra este ADR.

## Alternativas evaluadas

| Punto | Opción | Resolución |
|---|---|---|
| Implementación del consentimiento | **Básica** | Elegida. Tag Manager no se descarga hasta que alguien acepta. Quien rechaza no genera una sola petición a Google |
| | Avanzada | Descartada. Carga siempre y manda pings sin cookies aun sin aceptación. Da mejor dato modelado y es lo que Google recomienda, pero contradice lo que el ADR 004 protegía |
| Plataforma de consentimiento | Una CMP de terceros | Descartada: otro script externo, otra dependencia y otro conjunto de cookies para resolver un problema de cookies |
| | **Propia, en el sitio** | Elegida. Son dos componentes y ningún tercero |
| Dónde vive el contenedor | Fijo en el código | Descartada: encenderlo o apagarlo sería un cambio de código |
| | **Variable `PUBLIC_GTM_ID`** | Elegida. Vacía es el estado por defecto y entonces no se emite ni una línea |

## Decisión

El contenedor es **`GTM-WC58FXFZ`**, y vive en `PUBLIC_GTM_ID`. No es un secreto —viaja en el HTML de cada página— y queda escrito aquí para que quien despliegue no tenga que pedirlo.

Tag Manager cargado desde el propio sitio, con modo de consentimiento de Google **en implementación básica** y una banda de consentimiento propia.

### Cómo funciona

1. En el `<head>`, antes de cualquier etiqueta, se declaran los valores por defecto: `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` y `personalization_storage` **denegados**; `functionality_storage` y `security_storage` concedidos, que son los que sostienen el funcionamiento y no siguen a nadie.
2. **Tag Manager no se descarga.** No hay petición a Google.
3. La banda ofrece aceptar, rechazar o elegir por categoría: medición y publicidad.
4. Al decidir se manda `consent update` y, solo si alguna categoría quedó concedida, se carga Tag Manager.
5. La decisión se guarda en `localStorage` con número de versión. Si cambian las categorías ofrecidas, se vuelve a preguntar en lugar de dar por vigente una decisión tomada sobre otras.

### Qué se hizo explícito en la interfaz

- **Aceptar y rechazar pesan lo mismo**, mismo estilo y mismo tamaño. Un rechazo escondido detrás de dos clics no es consentimiento libre.
- **La banda no atrapa.** No es modal, no bloquea el fondo y no roba el foco. El ADR 004 advertía que un banner es lo primero que ve alguien que llegó buscando ayuda con un problema personal.
- **Se puede cambiar de opinión** desde el botón "Cookies" del pie, en cualquier página.
- Los tres controles miden 44 px de alto, el mínimo táctil de WCAG.

### Sin `<noscript>`

El iframe de respaldo de Tag Manager dispara sin consultar el consentimiento. En una implementación básica sería la puerta de atrás que invalida todo lo demás, así que no se emite.

## Motivo

La implementación avanzada da mejor dato y es la que Google recomienda. Se eligió la básica porque el valor que protege el ADR 004 —que nadie que llegue a este sitio buscando ayuda con un problema personal sea medido sin haberlo aceptado— pesa más que el dato modelado, y porque hoy no hay campañas cuya atribución justifique el intercambio.

La variable de entorno es lo que hace que esta decisión no sea de una sola dirección: con `PUBLIC_GTM_ID` vacío el sitio es exactamente el de antes.

## Consecuencias

- **El sitio deja de tener cero peticiones a terceros**, uno de los presupuestos de la Etapa 3, pero solo para quien acepta. Quien rechaza conserva el sitio original.
- **Se miden menos visitas de las que ocurren.** Es el costo directo de la implementación básica y se acepta a sabiendas.
- **El aviso de privacidad cambió.** Decía que el sitio no instala cookies de publicidad ni de análisis, y eso dejó de ser cierto. Ahora tiene una sección de cookies que describe las dos categorías. **Sigue pendiente de revisión legal**, como el resto del documento.
- **El envío del formulario empuja `contacto_enviado` al dataLayer.** Se manda por fetch sin cambiar de página, así que Tag Manager no puede verlo por su cuenta. El evento no lleva ningún dato de quien escribió.
- **Lo que se configure dentro del contenedor tiene que respetar el modo de consentimiento.** Una etiqueta mal configurada en la interfaz de Tag Manager se salta todo lo anterior, y eso ya no se controla desde este repositorio.
- **Falta decidir qué etiquetas van dentro.** Este ADR instala el contenedor, no la medición.
- Pasar a implementación avanzada es sacar la llamada a `cargarGTM()` del condicional. Exige reabrir este ADR.
