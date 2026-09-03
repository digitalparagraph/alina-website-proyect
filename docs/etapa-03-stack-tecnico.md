# Etapa 3 — Stack técnico y configuraciones

Decisiones razonadas en los ADR 002, 003 y 004. Este documento reúne la configuración completa y lo que queda pendiente.

## 1. Resumen

| Área | Decisión |
|---|---|
| Generador | Astro, salida estática |
| Contenido | Markdown en el repositorio, Content Collections con validación por esquema |
| Estilos | CSS propio con custom properties. Tokens de la Etapa 4 |
| Interactividad | JavaScript propio y mínimo. Sin framework de componentes |
| Hosting | Cloudflare Pages, despliegue automático desde `main` |
| Formulario | Pages Function propia que reenvía por correo sin persistir |
| Canal alterno | Enlace directo de WhatsApp. Enlace, no widget |
| Analítica | Sin cookies, sin banner. Search Console para datos de búsqueda |
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
/functions
  contacto.ts              Pages Function del formulario
/public
  fonts/                   Tipografía autoalojada
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
- WCAG 2.2 nivel AA. Contraste verificado sobre la paleta de la Etapa 4, no después.
- HTML semántico con un solo `h1` por página y jerarquía de encabezados sin saltos.

## 6. Dominio

No existe todavía. Con la Etapa 0 quedó claro que un dominio de keyword no aporta nada: la categoría no tiene demanda de búsqueda. Va dominio de marca.

Criterios: nombre de Alina, `.com` o `.mx`, sin guiones, sin la palabra coaching como relleno, pronunciable por teléfono.

**Decisión pendiente de Damian.** Hay que verificar disponibilidad antes de proponer. Bloquea el despliegue, no la implementación: se puede desarrollar contra la URL temporal de Cloudflare Pages.

## 7. Integración continua

GitHub Actions en cada PR:

1. Build. Falla si el esquema de contenido no valida.
2. Verificación de enlaces internos.
3. Validación de los datos estructurados.
4. Lighthouse contra los presupuestos de la sección 5.

Un PR que no pasa no se aprueba. Es la única forma de que los presupuestos signifiquen algo.

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

## 10. Pendiente

- **Dominio.** Verificar disponibilidad y decidir. Bloquea el despliegue.
- **Proveedor de envío de correo** para la Pages Function. Se elige en la implementación y se documenta como ADR.
- **Herramienta de analítica** concreta. El requisito está fijado; la elección es de implementación.
- **Correo de destino** del formulario.
- **Número de WhatsApp** que se va a enlazar.
