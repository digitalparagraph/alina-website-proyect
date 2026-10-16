<?php
/**
 * Panel de contactos. ADR 005 y 011.
 *
 * Toca exactamente dos campos de `contactos`: `estado` y `notas`. Nada más.
 * No muestra el mensaje del formulario porque no existe en la base, y esa es
 * la razón de ser del ADR 003: el texto donde alguien explica por qué busca
 * ayuda viaja al correo de Alina y no se almacena en ningún panel.
 *
 * `derivado` se cuenta aparte del resto. Un contacto derivado a atención
 * especializada no es un fracaso: es el ADR 001 funcionando. Contarlo como
 * pérdida haría que la optimización empujara en contra del posicionamiento.
 */
declare(strict_types=1);
require_once __DIR__ . '/lib_panel.php';

$yo = panel_exigir_sesion();
$pdo = panel_db();
$estados = panel_estados();
$aviso = '';
$error = '';

/* ------------------------------------------------------------ escritura -- */

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    if (!panel_csrf_valido($_POST['csrf'] ?? null)) {
        $error = 'La sesión caducó. Vuelve a cargar la página.';
    } else {
        $id = (string) ($_POST['id'] ?? '');
        $valido = preg_match('/^[0-9a-f]{32}$/', $id) === 1;

        if (!$valido) {
            $error = 'Contacto no reconocido.';
        } elseif (($_POST['accion'] ?? '') === 'estado') {
            $nuevo = (string) ($_POST['estado'] ?? '');
            if (!isset($estados[$nuevo])) {
                $error = 'Ese estado no existe.';
            } else {
                $st = $pdo->prepare(
                    'UPDATE contactos SET estado = ?, estado_actualizado_en = NOW() WHERE id = ?'
                );
                $st->execute([$nuevo, $id]);
                $aviso = 'Estado actualizado.';
            }
        } elseif (($_POST['accion'] ?? '') === 'notas') {
            $notas = trim((string) ($_POST['notas'] ?? ''));
            $notas = mb_substr(strip_tags($notas), 0, PANEL_NOTAS_MAX);
            $st = $pdo->prepare('UPDATE contactos SET notas = ? WHERE id = ?');
            $st->execute([$notas === '' ? null : $notas, $id]);
            $aviso = 'Nota guardada.';
        }
    }
}

/* -------------------------------------------------------------- lectura -- */

$filtroEstado = (string) ($_GET['estado'] ?? '');
$filtroCampana = trim((string) ($_GET['campana'] ?? ''));

$where = [];
$args = [];
if (isset($estados[$filtroEstado])) {
    $where[] = 'estado = ?';
    $args[] = $filtroEstado;
}
if ($filtroCampana !== '') {
    $where[] = 'utm_campaign = ?';
    $args[] = $filtroCampana;
}
$sql = 'SELECT * FROM contactos';
if ($where) {
    $sql .= ' WHERE ' . implode(' AND ', $where);
}
$sql .= ' ORDER BY creado_en DESC LIMIT 200';
$st = $pdo->prepare($sql);
$st->execute($args);
$contactos = $st->fetchAll();

$conteos = [];
foreach ($pdo->query('SELECT estado, COUNT(*) n FROM contactos GROUP BY estado') as $r) {
    $conteos[$r['estado']] = (int) $r['n'];
}
$total = array_sum($conteos);
$derivados = $conteos['derivado'] ?? 0;

$campanas = $pdo->query(
    'SELECT DISTINCT utm_campaign FROM contactos WHERE utm_campaign IS NOT NULL AND utm_campaign <> "" ORDER BY utm_campaign'
)->fetchAll(PDO::FETCH_COLUMN);

panel_cabecera('Contactos');
?>
<div class="barra">
  <strong>Contactos · Alina Martínez</strong>
  <span><?= e($yo['correo']) ?> · <a href="salir.php">Salir</a></span>
</div>

