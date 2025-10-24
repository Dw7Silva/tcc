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
  console.log(demanda); 
  
  const empresa = demanda.emp_nome_fantasia;
  const variedade = demanda.amen_variedade;
  const quantidade = demanda.demanda_quantidade;
  const preco = demanda.demanda_preco_maximo ;

  const informacoes = demanda.demanda_outras_informacoes;
  const dataEntrega = demanda.demanda_data_entrega ;
  const data_publicacao = demanda.demanda_data_publicacao ; 
  const imagemdemanda = demanda.demanda_imagem;

  return (
    <>
      <BarraNvg />

      <div className={styles.container}>
        <div className={styles.demandaContainer}>
          <div className={styles.demandaHeader}>
            <div>
             
              <p className={styles.productTitle}>{empresa}</p>
                  
            </div>

            <div className={styles.imageContainer}>
              <img
                src={imagemdemanda}
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
                  
                  <span className={styles.infoLabel}>Preço maximo:</span>
                  <span className={styles.infoValue}>{preco}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Quantidade:</span>
                  <span className={styles.infoValue}>{quantidade}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Data de entrega:</span>
                  <span className={styles.infoValue}>{new Date(dataEntrega).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}> Variedade:</span>
                  <span className={styles.infoValue}>{variedade}</span>
                </div>
                 <div className={styles.infoRow}>
                  <span>
                    Publicado em :   {new Date(data_publicacao).toLocaleDateString('pt-BR')}
                  </span>
                </div>
               
            
              </div>
            </div>

            <div className={styles.editorSection}>
              <h2>Observações</h2>
              <div className={styles.editorPlaceholder}>
               
                <p>{informacoes}</p>
              
             
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
