# Etapa 1 — Arquitectura y mapa de sitio

Derivada de `etapa-00-research-seo-geo.md` y del ADR 001.

## 1. Criterios que gobiernan esta arquitectura

- La adquisición entra por el problema, no por el nombre del servicio.
- La comparativa de enfoques es página independiente y crítica. Es el activo GEO del proyecto.
- Ninguna página se construye para posicionar "terapeuta cognitivo conductual". El término aparece solo donde se explica, delimitado.
- No hay páginas por ciudad ni por país.
- Estructura plana, máximo dos niveles. Un sitio de este tamaño no necesita más.
- Cada página de problema debe poder llegar a la conversión en un clic.

## 2. Mapa de sitio

### Núcleo

| URL | Función | Keyword principal | Vol. MX | KD |
|---|---|---|---:|---:|
| `/` | Reconocimiento del problema y entrada al proceso | coaching terapéutico | 20 | 0 |
| `/que-es-el-coaching-terapeutico/` | Definir el servicio y su alcance | coaching terapéutico | 20 | 0 |
| `/terapia-o-coaching/` | Comparativa de cinco enfoques | coaching vs terapia | 20 | 0 |
| `/proceso/` | Las cuatro fases del trabajo | sesiones de coaching | 90 | 7 |
| `/proceso/primera-sesion/` | Qué ocurre en la primera sesión | primera sesión de terapia | — | — |
| `/sobre-alina/` | Autoría, credenciales, criterio | — | — | — |
| `/preguntas-frecuentes/` | Objeciones y dudas operativas | — | — | — |
| `/agendar/` | Conversión por contacto previo: la persona escribe y se acuerda el horario. Ver Etapa 3, sección 8 | — | — | — |

Las cuatro primeras páginas tienen volumen de búsqueda marginal y eso es correcto: su función es convertir y ser citadas, no atraer. La adquisición ocurre en `/temas/`.

### Temas — el eje de adquisición

| URL | Keywords objetivo | Vol. MX | KD | Fase |
|---|---|---:|---:|:-:|
| `/temas/` | índice, sin objetivo propio | — | — | 1 |
| `/temas/autoexigencia-y-perfeccionismo/` | autoexigencia · perfeccionismo | 590 · 2,400 | 17 · 26 | 1 |
| `/temas/sobrepensar-y-rumiacion/` | cómo dejar de sobrepensar · rumiación | 2,400 · 4,400 | 22 · 41 | 1 |
| `/temas/procrastinacion-y-evitacion/` | cómo dejar de procrastinar · procrastinación | 880 · 3,600 | 28 · 53 | 1 |
| `/temas/limites-y-relaciones/` | límites emocionales · límites en una relación · límites sanos | 170 · 260 · 170 | 14 · 27 · 35 | 2 |
| `/temas/decisiones-y-cambios/` | sin término de cabeza claro | — | — | 2 |
| `/temas/regulacion-emocional/` | regulación emocional | 1,600 | 31 | 2 |

Los seis temas corresponden a las cinco categorías de "¿Qué puedes trabajar?" de la guía de contenido. Se separó "pensamiento y emociones" en dos páginas porque contiene dos términos de cabeza distintos, que compiten entre sí si comparten URL.

**Se lanza con tres temas, no con seis.** Tres páginas con contenido serio superan a seis delgadas, y las tres de fase 1 son las de mejor relación volumen-dificultad para un dominio sin autoridad.

### Legales y confianza

| URL | Nota |
|---|---|
| `/alcance-del-servicio/` | No es solo legal. Con el ADR 001 es pieza de confianza y de E-E-A-T |
| `/aviso-de-privacidad/` | Requisito LFPDPPP |
| `/terminos-y-condiciones/` | Incluye políticas de pago, cancelación y reprogramación |

### Reservado, no se construye ahora

`/articulos/` queda reservado para long tail una vez que las páginas de tema tengan tracción. Un blog vacío o abandonado resta autoridad en lugar de sumarla. La decisión de abrirlo se toma con datos de Search Console, no antes.

## 3. Dos términos que se dejan pasar deliberadamente

