import React from "react";

export function Dialog({open=true,title,onClose,footer,children,width=520,style,...rest}){
  if(!open) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"var(--overlay-scrim)",backdropFilter:"var(--blur-veil)",
      display:"flex",alignItems:"center",justifyContent:"center",padding:"var(--space-5)",zIndex:50}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"var(--surface-card)",borderRadius:"var(--radius-lg)",
        boxShadow:"var(--shadow-overlay)",width,maxWidth:"100%",padding:"var(--space-6)",fontFamily:"var(--font-core)",...style}} {...rest}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"var(--space-4)"}}>
          {title&&<h3 style={{margin:0,font:"var(--type-heading)",fontSize:"var(--text-h3)"}}>{title}</h3>}
          {onClose&&<button onClick={onClose} aria-label="Cerrar" style={{border:0,background:"transparent",fontSize:18,cursor:"pointer",lineHeight:1,color:"var(--text-secondary)"}}>✕</button>}
        </div>
        <div style={{marginTop:"var(--space-4)",font:"var(--type-body)",color:"var(--text-body)"}}>{children}</div>
        {footer&&<div style={{marginTop:"var(--space-6)",display:"flex",gap:"var(--space-3)",justifyContent:"flex-end"}}>{footer}</div>}
      </div>
    </div>
  );
}
