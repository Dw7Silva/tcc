"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "./demandas.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";


export default function Demandas() {
  const containerRefs = [useRef(null), useRef(null), useRef(null)];
  const [cardWidth, setCardWidth] = useState(0);
  const [showArrows, setShowArrows] = useState([false, false, false]);

  // Dados de exemplo para 3 linhas de demandas
  const demandas = [
    { id: 1, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "50 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
    { id: 2, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "50 saca", imagem: "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg" },
    { id: 3, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "50 saca", imagem: "https://image.tuasaude.com/media/article/wg/xp/beneficios-do-amendoim_17802.jpg" },
    { id: 4, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "40 saca", imagem: "https://feed.continente.pt/media/aaeoih2v/amendoim-beneficios.jpg?center=0.43958293115759167,0.45275669909355631&mode=crop&width=1090&height=467&rnd=133298540351630000&format=webp" },
    { id: 5, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "55 saca", imagem: "https://s2-ge.glbimg.com/fJ1Qo8xVlmVQH5cGcNq16UBgoqk=/0x0:1273x824/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/K/z/2SS07CSRe6kf6XQhBjtw/amendoim.jpg" },
    { id: 6, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "60 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
  ];

  const scroll = (rowIndex, direction) => {
    if (containerRefs[rowIndex].current) {
      const container = containerRefs[rowIndex].current;
      const currentScrollLeft = container.scrollLeft;
      const newScrollLeft = currentScrollLeft + direction * cardWidth;
      container.scrollTo({ left: Math.round(newScrollLeft), behavior: "smooth" });
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      const newShowArrows = [];
      containerRefs.forEach(ref => {
        if (ref.current) {
          const { scrollWidth, clientWidth } = ref.current;
          newShowArrows.push(scrollWidth > clientWidth);
        }
      });
      setShowArrows(newShowArrows);
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    if (demandas.length > 0 && containerRefs[0].current) {
      const firstCard = containerRefs[0].current.querySelector(`.${styles.demandaCard}`);
      if (firstCard) {
        const cardOuterWidth = firstCard.offsetWidth;
        const cardMarginRight = parseFloat(window.getComputedStyle(firstCard).marginRight) || 0;
        setCardWidth(cardOuterWidth + cardMarginRight);
      }
    }
  }, [demandas]);

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

          {/* Primeira linha de demandas */}
          <div className={styles.scrollWrapper}>
            {showArrows[0] && (
              <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(0, -1)}>
                <IoIosArrowBack />
              </button>
            )}

            <div className={styles.demandasGrid} ref={containerRefs[0]}>
              {demandas.slice(0, 4).map((demanda) => (
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

            {showArrows[0] && (
              <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(0, 1)}>
                <IoIosArrowForward />
              </button>
            )}
          </div>

          {/* Segunda linha de demandas */}
          <div className={styles.scrollWrapper}>
            {showArrows[1] && (
              <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(1, -1)}>
                <IoIosArrowBack />
              </button>
            )}

            <div className={styles.demandasGrid} ref={containerRefs[1]}>
              {demandas.slice(2, 6).map((demanda) => (
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

            {showArrows[1] && (
              <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(1, 1)}>
                <IoIosArrowForward />
              </button>
            )}
          </div>

          {/* Terceira linha de demandas */}
          <div className={styles.scrollWrapper}>
            {showArrows[2] && (
              <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => scroll(2, -1)}>
                <IoIosArrowBack />
              </button>
            )}

            <div className={styles.demandasGrid} ref={containerRefs[2]}>
              {demandas.slice(0, 4).map((demanda) => (
                <div key={`third-${demanda.id}`} className={styles.demandaCard}>
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

            {showArrows[2] && (
              <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => scroll(2, 1)}>
                <IoIosArrowForward />
              </button>
            )}
          </div>

          <button className={styles.criarOferta}>Criar Demanda</button>
        </div>
      </div>
    </>
  );
}