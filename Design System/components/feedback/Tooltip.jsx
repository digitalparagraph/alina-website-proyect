import React from "react";

export function Tooltip({label,children,style,...rest}){
  const [show,setShow]=React.useState(false);
  return (
    <span style={{position:"relative",display:"inline-flex"}} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)} {...rest}>
      {children}
      {show&&<span style={{position:"absolute",bottom:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",
        background:"var(--ink-900)",color:"var(--white)",fontFamily:"var(--font-core)",fontSize:"var(--text-xs)",
        padding:"6px 10px",borderRadius:"var(--radius-xs)",whiteSpace:"nowrap",...style}}>{label}</span>}
    </span>
  );
}
