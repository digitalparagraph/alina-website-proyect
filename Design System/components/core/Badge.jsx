import React from "react";

export function Badge({tone="butter",style,children,...rest}){
  const tones={
    butter:{background:"var(--butter-400)",color:"var(--ink-900)"},
    lilac:{background:"var(--lilac-200)",color:"var(--ink-900)"},
    blush:{background:"var(--blush-300)",color:"var(--ink-900)"},
    sage:{background:"var(--sage-300)",color:"var(--ink-900)"},
    ink:{background:"var(--ink-900)",color:"var(--white)"},
    outline:{background:"transparent",color:"var(--ink-900)",border:"1px solid var(--ink-900)"}
  };
  return <span style={{fontFamily:"var(--font-core)",fontSize:"var(--text-tag)",fontWeight:"var(--weight-medium)",
    letterSpacing:"var(--tracking-wide)",textTransform:"lowercase",padding:"5px 12px",borderRadius:"var(--radius-pill)",
    display:"inline-block",lineHeight:1.2,...tones[tone],...style}} {...rest}>{children}</span>;
}
