<?php
/**
 * Motor del panel del CRM. ADR 011.
 *
 * Escrito para PHP 7.4 a propósito: en este servidor el web corre 8.3 pero el
 * CLI es 7.4, y el cron de retención comparte este archivo. Sintaxis de 7.4
 * funciona en las dos; al revés no.
 *
 * Qué resuelve, en orden de importancia:
 *
 *  1. La puerta. Contraseña con `password_hash` más segundo factor TOTP, con
 *     bloqueo por intentos y registro de cada acceso. El propio proyecto había
 *     aplazado este panel porque "autenticación hecha a la carrera sobre datos
 *     de contacto de salud mental es peor que no tener panel".
 *  2. Que el panel no pueda convertirse en expediente. Solo toca `contactos`
 *     y únicamente dos campos: `estado` y `notas`.
 *  3. Que una petición no autenticada no llegue a ver nada.
 */
declare(strict_types=1);

require_once __DIR__ . '/../../config.php';

const PANEL_INTENTOS_MAX   = 5;
const PANEL_BLOQUEO_MIN    = 15;
const PANEL_SESION_MINUTOS = 120;
const PANEL_NOTAS_MAX      = 2000;

/* ---------------------------------------------------------------- base ---- */

function panel_db(): PDO
{
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO(DSN, DB_USUARIO, DB_CLAVE, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}

/* -------------------------------------------------------------- sesión ---- */

function panel_sesion_iniciar(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    // Secure va sin condicional: el sitio fuerza HTTPS en el .htaccess, así que
    // una sesión por HTTP no debería existir, y si existiera no la queremos.
    session_name('alina_panel');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/panel/',
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

/** Cierra la sesión del todo, cookie incluida. */
function panel_sesion_terminar(): void
{
    panel_sesion_iniciar();
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], true, true);
    }
    session_destroy();
}

/** El usuario de la sesión, o null. Caduca por inactividad. */
function panel_usuario_actual(): ?array
{
    panel_sesion_iniciar();
    if (empty($_SESSION['panel_uid']) || empty($_SESSION['panel_visto'])) {
        return null;
    }
    if (time() - (int) $_SESSION['panel_visto'] > PANEL_SESION_MINUTOS * 60) {
        panel_sesion_terminar();
        return null;
    }
    $_SESSION['panel_visto'] = time();

    $st = panel_db()->prepare('SELECT id, correo FROM panel_usuarios WHERE id = ?');
    $st->execute([(int) $_SESSION['panel_uid']]);
    $u = $st->fetch();
    return $u === false ? null : $u;
}

/** Puerta de cada pantalla. Sin sesión, al login y se acabó. */
function panel_exigir_sesion(): array
{
    $u = panel_usuario_actual();
    if ($u === null) {
        header('Location: entrar.php');
        exit;
    }
    return $u;
}

/* ----------------------------------------------------------------- CSRF --- */

