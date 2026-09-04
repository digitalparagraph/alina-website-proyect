import React from "react";

/** The hairline rule the illustrations stand on — a signature brand device. */
export function Divider({tone="ink",spacing="var(--space-6)",style,...rest}){
  const color={ink:"var(--ink-900)",subtle:"var(--border-subtle)",lilac:"var(--lilac-300)"}[tone];
  return <hr style={{border:0,borderTop:"1px solid "+color,margin:spacing+" 0",width:"100%",...style}} {...rest}/>;
}
