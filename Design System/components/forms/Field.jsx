import React from "react";

/** Label + hint + error scaffold shared by the form controls. */
export function Field({label,hint,error,htmlFor,children,style,...rest}){
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"var(--space-2)",fontFamily:"var(--font-core)",...style}} {...rest}>
      {label&&<label htmlFor={htmlFor} style={{fontSize:"var(--text-sm)",fontWeight:"var(--weight-medium)",color:"var(--text-secondary)"}}>{label}</label>}
      {children}
      {(hint||error)&&<span style={{fontSize:"var(--text-xs)",fontWeight:"var(--weight-light)",color:error?"var(--state-error)":"var(--text-muted)"}}>{error||hint}</span>}
    </div>
  );
}
