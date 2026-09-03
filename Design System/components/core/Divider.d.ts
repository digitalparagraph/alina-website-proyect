import * as React from "react";

/** 1px rule. The black variant is the brand's "ground line" under illustrations. */
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  tone?: "ink" | "subtle" | "lilac";
  spacing?: string;
}
export function Divider(props: DividerProps): JSX.Element;
