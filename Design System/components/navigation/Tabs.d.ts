import * as React from "react";

/** Underlined tab row for switching between short content sets. */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
}
export function Tabs(props: TabsProps): JSX.Element;
