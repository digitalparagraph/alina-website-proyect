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
  /panel                     Panel del CRM: entrar, alta, listado, motor
  /cron/retencion.php        Borrado a los 24 meses
/db
  schema.mysql.sql           Tabla de contactos
  migracion-panel.sql        Usuario del panel y registro de accesos
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
| Compila | 18 páginas |
| Peso total del `dist` | 1.1 MB |
| CSS | Un archivo, 12.8 KB |
| JavaScript enviado al navegador | 1.3 KB, en línea y solo en `/agendar/` |
| Peticiones a terceros | Cero |
| Tipografía | Poppins autoalojada, woff2 emitidos en el build |
| Imágenes | AVIF, WebP y respaldo generados en el build, en los anchos que el layout usa |
| JSON-LD | 27 bloques en 18 páginas, sin problemas |
| Enlaces internos | 41 comprobados, ninguno roto |
| Un solo `h1` por página | Sí |
| Desborde horizontal | Ninguno, ni en 1280 px ni en 375 px |

Con `PUBLIC_GTM_ID` configurado (ADR 014) se añaden 3.7 KB de JavaScript en línea por página —el modo de consentimiento y la banda— y, **solo para quien acepta**, la descarga de Tag Manager. Vacío, nada de eso se emite y las cifras son las de arriba.

El presupuesto de la Etapa 3 era menos de 100 KB de CSS y JavaScript sumados y cero peticiones externas. Se cumple con margen: 12.8 KB de CSS y 1.3 KB de JavaScript en una sola página.

La parte de "cero peticiones externas" deja de cumplirse para quien acepta cookies, y eso está asumido en el ADR 014. Para quien rechaza se sigue cumpliendo entero.

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

## 7. Dónde vive el sitio

`PUBLIC_SITE_URL` es la única variable que fija la ubicación, y de ella salen las cuatro cosas que dependen de ella:

| De la variable sale | Gobierna |
|---|---|
| El origen | `site` de Astro: canonical y sitemap |
| La ruta | `base` de Astro: el prefijo de cada ruta interna |
| Origen + ruta | La raíz absoluta de los `@id` y las URLs del JSON-LD |
| La ruta | El `ErrorDocument` del `.htaccess`, que lo ajusta `npm run preparar` |
| El host | La redirección de cualquier otro dominio al canónico, con 301 (ADR 010) |

Se lee del entorno del proceso o del `.env`, en ese orden. Lo segundo importa: un archivo de configuración de Astro no ve el `.env` por su cuenta, y sin conectarlo quien llenara la variable ahí la vería ignorada justo donde se decide el dominio.

Sin la variable, el respaldo es `http://localhost:4321` en la raíz. El CI de los pull request compila así a propósito, porque valida el sitio y no lo publica. Quien exige la variable es el workflow de deploy, que se detiene antes de compilar si no está cargada: un build con canonical a localhost subido al servidor es peor que un deploy que no corre.

### El sitio puede ir en una subcarpeta

Hoy la revisión corre en `dev.paragraph.mx/alina` y la producción irá a la raíz de su propio dominio. Por eso ninguna ruta interna está escrita a mano: todas pasan por `ruta()` de `src/lib/rutas.ts`, que las prefija con el `base`. Mover el sitio es cambiar una variable, no repasar dieciséis páginas.

Dos consecuencias de servir en subcarpeta que no son evidentes:

**Un `robots.txt` solo se obedece en la raíz del dominio.** En `/alina/robots.txt` no lo lee nadie. Se emite igual, porque en producción sí manda, pero mientras el sitio viva en una subcarpeta el bloqueo real son las otras dos capas: el `noindex,nofollow` de cada página y la cabecera `X-Robots-Tag` que `npm run preparar` añade al `.htaccess` para toda la carpeta. La cabecera cubre además el sitemap y los XML, que no tienen dónde llevar una etiqueta meta.

**La redirección de host no se aplica en subcarpeta.** En `dev.paragraph.mx/alina` el sitio comparte dominio con los otros proyectos en revisión de la agencia, y una regla que redirige por host se los llevaría por delante. `npm run preparar` la añade solo cuando el despliegue va a la raíz de su propio dominio.

**Un `.htaccess` de subcarpeta recibe la ruta recortada.** La regla de barra final redirige con `%{REQUEST_URI}` y no con `$1`: con `$1` mandaría `/pagina` a la raíz del dominio en lugar de a `/alina/pagina/`.

### La verificación también tiene que saberlo

`linkinator` sirve un directorio como si fuera la raíz de un dominio. Con el sitio en subcarpeta, sus enlaces apuntan a `/alina/...` y contra un `dist/` servido en la raíz darían 404 todos. `npm run verificar:enlaces` espeja el `dist` dentro de la subcarpeta y verifica sobre ese árbol, que es la forma que tendrá el servidor.

