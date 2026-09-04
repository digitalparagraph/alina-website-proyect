import * as React from "react";

/**
 * Single-line text field. 8px radius, hairline grey border, lilac focus ring.
 * @startingPoint section="Forms" subtitle="Text fields, select, checkbox, switch" viewport="700x300"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}
export function Input(props: InputProps): JSX.Element;
