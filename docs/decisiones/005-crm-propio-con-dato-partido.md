# ADR 005 — CRM propio, con el dato partido

**Fecha:** 2026-09-03
**Estado:** vigente en su razonamiento, reemplazada en su implementación por el ADR 008
**Etapa:** 3
**Decide:** Damian

## Contexto

La conversión del sitio es contacto previo. Sin registro de esos contactos y de qué pasó con cada uno, no se puede saber qué contenido o qué campaña trae gente que efectivamente agenda: solo se sabe cuánta gente envió el formulario, que es una métrica que no distingue entre un lead calificado y uno que había que derivar.

El ADR 003 resolvió no usar servicios de formularios de terceros para que el texto sensible no quedara almacenado en un panel ajeno. Guardarlo en una base propia mejora el control y empeora otra cosa: convierte a Paragraph en custodio de una base donde personas describen por qué buscan ayuda psicológica. Cualquiera del equipo con acceso a la base podría leerlas, y esas personas escribieron para Alina, no para su agencia.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| Sin CRM, solo correo | Cero superficie de datos | Imposible medir conversión real ni optimizar nada |
| CRM con el mensaje completo | Alina ve el historial íntegro en un panel | Paragraph queda como custodio de confidencias; exige consentimiento expreso, cifrado, retención con borrado y control de acceso por rol |
| **CRM con el dato partido** | Da todo lo necesario para optimizar sin que nadie en Paragraph pueda leer las confidencias | Alina consulta el contenido de cada mensaje en su correo, no en el panel |

## Decisión

CRM propio sobre Cloudflare D1, con el dato partido en dos.

**En la base queda lo operativo y de marketing:** identificador, fecha, nombre, correo, página de origen, referente, parámetros UTM, estado y fecha del último cambio de estado.

**El campo abierto de "qué quieres trabajar" no se persiste.** Viaja en la notificación por correo a Alina y no se escribe en la base.

Estados: `nuevo` → `contactado` → `agendado` → `en_proceso`, con las salidas `no_califica` y `derivado`. La última es importante para la medición: un contacto derivado a atención especializada no es un fracaso de campaña, es el ADR 001 funcionando.

Panel mínimo detrás de Cloudflare Access. Sin sistema de autenticación propio.

## Motivo

Es la única de las tres opciones que responde la pregunta de negocio completa sin crear una obligación de custodia desproporcionada. Con origen, UTMs y estados se puede calcular conversión cualificada por página y por campaña, que era lo que faltaba. El texto abierto no aporta nada a ese cálculo y es justo la parte que no debería estar en una base a la que accede una agencia.

## Consecuencias

- El aviso de privacidad debe declarar con precisión qué se guarda, para qué, cuánto tiempo, y el procedimiento de derechos ARCO. Con esta partición puede decir algo verificable en lugar de algo elástico.
- Falta definir política de retención con borrado automático. Pendiente de la implementación.
- **El panel no es un expediente clínico.** El campo de notas es para seguimiento operativo, no para notas de sesión. Debe decirlo en la propia interfaz: si Alina registra información clínica ahí, todo el razonamiento de esta decisión se cae.
- Añade una dependencia (D1) y un panel que hay que mantener.
- Si más adelante se quiere sincronizar con HubSpot, se decide entonces y con consentimiento explícito en el formulario. No se hace por default.
