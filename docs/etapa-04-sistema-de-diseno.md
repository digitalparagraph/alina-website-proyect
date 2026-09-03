# Etapa 4 — Sistema de diseño

El sistema existe y vive en `Design System/`, empaquetado como skill. Esta etapa no lo crea: lo adopta y fija las cuatro precisiones que hacen falta para llevarlo a un sitio público.

## 1. Qué se adopta tal cual

- **Color.** El campo butter `#FFDC97` como superficie de marca, lila `#B3A0B6` como secundario, negro para el texto. Un solo color de fondo por pieza, sin degradados sobre contenido.
- **Espaciado y medida.** Escala de 4 px, contenedor de 1160 px, ritmo de sección de 96 px, medida de lectura de 62 caracteres.
- **Radios.** Píldora para acciones, 24 px para tarjetas, cero para las cápsulas de marcador, que se leen como pintura.
- **Elevación.** La marca es plana. Sombras solo en capas flotantes.
- **Movimiento.** 120, 220 y 420 ms. Fundidos y desplazamientos cortos. El hover aclara, nunca oscurece ni levanta.
- **Composición.** Los vacíos grandes son intencionales y se quedan vacíos.

## 2. Las cuatro precisiones

### La voz del sistema no aplica al sitio

El sistema de diseño se construyó a partir de las parrillas de redes de 2025 y 2026, y describe la marca como *life & emotional coach*. Documenta CTAs reales de esa marca, entre ellos "Conecta contigo mismo, agenda una sesión y reinicia tu vida."

**Ese registro no se usa en el sitio.** La guía de contenido lo prohíbe explícitamente: "transforma tu vida" y equivalentes están en su lista de clichés a evitar.

No es un defecto del sistema: describe con fidelidad la marca en redes. Ocurre que en redes es coaching de vida y en el sitio es coaching terapéutico con base en TCC, y la guía de contenido es posterior.

**Regla operativa:** del sistema de diseño se toman las decisiones visuales; la voz, los CTAs y el tono los gobierna `insumos/Guia para desarrollo de contenido.docx`. Sin excepciones.

### La ilustración vive en una sola página

El dispositivo de firma del sistema es la figura ilustrada de Alina sangrando por el borde inferior. En redes funciona; en el sitio compite con el criterio de que el protagonista es el proceso y no la coach.

**Se usa en `/sobre-alina/` y en ningún otro lugar.** En el home la volvería protagonista, que es justo lo que la guía descarta.

### La tipografía es Poppins autoalojada

Acumin Variable Concept está licenciada a través de Adobe Fonts. El OTF empaquetado sirve para comping interno; servirlo desde un sitio público requiere licencia web. Ver ADR 007.

### Cuatro tokens de color se corrigen

Tres no alcanzan el mínimo de WCAG 2.2 AA que fija la Etapa 3, y uno queda al límite.

| Token | Original | Contraste | Corregido | Contraste |
|---|---|---:|---|---:|
| `--focus-ring` sobre butter | `#B3A0B6` | 1.85:1 | `#6E5B75` | 4.66:1 |
| `--border-subtle` sobre blanco | `#BFBFC1` | 1.84:1 | `#8F8F91` | 3.23:1 |
| `--text-muted` sobre página | `#8A8A8C` | 3.34:1 | `#6E6E71` | 4.92:1 |
| `--text-accent` sobre blanco | `#9B8AA0` | 3.21:1 | `#75647B` | 5.43:1 |

El anillo de foco era el más grave: a 1.85:1 es prácticamente invisible sobre el color principal de la marca, y quien navega con teclado se queda sin saber dónde está.

Los cuatro se corrigen oscureciendo un paso dentro de la misma familia. La identidad no cambia.

## 3. Adaptación técnica

Los componentes del sistema son React JSX y el stack es Astro sin framework (ADR 002).

- **Los tokens pasan tal cual.** Son CSS con custom properties. Se copian a `src/styles/` con las correcciones de arriba.
- **Los componentes se reescriben** como componentes de Astro. La especificación visual la manda el sistema; el código no se porta.
- **Los iconos no se cargan por CDN.** El sistema sustituye Lucide vía CDN; aquí se incrustan los pocos SVG que hagan falta, porque el presupuesto de la Etapa 3 es cero peticiones a terceros.

## 4. Fuera del control de versiones

- `Design System/assets/fonts/*.otf` — tipografía con licencia de Adobe. No se redistribuye.
- `Design System/uploads/` — material fuente ya destilado en el propio sistema.

## 5. Pendiente de confirmar con Alina

El readme del sistema lo deja marcado y sigue abierto:

- **Los hexadecimales de los logos.** Los SVG llegaron sin definiciones de relleno y los colores se infirieron de los PNG de la marca: gris `#58585A`, lila `#B098B4`, crema `#F0DFA5`.
- **Qué color va en cada isotipo.** El emparejamiento actual es una decisión de quien armó el sistema, no del manual.
- **El manual de logo** es un PDF de imagen que no se pudo leer, así que el espacio libre y los tamaños mínimos están inferidos del arte, no citados del manual.

Ninguno bloquea la implementación.
