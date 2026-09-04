import * as React from "react";

/** Small black label on hover. Text only, no arrow. */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: React.ReactNode;
  children?: React.ReactNode;
}
export function Tooltip(props: TooltipProps): JSX.Element;
