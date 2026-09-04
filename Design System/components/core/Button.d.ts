import * as React from "react";

/**
 * Primary action control. Pill-shaped, flat fill, no shadow.
 * @startingPoint section="Core" subtitle="Buttons in every brand variant and size" viewport="700x180"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual treatment. Default "primary" (butter fill, black label). */
  variant?: "primary" | "secondary" | "lilac" | "ghost" | "inverse";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  /** Render as another element, e.g. "a" for links. */
  as?: "button" | "a";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;
