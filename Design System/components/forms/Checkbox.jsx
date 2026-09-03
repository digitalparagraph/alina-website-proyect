import React from "react";

export function Checkbox({checked=false,onChange,label,disabled=false,style,...rest}){
  return (
    <label style={{display:"inline-flex",alignItems:"center",gap:"var(--space-3)",fontFamily:"var(--font-core)",
      fontSize:"var(--text-body)",fontWeight:"var(--weight-light)",color:"var(--text-body)",
      cursor:disabled?"default":"pointer",opacity:disabled?.4:1,...style}} {...rest}>
      <span style={{width:22,height:22,flex:"0 0 22px",borderRadius:"var(--radius-xs)",border:"1px solid var(--ink-900)",
        background:checked?"var(--butter-400)":"var(--white)",display:"inline-flex",alignItems:"center",justifyContent:"center",
        transition:"var(--transition-base)"}}>
        {checked&&<span style={{width:10,height:6,borderLeft:"2px solid var(--ink-900)",borderBottom:"2px solid var(--ink-900)",transform:"rotate(-45deg) translateY(-1px)"}}/>}
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange}
        style={{position:"absolute",opacity:0,width:0,height:0}}/>
      {label}
    </label>
  );
}
