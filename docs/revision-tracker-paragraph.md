# Revisión pendiente — tracker server-side de Paragraph

Paragraph desarrolló un sistema de medición server-side y este sitio es candidato a servir como caso de prueba.

**Estado: no comprometido en la arquitectura.** La Etapa 3 queda decidida sin él (ADR 004). Si la revisión sale bien, se añade con un ADR propio; si no, el sitio no depende de nada.

## Por qué este sitio sirve y por qué no

**A favor:** pequeño, estático, tráfico bajo, sin ingresos dependiendo de la medición. Un error sale barato y se detecta rápido.

**En contra:** es un sitio de salud mental adyacente donde las personas describen por qué buscan ayuda. Un error de configuración que en un e-commerce es una molestia, aquí expone información que nadie quiere ver filtrada.

La conclusión depende enteramente de las respuestas de abajo. Si el tracker recolecta eventos sin identificador y no reenvía a plataformas externas, este sitio es un buen banco de pruebas. Si está en fase de depuración y reenvía datos personales a plataformas de anuncios, hay que estrenarlo en otro proyecto y traerlo aquí cuando esté rodado.

## Lo que necesito revisar

### Identificadores

- [ ] ¿Escribe cookies, `localStorage`, `sessionStorage` o IndexedDB en el navegador? ¿Cuáles y con qué duración?
- [ ] ¿Genera algún identificador que persista entre sesiones o entre páginas?
- [ ] ¿Usa fingerprinting, aunque sea parcial: user agent, resolución, fuentes, canvas?
- [ ] ¿Qué hace con la dirección IP? ¿La guarda, la trunca, la descarta?

Esta sección decide si hace falta banner de consentimiento. Nada más lo decide.

### Datos que recolecta

- [ ] Lista completa de campos por evento.
- [ ] ¿Captura contenido de formularios, aunque sea por accidente? Autocaptura de inputs, grabación de sesión, mapas de calor.
- [ ] ¿Captura parámetros de URL completos, incluidos los que no son UTM?
- [ ] ¿Captura texto de la página o solo metadatos?

El segundo punto es el crítico. Un tracker con autocaptura de formularios en este sitio recolectaría exactamente lo que el ADR 003 y el 005 se propusieron proteger.

### Destinos

- [ ] ¿A dónde van los eventos? ¿Solo a infraestructura de Paragraph, o se reenvían a Google, Meta u otros?
- [ ] Si reenvía: ¿es configurable por sitio, y se puede desactivar del todo?
- [ ] ¿Qué campos exactamente salen en cada reenvío?

### Operación

- [ ] Peso del script en el cliente y si bloquea el renderizado. El presupuesto de la Etapa 3 es cero peticiones a terceros en la carga inicial.
- [ ] Política de retención de los eventos.
- [ ] Quién tiene acceso a los datos recolectados.
- [ ] ¿Hay documentación o repositorio que pueda leer?

## Qué entregar

Cualquiera de estas tres cosas alcanza para empezar:

1. Acceso al repositorio del tracker.
2. Documentación técnica, aunque esté incompleta.
3. El endpoint más un ejemplo de payload real, y reviso el comportamiento del cliente por mi cuenta.

Con eso digo si entra al lanzamiento, si entra desactivado, o si conviene estrenarlo en otro proyecto.
