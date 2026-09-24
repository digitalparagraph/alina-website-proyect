# Etapa 6 — Desarrollo de contenidos

Quince páginas escritas y compilando. Pendientes de revisión de Alina, y dos de revisión legal.

## 1. Cómo se produce el copy

Paragraph redacta contra la guía de contenido y Alina corrige. Cada página pasa por el auditor de huella de IA antes de entregarse a revisión: en un sitio cuyo criterio explícito es no sonar a coaching genérico, entregar texto con marcas de modelo contradice el encargo.

El orden de producción sigue la prioridad de la Etapa 0: primero las páginas de tema de fase 1, después el núcleo, al final las legales.

## 2. Resultado del auditor en la primera página

Pasada mecánica: contraste falso cero, guion largo cero, longitud de oración entre 4 y 30 palabras. El script marcó cuatro señales que aquí no aplican, porque están calibradas para diagnósticos y propuestas: cifras por página, incertidumbre declarada, riesgos y dependencias, y autoría de la recomendación. Una página de servicio que declarara riesgos y dependencias sería absurda.

Pasada de juicio: la única falla real fue **simetría**. Las tres secciones pesaban 151, 127 y 147 palabras con cuatro párrafos cada una. Tres bloques del mismo tamaño es señal de que nadie priorizó.

Corregido a 185, 128 y 147 palabras, con 5, 3 y 4 párrafos. La sección de mecanismo pesa más porque es la que diferencia esta página de un blog de psicología genérico; la de "por qué entenderlo no alcanza" dice una sola cosa y no necesitaba cuatro párrafos.

## 3. Desviación deliberada del auditor

El módulo de títulos exige sintagmas nominales sin verbo conjugado. Los encabezados de esta página no lo son: "Qué sostiene el patrón", "Por qué entenderlo no alcanza".

Se aplica la excepción a propósito. En un documento el encabezado sirve para navegar; en una página web es superficie de búsqueda y de extracción por modelos de lenguaje. Un `h2` con la forma de la pregunta que la gente escribe funciona mejor que un sustantivo suelto.

El resto del catálogo se aplica sin excepciones.

## 4. Pendiente en esta página

**Falta la referencia.** El proyecto estableció que toda afirmación sobre TCC o ciencias del comportamiento necesita respaldo. La sección de mecanismo describe cómo el alivio inmediato refuerza una conducta, y no cita ninguna fuente.

No la invento. Es Alina quien decide qué fuente sostiene, y esa elección también dice algo sobre su criterio profesional. Sin esto, la página queda por debajo del estándar E-E-A-T que el propio sitio se fijó.

## 5. Preguntas de revisión para Alina

Más allá de si el texto le gusta, tres cosas que solo ella puede contestar:

1. **El mecanismo.** ¿Es así como lo explicaría? Es la parte donde su criterio profesional está en juego y donde un error se nota.
2. **La prueba del párrafo cinco.** "Piensa en alguien a quien respetas haciendo exactamente lo que tú hiciste esta semana." ¿Es una intervención que ella usaría, o suena a ejercicio de manual?
3. **El cierre.** "Los estándares no desaparecen. Se vuelven una decisión." ¿Promete de más?

## 6. Estado por página

| Página | Estado |
|---|---|
| `/` | Escrita |
| `/temas/autoexigencia-y-perfeccionismo/` | Escrita |
| `/temas/sobrepensar-y-rumiacion/` | Escrita |
| `/temas/procrastinacion-y-evitacion/` | Escrita |
| `/temas/` | Escrita |
| `/proceso/` | Escrita |
| `/proceso/primera-sesion/` | Escrita |
| `/que-es-el-coaching-terapeutico/` | Escrita |
| `/terapia-o-coaching/` | Escrita |
| `/sobre-alina/` | Escrita |
| `/preguntas-frecuentes/` | Escrita, falta la tarifa |
| `/agendar/` | Escrita |
| `/alcance-del-servicio/` | Escrita, falta la línea de apoyo en crisis |
| `/aviso-de-privacidad/` | Borrador, requiere revisión legal. `noindex` |
| `/terminos-y-condiciones/` | Borrador, requiere revisión legal y tarifa. `noindex` |

## 7. Auditoría del sitio completo

5,488 palabras. Contraste falso: cero, tras corregir tres apariciones. Guion largo decorativo: cero. Enlaces internos rotos: cero.

Las tres correcciones de contraste fueron en `/sobre-alina/`, `/proceso/` y la página de procrastinación. Una de ellas venía textual de la guía de contenido —"el objetivo no es convertirte en otra persona"— y se reescribió en positivo conservando el sentido. Vale avisarlo a Alina, porque es su frase.

El auditor marca 19 encabezados con verbo conjugado. Es la desviación deliberada de la sección 3.

## 8. Dos páginas que no se publican todavía

El aviso de privacidad y los términos llevan `noindex` y un aviso visible de borrador. Describen con precisión lo que el sistema hace de verdad, según los ADR 003 y 005, y marcan lo que falta: responsable y domicilio, plazo de conservación, procedimiento de derechos ARCO, tarifa, y condiciones de cancelación.

No se inventan. Un aviso de privacidad redactado a ojo en un sitio que recibe datos de salud mental es un riesgo real, y además el sitio ya promete cosas concretas sobre el manejo de esos datos que conviene que un abogado revise antes de firmarlas.

