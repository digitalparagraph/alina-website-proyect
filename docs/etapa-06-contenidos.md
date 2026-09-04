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
