  "use client";
  import React, { useMemo } from "react";
  import styles from "./demandas.module.css";
  import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
  import BarraNvg from "@/components/navbar/navbar";
  import Link from "next/link";
  import Cardsprodutos from "@/components/cardsdemands/cardsdemands";
  import demandasMock from "@/mockup/demandas"; // <-- importe o mock

  export default function Demandas() {
    // prepara as demandas ativas (usa o objeto cru do mock)
    const demandasAtivas = useMemo(() => {
      return (demandasMock || [])
        .filter((d) => !!d.demanda_ativa) // aceita 1 ou true
        .sort((a, b) => new Date(b.demanda_data_publicacao) - new Date(a.demanda_data_publicacao));
    }, []);

    const DemandasGrandes = demandasMock
      .filter((quantidade) => quantidade.demanda_quantidade > 1000)
      .sort((maior, menor) => maior.demanda_quantidade - menor.demanda_quantidade);

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
              <h3 className={styles.tituloLinha}>Demandas</h3>

              <div className={styles.scrollWrapper}>
                {/* setas apenas visuais — sem lógica de carrossel */}
                <button className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Anterior">
                  <IoIosArrowBack />
                </button>
            
                <div className={styles.demandasGrid}>

                  
                  {demandasAtivas.map((demanda) => (
                    // use a chave do mock (demanda_id) — Cardsprodutos recebe o objeto cru
                        <Cardsprodutos key={demanda.demanda_id} demanda={demanda} />
                  ))}
                </div>

                <div className={styles.demandasGrid}>
                  {DemandasGrandes.map((demanda) => (
                    <Cardsprodutos key={demanda.demanda_id} demanda={demanda} />
                  ))}
                </div>

                <button className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Próximo">
                  <IoIosArrowForward />
                </button>
              </div>
            </div>

            <Link href="/criar_demanda">
              <button className={styles.criarOferta}>Criar Demanda</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
