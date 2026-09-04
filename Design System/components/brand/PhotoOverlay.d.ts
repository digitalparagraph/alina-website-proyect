import * as React from "react";

/**
 * Photograph with stacked butter marker capsules over it — the campaign/ad layout.
 * @startingPoint section="Brand" subtitle="Photo post with marker headline" viewport="700x420"
 */
export interface PhotoOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  /** Headline broken into the lines you want capsuled, one capsule per line. */
  lines?: string[];
  footnote?: string;
  /** Outlined closing line, e.g. "Agenda tu sesión hoy." */
  cta?: string;
  ratio?: string;
}
export function PhotoOverlay(props: PhotoOverlayProps): JSX.Element;
