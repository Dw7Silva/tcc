// app/demanda/[id]/page.jsx
import React from "react";
import OfertaDescricao from "../descricao_oferta/page";
import ofertasMock from "@/mockup/ofertas";

export async function generateMetadata({ params }) {
  const id = params.id;
  const oferta = (ofertasMock || []).find((d) => String(d.oferta_id) === String(id));
  return {
    title: oferta ? `${oferta.agricultor_nome} • ${oferta.amendoim_tipo}` : "Oferta não encontrada",
  };
}

export default function Ofertapage({ params }) {
  const { id } = params;
  const oferta = (ofertasMock || []).find((d) => String(d.oferta_id) === String(id));

  if (!oferta) {
    return (
      <div style={{ padding: 32 }}>
        <h1>Oferta não encontrada</h1>
        <p>Não encontramos a oferta com id {id}.</p>
      </div>
    );
  }

  return <OfertaDescricao oferta={oferta} />;
}
