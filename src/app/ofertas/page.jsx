"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./oferta.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";
import Link from "next/link";
import Cardsofertas from "@/components/cardsofertas";
import api from "@/services/api";

export default function Ofertas() {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfertas();
  }, []);

  async function fetchOfertas() {
    try {
      const response = await api.get("/ofertas?limit=12"); // Aumentei o limite
      if (response.status === 200) {
        setOfertas(response.data.dados || []);
      }
    } catch (error) {
      alert("Erro ao buscar ofertas: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  // Dividir as ofertas em chunks de 6
  const chunkOfertas = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const ofertasChunks = chunkOfertas(ofertas, 6);
  
  // Criar refs dinâmicas para cada grid
  const gridRefs = ofertasChunks.map(() => React.createRef());

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

  console.log("Ofertas carregadas:", ofertas);
  console.log("Chunks:", ofertasChunks);

  return (
    <>
      <BarraNvg />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h2>Ofertas</h2>
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
          {ofertasChunks.map((chunk, chunkIndex) => (
            <div key={chunkIndex} className={styles.linhaContainer}>
              <h3 className={styles.tituloLinha}>
                {chunkIndex === 0 ? "Ofertas em Destaque" : `Mais Ofertas `}
              </h3>
              <div className={styles.scrollWrapper}>
                <button 
                  onClick={() => arrowLeft(chunkIndex)} 
                  className={`${styles.arrow} ${styles.arrowLeft}`} 
                  aria-label="Anterior"
                >
                  <IoIosArrowBack />
                </button>
                
                <div className={styles.ofertasGrid} ref={gridRefs[chunkIndex]}>
                  {chunk.map((oferta) => (
                    <Cardsofertas key={oferta.oferta_id} oferta={oferta} />
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

          {/* Se não há ofertas */}
          {!loading && ofertas.length === 0 && (
            <div className={styles.semOfertas}>
              <p>Nenhuma oferta encontrada</p>
              <Link href="/criar_oferta">
                <button className={styles.criarPrimeiraOferta}>
                  Criar Primeira Oferta
                </button>
              </Link>
            </div>
          )}

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