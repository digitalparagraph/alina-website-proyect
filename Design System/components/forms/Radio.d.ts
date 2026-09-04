import * as React from "react";

/** Radio with a lilac dot — one choice from a small set. */
export interface RadioProps extends React.HTMLAttributes<HTMLLabelElement> {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: React.ReactNode;
  name?: string;
  value?: string;
  disabled?: boolean;
}
export function Radio(props: RadioProps): JSX.Element;
