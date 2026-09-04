# Sitio web — Alina Martínez Coaching

Sitio optimizado para búsqueda tradicional (SEO) y para citación en modelos de lenguaje (GEO). Cliente de Paragraph.

Es el primer proyecto de la agencia ejecutado con marco de trabajo por etapas y autorizaciones formales. Su documentación es también la plantilla para los siguientes desarrollos web.

## Si acabas de llegar

Lee **[`docs/como-retomar-el-proyecto.md`](docs/como-retomar-el-proyecto.md)**. Ahí está el orden de lectura, los accesos que necesitas y las decisiones que ya no se discuten.

Todo lo que falta por definir está en **[`docs/decisiones-abiertas.md`](docs/decisiones-abiertas.md)**, con una decisión por defecto ya tomada para cada cosa.

Para abrir una sesión de Claude sobre este proyecto, usa el prompt de **[`docs/prompt-de-arranque.md`](docs/prompt-de-arranque.md)**.

## Estado

Contrástalo siempre con `docs/aprobaciones/`. Si discrepan, mandan las aprobaciones.

| # | Etapa | Estado |
|---|---|---|
| — | Marco de trabajo | Aprobado |
| 0 | Research y estrategia SEO/GEO | Aprobada |
| 1 | Arquitectura y mapa de sitio | Aprobada |
| 2 | Estructura de contenido | Aprobada |
| 3 | Stack técnico y configuraciones | Aprobada, revisada por el ADR 008 |
| 4 | Sistema de diseño | Aprobada |
| 5 | Implementación | Sitio construido, 16 páginas |
| 6 | Desarrollo de contenidos | Copy escrito, pendiente de revisión de Alina |
| 7 | Revisión sobre el sitio real | No iniciada |
| 8 | QA y pre-launch | No iniciada |
| 9 | Deploy y medición | Staging en Hostinger |

## Documentación

| Documento | Qué contiene |
|---|---|
| [`docs/00-marco-de-trabajo.md`](docs/00-marco-de-trabajo.md) | Las once etapas, quién autoriza cada una, protocolo de gates |
| [`docs/etapa-00-research-seo-geo.md`](docs/etapa-00-research-seo-geo.md) | Demanda de búsqueda, competencia, estrategia GEO, perfil de cliente |
| [`docs/etapa-01-arquitectura.md`](docs/etapa-01-arquitectura.md) | Mapa de sitio, enlazado, datos estructurados, indexación |
| [`docs/etapa-03-stack-tecnico.md`](docs/etapa-03-stack-tecnico.md) | Stack, hosting, formulario, analítica, presupuestos de rendimiento |
| [`docs/mapa-de-sitio.md`](docs/mapa-de-sitio.md) | El mapa de sitio en diagrama |
| [`docs/credenciales.md`](docs/credenciales.md) | Credenciales verificadas y qué restringen |
| [`docs/decisiones-abiertas.md`](docs/decisiones-abiertas.md) | Lo que falta definir, con su valor por defecto |
| [`docs/insumos-requeridos.md`](docs/insumos-requeridos.md) | Qué falta del cliente |
| [`docs/revision-tracker-paragraph.md`](docs/revision-tracker-paragraph.md) | Revisión de Signal, el tracker server-side de Paragraph |
| `docs/decisiones/` | ADRs |
| `docs/aprobaciones/` | Registro de vistos buenos |

## Decisiones que ya no se discuten

Están razonadas en los documentos citados. Reproponerlas sin leer el argumento cuesta tiempo a todos.

- El sitio no se posiciona sobre "coaching terapéutico": 20 búsquedas al mes.
- No se persigue "terapeuta cognitivo conductual" pese a sus 22,200 búsquedas. Ver [ADR 001](docs/decisiones/001-posicionamiento-frente-al-trafico-de-psicoterapia.md).
- Alina se presenta como coach certificada con formación en TCC. Nunca como terapeuta, psicóloga o psicoterapeuta.
- México es el mercado primario. No se hacen páginas por ciudad ni por país.
- No se compite por "terapia en línea": el SERP lo ocupan marketplaces.

## Regla básica

Ninguna etapa arranca sin la aprobación registrada de la anterior.
