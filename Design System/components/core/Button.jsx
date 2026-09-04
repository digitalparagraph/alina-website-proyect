import React from "react";

const base={fontFamily:"var(--font-core)",fontWeight:"var(--weight-medium)",display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"var(--space-2)",border:"1px solid transparent",borderRadius:"var(--radius-pill)",cursor:"pointer",textDecoration:"none",lineHeight:1,transition:"var(--transition-base)",whiteSpace:"nowrap"};
const sizes={sm:{fontSize:"var(--text-sm)",padding:"9px 18px"},md:{fontSize:"var(--text-body)",padding:"13px 26px"},lg:{fontSize:"var(--text-lg)",padding:"17px 34px"}};
const variants={
  primary:{background:"var(--butter-400)",color:"var(--text-on-brand)"},
  secondary:{background:"transparent",color:"var(--text-primary)",borderColor:"var(--ink-900)"},
  lilac:{background:"var(--lilac-200)",color:"var(--text-primary)"},
  ghost:{background:"transparent",color:"var(--text-primary)"},
  inverse:{background:"var(--ink-900)",color:"var(--text-inverse)"}
};
const hovers={primary:{background:"var(--butter-300)"},secondary:{background:"var(--butter-100)"},lilac:{background:"var(--lilac-100)"},ghost:{background:"var(--butter-100)"},inverse:{background:"var(--ink-700)"}};

export function Button({variant="primary",size="md",disabled=false,fullWidth=false,as="button",iconLeft,iconRight,children,style,...rest}){
  const [hover,setHover]=React.useState(false);
  const [press,setPress]=React.useState(false);
  const Tag=as;
  return (
    <Tag
      disabled={as==="button"?disabled:undefined}
      onMouseEnter={()=>setHover(true)} onMouseLeave={()=>{setHover(false);setPress(false)}}
      onMouseDown={()=>setPress(true)} onMouseUp={()=>setPress(false)}
      style={{...base,...sizes[size],...variants[variant],...(hover&&!disabled?hovers[variant]:null),
        transform:press&&!disabled?"var(--press-scale)":"none",
        opacity:disabled?.4:1,pointerEvents:disabled?"none":"auto",
        width:fullWidth?"100%":"auto",...style}}
      {...rest}>
      {iconLeft}{children}{iconRight}
    </Tag>
  );
}
