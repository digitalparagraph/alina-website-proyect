<?php
/**
 * Alta única del usuario del panel. ADR 011.
 *
 * Dos pasos: crear el acceso y confirmar el segundo factor. El alta se cierra
 * cuando el segundo factor queda activo, no antes; si se cerrara al crear el
 * usuario, el propio segundo paso se quedaría fuera y la cuenta inservible.
 *
 * Exige el token que vive en config.php, para que la ventana entre el
 * despliegue y el alta no sea una puerta abierta a quien adivine la URL.
 *
 * El secreto se muestra mientras el segundo factor no esté confirmado. Una vez
 * activo no hay forma de volver a verlo: se borra la fila y se repite el alta.
 */
declare(strict_types=1);
require_once __DIR__ . '/lib_panel.php';

if (!defined('PANEL_TOKEN_ALTA') || PANEL_TOKEN_ALTA === '') {
    http_response_code(503);
    exit('Falta PANEL_TOKEN_ALTA en config.php.');
}

$token = (string) ($_GET['token'] ?? $_POST['token'] ?? '');
if (!hash_equals(PANEL_TOKEN_ALTA, $token)) {
    http_response_code(403);
    exit('Token inválido.');
}

$pdo = panel_db();
$pendiente = $pdo->query(
    'SELECT * FROM panel_usuarios ORDER BY id LIMIT 1'
)->fetch();

// Con el segundo factor ya activo, esta pantalla no vuelve a servir.
if ($pendiente !== false && !empty($pendiente['totp_activo'])) {
    http_response_code(410);
    panel_cabecera('Alta cerrada');
    echo '<div class="contenedor"><h1>El alta ya se hizo</h1>'
       . '<p class="aviso">Esta pantalla solo funciona mientras el segundo factor no está activo. '
       . 'Para rehacerla hay que borrar la fila de <code>panel_usuarios</code> a mano.</p>'
       . '<p><a href="entrar.php">Ir a entrar</a></p></div>';
    panel_pie();
    exit;
}

$error = '';
$esPost = ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST';
$paso = (string) ($_POST['paso'] ?? '');

/* Si ya hay usuario sin confirmar, el flujo sigue en el segundo paso. */
$listo = $pendiente === false
    ? null
    : ['correo' => $pendiente['correo'], 'secreto' => (string) $pendiente['totp_secreto']];

if ($esPost && !panel_csrf_valido($_POST['csrf'] ?? null)) {
    $error = 'La sesión caducó. Vuelve a intentar.';
} elseif ($esPost && $paso === 'confirmar' && $pendiente !== false) {
    /* ------------------------------------- paso 2: confirmar el segundo factor */
    $aceptado = panel_totp_verificar(
        (string) $pendiente['totp_secreto'],
        (string) ($_POST['codigo'] ?? ''),
        null
    );
    if ($aceptado === null) {
        $error = 'Ese código no coincide. Revisa la hora del teléfono y vuelve a intentar.';
    } else {
        $st = $pdo->prepare('UPDATE panel_usuarios SET totp_activo = 1, totp_ultimo_paso = ? WHERE id = ?');
        $st->execute([$aceptado, (int) $pendiente['id']]);
        panel_registrar((string) $pendiente['correo'], 'alta');
        header('Location: entrar.php');
        exit;
    }
} elseif ($esPost && $paso === '' && $pendiente === false) {
    /* ------------------------------------------- paso 1: crear el acceso */
    $correo = mb_strtolower(trim((string) ($_POST['correo'] ?? '')));
    $clave  = (string) ($_POST['clave'] ?? '');
    $clave2 = (string) ($_POST['clave2'] ?? '');

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $error = 'Ese correo no es válido.';
    } elseif (mb_strlen($clave) < 12) {
        $error = 'La contraseña necesita al menos 12 caracteres.';
    } elseif ($clave !== $clave2) {
        $error = 'Las dos contraseñas no coinciden.';
    } else {
        $secreto = panel_totp_secreto();
        $st = $pdo->prepare(
            'INSERT INTO panel_usuarios (correo, clave_hash, totp_secreto, totp_activo, creado_en)
             VALUES (?, ?, ?, 0, NOW())'
        );
        $st->execute([$correo, password_hash($clave, PASSWORD_DEFAULT), $secreto]);
        $listo = ['correo' => $correo, 'secreto' => $secreto];
    }
}

panel_cabecera('Alta del panel');
?>
<div class="contenedor">
<?php if ($listo === null): ?>
  <h1>Alta del panel</h1>
  <p class="aviso">Esta pantalla se usa una sola vez. Al confirmar el segundo factor deja de funcionar.</p>
  <?php if ($error !== ''): ?><p class="error"><?= e($error) ?></p><?php endif; ?>

  <form class="caja" method="post" action="alta.php" autocomplete="off">
    <input type="hidden" name="csrf" value="<?= e(panel_csrf()) ?>">
    <input type="hidden" name="token" value="<?= e($token) ?>">
    <div>
      <label for="correo">Correo</label>
      <input id="correo" name="correo" type="email" required>
    </div>
    <div>
      <label for="clave">Contraseña, mínimo 12 caracteres</label>
      <input id="clave" name="clave" type="password" minlength="12" required autocomplete="new-password">
    </div>
    <div>
      <label for="clave2">Repítela</label>
      <input id="clave2" name="clave2" type="password" minlength="12" required autocomplete="new-password">
    </div>
    <button type="submit">Crear el acceso</button>
  </form>
<?php else: ?>
  <h1>Falta confirmar el segundo factor</h1>
  <p class="aviso">
    Da de alta este secreto en tu aplicación de autenticación y escribe el
    código que te muestre. Mientras no lo confirmes, la cuenta no entra: la
    contraseña sola no abre este panel.
  </p>
  <?php if ($error !== ''): ?><p class="error"><?= e($error) ?></p><?php endif; ?>

  <p>Secreto: <code><?= e($listo['secreto']) ?></code></p>
  <p style="font-size:14px;color:#6E6E71">
    O usa este enlace desde el teléfono:<br>
    <code>otpauth://totp/<?= rawurlencode('Alina Martinez Panel') ?>:<?= rawurlencode($listo['correo']) ?>?secret=<?= e($listo['secreto']) ?>&amp;issuer=<?= rawurlencode('Alina Martinez') ?></code>
  </p>

  <form class="caja" method="post" action="alta.php" autocomplete="off">
    <input type="hidden" name="csrf" value="<?= e(panel_csrf()) ?>">
    <input type="hidden" name="token" value="<?= e($token) ?>">
    <input type="hidden" name="paso" value="confirmar">
    <div>
      <label for="codigo">Código de seis dígitos</label>
      <input id="codigo" name="codigo" type="text" inputmode="numeric" pattern="[0-9]{6}"
             maxlength="6" required autocomplete="one-time-code">
    </div>
    <button type="submit">Confirmar y terminar</button>
  </form>
<?php endif; ?>
</div>
<?php panel_pie();
