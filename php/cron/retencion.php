<?php
/**
 * Retención del CRM: borra lo que ya cumplió su plazo. ADR 005 y 011.
 *
 * La política son 24 meses desde el último cambio de estado. No es un número
 * decorativo: el aviso de privacidad declara un plazo y sin este cron el sitio
 * estaría prometiendo algo que no cumple.
 *
 * Corre por CLI, nunca por web. En este servidor el CLI por defecto es PHP 7.4
 * y el web 8.3, así que el código es compatible con 7.4.
 *
 * Cron sugerido, una vez al día:
 *   /opt/alt/php83/usr/bin/php /home/u842740011/domains/alinamartinez.mx/public_html/cron/retencion.php
 */
declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require_once __DIR__ . '/../panel/lib_panel.php';

const RETENCION_MESES = 24;
const ACCESOS_MESES = 12;

$pdo = panel_db();

/* Contactos cuyo plazo venció. Se cuenta desde el último cambio de estado, no
   desde que llegaron: un contacto que sigue en proceso no se borra por viejo. */
$st = $pdo->prepare(
    'DELETE FROM contactos WHERE estado_actualizado_en < DATE_SUB(NOW(), INTERVAL ? MONTH)'
);
$st->execute([RETENCION_MESES]);
$contactos = $st->rowCount();

/* El registro de accesos al panel también caduca. Guardarlo para siempre no
   aporta nada a la revisión y sí acumula direcciones IP. */
$st = $pdo->prepare(
    'DELETE FROM panel_accesos WHERE creado_en < DATE_SUB(NOW(), INTERVAL ? MONTH)'
);
$st->execute([ACCESOS_MESES]);
$accesos = $st->rowCount();

$quedan = (int) $pdo->query('SELECT COUNT(*) FROM contactos')->fetchColumn();

printf(
    "[%s] retencion: %d contacto(s) y %d acceso(s) borrados. Quedan %d contactos.%s",
    date('Y-m-d H:i:s'),
    $contactos,
    $accesos,
    $quedan,
    PHP_EOL
);