Es la misma clase de error que ya tuvo este control una vez: si el verificador no reproduce la forma real del servidor, o reporta el sitio entero como roto o no comprueba nada.

## 8. Cómo se sube

```bash
npm run verificar   # compila y pasa los tres controles
npm run preparar    # ajusta el .htaccess a la ubicación
npm run subir       # empaqueta, copia por SSH y extrae en el servidor
```

La subida es por SSH con clave, sin contraseñas: `~/.ssh/paragraph_hostinger`, la misma que usa `herramientas/deploy-ssh.sh` del proyecto App Paragraph, porque es la misma cuenta de hosting. Los datos de conexión viven en el `.env`, que no se versiona, con los mismos nombres de variable que ese proyecto.

`subir-por-ssh.mjs` manda el sitio en un solo transferido —empaqueta, copia y extrae allá— en lugar de archivo por archivo: son 37 archivos pequeños y sobre una conexión con latencia cada uno cuesta más en ida y vuelta que en bytes. Y mira antes de escribir: si el destino ya tiene contenido, lo lista y se detiene. Hace falta `--reemplazar` para pisarlo.

`npm run preparar` acepta `--con-php`, que incluye `contacto.php` junto al sitio. Sin esa bandera el formulario responde error al enviar, que es lo correcto en una revisión de diseño: el script necesita un `config.php` en el servidor con las credenciales de la base y el correo de destino, y sin él el `require` falla con un 500.

### Dónde vive de verdad `dev.paragraph.mx`

Esto cuesta una hora si nadie lo dice. El subdominio **no** tiene carpeta propia en `~/domains/`: su docroot es una subcarpeta del dominio principal.

```
~/domains/paragraph.mx/public_html/dev-projects/     ← docroot de dev.paragraph.mx
    alina/                                           → https://dev.paragraph.mx/alina/
    descubre/ · ricoh/ · tive/ · veolia/             → otros proyectos de la agencia
```

Buscar `~/domains/dev.paragraph.mx/` no encuentra nada y parece que el subdominio no existe. Existe, y comparte carpeta con los otros proyectos en revisión de Paragraph: cualquier cosa que se escriba en ese nivel afecta a los vecinos, así que el despliegue solo toca `alina/`.

El workflow `deploy-hostinger.yml` sigue escrito para FTP y está en `.github/workflows-pendientes/` porque el token con el que se hace push no tiene permiso de Workflows. Mientras siga inactivo, la ruta vigente es la de arriba.

## 9. Nota sobre `node_modules`

Instalar dependencias directamente sobre una carpeta de Windows montada desde Cowork es inviable: miles de archivos pequeños a través del puente tardan más que el tiempo límite de una operación. La instalación y el build se hacen fuera de esa carpeta.

Para quien retome el proyecto en local, esto no aplica: `npm install` en su propia máquina funciona normal.

## 10. Pendiente en esta etapa

- **Verificar `contacto.php` ejecutándolo.** Es la única pieza del sitio que ninguna máquina del equipo ha corrido: PHP no está instalado en local y el dev server de Astro no lo interpreta. Se prueba con PHP local o contra el staging de Hostinger.
- **Confirmar la versión de PHP** del plan contratado. El script usa sintaxis de PHP 7.4 en adelante.
- **Proveedor de envío de correo.** Hoy el script usa `mail()`. Si el plan no entrega correo con fiabilidad, se decide SMTP autenticado y se documenta como ADR.
- **Atribución de campaña.** Las UTM se leen de la URL de `/agendar/`. Si la persona llega por campaña a otra página y navega hasta ahí, se pierden. Capturarlas al aterrizar exige JavaScript en todas las páginas, y hoy el sitio no envía ninguno fuera de `/agendar/`. Es decisión técnica: o la resuelve Signal, o se acepta atribuir solo la llegada directa, o se añade la captura.
- **Las ilustraciones duplicadas.** `public/img/alina-figure-arms.png` (334 KB) es la misma imagen que `src/assets/ilustraciones/alina-figura-brazos.png`, que es la que el sitio sirve optimizada, y `alina-figure-point.png` (259 KB) no se usa en ninguna página. Las dos van al `dist` y de ahí al servidor. Es decisión de Damian: o se borran de `public/img/` y la fuente canónica queda en `Design System/assets/illustrations/`, o se conservan para maquetar y se asume el peso.
- **`QuoteBlock` del sistema de diseño.** El componente no está construido porque no tiene dónde ir: colocarlo exige elegir qué frase se convierte en cita, y eso es una decisión de la Etapa 7 con el copy definitivo puesto.
- **Integración del SDK de Signal**, desactivada, según el ADR 006.
- **Lighthouse contra los presupuestos** de la Etapa 3 en el CI. Necesita una URL desplegada, así que va con la Etapa 8.
- **Activar los workflows.** Requiere el permiso de Workflows en el token, o moverlos desde la interfaz de GitHub.
