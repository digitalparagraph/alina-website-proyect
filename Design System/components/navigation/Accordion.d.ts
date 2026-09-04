import * as React from "react";

/**
 * Hairline FAQ list with a rotating plus.
 * @startingPoint section="Navigation" subtitle="FAQ accordion and tab row" viewport="700x320"
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: { question: string; answer: string }[];
}
export function Accordion(props: AccordionProps): JSX.Element;
