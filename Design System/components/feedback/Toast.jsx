import React from "react";

export function Toast({tone="success",message,onClose,style,...rest}){
  const tones={success:"var(--sage-300)",info:"var(--lilac-200)",warning:"var(--butter-400)",error:"var(--blush-300)"};
  return (
    <div role="status" style={{display:"inline-flex",alignItems:"center",gap:"var(--space-4)",background:tones[tone],
      color:"var(--text-primary)",padding:"14px 18px",borderRadius:"var(--radius-pill)",fontFamily:"var(--font-core)",
      fontSize:"var(--text-sm)",boxShadow:"var(--shadow-soft)",...style}} {...rest}>
      {message}
      {onClose&&<span onClick={onClose} style={{cursor:"pointer",opacity:.55}}>✕</span>}
    </div>
  );
}
