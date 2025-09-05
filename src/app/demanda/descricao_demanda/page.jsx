import React from 'react';
import styles from './descdemanda.module.css';
import BarraNvg from '@/components/navbar/navbar';
import Link from 'next/link';

const DemandaDescricao = () => {
 
  
   
  const imagemdemanda = "https://delikatessenbuffet.com.br/storage/app/uploads/w6mebc9mEmReLs043fhhP9TZLMiDc6NPfeIbHAPt.jpg"

  return (
    <>
      <BarraNvg />

      <div className={styles.container}>
        <div className={styles.demandaContainer}>
          <div className={styles.demandaHeader}>
            <h1 className={styles.productTitle}>Amendoim Torrado Tipo 1</h1>

            <div className={styles.imageContainer}>
              <img
                src={imagemdemanda}
                alt="Imagem do produto"
                className={styles.productImage}
              />
            </div>
          </div>

          <div className={styles.demandaContent}>
            <div className={styles.infoBox}>
              <h2>Prévia do Produto</h2>

              <div className={styles.infoGrid}>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Preço por kilo:</span>
                  <span className={styles.infoValue}>R$220,00</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Disponibilidade:</span>
                  <span className={styles.infoValue}>Disponível</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Quantidade KG:</span>
                  <span className={styles.infoValue}>1000 kg</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>empresa:</span>
                  <span className={styles.infoValue}>Amenco</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Localização:</span>
                  <span className={styles.infoValue}>Normal do Paraná</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>tipo:</span>
                  <span className={styles.infoValue}>sem pele</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>espécie:</span>
                  <span className={styles.infoValue}>valencia</span>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>CEP:</span>
                  <span className={styles.infoValue}>15455-800</span>
                </div>
              </div>
            </div>

            <div className={styles.editorSection}>
              <h2>Editor</h2>
              <div className={styles.editorPlaceholder}>
                <p>Área para edição de detalhes adicionais do produto...</p>
              </div>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link href="/proposta" >
            <button className={styles.secondaryButton}>Enviar proposta</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemandaDescricao;
