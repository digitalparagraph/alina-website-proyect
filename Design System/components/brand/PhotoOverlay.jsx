import React from "react";

/** Photo with the brand's stacked marker-capsule headline, as used in the sales campaign. */
export function PhotoOverlay({src,alt="",lines=[],footnote,cta,ratio="4 / 5",style,...rest}){
  return (
    <div style={{position:"relative",aspectRatio:ratio,overflow:"hidden",background:"var(--surface-mist)",...style}} {...rest}>
      <img src={src} alt={alt} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
      <div style={{position:"absolute",top:"6%",left:0,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
        {lines.map((l,i)=>(
          <span key={i} style={{background:"var(--butter-400)",color:"var(--text-primary)",fontFamily:"var(--font-core)",
            fontWeight:"var(--weight-bold)",fontSize:"clamp(18px,3.6cqw,34px)",padding:"6px 16px",lineHeight:1.18}}>{l}</span>
        ))}
      </div>
      {(footnote||cta)&&(
        <div style={{position:"absolute",bottom:"7%",left:0,right:0,display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
          {footnote&&<span style={{background:"var(--butter-400)",fontFamily:"var(--font-core)",fontWeight:"var(--weight-bold)",
            fontSize:"clamp(13px,2.2cqw,20px)",padding:"6px 14px",textAlign:"center",lineHeight:1.3}}>{footnote}</span>}
          {cta&&<span style={{color:"var(--white)",fontFamily:"var(--font-core)",fontWeight:"var(--weight-bold)",
            fontSize:"clamp(15px,2.6cqw,24px)",padding:"8px 22px",border:"1px solid var(--butter-400)"}}>{cta}</span>}
        </div>
      )}
    </div>
  );
}
