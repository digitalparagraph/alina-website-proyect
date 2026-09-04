import React from "react";

export function Textarea({rows=4,invalid=false,style,...rest}){
  const [focus,setFocus]=React.useState(false);
  return <textarea rows={rows} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
    style={{...{fontFamily:"var(--font-core)",fontSize:"var(--text-body)",fontWeight:"var(--weight-light)",color:"var(--text-body)",background:"var(--white)",border:"1px solid var(--gray-300)",borderRadius:"var(--radius-sm)",padding:"13px 16px",width:"100%",boxSizing:"border-box",outline:"none",transition:"var(--transition-base)"},lineHeight:"var(--leading-normal)",resize:"vertical",
      borderColor:invalid?"var(--state-error)":focus?"var(--lilac-400)":"var(--gray-300)",
      boxShadow:focus?"var(--ring-focus)":"none",...style}} {...rest}/>;
}
