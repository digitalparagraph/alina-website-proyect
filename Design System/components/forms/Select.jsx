import React from "react";

export function Select({options=[],style,...rest}){
  const [focus,setFocus]=React.useState(false);
  return (
    <select onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
      style={{...{fontFamily:"var(--font-core)",fontSize:"var(--text-body)",fontWeight:"var(--weight-light)",color:"var(--text-body)",background:"var(--white)",border:"1px solid var(--gray-300)",borderRadius:"var(--radius-sm)",padding:"13px 16px",width:"100%",boxSizing:"border-box",outline:"none",transition:"var(--transition-base)"},appearance:"none",cursor:"pointer",
        backgroundImage:"linear-gradient(45deg,transparent 50%,var(--ink-600) 50%),linear-gradient(135deg,var(--ink-600) 50%,transparent 50%)",
        backgroundPosition:"calc(100% - 20px) 50%,calc(100% - 14px) 50%",
        backgroundSize:"6px 6px,6px 6px",backgroundRepeat:"no-repeat",
        borderColor:focus?"var(--lilac-400)":"var(--gray-300)",boxShadow:focus?"var(--ring-focus)":"none",...style}} {...rest}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
