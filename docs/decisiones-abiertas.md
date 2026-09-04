# Decisiones abiertas

Todo lo que falta por definir, con una **decisión por defecto ya tomada** para que nadie se detenga. Cada una es reversible y dice quién puede cambiarla.

Si trabajas en el proyecto y encuentras un hueco que no está aquí, añádelo con su valor por defecto en lugar de dejarlo abierto.

## Bloquean la publicación

Estas cuatro impiden que el sitio salga a producción. Ninguna impide seguir construyendo.

| Qué | Por defecto | Quién decide |
|---|---|---|
| **Dominio** | Sin dominio; el sitio corre en la URL temporal de Hostinger con `PUBLIC_STAGING=true` | Damian con Alina |
| **Tarifa y promoción** | Los bloques de precio en `/preguntas-frecuentes/` y `/terminos-y-condiciones/` quedan marcados como pendientes, visibles | Alina |
| **Línea de apoyo en crisis** | El hueco está marcado en `/alcance-del-servicio/`. **No se publica el sitio sin esto** | Alina |
| **Aviso de privacidad y términos** | Ambos con `noindex` y aviso visible de borrador | Revisión legal |

## Decididas por defecto, reversibles

### Ilustraciones de la figura de Alina

Van **solo en `/sobre-alina/`**, y por ahora no se usan. Están en `public/img/alina-figure-*.png`.

El motivo está en la Etapa 4: en el home convierten a la coach en protagonista, contra el primer criterio de la guía de contenido. Si Alina las quiere en más lugares, se reabre esa decisión, no se añade y ya.

### Colores del logo

Se usa `public/logo/alina-logo.svg` tal como viene del sistema de diseño: gris `#58585A`, lila `#B098B4`, crema `#F0DFA5`.

**Esos hexadecimales están inferidos**, no confirmados. Los SVG originales llegaron sin definiciones de relleno y el sistema de diseño los reconstruyó a partir de los PNG de la marca. Su propio readme lo advierte. Pendiente de confirmar con Alina; mientras tanto, se usan.

### Proveedor de envío de correo

`php/contacto.php` usa la función `mail()` de PHP, que Hostinger provee.

Es la opción sin dependencias y suele bastar para el volumen de este sitio. Si la entrega falla o los mensajes caen en spam, se cambia a SMTP autenticado del propio dominio y se documenta como ADR. El remitente debe ser una dirección del dominio, nunca la del visitante.

### Acceso al panel del CRM

**No se construye por ahora.** El formulario funciona con correo y la tabla `contactos` registra el seguimiento; Alina consulta sus mensajes en su buzón.

Cloudflare Access resolvía la autenticación sin escribir código y en Hostinger hay que construirla. Un panel con autenticación hecha a la carrera sobre datos de contacto de salud mental es peor que no tener panel.

### Retención de datos del CRM

**24 meses** desde el último cambio de estado, con borrado automático. Es el valor por defecto hasta que la revisión legal diga otro. El aviso de privacidad debe declarar el plazo que quede.

### Signal

Integrado y **desactivado**, según el ADR 006. El SDK no se ha añadido al sitio todavía porque el collector de Paragraph no está corriendo.

Cuando se añada: `PUBLIC_SIGNAL_ENDPOINT` vacío, `consent` fijo en `{analytics: true, advertising: false}`, y **el destino de Meta CAPI no se habilita en este sitio**. El campo abierto del formulario nunca viaja como propiedad de un evento.

### Tipografía

Poppins autoalojada (ADR 007). Acumin no se puede servir sin licencia web.

Si Alina adquiere esa licencia, se reabre el ADR 007 y se revalúa el presupuesto de rendimiento, porque Adobe Fonts carga desde un tercero.

### Presupuesto de rendimiento en Hostinger

Los objetivos de la Etapa 3 se mantienen como están —sin JavaScript en la ruta crítica, menos de 100 KB de CSS y JS, cero peticiones a terceros— **salvo el LCP**, que se fijó en 2.0 s contando con una red de borde.

En hosting compartido se mide primero y se ajusta el objetivo o el plan de hosting. No se toca el sitio para alcanzarlo: hoy son 8 KB de CSS y cero JavaScript.

### Temas de fase 2

`/temas/limites-y-relaciones/`, `/temas/decisiones-y-cambios/` y `/temas/regulacion-emocional/` **no se construyen todavía** y no aparecen en el índice de temas.

Se abren cuando los tres de fase 1 tengan tracción medible en Search Console. Tres páginas con contenido serio superan a seis delgadas.

### `/articulos/`

Reservado, sin construir. Se abre con datos, no por calendario.

## Lo que no se reabre sin leer el argumento

No son decisiones abiertas. Están cerradas y razonadas, y reproponerlas cuesta tiempo a todos.

- El sitio no se posiciona sobre "coaching terapéutico": 20 búsquedas al mes.
- No se persigue "terapeuta cognitivo conductual" pese a sus 22,200 búsquedas. Ver ADR 001.
- Tampoco "pensamientos intrusivos" (22,200) ni "poner límites" (720). Ver Etapa 1, sección 3.
- Alina se presenta como coach certificada con formación en TCC. Nunca como terapeuta, psicóloga o psicoterapeuta.
- `/terapia-o-coaching/` no lleva llamada a la acción en el cuerpo.
- El campo abierto del formulario no se persiste en ninguna base.
- La voz del sistema de diseño no aplica al sitio; manda la guía de contenido.
