import * as React from "react";

/** Square 22px checkbox, butter fill when checked. */
export interface CheckboxProps extends React.HTMLAttributes<HTMLLabelElement> {
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: React.ReactNode;
  disabled?: boolean;
}
export function Checkbox(props: CheckboxProps): JSX.Element;
