import React from "react";

export function Accordion({items=[],style,...rest}){
  const [open,setOpen]=React.useState(null);
  return (
    <div style={{fontFamily:"var(--font-core)",...style}} {...rest}>
      {items.map((it,i)=>{
        const on=open===i;
        return (
          <div key={i} style={{borderTop:"1px solid var(--border-subtle)"}}>
            <button onClick={()=>setOpen(on?null:i)}
              style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"var(--space-4)",
                background:"transparent",border:0,cursor:"pointer",padding:"20px 0",textAlign:"left",
                fontSize:"var(--text-lg)",fontWeight:"var(--weight-medium)",color:"var(--text-primary)"}}>
              {it.question}
              <span style={{fontSize:20,fontWeight:"var(--weight-light)",transform:on?"rotate(45deg)":"none",transition:"var(--transition-base)"}}>+</span>
            </button>
            {on&&<p style={{margin:"0 0 22px",maxWidth:"var(--measure)",font:"var(--type-body)",color:"var(--text-body)"}}>{it.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}
