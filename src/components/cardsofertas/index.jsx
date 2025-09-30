// src/components/cardsdemands/cardsdemands.jsx
"use client";
import React from "react";
import Link from "next/link";
import styles from "./cards.module.css";

export default function Cardsofertas({ oferta }) {
  if (!oferta) return null;

  return (
    <div className={styles.ofertaCard} data-oferta-card>
      <p className={styles.ofertaEmpresa}>{oferta.agricultor_nome}</p>
      <div className={styles.ofertaImageContainer}>
        <img src={oferta.imagem} alt={oferta.amendoim_tipo} loading="lazy" />
      </div>
      <h3>{oferta.amendoim_tipo}</h3>
      <p className={styles.ofertaQuantidade}>{oferta.oferta_quantidade} kg</p>
      <Link href={`/ofertas/${oferta.oferta_id}`}>
        <button className={styles.ofertaDetalhes}>Ver detalhes</button>
      </Link>
    </div>
  );
}

