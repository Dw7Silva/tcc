"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./demandas.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";

export default function Demandas() {
  const containerRefs = [useRef(null), useRef(null), useRef(null)]; // Referências para os containers de scroll
  const [cardWidth, setCardWidth] = useState(0); // Estado para armazenar a largura dinâmica do card + margem

  const demandas = [
    { id: 1, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "50 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
    { id: 2, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "50 saca", imagem: "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg" },
    { id: 3, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "50 saca", imagem: "https://image.tuasaude.com/media/article/wg/xp/beneficios-do-amendoim_17802.jpg" },
    { id: 4, nome_empresa: "Amenco", tipo: "Amendoim c/casca", quantidade: "40 saca", imagem: "https://feed.continente.pt/media/aaeoih2v/amendoim-beneficios.jpg?center=0.43958293115759167,0.45275669909355631&mode=crop&width=1090&height=467&rnd=133298540351630000&format=webp" },
    { id: 5, nome_empresa: "Amentupã", tipo: "Amendoim c/pele", quantidade: "55 saca", imagem: "https://s2-ge.glbimg.com/fJ1Qo8xVlmVQH5cGcNq16UBgoqk=/0x0:1273x824/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/K/z/2SS07CSRe6kf6XQhBjtw/amendoim.jpg" },
    { id: 6, nome_empresa: "Beatrix", tipo: "Amendoim s/pele", quantidade: "60 saca", imagem: "https://kuky.com.br/uploads/images/2023/05/beneficios-do-amendoim-descubra-como-ele-pode-ajudar-sua-saude-1684956829.jpg" },
  ];

  // Função para realizar o scroll horizontal dos cards
  const scroll = (rowIndex, direction) => {
    if (containerRefs[rowIndex].current) {
      const container = containerRefs[rowIndex].current;
      const currentScrollLeft = container.scrollLeft;
      const newScrollLeft = currentScrollLeft + direction * cardWidth;

      container.scrollTo({ left: Math.round(newScrollLeft), behavior: "smooth" });
    }
  };
  
  // Hook useEffect para verificar o tamanho da tela na montagem e em cada redimensionamento
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 610);
    };

    handleResize(); // Chama a função na montagem para definir o estado inicial
    window.addEventListener("resize", handleResize); // Adiciona um listener para o evento de redimensionamento

    // Remove o listener quando o componente é desmontado para evitar vazamentos de memória
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Hook useEffect para calcular a largura do card + margem após a montagem
  useEffect(() => {
    if (demandas.length > 0 && containerRefs[0].current) {
      const firstCard = containerRefs[0].current.querySelector(`.${styles.demandaCard}`);
      if (firstCard) {
        const cardOuterWidth = firstCard.offsetWidth; // Largura total do elemento (incluindo padding e borda)
        const cardMarginRight = parseFloat(window.getComputedStyle(firstCard).marginRight) || 0; // Obtém a margem direita computada
        setCardWidth(cardOuterWidth + cardMarginRight);
      }
    }
  }, [demandas, containerRefs]);
  return (
    <>
     
      <BarraNvg></BarraNvg>
      <div className={styles.container}>
        <div>
          <div className={styles.header}>
            <h2>Demandas</h2>
            <div className={styles.filtro}>
              <span>Filtro</span>
              <select>
                <option value="todos">Todos</option>
                <option value="casca">Com Casca</option>
                <option value="pele">Com Pele</option>
                <option value="sempele">Sem Pele</option>
              </select>
            </div>
          </div>

          {containerRefs.map((ref, index) => (
            <div key={index} className={styles.scrollContainer}>
              {/* Botão da seta para scrollar para a esquerda */}
              <button className={styles.arrow} onClick={() => scroll(index, -1)}>
                <IoIosArrowBack />
              </button>
              {/* Container que envolve os cards de demanda e permite o scroll horizontal */}
              <div className={styles.demandasGrid} ref={ref}>
                {demandas.map((demanda) => (
                  <div key={demanda.id} className={styles.demandaCard}>
                    <p className={styles.empresa}>{demanda.nome_empresa}</p>
                    <img src={demanda.imagem} alt={demanda.tipo} />
                    <h3>{demanda.tipo}</h3>
                    <p className={styles.quantidadep} >{demanda.quantidade}</p>
                    <button className={styles.detalhes}> 
                      Ver detalhes do pedido 
                      </button>
                  </div>
                ))}
              </div>
              {/* Botão da seta para scrollar para a direita */}
              <button className={styles.arrow} onClick={() => scroll(index, 1)}>
                <IoIosArrowForward />
              </button>
            </div>
          ))}

          <button className={styles.criarOferta}>Criar Demanda</button>
        </div>
      </div>
    </>
  );
}