<?php
/**
 * Copiar como config.php en el servidor y llenar. config.php NO se versiona:
 * lleva credenciales.
 *
 * Va UN NIVEL ARRIBA del docroot, no dentro. En Hostinger eso es
 * ~/domains/<dominio>/config.php, con el sitio en <dominio>/public_html.
 * Dentro del docroot quedaría en el árbol público y, peor, cada despliegue con
 * `--reemplazar` lo borraría junto con el resto.
 */
declare(strict_types=1);

const DSN        = 'mysql:host=localhost;dbname=CAMBIAR;charset=utf8mb4';
const DB_USUARIO = 'CAMBIAR';
const DB_CLAVE   = 'CAMBIAR';

const CORREO_DESTINO   = 'CAMBIAR';               // buzón de Alina
const CORREO_REMITENTE = 'sitio@CAMBIAR';         // del propio dominio, para no caer en spam

const ORIGENES_PERMITIDOS = [
    'https://CAMBIAR',
    'https://www.CAMBIAR',
];
