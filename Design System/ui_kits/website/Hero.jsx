import React from "react";

export function Hero({onAgendar}){
  const {Button}=window.NSREF;
  return (
    <section id="inicio" style={{background:"var(--butter-400)",fontFamily:"var(--font-core)",overflow:"hidden"}}>
      <div style={{maxWidth:"var(--container-max)",margin:"0 auto",padding:"var(--space-8) var(--space-6) 0",
        display:"grid",gridTemplateColumns:"1.05fr .95fr",gap:"var(--space-7)",alignItems:"end"}}>
        <div style={{paddingBottom:"var(--space-9)"}}>
          <p style={{font:"var(--type-eyebrow)",letterSpacing:"var(--tracking-widest)",color:"var(--text-secondary)",margin:"0 0 var(--space-5)"}}>existir consciente</p>
          <h1 style={{fontSize:"clamp(40px,5vw,72px)",lineHeight:1.06,fontWeight:700,margin:"0 0 var(--space-5)",letterSpacing:"-.02em"}}>Plantea<br/>la vida<br/>planeada</h1>
          <p style={{fontWeight:300,fontSize:"var(--text-lg)",lineHeight:1.6,maxWidth:"34ch",margin:"0 0 var(--space-6)"}}>Conecta contigo mismo, agenda una sesión y reinicia tu vida.</p>
          <Button size="lg" onClick={onAgendar}>Agenda tu sesión</Button>
        </div>
        <div style={{position:"relative",height:520,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
          <span style={{position:"absolute",bottom:96,left:"-40%",right:"-40%",borderTop:"1px solid var(--ink-900)"}}/>
          <img src="../../assets/illustrations/alina-figure-arms.png" alt="" style={{height:500,position:"relative"}}/>
        </div>
      </div>
    </section>
  );
}