En `/alcance-del-servicio/` falta la línea de apoyo en crisis para México. Es requisito antes de publicar: alguien en esa situación puede llegar a ese sitio.

## 9. Candado de staging

Mientras `PUBLIC_STAGING` no sea `false`, el sitio se comporta como despliegue de revisión:

- `noindex,nofollow` en todas las páginas.
- `robots.txt` cierra el sitio entero.
- Banda visible arriba de cada página avisando que el contenido está pendiente de aprobación.

Se apaga el día del lanzamiento, con dominio propio. Un sitio de pruebas con el copy real indexado antes de tiempo compite con el definitivo y expone borradores.

## 10. Primera revisión de Alina

Tres observaciones, recibidas por ClickUp. Las tres tocan el copy y dos revelaron un defecto de fondo, no una preferencia.

### El titular del home no decía lo que la guía dice

Decía *"Hay cosas que entiendes perfectamente y aun así sigues haciendo"*. Su propio subtítulo dice *"Saber que necesitas poner un límite no es lo mismo que poder ponerlo"*. Apuntan en direcciones opuestas: uno habla de **seguir haciendo** algo que entiendes, el otro de **no poder hacer** algo que sabes que necesitas.

La guía es inequívoca: *"Una persona puede saber perfectamente que necesita poner un límite, dejar de procrastinar, bajar su autoexigencia o dejar de darle vueltas a una situación y, aun así, seguir sin poder hacerlo."*

El titular vigente es **"Entender qué te pasa no siempre alcanza para cambiarlo"**: nombra el mecanismo sin cerrar ninguna de las dos direcciones, y sostiene lo que la guía marca como la diferencia de fondo frente al coaching que reduce todo a cambiar la mentalidad.

El brief de la Etapa 2 describía ese bloque como "entender algo y aun así seguir haciéndolo". Esa formulación queda corregida ahí mismo: era la que producía el titular rechazado.

### Los temas se sentían limitados porque el home no cumplía su brief

Alina pidió incluir relaciones, hábitos de vida, propósito y metas, y procesos de cambio. Las cuatro ya estaban en su propia guía y ya estaban mapeadas en la Etapa 1. El problema no era el alcance del servicio, era lo que el sitio mostraba de él.

El brief del home pide en el bloque 3 **las cinco categorías** de "¿Qué puedes trabajar?". Lo construido mostraba tres tarjetas: las tres páginas de fase 1. El visitante leía tres patrones estrechos donde el servicio cubre cinco áreas.

Ahora el home muestra las cinco, con las palabras de la guía, y `/temas/` cierra con las que todavía no tienen página. Las de fase 2 se nombran y no se enlazan: la decisión de lanzar con tres páginas serias en lugar de seis delgadas sigue en pie, y el motivo que dio la Etapa 2 para no mostrarlas —el enlace roto y la página vacía— se respeta, porque no hay ninguno de los dos.

Las cinco áreas viven en `src/data/areas-de-trabajo.ts`, en una sola fuente, para que el home y el índice no puedan divergir.

### Qué faltaba de la guía

La tercera observación —"podemos desarrollar más con la guía"— se convirtió en una comparación de cada sección de la guía contra el texto del sitio.

La comparación automática es por coincidencia de frases y marcó siete secciones como ausentes. Revisadas a mano, cuatro eran paráfrasis que el comparador no reconoció y ya estaban escritas:

| Marcado como ausente | Dónde estaba en realidad |
|---|---|
| "¿Qué tipo de trabajo se hace durante el proceso?" | `/proceso/`, sección "Qué puede incluir" |
| "¿Cómo sé si esto es para mí?" | `/proceso/primera-sesion/`, sección "También la evalúas tú" |
| "¿Qué suele frenar a alguien…?" | Home, bloque de objeción |
| Fila "Coaching ejecutivo" | `/terapia-o-coaching/`, ya está en la tabla |

Quedaron tres huecos reales, los tres asignados por la Etapa 2 a una página concreta y nunca redactados:

| Material de la guía | Dónde vive ahora |
|---|---|
| "¿Me van a decir qué tengo que hacer?" | `/proceso/`, sección "Quién decide qué se trabaja", antes de las fases |
| "¿Realmente sirve esto?" | `/que-es-el-coaching-terapeutico/`, sección "Qué tan bien funciona" |
| "Debería poder manejarlo solo" | Home, tercer párrafo del bloque de objeción |

Los tres pasaron el auditor de huella de IA. La única falla real fue un contraste falso —"lo que detiene no es la duda sobre el proceso, sino…"— que se corrigió quitando la negación: la cláusula no aportaba nada. Las dos marcas que quedan son las desviaciones ya declaradas en las secciones 2 y 3: cifras por página, que no aplica a una página de servicio, y encabezados con verbo conjugado, que aquí son deliberados.

**La sección sobre evidencia deja un hueco marcado y visible.** Dice que la evidencia disponible sobre intervenciones basadas en TCC respalda el trabajo estructurado, y esa es la única afirmación del sitio que necesita referencia. La elige Alina: cuál fuente sostiene es también una declaración de su criterio profesional. Junto a la afirmación va la advertencia de la propia guía, que ningún enfoque funciona igual para todas las personas ni garantiza un resultado.
