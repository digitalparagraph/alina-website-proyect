import * as React from "react";

/** Lucide line icon by name (kebab-case), sized to the brand's 1.75px line feel. */
export interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: string;
  size?: number;
  stroke?: number;
  color?: string;
}
export function Icon(props: IconProps): JSX.Element;
