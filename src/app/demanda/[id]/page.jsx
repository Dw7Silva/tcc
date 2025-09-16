// app/demanda/[id]/page.jsx
import React from "react";
import DemandaDescricao from "../descricao_demanda/page";
import demandasMock from "@/mockup/demandas";

export async function generateMetadata({ params }) {
  // opcional: metadata dinâmico
  const id = params.id;
  const demanda = (demandasMock || []).find((d) => String(d.demanda_id) === String(id));
  return {
    title: demanda ? `${demanda.empresa_nome} • ${demanda.amendoim_tipo}` : "Demanda não encontrada",
  };
}

export default function DemandaPage({ params }) {
  const { id } = params;
  const demanda = (demandasMock || []).find((d) => String(d.demanda_id) === String(id));

  if (!demanda) {
    return (
      <div style={{ padding: 32 }}>
        <h1>Demanda não encontrada</h1>
        <p>Não encontramos a demanda com id {id}.</p>
      </div>
    );
  }

  // passa o objeto completo para o componente client
  return <DemandaDescricao demanda={demanda} />;
}
