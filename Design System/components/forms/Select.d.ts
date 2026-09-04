import * as React from "react";

/** Native select with a drawn chevron. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: { value: string; label: string }[];
}
export function Select(props: SelectProps): JSX.Element;
