import React from "react";

export function Tag({selected=false,onRemove,children,style,...rest}){
  return (
    <span style={{fontFamily:"var(--font-core)",fontSize:"var(--text-sm)",fontWeight:"var(--weight-light)",
      display:"inline-flex",alignItems:"center",gap:"var(--space-2)",padding:"7px 14px",borderRadius:"var(--radius-pill)",
      border:"1px solid var(--ink-900)",background:selected?"var(--butter-400)":"transparent",color:"var(--text-primary)",
      cursor:"pointer",transition:"var(--transition-base)",...style}} {...rest}>
      {children}
      {onRemove&&<span onClick={e=>{e.stopPropagation();onRemove()}} style={{fontSize:"var(--text-xs)",opacity:.6,cursor:"pointer"}}>✕</span>}
    </span>
  );
}
