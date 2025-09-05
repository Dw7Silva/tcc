import React from "react";
import Link from "next/link";
import styles from "./page.module.css"; // ⬅️ importa o css modularizado

export default function CardDemanda({ demanda }) {
  return (
    <Link href={`/demandas/${demanda.demanda_id}`} className={styles.demandaCard}>
      <h3>Demanda #{demanda.demanda_id}</h3>

      <div className={styles.quantidade}>
        Quantidade: {demanda.demanda_quantidade} kg
      </div>

      <div className={styles.quantidade}>
        Preço Máximo: R$ {demanda.demanda_preco_maximo.toFixed(2)}
      </div>

      <div className={styles.quantidade}>
        Entrega até: {demanda.demanda_data_entrega}
      </div>

      <button className={styles.detalhes}>Ver Detalhes</button>
    </Link>
  );
}
