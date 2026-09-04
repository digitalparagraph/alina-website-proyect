import * as React from "react";

/**
 * The brand lockup as a packaged asset. The lockups are vector (SVG); the knockout is PNG.
 * @startingPoint section="Brand" subtitle="Logo lockups and isotype badges" viewport="700x220"
 */
export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** "primary" full colour, "byn" one-colour, "white" knockout for dark fields,
   *  or one of the circular isotype badges. */
  variant?: "primary" | "byn" | "white" | "isoAmarillo" | "isoMorado" | "isoGris";
  height?: number;
  /** Path prefix to assets/logos/ relative to the consuming page. */
  base?: string;
}
export function Logo(props: LogoProps): JSX.Element;
