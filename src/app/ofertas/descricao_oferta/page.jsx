import React from 'react';
import styles from './descoferta.module.css';
import BarraNvg from '@/components/navbar/navbar';
import Link from 'next/link';

const OfertaDescricao = () => {
 
  
   
  const imagemdemanda = "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg"

  return (
    <>
      <BarraNvg />

      <div className={styles.container}>
        <div className={styles.demandaContainer}>
          <div className={styles.demandaHeader}>
            <div>
              <p className={styles.productTitle}>{agricultor}</p>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={imagemOferta}
                className={styles.productImage}
                loading="lazy"
                alt={`Oferta de ${variedade}`}
              />
            </div>
          </div>

          <div className={styles.demandaContent}>
            <div className={styles.infoBox}>
              <h2>Detalhes da Oferta</h2>

              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Preço:</span>
                  <span className={styles.infoValue}>R$ {preco}</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Quantidade:</span>
                  <span className={styles.infoValue}>{quantidade} kg</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Data de colheita:</span>
                  <span className={styles.infoValue}>{new Date(dataColheita).toLocaleDateString('pt-BR')}</span>
                </div>
                
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Variedade:</span>
                  <span className={styles.infoValue}>{variedade}</span>
                </div>
                 <div className={styles.infoRow}>
                  <span>
                    Publicado em: {new Date(data_publicacao).toLocaleDateString('pt-BR')}
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
            <Link href="/negociacao">
              <button className={styles.secondaryButton}>Iniciar negociação</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}