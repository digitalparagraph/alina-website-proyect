import React from "react";

/** 1080×1350 post: quote above, line-art figure standing on the hairline ground rule. */
export function IllustrationPost({quote,pose="arms",logo="../../assets/logos/alina-logo.svg"}){
  const src="../../assets/illustrations/alina-figure-"+pose+".png";
  return (
    <div style={{width:1080,height:1350,background:"var(--butter-400)",fontFamily:"var(--font-core)",
      display:"flex",flexDirection:"column",alignItems:"center",padding:"70px 0 0",boxSizing:"border-box",position:"relative",overflow:"hidden"}}>
      <img src={logo} style={{height:190}} alt="alina martínez"/>
      <p style={{fontSize:52,lineHeight:1.22,textAlign:"center",fontWeight:300,margin:"80px 100px 0",color:"var(--ink-900)",textWrap:"pretty"}}>{quote}</p>
      <div style={{position:"absolute",left:0,right:0,bottom:0,height:660}}>
        <span style={{position:"absolute",left:0,right:0,bottom:145,borderTop:"1px solid var(--ink-900)"}}/>
        <img src={src} alt="" style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",height:650}}/>
      </div>
    </div>
  );
}
