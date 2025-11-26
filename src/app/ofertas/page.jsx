"use client";
import React, { useRef, useState, useEffect,  } from "react";
import styles from "./oferta.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import BarraNvg from "@/components/navbar/navbar";
import Link from "next/link";
import Cardsofertas from "@/components/cardsofertas";
import api from "@/services/api";

export default function Ofertas() {

  const [ofertas, setOfertas] = useState([]);

  
  useEffect(() => {
    fetchOfertas();
  }, []); // Chama a função ao montar o componente

  async function fetchOfertas() {
    try {
      const response = await api.get("/ofertas");
      if (response.status === 200) {
        setOfertas(response.data.dados);
      }
    } catch (error) {
      alert("Erro ao buscar ofertas: " + error.message);
    }
  }


  const gridRef = useRef(null);

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
      const card = gridRef.current.querySelector("[data-oferta-card]");
      if (card) {
        gridRef.current.scrollBy({
          left: card.offsetWidth * 2,
          behavior: "smooth"
        });
      }
    }
  };
   console.log(ofertas);
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

          <div className={styles.linhaContainer}>
            <h3 className={styles.tituloLinha}></h3>
            <div className={styles.scrollWrapper}>
              {/* setas apenas visuais — sem lógica de carrossel */}
              <button onClick={arrowLeft} className={`${styles.arrow} ${styles.arrowLeft}`} aria-label="Anterior">
                <IoIosArrowBack />
              </button>
              <div className={styles.ofertasGrid} ref={gridRef}>
                {ofertas.map((oferta) => (
                <Cardsofertas key={oferta.oferta_id} oferta={oferta} />
                ))}
              </div>
              <button onClick={arrowRight} className={`${styles.arrow} ${styles.arrowRight}`} aria-label="Próximo">
                <IoIosArrowForward />
              </button>
            </div>
          </div>

          <Link href="/criar_oferta" passHref legacyBehavior>
            <button className={styles.criarOferta}>
              <span className={styles.textcriar}>Criar oferta</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}