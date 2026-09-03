# Cómo retomar el proyecto

Para cualquier persona de Paragraph que entre a este proyecto sin haber estado en las sesiones anteriores.

## 1. Qué es esto

Sitio web para Alina Martínez Coaching, optimizado para búsqueda tradicional y para citación en modelos de lenguaje. Cliente de Paragraph.

Es el primer proyecto que la agencia ejecuta con marco de trabajo por etapas y autorizaciones formales. Su documentación es también la plantilla para los siguientes desarrollos web, así que las convenciones importan más de lo que importarían en un proyecto suelto.

## 2. Orden de lectura

No empieces por el código ni por la etapa que te tocó. En este orden:

1. **`CLAUDE.md`** — reglas de trabajo y criterios de voz. Si usas Claude Code o Cowork, se carga solo.
2. **`docs/00-marco-de-trabajo.md`** — las once etapas, quién autoriza cada una y el protocolo de gates.
3. **`docs/aprobaciones/`** — en qué etapa está realmente el proyecto. Es la única fuente confiable del estado.
4. **`docs/decisiones/`** — los ADR. Antes de proponer un cambio técnico, revisa si la alternativa ya se evaluó y se descartó.
5. **El documento de cada etapa cerrada**, en orden. Las decisiones de la etapa 1 no se entienden sin los datos de la etapa 0.
6. **`insumos/Guia para desarrollo de contenido.docx`** — la voz aprobada por la clienta. Vinculante para todo el copy.

## 3. Estado y punto de entrada

Consulta la tabla de `README.md` y contrástala con `docs/aprobaciones/`. Si discrepan, mandan las aprobaciones.

Regla que no se negocia: **ninguna etapa arranca sin la aprobación registrada de la anterior.** Si la etapa que te asignaron depende de una que no está aprobada, tu trabajo es conseguir esa aprobación, no adelantarte.

## 4. Cómo se trabaja

```bash
git clone https://github.com/digitalparagraph/alina-website-proyect.git
cd alina-website-proyect
git checkout -b etapa/NN-nombre
```

Al cerrar la etapa: commit, push de la rama y abre un PR usando la plantilla que aparece sola. Quien autoriza responde en el PR. Al aprobarse, registra el visto bueno en `docs/aprobaciones/` y haz merge.

Un rechazo se documenta en el mismo PR con el motivo. No se corrige en privado.

### Convenciones

- Ramas `etapa/NN-nombre`. Nunca se trabaja directo sobre `main`.
- Toda decisión técnica que descarte alternativas se escribe como ADR en `docs/decisiones/`, con la plantilla que está ahí.
- Los commits describen la decisión tomada, no el archivo que se tocó.
- Los documentos describen el estado vigente. El historial de cambios vive en git, no en el texto: nada de notas de creación ni comparativas contra versiones anteriores.
- Español de México.

## 5. Accesos y herramientas

| Qué | Dónde / cómo |
|---|---|
| Repositorio | `digitalparagraph/alina-website-proyect`, privado. Pide acceso como colaborador |
| Push por HTTPS | Cada persona usa su propio Personal Access Token fine-grained, con permisos Contents y Pull requests de lectura y escritura, limitado a este repo |
| Semrush | Necesario para las etapas de research y para verificar datos de demanda. Base `mx` |
| Drive del cliente | Carpeta "Alina Martínez". Insumos crudos: logos, fotografía, material original |
| Google Search Console | Se configura en la etapa 10. Aún no existe |

## 6. Qué no está en el repositorio

**Los certificados de Alina.** Contienen CURP y cédula profesional, así que `insumos/*.PDF` está en el `.gitignore`. Los hechos verificados están en `docs/credenciales.md`, que es lo que se necesita para trabajar. Si necesitas los originales, pídelos.

**El dominio y el hosting.** No existen todavía. La decisión es de la etapa 3.

**El sitio anterior.** No hay. El proyecto arranca de cero, sin migración ni redirecciones que respetar.

## 7. Tres cosas que te van a ahorrar tiempo

**El posicionamiento está decidido y hay razones.** "Coaching terapéutico" no tiene demanda de búsqueda —20 consultas al mes— y el sitio no se construye sobre ese término. "Terapeuta cognitivo conductual" tiene 22,200 y se deja pasar deliberadamente. Antes de proponer cualquiera de las dos cosas, lee el ADR 001. El argumento no es de volumen, es de exposición: la formación clínica de Alina no aguanta ese escrutinio.

**Cómo se presenta a Alina.** Coach certificada con formación en terapia cognitivo conductual. Nunca terapeuta cognitivo conductual, psicóloga ni psicoterapeuta. Su certificación ICC es de 2014 y es sólida; su cédula profesional es de otra disciplina.

**Contenido YMYL.** Google aplica un estándar de calidad más alto a este tipo de sitio y los modelos de lenguaje prefieren fuentes con autoría verificable. Toda afirmación sobre TCC necesita referencia, y el alcance del servicio se delimita en el primer bloque visible de nueve páginas, no en el pie.

## 8. Si trabajas desde Cowork con una carpeta local montada

Git funciona, con dos particularidades del entorno:

- Necesita permiso de borrado en la carpeta para manejar sus archivos de bloqueo. Si `git commit` falla con `Operation not permitted` sobre `.git/objects/tmp_obj_*` o `HEAD.lock`, pide ese permiso a la sesión.
- Si aparece `index.lock: File exists`, bórralo y repite: `rm -f .git/index.lock`.
- `gh` CLI no viene instalado. Los PR se pueden abrir por la API de GitHub con curl, o desde la web.
