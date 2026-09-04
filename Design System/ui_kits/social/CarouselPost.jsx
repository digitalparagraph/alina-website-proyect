import React from "react";

/** 1080×1350 opening slide for a carousel: title inside a drawn arc, quotes floating around it. */
export function CarouselPost({title,orbit=[],logo="../../assets/logos/alina-logo.svg"}){
  return (
    <div style={{width:1080,height:1350,background:"var(--butter-400)",fontFamily:"var(--font-core)",
      position:"relative",overflow:"hidden",padding:"70px 0",boxSizing:"border-box"}}>
      <img src={logo} style={{height:190,display:"block",margin:"0 auto"}} alt="alina martínez"/>
      <div style={{position:"absolute",top:330,left:170,width:740,height:740,border:"1px solid var(--ink-900)",borderRadius:"50%",clipPath:"polygon(0 0,42% 0,42% 12%,0 12%,0 100%,100% 100%,100% 0,58% 0,58% 12%,100% 12%)"}}/>
      <div style={{position:"absolute",top:600,left:120,right:120,textAlign:"center"}}>
        <span style={{position:"absolute",left:60,right:60,top:66,height:96,background:"var(--accent-brush)",display:"block",borderRadius:"4px 30px 6px 24px"}}/>
        <p style={{position:"relative",fontWeight:700,fontSize:62,lineHeight:1.18,margin:0,textWrap:"pretty"}}>{title}</p>
      </div>
      {orbit.map((t,i)=>{
        const pos=[{top:330,left:90},{top:330,right:90},{bottom:250,left:200},{bottom:250,right:200}][i]||{};
        return <p key={i} style={{position:"absolute",...pos,fontWeight:300,fontSize:38,lineHeight:1.25,maxWidth:300,margin:0}}>{"“"+t+"”"}</p>;
      })}
    </div>
  );
}
