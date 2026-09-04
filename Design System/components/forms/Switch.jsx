import React from "react";

export function Switch({checked=false,onChange,label,disabled=false,style,...rest}){
  return (
    <label style={{display:"inline-flex",alignItems:"center",gap:"var(--space-3)",fontFamily:"var(--font-core)",
      fontSize:"var(--text-body)",fontWeight:"var(--weight-light)",cursor:disabled?"default":"pointer",
      opacity:disabled?.4:1,...style}} {...rest}>
      <span onClick={()=>!disabled&&onChange&&onChange(!checked)}
        style={{width:46,height:26,borderRadius:"var(--radius-pill)",border:"1px solid var(--ink-900)",
          background:checked?"var(--butter-400)":"var(--white)",position:"relative",transition:"var(--transition-base)"}}>
        <span style={{position:"absolute",top:3,left:checked?23:3,width:18,height:18,borderRadius:"var(--radius-circle)",
          background:"var(--ink-900)",transition:"left var(--duration-base) var(--ease-out-soft)"}}/>
      </span>
      {label}
    </label>
  );
}
