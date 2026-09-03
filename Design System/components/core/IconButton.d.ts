import * as React from "react";

/** Circular icon-only control (close, next, share). Always pass `label` for a11y. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "ghost";
  label: string;
  children?: React.ReactNode;
}
export function IconButton(props: IconButtonProps): JSX.Element;
