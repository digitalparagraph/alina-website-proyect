# Etapa 5 — Implementación

Las dieciséis páginas del mapa de sitio están construidas y compilando. El contenido provisional queda marcado como tal en la propia página.

## 1. Lo que está en pie

```
package.json · package-lock.json · astro.config.mjs · tsconfig.json
linkinator.config.json
/src
  /assets/ilustraciones      Arte que pasa por el optimizador de Astro
  /content
    config.ts                Esquema de las colecciones
    /temas                   Las tres páginas de fase 1
  /layouts/Base.astro        Cabecera, pie, canonical, Person
  /components
    Figura.astro             Ilustración de marca, solo /sobre-alina/
    /schema                  JSON-LD
  /styles                    tokens.css y base.css
  /pages                     Las dieciséis páginas
    index.astro
    temas/[slug].astro       Plantilla de tema, ocho bloques
    robots.txt.ts            Cerrado mientras el despliegue sea de revisión
/php
  contacto.php               Endpoint del formulario
  config.example.php         Plantilla de credenciales; config.php no se versiona
/db/schema.mysql.sql         CRM
/public
  .htaccess                  Rutas, cabeceras y caché de Apache o LiteSpeed
  /logo · /img               Assets servidos tal cual
/scripts
  verificar-datos-estructurados.mjs
/.github/workflows-pendientes
  ci.yml · deploy-hostinger.yml
```

Los workflows están fuera de `.github/workflows/` porque el token con el que se hace push no tiene permiso de Workflows. `LEEME.md` explica cómo activarlos y qué secretos hay que cargar antes.

## 2. Verificación

| Comprobación | Resultado |
|---|---|
| Compila | 16 páginas |
| Peso total del `dist` | 474 KB |
| CSS | Un archivo, 6.2 KB |
| JavaScript enviado al navegador | 1.2 KB, en línea y solo en `/agendar/` |
| Peticiones a terceros | Cero |
| Tipografía | Poppins autoalojada, woff2 emitidos en el build |
| Ilustración | AVIF y WebP generados en el build; 6.3 KB en la variante que se sirve |
| JSON-LD | 23 bloques en 16 páginas, sin problemas |
| Enlaces internos | 21 comprobados, ninguno roto |
| Un solo `h1` por página | Sí |
| Desborde horizontal | Ninguno, ni en 1265 px ni en 375 px |

El presupuesto de la Etapa 3 era menos de 100 KB de CSS y JavaScript sumados y cero peticiones externas. Se cumple con margen.

## 3. El esquema como condición de compilación

Verificado en la práctica, no supuesto. Al quitar `delimitacionAlcance` del frontmatter de una página de tema:

```
[InvalidContentEntryDataError] temas → autoexigencia-y-perfeccionismo
data does not match collection schema.
  delimitacionAlcance: Required
```

El build falla con código 1, así que el CI rechaza el PR. El requisito del ADR 001 dejó de depender de que alguien lo recuerde a las siete de la tarde redactando la quinta página.

El esquema también exige `reconocimiento` con máximo de 420 caracteres. Es la regla de la Etapa 2 —dos o tres frases, no más— hecha cumplir por el compilador: si el bloque de reconocimiento crece, entierra la respuesta que los modelos de lenguaje necesitan extraer.

## 4. La plantilla de tema

Los ocho bloques de la Etapa 2, en orden, con los estructurales tomados del frontmatter y los de prosa del cuerpo del markdown. Quien redacte en la Etapa 6 no puede alterar el orden por accidente: llena campos.

El bloque de alcance se renderiza como `aside` con su propio encabezado, visible dentro del artículo. No es un pie.

## 5. El formulario

`/agendar/` envía por POST a `/contacto.php`, el script del ADR 008.

**El `method` y el `action` viven en el HTML, no en el JavaScript.** No es un detalle de estilo: un formulario sin ellos hace GET a su propia página y mete el mensaje en la barra de direcciones, en el historial del navegador y en el log de accesos del servidor. El ADR 003 prohíbe exactamente eso. Si el script no carga, el navegador hace el POST solo y el mensaje sigue llegando por un canal que no lo deja escrito en ningún lado.

El script encima de eso hace tres cosas: evita perder la página, informa del resultado en un bloque con `aria-live`, y adjunta los datos de seguimiento que el CRM necesita y que un POST nativo no lleva.

