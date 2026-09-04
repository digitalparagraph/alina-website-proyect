import * as React from "react";

/**
 * The illustrated Alina figure, cropped from the brand's own post artwork.
 * Renders on butter fields (artwork carries a butter background; multiply blend keeps it seamless).
 * @startingPoint section="Brand" subtitle="Line-art figure on the ground rule" viewport="700x400"
 */
export interface FigureIllustrationProps extends React.HTMLAttributes<HTMLDivElement> {
  pose?: "point" | "arms";
  height?: number;
  /** Draw the hairline ground rule behind the figure. Default true. */
  ground?: boolean;
  base?: string;
}
export function FigureIllustration(props: FigureIllustrationProps): JSX.Element;
