"use client";
import React, { useRef, useState, useEffect, useMemo} from "react";
import styles from "./oferta.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";
import ofertasMock from "@/mockup/ofertas";
import Link from "next/link";

export default function Ofertas() {
  // Normaliza mock para o card (usa somente campos do mock, com fallbacks)
  const itensNormalizados = useMemo(() => {
    const ativos = (ofertasMock || [])
      .filter((d) => !!d.oferta_ativa) // aceita 1 ou true
      .sort((a, b) =>
          new Date(b.oferta_data_publicacao) - new Date(a.oferta_data_publicacao)
      );
    return ativos.map((d) => ({
      id: d.oferta_id,
      agricultor_nome: d.agricultor_nome ||` Agricutlro#${d.agri_id ?? "?"}`,
      tipo: d.amendoim_tipo || `Amendoim #${d.amen_id ?? "?"}`,
      quantidade: `${d.oferta_quantidade ?? 0} kg`,
      imagem:
        d.imagem ||
        d.imagem_url ||
        // fallback genérico se nem imagem nem campo conhecido existir
        "https://blogmarcosfrahm.com/wp-content/uploads/2016/06/Amendoim.jpg",
      data_publicacao: d.oferta_data_publicacao,
      raw: d,
    }));
  }, [ofertasMock]);
  
  // Estado para gerenciar múltiplas linhas de carrossel
  const [linhas, setLinhas] = useState([]);
 

  // Refs para cada container de carrossel
  const containerRefs = useRef([]);

  // Funções de navegação para cada linha
  const handlePrev = (linhaId) => {
    setLinhas(prev => prev.map(linha => 
      linha.id === linhaId 
        ? {...linha, currentIndex: Math.max(0, linha.currentIndex - 1)}
        : linha
    ));
  };

  const handleNext = (linhaId) => {
    setLinhas(prev => prev.map(linha => 
      linha.id === linhaId
        ? {...linha, currentIndex: Math.min(linha.demandas.length - linha.maxVisibleCards, linha.currentIndex + 1)}
        : linha
    ));
  };

  // Atualiza as métricas dos cards
  useEffect(() => {
    const updateCardMetrics = () => {
      setLinhas(prev => prev.map((linha, index) => {
        const container = containerRefs.current[index];
        if (container) {
          const card = container.querySelector(`.${styles.demandaCard}`);
          if (card) {
            const cardStyle = window.getComputedStyle(card);
            const cardWidthWithMargin = card.offsetWidth + 
              parseFloat(cardStyle.marginRight) + 
              parseFloat(cardStyle.marginLeft);
            
            const containerWidth = container.offsetWidth;
            const cardsThatFit = Math.floor(containerWidth / cardWidthWithMargin);
            
            return {
              ...linha,
              cardWidth: cardWidthWithMargin,
              maxVisibleCards: cardsThatFit
            };
          }
        }
        return linha;
      }));
    };

    updateCardMetrics();
    const resizeObserver = new ResizeObserver(updateCardMetrics);
    
    containerRefs.current.forEach(container => {
      if (container) resizeObserver.observe(container);
    });

    return () => resizeObserver.disconnect();
  }, []);

  // Efeito para scroll suave
  useEffect(() => {
    linhas.forEach((linha, index) => {
      const container = containerRefs.current[index];
      if (container && linha.cardWidth > 0) {
        container.scrollTo({
          left: linha.currentIndex * linha.cardWidth,
          behavior: 'smooth'
        });
      }
    });
  }, [linhas]);

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

          {/* Renderiza cada linha de carrossel */}
          {linhas.map((linha, index) => (
            <div key={linha.id} className={styles.linhaContainer}>
              <h3 className={styles.tituloLinha}>{linha.titulo}</h3>
              
              <div className={styles.scrollWrapper}>
                {linha.demandas.length > linha.maxVisibleCards && (
                  <button 
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                    onClick={() => handlePrev(linha.id)}
                    disabled={linha.currentIndex === 0}
                  >
                    <IoIosArrowBack />
                  </button>
                )}

                <div 
                  className={styles.demandasGrid} 
                  ref={el => containerRefs.current[index] = el}
                  id={`carrossel-${linha.id}`}
                >
                  {linha.demandas.map((demanda) => (
                    <div key={demanda.id} className={styles.demandaCard}>
                      <p className={styles.empresa}>{demanda.nome_empresa}</p>
                      <div className={styles.imageContainer}>
                        <img src={demanda.imagem} alt={demanda.tipo} loading="lazy" />
                      </div>
                      <h3>{demanda.tipo}</h3>
                      <p className={styles.quantidade}>{demanda.quantidade}</p>
                      <Link href="/descricao_oferta">
                      <button className={styles.detalhes}>Ver detalhes</button>
                      </Link>
                    </div>
                  ))}
                </div>

                {linha.demandas.length > linha.maxVisibleCards && (
                  <button 
                    className={`${styles.arrow} ${styles.arrowRight}`}
                    onClick={() => handleNext(linha.id)}
                    disabled={linha.currentIndex >= linha.demandas.length - linha.maxVisibleCards}
                  >
                    <IoIosArrowForward />
                  </button>
                )}
              </div>
            </div>
          ))}
         <Link href="/criar_oferta">
          <button className={styles.criarOferta} >Criar Oferta</button>
          </Link>

        </div>
      </div>
    </>
  );
}