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
 */
declare(strict_types=1);

require __DIR__ . '/config.php';   // no se versiona; ver config.example.php

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Método no permitido']));
}

// Solo se aceptan envíos desde el propio sitio.
$origen = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origen !== '' && !in_array($origen, ORIGENES_PERMITIDOS, true)) {
    http_response_code(403);
    exit(json_encode(['error' => 'Origen no permitido']));
}

$entrada = json_decode(file_get_contents('php://input') ?: '[]', true);
if (!is_array($entrada)) {
    http_response_code(400);
    exit(json_encode(['error' => 'Cuerpo inválido']));
}

$limpiar = static fn($v, int $max): string =>
    is_string($v) ? mb_substr(trim(strip_tags($v)), 0, $max) : '';

$nombre  = $limpiar($entrada['nombre'] ?? null, 80);
$correo  = mb_strtolower($limpiar($entrada['correo'] ?? null, 160));
$mensaje = $limpiar($entrada['mensaje'] ?? null, 4000);

// Campo trampa: los bots lo llenan, las personas no lo ven.
if ($limpiar($entrada['sitio_web'] ?? null, 200) !== '') {
    http_response_code(202);
    exit(json_encode(['ok' => true]));
}

if ($nombre === '' || !filter_var($correo, FILTER_VALIDATE_EMAIL) || mb_strlen($mensaje) < 10) {
    http_response_code(422);
    exit(json_encode(['error' => 'Faltan datos o el mensaje es muy corto']));
}

// Límite por IP: 3 envíos por hora.
$ventana = sys_get_temp_dir() . '/alina_' . md5($_SERVER['REMOTE_ADDR'] ?? 'sin-ip');
$previos = file_exists($ventana) ? (int) file_get_contents($ventana) : 0;
if ($previos >= 3 && (time() - filemtime($ventana)) < 3600) {
    http_response_code(429);
    exit(json_encode(['error' => 'Demasiados envíos. Intenta más tarde.']));
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
    http_response_code(502);
    exit(json_encode(['error' => 'No se pudo enviar el mensaje']));
}

http_response_code(202);
echo json_encode(['ok' => true, 'id' => $id]);
