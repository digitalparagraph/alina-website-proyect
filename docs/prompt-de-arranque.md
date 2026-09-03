# Prompt de arranque

Para abrir una sesión nueva de Claude (Cowork o Claude Code) sobre este proyecto. Cópialo tal cual como primer mensaje.

---

```
Voy a trabajar en el sitio web de Alina Martínez Coaching, un proyecto de Paragraph.

Repositorio: https://github.com/digitalparagraph/alina-website-proyect (privado)

Antes de proponer o ejecutar nada, lee en este orden:

1. docs/como-retomar-el-proyecto.md
2. CLAUDE.md
3. docs/00-marco-de-trabajo.md — las etapas y el protocolo de autorizaciones
4. docs/aprobaciones/ — en qué etapa está realmente el proyecto
5. docs/decisiones/ — los ADR, para no reproponer algo ya descartado
6. Los documentos de las etapas ya cerradas, en orden

Reglas que no se negocian:

- Ninguna etapa arranca sin la aprobación registrada de la anterior.
- Se trabaja en ramas etapa/NN-nombre, nunca sobre main. Cada etapa cierra
  con un PR, no con una conversación.
- Los documentos describen el estado vigente, no su historial de cambios.
- Todo el copy se rige por insumos/Guia para desarrollo de contenido.docx.
- Español de México.

Cuando termines de leer, dime en qué etapa está el proyecto, qué quedó
pendiente y qué necesitas de mí para avanzar. No empieces a trabajar hasta
que yo lo confirme.
```

---

## Si la carpeta no está en tu máquina

Añade al final del prompt:

```
Aún no tengo el repositorio localmente. Clónalo primero:
git clone https://github.com/digitalparagraph/alina-website-proyect.git
```

Necesitarás un Personal Access Token fine-grained de GitHub con acceso a este repositorio y permisos de lectura y escritura en Contents y Pull requests.

## Si vas a trabajar una etapa específica

Sustituye el último párrafo por:

```
Me toca la Etapa NN. Confirma primero que la etapa anterior está aprobada en
docs/aprobaciones/. Si lo está, dime qué produce esta etapa según el marco de
trabajo, qué insumos faltan y cuál es tu plan antes de escribir nada.
```
