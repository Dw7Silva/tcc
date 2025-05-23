"use client";
import React, { useState } from 'react';
import styles from './oferta.module.css';
import { FaImage } from 'react-icons/fa';
import BarraNvg from '@/components/navbar/navbar';

export default function CriarOferta() {
  // Estados para o formulário
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageInputLarge, setIsImageInputLarge] = useState(true);
  const [preco, setPreco] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const formatarParaBRL = (valor) => {
    // Remove tudo que não é dígito
    const apenasDigitos = valor.replace(/\D/g, '');
    
    // Converte para número e divide por 100 para obter os decimais corretos
    const numero = parseFloat(apenasDigitos) / 100;
    
    // Formata como moeda brasileira
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handlePrecoChange = (e) => {
    const valor = e.target.value;
    
    // Se o campo estiver vazio, limpa o estado
    if (valor === '') {
      setPreco('');
      return;
    }
    
    // Formata o valor enquanto o usuário digita
    const valorFormatado = formatarParaBRL(valor);
    setPreco(valorFormatado);
  };

  // Função para obter o valor numérico do preço formatado
  const getValorNumerico = () => {
    if (!preco) return 0;
    const valorLimpo = preco.replace(/\D/g, '');
    return parseFloat(valorLimpo) / 100;
  };

  const handleImageChange = ({ target: { files } }) => {
    if (files && files[0]) {
      setSelectedImage(URL.createObjectURL(files[0]));
      setIsImageInputLarge(false);
    }
  };

  const toggleImageInputSize = () => {
    if (selectedImage) {
      setIsImageInputLarge(false);
    } else {
      setIsImageInputLarge(prev => !prev);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedImage) {
      setFeedback({
        message: "Por favor, selecione uma imagem!",
        type: "erro"
      });
      return;
    }

    // Obter o valor numérico para envio
    const valorNumerico = getValorNumerico();
    console.log('Valor numérico para envio:', valorNumerico);

    setFeedback({
      message: `Oferta criada com sucesso! Valor: ${preco}`,
      type: "sucesso"
    });

    // Limpa o formulário após 3 segundos (opcional)
    setTimeout(() => {
      setSelectedImage(null);
      setPreco('');
      setFeedback({ message: '', type: '' });
    }, 3000);
  };

  return (
    <>
      <BarraNvg></BarraNvg>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.textcriar}>
            <h2>Criar oferta</h2>
          </div>

          {feedback.message && (
            <div className={`${styles.feedback} ${feedback.type === 'sucesso' ? styles.sucesso : styles.erro}`}>
              {feedback.message}
            </div>
          )}

          <form className={styles.formContent} onSubmit={handleSubmit}>
            <div className={`${styles.imageInput} ${isImageInputLarge ? styles.imageInputLarge : ''}`}>
              <label htmlFor="imageUpload" onClick={toggleImageInputSize}>
                <FaImage size={isImageInputLarge ? 100 : 30} />
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                required
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              {selectedImage && <img src={selectedImage} alt="Imagem selecionada" />}
            </div>

            <div className={styles.formFields}>
              {/* ... outros campos do formulário ... */}

              <div className={styles.formGroup}>
                <label htmlFor="precoEstimado">Preço estimado (ex: por saca)</label>
                <input
                  type="text"  // Mudamos para text para melhor controle da formatação
                  id="precoEstimado"
                  value={preco}
                  onChange={handlePrecoChange}
                  required
                  placeholder="R$ 0,00"
                />
              </div>

              {/* ... outros campos do formulário ... */}
            </div>

            <button type="submit" className={styles.criarOferta}>Criar oferta</button>
          </form>
        </div>
      </div>
    </>
  );
}