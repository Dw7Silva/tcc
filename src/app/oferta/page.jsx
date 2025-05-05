"use client";

import React, { useState, useEffect } from 'react';
import styles from './oferta.module.css';
import { FaImage } from 'react-icons/fa';
import { GoHomeFill } from "react-icons/go";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";

export default function CriarOferta() {
  // Estados para o formulário
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageInputLarge, setIsImageInputLarge] = useState(true);
  
  // Estados para o menu responsivo
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Hook para detectar tamanho de tela
  function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);
    
    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) setMatches(media.matches);
      
      const listener = () => setMatches(media.matches);
      media.addListener(listener);
      
      return () => media.removeListener(listener);
    }, [matches, query]);
    
    return matches;
  }
  const [preco, setPreco] = useState('');

  const formatarParaBRL = (valor) => {
    const numero = Number(valor.replace(/\D/g, '')) / 100;
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleChange = (e) => {
    const valorFormatado = formatarParaBRL(e.target.value);
    setPreco(valorFormatado);
  };
  const isMobile = useMediaQuery("(max-width: 600px)");

  const toggleMenu = () => setMenuAberto(!menuAberto);

  // Itens do menu
  const menuItems = [
    { label: "Demandas", href: "#" },
    { label: "Ofertas", href: "#" },
    { label: "Minhas O/D", href: "#" },
    { label: "Config", href: "#" },
    ...(isMobile ? [
      { label: "Início", href: "#" },
      { label: "Chat", href: "#" },
      { label: "Suporte", href: "#" },
      { label: "Perfil", href: "#" }
    ] : [])
  ];

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
      alert("Por favor, selecione uma imagem!");
      return;
    }

    alert("Oferta criada com sucesso!");
  };

  const Logo = "https://i.ibb.co/23YGGMNM/Logo-Transparente.png";

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src={Logo} alt="Logo" className={styles.logo} />
        </div>

        <div className={styles.searchBar}>
          <input type="text" placeholder="Pesquisar..." />
          <button>
            <FaSearch />
          </button>
        </div>

        <div className={styles.navIcons}>
          {!isMobile && (
            <>
              <GoHomeFill />
              <IoChatbox />
              <MdSupportAgent />
              <FaUser />
            </>
          )}
          <HiOutlineMenu 
            onClick={toggleMenu} 
            className={styles.menuIcon} 
          />
        </div>

        {menuAberto && (
          <div className={styles.menuMobile}>
            {menuItems.map((item, index) => (
              <a key={index} href={item.href} onClick={toggleMenu}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.textcriar}>
            <h2>Criar oferta</h2>
          </div>

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
              <div className={styles.formGroup}>
                <label htmlFor="tipoAmendoim">Tipo de amendoim</label>
                <select id="tipoAmendoim" required>
                  <option value="">Selecione</option>
                  <option value="casca">Com Casca</option>
                  <option value="pele">Com Pele</option>
                  <option value="sem_pele">Sem Pele</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="espécieAmendoim">Espécie amendoim</label>
                <input type="text" id="espécieAmendoim" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="precoEstimado">Preço estimado ex: por saca</label>
                <input type="number " id="precoEstimado" value={preco}   onChange={handleChange} required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="métrica"> Métrica ex:kilo, saca</label>
                <select id="metrica" required>
                  <option value="">Selecione</option>
                  <option value="kilo">Kilo</option>
                  <option value="saca">Saca</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="data">Data</label>
                <input type="date" id="data" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="colheita">Colheita</label>
                <input type="date" id="colheita" required />
              </div>
            </div>

            <button type="submit" className={styles.criarOferta}>Criar oferta</button>
          </form>
        </div>
      </div>
    </>
  );
}