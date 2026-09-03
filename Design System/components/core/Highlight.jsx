import React from "react";

/** The marker capsule / brush stroke used behind headline words across the brand's social work. */
export function Highlight({tone="butter",style,children,...rest}){
  const tones={
    butter:{background:"var(--butter-400)"},
    lilac:{background:"var(--accent-brush)"},
    blush:{background:"var(--blush-300)"},
    white:{background:"var(--white)"}
  };
  return (
    <span style={{background:tones[tone].background,boxDecorationBreak:"clone",WebkitBoxDecorationBreak:"clone",
      padding:"0.06em 0.3em 0.14em",color:"var(--text-primary)",...style}} {...rest}>{children}</span>
  );
}
