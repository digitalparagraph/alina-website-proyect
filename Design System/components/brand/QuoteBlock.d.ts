import * as React from "react";

/**
 * Light-weight quote on a solid brand field — the core social/editorial unit.
 * @startingPoint section="Brand" subtitle="Quote field, the core social layout" viewport="700x340"
 */
export interface QuoteBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "butter" | "paper" | "lilac" | "mist";
  align?: "center" | "left";
  eyebrow?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
export function QuoteBlock(props: QuoteBlockProps): JSX.Element;