`contacto.php` acepta las dos formas de envío. Con JSON responde JSON; con un envío nativo responde una página mínima, porque quien llega por ahí no tiene JavaScript para leer un JSON.

El campo trampa `sitio_web` está fuera de pantalla, con `tabindex="-1"`, y es el que el script del servidor ya verificaba.

## 6. Los tres controles automáticos

`npm run verificar` compila y corre los dos verificadores. Es lo mismo que corre el CI.

| Control | Qué rechaza |
|---|---|
| `npm run build` | Contenido que no cumple el esquema de la colección |
| `npm run verificar:enlaces` | Enlaces internos rotos |
| `npm run verificar:schema` | Datos estructurados que incumplen lo que el proyecto decidió |

El validador de datos estructurados corre sobre `dist/` sin salir a la red: el presupuesto de cero peticiones a terceros también aplica al CI, que si no depende de que el validador de Google esté en pie. Comprueba seis cosas, y las seis están probadas contra un `dist` roto a propósito:

1. Que el JSON-LD sea JSON válido y declare `@context` y `@type`. Un bloque roto no da error en el navegador: simplemente deja de existir para el buscador.
2. Que `Person` esté en todas las páginas, con sus dos credenciales.
3. Que `Person` nunca se declare terapeuta, psicóloga ni psicoterapeuta. Es el ADR 001 comprobado en el HTML emitido, no en el código fuente.
4. Que las referencias por `@id` resuelvan dentro de la misma página.
5. Que las URLs absolutas del grafo apunten al dominio del despliegue. Es lo que delata un build hecho sin `PUBLIC_SITE_URL`.
6. Que las preguntas y respuestas del `FAQPage` estén visibles en la página, como pide Google.

La configuración del verificador de enlaces vive en `linkinator.config.json` y no en la línea de comandos. El patrón que salta los enlaces externos se rompe al pasar por `cmd`, y roto no salta nada: escanea cero enlaces y pasa. Un control que nunca falla es peor que no tenerlo.

## 7. La URL del despliegue

`PUBLIC_SITE_URL` gobierna el `site` de Astro, y de ahí salen el sitemap y los canonical de golpe. Sin la variable, el respaldo es `http://localhost:4321`.

El CI de los pull request compila así a propósito, porque valida el sitio y no lo publica. Quien exige la variable es el workflow de deploy, que se detiene antes de compilar si no está cargada: un build con canonical a localhost subido al servidor es peor que un deploy que no corre.

## 8. Nota sobre `node_modules`

Instalar dependencias directamente sobre una carpeta de Windows montada desde Cowork es inviable: miles de archivos pequeños a través del puente tardan más que el tiempo límite de una operación. La instalación y el build se hacen fuera de esa carpeta.

Para quien retome el proyecto en local, esto no aplica: `npm install` en su propia máquina funciona normal.

## 9. Pendiente en esta etapa

- **Verificar `contacto.php` ejecutándolo.** Es la única pieza del sitio que ninguna máquina del equipo ha corrido: PHP no está instalado en local y el dev server de Astro no lo interpreta. Se prueba con PHP local o contra el staging de Hostinger.
- **Confirmar la versión de PHP** del plan contratado. El script usa sintaxis de PHP 7.4 en adelante.
- **Proveedor de envío de correo.** Hoy el script usa `mail()`. Si el plan no entrega correo con fiabilidad, se decide SMTP autenticado y se documenta como ADR.
- **Atribución de campaña.** Las UTM se leen de la URL de `/agendar/`. Si la persona llega por campaña a otra página y navega hasta ahí, se pierden. Capturarlas al aterrizar exige JavaScript en todas las páginas, y hoy el sitio no envía ninguno fuera de `/agendar/`. Es decisión técnica: o la resuelve Signal, o se acepta atribuir solo la llegada directa, o se añade la captura.
- **`QuoteBlock` del sistema de diseño.** El componente no está construido porque no tiene dónde ir: colocarlo exige elegir qué frase se convierte en cita, y eso es una decisión de la Etapa 7 con el copy definitivo puesto.
- **Integración del SDK de Signal**, desactivada, según el ADR 006.
- **Lighthouse contra los presupuestos** de la Etapa 3 en el CI. Necesita una URL desplegada, así que va con la Etapa 8.
- **Activar los workflows.** Requiere el permiso de Workflows en el token, o moverlos desde la interfaz de GitHub.
