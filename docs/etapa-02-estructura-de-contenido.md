# Etapa 2 — Estructura de contenido

Define qué dice cada página, en qué orden y con qué intención. **No contiene copy final**: eso es la Etapa 6. Aquí se fija la jerarquía de mensajes, la asignación de keywords y el schema.

Alcance: las quince URL de fase 1. Las tres páginas de tema de fase 2 usan la misma plantilla.

## 1. Criterios que gobiernan la estructura

Los diez criterios de comunicación de la guía de contenido son vinculantes. Cuatro tienen consecuencia estructural directa y se traducen así:

| Criterio de la guía | Traducción estructural |
|---|---|
| El protagonista es el proceso, no la coach | Ninguna página del núcleo abre con Alina. Su presencia se concentra en una página y en el pie |
| Hablar de problemas reales, no de conceptos | Toda página de tema abre describiendo situaciones, no definiendo términos |
| No prometer transformación; explicar el cambio | Ningún bloque de cierre promete resultado. Los cierres describen qué habilita el proceso |
| La voz debe provocar reconocimiento, no admiración | El primer bloque de cada página es de identificación. Las credenciales nunca van arriba |

## 2. La tensión entre autoría y protagonismo

La guía establece que el protagonista es el proceso y que debe evitarse la construcción de "conoce a tu coach". E-E-A-T exige lo contrario: autoría visible y verificable, sobre todo en contenido de salud.

**Resolución:** se separan las dos funciones que normalmente se mezclan en una página "sobre mí".

- **La confianza narrativa** vive distribuida: cada página de tema demuestra criterio por cómo describe el patrón, no por citar credenciales.
- **La verificabilidad** se concentra en `/sobre-alina/`, alcanzable desde el pie de todas las páginas y desde el schema, pero nunca empujada desde el cuerpo del núcleo.

`/sobre-alina/` invierte el orden habitual: abre con cómo trabaja y qué no hace, y las credenciales aparecen después. Cumple con E-E-A-T sin convertirse en la página de personalidad que la guía descarta. Un lector encuentra criterio; un evaluador de calidad encuentra formación verificable.

## 3. La tensión entre GEO y la secuencia de persuasión

La guía fija una secuencia: identificación, comprensión, confianza, acción. La optimización para modelos de lenguaje pide lo contrario: la respuesta directa al inicio, antes del desarrollo.

**Resolución:** el bloque de identificación se limita a dos o tres frases —suficiente para que el lector se reconozca, corto para no enterrar la respuesta— y el segundo bloque responde la pregunta de búsqueda de forma directa y extraíble, bajo un encabezado que reproduce la pregunta.

Las dos necesidades caben porque el reconocimiento es breve por naturaleza. Lo que no cabe es una introducción larga.

## 4. Plantilla de página de tema

Estructura repetible para las seis páginas de tema. El orden no es negociable; la extensión de cada bloque sí.

| # | Bloque | Función | Extensión |
|:-:|---|---|---|
| 1 | **Reconocimiento** | Describe el patrón en situaciones concretas. Sin definir, sin diagnosticar | 2-3 frases |
| 2 | **La pregunta de búsqueda** | H2 con la pregunta tal como se busca. Respuesta directa en el primer párrafo | 1-2 párrafos |
| 3 | **Qué mantiene el patrón** | El mecanismo: qué lo dispara, qué lo refuerza, por qué el alivio inmediato lo sostiene | 2-4 párrafos |
| 4 | **Por qué entenderlo no alcanza** | El punto de la guía: saber que necesitas poner un límite no es poder ponerlo | 1-2 párrafos |
| 5 | **Qué se trabaja sobre esto** | Aterriza las cuatro fases del proceso en este patrón específico | 1 párrafo + lista |
| 6 | **Delimitación de alcance** | Hasta dónde llega este servicio y cuándo corresponde otro tipo de atención | 2-3 frases, visible |
| 7 | **Temas relacionados** | Dos temas hermanos. Los patrones aparecen combinados | Enlaces |
| 8 | **Cierre** | Qué habilita el proceso. Nunca qué resultado promete | 2-3 frases + CTA |

