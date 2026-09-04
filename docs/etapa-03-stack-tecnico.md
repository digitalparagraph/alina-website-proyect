# Etapa 3 — Stack técnico y configuraciones

Decisiones razonadas en los ADR 002, 003, 004, 005 y 006. Este documento reúne la configuración completa y lo que queda pendiente.

## 1. Resumen

| Área | Decisión |
|---|---|
| Generador | Astro, salida estática |
| Contenido | Markdown en el repositorio, Content Collections con validación por esquema |
| Estilos | CSS propio con custom properties. Tokens de la Etapa 4 |
| Interactividad | JavaScript propio y mínimo. Sin framework de componentes |
| Hosting | Hostinger. Build en CI y subida por FTP. Ver ADR 008 |
| Formulario | Script PHP propio. El texto abierto se reenvía por correo y no se persiste |
| CRM | MySQL con el dato partido: operativo en base, confidencias solo en el correo de Alina |
| Canal alterno | Enlace directo de WhatsApp. Enlace, no widget |
| Analítica | Sin identificadores ni banner al lanzar. Atribución por UTMs en el CRM |
| Medición server-side | Signal integrado y desactivado. Sin destino publicitario en este sitio |
| Tipografía | Autoalojada y subsetada. Sin CDN de terceros |
| Imágenes | Optimización nativa de Astro, AVIF y WebP con respaldo |
| Dominio | Pendiente. Ver sección 6 |

## 2. Estructura del proyecto

```
/src
  /content
    temas/                 Un .md por página de tema
    paginas/               Núcleo y legales
    config.ts              Esquema de validación de las colecciones
  /layouts                 Plantillas por tipo de página
  /components
    schema/                Componentes de JSON-LD
  /styles
    tokens.css             Sale de la Etapa 4
/php
  contacto.php             Endpoint del formulario
  config.example.php       Plantilla de credenciales; config.php no se versiona
/db
  schema.mysql.sql         Esquema de MySQL
  migraciones/
/public
  .htaccess                Rutas, cabeceras y caché del servidor
/scripts                   Verificadores que corre el CI
/docs                      Documentación del proyecto (ya existe)
```

El contenido no vive junto al código de presentación. La Etapa 6 se puede repartir entre varias personas trabajando solo en `/src/content`.

## 3. La estructura de contenido como esquema

La Etapa 2 fijó una plantilla de ocho bloques para las páginas de tema, con un bloque de delimitación de alcance obligatorio por el ADR 001. Esa regla se declara en el esquema de la colección.

Cada tema requiere, además de su cuerpo: keyword principal, keywords secundarias, la pregunta de búsqueda del bloque 2, el texto de delimitación de alcance, los dos temas hermanos y la fecha de revisión.

**Una página de tema sin delimitación de alcance rompe el build.** El requisito deja de depender de que alguien lo recuerde durante la redacción o la revisión.

Lo mismo aplica a la fecha de revisión, que E-E-A-T exige y que es lo primero que se olvida.

## 4. Datos estructurados

Componentes de JSON-LD, uno por tipo, alimentados desde el frontmatter. Nada de schema escrito a mano por página.

`Person` es la entidad central: un sitio de práctica individual se ancla en la persona. Se define una vez y las demás entidades la referencian con `@id`.

`hasCredential` declara la certificación ICC como credencial principal, según el ADR 001. La formación en TCC se declara como credencial adicional, nunca como habilitación clínica.

Mapa completo de schema por página en `etapa-01-arquitectura.md`, sección 6.

## 5. Rendimiento y accesibilidad

Presupuestos que la Etapa 9 va a verificar. Se fijan aquí para que la implementación no los descubra al final:

- Sin JavaScript en la ruta crítica de renderizado.
- LCP por debajo de 2.0 s en 4G simulada; CLS por debajo de 0.1.
- Menos de 100 KB de CSS y JS sumados, comprimidos.
- Cero peticiones a terceros en la carga inicial. La tipografía es propia, la analítica se carga diferida.
- Excepción única: la protección antispam del formulario en `/agendar/`, cargada de forma diferida y solo en esa página.
- WCAG 2.2 nivel AA. Contraste verificado sobre la paleta de la Etapa 4, no después.
- HTML semántico con un solo `h1` por página y jerarquía de encabezados sin saltos.

## 6. Dominio

No existe todavía. Con la Etapa 0 quedó claro que un dominio de keyword no aporta nada: la categoría no tiene demanda de búsqueda. Va dominio de marca.

Criterios: nombre de Alina, `.com` o `.mx`, sin guiones, sin la palabra coaching como relleno, pronunciable por teléfono.

