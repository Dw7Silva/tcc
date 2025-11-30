"use client";
import React, { useState, useEffect } from "react";
import styles from "./minhasdemandas.module.css"; 
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";
import Link from "next/link"; 
import { useRouter } from 'next/navigation';

export default function MinhasDemandas() {
  const [minhasDemandas, setMinhasDemandas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    carregarMinhasDemandas();
  }, []);

  const carregarMinhasDemandas = async () => {
    try {
      setLoading(true);
      
      // Buscar usuário logado do localStorage
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      console.log("📦 DADOS DO LOCALSTORAGE:", usuarioLogado);
      
      if (!usuarioLogado?.id) {
        console.log("❌ Usuário não identificado");
        setLoading(false);
        return;
      }

      console.log("🔄 Buscando demandas do usuário - emp_id:", usuarioLogado.emp_id);

      // Buscar TODAS as demandas e filtrar por emp_id
      const response = await api.get('/demandas');
      
      if (response.data.sucesso) {
        // Filtrar demandas pelo emp_id do usuário logado
        const demandasDoUsuario = response.data.dados.filter(demanda => 
          demanda.emp_id === usuarioLogado.emp_id
        );

        console.log("✅ Demandas encontradas:", demandasDoUsuario);
        setMinhasDemandas(demandasDoUsuario);
      } else {
        console.log("❌ Erro na resposta da API");
      }

    } catch (error) {
      console.error("❌ Erro ao carregar demandas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarDemanda = () => {
    router.push('/criar_demanda');
  };

  const handleVerDetalhes = (demandaId) => {
    router.push(`/demanda/${demandaId}`);
  };

  if (loading) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <h2>Minhas Demandas</h2>
              </div>
            </div>
            <p>Carregando suas demandas...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BarraNvg />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h2>Minhas Demandas</h2>
            </div>
          </div>

          <div className={styles.demandasGrid} style={{ overflowX: "unset", flexWrap: "wrap" }}>
            {minhasDemandas.length > 0 ? (
              minhasDemandas.map((demanda) => (
                <div key={demanda.demanda_id} className={styles.demandaCard}>
                  <h4 className={styles.empresa}>{demanda.emp_nome_fantasia}</h4>
                  <div className={styles.imageContainer}>
                    <img 
                      src={demanda.demanda_imagem} 
                      alt={demanda.amen_variedade} 
                      onError={(e) => {
                        e.target.src = "/placeholder-demandas.jpg";
                      }}
                    />
                  </div>
                  <h3>{demanda.amen_variedade}</h3>
                  <p className={styles.quantidade}>{demanda.demanda_quantidade} kg</p>
                  <button 
                    className={styles.detalhes}
                    onClick={() => handleVerDetalhes(demanda.demanda_id)}
                  >
                    Ver detalhes
                  </button>
                </div>

                
              ))
            ) : (
              <div className={styles.semDemandas}>
                <p className={styles.semDemandastext}>Você ainda não criou nenhuma demanda.</p>
              </div>
            )}
          </div>
        </div>
           <Link href="/criar_demanda" legacyBehavior>
            <button className={styles.criarDemanda}>
              <span className={styles.textcriar}>Criar Demanda</span>
            </button>
          </Link>
      </div>
    </>
  );
}