<div class="contenedor">
  <?php if ($aviso !== ''): ?><p class="aviso"><?= e($aviso) ?></p><?php endif; ?>
  <?php if ($error !== ''): ?><p class="error"><?= e($error) ?></p><?php endif; ?>

  <p class="aviso">
    <strong>Esto no es un expediente clínico.</strong> Las notas son para
    seguimiento operativo, no para notas de sesión. El mensaje que la persona
    escribió en el formulario no está aquí: llega solo a tu correo y no se
    guarda en ningún lado.
  </p>

  <h2>
    <?= $total ?> contacto<?= $total === 1 ? '' : 's' ?>
    <?php if ($derivados > 0): ?>
      <span style="font-weight:300;color:#6E6E71">·
        <?= $derivados ?> derivado<?= $derivados === 1 ? '' : 's' ?> a atención especializada
      </span>
    <?php endif; ?>
  </h2>

  <form class="filtros" method="get" action="index.php">
    <div>
      <label for="f-estado">Estado</label>
      <select id="f-estado" name="estado">
        <option value="">Todos</option>
        <?php foreach ($estados as $k => $etiqueta): ?>
          <option value="<?= e($k) ?>"<?= $filtroEstado === $k ? ' selected' : '' ?>>
            <?= e($etiqueta) ?> (<?= (int) ($conteos[$k] ?? 0) ?>)
          </option>
        <?php endforeach; ?>
      </select>
    </div>
    <?php if ($campanas): ?>
    <div>
      <label for="f-campana">Campaña</label>
      <select id="f-campana" name="campana">
        <option value="">Todas</option>
        <?php foreach ($campanas as $c): ?>
          <option value="<?= e($c) ?>"<?= $filtroCampana === $c ? ' selected' : '' ?>><?= e($c) ?></option>
        <?php endforeach; ?>
      </select>
    </div>
    <?php endif; ?>
    <button type="submit">Filtrar</button>
  </form>

  <?php if (!$contactos): ?>
    <p class="vacio">Todavía no hay contactos que mostrar con ese filtro.</p>
  <?php else: ?>
  <table>
    <thead>
      <tr>
        <th>Llegó</th><th>Nombre</th><th>Correo</th>
        <th>De dónde</th><th>Estado</th><th>Nota operativa</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($contactos as $c): ?>
      <tr>
        <td><?= e(date('d/m/Y H:i', strtotime($c['creado_en']))) ?></td>
        <td><?= e($c['nombre']) ?></td>
        <td><a href="mailto:<?= e($c['correo']) ?>"><?= e($c['correo']) ?></a></td>
        <td>
          <?= e($c['pagina_origen'] ?: '—') ?>
          <?php if (!empty($c['utm_campaign'])): ?>
            <br><span style="color:#6E6E71">campaña: <?= e($c['utm_campaign']) ?></span>
          <?php endif; ?>
        </td>
        <td>
          <form method="post" action="index.php">
            <input type="hidden" name="csrf" value="<?= e(panel_csrf()) ?>">
            <input type="hidden" name="accion" value="estado">
            <input type="hidden" name="id" value="<?= e($c['id']) ?>">
            <select name="estado" onchange="this.form.submit()">
              <?php foreach ($estados as $k => $etiqueta): ?>
                <option value="<?= e($k) ?>"<?= $c['estado'] === $k ? ' selected' : '' ?>><?= e($etiqueta) ?></option>
              <?php endforeach; ?>
            </select>
            <noscript><button type="submit">Guardar</button></noscript>
          </form>
          <span style="color:#6E6E71;font-size:12px">
            desde <?= e(date('d/m/Y', strtotime($c['estado_actualizado_en']))) ?>
          </span>
        </td>
        <td>
          <form method="post" action="index.php">
            <input type="hidden" name="csrf" value="<?= e(panel_csrf()) ?>">
            <input type="hidden" name="accion" value="notas">
            <input type="hidden" name="id" value="<?= e($c['id']) ?>">
            <textarea name="notas" rows="2" maxlength="<?= PANEL_NOTAS_MAX ?>"
              placeholder="Seguimiento operativo"><?= e($c['notas']) ?></textarea>
            <button type="submit">Guardar</button>
          </form>
        </td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
  <?php endif; ?>

  <p class="pie">
    Se muestran los últimos 200. Los contactos se borran automáticamente a los
    24 meses del último cambio de estado, según la política de retención.
  </p>
</div>
<?php panel_pie();
