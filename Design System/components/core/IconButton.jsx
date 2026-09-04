import React from "react";

export function IconButton({size="md",variant="secondary",label,children,style,...rest}){
  const [hover,setHover]=React.useState(false);
  const dim={sm:32,md:40,lg:48}[size];
  const skin={
    primary:{background:"var(--butter-400)",borderColor:"transparent"},
    secondary:{background:"transparent",borderColor:"var(--ink-900)"},
    ghost:{background:"transparent",borderColor:"transparent"}
  }[variant];
  return (
    <button aria-label={label} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      style={{width:dim,height:dim,display:"inline-flex",alignItems:"center",justifyContent:"center",
        border:"1px solid",borderRadius:"var(--radius-circle)",cursor:"pointer",color:"var(--text-primary)",
        transition:"var(--transition-base)",...skin,
        background:hover?"var(--butter-100)":skin.background,...style}} {...rest}>
      {children}
    </button>
  );
}
