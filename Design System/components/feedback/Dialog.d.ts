import * as React from "react";

/** Centred modal over a warm scrim with a soft blur. The only place a shadow is allowed. */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: string;
  onClose?: () => void;
  footer?: React.ReactNode;
  width?: number;
  children?: React.ReactNode;
}
export function Dialog(props: DialogProps): JSX.Element | null;
