import React from "react";

const ITEMS=[
  {tone:"paper",title:"Sesión individual",copy:"50 minutos para ordenar lo que traes. En línea o presencial.",tag:"1:1"},
  {tone:"butterSoft",title:"Acompañamiento",copy:"Un proceso de varias semanas para sostener el cambio.",tag:"proceso"},
  {tone:"lilac",title:"Taller grupal",copy:"Herramientas prácticas en grupos pequeños.",tag:"grupo"}
];

export function Sessions({onAgendar}){
  const {Card,Badge,Button,Tabs}=window.NSREF;
  const [tab,setTab]=React.useState("i");
  return (
    <section id="sesiones" style={{background:"var(--surface-page)",fontFamily:"var(--font-core)",padding:"var(--space-9) var(--space-6)"}}>
      <div style={{maxWidth:"var(--container-max)",margin:"0 auto"}}>
        <h2 style={{fontSize:"var(--text-h1)",fontWeight:700,margin:"0 0 var(--space-3)"}}>Resuelve los temas que tienes pendientes y comienza a crecer</h2>
        <p style={{fontWeight:300,fontSize:"var(--text-lg)",maxWidth:"52ch",margin:"0 0 var(--space-6)",lineHeight:1.6}}>Elige el formato que te acomode. Si no sabes cuál, escríbeme y lo vemos juntas.</p>
        <Tabs items={[{value:"i",label:"Individual"},{value:"p",label:"Pareja"},{value:"g",label:"Grupo"}]} value={tab} onChange={setTab} style={{marginBottom:"var(--space-6)"}}/>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"var(--space-5)"}}>
          {ITEMS.map(it=>(
            <Card key={it.title} tone={it.tone} bordered={it.tone==="paper"}>
              <Badge tone={it.tone==="lilac"?"ink":"lilac"}>{it.tag}</Badge>
              <h3 style={{fontSize:"var(--text-h3)",fontWeight:700,margin:"var(--space-4) 0 var(--space-2)"}}>{it.title}</h3>
              <p style={{fontWeight:300,fontSize:"var(--text-body)",lineHeight:1.6,margin:"0 0 var(--space-5)"}}>{it.copy}</p>
              <Button variant="secondary" size="sm" onClick={onAgendar}>Agendar</Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
