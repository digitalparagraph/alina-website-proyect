/**
 * Pages Function del formulario de contacto.
 *
 * Reglas que vienen de los ADR 003 y 005 y que no son opcionales:
 *
 *  - El campo abierto del mensaje NO se persiste. Viaja al correo de Alina y
 *    nada más. En un sitio de salud mental adyacente ese texto es lo más
 *    sensible que entra, y quien lo escribe lo escribió para ella, no para
 *    la agencia.
 *  - En la base queda solo lo operativo: nombre, correo, origen, UTMs, estado.
 *  - El payload nunca se escribe en logs: puede traer datos personales.
 */

interface Env {
  DB: D1Database;
  CORREO_DESTINO: string;
  API_CORREO: string;
}

const ESTADO_INICIAL = 'nuevo';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let cuerpo: Record<string, unknown>;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ error: 'Cuerpo inválido' }, 400);
  }

  const nombre = limpiar(cuerpo.nombre, 80);
  const correo = limpiar(cuerpo.correo, 160).toLowerCase();
  const mensaje = limpiar(cuerpo.mensaje, 4000);

  if (!nombre || !correo.includes('@') || mensaje.length < 10) {
    return json({ error: 'Faltan datos o el mensaje es muy corto' }, 422);
  }

  // Solo lo operativo. El mensaje no entra aquí.
  const fila = {
    id: crypto.randomUUID(),
    creado_en: new Date().toISOString(),
    nombre,
    correo,
    pagina_origen: limpiar(cuerpo.paginaOrigen, 200),
    referente: limpiar(cuerpo.referente, 200),
    utm_source: limpiar(cuerpo.utm_source, 100),
    utm_medium: limpiar(cuerpo.utm_medium, 100),
    utm_campaign: limpiar(cuerpo.utm_campaign, 100),
    utm_content: limpiar(cuerpo.utm_content, 100),
    utm_term: limpiar(cuerpo.utm_term, 100),
    estado: ESTADO_INICIAL,
    estado_actualizado_en: new Date().toISOString(),
  };

  try {
    await env.DB.prepare(
      `INSERT INTO contactos
         (id, creado_en, nombre, correo, pagina_origen, referente,
          utm_source, utm_medium, utm_campaign, utm_content, utm_term,
          estado, estado_actualizado_en)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
    ).bind(...Object.values(fila)).run();
  } catch {
    // Un fallo de registro no debe impedir que el mensaje llegue a Alina.
    // Se pierde la fila de seguimiento, no el contacto.
  }

  const enviado = await enviarCorreo(env, fila, mensaje);
  if (!enviado) return json({ error: 'No se pudo enviar el mensaje' }, 502);

  return json({ ok: true, id: fila.id }, 202);
};

function limpiar(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function json(datos: unknown, status: number): Response {
  return new Response(JSON.stringify(datos), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

async function enviarCorreo(
  env: Env,
  fila: { id: string; nombre: string; correo: string; pagina_origen: string },
  mensaje: string
): Promise<boolean> {
  // TODO Etapa 5: proveedor de envío pendiente de elegir y documentar como ADR.
  if (!env.API_CORREO) return false;
  return true;
}
