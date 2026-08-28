# Marco de trabajo — Sitio Alina Martínez Coaching

**Estado:** propuesta, pendiente de autorización
**Versión:** 0.1
**Fecha:** 2026-08-28
**Responsable:** Damian (Paragraph)

---

## 1. Para qué sirve este documento

Define cómo se ejecuta el proyecto: qué etapas hay, qué produce cada una, quién la autoriza y qué tiene que estar cerrado antes de invertir esfuerzo en la siguiente.

Este es el primer proyecto de Paragraph que se trabaja así, por lo que el documento cumple doble función: gobierna este sitio y queda como plantilla para los siguientes desarrollos web.

## 2. Principio de operación

Ninguna etapa que cueste esfuerzo arranca sin el visto bueno de la anterior. Cada etapa cierra con un entregable revisable, no con una conversación.

El mecanismo es el mismo siempre:

1. Se produce el entregable de la etapa y se sube al repo en una rama `etapa/NN-nombre`.
2. Se abre un Pull Request con el resumen de decisiones y las preguntas abiertas.
3. Quien autoriza revisa y responde en el PR.
4. Al aprobarse, se hace merge y se registra el visto bueno en `docs/aprobaciones/NN-nombre.md` con fecha y nombre.
5. Hasta entonces, la siguiente etapa no empieza.

Si una etapa se rechaza, el rechazo se documenta en el mismo PR con el motivo. No se corrige en privado.

### Quién autoriza qué

| Tipo de decisión | Autoriza |
|---|---|
| Técnica: arquitectura, stack, implementación, deploy | Damian |
| De cara al público: contenido, mensajes, look & feel | Damian y Alina |

Alina firma las etapas 0, 2, 4, 6 y 7. Damian firma todas.

## 3. Etapas

La lista original tenía ocho etapas. Esta versión son once. Los cambios y el motivo de cada uno están en la sección 4.

| # | Etapa | Entregable | Autoriza |
|---|---|---|---|
| 0 | Research y estrategia SEO/GEO | Informe de keywords, intención, competencia, ICP y mapa de entidades | Damian + Alina |
| 1 | Arquitectura y mapa de sitio | Sitemap, jerarquía de URLs, enlazado interno, plan de indexación | Damian |
| 2 | Estructura de contenido | Modelo de contenido y brief por página: secciones, jerarquía de mensajes, keyword asignada, schema previsto | Damian + Alina |
| 3 | Stack técnico y configuraciones | ADR de stack, hosting, dominio, analítica, formularios, agendado | Damian |
| 4 | Dirección de arte | Style tile: tipografía, paleta, tratamiento fotográfico, principios visuales. Sin layouts | Damian + Alina |
| 5 | Wireframes y secciones | Wireframes por plantilla, con el contenido descrito de la etapa 2 | Damian |
| 6 | Desarrollo de contenidos | Copy final por página, optimizado para búsqueda y para citación en modelos | Damian + Alina |
| 7 | Diseño visual | Etapa 4 aplicada a etapa 5 con el copy de etapa 6. Diseño listo para maquetar | Damian + Alina |
| 8 | Implementación | Sitio funcionando en entorno de staging | Damian |
| 9 | QA y pre-launch | Checklist firmado: Core Web Vitals, schema validado, accesibilidad, redirects, legales, indexabilidad | Damian |
| 10 | Deploy y medición | Sitio en producción, Search Console y analítica configurados, línea base registrada | Damian |

## 4. Qué cambió respecto a la lista original y por qué

### Se añadió la Etapa 0 (Research)

La arquitectura de un sitio optimizado para búsqueda se deriva de datos de demanda: qué busca la gente, con qué intención, qué está resolviendo la competencia y qué preguntas responden hoy los modelos de lenguaje cuando alguien pregunta por coaching terapéutico. Definir el mapa de sitio antes de tener eso convierte la etapa 1 en una decisión de intuición que después hay que rehacer.

Para GEO hay un trabajo específico que también vive aquí: identificar qué preguntas hace la gente en ChatGPT, Perplexity o Gemini sobre este tipo de servicio, y qué fuentes citan hoy los modelos al responderlas.

### Look & Feel se dividió en dos momentos

En la lista original, Look & Feel iba antes de wireframes. El problema es que diseñar la estética antes de saber qué contenido lleva cada página produce diseño que después no cabe.

La solución no es invertir el orden sin más, porque Alina necesita ver hacia dónde va lo visual antes de aprobar wireframes grises. Por eso se parte en dos:

- **Etapa 4, dirección de arte:** un style tile con tipografía, color, tratamiento de imagen y principios. Es barato de producir, se aprueba rápido y baja el riesgo de una objeción estética tardía.
- **Etapa 7, diseño visual:** la dirección aprobada aplicada a wireframes reales con copy real.

