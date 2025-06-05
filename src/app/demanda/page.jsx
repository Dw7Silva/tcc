"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./demandas.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";
import Link from "next/link";

export default function Demandas() {
  // Estado para gerenciar múltiplas linhas de carrossel

  let demandas_imagem = {

    Amendoim_1 : "https://img.olx.com.br/images/35/354519630978865.webp" ,
    Amendoim_2 :"https://img.olx.com.br/images/21/212434617469791.webp",
    Amendoim_3 : "https://thumbs.dreamstime.com/b/dep%C3%B3sito-de-armazenamento-em-sacos-amendoim-no-brasil-visto-baixo-dos-206695366.jpg",
    Amendoim_4 :  "https://img.mfrural.com.br/api/image?url=https://s3.amazonaws.com/mfrural-produtos-us/224488-366748-2000954-amendoim.webp&width=480&height=288&mode=4" ,
    Amendoim_5 :"https://thumbs.dreamstime.com/z/um-saco-de-amendoim-47927630.jpg",
    Amendoim_6 :   "https://blogmarcosfrahm.com/wp-content/uploads/2016/06/Amendoim.jpg" ,
    Amendoim_7 :  "https://img.mfrural.com.br/api/image?url=https://s3.amazonaws.com/mfrural-produtos-us/120353-247626-79940346-amendoim-em-casca.webp&width=289&height=220&mode=4" ,
    Amendoim_8 : "https://img.mfrural.com.br/api/image?url=https://s3.amazonaws.com/mfrural-produtos-us/55518-443952-2351855-pelets-de-casca-de-amendoim.webp&width=289&height=220&mode=4", 
    Amendoim_9 : "https://www.embtec.com.br/media/resize/1110x1500/pasta/1/5dbb2d455571d.jpg",
  } 

  
  const [linhas, setLinhas] = useState([
    {
      id: 1,
      titulo: "Demandas em Destaque",
      demandas: [
        { id: 1, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "50 saca", imagem: demandas_imagem.Amendoim_1 },
        { id: 2, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "50 saca", imagem:  demandas_imagem.Amendoim_2 },
        { id: 3, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "50 saca", imagem:  demandas_imagem.Amendoim_3 },
        { id: 4, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "40 saca", imagem:  demandas_imagem.Amendoim_4 },
        { id: 5, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "55 saca", imagem:  demandas_imagem.Amendoim_5},
      ],
      currentIndex: 0,
      cardWidth: 0,
      maxVisibleCards: 0
    },
    {
      id: 2,
      titulo: "Demandas Recentes",
      demandas: [
        { id: 6, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "60 saca", imagem:  demandas_imagem.Amendoim_6 },
        { id: 7, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "50 saca", imagem:  demandas_imagem.Amendoim_7},
        { id: 8, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "45 saca", imagem:  demandas_imagem.Amendoim_8 },
        { id: 9, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "52 saca", imagem:  demandas_imagem.Amendoim_9 },
        { id: 10, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "52 saca", imagem:  demandas_imagem.Amendoim_9 },
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
                      <Link href="/descricao_demanda" >
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
       
          <button className={styles.criarOferta}>Criar Demanda</button>
        </div>
      </div>
    </>
  );
}