import Link from "next/link";
import styles from "./cards.module.css";

export default function Cardsprodutos({ demanda }) {
  return (
    <div className={styles.demandaCard}>
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
  );
}
