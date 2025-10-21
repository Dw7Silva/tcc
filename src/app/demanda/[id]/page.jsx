// src/app/demanda/[id]/page.jsx (ou onde está seu DemandaPage)
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DemandaDescricao from "../descricao_demanda/page";
import api from "@/services/api";

export default function DemandaPage() {
  const { id } = useParams();
  const [demanda, setDemanda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchDemanda = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/demandas/filtro?demanda_id=${encodeURIComponent(id)}`
        );
        const dados = res?.data?.dados ?? null;
        const d = Array.isArray(dados) ? dados[0] : dados;
        if (!d) {
          setError(true);
          setDemanda(null);
        } else {
          setDemanda(d);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDemanda();
  }, [id]);

  if (loading) return null; // substituir por loader se quiser
  if (error || !demanda)
    return (
      <>
        <div style={{ padding: 24, textAlign: "center" }}>
          Demanda não encontrada
        </div>
      </>
    );

  return <DemandaDescricao demanda={demanda} />;

}