function panel_csrf(): string
{
    panel_sesion_iniciar();
    if (empty($_SESSION['panel_csrf'])) {
        $_SESSION['panel_csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['panel_csrf'];
}

function panel_csrf_valido(?string $enviado): bool
{
    panel_sesion_iniciar();
    return is_string($enviado)
        && !empty($_SESSION['panel_csrf'])
        && hash_equals($_SESSION['panel_csrf'], $enviado);
}

/* ----------------------------------------------------------------- TOTP --- */
/* RFC 6238 a mano. Sin librería: el presupuesto de la Etapa 3 es cero
   peticiones a terceros y eso también vale para arrastrar dependencias. */

const PANEL_B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function panel_b32_encode(string $bin): string
{
    $bits = '';
    for ($i = 0, $n = strlen($bin); $i < $n; $i++) {
        $bits .= str_pad(decbin(ord($bin[$i])), 8, '0', STR_PAD_LEFT);
    }
    $salida = '';
    foreach (str_split($bits, 5) as $trozo) {
        $salida .= PANEL_B32[bindec(str_pad($trozo, 5, '0', STR_PAD_RIGHT))];
    }
    return $salida;
}

function panel_b32_decode(string $b32): string
{
    $b32 = strtoupper(preg_replace('/[^A-Z2-7]/i', '', $b32));
    $bits = '';
    for ($i = 0, $n = strlen($b32); $i < $n; $i++) {
        $pos = strpos(PANEL_B32, $b32[$i]);
        if ($pos === false) {
            continue;
        }
        $bits .= str_pad(decbin($pos), 5, '0', STR_PAD_LEFT);
    }
    $bin = '';
    foreach (str_split($bits, 8) as $byte) {
        if (strlen($byte) === 8) {
            $bin .= chr(bindec($byte));
        }
    }
    return $bin;
}

function panel_totp_secreto(): string
{
    return panel_b32_encode(random_bytes(20));
}

/** Código de 6 dígitos para un paso de 30 s. */
function panel_totp_codigo(string $secretoB32, int $paso): string
{
    $clave = panel_b32_decode($secretoB32);
    $contador = pack('J', $paso);                   // 64 bits, big endian
    $hmac = hash_hmac('sha1', $contador, $clave, true);
    $desplazamiento = ord($hmac[19]) & 0x0F;
    $trozo = substr($hmac, $desplazamiento, 4);
    $numero = unpack('N', $trozo)[1] & 0x7FFFFFFF;
    return str_pad((string) ($numero % 1000000), 6, '0', STR_PAD_LEFT);
}

/**
 * Verifica un código y devuelve el paso aceptado, o null.
 *
 * Tolera un paso arriba y uno abajo, porque el reloj del teléfono y el del
 * servidor nunca coinciden al segundo. `$ultimoPaso` impide reusar un código
 * ya gastado dentro de esa misma ventana.
 */
function panel_totp_verificar(string $secretoB32, string $codigo, ?int $ultimoPaso): ?int
{
    $codigo = preg_replace('/\D/', '', $codigo);
    if (strlen($codigo) !== 6) {
        return null;
    }
    $ahora = (int) floor(time() / 30);
    for ($d = -1; $d <= 1; $d++) {
        $paso = $ahora + $d;
        if ($ultimoPaso !== null && $paso <= $ultimoPaso) {
            continue;
        }
        if (hash_equals(panel_totp_codigo($secretoB32, $paso), $codigo)) {
            return $paso;
        }
    }
    return null;
}

/* ------------------------------------------------------------- accesos ---- */

function panel_ip(): string
{
    return substr((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
}

function panel_registrar(?string $correo, string $resultado): void
{
    try {
        $st = panel_db()->prepare(
            'INSERT INTO panel_accesos (creado_en, correo, ip, resultado) VALUES (NOW(), ?, ?, ?)'
        );
        $st->execute([$correo, panel_ip(), $resultado]);
    } catch (Throwable $e) {
        // Que no se pueda registrar no debe dejar a nadie fuera ni dentro.
        error_log('panel: no se pudo registrar el acceso');
    }
}

/* ---------------------------------------------------------------- login --- */

function panel_usuario_por_correo(string $correo): ?array
{
    $st = panel_db()->prepare('SELECT * FROM panel_usuarios WHERE correo = ?');
    $st->execute([mb_strtolower(trim($correo))]);
    $u = $st->fetch();
    return $u === false ? null : $u;
}

function panel_esta_bloqueado(array $u): bool
{
    return !empty($u['bloqueado_hasta']) && strtotime($u['bloqueado_hasta']) > time();
}

function panel_fallo(array $u): void
{
    $intentos = (int) $u['intentos'] + 1;
    if ($intentos >= PANEL_INTENTOS_MAX) {
        $st = panel_db()->prepare(
            'UPDATE panel_usuarios SET intentos = 0, bloqueado_hasta = DATE_ADD(NOW(), INTERVAL ? MINUTE) WHERE id = ?'
        );
        $st->execute([PANEL_BLOQUEO_MIN, (int) $u['id']]);
        return;
    }
    $st = panel_db()->prepare('UPDATE panel_usuarios SET intentos = ? WHERE id = ?');
    $st->execute([$intentos, (int) $u['id']]);
}

function panel_acierto(array $u, int $paso): void
{
    $st = panel_db()->prepare(
        'UPDATE panel_usuarios SET intentos = 0, bloqueado_hasta = NULL, totp_ultimo_paso = ?, ultimo_acceso = NOW() WHERE id = ?'
    );
    $st->execute([$paso, (int) $u['id']]);

    panel_sesion_iniciar();
    session_regenerate_id(true);          // contra fijación de sesión
    $_SESSION['panel_uid'] = (int) $u['id'];
    $_SESSION['panel_visto'] = time();
}

/* ----------------------------------------------------------------- vista --- */

function e(?string $t): string
{
    return htmlspecialchars((string) $t, ENT_QUOTES, 'UTF-8');
}

/** Los estados del ADR 005, con su etiqueta para la interfaz. */
function panel_estados(): array
{
    return [
        'nuevo' => 'Nuevo',
        'contactado' => 'Contactado',
        'agendado' => 'Agendado',
        'en_proceso' => 'En proceso',
        'no_califica' => 'No califica',
        'derivado' => 'Derivado',
    ];
}

function panel_cabecera(string $titulo): void
{
    header('X-Robots-Tag: noindex, nofollow');
    header('Referrer-Policy: no-referrer');
    header('X-Content-Type-Options: nosniff');
    header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action 'self'");
    header('Content-Type: text/html; charset=utf-8');
    ?>
<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title><?= e($titulo) ?> · Alina Martínez</title>
<style>
  :root{--papel:#FFFBF2;--tinta:#1A1A1A;--butter:#FFDC97;--linea:#8F8F91;--gris:#6E6E71}
  *{box-sizing:border-box}
  body{margin:0;background:var(--papel);color:var(--tinta);
    font:300 16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
  .contenedor{max-width:1100px;margin-inline:auto;padding:24px}
  h1{font-size:28px;letter-spacing:-.02em;margin:0 0 4px}
  h2{font-size:18px;margin:0 0 12px}
  .barra{background:var(--butter);padding:12px 24px;display:flex;
    justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
  .barra a{color:inherit}
  .aviso{border-left:3px solid var(--tinta);background:#EFE7F0;padding:12px 16px;
    font-size:14px;max-width:62ch;margin:16px 0}
  .error{border-left:3px solid #B3261E;background:#FDECEA;padding:12px 16px;
    font-size:14px;max-width:62ch;margin:16px 0}
  form.caja{max-width:360px;background:#fff;border:1px solid var(--tinta);
    border-radius:14px;padding:24px;display:flex;flex-direction:column;gap:14px}
  label{font-size:14px;font-weight:700;display:block;margin-bottom:4px}
  input,select,textarea{font:inherit;width:100%;padding:10px;
    border:1px solid var(--linea);border-radius:8px;background:#fff;color:inherit}
  button{font:inherit;font-weight:700;cursor:pointer;border:1px solid var(--tinta);
    background:var(--butter);padding:10px 20px;border-radius:999px}
  table{border-collapse:collapse;width:100%;font-size:14px;background:#fff}
  th,td{text-align:left;padding:10px;border-bottom:1px solid #E6E6E6;vertical-align:top}
  th{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--gris)}
  .filtros{display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;margin:16px 0}
  .vacio{color:var(--gris);padding:24px 0}
  .pie{color:var(--gris);font-size:13px;margin-top:24px}
  code{background:#F1F1F0;padding:2px 6px;border-radius:4px;word-break:break-all}
</style>
</head>
<body>
    <?php
}

function panel_pie(): void
{
    echo "</body>\n</html>\n";
}
