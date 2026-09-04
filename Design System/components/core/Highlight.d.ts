import * as React from "react";

/** Marker-pen capsule behind headline words. Square corners, no radius — it reads as paint, not a chip. */
export interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "butter" | "lilac" | "blush" | "white";
  children?: React.ReactNode;
}
export function Highlight(props: HighlightProps): JSX.Element;
