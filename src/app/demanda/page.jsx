"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import styles from "./demandas.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";
import Link from "next/link";
import demandasMock from "@/mockup/demandas";
import CardDemanda from "@/components/cardsprodutos";

export default function Demandas() {
  // Mapas auxiliares (coerentes com INSERT.SQL)
  const empresasMap = useMemo(
    () => ({
      1: "Empresa Exemplo Ltda",
      2: "AgroNutri SA",
      3: "NutriFoods Ltda",
    }),
    []
  );

  const variedadesMap = useMemo(
    () => ({
      1: "Amendoim Runner",
      2: "Amendoim Valência",
      3: "Amendoim Virginia",
      4: "Amendoim Español",
      5: "Amendoim Florunner",
    }),
    []
  );

  const imagensPorAmenId = useMemo(
    () => ({
      1: "https://img.olx.com.br/images/35/354519630978865.webp",
      2: "https://img.olx.com.br/images/21/212434617469791.webp",
      3: "https://thumbs.dreamstime.com/b/dep%C3%B3sito-de-armazenamento-em-sacos-amendoim-no-brasil-visto-baixo-dos-206695366.jpg",
      4: "https://img.mfrural.com.br/api/image?url=https://s3.amazonaws.com/mfrural-produtos-us/224488-366748-2000954-amendoim.webp&width=480&height=288&mode=4",
      5: "https://thumbs.dreamstime.com/z/um-saco-de-amendoim-47927630.jpg",
      default:
        "https://blogmarcosfrahm.com/wp-content/uploads/2016/06/Amendoim.jpg",
    }),
    []
  );

  // Normaliza mock para o card
  const itensNormalizados = useMemo(() => {
    const ativos = (demandasMock || [])
      .filter((d) => !!d.demanda_ativa)
      .sort(
        (a, b) =>
          new Date(b.demanda_data_publicacao) -
          new Date(a.demanda_data_publicacao)
      );

    return ativos.map((d) => ({
      id: d.demanda_id,
      nome_empresa: empresasMap[d.emp_id] || `Empresa #${d.emp_id}`,
      tipo: variedadesMap[d.amen_id] || `Amendoim #${d.amen_id}`,
      quantidade: `${d.demanda_quantidade} kg`,
      imagem: imagensPorAmenId[d.amen_id] || imagensPorAmenId.default,
      data_publicacao: d.demanda_data_publicacao,
    }));
  }, [empresasMap, variedadesMap, imagensPorAmenId]);

  // Quebra em linhas (destaque/recentes)
  const linhasIniciais = useMemo(() => {
    const destaque = itensNormalizados.slice(0, 5);
    const recentes = itensNormalizados.slice(5);

    const base = { currentIndex: 0, cardWidth: 0, maxVisibleCards: 0 };
    const linhas = [];

    if (destaque.length) {
      linhas.push({
        id: 1,
        titulo: "Demandas em Destaque",
        demandas: destaque,
        ...base,
      });
    }
    if (recentes.length) {
      linhas.push({
        id: 2,
        titulo: "Demandas Recentes",
        demandas: recentes,
        ...base,
      });
    }
    if (!linhas.length) {
      linhas.push({
        id: 1,
        titulo: "Demandas",
        demandas: itensNormalizados,
        ...base,
      });
    }
    return linhas;
  }, [itensNormalizados]);

  const [linhas, setLinhas] = useState(linhasIniciais);
  const containerRefs = useRef([]);

  const handlePrev = (linhaId) => {
    setLinhas((prev) =>
      prev.map((linha) =>
        linha.id === linhaId
          ? { ...linha, currentIndex: Math.max(0, linha.currentIndex - 1) }
          : linha
      )
    );
  };

  const handleNext = (linhaId) => {
    setLinhas((prev) =>
      prev.map((linha) =>
        linha.id === linhaId
          ? {
              ...linha,
              currentIndex: Math.min(
                Math.max(0, linha.demandas.length - linha.maxVisibleCards),
                linha.currentIndex + 1
              ),
            }
          : linha
      )
    );
  };

  // Mede card e calcula quantos cabem
  useEffect(() => {
    const updateCardMetrics = () => {
      setLinhas((prev) =>
        prev.map((linha, index) => {
          const container = containerRefs.current[index];
          if (!container) return linha;

          const card = container.querySelector(`.${styles.demandaCard}`);
          if (!card) return linha;

          const cardStyle = window.getComputedStyle(card);
          const cardWidthWithMargin =
            card.offsetWidth +
            parseFloat(cardStyle.marginRight) +
            parseFloat(cardStyle.marginLeft);

          const containerWidth = container.offsetWidth;
          const cardsThatFit = Math.max(
            1,
            Math.floor(containerWidth / cardWidthWithMargin)
          );

          return {
            ...linha,
            cardWidth: cardWidthWithMargin,
            maxVisibleCards: cardsThatFit,
            currentIndex: Math.min(
              linha.currentIndex,
              Math.max(0, linha.demandas.length - cardsThatFit)
            ),
          };
        })
      );
    };

    updateCardMetrics();
    const ro = new ResizeObserver(updateCardMetrics);
    containerRefs.current.forEach((c) => c && ro.observe(c));
    return () => ro.disconnect();
  }, []);

  // Scroll suave
  useEffect(() => {
    linhas.forEach((linha, i) => {
      const container = containerRefs.current[i];
      if (container && linha.cardWidth > 0) {
        container.scrollTo({
          left: linha.currentIndex * linha.cardWidth,
          behavior: "smooth",
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

          {linhas.map((linha, index) => (
            <div key={linha.id} className={styles.linhaContainer}>
              <h3 className={styles.tituloLinha}>{linha.titulo}</h3>

              <div className={styles.scrollWrapper}>
                {linha.demandas.length > linha.maxVisibleCards && (
                  <button
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                    onClick={() => handlePrev(linha.id)}
                    disabled={linha.currentIndex === 0}
                    aria-label="Anterior"
                  >
                    <IoIosArrowBack />
                  </button>
                )}

                <div
                  className={styles.demandasGrid}
                  ref={(el) => (containerRefs.current[index] = el)}
                  id={`carrossel-${linha.id}`}
                >
                  {linha.demandas.map((demanda) => (
                    <div key={demanda.id} className={styles.demandaCard}>
                      <p className={styles.empresa}>{demanda.nome_empresa}</p>

                      <div className={styles.imageContainer}>
                        <img
                          src={demanda.imagem}
                          alt={demanda.tipo}
                          loading="lazy"
                        />
                      </div>

                      <h3>{demanda.tipo}</h3>
                      <p className={styles.quantidade}>{demanda.quantidade}</p>

                      {/* rota detalhada: tua pasta é 'demanda' (singular) */}
                      <Link href={`/demanda/${demanda.id}`}>
                        <button className={styles.detalhes}>Ver detalhes</button>
                      </Link>
                    </div>
                  ))}
                </div>

                {linha.demandas.length > linha.maxVisibleCards && (
                  <button
                    className={`${styles.arrow} ${styles.arrowRight}`}
                    onClick={() => handleNext(linha.id)}
                    disabled={
                      linha.currentIndex >=
                      Math.max(0, linha.demandas.length - linha.maxVisibleCards)
                    }
                    aria-label="Próximo"
                  >
                    <IoIosArrowForward />
                  </button>
                )}
              </div>
            </div>
          ))}

          <Link href="/criar_demanda">
            <button className={styles.criarOferta}>Criar Demanda</button>
          </Link>
        </div>
      </div>
    </>
  );
}