Prohibiciones para estas páginas:

- No abrir con la definición del término. Quien busca "rumiación" no quiere la etimología.
- No usar el bloque 3 para explicar TCC. La guía es explícita: profundidad sin sonar académico.
- No listar síntomas en formato de autodiagnóstico.
- No cerrar con urgencia ni escasez.

## 5. Brief por página — núcleo

### `/` — Home

**Propósito:** que el visitante se reconozca y encuentre la puerta de entrada correcta.
**Keyword:** coaching terapéutico · marca.
**Schema:** `WebSite`, `Person`.

| # | Bloque | Intención del mensaje |
|:-:|---|---|
| 1 | Apertura | Nombrar el patrón central: entender algo y aun así seguir haciéndolo. Sin promesa, sin bienvenida |
| 2 | ¿Te reconoces? | Los ocho reconocimientos de "¿Para quién es este proceso?" de la guía. Es el bloque de identificación más importante del sitio |
| 3 | Qué puedes trabajar | Las cinco categorías, cada una enlazando a su tema |
| 4 | Cómo se trabaja | Las cuatro fases en una línea cada una. Enlace a `/proceso/` |
| 5 | Qué es y qué no es | Delimitación en positivo. Enlaces a `/que-es-el-coaching-terapeutico/` y `/terapia-o-coaching/` |
| 6 | Quién acompaña | Tres líneas sobrias. Certificación, años, enfoque. Enlace a `/sobre-alina/`. Sin fotografía aspiracional |
| 7 | La objeción principal | "¿Lo que me pasa es suficientemente importante?" Es la barrera más común según la guía y se desarma aquí, no en la FAQ |
| 8 | Cierre | Qué habilita la primera sesión. CTA |

No lleva: testimonios, cifras de clientes, logotipos de medios, frases motivacionales de gran formato.

### `/que-es-el-coaching-terapeutico/`

**Propósito:** definir el servicio y su alcance para quien ya está considerando contratarlo.
**Keyword:** coaching terapéutico · qué es el coaching terapéutico.
**Schema:** `Service` con `provider` → `Person`.

| # | Bloque | Intención del mensaje |
|:-:|---|---|
| 1 | Definición directa | El párrafo de la guía: proceso de acompañamiento para comprender y modificar patrones que interfieren con cómo alguien quiere vivir, decidir o relacionarse |
| 2 | **Delimitación de alcance** | Primer bloque visible. Qué no es: no es psicoterapia, no sustituye atención especializada, y cuando algo la requiere se deriva |
| 3 | De dónde viene el enfoque | Coaching más principios de TCC y ciencias del comportamiento. Sin convertirse en una clase |
| 4 | Cómo se traduce en la práctica | Que la comprensión produzca algo observable: hipótesis, observación, prueba, aprendizaje |
| 5 | Qué no se hace | Los "no" de la guía: sin transformaciones instantáneas, sin fórmulas universales, sin generar dependencia |
| 6 | Formato | Sesiones individuales, en línea, ~50 minutos, habitualmente cada 15 días, frecuencia ajustable |
| 7 | Cierre | Enlace a `/proceso/` y a `/terapia-o-coaching/`. CTA |

### `/terapia-o-coaching/` — activo GEO

**Propósito:** ser la referencia citable sobre las diferencias entre enfoques. Su valor depende de que sea útil incluso para quien decide no contratar.
**Keyword:** coaching vs terapia · diferencia entre coach y psicólogo · terapia o coaching.
**Schema:** `FAQPage`.

