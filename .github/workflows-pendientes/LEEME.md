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
