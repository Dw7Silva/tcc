"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./demandas.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";

export default function Demandas() {
  // Estado para gerenciar múltiplas linhas de carrossel
  const [linhas, setLinhas] = useState([
    {
      id: 1,
      titulo: "Demandas em Destaque",
      demandas: [
        { id: 1, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "50 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
        { id: 2, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "50 saca", imagem: "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg" },
        { id: 3, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "50 saca", imagem: "https://image.tuasaude.com/media/article/wg/xp/beneficios-do-amendoim_17802.jpg" },
        { id: 4, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "40 saca", imagem: "https://feed.continente.pt/media/aaeoih2v/amendoim-beneficios.jpg?center=0.43958293115759167,0.45275669909355631&mode=crop&width=1090&height=467&rnd=133298540351630000&format=webp" },
        { id: 5, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "55 saca", imagem: "https://s2-ge.glbimg.com/fJ1Qo8xVlmVQH5cGcNq16UBgoqk=/0x0:1273x824/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/K/z/2SS07CSRe6kf6XQhBjtw/amendoim.jpg" },
      ],
      currentIndex: 0,
      cardWidth: 0,
      maxVisibleCards: 0
    },
    {
      id: 2,
      titulo: "Demandas Recentes",
      demandas: [
        { id: 6, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "60 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
        { id: 7, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "50 saca", imagem: "https://image.tuasaude.com/media/article/wg/xp/beneficios-do-amendoim_17802.jpg" },
        { id: 8, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "45 saca", imagem: "https://example.com/amendoim8.jpg" },
        { id: 9, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "52 saca", imagem: "https://example.com/amendoim9.jpg" },
      ],
      currentIndex: 0,
      cardWidth: 0,
      maxVisibleCards: 0
    }
    // Adicione mais linhas conforme necessário
  ]);

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
                      <button className={styles.detalhes}>Ver detalhes</button>
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
       
          <button className={styles.criarOferta}>Criar Demanda</button>
        </div>
      </div>
    </>
  );
}