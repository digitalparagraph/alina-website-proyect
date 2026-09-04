import * as React from "react";

/** Pill notification. Tone colours come from the palette, never from stock red/green. */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "success" | "info" | "warning" | "error";
  message?: React.ReactNode;
  onClose?: () => void;
}
export function Toast(props: ToastProps): JSX.Element;