**"Pensamientos intrusivos"** (22,200, KD 35). Es el segundo mayor volumen del nicho y se descarta. El término tiene carga clínica: quien lo busca suele tener una preocupación de salud mental específica, a veces del espectro obsesivo. Capturarlo contradice el ADR 001 por la misma razón que "terapeuta cognitivo conductual", y con menos margen de ambigüedad.

**"Poner límites"** (720, KD 29). El research mostró que su entorno semántico en México es crianza. Se trabajan las variantes adultas en `/temas/limites-y-relaciones/` y se renuncia al término de cabeza.

## 4. Enlazado interno

Modelo hub and spoke, con la conversión accesible desde cualquier punto.

**Cada página de tema enlaza a:**
- `/proceso/` — cómo se trabaja eso que acaba de describirse
- `/agendar/` — conversión, al cierre
- Dos temas hermanos — los patrones aparecen combinados y así se refleja
- `/alcance-del-servicio/` — dentro del bloque de delimitación

**`/terapia-o-coaching/` enlaza a:**
- `/que-es-el-coaching-terapeutico/` y `/sobre-alina/`
- No enlaza a `/agendar/` en el cuerpo. Es una página de orientación, no de venta; empujar la conversión ahí destruye su credibilidad y con ella su valor GEO. El acceso a agendar queda solo en la navegación.

**`/sobre-alina/`** recibe enlace desde el pie de todas las páginas. Es requisito de E-E-A-T que la autoría sea alcanzable desde cualquier punto.

**`/temas/`** enlaza a los seis temas y recibe enlace desde la navegación principal y desde el home.

**Navegación principal:** El proceso · Temas · Enfoques · Sobre Alina · Agendar

Cinco entradas. "Enfoques" apunta a `/terapia-o-coaching/`: la etiqueta es neutra porque la página es neutra.

## 5. Delimitación de alcance

Consecuencia directa del ADR 001. Estas páginas llevan la delimitación de alcance **en el primer bloque visible**, no en el pie:

- `/que-es-el-coaching-terapeutico/`
- `/terapia-o-coaching/`
- `/sobre-alina/`
- Las seis páginas de `/temas/`

El texto exacto se redacta en la Etapa 6. Lo que esta etapa fija es que el espacio existe en la plantilla y que no es un pie de página.

## 6. Datos estructurados

| Página | Schema |
|---|---|
| `/` | `WebSite`, `Person` |
| `/sobre-alina/` | `Person` con `hasCredential` de tipo `EducationalOccupationalCredential` |
| `/que-es-el-coaching-terapeutico/` | `Service` con `provider` apuntando a `Person` |
| `/terapia-o-coaching/` | `FAQPage` |
| `/temas/*` | `Article` con `author` apuntando a `Person` |
| `/preguntas-frecuentes/` | `FAQPage` |
| Todas | `BreadcrumbList` |

El `Person` es la entidad central del grafo: un sitio de práctica individual se ancla en la persona, no en una organización. `hasCredential` declara la certificación ICC como credencial principal, según el ADR 001.

## 7. Indexación

- `sitemap.xml` generado en build, con `lastmod` real.
- `robots.txt` permisivo, con referencia al sitemap. Sin bloqueos a crawlers de modelos de lenguaje: la estrategia GEO depende de que puedan leer el sitio.
- Canonical autorreferencial en todas las páginas.
- `noindex` solo en la confirmación posterior al agendado.
- Un solo idioma, es-MX. No se implementa hreflang. España se atiende con el mismo contenido, evitando localismos innecesarios y precios expresados solo en pesos.
- Sin paginación ni archivos por fecha o categoría mientras no exista `/articulos/`.

## 8. Convenciones de URL

- Español, minúsculas, sin acentos ni caracteres especiales.
- Separador guion medio.
- Barra final consistente en todo el sitio.
- Sin fechas, sin IDs, sin extensión.
- Máximo dos niveles de profundidad.
- Las URL de fase 1 son definitivas. No se planean redirecciones.

## 9. Qué queda para la Etapa 2

- Secciones y jerarquía de mensajes de cada página.
- Asignación fina de keywords secundarias y preguntas por bloque.
- Resolución de la tensión entre "el protagonista es el proceso" y la exigencia de autoría visible, sobre la estructura ya definida de `/sobre-alina/`.
- Definición de qué preguntas de la guía de contenido viven en `/preguntas-frecuentes/` y cuáles en el cuerpo de cada tema.
