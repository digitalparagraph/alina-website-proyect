import React from "react";

export function SiteFooter(){
  return (
    <footer style={{background:"var(--ink-900)",color:"var(--text-inverse)",fontFamily:"var(--font-core)",padding:"var(--space-8) var(--space-6)"}}>
      <div style={{maxWidth:"var(--container-max)",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"var(--space-6)",flexWrap:"wrap"}}>
        <img src="../../assets/logos/logo-white.png" alt="alina martínez" style={{height:96}}/>
        <p style={{fontWeight:300,fontSize:"var(--text-sm)",margin:0,maxWidth:"34ch",lineHeight:1.6}}>Conecta contigo mismo, agenda una sesión y reinicia tu vida.</p>
        <div style={{display:"flex",gap:"var(--space-5)",fontSize:"var(--text-sm)",fontWeight:300}}>
          <a href="#inicio" style={{color:"var(--white)",textDecoration:"none"}}>Instagram</a>
          <a href="#inicio" style={{color:"var(--white)",textDecoration:"none"}}>Facebook</a>
          <a href="#inicio" style={{color:"var(--white)",textDecoration:"none"}}>WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
