# Etapa 5 — Implementación

Estado: andamiaje construido y verificado. Contenido provisional marcado como tal, a la espera de la Etapa 6.

## 1. Lo que está en pie

```
package.json · astro.config.mjs · tsconfig.json
/src
  /content
    config.ts                Esquema de las colecciones
    /temas                   Las tres páginas de fase 1
  /layouts/Base.astro        Cabecera, pie, canonical, Person
  /components/schema/        JSON-LD
  /styles                    tokens.css y base.css
  /pages
    index.astro
    temas/[slug].astro       Plantilla de tema, ocho bloques
/functions/contacto.ts       Pages Function del formulario
/db/schema.sql               CRM
/public/robots.txt
/.github/workflows/ci.yml
```

## 2. Verificación del corte vertical

| Comprobación | Resultado |
|---|---|
| Compila | 4 páginas |
| Peso total del `dist` | 128 KB |
| JavaScript enviado al navegador | Ninguno |
| Peticiones a terceros | Cero |
| Tipografía | Poppins autoalojada, woff2 emitidos en el build |
| JSON-LD | `Person` con ambas credenciales, `Article` por tema |
| Bloque de alcance | Presente en las tres páginas de tema |
| Un solo `h1` por página | Sí |

El presupuesto de la Etapa 3 era menos de 100 KB de CSS y JS sumados y cero peticiones externas. Se cumple con margen: no hay JavaScript, y el CSS es un solo archivo.

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

## 5. Nota sobre `node_modules`

Instalar dependencias directamente sobre la carpeta de Windows es inviable: miles de archivos pequeños a través del puente tardan más que el tiempo límite de una operación. La instalación y el build se hacen fuera de esa carpeta.

Para quien retome el proyecto en local, esto no aplica: `npm install` en su propia máquina funciona normal.

## 6. Pendiente en esta etapa

- Las páginas del núcleo: `/proceso/`, `/que-es-el-coaching-terapeutico/`, `/terapia-o-coaching/`, `/sobre-alina/`, `/preguntas-frecuentes/`, `/agendar/`, `/temas/` y las tres legales.
- Componentes del sistema de diseño que faltan: `QuoteBlock`, `Highlight`, `FigureIllustration` para `/sobre-alina/`.
- Proveedor de envío de correo de la Pages Function. Se documenta como ADR al elegirlo.
- Integración del SDK de Signal, desactivada, según el ADR 006.
- Validación de datos estructurados en el CI. Hoy solo hay build y verificación de enlaces.
