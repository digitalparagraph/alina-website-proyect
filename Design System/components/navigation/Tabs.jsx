import React from "react";

export function Tabs({items=[],value,onChange,style,...rest}){
  const active=value??items[0]?.value;
  return (
    <div style={{display:"flex",gap:"var(--space-2)",borderBottom:"1px solid var(--border-subtle)",...style}} {...rest}>
      {items.map(it=>{
        const on=it.value===active;
        return (
          <button key={it.value} onClick={()=>onChange&&onChange(it.value)}
            style={{border:0,background:"transparent",cursor:"pointer",fontFamily:"var(--font-core)",
              fontSize:"var(--text-body)",fontWeight:on?"var(--weight-medium)":"var(--weight-light)",
              color:on?"var(--text-primary)":"var(--text-secondary)",padding:"12px 4px",marginBottom:-1,
              borderBottom:"2px solid "+(on?"var(--ink-900)":"transparent"),transition:"var(--transition-base)"}}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
