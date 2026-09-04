import React from "react";

/** 1080×1350 quote post — the brand's highest-volume format. */
export function QuotePost({quote,bold,logo="../../assets/logos/alina-logo.svg",brush=false}){
  return (
    <div style={{width:1080,height:1350,background:"var(--butter-400)",fontFamily:"var(--font-core)",
      display:"flex",flexDirection:"column",alignItems:"center",padding:"70px 90px",boxSizing:"border-box",position:"relative"}}>
      <img src={logo} style={{height:190}} alt="alina martínez"/>
      <div style={{flex:1,display:"flex",alignItems:"center"}}>
        <p style={{fontSize:64,lineHeight:1.16,textAlign:"center",margin:0,fontWeight:300,color:"var(--ink-900)",textWrap:"pretty"}}>
          {bold&&<span style={{fontWeight:700,background:brush?"var(--accent-brush)":"transparent",padding:brush?"0 8px":0}}>{bold}</span>}
          {bold&&" "}{quote}
        </p>
      </div>
    </div>
  );
}
