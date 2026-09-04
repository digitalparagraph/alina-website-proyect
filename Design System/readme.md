# Alina Martínez — Design System

**Alina Martínez / Alina Coaching** is the personal brand of a Mexican life & emotional coach.
Tagline: *existir consciente*. The offer is one-to-one coaching sessions (also couples and small
group workshops), sold and marketed almost entirely through Instagram/Facebook content and paid
campaigns, in Spanish, for a Mexican audience. Creative production is handled by the agency
Paragraph (folders named `Parrillas RRSS` = monthly social calendars, `Bajadas` = final exports,
`Editables` = Illustrator/Photoshop sources, `Reportes` = monthly performance reports).

There is no product UI. The brand's real surfaces are:

1. **Social & campaign artwork** — 1080 × 1350 feed posts, carousels, stories, video covers and
   paid ads. This is the brand's native medium and the most faithful part of this system.
2. **A website, in planning** — only a moodboard existed at the time of this build
   (clean layout · clear, hierarchical information · photography of human connection ·
   organic/dynamic elements). The website kit here is *directional*, not a recreation.

## Sources given to this build

| Source | Notes |
| --- | --- |
| Local folder `Alina Martínez/` (2025, 2026) | Branding, logo package, monthly social calendars, campaigns, reports, website moodboard |
| `uploads/Logo Alina-Guidelines.pdf` | Image-only PDF — text could not be extracted, page rasterisation timed out. **Not read.** |
| `uploads/Logo Alina.ai` | Was listed in the brief but is not present in `uploads/`. **Not read.** |
| `uploads/alina-logo.svg`, `alina-logo-byn.svg`, `alina-iso-{amarillo,morado,gris}.svg` | Vector logo set supplied later → copied to `assets/logos/`. The files arrived **without any fill definitions** (empty `<defs>`), so every shape rendered black; fills were re-applied from the brand's own PNG lockups (grey `#58585A`, lilac `#B098B4`, cream `#F0DFA5`). **Confirm the hexes and which colour goes in each isotype badge.** |
| `uploads/LogosRecurso 1–3.png` | The three logo lockups → copied to `assets/logos/` |
| `uploads/Alina_post01_agosto_digital2.png` | Live illustration post → colour + type reference, figure crop |
| `2025/01. Branding/Entregables/*.pdf` | Logo presentation + campaign concepts (mostly outlined art; extracted copy below) |
| `2026/Sitio Web/Moodboard/Alina_Website_Moodboard.pdf` | Website direction (4 bullets, quoted above) |
| `2025/.../Editables/Post-04/Post-04 Report.txt` + `Fonts/` | Confirms the typeface: **Acumin Variable Concept** (Light + Bold), packaged OTF copied in |
| `2026/Campañas/Bajadas/*` | Paid-ad layouts (photo + marker capsules) |
| Google Docs / Sheets / Slides links (`.gdoc`, `.gslides`, `.gsheet`) | Cannot be opened from the filesystem — copy decks and content calendars are **not read** |

---

## Content fundamentals

Everything is written in **Spanish (Mexico)**, second person singular **tú**, addressed to one
reader. Alina speaks as *yo* only when offering help ("Te ayudo a tomarlas de manera consciente").

- **Voice:** calm, direct, non-judgemental. Names a difficult feeling, then opens a door. It never
  scolds, never hypes, never promises transformation in X days.
- **Structure of a post:** an observation the reader recognises, then a reframe.
  *"El problema no está en el optimismo, sino en evitar sentirte mal a toda costa."*
  *"El verdadero bienestar emocional es poder decir 'esto me duele' y avanzar para superarlo."*
- **Recurring device:** quoting the clichés people repeat to themselves, in quotation marks —
  *"Enfócate en lo positivo" · "Todo pasa por algo" · "Al mal tiempo, buena cara"* — and then
  questioning them.
- **Casing:** sentence case in headlines and body. **Lowercase** for the tagline, eyebrows and
  small labels (*existir consciente*). Never ALL CAPS, never Title Case.
