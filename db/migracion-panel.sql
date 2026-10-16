-- Panel del CRM. ADR 011.
--
-- Dos tablas y ninguna más. El panel no guarda nada del contacto que no esté
-- ya en `contactos`: aquí solo vive quién entra y el registro de quién entró.

-- Un solo usuario. El TINYINT del id es deliberado: si alguien necesita una
-- segunda cuenta, que lo piense antes de ampliarlo, porque un panel sobre
-- datos de contacto de salud mental no se comparte sin decidirlo.
CREATE TABLE IF NOT EXISTS panel_usuarios (
  id                TINYINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  correo            VARCHAR(160) NOT NULL,
  clave_hash        VARCHAR(255) NOT NULL,
  -- Secreto TOTP en base32. Se genera en el alta y no se vuelve a mostrar.
  totp_secreto      VARCHAR(64)  NULL,
  totp_activo       TINYINT(1)   NOT NULL DEFAULT 0,
  -- Último paso de 30 s aceptado. Impide reusar un código ya gastado: sin
  -- esto, quien lo vea por encima del hombro tiene medio minuto para entrar.
  totp_ultimo_paso  BIGINT       NULL,
  intentos          TINYINT UNSIGNED NOT NULL DEFAULT 0,
  bloqueado_hasta   DATETIME     NULL,
  ultimo_acceso     DATETIME     NULL,
  creado_en         DATETIME     NOT NULL,
  UNIQUE KEY uniq_correo (correo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- El ADR 005 pide que el acceso al panel quede registrado y revisable. Sin
-- contraseñas ni códigos: solo qué pasó, cuándo y desde dónde.
CREATE TABLE IF NOT EXISTS panel_accesos (
  id        INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  creado_en DATETIME     NOT NULL,
  correo    VARCHAR(160) NULL,
  ip        VARCHAR(45)  NULL,
  resultado ENUM('ok','clave_mal','totp_mal','bloqueado','alta') NOT NULL,
  INDEX idx_creado (creado_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
