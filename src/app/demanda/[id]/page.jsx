// app/demanda/[id]/page.jsx
import {use} from "react";
import DemandaDescricao from "../descricao_demanda/page";
import demandasMock from "@/mockup/demandas";
import { notFound } from "next/navigation";



export default function DemandaPage({ params }) {
  const id_demanda = use(Promise.resolve(params))
  const { id } = id_demanda ;
const demanda = demandasMock.find(demanda => demanda.demanda_id === parseInt(id))

  if (!demanda) {

        notFound()
  }

  // passa o objeto completo para o componente client
  return <DemandaDescricao demanda={demanda} />;
}