- **CTAs** are short, imperative, warm, and end with a period:
  *"Agenda tu sesión hoy." · "Conecta contigo mismo, agenda una sesión y reinicia tu vida." ·
  "Escríbeme."*
- **Campaign lines** are three short lines, stacked: *"Plantea / la vida / planeada"*,
  *"El cambio / es todos / los días"*, *"Conecta / en la búsqueda"*.
- **No emoji.** None appear in the artwork. No exclamation marks in headlines. No hashtags inside
  the artwork (captions are out of scope for this system).
- **Length:** one idea per piece. Headlines 6–14 words; supporting line one sentence.
- **Accents matter:** *está, sesión, ilustración, martínez*. Keep them.

## Visual foundations

**Colour.** One warm field carries the brand: butter `#FFDC97` (`--butter-400`), sampled from the
posts themselves. Type on it is pure black. Secondary is the logo's lilac `#B3A0B6` plus a
pinker painted lilac `#D1A2C5` used for brush strokes. Blush `#F5A6A0` appears only inside the
illustrations (cheeks, small marks). Neutrals are black, the logo grey `#58585A`, and a mist grey
`#E6E6E6` used as a calm alternate field. Pastel and solid — never gradients over content, never a
second bright colour in the same piece. One background colour per artwork.

**Type.** A single family, **Acumin Variable Concept** (packaged OTF in `assets/fonts/`), used at
two weights: Light 300 for quotes and running copy, Bold 700 for headlines and marker capsules.
Headline leading is tight (1.06–1.2) with slight negative tracking; body leading is generous
(1.65). Eyebrows and the tagline are lowercase at 0.22em tracking. Quotes are centred and break
around 20 characters per line. Fallback: Poppins (Google) — see *Substitutions*.

**Layout.** Centred, symmetrical, generous. Social artboards: logo top-centre, text in the middle
third, illustration bleeding off the bottom. Web layout: max 1160px, 96px section rhythm, 24px
gutters, 32px card padding, copy measure ~62ch. Large empty areas are intentional and stay empty.

**Backgrounds.** Flat solid colour fields (butter, mist, lilac tint, black) or a full-bleed
photograph. No patterns, no textures, no noise, no gradient meshes. The single exception is the
Facebook cover, where the logo's circles appear as large soft-gradient shapes — a brand-mark
device, not a content background.

**Signature devices.** (1) the **marker capsule**: a square-cornered butter block behind bold
words, slightly offset line to line; (2) the **brush stroke**: a rough lilac painted band behind a
headline; (3) **thin drawn arcs** — 1px black circle segments that frame a title; (4) **hand-drawn
squiggles** in white; (5) the **ground rule**: a 1px black line the illustrated figure stands on.

**Illustration.** Simple, single-weight black line art of a woman (Alina) — no shading, no
gradients, hair and shirt filled with the background butter, blush strokes on the cheeks. Two
packaged poses live in `assets/illustrations/`. Copy them; never redraw or recolour.

**Photography.** Daylight interiors, neutral wardrobe (white shirt), warm mid-tones, subject
looking at camera, real human connection, no filters and no grain. Composition leaves room top and
bottom for marker capsules.

**Corners & borders.** Actions are pills (`--radius-pill`). Cards are 24px. Marker capsules are
square — 0 radius — because they read as paint. Borders are hairline 1px black; grey `#BFBFC1`
only inside form fields.

**Elevation.** The brand is flat: `--shadow-none` is the default and print/social work carries no
shadows at all. Soft warm shadows exist only for floating screen layers — toasts
(`--shadow-soft`), hovered panels (`--shadow-card`), dialogs (`--shadow-overlay`). Transparency and
blur appear in exactly one place: the dialog scrim (`rgba(26,26,26,.42)` + `blur(8px)`).

**Motion.** Restrained and short: 120/220/420ms with `cubic-bezier(.4,0,.2,1)`. Fades and small
slides only — no bounce, no spring, no parallax. Hover **lightens** a fill by one step
(butter 400 → 300) or tints a transparent control butter-100; it never darkens and never lifts a
card. Press scales to 98.5%. Focus shows a 3px lilac ring (`--ring-focus`); links underline on
hover. Reduced-motion users get no movement — only colour changes.

