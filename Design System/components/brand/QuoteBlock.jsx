import React from "react";

/** The brand's most-used social layout: a butter field, the lockup, and a light quote. */
export function QuoteBlock({tone="butter",align="center",eyebrow,children,footer,style,...rest}){
  const bg={butter:"var(--butter-400)",paper:"var(--surface-page)",lilac:"var(--surface-lilac)",mist:"var(--surface-mist)"}[tone];
  return (
    <div style={{background:bg,padding:"var(--space-8) var(--space-7)",textAlign:align,fontFamily:"var(--font-core)",...style}} {...rest}>
      {eyebrow&&<p style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-widest)",textTransform:"lowercase",color:"var(--text-secondary)",margin:"0 0 var(--space-5)"}}>{eyebrow}</p>}
      <p style={{font:"var(--type-quote)",color:"var(--text-primary)",margin:0,textWrap:"pretty",maxWidth:"20ch",marginLeft:align==="center"?"auto":0,marginRight:align==="center"?"auto":0}}>{children}</p>
      {footer&&<div style={{marginTop:"var(--space-6)"}}>{footer}</div>}
    </div>
  );
}
