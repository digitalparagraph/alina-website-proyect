import * as React from "react";

/** Pill toggle for on/off preferences. */
export interface SwitchProps extends React.HTMLAttributes<HTMLLabelElement> {
  checked?: boolean;
  onChange?: (next: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
}
export function Switch(props: SwitchProps): JSX.Element;
