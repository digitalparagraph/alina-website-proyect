import * as React from "react";

/** Selectable / removable hairline chip — filters, topic lists. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode;
}
export function Tag(props: TagProps): JSX.Element;
