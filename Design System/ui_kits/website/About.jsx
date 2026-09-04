import React from "react";

export function About(){
  const {Highlight,Divider}=window.NSREF;
  return (
    <section id="sobre" style={{background:"var(--surface-mist)",fontFamily:"var(--font-core)",padding:"var(--space-9) var(--space-6)"}}>
      <div style={{maxWidth:"var(--container-max)",margin:"0 auto",display:"grid",gridTemplateColumns:".9fr 1.1fr",gap:"var(--space-8)",alignItems:"center"}}>
        <img src="../../assets/brand/alina-portrait.png" alt="Alina Martínez" style={{width:"100%",borderRadius:"var(--radius-lg)",display:"block"}}/>
        <div>
          <p style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-widest)",color:"var(--text-secondary)",margin:"0 0 var(--space-4)"}}>sobre mí</p>
          <h2 style={{fontSize:"var(--text-h1)",fontWeight:700,lineHeight:1.1,margin:"0 0 var(--space-5)"}}>Cada una de tus <Highlight>decisiones</Highlight> importa</h2>
          <p style={{fontWeight:300,fontSize:"var(--text-lg)",lineHeight:1.65,maxWidth:"52ch",margin:0}}>Te ayudo a tomarlas de manera consciente. El cambio es todos los días: trabajamos a tu ritmo, sin recetas y sin prisa, para que puedas nombrar lo que sientes y avanzar.</p>
          <Divider tone="ink" spacing="var(--space-6)"/>
          <div style={{display:"flex",gap:"var(--space-7)",fontWeight:300,fontSize:"var(--text-sm)",color:"var(--text-secondary)"}}>
            <span>Sesiones en línea<br/>y presenciales</span><span>Enfoque en emociones<br/>y decisiones</span><span>Español<br/>México</span>
          </div>
        </div>
      </div>
    </section>
  );
}
