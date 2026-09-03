-- CRM del sitio. ADR 005: el dato va partido.
--
-- Aquí NO existe columna para el mensaje. Es deliberado: el campo abierto
-- donde alguien describe por qué busca ayuda viaja al correo de Alina y no se
-- almacena. Si alguien añade esa columna se cae el razonamiento completo del
-- ADR 005, y eso hay que reabrirlo antes, no después.
CREATE TABLE IF NOT EXISTS contactos (
  id                    TEXT PRIMARY KEY,
  creado_en             TEXT NOT NULL,
  nombre                TEXT NOT NULL,
  correo                TEXT NOT NULL,
  pagina_origen         TEXT,
  referente             TEXT,
  utm_source            TEXT,
  utm_medium            TEXT,
  utm_campaign          TEXT,
  utm_content           TEXT,
  utm_term              TEXT,
  -- nuevo · contactado · agendado · en_proceso · no_califica · derivado
  --
  -- 'derivado' se cuenta aparte en los reportes: un contacto derivado a
  -- atención especializada no es un fracaso de campaña, es el ADR 001
  -- funcionando. Contarlo como pérdida haría que la optimización empujara
  -- en contra del posicionamiento del sitio.
  estado                TEXT NOT NULL DEFAULT 'nuevo',
  estado_actualizado_en TEXT NOT NULL,
  -- Seguimiento operativo breve. NO es expediente clínico ni lugar para notas
  -- de sesión. La interfaz del panel debe decirlo.
  notas                 TEXT
);

CREATE INDEX IF NOT EXISTS idx_contactos_estado ON contactos(estado);
CREATE INDEX IF NOT EXISTS idx_contactos_campana ON contactos(utm_campaign, creado_en);