| # | Bloque | Intención del mensaje |
|:-:|---|---|
| 1 | La pregunta | Planteada como la plantea la gente: no sé si necesito terapia o coaching |
| 2 | Respuesta corta | Criterio accionable en un párrafo, antes de cualquier tabla. Es el bloque que los modelos van a extraer |
| 3 | La comparativa | La tabla de cinco enfoques de la guía, íntegra: foco, línea de tiempo, herramientas, cliente ideal |
| 4 | La nota de honestidad | La advertencia de la guía: las fronteras no son absolutas y esto no sustituye la definición profesional de cada servicio. **Este bloque es el que da credibilidad a la página. No se recorta** |
| 5 | Cuándo corresponde psicoterapia | En positivo y sin ambigüedad. Señales concretas |
| 6 | Cuándo corresponde este servicio | Igual de concreto |
| 7 | Cierre | Enlaces a la definición del servicio y a la autoría |

**Sin CTA en el cuerpo.** Decisión de la Etapa 1: la conversión queda en la navegación. Un botón de agendar aquí convierte una página de orientación en publicidad y destruye su valor GEO.

### `/proceso/`

**Propósito:** hacer creíble el método antes de que alguien agende.
**Keyword:** sesiones de coaching · cómo funciona el coaching terapéutico.
**Schema:** `Service`, `HowTo` descartado por no ser un procedimiento que el lector ejecute solo.

| # | Bloque | Intención del mensaje |
|:-:|---|---|
| 1 | Punto de partida | El proceso parte de la persona y de lo que quiere comprender o cambiar. Es colaborativo: el coach no tiene las respuestas |
| 2 | Las cuatro fases | Entender, observar, experimentar, integrar. Los textos de la guía, con el numerado que ya traen. **Aquí el numerado es información real**: es una secuencia |
| 3 | Qué puede incluir | Análisis funcional, autorregistros, experimentación conductual, entrenamiento de habilidades, ejercicios entre sesiones |
| 4 | Qué requiere de ti | Curiosidad, disposición a cuestionar ideas dadas por ciertas, participación activa. No hace falta llegar sabiendo qué cambiar |
| 5 | Qué se nota primero | Observarse con más claridad; el espacio entre lo que ocurre y la respuesta automática. Sin prometer plazos |
| 6 | Qué no se promete | Los "no" de la guía, en su versión honesta: seguir sintiendo, pero entender y poder responder distinto |
| 7 | Formato y cierre | Enlace a `/proceso/primera-sesion/`. CTA |

### `/proceso/primera-sesion/`

**Propósito:** eliminar la fricción de no saber qué va a pasar.
**Keyword:** primera sesión de coaching · qué pasa en la primera sesión.
**Schema:** `Article`, `author` → `Person`.

| # | Bloque | Intención del mensaje |
|:-:|---|---|
| 1 | Qué se hace | Entender qué está pasando: qué te trae, qué has intentado, qué se repite, qué impacto tiene |
| 2 | Ir más allá del problema declarado | El ejemplo de la guía: "no sé tomar decisiones" resulta ser sobreanálisis, miedo a equivocarse, necesidad de certeza e intolerancia a las consecuencias de elegir |
| 3 | Qué no se hace | No se llega con conclusión predeterminada ni con lista de consejos |
| 4 | También la evalúas tú | La primera sesión sirve para que la persona valore si el enfoque le hace sentido. Desactiva el miedo al compromiso |
| 5 | "¿Y si no sé qué decir?" | Objeción directa de la guía. No hace falta discurso preparado |
| 6 | Cierre | CTA |

### `/temas/`

**Propósito:** enrutar por reconocimiento y concentrar autoridad para distribuirla.
**Keyword:** ninguna propia.
**Schema:** `BreadcrumbList`, `ItemList`.

Encabezado corto, luego las seis entradas. Cada entrada se titula con el patrón como lo vive la persona y se describe en una frase de reconocimiento, no en una definición. Las de fase 2 no se muestran hasta existir: un enlace roto o una página vacía cuesta más que la promesa de completitud.

### `/sobre-alina/`

