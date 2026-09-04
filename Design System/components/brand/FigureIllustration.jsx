import React from "react";

const SRC={point:"alina-figure-point.png",arms:"alina-figure-arms.png"};

/** Packaged line-art figure standing on the brand's hairline ground rule. */
export function FigureIllustration({pose="arms",height=340,ground=true,base="assets/illustrations/",style,...rest}){
  return (
    <div style={{position:"relative",display:"flex",justifyContent:"center",alignItems:"flex-end",...style}} {...rest}>
      {ground&&<span style={{position:"absolute",left:0,right:0,bottom:"14%",borderTop:"1px solid var(--border-hairline)"}}/>}
      <img src={base+SRC[pose]} alt="" style={{height,width:"auto",position:"relative",mixBlendMode:"multiply"}}/>
    </div>
  );
}
