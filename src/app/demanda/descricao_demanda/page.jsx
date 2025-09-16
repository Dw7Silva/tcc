// src/components/DemandaDescricao.jsx
"use client";
import React from "react";
import styles from "./descdemanda.module.css";
import BarraNvg from "@/components/navbar/navbar";
import Link from "next/link";

export default function DemandaDescricao({ demanda }) {
  if (!demanda) {
    return (
      <>
        <BarraNvg />
        <div className={styles.container}>
          <div className={styles.demandaContainer}>
            <h2>Demanda não encontrada</h2>
          </div>
        </div>
      </>
    );
  }

  const imagemdemanda = demanda.imagem || demanda.imagem_url || "https://blogmarcosfrahm.com/wp-content/uploads/2016/06/Amendoim.jpg";
  const titulo = demanda.amendoim_tipo || `Amendoim #${demanda.amen_id ?? "?"}`;
  const empresa = demanda.empresa_nome || `Empresa #${demanda.emp_id ?? "?"}`;
  const quantidade = `${demanda.demanda_quantidade ?? 0} kg`;
  const preco = demanda.demanda_preco_maximo != null ? `R$ ${Number(demanda.demanda_preco_maximo).toFixed(2)}` : "—";
  const disponibilidade = demanda.demanda_ativa ? "Disponível" : "Indisponível";
  const localizacao = demanda.demanda_localizacao || demanda.demanda_outras_informacoes || "Não informada";
  const dataEntrega = demanda.demanda_data_entrega || "Não informada";
  const cep = demanda.demanda_cep || demanda.cep || "—";

  return (
    <>
      <BarraNvg />

      <div className={styles.container}>
        <div className={styles.demandaContainer}>
          <div className={styles.demandaHeader}>
            <div>
              <h1 className={styles.productTitle}>{titulo}</h1>
              <p className={styles.subTitle}>{empresa}</p>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={imagemdemanda}
                alt={`Imagem de ${titulo}`}
                className={styles.productImage}
                loading="lazy"
              />
            </div>
          </div>

          <div className={styles.demandaContent}>
            <div className={styles.infoBox}>
              <h2>Detalhes da Demanda</h2>

              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Preço por kilo:</span>
                  <span className={styles.infoValue}>{preco}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Disponibilidade:</span>
                  <span className={styles.infoValue}>{disponibilidade}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Quantidade:</span>
                  <span className={styles.infoValue}>{quantidade}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Local de entrega:</span>
                  <span className={styles.infoValue}>{localizacao}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Data de entrega:</span>
                  <span className={styles.infoValue}>{dataEntrega}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Tipo:</span>
                  <span className={styles.infoValue}>{demanda.amendoim_tipo || demanda.tipo || "—"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Espécie / Variedade:</span>
                  <span className={styles.infoValue}>{demanda.variedade || demanda.amendoim_tipo || "—"}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>CEP:</span>
                  <span className={styles.infoValue}>{cep}</span>
                </div>
              </div>
            </div>

            <div className={styles.editorSection}>
              <h2>Observações</h2>
              <div className={styles.editorPlaceholder}>
                {/* mostra texto extra vindo do mock se existir */}
                <p>{demanda.demanda_outras_informacoes || "Sem observações adicionais."}</p>
                {/* se quiser, pode mostrar outros campos: preço max, data_publicacao, id, etc */}
                <small>Publicado em: {demanda.demanda_data_publicacao || "—"}</small>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link href="/proposta">
              <button className={styles.secondaryButton}>Enviar proposta</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
