import React from "react";

export function Contact({onSubmit,sent}){
  const {Accordion,Field,Input,Textarea,Select,Checkbox,Button,Toast}=window.NSREF;
  const [ok,setOk]=React.useState(false);
  return (
    <section id="preguntas" style={{background:"var(--butter-400)",fontFamily:"var(--font-core)",padding:"var(--space-9) var(--space-6)"}}>
      <div style={{maxWidth:"var(--container-max)",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"var(--space-8)"}}>
        <div>
          <h2 style={{fontSize:"var(--text-h2)",fontWeight:700,margin:"0 0 var(--space-5)"}}>Preguntas frecuentes</h2>
          <Accordion items={[
            {question:"¿Cuánto dura una sesión?",answer:"50 minutos, en línea o presencial."},
            {question:"¿Cada cuándo nos vemos?",answer:"Cada semana al principio; después ajustamos el ritmo juntas."},
            {question:"¿Cómo agendo?",answer:"Llena el formulario y te comparto los horarios disponibles."},
            {question:"¿Es terapia?",answer:"Es acompañamiento en coaching: trabajamos sobre decisiones y hábitos del presente."}
          ]}/>
        </div>
        <div style={{background:"var(--surface-card)",borderRadius:"var(--radius-lg)",padding:"var(--space-6)"}}>
          <h2 style={{fontSize:"var(--text-h3)",fontWeight:700,margin:"0 0 var(--space-5)"}}>Agenda tu sesión</h2>
          <div style={{display:"flex",flexDirection:"column",gap:"var(--space-4)"}}>
            <Field label="Nombre"><Input placeholder="Tu nombre"/></Field>
            <Field label="Correo" hint="Te respondo en menos de 24 h"><Input placeholder="tu@correo.com"/></Field>
            <Field label="Tipo de sesión"><Select options={[{value:"i",label:"Sesión individual"},{value:"p",label:"Sesión de pareja"},{value:"g",label:"Taller grupal"}]}/></Field>
            <Field label="¿Qué te trae aquí?"><Textarea rows={3} placeholder="Cuéntame en una línea"/></Field>
            <Checkbox checked={ok} onChange={e=>setOk(e.target.checked)} label="Acepto el aviso de privacidad"/>
            <Button fullWidth disabled={!ok} onClick={onSubmit}>Enviar</Button>
            {sent&&<Toast tone="success" message="Gracias, te escribo pronto."/>}
          </div>
        </div>
      </div>
    </section>
  );
}