## Iconography

The brand has **no icon set of its own** — no icon font, no SVG sprite, no PNG icon library in any
source folder. Meaning is carried by illustration and type instead, and icons should stay rare.

- Where a UI genuinely needs icons, this system substitutes **Lucide** (`lucide-static` via CDN),
  because its uniform stroke and rounded joins are the closest match to the illustration line.
  **This is a flagged substitution** — see below. Wrapped by `components/core/Icon.jsx`.
- Rules: black strokes only, ~1.75px, no fills, no duotone, no coloured icons, 22–24px.
- **Emoji are never used**, in artwork or UI. Typographic marks stand in where needed: `+` on the
  accordion, `✕` to dismiss, `→` for next, `“ ”` around quoted clichés.
- The logo's three-circle mark is the only proprietary graphic; it is an image asset
  (`assets/logos/`), never an inline SVG redraw.

## Substitutions & gaps to confirm

- **Acumin Variable Concept** is licensed through Adobe Fonts. The variable OTF packaged with the
  Illustrator files is included here for internal comping. Consumers without the licence fall back
  to **Poppins**. Confirm whether we may ship the OTF or should switch the fallback.
- **Icons: Lucide substituted** (no native set found).
- The vector logos came with **no colours attached**; the applied fills are inferred (see the sources table). The
  **isotype badge colour pairings** (which petal is cream vs white on each disc) are my call, not the guide's.
- The logo **guidelines PDF could not be read** (image-only, rasterisation timed out), so clear
  space and minimum sizes here are inferred from the artwork, not quoted from the guide.
- Stock photography in the sources is licensed Shutterstock/Pexels (see `Post-04 Report.txt`); the
  only photograph copied in is the brand's own campaign artboard.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | Entry point — `@import`s every token file |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css` |
| `assets/logos/` | Vector: `alina-logo.svg` (colour lockup), `alina-logo-byn.svg` (one colour), `alina-iso-amarillo.svg`, `alina-iso-morado.svg`, `alina-iso-gris.svg`. Raster: `logo-white.png` (knockout for dark fields), plus the original `logo-primary.png` / `logo-alt.png` |
| `assets/illustrations/` | `alina-figure-arms.png`, `alina-figure-point.png` |
| `assets/brand/` | Facebook cover + profile mark, `alina-portrait.png` (clean crop for editorial use), and three real post examples (photo ad, illustration, quote) |
| `assets/fonts/` | `AcuminVariableConcept.otf` |
| `guidelines/` | 21 specimen cards: colour, type, spacing, radii, elevation, logo, illustration, motifs, photography |
| `components/` | React primitives (below) |
| `ui_kits/social/` | The live post system — quote, illustration, carousel, ad |
| `ui_kits/website/` | Directional landing page from the moodboard (see its README) |
| `templates/social-post/` | Starting template: 1080 × 1350 post |
| `templates/landing-page/` | Starting template: coaching landing page |
| `SKILL.md` | Agent-skill entry point |

### Components

- **core/** — `Button`, `IconButton`, `Card`, `Badge`, `Tag`, `Highlight`, `Divider`, `Logo`, `Icon`
- **forms/** — `Field`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`
- **feedback/** — `Dialog`, `Toast`, `Tooltip`
- **navigation/** — `Tabs`, `Accordion`
- **brand/** — `QuoteBlock`, `FigureIllustration`, `PhotoOverlay`

Kit screens exported alongside them: `QuotePost`, `IllustrationPost`, `PhotoAdPost`,
`CarouselPost`, `SiteHeader`, `Hero`, `Sessions`, `About`, `Contact`, `SiteFooter`.

**Intentional additions.** The sources define no component library (it is a brand, not a product),
so the primitive set is a standard one sized to what this brand actually needs: a booking form, an
FAQ, offer cards, and the three brand-specific units (`Highlight`, `QuoteBlock`,
`FigureIllustration`, `PhotoOverlay`) lifted directly from the artwork. `Icon` exists only to wrap
the substituted Lucide set.
