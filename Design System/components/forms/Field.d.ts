import * as React from "react";

/** Wrapper that gives any control a label, hint text and error message. */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children?: React.ReactNode;
}
export function Field(props: FieldProps): JSX.Element;
