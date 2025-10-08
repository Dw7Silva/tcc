// app/demanda/[id]/page.jsx
import React from "react";
import OfertaDescricao from "../descricao_oferta/page";
import ofertasMock from "@/mockup/ofertas";
import { notFound } from "next/navigation";
import { use } from "react";  

export default function Ofertapage({ params }) {
  const id_oferta = use(Promise.resolve(params))  
  const { id } = id_oferta;
  const oferta = ofertasMock.find(oferta => oferta.oferta_id === parseInt(id)); 

  if (!oferta) {
    return (
      notFound()  
    );
  }

  return <OfertaDescricao oferta={oferta} />;
}
 