### El contenido se movió antes del diseño visual

Diseñar con texto de relleno y sustituirlo después es la forma más común de romper un diseño. El copy final (etapa 6) entra antes del diseño visual (etapa 7).

Los wireframes (etapa 5) no esperan al copy: trabajan con la descripción de contenido de la etapa 2, que ya define qué dice cada sección aunque no cómo lo dice.

### Se añadió QA y pre-launch como etapa propia

Era el punto ciego de la lista original. Un sitio hiperoptimizado se verifica o no lo está: schema que valida, Core Web Vitals medidos, accesibilidad revisada, legales publicados, robots y sitemap correctos. Si esto vive dentro de "Deploy" se hace con prisa o no se hace.

### Deploy incorpora medición

Publicar sin Search Console conectado y sin línea base deja el proyecto sin forma de demostrar resultado. La etapa 10 cierra con las herramientas configuradas y las métricas de arranque registradas.

## 5. Workstreams transversales

No son etapas. Son responsabilidades que cruzan varias y que se revisan en cada gate.

### E-E-A-T y contenido YMYL

Este es un sitio de salud mental adyacente. Google lo clasifica como YMYL (Your Money or Your Life) y le aplica un estándar de calidad más alto. Los modelos de lenguaje, por su parte, citan con preferencia fuentes con autoría verificable.

Implicaciones prácticas:

- Las credenciales y formación de Alina tienen que estar visibles y ser verificables.
- El contenido que hace afirmaciones sobre TCC o ciencias del comportamiento necesita referencias.
- Debe existir una política editorial y una fecha de revisión por página.
- El alcance del servicio, y su frontera con la psicoterapia, tiene que estar explícito. La guía de contenido ya lo plantea como criterio de comunicación; aquí además es factor de posicionamiento.

Hay una tensión que resolver en la etapa 2: la guía dice que el protagonista es el proceso y no la coach, pero E-E-A-T exige autoría visible. Se resuelve separando la página de servicio (donde manda el proceso) de una página de autoría con las credenciales.

### Legal

Aviso de privacidad, términos de servicio, política de cookies, políticas de cancelación y reprogramación, y el disclaimer de alcance del servicio. Se redactan en la etapa 6 y se verifican en la etapa 9.

### Accesibilidad

Objetivo WCAG 2.2 nivel AA. Se considera desde la etapa 4 (contraste de la paleta) y se verifica en la etapa 9.

### Medición

Los objetivos de conversión se definen en la etapa 0, se implementan en la etapa 8 y se verifican en la etapa 10.

## 6. Convenciones del repositorio

```
/docs
  00-marco-de-trabajo.md      Este documento
  0N-<etapa>.md               Un documento por etapa
  /decisiones                 ADRs: decisiones técnicas con su contexto y consecuencias
  /aprobaciones               Registro de vistos buenos, uno por etapa
/content                      Copy final por página, en markdown
/assets/marca                 Logos, tipografías, fotografía
/insumos                      Material original entregado por el cliente
```

Reglas:

- La documentación canónica vive en GitHub. Drive queda para insumos crudos del cliente.
- Ramas: `etapa/NN-nombre`. Nunca se trabaja directo sobre `main`.
- Toda decisión técnica que descarte alternativas se escribe como ADR en `docs/decisiones`.
- Los commits describen la decisión, no el archivo tocado.
- Cualquier miembro de Paragraph debe poder leer `/docs` en orden y entender en qué punto está el proyecto y por qué se tomó cada decisión.

## 7. Registro de aprobaciones

Cada archivo en `docs/aprobaciones/` usa este formato:

```markdown
# Etapa NN — <nombre>

- Entregable: <ruta o enlace al PR>
- Aprobado por: <nombre>
- Fecha: AAAA-MM-DD
- Observaciones: <ajustes solicitados y cómo se resolvieron>
- Alcance autorizado: <qué queda habilitado a partir de aquí>
```

## 8. Insumos pendientes para arrancar la Etapa 0

Sin esto, el research empieza incompleto:

- [ ] Credenciales, formación y trayectoria de Alina, con soporte verificable
- [ ] Dominio: cuál es, quién lo controla, si ya existe sitio publicado
- [ ] Si hay sitio actual: acceso y datos de tráfico para no perder lo que ya funciona
- [ ] Mercado objetivo: solo México o también resto de LATAM y España
- [ ] Sistema de agendado y de cobro previsto
- [ ] Tarifas y promoción vigente (la guía de contenido lo deja como pendiente)
- [ ] Accesos: Google Analytics, Search Console, Google Business Profile si aplica
- [ ] Perfiles sociales activos y cuáles se enlazan desde el sitio
- [ ] Si hay testimonios utilizables y bajo qué condiciones de anonimato
