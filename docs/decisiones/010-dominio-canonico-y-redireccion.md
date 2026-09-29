# ADR 010 — `alinamartinez.mx` es el dominio canónico y el resto redirige

**Fecha:** 2026-09-29
**Estado:** aceptada
**Etapa:** 3, completada
**Decide:** Damian con Alina

## Contexto

La Etapa 3 dejó el dominio como decisión pendiente y bloqueante del despliegue. Los criterios que fijó: nombre de Alina, `.com` o `.mx`, sin guiones, sin la palabra coaching como relleno, pronunciable por teléfono.

Se registraron dos en Akky:

- `alinamartinez.mx`
- `alinamartinez.com.mx`

El hosting es Hostinger (ADR 008), en la misma cuenta donde ya vive `paragraph.mx`.

Dos dominios que sirven el mismo sitio son contenido duplicado. Para un buscador son dos sitios con el mismo texto compitiendo entre sí, y la autoridad que gane uno no la hereda el otro.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Servir el sitio en los dos dominios | Quien escriba cualquiera de los dos llega | Contenido duplicado. Parte la autoridad y obliga a elegir canonical en cada página |
| Usar `.com.mx` como principal | Es la extensión mexicana más conocida por el público general | Más larga de dictar por teléfono, y `.mx` ya es reconocible |
| **`.mx` canónico, `.com.mx` redirige con 301** | Un solo sitio para el buscador. Protege la marca en las dos extensiones | El tráfico directo al `.com.mx` pasa por un salto |

## Decisión

**`https://alinamartinez.mx` es el dominio canónico.** Es donde vive el sitio y lo que declaran el canonical, el sitemap y los `@id` del JSON-LD.

**`alinamartinez.com.mx` redirige con 301 a `alinamartinez.mx`**, conservando la ruta. No sirve contenido propio.

**`www` redirige al dominio sin www**, en las dos extensiones.

La redirección vive en el `.htaccess` y la inyecta `npm run preparar` a partir de `PUBLIC_SITE_URL`, igual que ya hace con el `ErrorDocument` y la cabecera de no indexado. No se escribe a mano en ningún archivo versionado: el despliegue de revisión en `dev.paragraph.mx/alina` no debe llevarla.

## Motivo

El `.com.mx` se registra para que nadie más lo tenga y para que quien lo escriba por error llegue al sitio. Esa función la cumple redirigiendo, sin el costo de partir la autoridad entre dos dominios.

Entre las dos extensiones, `.mx` es más corta de dictar y hoy es igual de reconocible. El criterio de la Etapa 3 era que fuera pronunciable por teléfono.

El 301 es permanente a propósito: le dice al buscador que consolide en el destino, cosa que un 302 no hace.

## Consecuencias

- **Todo lo que apunte al sitio debe usar `alinamartinez.mx`.** Correos, firmas, redes, tarjetas. Un enlace al `.com.mx` funciona, pero desperdicia el salto.
- **Search Console necesita las dos propiedades.** La canónica para medir, la otra para confirmar que la redirección se lee bien.
- **El correo del formulario sale del dominio canónico.** `CORREO_REMITENTE` en `php/config.php` debe ser una dirección de `alinamartinez.mx`, o los envíos caen en spam.
- **El endpoint de Signal, cuando exista, será `tracking.alinamartinez.mx`** (ADR 006), con su CNAME y su certificado.
- **Apuntar el dominio no es lanzar.** El sitio sigue con `PUBLIC_STAGING=true` hasta que se cierren los bloqueos que lista `decisiones-abiertas.md`: tarifa, línea de apoyo en crisis y revisión legal de las dos páginas en borrador. Con la variable en `true`, el dominio real sirve el sitio con `noindex` y su banda de revisión, que es exactamente lo que hace falta para que Alina lo revise en su propia URL sin que se indexe antes de tiempo.
