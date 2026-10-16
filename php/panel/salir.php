<?php
/** Cierra la sesión del panel. */
declare(strict_types=1);
require_once __DIR__ . '/lib_panel.php';
panel_sesion_terminar();
header('Location: entrar.php');
