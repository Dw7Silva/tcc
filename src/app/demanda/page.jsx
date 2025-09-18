"use client";
import React, { useRef, useState, useLayoutEffect, useMemo } from "react";
import styles from "./demandas.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";
import Link from "next/link";
import demandasMock from "@/mockup/demandas";

export default function Demandas() {
  // Normaliza mock para o card (usa somente campos do mock, com fallbacks)
  const itensNormalizados = useMemo(() => {
    const ativos = (demandasMock || [])
      .filter((d) => !!d.demanda_ativa) // aceita 1 ou true
      .sort((a, b) =>
          new Date(b.demanda_data_publicacao) - new Date(a.demanda_data_publicacao)
      );

    return ativos.map((d) => ({
      id: d.demanda_id,
      nome_empresa: d.empresa_nome ||` Empresa #${d.emp_id ?? "?"}`,
      tipo: d.amendoim_tipo || `Amendoim #${d.amen_id ?? "?"}`,
      quantidade: `${d.demanda_quantidade ?? 0} kg`,
      imagem:
        d.imagem ||
        d.imagem_url ||
        // fallback genérico se nem imagem nem campo conhecido existir
        "https://blogmarcosfrahm.com/wp-content/uploads/2016/06/Amendoim.jpg",
      data_publicacao: d.demanda_data_publicacao,
      raw: d,
    }));
  }, [demandasMock]);

  const nome_empresa = d.empresa_id
  

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

  const [linhas, setLinhas] = useState(() => linhasIniciais);
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

  // Mede card e calcula quantos cabem -> useLayoutEffect para medir antes do paint
  useLayoutEffect(() => {
    let ro = null;
    const updateCardMetrics = () => {
      setLinhas((prev) =>
        prev.map((linha, index) => {
          const container = containerRefs.current[index];
          if (!container) return linha;

          const card = container.querySelector(`.${styles.demandaCard}`);
          if (!card) return linha;

          const cardStyle = window.getComputedStyle(card);
          const marginRight = parseFloat(cardStyle.marginRight) || 0;
          const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
          const cardWidthWithMargin = card.offsetWidth + marginRight + marginLeft;

          const containerWidth = container.clientWidth || container.offsetWidth || 0;
          const cardsThatFit = Math.max(1, Math.floor(containerWidth / (cardWidthWithMargin || 1)));

          const maxIndex = Math.max(0, linha.demandas.length - cardsThatFit);
          const currentIndex = Math.min(linha.currentIndex, maxIndex);

          return {
            ...linha,
            cardWidth: cardWidthWithMargin,
            maxVisibleCards: cardsThatFit,
            currentIndex,
          };
        })
      );
    };

    updateCardMetrics();

    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(updateCardMetrics);
      containerRefs.current.forEach((c) => c && ro.observe(c));
    } else {
      window.addEventListener("resize", updateCardMetrics);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", updateCardMetrics);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linhasIniciais.length]);

  // Scroll suave
  useLayoutEffect(() => {
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
                        <img src={demanda.imagem} alt={demanda.tipo} loading="lazy" />
                      </div>

                      <h3>{demanda.tipo}</h3>
                      <p className={styles.quantidade}>{demanda.quantidade}</p>

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
