import React from "react";

/**
 * Thin line icons. The brand ships no icon set of its own, so this wraps Lucide
 * (CDN, stroke-based) tuned to the illustration line weight. Flagged substitution — see readme.md.
 */
export function Icon({name,size=22,stroke=1.75,color="currentColor",style,...rest}){
  const src="https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/"+name+".svg";
  return <img src={src} width={size} height={size} alt=""
    style={{display:"inline-block",verticalAlign:"middle",
      filter:color==="var(--white)"||color==="#fff"?"invert(1)":"none",
      opacity:1,strokeWidth:stroke,...style}} {...rest}/>;
}
