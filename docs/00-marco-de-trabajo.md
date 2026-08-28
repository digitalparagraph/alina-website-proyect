# Marco de trabajo — Sitio Alina Martínez Coaching

## 1. Alcance de este documento

Define cómo se ejecuta el proyecto: qué etapas hay, qué produce cada una, quién la autoriza y qué debe estar cerrado antes de invertir esfuerzo en la siguiente.

Gobierna este sitio y sirve como plantilla para los siguientes desarrollos web de Paragraph.

## 2. Principio de operación

Ninguna etapa que cueste esfuerzo arranca sin el visto bueno de la anterior. Cada etapa cierra con un entregable revisable, no con una conversación.

El mecanismo es siempre el mismo:

1. El entregable de la etapa se sube al repo en una rama `etapa/NN-nombre`.
2. Se abre un Pull Request con el resumen de decisiones y las preguntas abiertas.
3. Quien autoriza revisa y responde en el PR.
4. Al aprobarse se hace merge y se registra el visto bueno en `docs/aprobaciones/NN-nombre.md`.
5. Hasta entonces, la siguiente etapa no empieza.

Un rechazo se documenta en el mismo PR con el motivo. No se corrige en privado.

### Quién autoriza

| Tipo de decisión | Autoriza |
|---|---|
| Técnica: arquitectura, stack, implementación, deploy | Damian |
| De cara al público: contenido, mensajes, look & feel | Damian y Alina |

Damian firma todas las etapas. Alina firma además las etapas 0, 2, 4, 6 y 7.

## 3. Etapas

| # | Etapa | Entregable | Autoriza |
|---|---|---|---|
| 0 | Research y estrategia SEO/GEO | Informe de keywords, intención de búsqueda, competencia, ICP, mapa de entidades y preguntas que responden hoy los modelos de lenguaje sobre este servicio | Damian + Alina |
| 1 | Arquitectura y mapa de sitio | Sitemap, jerarquía de URLs, enlazado interno, plan de indexación. Se deriva de los datos de la etapa 0 | Damian |
| 2 | Estructura de contenido | Modelo de contenido y brief por página: secciones, jerarquía de mensajes, keyword asignada, schema previsto | Damian + Alina |
| 3 | Stack técnico y configuraciones | ADR de stack, hosting, dominio, analítica, formularios, sistema de agendado | Damian |
| 4 | Dirección de arte | Style tile: tipografía, paleta, tratamiento fotográfico, principios visuales. Sin layouts | Damian + Alina |
| 5 | Wireframes y secciones | Wireframes por plantilla, construidos sobre el contenido descrito en la etapa 2 | Damian |
| 6 | Desarrollo de contenidos | Copy final por página, optimizado para búsqueda y para citación en modelos | Damian + Alina |
| 7 | Diseño visual | La dirección de la etapa 4 aplicada a los wireframes de la etapa 5 con el copy de la etapa 6 | Damian + Alina |
| 8 | Implementación | Sitio funcionando en entorno de staging | Damian |
| 9 | QA y pre-launch | Checklist firmado: Core Web Vitals, schema validado, accesibilidad, redirects, legales, indexabilidad | Damian |
| 10 | Deploy y medición | Sitio en producción, Search Console y analítica configurados, línea base registrada | Damian |

### Reglas de secuencia

- La arquitectura se deriva de datos de demanda. La etapa 1 no arranca sin la etapa 0 cerrada.
- La dirección de arte se aprueba en abstracto, sin layouts. Evita rehacer diseño cuando cambia el contenido.
- El copy final entra antes del diseño visual. No se maqueta con texto de relleno.
- Los wireframes no esperan al copy: trabajan con la descripción de contenido de la etapa 2.
- La verificación técnica tiene gate propio. No se resuelve dentro del deploy.

## 4. Workstreams transversales

No son etapas. Son responsabilidades que cruzan varias y se revisan en cada gate.

### E-E-A-T y contenido YMYL

Este es un sitio de salud mental adyacente. Google lo clasifica como YMYL y le aplica un estándar de calidad más alto. Los modelos de lenguaje citan con preferencia fuentes con autoría verificable.

- Las credenciales y formación de Alina deben estar visibles y ser verificables.
- Toda afirmación sobre TCC o ciencias del comportamiento necesita referencia.
- Debe existir política editorial y fecha de revisión por página.
- El alcance del servicio, y su frontera con la psicoterapia, debe estar explícito.

Hay una tensión que se resuelve en la etapa 2: la guía de contenido establece que el protagonista es el proceso y no la coach, mientras que E-E-A-T exige autoría visible. La solución prevista es separar la página de servicio, donde manda el proceso, de una página de autoría con las credenciales.

### Legal

Aviso de privacidad, términos de servicio, política de cookies, políticas de cancelación y reprogramación, y disclaimer de alcance del servicio. Se redactan en la etapa 6 y se verifican en la etapa 9.

### Accesibilidad

Objetivo WCAG 2.2 nivel AA. Se considera desde la etapa 4, en el contraste de la paleta, y se verifica en la etapa 9.

### Medición

Los objetivos de conversión se definen en la etapa 0, se implementan en la etapa 8 y se verifican en la etapa 10.

## 5. Convenciones del repositorio

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

- La documentación canónica vive en GitHub. Drive queda para insumos crudos del cliente.
- Ramas: `etapa/NN-nombre`. Nunca se trabaja directo sobre `main`.
- Toda decisión técnica que descarte alternativas se escribe como ADR en `docs/decisiones`.
- Los commits describen la decisión, no el archivo tocado.
- Los documentos describen el estado vigente. El historial de cambios vive en git, no en el texto.
- Cualquier miembro de Paragraph debe poder leer `/docs` en orden y entender en qué punto está el proyecto y por qué se tomó cada decisión.

## 6. Formato del registro de aprobaciones

Cada archivo en `docs/aprobaciones/` usa esta estructura:

```markdown
# Etapa NN — <nombre>

- Entregable: <ruta o enlace al PR>
- Aprobado por: <nombre>
- Fecha: AAAA-MM-DD
- Observaciones: <ajustes solicitados y cómo se resolvieron>
- Alcance autorizado: <qué queda habilitado a partir de aquí>
```
