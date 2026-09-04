-- CRM del sitio en MySQL. ADR 005, revisado por el ADR 008.
--
-- Aquí NO existe columna para el mensaje. Es deliberado: el campo abierto
-- donde alguien describe por qué busca ayuda viaja al correo de Alina y no se
-- almacena. Si alguien añade esa columna se cae el razonamiento completo del
-- ADR 005, y eso se reabre antes, no después.
CREATE TABLE IF NOT EXISTS contactos (
  id                    CHAR(32)     NOT NULL PRIMARY KEY,
  creado_en             DATETIME     NOT NULL,
  nombre                VARCHAR(80)  NOT NULL,
  correo                VARCHAR(160) NOT NULL,
  pagina_origen         VARCHAR(200) NULL,
  referente             VARCHAR(200) NULL,
  utm_source            VARCHAR(100) NULL,
  utm_medium            VARCHAR(100) NULL,
  utm_campaign          VARCHAR(100) NULL,
  utm_content           VARCHAR(100) NULL,
  utm_term              VARCHAR(100) NULL,
  -- 'derivado' se cuenta aparte en los reportes: un contacto derivado a
  -- atención especializada no es un fracaso de campaña, es el ADR 001
  -- funcionando. Contarlo como pérdida haría que la optimización empujara
  -- en contra del posicionamiento del sitio.
  estado                ENUM('nuevo','contactado','agendado','en_proceso','no_califica','derivado')
                        NOT NULL DEFAULT 'nuevo',
  estado_actualizado_en DATETIME     NOT NULL,
  -- Seguimiento operativo breve. NO es expediente clínico ni lugar para notas
  -- de sesión. La interfaz del panel debe decirlo.
  notas                 TEXT         NULL,
  INDEX idx_estado (estado),
  INDEX idx_campana (utm_campaign, creado_en)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