**Propósito:** verificabilidad para E-E-A-T sin construir una página de personalidad.
**Keyword:** marca · coach certificada ICC.
**Schema:** `Person` con `hasCredential` de tipo `EducationalOccupationalCredential`.

| # | Bloque | Intención del mensaje |
|:-:|---|---|
| 1 | Cómo entiende el trabajo | La convicción de la guía, en sobrio: las personas pueden crecer y hacerse cargo, y entender cómo funcionamos amplía la capacidad de elegir. Sin sentimentalismo |
| 2 | Qué no practica | Lo que no conecta del coaching tradicional: nada de "cambia tu mentalidad", fórmulas universales ni frases motivacionales. Diferencia por criterio, no por autoelogio |
| 3 | Formación verificable | Certificación ICC de 2014 con aval EMCC, doce años. Especialización en TCC, 360 horas, 2024-2025, con RVOE. Licenciatura de base. Presentada como **coach certificada con formación en TCC** |
| 4 | **Alcance** | Lo que su formación habilita y lo que no. No es psicóloga ni psicoterapeuta. Enlace a `/alcance-del-servicio/` |
| 5 | Cierre | Enlace a `/proceso/`. Sin CTA propio |

Este es el orden que resuelve la tensión de la sección 2: criterio primero, credenciales después. Ver `docs/credenciales.md` para los hechos y sus restricciones.

No lleva: fotografía aspiracional, relato de vocación extenso, cifras de clientes atendidos.

### `/preguntas-frecuentes/`

**Propósito:** resolver dudas operativas sin ensuciar las páginas de contenido.
**Keyword:** long tail operativo.
**Schema:** `FAQPage`.

Solo preguntas de operación: duración del proceso, frecuencia, modalidad, qué pasa si no es para mí, si sustituye terapia, si hace falta diagnóstico, costo, cancelación y reprogramación.

Las objeciones emocionales **no viven aquí**. Ver sección 6.

### `/agendar/`

**Propósito:** convertir sin fricción.
**Schema:** ninguno propio.

**Primera línea obligatoria:** el mecanismo real. La persona escribe, Alina responde y acuerdan horario. La etiqueta dice "Agendar" y la página tiene que aclarar de inmediato que no hay calendario que elegir.

Luego: recordatorio de qué es la primera sesión en dos líneas, el formulario, y el enlace de WhatsApp como alternativa. La confirmación posterior lleva `noindex`.

El formulario pide nombre, correo y un campo abierto. Nada más, y declara antes del botón que no es un canal de atención urgente. Ver Etapa 3, sección 9.

## 6. Dónde vive cada pregunta de la guía

La guía reúne tres tipos de pregunta que estructuralmente no pertenecen al mismo lugar.

| Tipo | Ejemplo | Dónde va |
|---|---|---|
| **Operativa** | ¿Cuánto dura? ¿Cada cuánto? ¿Cuánto cuesta? | `/preguntas-frecuentes/` |
| **De objeción** | ¿Mi problema es suficientemente importante? ¿Y si no sé qué decir? ¿Me van a decir qué hacer? | En el cuerpo de la página donde bloquea la conversión, no en la FAQ |
| **De alcance** | ¿Esto sustituye terapia? ¿Y si aparece algo que requiere otra atención? | `/alcance-del-servicio/`, resumida en `/terapia-o-coaching/` |

Una objeción respondida en una FAQ ya perdió: quien la tenía se fue antes de llegar. Van donde surgen.

Asignación de las objeciones de la guía:

- "¿Realmente esto me puede ayudar?" → `/` bloque 7 y `/proceso/`
- "¿Lo que me pasa es suficientemente importante?" → `/` bloque 7. Es la barrera más común
- "¿Y si no sé qué decir en una sesión?" → `/proceso/primera-sesion/` bloque 5
- "¿Voy a terminar hablando de mi infancia durante meses?" → `/proceso/` bloque 2
- "¿Me van a decir qué tengo que hacer?" → `/proceso/` bloque 1
- "¿Cómo sé si esto es para mí?" → `/proceso/primera-sesion/` bloque 4
- "¿Realmente sirve esto?" → `/que-es-el-coaching-terapeutico/` bloque 4
- "Debería poder manejarlo solo" y "esperar a estar suficientemente mal" → `/` bloque 7 y cierre de cada tema

