# Sitio web — Alina Martínez Coaching

Sitio optimizado para búsqueda tradicional (SEO) y para citación en modelos de lenguaje (GEO). Cliente de Paragraph.

Es el primer proyecto de la agencia ejecutado con marco de trabajo por etapas y autorizaciones formales. Su documentación es también la plantilla para los siguientes desarrollos web.

## Si acabas de llegar

Lee **[`docs/como-retomar-el-proyecto.md`](docs/como-retomar-el-proyecto.md)**. Ahí está el orden de lectura, los accesos que necesitas y las decisiones que ya no se discuten.

Para abrir una sesión de Claude sobre este proyecto, usa el prompt de **[`docs/prompt-de-arranque.md`](docs/prompt-de-arranque.md)**.

## Estado

Contrástalo siempre con `docs/aprobaciones/`. Si discrepan, mandan las aprobaciones.

| # | Etapa | Estado |
|---|---|---|
| — | Marco de trabajo | Aprobado |
| 0 | Research y estrategia SEO/GEO | Aprobada por Damian · firma de Alina pendiente |
| 1 | Arquitectura y mapa de sitio | En revisión (PR #2) |
| 2 | Estructura de contenido | No iniciada |
| 3 | Stack técnico y configuraciones | No iniciada |
| 4 | Dirección de arte | No iniciada |
| 5 | Wireframes y secciones | No iniciada |
| 6 | Desarrollo de contenidos | No iniciada |
| 7 | Diseño visual | No iniciada |
| 8 | Implementación | No iniciada |
| 9 | QA y pre-launch | No iniciada |
| 10 | Deploy y medición | No iniciada |

## Documentación

| Documento | Qué contiene |
|---|---|
| [`docs/00-marco-de-trabajo.md`](docs/00-marco-de-trabajo.md) | Las once etapas, quién autoriza cada una, protocolo de gates |
| [`docs/etapa-00-research-seo-geo.md`](docs/etapa-00-research-seo-geo.md) | Demanda de búsqueda, competencia, estrategia GEO, perfil de cliente |
| [`docs/etapa-01-arquitectura.md`](docs/etapa-01-arquitectura.md) | Mapa de sitio, enlazado, datos estructurados, indexación |
| [`docs/mapa-de-sitio.md`](docs/mapa-de-sitio.md) | El mapa de sitio en diagrama |
| [`docs/credenciales.md`](docs/credenciales.md) | Credenciales verificadas y qué restringen |
| [`docs/insumos-requeridos.md`](docs/insumos-requeridos.md) | Qué falta del cliente |
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
