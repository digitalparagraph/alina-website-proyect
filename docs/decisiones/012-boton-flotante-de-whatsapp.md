# ADR 012 — WhatsApp como segundo canal, con el color del sitio y sin script

**Fecha:** 2026-10-16
**Estado:** aceptada
**Etapa:** 5
**Decide:** Damian, a petición de la clienta

## Contexto

Hasta ahora el sitio tenía un solo camino de contacto: el formulario de `/agendar/`, que escribe en la base y alimenta el panel del CRM (ADR 005 y 011). Alina pidió un botón flotante de WhatsApp al número 55 4460 0868.

En México WhatsApp es el canal por defecto para un primer contacto, y pedirle a alguien que llene un formulario cuando lo que quiere es preguntar algo suelto pierde contactos reales.

## Alternativas evaluadas

| Punto | Opción | Resolución |
|---|---|---|
| Implementación | Widget embebido de un tercero | Descartada: mete JavaScript y una conexión a un dominio ajeno. El presupuesto de la Etapa 3 es cero scripts en el navegador |
| | **Enlace `wa.me` con posición fija** | Elegida: HTML y CSS, cero kilobytes de script |
| Color | Verde oficial de WhatsApp | Descartada: ninguna de las cuatro parejas de color del sistema lo contiene y sobre el campo butter se lee como un pegote publicitario |
| | **Negro del pie con glifo blanco** | Elegida: el glifo identifica el canal sin introducir un color ajeno. El negro ya es el cierre del sistema |
| Texto previo | Sin texto | Descartada: obliga a redactar desde cero en el momento de menor disposición |
| | Texto que describe un problema | Descartada: pone en boca del visitante un motivo que no ha dicho, contra la guía de contenido |
| | **"Hola, me gustaría saber más sobre el proceso."** | Elegida: abre la conversación y el protagonista sigue siendo el proceso |

## Decisión

Enlace flotante a `wa.me/525544600868` en todas las páginas, con el texto previo neutro, en negro sobre blanco, de 52 px de lado, sin JavaScript.

## Consecuencias

- **Un contacto por WhatsApp no llega al CRM.** El panel del ADR 011 solo ve lo que entra por el formulario. El seguimiento por estados de quien escriba por WhatsApp queda fuera del sistema, en el teléfono de Alina.
- **El aviso de privacidad ya no puede decir que el formulario es el único canal.** Se corrigió, y se declara que la conversación ocurre dentro de WhatsApp y se rige por sus condiciones. **Esto entra en la revisión legal pendiente**, no la sustituye.
- **El número es personal.** Queda publicado en el HTML de las dieciséis páginas y es rastreable. Si Alina quiere separar el número del sitio del suyo, hay que cambiarlo antes del lanzamiento: vive en una sola constante en `src/components/BotonWhatsApp.astro`.
- **Compite con `/agendar/`.** Es el precio de tener dos caminos; a cambio recoge a quien no iba a llenar el formulario.