## 7. Brief por página — temas de fase 1

Todas siguen la plantilla de la sección 4. Aquí se fija lo específico.

### `/temas/autoexigencia-y-perfeccionismo/`

**Keywords:** autoexigencia (590, KD 17) · perfeccionismo (2,400, KD 26).
**Pregunta del bloque 2:** por qué me exijo tanto y no puedo bajarle.
**Reconocimiento:** exigirse lo que no se le exigiría a nadie más; que nada esté nunca suficientemente bien; culpa al descansar.
**Mecanismo:** el estándar imposible protege de una consecuencia temida, y cumplirlo a veces lo refuerza.
**Material de la guía:** categoría "Autoexigencia" de "¿Qué puedes trabajar?".
**Prioridad de producción: primera.** Mejor relación volumen-dificultad del sitio.

### `/temas/sobrepensar-y-rumiacion/`

**Keywords:** cómo dejar de sobrepensar (2,400, KD 22) · rumiación (4,400, KD 41) · dejar de sobrepensar (170, KD 19).
**Pregunta del bloque 2:** cómo dejar de sobrepensar.
**Reconocimiento:** repasar la misma conversación de noche; posponer decisiones buscando certeza; confundir dar vueltas con analizar.
**Mecanismo:** sobrepensar alivia la incertidumbre a corto plazo, y ese alivio lo mantiene.
**Nota:** "rumiación" es término técnico con volumen alto. Se usa nombrado y explicado en una frase, sin que la página abra con la definición.

### `/temas/procrastinacion-y-evitacion/`

**Keywords:** cómo dejar de procrastinar (880, KD 28) · procrastinación (3,600, KD 53).
**Pregunta del bloque 2:** por qué procrastino si sé lo que tengo que hacer.
**Reconocimiento:** la tarea que llevas semanas moviendo de día; empezar por lo fácil; la culpa que hace más difícil empezar.
**Mecanismo:** evitar reduce el malestar de inmediato y refuerza la evitación. La culpa posterior aumenta el costo de arranque.
**Nota:** el término de cabeza está en KD 53. Se apunta a la variante de pregunta (KD 28) y el resto llega por semántica.

## 8. Legales

`/alcance-del-servicio/` no es una página legal más. Con el ADR 001 es pieza de confianza: qué habilita la formación de Alina, qué no, cuándo corresponde otro tipo de atención y cómo se maneja si aparece durante el proceso.

`/aviso-de-privacidad/` conforme a la LFPDPPP. `/terminos-y-condiciones/` incluye pago, cancelación y reprogramación.

Los tres se redactan en la Etapa 6 y se verifican en la Etapa 9.

## 9. Qué queda para las etapas siguientes

- **Etapa 5:** traducir estos bloques a wireframes. La delimitación de alcance necesita espacio propio en la plantilla, no un pie.
- **Etapa 6:** el copy. Los títulos de cada bloque son descriptivos, no definitivos.
- **Etapa 3:** el mecanismo de agendado y si el formulario es propio o de terceros.

## 10. Pendiente de Alina

- **Tarifa y promoción vigente.** La guía lo dejó marcado como pendiente y bloquea la FAQ y `/agendar/`.
- **Los ocho reconocimientos de "¿Para quién es este proceso?"** son el bloque más importante del home. Vale que confirme si en consulta ve alguno que falte o alguno que sobre.
- **Testimonios.** Se decidió no incluirlos en fase 1. Si quiere usarlos, hay que resolver condiciones de anonimato antes de la Etapa 6.
