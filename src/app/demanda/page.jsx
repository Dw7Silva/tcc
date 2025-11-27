"use client";
import React, { useState, useEffect } from "react";
import styles from "./demandas.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";
import Link from "next/link";
import Cardsprodutos from "@/components/cardsdemands/cardsdemands";
import api from "@/services/api";

export default function Demandas() {
  const [demandas, setDemandas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDemandas();
  }, []);

  async function fetchDemandas() {
    try {
      const response = await api.get("/demandas/filtro?limit=12"); // Aumentei o limite
      if (response.status === 200) {
        setDemandas(response.data.dados || []);
      }
    } catch (error) {
      alert("Erro ao buscar demandas: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // Dividir as demandas em chunks de 6
  const chunkDemandas = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const demandasChunks = chunkDemandas(demandas, 6);
  const gridRefs = demandasChunks.map(() => React.createRef());

  const arrowLeft = (index) => {
    if (gridRefs[index].current) {
      gridRefs[index].current.scrollBy({
        left: -gridRefs[index].current.offsetWidth,
        behavior: "smooth"
      });
    }
  };

  const arrowRight = (index) => {
    if (gridRefs[index].current) {
      gridRefs[index].current.scrollBy({
        left: gridRefs[index].current.offsetWidth,
        behavior: "smooth"
      });
    }
  };

  console.log("Demandas carregadas:", demandas);
  console.log("Chunks:", demandasChunks);

  return (
    <>
      <BarraNvg />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h2>Demandas</h2>
              <div className={styles.filtro}>
                <label htmlFor="filtro">Filtrar:</label>
                <select id="filtro">
                  <option value="todos">Todos</option>
                  <option value="casca">Com Casca</option>
                  <option value="pele">Com Pele</option>
                  <option value="sempele">Sem Pele</option>
                </select>
              </div>
            </div>
          </div>

          {/* Renderizar múltiplas linhas/grids */}
          {demandasChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className={styles.linhaContainer}>
              <h3 className={styles.tituloLinha}>
                {chunkIndex === 0 ? "Demandas em Destaque" : `Mais Demandas `}
              </h3>
              <div className={styles.scrollWrapper}>
                <button 
                  onClick={() => arrowLeft(chunkIndex)} 
                  className={`${styles.arrow} ${styles.arrowLeft}`} 
                  aria-label="Anterior"
                >
                  <IoIosArrowBack />
                </button>
                
                <div className={styles.demandasGrid} ref={gridRefs[chunkIndex]}>
                  {chunk.map((demanda) => (
                    <Cardsprodutos key={demanda.demanda_id} demanda={demanda} />
                  ))}
                </div>
                
                <button 
                  onClick={() => arrowRight(chunkIndex)} 
                  className={`${styles.arrow} ${styles.arrowRight}`} 
                  aria-label="Próximo"
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          ))}

          {/* Se não há demandas */}
          {!loading && demandas.length === 0 && (
            <div className={styles.semDemandas}>
              <p>Nenhuma demanda encontrada</p>
              <Link href="/criar_demanda">
                <button className={styles.criarPrimeiraDemanda}>
                  Criar Primeira Demanda
                </button>
              </Link>
            </div>
          )}

          <Link href="/criar_demanda" legacyBehavior>
            <button className={styles.criarOferta}>
              <span className={styles.textcriar}>Criar Demanda</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}