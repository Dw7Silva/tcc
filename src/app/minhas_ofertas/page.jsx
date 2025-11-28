"use client";
import React, { useState, useEffect } from "react";
import styles from "./minhas_oferta.module.css";
import BarraNvg from "@/components/navbar/navbar";
import api from "@/services/api";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function MinhasOfertas() {
  const [minhasOfertas, setMinhasOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    carregarMinhasOfertas();
  }, []);

  const carregarMinhasOfertas = async () => {
    try {
      setLoading(true);
      
      // Buscar usuário logado do localStorage
      const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
      console.log("📦 DADOS DO LOCALSTORAGE:", usuarioLogado);
      
      if (!usuarioLogado?.agri_id) {
        console.log("❌ Usuário não identificado");
        setLoading(false);
        return;
      }

      console.log("🔄 Buscando ofertas do usuário - agri_id:", usuarioLogado.agri_id);

      // Buscar TODAS as ofertas e filtrar por agri_id
      const response = await api.get('/ofertas');
      
      if (response.data.sucesso) {
        // Filtrar ofertas pelo agri_id do usuário logado
        const ofertasDoUsuario = response.data.dados.filter(oferta => 
          oferta.agri_id === usuarioLogado.agri_id
        );

        console.log("✅ Ofertas encontradas:", ofertasDoUsuario);
        setMinhasOfertas(ofertasDoUsuario);
      } else {
        console.log("❌ Erro na resposta da API");
      }

    } catch (error) {
      console.error("❌ Erro ao carregar ofertas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarOferta = () => {
    router.push('/criar_oferta');
  };

  const handleVerDetalhes = (ofertaId) => {
    router.push(`/oferta/${ofertaId}`);
  };

  if (loading) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <h2>Minhas Ofertas</h2>
              </div>
            </div>
            <p>Carregando suas ofertas...</p>
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
              <h2>Minhas Ofertas</h2>
            </div>
          </div>

          <div className={styles.minhaofertaGrid} style={{ overflowX: "unset", flexWrap: "wrap" }}>
            {minhasOfertas.length > 0 ? (
              minhasOfertas.map((oferta) => (
                <div key={oferta.oferta_id} className={styles.minhaofertaCard}>
                  <h4 className={styles.empresa}>{oferta.agri_nome}</h4>
                  <div className={styles.imageContainer}>
                    <img 
                      src={oferta.oferta_img} 
                      alt={oferta.amen_variedade} 
                      onError={(e) => {
                        e.target.src = "/placeholder-ofertas.jpg";
                      }}
                    />
                  </div>
                  <h3>{oferta.amen_variedade}</h3>
                  <p className={styles.quantidade}>{oferta.oferta_quantidade} kg</p>
                  <button 
                    className={styles.detalhes}
                    onClick={() => handleVerDetalhes(oferta.oferta_id)}
                  >
                    Ver detalhes
                  </button>
                </div>
              ))
            ) : (
              <div style={{ width: '100%', textAlign: 'center', padding: '2rem' }}>
                <p>Você ainda não possui nenhuma oferta cadastrada.</p>
                <button 
                  onClick={handleCriarOferta}
                  style={{
                    marginTop: '1rem',
                    padding: '10px 20px',
                    backgroundColor: '#A87453',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Criar Primeira Oferta
                </button>
              </div>
            )}
          </div>

            <Link href="/criar_oferta" legacyBehavior>
            <button className={styles.criarOferta}>
              <span className={styles.textcriar}>Criar Oferta</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}