**Decisión pendiente de Damian.** Hay que verificar disponibilidad antes de proponer. Bloquea el despliegue, no la implementación: se desarrolla contra `localhost` y se despliega contra la URL que entregue Hostinger, ambas por `PUBLIC_SITE_URL`.

## 7. Integración continua

GitHub Actions en cada PR:

1. Build. Falla si el esquema de contenido no valida.
2. Verificación de enlaces internos.
3. Validación de los datos estructurados, con las reglas del proyecto y sin salir a la red.
4. Lighthouse contra los presupuestos de la sección 5. Necesita una URL desplegada, así que entra con la Etapa 8.

Los tres primeros corren con `npm run verificar`, que es lo mismo que ejecuta el CI. Un PR que no pasa no se aprueba: es la única forma de que los presupuestos signifiquen algo.

## 8. Corrección a la Etapa 1

La Etapa 1 definió `/agendar/` cuando se asumía que la conversión sería agendado directo. Con la conversión definida como contacto previo, esa URL prometería algo que la página no hace.

**Se mantiene la URL y la etiqueta "Agendar" en la navegación**, porque es más específica que "Contacto" y describe mejor la intención de quien hace clic. Lo que cambia es la primera línea de la página, que debe explicar el mecanismo real de inmediato: escribes, Alina responde, acuerdan horario.

La alternativa era renombrar a `/contacto/`. Se descartó porque debilita la llamada a la acción sin resolver nada que la primera línea no resuelva.

Actualizado en `etapa-01-arquitectura.md` y en el brief de `/agendar/` de la Etapa 2.

## 9. Lo que el formulario puede y no puede pedir

Consecuencia del ADR 003 y del contexto del sitio.

**Pide:** nombre o como quiera que se le llame, correo, y un campo abierto para describir qué busca trabajar. Nada más.

**No pide:** teléfono como campo obligatorio, edad, ni ningún dato de salud en campos estructurados. Nada de casillas de "¿tienes ansiedad?" ni listas de síntomas: convierten un mensaje en un expediente.

**Declara antes del botón de envío:** que el mensaje llega por correo a Alina, que no se almacena en el sitio, y que no es un canal de atención urgente. Lo último importa: alguien en crisis puede llegar aquí, y el sitio tiene que decir con claridad que este no es el lugar y orientar a dónde acudir.

Ese último punto se redacta en la Etapa 6 y se verifica en la Etapa 9.

## 10. El CRM

Definido en el ADR 005. Lo que la implementación tiene que respetar:

**Tabla de contactos.** Identificador, fecha de creación, nombre, correo, página de origen, referente, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, estado, fecha del último cambio de estado, y un campo de notas operativas breves.

**El campo abierto del formulario no se escribe en la base.** Viaja solo en la notificación por correo a Alina.

**Estados:** `nuevo`, `contactado`, `agendado`, `en_proceso`, `no_califica`, `derivado`.

`derivado` importa para la medición: un contacto derivado a atención especializada no es un fracaso de campaña, es el ADR 001 funcionando. Si se cuenta como pérdida, la optimización empuja en la dirección contraria a la que el posicionamiento del sitio quiere.

**Lo que el CRM permite calcular:** conversión cualificada por página de origen y por campaña. Un envío de formulario no cuenta como conversión hasta que Alina lo mueve a `agendado`. Esa es la diferencia entre medir formularios y medir clientes.

**Advertencia que va en la interfaz:** el panel no es un expediente clínico. El campo de notas es para seguimiento operativo, no para notas de sesión.

**Acceso:** autenticación propia, pendiente de decidir. El ADR 008 la dejó abierta al salir de Cloudflare Access, y no bloquea el lanzamiento: el formulario funciona solo con correo mientras el panel no exista. El acceso de Paragraph al panel debe quedar registrado y revisable.

## 11. Pendiente

- **Dominio.** Verificar disponibilidad y decidir. Bloquea el despliegue.
- **Proveedor de envío de correo** del script PHP. Hoy usa `mail()`; si el plan no entrega correo con fiabilidad se decide SMTP autenticado y se documenta como ADR.
- **Versión de PHP** del plan contratado, requisito del ADR 008.
- **Herramienta de analítica** concreta. El requisito está fijado; la elección es de implementación.
- **Correo de destino** del formulario.
- **Número de WhatsApp** que se va a enlazar.
- **Política de retención** del CRM, con borrado automático. Requisito del ADR 005.
- **Quién de Paragraph tiene acceso** al panel, y cómo se revisa.
- **Slug de `tenant`** de Signal, y registro de los orígenes de producción y preview en su allowlist.
- **Subdominio `tracking.<dominio>`** con CNAME y certificado, una vez decidido el dominio.
