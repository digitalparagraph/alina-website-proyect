<?php
/**
 * Entrada al panel. ADR 011.
 *
 * Los tres campos van en un solo formulario a propósito. Pedir primero la
 * contraseña y luego el código confirmaría al que prueba contraseñas que acertó
 * la primera, que es justo la información que no queremos regalar. Por lo mismo
 * el error es siempre el mismo texto, falle lo que falle.
 */
declare(strict_types=1);
require_once __DIR__ . '/lib_panel.php';

// Con sesión viva no se pasa por aquí.
if (panel_usuario_actual() !== null) {
    header('Location: index.php');
    exit;
}

$error = '';

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!panel_csrf_valido($_POST['csrf'] ?? null)) {
        $error = 'La sesión caducó. Vuelve a intentar.';
    } else {
        $correo = (string) ($_POST['correo'] ?? '');
        $clave  = (string) ($_POST['clave'] ?? '');
        $codigo = (string) ($_POST['codigo'] ?? '');

        $u = panel_usuario_por_correo($correo);

        if ($u === null) {
            // Se gasta un verify igualmente para que el tiempo de respuesta no
            // delate si el correo existe. El hash es real y de un valor
            // aleatorio que nadie conoce: con uno malformado, password_verify
            // devuelve falso de inmediato y el relleno no serviría de nada.
            password_verify($clave, '$2y$10$jKEW0e4BLdwuGPnX5QjprOkUCyxM3nUYl1ejJAoHmh1eMe79bzkJ2');
            panel_registrar($correo, 'clave_mal');
            $error = 'No se pudo entrar. Revisa los datos.';
        } elseif (panel_esta_bloqueado($u)) {
            panel_registrar($u['correo'], 'bloqueado');
            $error = 'Demasiados intentos. Espera ' . PANEL_BLOQUEO_MIN . ' minutos.';
        } elseif (!password_verify($clave, $u['clave_hash'])) {
            panel_fallo($u);
            panel_registrar($u['correo'], 'clave_mal');
            $error = 'No se pudo entrar. Revisa los datos.';
        } elseif (empty($u['totp_activo']) || empty($u['totp_secreto'])) {
            // Sin segundo factor configurado no se entra. Es la condición del
            // ADR 011: la contraseña sola no abre este panel.
            panel_registrar($u['correo'], 'totp_mal');
            $error = 'Falta terminar el alta del segundo factor.';
        } else {
            $paso = panel_totp_verificar(
                $u['totp_secreto'],
                $codigo,
                $u['totp_ultimo_paso'] === null ? null : (int) $u['totp_ultimo_paso']
            );
            if ($paso === null) {
                panel_fallo($u);
                panel_registrar($u['correo'], 'totp_mal');
                $error = 'No se pudo entrar. Revisa los datos.';
            } else {
                panel_acierto($u, $paso);
                panel_registrar($u['correo'], 'ok');
                header('Location: index.php');
                exit;
            }
        }
    }
}

panel_cabecera('Entrar');
?>
<div class="contenedor">
  <h1>Panel de contactos</h1>
  <p style="color:#6E6E71;margin:0 0 20px">Alina Martínez Coaching</p>

  <?php if ($error !== ''): ?>
    <p class="error"><?= e($error) ?></p>
  <?php endif; ?>

  <form class="caja" method="post" action="entrar.php" autocomplete="off">
    <input type="hidden" name="csrf" value="<?= e(panel_csrf()) ?>">
    <div>
      <label for="correo">Correo</label>
      <input id="correo" name="correo" type="email" required autocomplete="username">
    </div>
    <div>
      <label for="clave">Contraseña</label>
      <input id="clave" name="clave" type="password" required autocomplete="current-password">
    </div>
    <div>
      <label for="codigo">Código de seis dígitos</label>
      <input id="codigo" name="codigo" type="text" inputmode="numeric" pattern="[0-9]{6}"
             maxlength="6" required autocomplete="one-time-code">
    </div>
    <button type="submit">Entrar</button>
  </form>

  <p class="pie">
    El código cambia cada 30 segundos y sale de tu aplicación de autenticación.
    Tras <?= PANEL_INTENTOS_MAX ?> intentos fallidos la cuenta se bloquea
    <?= PANEL_BLOQUEO_MIN ?> minutos.
  </p>
</div>
<?php panel_pie();
