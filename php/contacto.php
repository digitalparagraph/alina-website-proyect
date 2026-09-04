<?php
/**
 * Formulario de contacto. Sustituye a la Pages Function del ADR 003 tras el
 * cambio a Hostinger (ADR 008).
 *
 * Reglas que no son opcionales:
 *  - El campo abierto del mensaje NO se guarda. Se envía por correo a Alina y
 *    nada más. En un sitio de salud mental adyacente ese texto es lo más
 *    sensible que entra, y quien lo escribe lo escribe para ella.
 *  - En la base queda solo lo operativo.
 *  - El contenido del mensaje nunca se escribe en logs.
 *
 * Acepta dos formas de envío, y por eso el mensaje nunca viaja en una URL:
 *  - JSON, que es lo que manda el script de /agendar/.
 *  - Formulario clásico, que es lo que manda el navegador si el script no
 *    carga. En ese caso responde con una página mínima, porque quien llega así
 *    no tiene JavaScript para leer un JSON.
 */
declare(strict_types=1);

require __DIR__ . '/config.php';   // no se versiona; ver config.example.php

$tipoEntrada = $_SERVER['CONTENT_TYPE'] ?? '';
$esJson = stripos($tipoEntrada, 'application/json') !== false;

/**
 * Cierra la petición en el formato que el cliente puede leer.
 * El texto es el mismo en los dos casos; solo cambia el envoltorio.
 */
function responder(int $codigo, bool $ok, string $texto, array $extra = []): void
{
    global $esJson;
    http_response_code($codigo);

    if ($esJson) {
        header('Content-Type: application/json; charset=utf-8');
        exit(json_encode(
            $ok ? ['ok' => true] + $extra : ['error' => $texto],
            JSON_UNESCAPED_UNICODE
        ));
    }

    header('Content-Type: text/html; charset=utf-8');
    $t = htmlspecialchars($texto, ENT_QUOTES, 'UTF-8');
    exit(<<<HTML
    <!doctype html>
    <html lang="es-MX">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="robots" content="noindex,nofollow">
      <title>Formulario de contacto</title>
      <style>
        body{margin:0;padding:48px 24px;background:#FFFBF2;color:#1A1A1A;
          font:300 17px/1.65 system-ui,-apple-system,"Helvetica Neue",sans-serif}
        main{max-width:62ch;margin-inline:auto}
        a{color:inherit}
      </style>
    </head>
    <body>
      <main>
        <p>{$t}</p>
        <p><a href="/">Volver al inicio</a></p>
      </main>
    </body>
    </html>
    HTML);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    responder(405, false, 'Método no permitido.');
}

// Solo se aceptan envíos desde el propio sitio.
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origen !== '' && !in_array($origen, ORIGENES_PERMITIDOS, true)) {
    responder(403, false, 'Origen no permitido.');
}

if ($esJson) {
    $entrada = json_decode(file_get_contents('php://input') ?: '[]', true);
} else {
    // Envío nativo del navegador, sin el script de la página.
    $entrada = $_POST;
}
if (!is_array($entrada)) {
    responder(400, false, 'Cuerpo inválido.');
}

$limpiar = static fn($v, int $max): string =>
    is_string($v) ? mb_substr(trim(strip_tags($v)), 0, $max) : '';

$nombre  = $limpiar($entrada['nombre'] ?? null, 80);
$correo  = mb_strtolower($limpiar($entrada['correo'] ?? null, 160));
$mensaje = $limpiar($entrada['mensaje'] ?? null, 4000);

// Campo trampa: los bots lo llenan, las personas no lo ven.
if ($limpiar($entrada['sitio_web'] ?? null, 200) !== '') {
    responder(202, true, 'Mensaje recibido.');
}

if ($nombre === '' || !filter_var($correo, FILTER_VALIDATE_EMAIL) || mb_strlen($mensaje) < 10) {
    responder(422, false, 'Faltan datos o el mensaje es muy corto. Vuelve a intentar.');
}

// Límite por IP: 3 envíos por hora.
$ventana = sys_get_temp_dir() . '/alina_' . md5($_SERVER['REMOTE_ADDR'] ?? 'sin-ip');
$previos = file_exists($ventana) ? (int) file_get_contents($ventana) : 0;
if ($previos >= 3 && (time() - filemtime($ventana)) < 3600) {
    responder(429, false, 'Demasiados envíos. Intenta más tarde.');
}
file_put_contents($ventana, (string) ($previos + 1));

$id = bin2hex(random_bytes(16));

// --- Base de datos: solo lo operativo. No hay columna para el mensaje. ---
try {
    $pdo = new PDO(DSN, DB_USUARIO, DB_CLAVE, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    $pdo->prepare(
        'INSERT INTO contactos
           (id, creado_en, nombre, correo, pagina_origen, referente,
            utm_source, utm_medium, utm_campaign, utm_content, utm_term,
            estado, estado_actualizado_en)
         VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, "nuevo", NOW())'
    )->execute([
        $id, $nombre, $correo,
        $limpiar($entrada['paginaOrigen'] ?? null, 200),
        $limpiar($entrada['referente'] ?? null, 200),
        $limpiar($entrada['utm_source'] ?? null, 100),
        $limpiar($entrada['utm_medium'] ?? null, 100),
        $limpiar($entrada['utm_campaign'] ?? null, 100),
        $limpiar($entrada['utm_content'] ?? null, 100),
        $limpiar($entrada['utm_term'] ?? null, 100),
    ]);
} catch (Throwable $e) {
    // Que falle el registro no debe impedir que el mensaje llegue a Alina.
    // Se pierde la fila de seguimiento, no el contacto. Sin volcar el payload.
    error_log('contacto: fallo al registrar ' . $id);
}

// --- Correo: aquí sí va el mensaje completo, y solo aquí. ---
$cuerpo = "Nuevo contacto desde el sitio\n\n"
        . "Nombre: {$nombre}\n"
        . "Correo: {$correo}\n"
        . "Página de origen: " . $limpiar($entrada['paginaOrigen'] ?? null, 200) . "\n"
        . "Referencia de seguimiento: {$id}\n\n"
        . "Mensaje:\n{$mensaje}\n";

$cabeceras = [
    'From: ' . CORREO_REMITENTE,
    'Reply-To: ' . $correo,
    'Content-Type: text/plain; charset=utf-8',
];

if (!mail(CORREO_DESTINO, 'Contacto desde el sitio', $cuerpo, implode("\r\n", $cabeceras))) {
    responder(502, false, 'No se pudo enviar el mensaje. Vuelve a intentar en un momento.');
}

responder(
    202,
    true,
    'Tu mensaje llegó al correo de Alina. Te responde ahí para acordar el horario.',
    ['id' => $id]
);
