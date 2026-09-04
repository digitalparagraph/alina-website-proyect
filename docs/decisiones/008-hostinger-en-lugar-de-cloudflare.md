# ADR 008 — Hostinger en lugar de Cloudflare Pages

**Fecha:** 2026-09-04
**Estado:** aceptada
**Etapa:** 3, revisada
**Decide:** Damian
**Reemplaza parcialmente:** ADR 003 y ADR 005

## Contexto

El ADR 003 eligió Cloudflare Pages, con una Pages Function para el formulario, y el ADR 005 puso el CRM sobre D1. Damian decidió alojar en Hostinger.

Hostinger es hosting compartido con Apache o LiteSpeed, PHP y MySQL. No tiene Pages Functions, no tiene D1 y no tiene Cloudflare Access.

## Qué se conserva

Las razones de los ADR 003 y 005 no dependían de Cloudflare. Se mantienen íntegras:

- **Sin servicio de formularios de terceros.** El texto que alguien escribe explicando por qué busca ayuda no se almacena en el panel de un proveedor.
- **El campo abierto no se persiste.** Viaja por correo a Alina y no entra a la base.
- **En la base solo lo operativo:** nombre, correo, origen, parámetros de campaña y estado.
- **`derivado` se cuenta aparte** en los reportes.
- **El panel no es expediente clínico.**
- **Sin cookies ni banner** mientras no haya pauta.
- **Tipografía autoalojada, cero peticiones a terceros.**

## Qué cambia

| Pieza | Antes | Ahora |
|---|---|---|
| Servidor | Cloudflare Pages | Hostinger, Apache o LiteSpeed |
| Formulario | Pages Function en TypeScript | Script PHP |
| Base del CRM | Cloudflare D1 | MySQL |
| Acceso al panel | Cloudflare Access | Autenticación propia, pendiente de decidir |
| Despliegue | Automático desde `main` | Build en GitHub Actions y subida por FTP o SFTP |
| Rutas y cabeceras | Configuración de la plataforma | `.htaccess` versionado en `public/` |

## Motivo

Es la infraestructura donde Paragraph quiere operar el sitio. PHP y MySQL son terreno conocido para el equipo, lo que reduce la dependencia de una sola persona para mantenerlo.

## Consecuencias

- **El build no ocurre en el servidor.** Hostinger compartido no corre Node en el despliegue, así que el sitio se compila en CI y se sube ya construido. Sin CI, se sube a mano.
- **Las credenciales de FTP viven como secretos de GitHub**, cargadas por Damian. No pasan por esta sesión ni quedan en el repo.
- **El presupuesto de LCP se revisa.** El objetivo de 2.0 s se fijó contando con una red de borde. En hosting compartido depende del plan y de dónde esté el servidor; se mide en la Etapa 8 y se ajusta el objetivo o el plan, no el sitio.
- **El panel del CRM necesita autenticación propia.** Cloudflare Access la resolvía sin escribir código. Queda pendiente y no bloquea el lanzamiento: el formulario puede funcionar solo con correo mientras tanto.
- **Hay que confirmar la versión de PHP** del plan antes de fijar el código del formulario.
