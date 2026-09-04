# ADR 004 — Analítica sin identificadores al lanzar, con ruta a medición server-side

**Fecha:** 2026-09-03
**Estado:** aceptada
**Etapa:** 3
**Decide:** Damian

## Contexto

El sitio necesita medición para cerrar la Etapa 10. La opción por default de la industria es Google Analytics 4, que instala identificadores persistentes y obliga a pedir consentimiento.

Un banner de consentimiento tiene tres costos aquí: degrada las métricas de rendimiento que exige la Etapa 9, es lo primero que ve alguien que llegó buscando ayuda con un problema personal, y contradice la dirección visual sobria que establece la guía de contenido.

Contra eso pesa la atribución: si hay inversión publicitaria, no poder saber qué campaña trae gente que efectivamente agenda hace la inversión ciega.

### Una precisión que cambia el cálculo

La medición server-side **no elimina la obligación de consentimiento.** Esa obligación no depende de dónde corre el script, sino de si se guarda o lee un identificador en el dispositivo y de si se procesan datos personales para una finalidad que lo requiere. Un contenedor server-side que pone una cookie de primera parte para unir sesiones, o que reenvía datos a Google o Meta, necesita consentimiento igual.

Lo que el server-side sí aporta: menos JavaScript en el cliente, resistencia a bloqueadores, mejor calidad de dato y control sobre qué campos se reenvían. Es la forma correcta de medir *cuando ya hay consentimiento*, no una alternativa a pedirlo.

La disyuntiva real, entonces, no es banner contra server-side. Es tener atribución de campañas o no tenerla.

## Alternativas evaluadas

| Opción | A favor | En contra |
|---|---|---|
| GA4 desde el lanzamiento | Estándar, atribución completa | Banner obligatorio sin que haya campañas que atribuir |
| **Sin identificadores al lanzar, con ruta a server-side** | Sin banner mientras el tráfico sea orgánico; el CRM guarda origen y UTMs desde el día uno, así que añadir la capa de consentimiento después no obliga a rehacer nada | Sin atribución multisesión en el periodo inicial |
| Sin identificadores, definitivo | Máxima simplicidad | Cierra la puerta a medir pauta sin rediseñar la medición |

## Decisión

Al lanzar: analítica sin identificadores persistentes y sin banner de cookies. Search Console como fuente de datos de búsqueda.

**El CRM guarda página de origen y parámetros UTM desde el primer día** (ver ADR 005). Eso da atribución de última interacción sin identificar a nadie ni requerir consentimiento.

Cuando entre inversión publicitaria: se añade medición server-side con su capa de consentimiento, diseñada como parte del sitio y no como parche. Esta decisión se reabre entonces.

**Candidato pendiente de revisión.** Paragraph desarrolló un tracker server-side propio y este sitio es candidato a servir como caso de prueba. No está comprometido en la arquitectura: depende de una revisión técnica cuyo alcance está en `revision-tracker-paragraph.md`. Lo que la decide es si escribe identificadores persistentes, si puede capturar contenido de formularios y si reenvía datos a plataformas externas. Si la revisión sale bien se añade con un ADR propio; si no, el sitio no depende de nada.

## Motivo

Damian confirmó que no hay pauta planeada por ahora, pero que puede haberla. Poner un banner de consentimiento antes de tener campañas que atribuir es pagar el costo sin recibir el beneficio.

Guardar origen y UTMs en el CRM cubre la mayor parte del valor: permite saber qué página y qué campaña trajeron a alguien que llegó a contactar, que es la pregunta que de verdad importa. Lo que falta es la ruta completa entre visitas, y eso se acepta.

## Consecuencias

- Sin atribución multisesión al inicio. El perfil de cliente investiga bastante antes de contactar, así que habrá recorridos que no se van a poder reconstruir.
- El objetivo de conversión se mide como envío de formulario y clic al enlace de WhatsApp, y se cualifica con los estados del CRM: un envío no es una conversión hasta que Alina lo marca como agendado.
- Cualquier dependencia futura que instale identificadores obliga a reabrir este ADR. No se añade ninguna sin hacerlo.
- Si el sitio recibe tráfico relevante de España, aplica GDPR y la evaluación cambia. Hay que revisarlo con asesoría legal antes de invertir en pauta hacia allá.
