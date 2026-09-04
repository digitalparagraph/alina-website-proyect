import * as React from "react";

/**
 * Flat content container. Solid colour field, 24px radius, hairline border optional — never a drop shadow.
 * @startingPoint section="Core" subtitle="Flat colour-field cards" viewport="700x260"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "paper" | "butter" | "butterSoft" | "lilac" | "mist" | "ink";
  bordered?: boolean;
  padding?: string;
  children?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;
