# ADR 013 — El sitio se abre a los buscadores con los huecos de contenido visibles

**Fecha:** 2026-10-16
**Estado:** aceptada
**Etapa:** 5
**Decide:** Damian
**Cierra:** la condición que `decisiones-abiertas.md` ponía para apagar el `noindex`

## Contexto

Desde el primer despliegue el sitio se sirvió con `PUBLIC_STAGING=true`: `noindex` en cada página, `X-Robots-Tag` sobre toda la carpeta, `robots.txt` cerrado, `llms.txt` vacío y una banda de revisión encima del contenido.

La condición para apagarlo eran tres cosas que siguen sin resolverse: la tarifa, la línea de apoyo en crisis y la revisión legal. Ocho marcas de "Pendiente" siguen visibles en cuatro páginas:

| Página | Qué falta |
|---|---|
| `/aviso-de-privacidad/` | Responsable, domicilio, correo para derechos ARCO, plazo de conservación |
| `/terminos-y-condiciones/` | Tarifa, formas de pago, política de cancelación, excepciones legales |
| `/preguntas-frecuentes/` | Tarifa vigente |
| `/alcance-del-servicio/` | Datos de la línea de apoyo en crisis |

Además, `/aviso-de-privacidad/` y `/terminos-y-condiciones/` llevaban un `noindex` propio, puesto por ser borradores pendientes de revisión legal, independiente del de staging.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Esperar a llenar los huecos | Google ve el sitio terminado desde la primera vez | El sitio sigue invisible y la antigüedad del dominio no empieza a contar |
| Abrir solo las 14 páginas completas | Entra a Google lo que está terminado; las legales no aportan tráfico de búsqueda | `/alcance-del-servicio/` sí pesa para E-E-A-T y quedaría fuera |
| **Abrir las 18** | El sitio entra completo y la indexación arranca hoy | Google indexa un sitio YMYL cuyo aviso de privacidad no nombra al responsable y cuyos términos no tienen precio ni política de cancelación |

## Decisión

`PUBLIC_STAGING=false`, y se quita el `noindex` propio de las dos páginas legales. Las dieciocho quedan indexables salvo el 404, que nunca lo es.

El rastreo tarda días en llegar, así que llenar los huecos en esa ventana evita que lo incompleto alcance a quedar en caché.

## Motivo

La indexación no es instantánea ni definitiva: una página corregida se vuelve a rastrear. La antigüedad del dominio, en cambio, solo empieza a contar una vez. Entre esperar a que el contenido esté perfecto y empezar a acumular historial, se eligió lo segundo, asumiendo el costo.

## Consecuencias

- **Lo que se publica con huecos es contenido YMYL.** Google aplica un estándar más alto justo a este tipo de sitio, y un aviso de privacidad sin responsable identificado es de lo que ese estándar mira. Es el precio aceptado, no un efecto secundario.
- **La línea de apoyo en crisis es el hueco urgente.** Las demás son de negocio o de forma; esa es la que le dice a alguien a dónde ir cuando el acompañamiento no alcanza.
- **El aviso de privacidad sigue sin revisión legal.** La LFPDPPP tiene elementos obligatorios y el documento los marca como pendientes. Publicarlo indexado no los sustituye.
- **`robots.txt` y `llms.txt` quedan activos** y el sitemap se puede enviar a Search Console.
- **Volver atrás es una línea.** `PUBLIC_STAGING=true` cierra el sitio otra vez, pero no borra lo ya indexado.
