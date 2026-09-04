# Workflow pendiente de activar

`ci.yml` está aquí y no en `.github/workflows/` porque el Personal Access Token
usado para el push no tiene el permiso **Workflows**, y GitHub rechaza crear o
modificar workflows sin él.

Para activarlo, cualquiera de las dos:

1. Añadir el permiso **Workflows: Read and write** al token fine-grained y mover
   el archivo a `.github/workflows/ci.yml`.
2. Moverlo desde la interfaz de GitHub, que no pasa por el token.

Mientras no esté activo, el build y la verificación de enlaces no corren solos
en cada PR. Los presupuestos de rendimiento de la Etapa 3 dependen de que corra.

## deploy-hostinger.yml

Compila el sitio y lo sube por FTP a Hostinger en cada push a `main`.

Antes de activarlo, cargar en el repositorio de GitHub:

**Secrets** (Settings → Secrets and variables → Actions → Secrets)

- `HOSTINGER_FTP_SERVER`
- `HOSTINGER_FTP_USER`
- `HOSTINGER_FTP_PASSWORD`

**Variables** (misma pantalla, pestaña Variables)

- `PUBLIC_SITE_URL` — la URL del despliegue
- `PUBLIC_STAGING` — `true` mientras el sitio esté en revisión
- `HOSTINGER_DIR` — normalmente `/public_html/`

Los secretos los carga Damian directamente en GitHub. No pasan por ninguna
sesión ni quedan en el repositorio.

`php/config.php` se sube una sola vez a mano al servidor y el deploy lo
excluye, para que no se pise en cada publicación.
