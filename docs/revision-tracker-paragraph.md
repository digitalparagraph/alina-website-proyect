# Revisión del tracker de Paragraph (Signal)

Revisión hecha contra la guía técnica de Signal v0.1, que describe el repositorio `paragraph-signal` en el commit `2a7192e`. Decisión resultante en el ADR 006.

## Qué es Signal

Medición server-side propia de Paragraph. Su propósito declarado es responder lo que un píxel no puede: qué campaña trajo al cliente que firmó meses después. Para eso el sitio hace dos cosas —disparar eventos e identificar a la persona en cuanto conoce su correo— y Signal se encarga de leer del CRM cuándo eso se convirtió en dinero y devolverlo a la plataforma de origen.

Superficie del SDK: cuatro llamadas. `init`, `consent`, `identify`, `track`.

## Respuestas a la revisión

### Identificadores: sí, cuatro cookies de primera parte

| Cookie | Vida | Qué es |
|---|---|---|
| `_pgh_anon` | 365 días | Este navegador |
| `_pgh_ses` | 30 min de inactividad | Esta visita |
| `_pgh_ft` | 365 días | Primer toque, no se sobrescribe nunca |
| `_pgh_lt` | 365 días | Último toque |

Todas `SameSite=Lax` y `Secure`.

**Consecuencia: con Signal activo hace falta consentimiento y banner.** Es lo que ya anticipaba el ADR 004: el server-side no elimina la obligación. La propia guía de Signal lo dice sin rodeos: recibe el consentimiento, no lo decide, y las cuatro cookies deben declararse en el aviso de privacidad.

### Autocaptura de formularios: no

El riesgo que más me preocupaba no existe. El SDK no autocaptura inputs, no graba sesión y no hace mapas de calor. Solo envía lo que el desarrollador dispara explícitamente con `track`, y las propiedades las decide quien integra.

En este sitio eso importa mucho: el campo abierto donde alguien describe por qué busca ayuda no puede llegar a Signal por accidente. Solo llegaría si alguien lo pasara a mano como propiedad, y eso queda prohibido en la implementación.

### Datos personales del visitante

- **Correo:** se normaliza y se hashea con SHA-256 en el navegador. No sale en claro y Signal no almacena direcciones reales.
- **IP y user-agent:** apagados por omisión. La guía lo plantea como decisión del cliente, no técnica.

### Destinos: sí reenvía a plataformas de anuncios

Los conectores de **Meta CAPI** y **HubSpot** están marcados como estables. El consentimiento viaja con cada evento con las banderas `analytics` y `advertising`, y cada destino evalúa si puede usarlo.

Esta es la parte que obliga a una decisión de fondo para este sitio en particular. Ver ADR 006.

### Estado del producto: el collector no está corriendo

Lo que la propia guía marca como faltante:

- No hay proceso que escuche. Existe `crearCollector()` con sus pruebas, pero no hay `.listen()`, ni Dockerfile, ni servicio en el compose. **Ningún sitio puede enviar todavía.**
- El SDK no está publicado en npm. Hay que copiar el `dist/` al proyecto.
- Aprovisionar un tenant es trabajo manual en SQL.

Lo que sí está estable: el SDK de navegador, el contrato del evento validado con Zod, y la deduplicación por índice único `(tenant_id, event_id)`.

## Lo que esto habilita

El contrato es estable, así que **la integración que se escriba ahora no cambia.** Y con la variable de entorno del endpoint vacía, el SDK no se inicializa: no envía, no escribe cookies y no rompe nada.

Eso resuelve la tensión completa. Se integra ahora como parte del desarrollo normal, el sitio lanza sin cookies y sin banner tal como decidió el ADR 004, y el día que el collector esté en pie se activa sin volver a tocar código.

## Dependencia que hay que resolver pronto

El endpoint tiene que ser un subdominio del cliente —`tracking.dominio.mx`— apuntado al collector por CNAME, para que las cookies sean de primera parte. Eso pasa por DNS y por certificado.

**Sin dominio no hay endpoint.** Es un motivo más para cerrar la decisión de dominio.

## Notas sobre el producto

Dos detalles del diseño que vale reconocer, porque son los que suelen faltar:

- **Una visita sin parámetros de campaña y sin referrer externo no sobrescribe el último toque.** Sin esa regla, cualquier regreso por marcador borraría la campaña que trajo a la persona y todo terminaría en tráfico directo.
- **El collector responde 202 y no 200.** Recibido y encolado no es entregado, y confundir las dos cosas es justo lo que hace que nadie revise si el evento llegó de verdad.
