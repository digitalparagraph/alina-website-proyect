# ADR 011 — El panel del CRM se construye, con contraseña y segundo factor

**Fecha:** 2026-10-16
**Estado:** aceptada
**Etapa:** 5
**Decide:** Damian
**Cierra:** la decisión que `decisiones-abiertas.md` tenía como "acceso al panel del CRM: no se construye por ahora"

## Contexto

El ADR 005 definió el CRM y dejó la autenticación del panel sin resolver. Al salir de Cloudflare Access con el ADR 008 se perdió la autenticación que venía sin escribir código, y `decisiones-abiertas.md` lo aplazó con un argumento que sigue siendo válido: *"un panel con autenticación hecha a la carrera sobre datos de contacto de salud mental es peor que no tener panel."*

Mientras tanto Alina consultaba sus contactos en el correo. Eso funciona para leer un mensaje, pero no para saber en qué estado quedó cada persona, que es justo lo que el CRM existe para registrar.

En el proyecto App Paragraph ya hay un CRM funcionando, con su capa de sesión, permisos y envío.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Seguir sin panel | Cero superficie nueva | El seguimiento por estados, que es la razón del ADR 005, no existe en la práctica |
| Dar de alta a Alina en la app de Paragraph | El CRM ya está hecho y probado | Mete los contactos de sus clientes en la base multicliente de la agencia, contra el espíritu de los ADR 003 y 005. Además su modelo de datos es otro: empresas, suscripción, CAPI |
| **Panel propio con contraseña y segundo factor** | Base propia, un solo usuario, modelo de datos el del ADR 005 | Autenticación escrita por nosotros, que es exactamente lo que había que hacer con cuidado |

## Decisión

Panel propio en `/panel/` de `alinamartinez.mx`, con la base de Alina y un solo usuario.

**La contraseña sola no abre el panel.** Hacen falta contraseña y código TOTP, y mientras el segundo factor no esté confirmado la cuenta no entra.

De App Paragraph se toman las ideas, no los archivos: un solo camino de escritura, el registro de accesos, y la lección del lock de sesión de PHP. El modelo de datos y el de permisos no se portan, porque aquel es un CRM B2B multiusuario y este tiene una tabla y una persona.

### Qué se implementó

- **Contraseña** con `password_hash`, mínimo 12 caracteres.
- **TOTP** propio, RFC 6238 con HMAC-SHA1. Verificado contra los seis vectores de prueba del RFC, no supuesto. Sin librería: el presupuesto de la Etapa 3 es cero peticiones a terceros y eso también vale para arrastrar dependencias.
- **Anti-reuso del código.** Se guarda el último paso de 30 s aceptado y no se admite uno igual o anterior. Sin eso, quien vea el código por encima del hombro tiene medio minuto.
- **Bloqueo** a los 5 intentos fallidos, 15 minutos.
- **Error único.** Falle el correo, la contraseña o el código, el mensaje es el mismo, y cuando el correo no existe se gasta un `password_verify` contra un hash real para que el tiempo de respuesta no delate nada.
- **Sesión** con cookie `Secure`, `HttpOnly`, `SameSite=Strict`, ámbito `/panel/`, caducidad por inactividad a las 2 horas y regeneración del identificador al entrar.
- **CSRF** en toda escritura.
- **Registro de accesos** en `panel_accesos`, que es lo que el ADR 005 pedía como revisable. Caduca a los 12 meses: guardar direcciones IP para siempre no aporta a la revisión.
- **Alta de un solo uso**, protegida además por un token que vive en `config.php`, para que la ventana entre el despliegue y el alta no sea una puerta abierta a quien adivine la URL. Se cierra al confirmar el segundo factor, no al crear el usuario.
- **Retención** de 24 meses por cron, contada desde el último cambio de estado y no desde la llegada: un contacto en proceso no se borra por viejo.

### Qué el panel no puede hacer

Toca dos campos de `contactos`: `estado` y `notas`. No muestra el mensaje del formulario porque no existe en la base, y la interfaz dice con todas sus letras que esto no es expediente clínico y que las notas no son notas de sesión.

## Motivo

La objeción que aplazó este panel era sobre la calidad de la autenticación, no sobre el panel. Atendida esa objeción —segundo factor obligatorio, bloqueo, registro, error único, TOTP verificado contra el estándar— el argumento deja de aplicar.

Meter los contactos en la app de la agencia habría sido más rápido y habría contradicho lo que el propio sitio promete sobre el manejo de esos datos.

## Consecuencias

- **El panel viaja en el despliegue.** Vive en `php/panel/` del repositorio y `npm run preparar --con-php` lo copia. Subirlo a mano habría significado que el primer `npm run subir --reemplazar` se lo llevara, que es el error que ya cometimos con `config.php`.
- **`config.php` queda fuera del docroot** y es lo único que se sube una sola vez.
- **El cron hay que activarlo.** Sin él, el aviso de privacidad declara un plazo de conservación que el sitio no cumple.
- **Si se pierde el secreto del segundo factor no hay recuperación.** Se borra la fila de `panel_usuarios` y se repite el alta. Es deliberado: un flujo de recuperación por correo convierte el buzón en la llave del panel.
- **Una segunda cuenta es una decisión, no un trámite.** El `id` es `TINYINT` a propósito.
