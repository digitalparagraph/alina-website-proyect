import React from "react";

const SRC={
  primary:"alina-logo.svg",        // full colour lockup (vector)
  byn:"alina-logo-byn.svg",        // one-colour / black & white lockup
  white:"logo-white.png",          // knockout lockup for dark fields
  isoAmarillo:"alina-iso-amarillo.svg",
  isoMorado:"alina-iso-morado.svg",
  isoGris:"alina-iso-gris.svg"
};

/** Renders the packaged logo files from assets/logos — never redraw the mark. */
export function Logo({variant="primary",height=88,base="assets/logos/",style,...rest}){
  return <img src={base+(SRC[variant]||SRC.primary)} alt="alina martínez — existir consciente"
    style={{height,width:"auto",display:"block",...style}} {...rest}/>;
}
