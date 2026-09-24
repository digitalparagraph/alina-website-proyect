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

## 3. El moodboard del cliente

`2026/Sitio Web/Moodboard` en Drive fija cuatro criterios que el sistema de diseño no recoge y que el sitio sí cumple:

- Layout limpio.
- Información clara y jerarquizada.
- Fotografía que destaque la conexión humana.
- Combinaciones con elementos orgánicos y dinámicos.

## 4. El kit de sitio web

El sistema incluye un kit específico para web en `Design System/ui_kits/website/`: cabecera, héroe, tarjetas de oferta, superficie de "sobre mí", contacto y pie. De ahí salen las decisiones visuales del sitio, y con el moodboard son la referencia de composición.

### Qué se toma

- **Cabecera sobre el campo de marca.** Mantequilla `#FFDC97`, lockup a la izquierda, navegación con subrayado de un píxel en la sección activa. Fija al desplazar en escritorio; debajo de 820 px deja de ser fija, porque a dos filas se comería un tercio de la pantalla.
- **Héroe como campo de color.** Mantequilla a sangre, antetítulo espaciado, titular a tamaño display con la cápsula de marcador, entrada corta y una sola acción.
- **Ritmo de bandas.** Cada sección pinta su propio fondo de borde a borde y se alterna con el papel. En el home: mantequilla, papel, crema, papel, niebla, lila, papel y negro. Una sola superficie con líneas divisorias se lee como documento, no como marca.
- **Encabezado de color en cada página interior.** No está en el kit, que describe un sitio de una sola página. Sin él, una página interior se lee como un documento suelto colgando de la cabecera.
- **Pie negro con el lockup en blanco.** Es el único bloque oscuro del sitio y funciona como cierre. Usa `logo-white.png` de la marca: los SVG traen relleno negro declarado y volverlos blancos exigiría editar un asset cuyos hexadecimales están pendientes de confirmar.
- **Tarjetas planas** de 24 px de radio, con hairline y sin sombra.
- **Motivos.** La cápsula de marcador, el trazo de pincel y los arcos de circunferencia, que son el elemento orgánico que pide el moodboard.
- **Fotografía** con esquinas de 24 px, sin filtros ni grano. El retrato sale de `2025/01. Branding/Perfil/Alina_Perfil_Facebook.png` en Drive, reescalado a 900 px y servido en WebP con respaldo JPG.

### Emparejamientos de color

El sistema autoriza cuatro y el sitio no usa otros: negro sobre mantequilla, negro sobre lila claro, negro sobre niebla y blanco sobre negro.

**Sage queda fuera de las bandas de sección.** El propio sistema lo declara acento orgánico de campañas, y como fondo de sección aplana el contraste entre bloques: con siete bandas de tono parejo la página deja de leerse como bloques y se lee como un mosaico.

**Las bandas oscuras no se usan para contenido.** La marca es pastel y sólida, y un bloque casi negro tras un párrafo de esta materia pesa más de lo que ese párrafo pide. El negro se reserva al pie, que es como lo usa el kit: cierre, no énfasis. La objeción principal del home se destaca con lila y el trazo de pincel.

Dos consecuencias que no son obvias hasta verlas en pantalla:

- **Sobre el campo de marca, la cápsula mantequilla es invisible.** Deja el hueco del relleno y ninguna pintura. En el héroe la cápsula va en papel.
- **El botón mantequilla desaparece sobre mantequilla.** En la cabecera y en el héroe va en papel.

### Desviaciones deliberadas del kit

**La voz no se toma.** Lo fija la sección 2: el kit documenta copy de campaña —"reinicia tu vida", "Plantea la vida planeada"— que la guía de contenido prohíbe. Del kit salen decisiones visuales; el texto lo gobierna la guía.

**El héroe no lleva la figura ilustrada.** El kit la pone ahí; la sección 2 la restringe a `/sobre-alina/` porque en el home vuelve protagonista a la coach. El héroe resuelve con campo de color, tipografía y aire, que es la otra mitad del lenguaje de la marca.

**El retrato tampoco va en el héroe.** Por el mismo motivo, y porque el propio kit coloca la fotografía en la superficie de "sobre mí". En el home acompaña al bloque que presenta a quien acompaña, que es donde el texto ya la introduce.

**Las tarjetas de tema van todas iguales.** El kit alterna tonos entre sus tarjetas, pero ahí son tres ofertas distintas. Aquí son tres temas equivalentes, y darles color distinto sugiere una diferencia que no existe. Lo que las separa es la hairline y el aire.

**Las preguntas frecuentes no llevan acordeón.** El kit lo usa; aquí las nueve respuestas quedan visibles. Un acordeón exige JavaScript, esconde el texto que el `FAQPage` declara y le quita a los modelos de lenguaje la respuesta que vienen a extraer.

## 5. Adaptación técnica

Los componentes del sistema son React JSX y el stack es Astro sin framework (ADR 002).

- **Los tokens pasan tal cual.** Son CSS con custom properties. Se copian a `src/styles/` con las correcciones de la sección 2.
- **Los componentes se reescriben** como componentes de Astro. La especificación visual la manda el sistema; el código no se porta.
- **Los iconos no se cargan por CDN.** El sistema sustituye Lucide vía CDN; aquí se incrustan los pocos SVG que hagan falta, porque el presupuesto de la Etapa 3 es cero peticiones a terceros.

## 6. Fuera del control de versiones

- `Design System/assets/fonts/*.otf` — tipografía con licencia de Adobe. No se redistribuye.
- `Design System/uploads/` — material fuente ya destilado en el propio sistema.

## 7. Pendiente de confirmar con Alina

El readme del sistema lo deja marcado y sigue abierto:

- **Los hexadecimales de los logos.** Los SVG llegaron sin definiciones de relleno y los colores se infirieron de los PNG de la marca: gris `#58585A`, lila `#B098B4`, crema `#F0DFA5`.
- **Qué color va en cada isotipo.** El emparejamiento actual es una decisión de quien armó el sistema, no del manual.
- **El manual de logo** es un PDF de imagen que no se pudo leer, así que el espacio libre y los tamaños mínimos están inferidos del arte, no citados del manual.

Ninguno bloquea la implementación.
