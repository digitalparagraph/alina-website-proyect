import * as React from "react";

/** Small pill label for status or category. Lowercase, letterspaced. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "butter" | "lilac" | "blush" | "sage" | "ink" | "outline";
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
