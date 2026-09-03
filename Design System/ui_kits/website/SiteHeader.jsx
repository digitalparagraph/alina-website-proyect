import React from "react";

export function SiteHeader({onNav,active="inicio"}){
  const items=[["inicio","Inicio"],["sesiones","Sesiones"],["sobre","Sobre mí"],["preguntas","Preguntas"]];
  return (
    <header style={{position:"sticky",top:0,zIndex:20,background:"var(--butter-400)",fontFamily:"var(--font-core)"}}>
      <div style={{maxWidth:"var(--container-max)",margin:"0 auto",padding:"18px var(--space-6)",display:"flex",
        alignItems:"center",justifyContent:"space-between",gap:"var(--space-6)"}}>
        <img src="../../assets/logos/alina-logo.svg" alt="alina martínez" style={{height:64}}/>
        <nav style={{display:"flex",gap:"var(--space-6)"}}>
          {items.map(([id,label])=>(
            <a key={id} href={"#"+id} onClick={()=>onNav&&onNav(id)}
              style={{textDecoration:"none",fontSize:"var(--text-body)",fontWeight:active===id?500:300,
                color:"var(--text-primary)",borderBottom:"1px solid "+(active===id?"var(--ink-900)":"transparent"),paddingBottom:2}}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
