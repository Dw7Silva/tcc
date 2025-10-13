"use client";
import React, { useMemo } from "react";
import styles from "./demandas.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";
import Link from "next/link";
import Cardsprodutos from "@/components/cardsdemands/cardsdemands";
import demandasMock from "@/mockup/demandas"; // <-- importe o mock
import api from "@/services/api";
// import { al } from "react-router/dist/development/route-data-C12CLHiN";

export default function Demandas() {

  const [demandas, setDemandas] = React.useState([]); // Estado para armazenar as demandas

  React.useEffect(() => {
    fetchDemandas();
  }, []); // Chama a função ao montar o componente

  async function fetchDemandas() {
    try {
      const response = await api.get("/demandas");
      if (response.status === 200) {
        setDemandas(response.data);
      }
    } catch (error) {
      alert("Erro ao buscar demandas: " + error.message);
    }
  }

    const demandasAtivas = useMemo(() => {
      return (demandasMock || [])
        .filter((d) => !!d.demanda_ativa) // aceita 1 ou true
        .sort((a, b) => new Date(b.demanda_data_publicacao) - new Date(a.demanda_data_publicacao));
    }, []);


    const gridRef = React.useRef(null);

    const arrowLeft = () => {
      if (gridRef.current) {
        gridRef.current.scrollBy({
          left: -gridRef.current.offsetWidth,
          behavior: "smooth"
        });
      }
    };
    const arrowRight = () => {
      if (gridRef.current) {
        const card = gridRef.current.querySelector("[data-demanda-card]");
        if (card) {
          gridRef.current.scrollBy({
            left: card.offsetWidth * 2,
            behavior: "smooth"
          });
        }
      }
    };

    console.log(demandas);


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

            <div className={styles.linhaContainer}>
              <h3 className={styles.tituloLinha}></h3>
              <div className={styles.scrollWrapper}>
                {/* setas apenas visuais — sem lógica de carrossel */}
                <button onClick={arrowLeft} className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Anterior">
                  <IoIosArrowBack />
                </button>
                <div className={styles.demandasGrid} ref={gridRef}>

                  {demandasAtivas.map((demanda) => (
                    <Cardsprodutos key={demanda.demanda_id} demanda={demanda} />
                  ))}

                </div>
                <button onClick={arrowRight} className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Próximo">
                  <IoIosArrowForward />
                </button>
              </div>
            </div>

            <Link href="/criar_demanda" passHref legacyBehavior>
              <button className={styles.criarOferta}>
                <span className={styles.textcriar}>Criar oferta</span>
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }
