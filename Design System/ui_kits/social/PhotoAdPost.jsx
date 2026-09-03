import React from "react";

/** 1080×1350 campaign/ad post: photo with stacked marker capsules and a knockout CTA. */
export function PhotoAdPost({photo="../../assets/brand/post-photo-example.png",lines=[],footnote,cta,logo="../../assets/logos/logo-white.png"}){
  return (
    <div style={{width:1080,height:1350,position:"relative",overflow:"hidden",fontFamily:"var(--font-core)",background:"var(--surface-mist)"}}>
      <img src={photo} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
      <div style={{position:"absolute",top:80,left:0,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
        {lines.map((l,i)=><span key={i} style={{background:"var(--butter-400)",fontWeight:700,fontSize:58,padding:"10px 26px",lineHeight:1.2,transform:"translateX("+(i%2?18:-18)+"px)"}}>{l}</span>)}
      </div>
      <div style={{position:"absolute",bottom:120,left:0,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:18}}>
        {footnote&&<span style={{background:"var(--butter-400)",fontWeight:700,fontSize:38,padding:"10px 22px",textAlign:"center",lineHeight:1.3,maxWidth:640}}>{footnote}</span>}
        {cta&&<span style={{color:"var(--white)",fontWeight:700,fontSize:44,padding:"14px 40px",border:"1px solid var(--butter-400)"}}>{cta}</span>}
      </div>
      <img src={logo} alt="" style={{position:"absolute",right:44,bottom:34,height:120}}/>
    </div>
  );
}
