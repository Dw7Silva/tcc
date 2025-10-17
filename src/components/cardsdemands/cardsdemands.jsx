// src/components/cardsdemands/cardsdemands.jsx
"use client";
import React from "react";
import Link from "next/link";
import styles from "./cards.module.css";

export default function Cardsprodutos({ demanda }) {
  if (!demanda) return null;

  return (
    <div className={styles.demandaCard} data-demanda-card>
      <p className={styles.empresa}>{demanda.emp_nome_fantasia}</p>

      <div className={styles.imageContainer}>
        <img src={demanda.demanda_imagem} alt={demanda.amendoim_tipo} loading="lazy" />
      </div>

      <h3>{demanda.amen_variedade}</h3>
      <p className={styles.quantidade}>{demanda.demanda_quantidade} kg</p>

      <Link href={`/demanda/${demanda.demanda_id}`}>
        <button className={styles.detalhes}>Ver detalhes</button>
      </Link>
    </div>
  );
}

