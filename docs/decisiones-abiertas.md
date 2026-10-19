# Decisiones abiertas

Todo lo que falta por definir, con una **decisión por defecto ya tomada** para que nadie se detenga. Cada una es reversible y dice quién puede cambiarla.

Si trabajas en el proyecto y encuentras un hueco que no está aquí, añádelo con su valor por defecto en lugar de dejarlo abierto.

## Huecos en el sitio ya publicado

El sitio está en producción y abierto a los buscadores (ADR 013). Estos tres huecos siguen visibles en el texto, marcados como "Pendiente", y se indexan así. Ninguno impide seguir construyendo; todos urgen.

| Qué | Dónde se ve | Quién decide |
|---|---|---|
| **Línea de apoyo en crisis** | `/alcance-del-servicio/`. Es el hueco urgente: es lo que le dice a alguien a dónde ir cuando el acompañamiento no alcanza | Alina |
| **Tarifa y promoción** | `/preguntas-frecuentes/` y `/terminos-y-condiciones/` | Alina |
| **Aviso de privacidad y términos** | Falta el responsable, el domicilio, el correo para derechos ARCO y el plazo de conservación. La LFPDPPP tiene elementos obligatorios | Revisión legal |

## Decididas por defecto, reversibles

### Ilustraciones de la figura de Alina

Van **solo en `/sobre-alina/`**, a través del componente `Figura.astro`. El arte está en `src/assets/ilustraciones/`, para que pase por el pipeline de imagen.

El motivo está en la Etapa 4: en el home convierten a la coach en protagonista, contra el primer criterio de la guía de contenido. Si Alina las quiere en más lugares, se reabre esa decisión, no se añade y ya.

### Colores del logo

Se usa `public/logo/alina-logo.svg` tal como viene del sistema de diseño: gris `#58585A`, lila `#B098B4`, crema `#F0DFA5`.

**Esos hexadecimales están inferidos**, no confirmados. Los SVG originales llegaron sin definiciones de relleno y el sistema de diseño los reconstruyó a partir de los PNG de la marca. Su propio readme lo advierte. Pendiente de confirmar con Alina; mientras tanto, se usan.

### Buzón de destino del formulario

`alinamtzherrera@gmail.com`, ya configurado en el `config.php` del servidor.

El remitente es `sitio@alinamartinez.mx`, que **todavía no existe como buzón**. El dominio ya trae MX a Hostinger, SPF y DMARC en `p=none`, pero enviar desde una dirección que no existe perjudica la entrega y deja los rebotes sin destino. Crear ese buzón en hPanel es el siguiente paso.

### Proveedor de envío de correo

`php/contacto.php` usa la función `mail()` de PHP, que Hostinger provee.

Es la opción sin dependencias y suele bastar para el volumen de este sitio. Si la entrega falla o los mensajes caen en spam, se cambia a SMTP autenticado del propio dominio y se documenta como ADR. El remitente debe ser una dirección del dominio, nunca la del visitante.

### Acceso al panel del CRM

**Construido**, con el ADR 011. Vive en `/panel/` y pide contraseña más código TOTP: la contraseña sola no abre nada.

La objeción que lo tenía aplazado era sobre la calidad de la autenticación, no sobre el panel, y se atendió: segundo factor obligatorio, bloqueo por intentos, registro de accesos revisable, error único que no distingue qué falló, y un TOTP propio verificado contra los seis vectores del RFC 6238.

Queda pendiente **activar el cron de retención**. Sin él, el aviso de privacidad declara un plazo de conservación que el sitio no cumple.

### Retención de datos del CRM

**24 meses** desde el último cambio de estado, con borrado automático. Se cuenta desde el último cambio y no desde la llegada: un contacto en proceso no se borra por viejo.

Está escrito en `php/cron/retencion.php` y **el cron corre a diario a las 10:00**. El aviso de privacidad debe declarar el plazo que quede. El registro de accesos al panel caduca aparte, a los 12 meses.

### Signal

Integrado y **desactivado**, según el ADR 006. El SDK no se ha añadido al sitio todavía porque el collector de Paragraph no está corriendo.

Cuando se añada: `PUBLIC_SIGNAL_ENDPOINT` vacío y **el destino de Meta CAPI no se habilita en este sitio**. El campo abierto del formulario nunca viaja como propiedad de un evento.

El `consent` ya no se fija a mano: desde el ADR 014 existe una decisión real del visitante, y Signal tiene que leer esa y no un valor escrito en el código.

### Qué etiquetas van dentro de Tag Manager

El ADR 014 instaló el contenedor y la capa de consentimiento, no la medición. Falta decidir qué se configura dentro —GA4, conversiones de Google Ads, alguna otra— y revisar que cada etiqueta respete el modo de consentimiento: una mal configurada en la interfaz de Tag Manager se salta todo lo que el sitio hace, y eso ya no se controla desde este repositorio.

Por defecto, mientras nadie lo decida: el contenedor `GTM-WC58FXFZ` cargado y sin etiquetas dentro, que no instala ninguna cookie. Con `PUBLIC_GTM_ID` sin valor el sitio no manda una sola petición a Google.

### Tipografía

Poppins autoalojada (ADR 007). Acumin no se puede servir sin licencia web.

Si Alina adquiere esa licencia, se reabre el ADR 007 y se revalúa el presupuesto de rendimiento, porque Adobe Fonts carga desde un tercero.

### Presupuesto de rendimiento en Hostinger

Los objetivos de la Etapa 3 se mantienen como están —sin JavaScript en la ruta crítica, menos de 100 KB de CSS y JS, cero peticiones a terceros— **salvo el LCP**, que se fijó en 2.0 s contando con una red de borde.

En hosting compartido se mide primero y se ajusta el objetivo o el plan de hosting. No se toca el sitio para alcanzarlo: hoy son 12.8 KB de CSS y 1.3 KB de JavaScript en una sola página.

Lo de "cero peticiones a terceros" vale mientras `PUBLIC_GTM_ID` esté vacío, y después solo para quien rechace las cookies (ADR 014).

### Temas de fase 2

`/temas/limites-y-relaciones/` y `/temas/decisiones-y-cambios/` **están construidas** y publicadas. Se abrieron por cobertura de alcance y no por tracción, con el ADR 009: eran las dos áreas de la guía que quedaban sin destino, y el disparador de Search Console no se puede evaluar en un sitio que todavía no se indexa.

`/temas/regulacion-emocional/` **sigue sin construirse**. Su campo semántico se solapa con `sobrepensar-y-rumiacion`, y dos páginas que compiten por el mismo término se restan entre sí. Antes de abrirla hay que decidir cuál de las dos se queda con ese campo.

La condición de calidad no cambia: no se abre una página que no se pueda escribir con mecanismo propio y situaciones concretas. Tres páginas serias siguen superando a seis delgadas.

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
