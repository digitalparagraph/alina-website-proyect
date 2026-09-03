import * as React from "react";

/** Multi-line text field, same skin as Input. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  rows?: number;
}
export function Textarea(props: TextareaProps): JSX.Element;
