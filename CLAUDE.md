# Instrucciones del proyecto — Sitio Alina Martínez Coaching

## Contexto

Sitio de coaching terapéutico, optimizado para SEO y GEO. Cliente: Alina Martínez. Agencia: Paragraph.
El proyecto se trabaja de forma colaborativa entre miembros de Paragraph, por lo que todo debe quedar documentado y comiteado.

## Antes de hacer nada

Lee `docs/00-marco-de-trabajo.md`. Define las etapas y el protocolo de autorización.

Después revisa `docs/aprobaciones/` para saber en qué etapa está el proyecto. **No trabajes en una etapa cuya anterior no esté aprobada.**

## Reglas de trabajo

- Documenta toda decisión que descarte alternativas como un ADR en `docs/decisiones/`.
- Trabaja en ramas `etapa/NN-nombre`. Nunca directo sobre `main`.
- Cada etapa cierra con un PR, no con una conversación.
- Los commits describen la decisión tomada, no el archivo modificado.
- Escribe en español de México.

## Criterios de contenido

El documento `insumos/Guia para desarrollo de contenido.docx` contiene la voz aprobada por la clienta y diez criterios de comunicación. Es vinculante para todo el copy. Los puntos que más se incumplen por descuido:

- El protagonista es el proceso, no la coach.
- Prohibido el lenguaje de autoayuda: "tu mejor versión", "transforma tu vida", "desbloquea tu potencial", "cambia tu mentalidad".
- No prometer transformación. Explicar qué hace posible el cambio.
- Cuestionar sin juzgar: "podemos observar qué patrón mantiene esta situación", no "estás saboteando tu vida".
- Hablar de autonomía, nunca de dependencia del proceso.
- Tono sobrio, cálido, contemporáneo. Sin sentimentalismo ni grandilocuencia.
- El objetivo de la voz es que el visitante piense "esto describe lo que me pasa", no "qué interesante es esta coach".

## Consideración crítica

Este es contenido YMYL (salud mental adyacente). Google le aplica un estándar de calidad más alto y los modelos de lenguaje prefieren fuentes con autoría verificable. Toda afirmación sobre TCC o ciencias del comportamiento necesita respaldo, y el alcance del servicio frente a la psicoterapia debe quedar explícito.

## Estilo de la documentación

Los documentos describen el estado vigente del proyecto, no cómo llegaron a serlo. Nada de notas de creación, comparativas contra versiones anteriores ni narración de cambios: eso vive en el historial de git y en los PR. Un documento debe leerse como si siempre hubiera dicho eso.

## Si acabas de entrar al proyecto

Lee `docs/como-retomar-el-proyecto.md` antes que nada. Contiene el orden de lectura, los accesos necesarios y las decisiones que ya están cerradas con su razón.

## Entorno

- `gh` CLI no está instalado. Los PR se abren por la API de GitHub o desde la web.
- Cada persona hace push con su propio Personal Access Token fine-grained. No hay credenciales en el repo ni en el remote.
- Trabajando desde Cowork con carpeta local montada, git necesita permiso de borrado para sus archivos de bloqueo. Si `git commit` falla con `Operation not permitted` sobre `.git/objects/tmp_obj_*` o `HEAD.lock`, pide ese permiso. Si aparece `index.lock: File exists`, borra el archivo y repite.
- `insumos/*.PDF` está en el `.gitignore`: son documentos personales de la clienta con CURP y cédula profesional. Los hechos verificados están en `docs/credenciales.md`.

## Decisiones cerradas

No las repropongas sin leer el argumento. Están en `docs/etapa-00-research-seo-geo.md` y en el ADR 001.

- El sitio no se posiciona sobre "coaching terapéutico". No tiene demanda: 20 búsquedas al mes.
- No se persigue "terapeuta cognitivo conductual" pese a sus 22,200 búsquedas mensuales. El motivo es de exposición, no de volumen.
- Alina se presenta como **coach certificada con formación en terapia cognitivo conductual**. Nunca como terapeuta cognitivo conductual, psicóloga ni psicoterapeuta.
- México es el mercado primario. Sin páginas por ciudad ni por país.
