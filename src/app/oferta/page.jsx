"use client";

import React, { useState } from 'react';
import styles from './oferta.module.css';
import { FaImage } from 'react-icons/fa';

// Componente principal para criar uma oferta
export default function CriarOferta() {
  // Estado para armazenar a imagem selecionada e o tamanho do ícone
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageInputLarge, setIsImageInputLarge] = useState(true);

  // Função para lidar com a seleção da imagem
  const handleImageChange = ({ target: { files } }) => {
    if (files && files[0]) {
      setSelectedImage(URL.createObjectURL(files[0]));
      setIsImageInputLarge(false); // Reduz o tamanho do ícone após a seleção
    }
  };

  // Função para alternar o tamanho do ícone de entrada de imagem
  const toggleImageInputSize = () => {
    // Se já houver uma imagem selecionada, não altera o tamanho do ícone
    if (selectedImage) {
      setIsImageInputLarge(false); // Retorna o ícone ao tamanho original
    } else {
      setIsImageInputLarge(prev => !prev); // Alterna o tamanho do ícone
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div className={styles.textcriar}>
        <h2>Criar oferta</h2>
       </div>
        <div className={styles.formContent}>
          <div className={`${styles.imageInput} ${isImageInputLarge ? styles.imageInputLarge : ''}`}>
            {/* Rótulo para upload de imagem com ícone */}
            <label htmlFor="imageUpload" onClick={toggleImageInputSize}>
              <FaImage size={isImageInputLarge ? 100 : 30} />
            </label>
            {/* Entrada de arquivo oculta para upload de imagem */}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }} // Oculta a entrada de arquivo
            />
            {/* Exibe a imagem selecionada, se disponível */}
            {selectedImage && <img src={selectedImage} alt="Imagem selecionada" />}
          </div>

          <div className={styles.formFields}>
            {/* Dropdown para selecionar o tipo de amendoim */}
            <div className={styles.formGroup}>
              <label htmlFor="tipoAmendoim">Tipo de amendoim</label>
              <select id="tipoAmendoim">
                <option value="casca">Com Casca</option>
                <option value="pele">Com Pele</option>
                <option value="sempele">Sem Pele</option>
              </select>
            </div>

            {/* Entrada para especificar a espécie de amendoim */}
            <div className={styles.formGroup}>
              <label htmlFor="espécieAmendoim">Espécie amendoim</label>
              <input type="text" id="espécieAmendoim" />
            </div>

            {/* Entrada para preço estimado */}
            <div className={styles.formGroup}>
              <label htmlFor="precoEstimado">Preço estimado ex: por saca</label>
              <input type="text" id="precoEstimado" />
            </div>

            {/* Dropdown para selecionar a unidade de medida da quantidade */}
            <div className={styles.formGroup}>
              <label htmlFor="quantidade">Quantidade ex: kilo, saca</label>
              <select id="quantidade">
                <option value="kilo">Kilo</option>
                <option value="saca">Saca</option>
              </select>
            </div>

            {/* Entrada para selecionar a data */}
            <div className={styles.formGroup}>
              <label htmlFor="data">Data</label>
              <input type="date" id="data" />
            </div>

            {/* Entrada para selecionar a data da colheita */}
            <div className={styles.formGroup}>
              <label htmlFor="colheita">Colheita</label>
              <input type="date" id="colheita" />
            </div>
          </div>
        </div>

        {/* Botão para criar a oferta */}
        <button className={styles.criarOferta}>Criar oferta</button>
      </div>
    </div>
  );
}