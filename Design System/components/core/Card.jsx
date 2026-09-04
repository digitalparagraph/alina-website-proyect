import React from "react";

export function Card({tone="paper",bordered=false,padding="var(--space-6)",style,children,...rest}){
  const tones={
    paper:{background:"var(--surface-card)"},
    butter:{background:"var(--butter-400)"},
    butterSoft:{background:"var(--butter-100)"},
    lilac:{background:"var(--surface-lilac)"},
    mist:{background:"var(--surface-mist)"},
    ink:{background:"var(--surface-inverse)",color:"var(--text-inverse)"}
  };
  return (
    <div style={{borderRadius:"var(--radius-lg)",padding,boxShadow:"var(--shadow-none)",
      border:bordered?"1px solid var(--ink-900)":"1px solid transparent",fontFamily:"var(--font-core)",
      ...tones[tone],...style}} {...rest}>{children}</div>
  );
}
