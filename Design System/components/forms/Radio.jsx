import React from "react";

export function Radio({checked=false,onChange,label,name,value,disabled=false,style,...rest}){
  return (
    <label style={{display:"inline-flex",alignItems:"center",gap:"var(--space-3)",fontFamily:"var(--font-core)",
      fontSize:"var(--text-body)",fontWeight:"var(--weight-light)",color:"var(--text-body)",
      cursor:disabled?"default":"pointer",opacity:disabled?.4:1,...style}} {...rest}>
      <span style={{width:22,height:22,flex:"0 0 22px",borderRadius:"var(--radius-circle)",border:"1px solid var(--ink-900)",
        background:"var(--white)",display:"inline-flex",alignItems:"center",justifyContent:"center"}}>
        {checked&&<span style={{width:11,height:11,borderRadius:"var(--radius-circle)",background:"var(--lilac-400)"}}/>}
      </span>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange}
        style={{position:"absolute",opacity:0,width:0,height:0}}/>
      {label}
    </label>
  );
}
